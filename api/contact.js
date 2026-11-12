import { validateContactPayload } from '../server/utils/validator.js';
import { sendContactInquiry } from '../server/services/emailService.js';
import { saveInquiry, updateInquiryStatus } from '../server/services/storageService.js';

/**
 * Vercel Serverless Function for /api/contact
 */
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Admin-Key'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'vercel-serverless';

  // 1. Validate payload and check honeypot
  const validation = validateContactPayload(req.body);

  if (validation.isSpam) {
    console.warn(`[VercelAPI] Bot honeypot triggered from IP: ${clientIp}`);
    return res.status(200).json({
      success: true,
      message: 'Message processed.',
    });
  }

  if (!validation.valid) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed.',
      details: validation.errors,
    });
  }

  const sanitizedData = validation.data;

  // 2. Persist message
  let savedInquiry;
  try {
    savedInquiry = await saveInquiry({
      ...sanitizedData,
      clientIp,
      deliveryStatus: 'queued',
    });
  } catch (err) {
    console.error('[VercelAPI] Storage error:', err);
  }

  const inquiryId = savedInquiry ? savedInquiry.id : `inq_${Date.now()}`;

  // 3. Dispatch email with deliverability engine
  try {
    const delivery = await sendContactInquiry(sanitizedData, inquiryId);

    await updateInquiryStatus(inquiryId, {
      deliveryStatus: 'delivered',
      deliveryProvider: delivery.provider,
      deliveryId: delivery.deliveryId,
    });

    return res.status(200).json({
      success: true,
      message: "Your message has been delivered directly to Jaffreen's inbox! Thank you for getting in touch.",
      inquiryId,
      provider: delivery.provider,
      note: delivery.note || undefined,
    });
  } catch (err) {
    console.error(`[VercelAPI] Email delivery failed for inquiry ${inquiryId}:`, err);

    await updateInquiryStatus(inquiryId, {
      deliveryStatus: 'failed',
      deliveryError: err.message,
    });

    return res.status(500).json({
      success: false,
      error: 'Message saved securely, but external email delivery encountered a temporary issue. Jaffreen has been notified.',
      inquiryId,
    });
  }
}

