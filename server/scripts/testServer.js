import http from 'http';
import app from '../server.js';
import config from '../config/emailConfig.js';

async function runTests() {
  console.log('\n--- Running API Integration Test Suite ---');
  
  const server = app.listen(0);
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;

  try {
    // 1. Health check test
    console.log('\n[1/4] Testing GET /api/health...');
    const healthRes = await fetch(`${baseUrl}/api/health`);
    const healthData = await healthRes.json();
    console.log('Status:', healthRes.status, 'Response:', healthData.status);
    if (healthRes.status !== 200) throw new Error('Health check failed');

    // 2. Normal contact form submission test
    console.log('\n[2/4] Testing POST /api/contact (Valid Submission)...');
    const contactRes = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Alex Johnson',
        email: 'alex@example.com',
        company: 'Starlight Tech',
        projectType: 'Full Stack Project',
        budget: '$5K – $15K',
        timeline: '1 – 3 months',
        description: 'We need a high-performance web platform with custom backend APIs and contact form processing.',
      }),
    });
    const contactData = await contactRes.json();
    console.log('Status:', contactRes.status, 'Success:', contactData.success, 'InquiryId:', contactData.inquiryId);
    if (contactRes.status !== 200 || !contactData.success) throw new Error('Contact submission failed');

    // 3. Honeypot Bot Trap Test
    console.log('\n[3/4] Testing Honeypot Bot Trap (_gotcha field)...');
    const botRes = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Spam Bot',
        email: 'bot@spam.com',
        projectType: 'Spam',
        description: 'Free casino credits click here',
        _gotcha: 'http://spam-link.com', // Honeypot populated!
      }),
    });
    const botData = await botRes.json();
    console.log('Status:', botRes.status, 'Bot trapped successfully:', botData.success);
    if (botRes.status !== 200) throw new Error('Bot trap failed');

    // 4. Admin inquiries inspection test
    console.log('\n[4/4] Testing GET /api/inquiries (Admin Protected)...');
    const inquiriesRes = await fetch(`${baseUrl}/api/inquiries`, {
      headers: { 'X-Admin-Key': config.adminApiKey },
    });
    const inquiriesData = await inquiriesRes.json();
    console.log('Status:', inquiriesRes.status, 'Total inquiries found:', inquiriesData.count);
    if (inquiriesRes.status !== 200 || inquiriesData.count < 1) throw new Error('Admin inquiry check failed');

    console.log('\n✅ ALL INTEGRATION TESTS PASSED PERFECTLY!\n');
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exitCode = 1;
  } finally {
    server.close();
  }
}

runTests();

