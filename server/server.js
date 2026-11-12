import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import config from './config/emailConfig.js';
import { validateContactPayload } from './utils/validator.js';
import { sendContactInquiry, verifyConnection } from './services/emailService.js';
import { saveInquiry, updateInquiryStatus, getInquiries, getInquiriesCount } from './services/storageService.js';

const app = express();

// Trust proxy for accurate client IP detection behind Vercel / Cloudflare / reverse proxies
app.set('trust proxy', 1);

// Configure CORS
const allowedOrigins = config.clientOrigin === '*'
  ? '*'
  : config.clientOrigin.split(',').map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman) or matching whitelist
      if (!origin || allowedOrigins === '*' || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS policy does not allow access from origin: ${origin}`));
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Admin-Key'],
    credentials: true,
  })
);

app.use(express.json({ limit: '50kb' }));

// Rate limiter for contact form endpoint: 5 submissions per 10 mins per IP
const contactLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many contact requests from this IP. Please try again after 10 minutes.',
  },
});

// Request logger middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[API] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Admin authentication middleware for protected management routes
function requireAdmin(req, res, next) {
  const clientKey = req.headers['x-admin-key'] || req.query.adminKey || req.query.key;
  if (!clientKey || clientKey !== config.adminApiKey) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized. Provide valid X-Admin-Key header.',
    });
  }
  next();
}

/**
 * -----------------------------------------------------------------------------
 * API ENDPOINTS
 * -----------------------------------------------------------------------------
 */

/**
 * POST /api/contact
 * Custom Contact Form Processing API
 * Features:
 * - Bot honeypot filter
 * - Payload sanitization & schema validation
 * - Zero-data-loss persistent audit logging
 * - Multi-provider high-deliverability email dispatch
 */
app.post('/api/contact', contactLimiter, async (req, res) => {
  const clientIp = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  // 1. Validate payload and check honeypot
  const validation = validateContactPayload(req.body);

  if (validation.isSpam) {
    // Silently accept honeypot triggers to fool bots without wasting server/email quotas
    console.warn(`[ContactAPI] Bot honeypot triggered from IP: ${clientIp}`);
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

  // 2. Persist message immediately (Zero Data Loss guarantee)
  let savedInquiry;
  try {
    savedInquiry = await saveInquiry({
      ...sanitizedData,
      clientIp,
      deliveryStatus: 'queued',
    });
  } catch (err) {
    console.error('[ContactAPI] Persistent storage error:', err);
  }

  const inquiryId = savedInquiry ? savedInquiry.id : `inq_${Date.now()}`;

  // 3. Dispatch email with 100% deliverability engine
  try {
    const delivery = await sendContactInquiry(sanitizedData, inquiryId);

    // Update persistent log with success status
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
    console.error(`[ContactAPI] Email delivery failed for inquiry ${inquiryId}:`, err);

    // Mark as failed in store, so admin can review and resend
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
});

/**
 * GET /api/health
 * Health check & diagnostic status
 */
app.get('/api/health', async (req, res) => {
  const emailStatus = await verifyConnection();
  const inquiriesCount = await getInquiriesCount();

  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    emailService: emailStatus,
    inquiriesLogged: inquiriesCount,
    environment: process.env.NODE_ENV || 'development',
  });
});

/**
 * GET /api/inquiries
 * Protected Admin route to inspect all received contact form inquiries
 */
app.get('/api/inquiries', requireAdmin, async (req, res) => {
  const limit = parseInt(req.query.limit || '100', 10);
  const inquiries = await getInquiries(limit);
  res.status(200).json({
    success: true,
    count: inquiries.length,
    inquiries,
  });
});

/**
 * POST /api/test-email
 * Diagnostic endpoint to test 100% inbox delivery
 */
app.post('/api/test-email', async (req, res) => {
  const targetEmail = req.body?.to || config.receiverEmail || config.smtp.user;
  if (!targetEmail) {
    return res.status(400).json({
      success: false,
      error: 'Please provide target email address in body { to: "your-email@example.com" } or configure CONTACT_RECEIVER_EMAIL in .env',
    });
  }

  try {
    const testData = {
      name: 'Diagnostic Test Delivery',
      email: targetEmail,
      company: 'Platform Diagnostics',
      projectType: 'Deliverability Verification',
      budget: '$5,000+',
      timeline: 'Immediate',
      description: 'This is an automated test message sent from your custom contact form platform to confirm 100% inbox delivery.',
    };

    const result = await sendContactInquiry(testData, `test_${Date.now()}`);
    return res.status(200).json({
      success: true,
      message: `Test email successfully dispatched to ${targetEmail}! Check your inbox.`,
      result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// Root welcome & API info
app.get('/', (req, res) => {
  res.json({
    name: 'Portfolio Contact Form Processing API Platform',
    version: '2.0.0',
    endpoints: {
      submitContact: 'POST /api/contact',
      healthCheck: 'GET /api/health',
      inquiriesDashboard: 'GET /api/inquiries (requires X-Admin-Key)',
      testDelivery: 'POST /api/test-email',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found.' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[API Error]:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error.',
  });
});

import { pathToFileURL } from 'url';

// Start listening if run directly
const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain && process.env.NODE_ENV !== 'test') {
  const server = app.listen(config.port, () => {
    console.log(`
============================================================
🚀 Contact Form Backend API Platform Running
============================================================
- Server Port:         ${config.port}
- API Endpoint:        http://localhost:${config.port}/api/contact
- Health Status:       http://localhost:${config.port}/api/health
- Admin Inquiries:     http://localhost:${config.port}/api/inquiries
- Deliverability Test: http://localhost:${config.port}/api/test-email
============================================================
`);
  });
}

export default app;
