require('dotenv').config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Expected env vars: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, TO_EMAIL
if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.TO_EMAIL) {
  console.warn(
    "Warning: SMTP environment variables not fully set. Server will still start but sending will fail until SMTP_HOST, SMTP_USER, SMTP_PASS and TO_EMAIL are set."
  );
}

// Create transporter once
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || '127.0.0.1',
  port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
  secure: false,
  auth: process.env.SMTP_USER
    ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    : undefined,
});

// Verify transporter (will log success or the error)
transporter.verify((error, success) => {
  if (error) {
    console.warn('SMTP verify failed:', error.message || error);
  } else {
    console.log('SMTP connection successful');
  }
});

app.post("/api/send", async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!message && !email && !name) {
    return res.status(400).json({ error: "Missing name/email/message" });
  }

  try {
    // Compose email. Use the authenticated SMTP user as the envelope 'from' so providers accept it.
    // Set replyTo to the visitor's email so you can reply directly to them (PHP mail() often uses From/Reply-To similarly).
    const senderAddress = process.env.SMTP_USER || 'no-reply@example.com';
    const senderName = process.env.SMTP_FROM_NAME || 'Website Contact';

    const mailOptions = {
      from: `${senderName} <${senderAddress}>`,
      to: process.env.TO_EMAIL,
      subject: process.env.EMAIL_SUBJECT_PREFIX
        ? `${process.env.EMAIL_SUBJECT_PREFIX} - ${name || 'Website Visitor'}`
        : `Website contact from ${name || 'Website Visitor'}`,
      text: `${message || ''}\n\nName: ${name || ''}\nEmail: ${email || ''}`,
      replyTo: email || undefined,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info && info.messageId ? info.messageId : info);
    return res.status(200).json({ ok: true, messageId: info && info.messageId ? info.messageId : null });
  } catch (err) {
    console.error("Failed to send email", err && err.message ? err.message : err);
    return res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(PORT, () => {
  console.log(`Email server listening on port ${PORT}`);
});
