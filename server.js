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

app.use(express.json({ limit: '250kb' }));
app.use(express.static(__dirname, { extensions: ['html'] }));

async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id BIGSERIAL PRIMARY KEY,
      identifier_type VARCHAR(10) NOT NULL CHECK (identifier_type IN ('email', 'phone')),
      identifier VARCHAR(320) NOT NULL,
      name VARCHAR(150),
      verified_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE(identifier_type, identifier)
    );

    CREATE TABLE IF NOT EXISTS otp_codes (
      id BIGSERIAL PRIMARY KEY,
      identifier_type VARCHAR(10) NOT NULL CHECK (identifier_type IN ('email', 'phone')),
      identifier VARCHAR(320) NOT NULL,
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
      user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      customer_name VARCHAR(150) NOT NULL,
      customer_phone VARCHAR(30),
      total_price NUMERIC(12,3) NOT NULL CHECK (total_price >= 0),
      currency VARCHAR(8) NOT NULL DEFAULT 'OMR',
      details JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS orders_user_created_idx
      ON orders(user_id, created_at DESC);
  `);
}

function normalizeEmail(value) {
  const clean = String(value || '').trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean) ? clean : null;
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
      'SELECT id, identifier_type, identifier, name, created_at FROM users WHERE id = $1',
      [payload.sub]
    );
    if (!result.rows[0]) throw new Error('User not found');
    req.user = result.rows[0];
    next();
  } catch {
    res.status(401).json({ message: 'يرجى تسجيل الدخول أولاً.' });
  }
}

async function sendEmailOtp(email, code) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) return false;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: String(process.env.SMTP_SECURE).toLowerCase() !== 'false',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: 'رمز التحقق - Event QR Tech',
    text: `رمز التحقق الخاص بك هو: ${code}\nينتهي خلال 10 دقائق.`,
    html: `<div dir="rtl"><h2>Event QR Tech</h2><p>رمز التحقق الخاص بك:</p><p style="font-size:30px;font-weight:bold;letter-spacing:6px">${code}</p><p>ينتهي خلال 10 دقائق.</p></div>`
  });
  return true;
}

app.get('/api/health', async (_req, res) => {
  await pool.query('SELECT 1');
  res.json({ ok: true });
});

app.post('/api/auth/request-otp', async (req, res) => {
  const type = 'email';
  const identifier = normalizeEmail(req.body.identifier);
  if (!identifier) return res.status(400).json({ message: 'البريد الإلكتروني غير صحيح.' });

  const recent = await pool.query(
    `SELECT created_at FROM otp_codes
     WHERE identifier_type = $1 AND identifier = $2
     ORDER BY created_at DESC LIMIT 1`,
    [type, identifier]
  );
  if (recent.rows[0] && Date.now() - new Date(recent.rows[0].created_at).getTime() < 60000) {
    return res.status(429).json({ message: 'انتظر دقيقة قبل طلب رمز جديد.' });
  }

  const code = String(crypto.randomInt(100000, 1000000));
  await pool.query(
    `INSERT INTO otp_codes (identifier_type, identifier, code_hash, expires_at)
     VALUES ($1, $2, $3, NOW() + INTERVAL '10 minutes')`,
    [type, identifier, hashOtp(identifier, code)]
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
  const code = String(req.body.code || '').trim();
  if (!identifier || !/^\d{6}$/.test(code)) return res.status(400).json({ message: 'بيانات التحقق غير صحيحة.' });

  const otpResult = await pool.query(
    `SELECT id, code_hash, attempts, expires_at FROM otp_codes
     WHERE identifier_type = $1 AND identifier = $2 AND used_at IS NULL
     ORDER BY created_at DESC LIMIT 1`,
    [type, identifier]
  );
  const otp = otpResult.rows[0];
  if (!otp || new Date(otp.expires_at) < new Date() || otp.attempts >= 5) {
    return res.status(400).json({ message: 'انتهت صلاحية الرمز. اطلب رمزاً جديداً.' });
  }
  if (otp.code_hash !== hashOtp(identifier, code)) {
    await pool.query('UPDATE otp_codes SET attempts = attempts + 1 WHERE id = $1', [otp.id]);
    return res.status(400).json({ message: 'رمز التحقق غير صحيح.' });
  }

  await pool.query('UPDATE otp_codes SET used_at = NOW() WHERE id = $1', [otp.id]);
  const userResult = await pool.query(
    `INSERT INTO users (identifier_type, identifier, name)
     VALUES ($1, $2, NULLIF($3, ''))
     ON CONFLICT (identifier_type, identifier)
     DO UPDATE SET name = COALESCE(NULLIF(EXCLUDED.name, ''), users.name)
     RETURNING id, identifier_type, identifier, name, created_at`,
    [type, identifier, String(req.body.name || '').trim().slice(0, 150)]
  );
  const user = userResult.rows[0];
  res.json({ token: createToken(user), user });
});

app.get('/api/me', requireAuth, async (req, res) => {
  res.json({ user: req.user });
});

app.get('/api/orders', requireAuth, async (req, res) => {
  const result = await pool.query(
    `SELECT order_number, total_price, currency, created_at
     FROM orders WHERE user_id = $1 ORDER BY created_at DESC LIMIT 100`,
    [req.user.id]
  );
  res.json({ orders: result.rows });
});

app.post('/api/orders', requireAuth, async (req, res) => {
  const customerName = String(req.body.customerName || '').trim().slice(0, 150);
  const customerPhone = String(req.body.customerPhone || '').trim().slice(0, 30);
  const totalPrice = Number(req.body.totalPrice);
  const details = req.body.details && typeof req.body.details === 'object' ? req.body.details : {};
  if (!customerName || !Number.isFinite(totalPrice) || totalPrice < 0) {
    return res.status(400).json({ message: 'بيانات الطلب غير مكتملة.' });
  }

  let order;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const orderNumber = `EQR-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;
    try {
      const result = await pool.query(
        `INSERT INTO orders (order_number, user_id, customer_name, customer_phone, total_price, details)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING order_number, total_price, currency, created_at`,
        [orderNumber, req.user.id, customerName, customerPhone || null, totalPrice.toFixed(3), { ...details, رقم_الطلب: orderNumber }]
      );
      order = result.rows[0];
      break;
    } catch (error) {
      if (error.code !== '23505') throw error;
    }
  }
  if (!order) return res.status(500).json({ message: 'تعذر إنشاء رقم الطلب.' });
  res.status(201).json({ order });
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
