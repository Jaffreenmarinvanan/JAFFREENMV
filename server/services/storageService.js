import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

// In-memory cache fallback for serverless or read-only environments
let inMemoryInquiries = [];

function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(INQUIRIES_FILE)) {
      fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2), 'utf8');
    }
  } catch (err) {
    console.warn('[Storage] Warning: Filesystem initialization failed, using in-memory store:', err.message);
  }
}

// Initial check
ensureDataDir();

/**
 * Saves a new inquiry record
 */
export async function saveInquiry(record) {
  const entry = {
    id: record.id || `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
    name: record.name,
    email: record.email,
    company: record.company || 'Not specified',
    projectType: record.projectType,
    budget: record.budget || 'Not specified',
    timeline: record.timeline || 'Not specified',
    description: record.description,
    clientIp: record.clientIp || 'unknown',
    deliveryStatus: record.deliveryStatus || 'pending',
    deliveryProvider: record.deliveryProvider || null,
    deliveryError: record.deliveryError || null,
    autoReplySent: !!record.autoReplySent,
  };

  try {
    ensureDataDir();
    let list = [];
    if (fs.existsSync(INQUIRIES_FILE)) {
      const content = fs.readFileSync(INQUIRIES_FILE, 'utf8');
      list = JSON.parse(content || '[]');
    }
    list.unshift(entry); // newest first
    // Keep last 1000 inquiries to prevent file from growing indefinitely
    if (list.length > 1000) list = list.slice(0, 1000);
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(list, null, 2), 'utf8');
  } catch (err) {
    console.warn('[Storage] Could not write to disk, saving to in-memory store:', err.message);
  }

  inMemoryInquiries.unshift(entry);
  if (inMemoryInquiries.length > 1000) inMemoryInquiries = inMemoryInquiries.slice(0, 1000);

  return entry;
}

/**
 * Updates an inquiry delivery status
 */
export async function updateInquiryStatus(id, update = {}) {
  try {
    ensureDataDir();
    if (fs.existsSync(INQUIRIES_FILE)) {
      const content = fs.readFileSync(INQUIRIES_FILE, 'utf8');
      const list = JSON.parse(content || '[]');
      const index = list.findIndex((item) => item.id === id);
      if (index !== -1) {
        list[index] = { ...list[index], ...update, updatedAt: new Date().toISOString() };
        fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(list, null, 2), 'utf8');
      }
    }
  } catch (err) {
    console.warn('[Storage] Status update disk write failed:', err.message);
  }

  const memIdx = inMemoryInquiries.findIndex((i) => i.id === id);
  if (memIdx !== -1) {
    inMemoryInquiries[memIdx] = { ...inMemoryInquiries[memIdx], ...update, updatedAt: new Date().toISOString() };
  }
}

/**
 * Retrieves all stored inquiries
 */
export async function getInquiries(limit = 100) {
  try {
    ensureDataDir();
    if (fs.existsSync(INQUIRIES_FILE)) {
      const content = fs.readFileSync(INQUIRIES_FILE, 'utf8');
      const list = JSON.parse(content || '[]');
      return list.slice(0, limit);
    }
  } catch (err) {
    console.warn('[Storage] Failed reading inquiries from disk, returning memory cache:', err.message);
  }
  return inMemoryInquiries.slice(0, limit);
}

/**
 * Get inquiry count
 */
export async function getInquiriesCount() {
  const list = await getInquiries(1000);
  return list.length;
}

export default {
  saveInquiry,
  updateInquiryStatus,
  getInquiries,
  getInquiriesCount,
};

