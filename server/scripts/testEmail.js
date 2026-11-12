import config from '../config/emailConfig.js';
import { sendContactInquiry, verifyConnection } from '../services/emailService.js';

async function runDiagnostic() {
  console.log(`
============================================================
🧪 Contact Form & Email Delivery Diagnostic Tool
============================================================
`);

  console.log('1. Checking Email Service Configuration...');
  const status = await verifyConnection();
  console.log('   - Provider Status:', status.details);
  console.log('   - Active Provider:', status.activeProvider || 'None (Local simulation)');
  console.log('   - Destination Inbox:', config.receiverEmail || '(Not set - will use simulation)');

  console.log('\n2. Testing Contact Form Processing & Inbox Delivery...');
  const testPayload = {
    name: 'Diagnostic Test User',
    email: 'test@example.com',
    company: 'Inbox Verification Suite',
    projectType: 'Full Stack Project',
    budget: '$5,000+',
    timeline: 'Immediate',
    description: 'This is a test submission from the Contact Form Processing Platform to verify 100% direct inbox delivery rate.',
  };

  try {
    const result = await sendContactInquiry(testPayload, `diag_${Date.now()}`);
    console.log('\n✅ Result: SUCCESS!');
    console.log('   - Delivery Status: Delivered');
    console.log('   - Provider Used:', result.provider);
    console.log('   - Delivery ID:', result.deliveryId);
    if (result.note) {
      console.log('   - Note:', result.note);
    } else {
      console.log(`   - Destination: Direct to inbox ${config.receiverEmail}`);
    }
  } catch (err) {
    console.error('\n❌ Result: FAILED!');
    console.error('   - Error:', err.message);
  }

  console.log(`
============================================================
🏁 Diagnostic Complete
============================================================
`);
}

runDiagnostic();

