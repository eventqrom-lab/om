require('dotenv').config();

const crypto = require('crypto');
const path = require('path');
const express = require('express');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { Pool } = require('pg');

const app = express();
const port = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';
const jwtSecret = process.env.JWT_SECRET || (isProduction ? '' : 'development-only-secret');
const adminEmails = new Set(
  String(process.env.ADMIN_EMAILS || '')
    .split(',')
    .map(normalizeEmail)
    .filter(Boolean)
);
const orderNotificationEmails = new Set(
  String(process.env.ORDER_NOTIFICATION_EMAILS || process.env.ADMIN_EMAILS || '')
    .split(',')
    .map(normalizeEmail)
    .filter(Boolean)
);
const allowedOrigins = new Set([
  'https://eventqrom-lab.github.io',
  'https://om-production-7de0.up.railway.app'
]);

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is required.');
  process.exit(1);
}
if (!jwtSecret) {
  console.error('JWT_SECRET is required in production.');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false
});

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});
app.use(express.json({ limit: '250kb' }));
app.use('/images', express.static(path.join(__dirname, 'images'), {
  maxAge: '30d'
}));
app.use(express.static(__dirname, { extensions: ['html'] }));

async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id BIGSERIAL PRIMARY KEY,
      identifier_type VARCHAR(10) NOT NULL CHECK (identifier_type IN ('email', 'phone')),
      identifier VARCHAR(320) NOT NULL,
      name VARCHAR(150),
      phone VARCHAR(30),
      verified_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE(identifier_type, identifier)
    );

    CREATE TABLE IF NOT EXISTS otp_codes (
      id BIGSERIAL PRIMARY KEY,
      identifier_type VARCHAR(10) NOT NULL CHECK (identifier_type IN ('email', 'phone')),
      identifier VARCHAR(320) NOT NULL,
      purpose VARCHAR(10) NOT NULL DEFAULT 'login',
      signup_name VARCHAR(150),
      signup_phone VARCHAR(30),
      code_hash VARCHAR(64) NOT NULL,
      attempts SMALLINT NOT NULL DEFAULT 0,
      expires_at TIMESTAMPTZ NOT NULL,
      used_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS otp_lookup_idx
      ON otp_codes(identifier_type, identifier, created_at DESC);

    CREATE TABLE IF NOT EXISTS orders (
      id BIGSERIAL PRIMARY KEY,
      order_number VARCHAR(24) NOT NULL UNIQUE,
      user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
      customer_name VARCHAR(150) NOT NULL,
      customer_phone VARCHAR(30),
      total_price NUMERIC(12,3) NOT NULL CHECK (total_price >= 0),
      currency VARCHAR(8) NOT NULL DEFAULT 'OMR',
      details JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS orders_user_created_idx
      ON orders(user_id, created_at DESC);

    ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(30);
    ALTER TABLE otp_codes ADD COLUMN IF NOT EXISTS purpose VARCHAR(10) NOT NULL DEFAULT 'login';
    ALTER TABLE otp_codes ADD COLUMN IF NOT EXISTS signup_name VARCHAR(150);
    ALTER TABLE otp_codes ADD COLUMN IF NOT EXISTS signup_phone VARCHAR(30);
    ALTER TABLE orders ALTER COLUMN user_id DROP NOT NULL;
  `);
}

function normalizeEmail(value) {
  const clean = String(value || '').trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean) ? clean : null;
}

function normalizePhone(value) {
  const clean = String(value || '').trim().slice(0, 30);
  const digitCount = clean.replace(/\D/g, '').length;
  return /^[+()\d\s-]+$/.test(clean) && digitCount >= 7 && digitCount <= 15 ? clean : null;
}

function normalizeOmanMobile(value) {
  const digits = String(value || '').replace(/\D/g, '');
  const local = digits.startsWith('968') ? digits.slice(3) : digits;
  return /^[97]\d{7}$/.test(local) ? `+968 ${local}` : null;
}

function hashOtp(identifier, code) {
  return crypto.createHmac('sha256', jwtSecret).update(`${identifier}:${code}`).digest('hex');
}

function createToken(user) {
  return jwt.sign({ sub: String(user.id) }, jwtSecret, { expiresIn: '30d' });
}

async function requireAuth(req, res, next) {
  const token = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  try {
    const payload = jwt.verify(token, jwtSecret);
    const result = await pool.query(
      'SELECT id, identifier_type, identifier, name, phone, created_at FROM users WHERE id = $1',
      [payload.sub]
    );
    if (!result.rows[0]) throw new Error('User not found');
    req.user = result.rows[0];
    next();
  } catch {
    res.status(401).json({ message: 'يرجى تسجيل الدخول أولاً.' });
  }
}

async function optionalAuth(req, _res, next) {
  const token = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return next();
  try {
    const payload = jwt.verify(token, jwtSecret);
    const result = await pool.query(
      'SELECT id, identifier_type, identifier, name, phone, created_at FROM users WHERE id = $1',
      [payload.sub]
    );
    req.user = result.rows[0] || null;
  } catch {
    req.user = null;
  }
  next();
}

function requireAdmin(req, res, next) {
  if (!adminEmails.has(req.user.identifier)) {
    return res.status(403).json({ message: 'غير مصرح لك بالدخول إلى لوحة الإدارة.' });
  }
  next();
}

async function sendEmailOtp(email, code) {
  const subject = 'رمز التحقق - Event QR Tech';
  const text = `رمز التحقق الخاص بك هو: ${code}\nينتهي خلال 10 دقائق.`;
  const html = `<div dir="rtl"><h2>Event QR Tech</h2><p>رمز التحقق الخاص بك:</p><p style="font-size:30px;font-weight:bold;letter-spacing:6px">${code}</p><p>ينتهي خلال 10 دقائق.</p></div>`;

  if (process.env.BREVO_API_KEY) {
    const senderEmail = process.env.BREVO_SENDER_EMAIL || process.env.SMTP_USER;
    if (!senderEmail) throw new Error('BREVO_SENDER_EMAIL is required');
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        sender: { name: 'Event QR Tech', email: senderEmail },
        to: [{ email }],
        subject,
        textContent: text,
        htmlContent: html
      }),
      signal: AbortSignal.timeout(15000)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.message || `Brevo request failed (${response.status})`);
    console.log(`Email OTP accepted by Brevo: messageId=${result.messageId}`);
    return true;
  }

  if (process.env.RESEND_API_KEY) {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || 'Event QR Tech <onboarding@resend.dev>',
        to: [email],
        subject,
        text,
        html
      }),
      signal: AbortSignal.timeout(15000)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.message || `Resend request failed (${response.status})`);
    console.log(`Email OTP accepted by Resend: id=${result.id}`);
    return true;
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) return false;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: String(process.env.SMTP_SECURE).toLowerCase() !== 'false',
    family: 4,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject,
    text,
    html
  });
  console.log(`Email OTP accepted by SMTP: messageId=${info.messageId}`);
  return true;
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[char]));
}

function getOrderEmailDetails(details) {
  const ignoredKeys = new Set([
    'access_key',
    'botcheck',
    'subject',
    'from_name',
    '---',
    '\u0631\u0642\u0645_\u0627\u0644\u0637\u0644\u0628',
    '\u0627\u0633\u0645_\u0627\u0644\u0639\u0645\u064a\u0644',
    '\u0631\u0642\u0645_\u0627\u0644\u062c\u0648\u0627\u0644',
    '\u0627\u0644\u0633\u0639\u0631_\u0627\u0644\u0646\u0647\u0627\u0626\u064a_\u0628\u0639\u062f_\u0627\u0644\u062e\u0635\u0645',
    '\u0631\u0627\u0628\u0637_\u0627\u0644\u0641\u0627\u062a\u0648\u0631\u0629'
  ]);
  return Object.entries(details || {}).filter(([key, value]) => {
    const cleanKey = String(key || '').trim();
    const cleanValue = String(value ?? '').trim();
    return cleanKey && cleanValue && !ignoredKeys.has(cleanKey.toLowerCase());
  });
}

function buildOrderNotificationEmail({ order, customerName, customerPhone, details }) {
  const orderNumber = order.order_number;
  const total = Number(order.total_price);
  const totalText = `${Number.isFinite(total) ? total.toFixed(3) : '0.000'} ${order.currency || 'OMR'}`;
  const dashboardUrl = 'https://om-production-7de0.up.railway.app/admin.html';
  const rows = [
    ['Order number', orderNumber],
    ['Customer', customerName],
    ['Phone', customerPhone || '---'],
    ['Total', totalText],
    ['Invoice dashboard', dashboardUrl],
    ...getOrderEmailDetails(details).map(([key, value]) => [String(key).replace(/_/g, ' '), value])
  ];
  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n');
  const tableRows = rows.map(([label, value]) => (
    `<tr><td style="padding:8px 10px;border:1px solid #ddd;font-weight:700">${escapeHtml(label)}</td><td style="padding:8px 10px;border:1px solid #ddd">${escapeHtml(value)}</td></tr>`
  )).join('');
  const html = `<div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.7"><h2>New order #${escapeHtml(orderNumber)}</h2><table style="border-collapse:collapse;width:100%;max-width:760px">${tableRows}</table><p><a href="${dashboardUrl}">Open invoice dashboard</a></p></div>`;
  return { subject: `New Order #${orderNumber}`, text, html };
}

async function sendOrderNotification(payload) {
  const recipients = Array.from(orderNotificationEmails);
  if (!recipients.length) return false;

  const { subject, text, html } = buildOrderNotificationEmail(payload);
  const purpose = `Order notification ${payload.order.order_number}`;

  if (process.env.BREVO_API_KEY) {
    const senderEmail = process.env.BREVO_SENDER_EMAIL || process.env.SMTP_USER;
    if (!senderEmail) throw new Error('BREVO_SENDER_EMAIL is required');
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        sender: { name: 'Event QR Tech', email: senderEmail },
        to: recipients.map((email) => ({ email })),
        subject,
        textContent: text,
        htmlContent: html
      }),
      signal: AbortSignal.timeout(15000)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.message || `Brevo request failed (${response.status})`);
    console.log(`${purpose} accepted by Brevo: messageId=${result.messageId || 'unknown'}`);
    return true;
  }

  if (process.env.RESEND_API_KEY) {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || 'Event QR Tech <onboarding@resend.dev>',
        to: recipients,
        subject,
        text,
        html
      }),
      signal: AbortSignal.timeout(15000)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.message || `Resend request failed (${response.status})`);
    console.log(`${purpose} accepted by Resend: id=${result.id || 'unknown'}`);
    return true;
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) return false;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: String(process.env.SMTP_SECURE).toLowerCase() !== 'false',
    family: 4,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: recipients,
    subject,
    text,
    html
  });
  console.log(`${purpose} accepted by SMTP: messageId=${info.messageId || 'unknown'}`);
  return true;
}

const ORDER_NUMBER_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ORDER_NUMBER_DIGITS = '0123456789';
const ORDER_NUMBER_ALPHABET = `${ORDER_NUMBER_LETTERS}${ORDER_NUMBER_DIGITS}`;

function generateOrderNumber() {
  const chars = Array.from(
    { length: 8 },
    () => ORDER_NUMBER_ALPHABET[crypto.randomInt(ORDER_NUMBER_ALPHABET.length)]
  );
  const letterIndex = crypto.randomInt(chars.length);
  let digitIndex = crypto.randomInt(chars.length);
  while (digitIndex === letterIndex) digitIndex = crypto.randomInt(chars.length);
  chars[letterIndex] = ORDER_NUMBER_LETTERS[crypto.randomInt(ORDER_NUMBER_LETTERS.length)];
  chars[digitIndex] = ORDER_NUMBER_DIGITS[crypto.randomInt(ORDER_NUMBER_DIGITS.length)];
  return chars.join('');
}

app.get('/api/health', async (_req, res) => {
  await pool.query('SELECT 1');
  res.json({ ok: true });
});

app.post('/api/auth/request-otp', async (req, res) => {
  const type = 'email';
  const identifier = normalizeEmail(req.body.identifier);
  const purpose = req.body.mode === 'signup' ? 'signup' : req.body.mode === 'login' ? 'login' : null;
  if (!identifier) return res.status(400).json({ message: 'البريد الإلكتروني غير صحيح.' });
  if (!purpose) return res.status(400).json({ message: 'اختر تسجيل الدخول أو إنشاء حساب.' });

  const existingUser = await pool.query(
    'SELECT id FROM users WHERE identifier_type = $1 AND identifier = $2',
    [type, identifier]
  );
  if (purpose === 'login' && !existingUser.rows[0]) {
    return res.status(404).json({ message: 'لا يوجد حساب مسجل بهذا البريد. اختر إنشاء حساب أولاً.' });
  }
  if (purpose === 'signup' && existingUser.rows[0]) {
    return res.status(409).json({ message: 'هذا البريد مسجل مسبقاً. اختر تسجيل الدخول.' });
  }

  const signupName = purpose === 'signup' ? String(req.body.name || '').trim().slice(0, 150) : null;
  const signupPhone = purpose === 'signup' ? normalizeOmanMobile(req.body.phone) : null;
  if (purpose === 'signup' && (!signupName || !signupPhone)) {
    return res.status(400).json({ message: 'يرجى كتابة رقم الهاتف بالشكل الصحيح.' });
  }

  const recent = await pool.query(
    `SELECT created_at FROM otp_codes
     WHERE identifier_type = $1 AND identifier = $2
     ORDER BY created_at DESC LIMIT 1`,
    [type, identifier]
  );
  if (recent.rows[0] && Date.now() - new Date(recent.rows[0].created_at).getTime() < 30000) {
    return res.status(429).json({ message: 'انتظر 30 ثانية قبل طلب رمز جديد.' });
  }

  const code = String(crypto.randomInt(100000, 1000000));
  await pool.query(
    `INSERT INTO otp_codes (identifier_type, identifier, purpose, signup_name, signup_phone, code_hash, expires_at)
     VALUES ($1, $2, $3, $4, $5, $6, NOW() + INTERVAL '10 minutes')`,
    [type, identifier, purpose, signupName, signupPhone, hashOtp(identifier, code)]
  );

  let sent = false;
  try {
    sent = await sendEmailOtp(identifier, code);
  } catch (error) {
    console.error(`OTP delivery failed for ${identifier}:`, error.message);
  }

  if (!sent && isProduction) {
    await pool.query(
      `DELETE FROM otp_codes
       WHERE identifier_type = $1 AND identifier = $2 AND code_hash = $3 AND used_at IS NULL`,
      [type, identifier, hashOtp(identifier, code)]
    );
    return res.status(503).json({ message: 'خدمة إرسال رمز التحقق غير مهيأة حالياً.' });
  }
  if (!sent) console.log(`[DEV OTP] ${identifier}: ${code}`);

  res.json({
    message: 'تم إرسال الرمز إلى بريدك الإلكتروني.',
    ...(isProduction ? {} : { devCode: code })
  });
});

app.post('/api/auth/verify-otp', async (req, res) => {
  const type = 'email';
  const identifier = normalizeEmail(req.body.identifier);
  const purpose = req.body.mode === 'signup' ? 'signup' : req.body.mode === 'login' ? 'login' : null;
  const code = String(req.body.code || '').trim();
  if (!identifier || !purpose || !/^\d{6}$/.test(code)) return res.status(400).json({ message: 'بيانات التحقق غير صحيحة.' });

  const otpResult = await pool.query(
    `SELECT id, code_hash, attempts, expires_at, signup_name, signup_phone FROM otp_codes
     WHERE identifier_type = $1 AND identifier = $2 AND purpose = $3 AND used_at IS NULL
     ORDER BY created_at DESC LIMIT 1`,
    [type, identifier, purpose]
  );
  const otp = otpResult.rows[0];
  if (!otp || new Date(otp.expires_at) < new Date() || otp.attempts >= 5) {
    return res.status(400).json({ message: 'انتهت صلاحية الرمز. اطلب رمزاً جديداً.' });
  }
  if (otp.code_hash !== hashOtp(identifier, code)) {
    await pool.query('UPDATE otp_codes SET attempts = attempts + 1 WHERE id = $1', [otp.id]);
    return res.status(400).json({ message: 'رمز التحقق غير صحيح.' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const used = await client.query(
      'UPDATE otp_codes SET used_at = NOW() WHERE id = $1 AND used_at IS NULL RETURNING id',
      [otp.id]
    );
    if (!used.rows[0]) {
      await client.query('ROLLBACK');
      return res.status(400).json({ message: 'تم استخدام رمز التحقق مسبقاً.' });
    }

    let userResult;
    if (purpose === 'signup') {
      if (!otp.signup_name || !normalizePhone(otp.signup_phone)) {
        await client.query('ROLLBACK');
        return res.status(400).json({ message: 'بيانات إنشاء الحساب غير مكتملة. اطلب رمزاً جديداً.' });
      }
      userResult = await client.query(
        `INSERT INTO users (identifier_type, identifier, name, phone)
         VALUES ($1, $2, $3, $4)
         RETURNING id, identifier_type, identifier, name, phone, created_at`,
        [type, identifier, otp.signup_name, otp.signup_phone]
      );
    } else {
      userResult = await client.query(
        `SELECT id, identifier_type, identifier, name, phone, created_at
         FROM users WHERE identifier_type = $1 AND identifier = $2`,
        [type, identifier]
      );
      if (!userResult.rows[0]) {
        await client.query('ROLLBACK');
        return res.status(404).json({ message: 'لم يعد هذا الحساب موجوداً.' });
      }
    }
    await client.query('COMMIT');
    const user = userResult.rows[0];
    res.json({ token: createToken(user), user });
  } catch (error) {
    await client.query('ROLLBACK');
    if (error.code === '23505') {
      return res.status(409).json({ message: 'هذا البريد مسجل مسبقاً. اختر تسجيل الدخول.' });
    }
    throw error;
  } finally {
    client.release();
  }
});

app.get('/api/me', requireAuth, async (req, res) => {
  res.json({ user: req.user });
});

app.post('/api/me', requireAuth, async (req, res) => {
  const name = String(req.body.name || '').trim().slice(0, 150);
  const phone = normalizeOmanMobile(req.body.phone);
  if (!name || !phone) {
    return res.status(400).json({ message: 'يرجى إدخال الاسم ورقم هاتف صحيح.' });
  }

  const result = await pool.query(
    `UPDATE users
     SET name = $1, phone = $2
     WHERE id = $3
     RETURNING id, identifier_type, identifier, name, phone, created_at`,
    [name, phone, req.user.id]
  );

  res.json({ user: result.rows[0] });
});

app.post('/api/me/delete-otp', requireAuth, async (req, res) => {
  const identifier = normalizeEmail(req.body.identifier);
  if (!identifier || identifier !== req.user.identifier) {
    return res.status(400).json({ message: 'اكتب نفس بريد حسابك المسجل لتأكيد الحذف.' });
  }

  const recent = await pool.query(
    `SELECT created_at FROM otp_codes
     WHERE identifier_type = $1 AND identifier = $2 AND purpose = $3
     ORDER BY created_at DESC LIMIT 1`,
    ['email', identifier, 'delete']
  );
  if (recent.rows[0] && Date.now() - new Date(recent.rows[0].created_at).getTime() < 30000) {
    return res.status(429).json({ message: 'انتظر 30 ثانية قبل طلب رمز جديد.' });
  }

  const code = String(crypto.randomInt(100000, 1000000));
  await pool.query(
    `INSERT INTO otp_codes (identifier_type, identifier, purpose, code_hash, expires_at)
     VALUES ($1, $2, $3, $4, NOW() + INTERVAL '10 minutes')`,
    ['email', identifier, 'delete', hashOtp(identifier, code)]
  );

  let sent = false;
  try {
    sent = await sendEmailOtp(identifier, code);
  } catch (error) {
    console.error(`Account delete OTP delivery failed for ${identifier}:`, error.message);
  }

  if (!sent && isProduction) {
    await pool.query(
      `DELETE FROM otp_codes
       WHERE identifier_type = $1 AND identifier = $2 AND purpose = $3 AND code_hash = $4 AND used_at IS NULL`,
      ['email', identifier, 'delete', hashOtp(identifier, code)]
    );
    return res.status(503).json({ message: 'خدمة إرسال رمز التحقق غير مهيأة حاليا.' });
  }
  if (!sent) console.log(`[DEV DELETE OTP] ${identifier}: ${code}`);

  res.json({
    message: 'تم إرسال رمز تأكيد حذف الحساب إلى بريدك الإلكتروني.',
    ...(isProduction ? {} : { devCode: code })
  });
});

app.delete('/api/me', requireAuth, async (req, res) => {
  const identifier = normalizeEmail(req.body.identifier);
  const code = String(req.body.code || '').trim();
  if (!identifier || identifier !== req.user.identifier || !/^\d{6}$/.test(code)) {
    return res.status(400).json({ message: 'بيانات تأكيد الحذف غير صحيحة.' });
  }

  const otpResult = await pool.query(
    `SELECT id, code_hash, attempts, expires_at FROM otp_codes
     WHERE identifier_type = $1 AND identifier = $2 AND purpose = $3 AND used_at IS NULL
     ORDER BY created_at DESC LIMIT 1`,
    ['email', identifier, 'delete']
  );
  const otp = otpResult.rows[0];
  if (!otp || new Date(otp.expires_at) < new Date() || otp.attempts >= 5) {
    return res.status(400).json({ message: 'انتهت صلاحية الرمز. اطلب رمزا جديدا.' });
  }
  if (otp.code_hash !== hashOtp(identifier, code)) {
    await pool.query('UPDATE otp_codes SET attempts = attempts + 1 WHERE id = $1', [otp.id]);
    return res.status(400).json({ message: 'رمز التحقق غير صحيح.' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const used = await client.query(
      'UPDATE otp_codes SET used_at = NOW() WHERE id = $1 AND used_at IS NULL RETURNING id',
      [otp.id]
    );
    if (!used.rows[0]) {
      await client.query('ROLLBACK');
      return res.status(400).json({ message: 'تم استخدام رمز التحقق مسبقا.' });
    }

    const deleted = await client.query(
      'DELETE FROM users WHERE id = $1 AND identifier = $2 RETURNING id',
      [req.user.id, identifier]
    );
    if (!deleted.rows[0]) {
      await client.query('ROLLBACK');
      return res.status(404).json({ message: 'لم يعد هذا الحساب موجودا.' });
    }

    await client.query('COMMIT');
    res.json({ deleted: true });
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
});

app.get('/api/orders', requireAuth, async (req, res) => {
  const result = await pool.query(
    `SELECT order_number, customer_name, customer_phone, total_price, currency, details, created_at
     FROM orders WHERE user_id = $1 ORDER BY created_at DESC LIMIT 100`,
    [req.user.id]
  );
  res.json({ orders: result.rows });
});

app.get('/api/admin/orders', requireAuth, requireAdmin, async (req, res) => {
  const search = String(req.query.search || '').trim().slice(0, 150);
  const values = [];
  let where = '';
  if (search) {
    values.push(`%${search}%`);
    where = `WHERE o.order_number ILIKE $1 OR o.customer_name ILIKE $1 OR COALESCE(u.identifier, '') ILIKE $1`;
  }
  const result = await pool.query(
    `SELECT o.order_number, o.customer_name, o.customer_phone, o.total_price, o.currency,
            o.details, o.created_at, u.identifier AS customer_email
     FROM orders o
     LEFT JOIN users u ON u.id = o.user_id
     ${where}
     ORDER BY o.created_at DESC
     LIMIT 500`,
    values
  );
  res.json({ orders: result.rows });
});

app.delete('/api/admin/orders/:orderNumber', requireAuth, requireAdmin, async (req, res) => {
  const orderNumber = String(req.params.orderNumber || '').trim().slice(0, 24);
  if (!orderNumber) {
    return res.status(400).json({ message: 'رقم الطلب غير صالح.' });
  }

  const result = await pool.query(
    'DELETE FROM orders WHERE order_number = $1 RETURNING order_number',
    [orderNumber]
  );
  if (!result.rows[0]) {
    return res.status(404).json({ message: 'تعذر العثور على الفاتورة.' });
  }

  res.json({ orderNumber: result.rows[0].order_number });
});

app.post('/api/orders', optionalAuth, async (req, res) => {
  const customerName = String(req.body.customerName || '').trim().slice(0, 150);
  const customerPhone = String(req.body.customerPhone || '').trim().slice(0, 30);
  const totalPrice = Number(req.body.totalPrice);
  const details = req.body.details && typeof req.body.details === 'object' ? req.body.details : {};
  const orderUser = req.user && !adminEmails.has(req.user.identifier) ? req.user : null;
  if (!customerName || !Number.isFinite(totalPrice) || totalPrice < 0) {
    return res.status(400).json({ message: 'بيانات الطلب غير مكتملة.' });
  }

  let order;
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const orderNumber = generateOrderNumber();
    try {
      const result = await pool.query(
        `INSERT INTO orders (order_number, user_id, customer_name, customer_phone, total_price, details)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING order_number, total_price, currency, created_at`,
        [
          orderNumber,
          orderUser?.id || null,
          customerName,
          customerPhone || null,
          totalPrice.toFixed(3),
          { ...details, رقم_الطلب: orderNumber, نوع_العميل: orderUser ? 'حساب مسجل' : 'طلب ضيف' }
        ]
      );
      order = result.rows[0];
      break;
    } catch (error) {
      if (error.code !== '23505') throw error;
    }
  }
  if (!order) return res.status(500).json({ message: 'تعذر إنشاء رقم الطلب.' });
  res.status(201).json({ order });
  sendOrderNotification({ order, customerName, customerPhone, details })
    .then((sent) => {
      if (!sent) console.warn(`Order notification skipped for ${order.order_number}: no email provider or recipients configured.`);
    })
    .catch((error) => console.error(`Order notification failed for ${order.order_number}:`, error.message));
});

app.use('/api', (_req, res) => res.status(404).json({ message: 'Not found' }));
app.get('*path', (_req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: 'حدث خطأ في الخادم. حاول مرة أخرى.' });
});

initializeDatabase()
  .then(() => app.listen(port, () => console.log(`Event QR server running on port ${port}`)))
  .catch((error) => {
    console.error('Database initialization failed:', error);
    process.exit(1);
  });
