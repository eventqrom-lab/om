# Event QR Tech

موقع طلب بطاقات QR مع حسابات زبائن بدون كلمة مرور، تحقق OTP، وقاعدة بيانات PostgreSQL.

## التشغيل

1. انسخ `.env.example` إلى `.env` وأدخل بيانات PostgreSQL.
2. شغل `npm install`.
3. شغل `npm start`.

الخادم ينشئ تلقائياً جداول `users` و`otp_codes` و`orders`.

## إعداد OTP

- البريد: أدخل `SMTP_HOST` و`SMTP_USER` و`SMTP_PASS` و`SMTP_FROM`.
- واتساب: أدخل `TWILIO_ACCOUNT_SID` و`TWILIO_AUTH_TOKEN` و`TWILIO_WHATSAPP_FROM`.
- في وضع التطوير فقط، إذا لم تجهز خدمات الإرسال، يظهر رمز OTP في سجل الخادم وفي نافذة الحساب.
- في الإنتاج لا يظهر الرمز أبداً، ويفشل الطلب برسالة واضحة إذا لم تجهز خدمة الإرسال.

## Railway

1. أنشئ مشروعاً وخدمة PostgreSQL.
2. انشر هذا المجلد كخدمة Node.js.
3. أضف متغيرات البيئة التالية:

```text
NODE_ENV=production
JWT_SECRET=<long-random-secret>
DATABASE_URL=${{Postgres.DATABASE_URL}}
DATABASE_SSL=false
SMTP_HOST=...
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=...
SMTP_PASS=...
SMTP_FROM=...
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_WHATSAPP_FROM=whatsapp:...
```

Railway يستخدم `railway.json` لتشغيل `npm start` وفحص `/api/health`.
