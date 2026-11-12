/**
 * Input validation, sanitization, and honeypot detection for contact form processing.
 */

// Strict RFC 5322 compatible email regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

/**
 * Strips HTML tags and potential script injections
 */
export function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>/g, '') // remove HTML tags
    .replace(/[\r\n]+/g, (match) => (match.includes('\n') ? '\n' : ' ')) // normalize linebreaks
    .trim();
}

/**
 * Strips header injection attempts (CRLF) for single-line fields
 */
export function sanitizeHeader(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[\r\n\t]/g, ' ').trim();
}

/**
 * Validates the contact form payload
 * Returns { valid: boolean, errors: Record<string, string>, data: object, isSpam: boolean }
 */
export function validateContactPayload(body = {}) {
  const errors = {};

  // 1. Honeypot check: Bots routinely fill all hidden fields
  const honeypot = body._gotcha || body.botField || body.website_url;
  if (honeypot && String(honeypot).trim().length > 0) {
    return {
      valid: false,
      isSpam: true,
      errors: { bot: 'Spam submission detected.' },
      data: null,
    };
  }

  // 2. Validate & Sanitize Name
  const rawName = sanitizeHeader(body.name);
  if (!rawName) {
    errors.name = 'Name is required.';
  } else if (rawName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  } else if (rawName.length > 100) {
    errors.name = 'Name cannot exceed 100 characters.';
  }

  // 3. Validate & Sanitize Email
  const rawEmail = sanitizeHeader(body.email);
  if (!rawEmail) {
    errors.email = 'Email address is required.';
  } else if (!EMAIL_REGEX.test(rawEmail) || rawEmail.length > 254) {
    errors.email = 'Please provide a valid email address.';
  }

  // 4. Validate & Sanitize Project Type
  const rawProjectType = sanitizeHeader(body.projectType);
  if (!rawProjectType) {
    errors.projectType = 'Project type is required.';
  } else if (rawProjectType.length > 100) {
    errors.projectType = 'Project type cannot exceed 100 characters.';
  }

  // 5. Validate & Sanitize Description / Message
  const rawDescription = sanitizeString(body.description || body.message);
  if (!rawDescription) {
    errors.description = 'Project description is required.';
  } else if (rawDescription.length < 5) {
    errors.description = 'Description must be at least 5 characters.';
  } else if (rawDescription.length > 5000) {
    errors.description = 'Description cannot exceed 5000 characters.';
  }

  // Optional fields
  const rawCompany = sanitizeHeader(body.company || '');
  const rawBudget = sanitizeHeader(body.budget || '');
  const rawTimeline = sanitizeHeader(body.timeline || '');

  const valid = Object.keys(errors).length === 0;

  return {
    valid,
    isSpam: false,
    errors,
    data: valid
      ? {
          name: rawName,
          email: rawEmail.toLowerCase(),
          company: rawCompany || 'Not specified',
          projectType: rawProjectType,
          budget: rawBudget || 'Not specified',
          timeline: rawTimeline || 'Not specified',
          description: rawDescription,
        }
      : null,
  };
}

export default {
  validateContactPayload,
  sanitizeString,
  sanitizeHeader,
};

