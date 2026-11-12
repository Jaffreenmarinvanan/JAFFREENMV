import { verifyConnection } from '../server/services/emailService.js';
import { getInquiriesCount } from '../server/services/storageService.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const emailStatus = await verifyConnection();
  const inquiriesCount = await getInquiriesCount();

  res.status(200).json({
    status: 'healthy',
    platform: 'vercel-serverless',
    timestamp: new Date().toISOString(),
    emailService: emailStatus,
    inquiriesLogged: inquiriesCount,
  });
}

