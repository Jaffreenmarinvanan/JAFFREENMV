/**
 * High-deliverability email templates (HTML + Plain Text).
 * Designed for 100% inbox placement:
 * - Proper MIME multipart pairing
 * - Outlook/Gmail compatible table layout
 * - Inline CSS styling
 * - No spam trigger words
 * - Clean semantic hierarchy
 */

/**
 * Generates the notification email sent to the portfolio owner
 */
export function generateOwnerNotification({ name, email, company, projectType, budget, timeline, description, receivedAt, id }) {
  const timestamp = receivedAt || new Date().toLocaleString('en-US', { timeZoneName: 'short' });
  const inquiryId = id || 'N/A';

  // Plain-text version (crucial for spam score reduction)
  const text = `
NEW PROJECT INQUIRY - PORTFOLIO CONTACT
=========================================

From: ${name} <${email}>
Company: ${company}
Project Type: ${projectType}
Budget: ${budget}
Timeline: ${timeline}
Received At: ${timestamp}
Inquiry ID: ${inquiryId}

PROJECT DESCRIPTION:
-----------------------------------------
${description}

-----------------------------------------
Reply directly to this email to contact ${name} at ${email}.
`.trim();

  // Responsive, bulletproof HTML email template
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Project Inquiry from ${escapeHtml(name)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b090f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f1f5f9;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0b090f; padding: 32px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" style="max-width: 600px; background: linear-gradient(145deg, #161224 0%, #0e0c17 100%); border: 1px solid rgba(139, 92, 246, 0.25); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(90deg, #7c3aed 0%, #4f46e5 100%); padding: 24px 32px; text-align: left;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: rgba(255,255,255,0.85); font-weight: 700; display: inline-block;">Portfolio Contact Platform</span>
                    <h1 style="margin: 6px 0 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">New Project Inquiry</h1>
                  </td>
                  <td align="right">
                    <span style="background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.3); border-radius: 9999px; padding: 6px 12px; font-size: 11px; color: #ffffff; font-weight: 600;">
                      ${escapeHtml(projectType)}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 32px;">
              
              <!-- Sender Overview Card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                <tr>
                  <td style="padding-bottom: 12px;">
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; font-weight: 600; margin-bottom: 4px;">Client Name</div>
                    <div style="font-size: 16px; font-weight: 700; color: #ffffff;">${escapeHtml(name)}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 12px;">
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; font-weight: 600; margin-bottom: 4px;">Email Address</div>
                    <div style="font-size: 15px; color: #a78bfa; font-weight: 500;">
                      <a href="mailto:${escapeHtml(email)}" style="color: #a78bfa; text-decoration: none;">${escapeHtml(email)}</a>
                    </div>
                  </td>
                </tr>
                ${company && company !== 'Not specified' ? `
                <tr>
                  <td style="padding-bottom: 12px;">
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; font-weight: 600; margin-bottom: 4px;">Company</div>
                    <div style="font-size: 15px; color: #e2e8f0;">${escapeHtml(company)}</div>
                  </td>
                </tr>
                ` : ''}
              </table>

              <!-- Project Metadata Grid -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td width="50%" style="padding-right: 8px;">
                    <div style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 14px 16px;">
                      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; font-weight: 600; margin-bottom: 4px;">Budget</div>
                      <div style="font-size: 14px; font-weight: 600; color: #34d399;">${escapeHtml(budget)}</div>
                    </div>
                  </td>
                  <td width="50%" style="padding-left: 8px;">
                    <div style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 14px 16px;">
                      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; font-weight: 600; margin-bottom: 4px;">Timeline</div>
                      <div style="font-size: 14px; font-weight: 600; color: #60a5fa;">${escapeHtml(timeline)}</div>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Project Description Block -->
              <div style="margin-bottom: 28px;">
                <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; font-weight: 600; margin-bottom: 8px;">Project Scope & Description</div>
                <div style="background-color: rgba(0, 0, 0, 0.4); border: 1px solid rgba(139, 92, 246, 0.2); border-radius: 12px; padding: 20px; font-size: 14px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap;">${escapeHtml(description)}</div>
              </div>

              <!-- Quick Reply Action Button -->
              <div style="text-align: center; margin: 32px 0 16px;">
                <a href="mailto:${escapeHtml(email)}?subject=Re:%20${encodeURIComponent(projectType)}%20Inquiry" style="background: linear-gradient(90deg, #7c3aed 0%, #6366f1 100%); color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-size: 14px; font-weight: 600; display: inline-block; box-shadow: 0 4px 14px rgba(124, 58, 237, 0.4);">
                  ✉️ Reply to ${escapeHtml(name)}
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer Info -->
          <tr>
            <td style="background-color: rgba(0, 0, 0, 0.3); border-top: 1px solid rgba(255, 255, 255, 0.06); padding: 18px 32px; font-size: 11px; color: #64748b; text-align: center;">
              <div>Inquiry ID: <code style="color: #a78bfa; font-family: monospace;">${escapeHtml(inquiryId)}</code> • Logged at ${escapeHtml(timestamp)}</div>
              <div style="margin-top: 4px;">Sent securely from your portfolio custom contact backend platform.</div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

  return { text, html };
}

/**
 * Generates an automatic receipt/acknowledgment email for the client
 */
export function generateClientAutoReply({ name, projectType }) {
  const text = `
Hi ${name},

Thank you for reaching out! This is a quick confirmation that I have received your message regarding "${projectType}".

I review all incoming inquiries carefully and will get back to you within 24 hours with next steps.

Best regards,
Jaffreen Maraivanan
Full Stack Developer & Software Engineer
`.trim();

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank you for getting in touch!</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b090f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f1f5f9;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0b090f; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 540px; background: #161224; border: 1px solid rgba(139, 92, 246, 0.25); border-radius: 16px; overflow: hidden;">
          
          <tr>
            <td style="padding: 32px 32px 24px; text-align: left;">
              <div style="font-size: 20px; font-weight: 700; color: #a78bfa; margin-bottom: 16px;">Jaffreen Maraivanan</div>
              <h2 style="font-size: 20px; color: #ffffff; margin: 0 0 16px;">Thank you for reaching out, ${escapeHtml(name)}!</h2>
              <p style="font-size: 14px; line-height: 1.6; color: #cbd5e1; margin: 0 0 16px;">
                I've received your inquiry regarding <strong>${escapeHtml(projectType)}</strong>. I'm excited to learn more about your project and discuss how we can bring it to life.
              </p>
              <p style="font-size: 14px; line-height: 1.6; color: #cbd5e1; margin: 0 0 24px;">
                I typically review all incoming messages promptly and will get back to you within <strong>24 hours</strong>.
              </p>
              <div style="padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.08); font-size: 13px; color: #94a3b8;">
                Warm regards,<br>
                <strong style="color: #ffffff;">Jaffreen Maraivanan</strong><br>
                Full Stack Developer & Engineer
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

  return { text, html };
}

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default {
  generateOwnerNotification,
  generateClientAutoReply,
};

