import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from root or server directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config(); // Fallback to current working directory .env

export const config = {
  port: process.env.PORT || 5000,
  clientOrigin: process.env.CLIENT_ORIGIN || '*',
  adminApiKey: process.env.ADMIN_API_KEY || 'admin-secret-change-in-production',

  // Email Routing (Pre-configured for Jaffreen Maraivanan)
  receiverEmail: process.env.CONTACT_RECEIVER_EMAIL || 'jaffreenmarinvanan4@gmail.com',
  fromEmail: process.env.EMAIL_FROM || '"Jaffreen Maraivanan" <jaffreenmarinvanan4@gmail.com>',
  sendAutoReply: process.env.SEND_AUTO_REPLY !== 'false', // Enabled by default to send instant client confirmation receipt

  // Provider selection: 'auto' | 'smtp' | 'resend'
  provider: process.env.EMAIL_PROVIDER || 'auto',

  // SMTP Settings (e.g., Gmail, Brevo, SendGrid, Amazon SES, Outlook)
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465', 10),
    secure: process.env.SMTP_SECURE !== 'false', // default true for 465
    user: process.env.SMTP_USER || 'jaffreenmarinvanan4@gmail.com',
    pass: process.env.SMTP_PASS || '',
    service: process.env.SMTP_SERVICE || 'gmail',
  },

  // Resend API Settings
  resend: {
    apiKey: process.env.RESEND_API_KEY || '',
  },

  // Rate Limiting
  rateLimit: {
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 5, // max 5 submissions per 10 minutes per IP
  },
};

export default config;

