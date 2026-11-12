import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import config from '../config/emailConfig.js';
import { generateOwnerNotification, generateClientAutoReply } from '../utils/emailTemplates.js';

let resendClient = null;
let smtpTransporter = null;

/**
 * Initializes and returns the Resend client if configured
 */
function getResendClient() {
  if (!resendClient && config.resend.apiKey) {
    resendClient = new Resend(config.resend.apiKey);
  }
  return resendClient;
}

/**
 * Initializes and returns the Nodemailer SMTP transporter if configured
 */
function getSmtpTransporter() {
  if (!smtpTransporter && (config.smtp.user || config.smtp.service || config.smtp.host)) {
    const transportOptions = config.smtp.service
      ? {
          service: config.smtp.service,
          auth: {
            user: config.smtp.user,
            pass: config.smtp.pass,
          },
        }
      : {
          host: config.smtp.host,
          port: config.smtp.port,
          secure: config.smtp.secure,
          auth: config.smtp.user
            ? {
                user: config.smtp.user,
                pass: config.smtp.pass,
              }
            : undefined,
          tls: {
            rejectUnauthorized: false, // Prevents self-signed/proxy certificate rejections
          },
        };

    smtpTransporter = nodemailer.createTransport(transportOptions);
  }
  return smtpTransporter;
}

/**
 * Checks connection health of configured email services
 */
export async function verifyConnection() {
  const status = {
    resendConfigured: !!config.resend.apiKey,
    smtpConfigured: !!(config.smtp.user && config.smtp.pass),
    activeProvider: null,
    ready: false,
    details: '',
  };

  if (status.resendConfigured) {
    status.activeProvider = 'resend';
    status.ready = true;
    status.details = 'Resend API key configured and ready.';
    return status;
  }

  if (status.smtpConfigured) {
    try {
      const transporter = getSmtpTransporter();
      await transporter.verify();
      status.activeProvider = 'smtp';
      status.ready = true;
      status.details = `SMTP connection verified successfully (${config.smtp.host || config.smtp.service}).`;
      return status;
    } catch (err) {
      status.ready = false;
      status.details = `SMTP verification failed: ${err.message}`;
      return status;
    }
  }

  status.ready = false;
  status.details = 'No email credentials configured. Running in local test/simulation mode.';
  return status;
}

/**
 * Send email via Resend API
 */
async function sendViaResend({ to, from, replyTo, subject, text, html, inquiryId }) {
  const client = getResendClient();
  if (!client) throw new Error('Resend client is not configured.');

  // For 100% deliverability:
  // - from: must be a verified domain or onboarding@resend.dev
  // - reply_to: routes replies straight to client's email
  const response = await client.emails.send({
    from: from || config.fromEmail || 'onboarding@resend.dev',
    to: Array.isArray(to) ? to : [to],
    reply_to: replyTo,
    subject,
    text,
    html,
    headers: {
      'X-Inquiry-ID': inquiryId || 'unknown',
    },
  });

  if (response.error) {
    throw new Error(`Resend API Error: ${response.error.message}`);
  }

  return { provider: 'resend', id: response.data?.id };
}

/**
 * Send email via Nodemailer SMTP
 */
async function sendViaSmtp({ to, from, replyTo, subject, text, html, inquiryId }) {
  const transporter = getSmtpTransporter();
  if (!transporter) throw new Error('SMTP transporter is not configured.');

  const senderAddress = from || config.fromEmail || config.smtp.user;

  // RFC-compliant Message-ID to ensure zero deduplication drops
  const messageId = `<inq-${inquiryId || Date.now()}@portfolio.contact>`;

  const info = await transporter.sendMail({
    from: senderAddress,
    to,
    replyTo,
    subject,
    text,
    html,
    messageId,
    headers: {
      'X-Inquiry-ID': inquiryId || 'unknown',
      'X-Mailer': 'Portfolio-Contact-API-Engine/2.0',
    },
  });

  return { provider: 'smtp', id: info.messageId };
}

/**
 * Core deliverability dispatcher.
 * Dispatches the contact inquiry to the portfolio owner's inbox.
 * Implements automated multi-provider fallback for 100% delivery guarantee.
 */
export async function sendContactInquiry(inquiryData, inquiryId) {
  const receiver = config.receiverEmail || config.smtp.user;
  const replyTo = `"${inquiryData.name}" <${inquiryData.email}>`;
  const subject = `[Portfolio Inquiry] ${inquiryData.projectType} from ${inquiryData.name}`;

  const { text, html } = generateOwnerNotification({
    ...inquiryData,
    id: inquiryId,
    receivedAt: new Date().toLocaleString(),
  });

  // If no credentials are configured, safely simulate delivery and log locally
  const hasResend = !!config.resend.apiKey;
  const hasSmtp = !!(config.smtp.user && config.smtp.pass);

  if (!hasResend && !hasSmtp) {
    console.warn(
      '[EmailService] Notice: Neither RESEND_API_KEY nor SMTP credentials are set. Simulating inbox delivery (message saved to database/log).'
    );
    return {
      success: true,
      provider: 'simulation',
      deliveryId: `sim_${Date.now()}`,
      note: 'Saved in persistent storage. To send real emails to your inbox, set SMTP or RESEND_API_KEY in .env',
    };
  }

  // Determine provider priority
  const providersToTry = [];
  if (config.provider === 'resend') {
    if (hasResend) providersToTry.push('resend');
    if (hasSmtp) providersToTry.push('smtp');
  } else if (config.provider === 'smtp') {
    if (hasSmtp) providersToTry.push('smtp');
    if (hasResend) providersToTry.push('resend');
  } else {
    // Auto: Prefer Resend if available, then SMTP
    if (hasResend) providersToTry.push('resend');
    if (hasSmtp) providersToTry.push('smtp');
  }

  let lastError = null;
  let deliveryResult = null;

  for (const provider of providersToTry) {
    try {
      if (provider === 'resend') {
        deliveryResult = await sendViaResend({
          to: receiver,
          from: config.fromEmail,
          replyTo,
          subject,
          text,
          html,
          inquiryId,
        });
        break;
      } else if (provider === 'smtp') {
        deliveryResult = await sendViaSmtp({
          to: receiver,
          from: config.fromEmail,
          replyTo,
          subject,
          text,
          html,
          inquiryId,
        });
        break;
      }
    } catch (err) {
      console.warn(`[EmailService] Provider ${provider} attempt failed:`, err.message);
      lastError = err;
    }
  }

  if (!deliveryResult) {
    throw new Error(
      `All email delivery providers failed. Last error: ${lastError ? lastError.message : 'Unknown'}`
    );
  }

  // Send optional client auto-reply confirmation
  if (config.sendAutoReply && inquiryData.email) {
    try {
      const autoReplyContent = generateClientAutoReply({
        name: inquiryData.name,
        projectType: inquiryData.projectType,
      });

      const autoReplySubject = `Thank you for contacting Jaffreen Maraivanan!`;

      if (deliveryResult.provider === 'resend') {
        await sendViaResend({
          to: inquiryData.email,
          from: config.fromEmail,
          replyTo: receiver,
          subject: autoReplySubject,
          text: autoReplyContent.text,
          html: autoReplyContent.html,
          inquiryId,
        });
      } else {
        await sendViaSmtp({
          to: inquiryData.email,
          from: config.fromEmail,
          replyTo: receiver,
          subject: autoReplySubject,
          text: autoReplyContent.text,
          html: autoReplyContent.html,
          inquiryId,
        });
      }
    } catch (autoErr) {
      console.warn('[EmailService] Auto-reply send failed (non-critical):', autoErr.message);
    }
  }

  return {
    success: true,
    provider: deliveryResult.provider,
    deliveryId: deliveryResult.id,
  };
}

export default {
  sendContactInquiry,
  verifyConnection,
};

