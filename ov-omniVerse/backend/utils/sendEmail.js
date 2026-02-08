// backend/utils/sendEmail.js
const nodemailer = require('nodemailer');

async function sendEmail({ to, subject, text }) {
  // Simple nodemailer stub — configure real transporter with env vars
  const transporter = nodemailer.createTransport({ sendmail: true });
  await transporter.sendMail({ from: 'no-reply@ov.com', to, subject, text });
}

module.exports = sendEmail;
