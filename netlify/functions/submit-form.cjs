// netlify/functions/submit-form.cjs
const emailjs = require('@emailjs/nodejs');

const recentSubmissions = new Map();
const SUBMISSION_WINDOW = 5000;

setInterval(() => {
  const now = Date.now();
  for (const [id, timestamp] of recentSubmissions.entries()) {
    if (now - timestamp > SUBMISSION_WINDOW) {
      recentSubmissions.delete(id);
    }
  }
}, 10000);

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const formData = JSON.parse(event.body);
    console.log('Step 1: Received form data');

    const submissionId = `${formData.from_email}_${formData.from_name}_${formData.submitted_at || Date.now()}`;
    
    if (recentSubmissions.has(submissionId)) {
      console.log('Step 2: Duplicate detected');
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
      };
    }

    recentSubmissions.set(submissionId, Date.now());
    console.log('Step 3: Submission registered');

    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const adminTemplateId = process.env.EMAILJS_TEMPLATE_ID;
    const userTemplateId = process.env.EMAILJS_USER_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;

    console.log('Step 4: Environment variables loaded');

    if (!serviceId || !adminTemplateId || !userTemplateId || !publicKey || !privateKey) {
      console.error('Step 5 FAIL: Missing env vars');
      return { statusCode: 500, body: JSON.stringify({ error: 'Config error' }) };
    }

    emailjs.init({ publicKey, privateKey });
    console.log('Step 6: EmailJS initialized');

    const submittedAt = formData.submitted_at || new Date().toLocaleString('en-GB', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    });

    const adminParams = {
      to_email: adminEmail,
      to_name: 'EVS Healthcare Recruitment',
      from_name: formData.from_name || 'Visitor',
      from_email: formData.from_email || 'noreply@evshealthcare.co.uk',
      from_phone: formData.from_phone || 'N/A',
      address: formData.address || 'N/A',
      availability: formData.availability || 'N/A',
      experience: formData.experience || 'N/A',
      message: formData.message || 'N/A',
      job_title: formData.job_title || 'N/A',
      job_location: formData.job_location || 'N/A',
      job_pay: formData.job_pay || 'N/A',
      job_type: formData.job_type || 'N/A',
      job_department: formData.job_department || 'N/A',
      job_shift: formData.job_shift || 'N/A',
      cv_filename: formData.cv_filename || 'N/A',
      cv_url: formData.cv_url || 'N/A',
      submitted_at: submittedAt,
    };

    console.log('Step 7: Admin params ready');
    
    try {
      const adminResp = await emailjs.send(serviceId, adminTemplateId, adminParams);
      console.log('Step 8: Admin email sent');
    } catch (err) {
      console.log('Step 8 FAIL: Admin email error:', JSON.stringify(err));
      throw err;
    }

    const userParams = {
      from_email: formData.from_email,
      from_name: formData.from_name,
      job_title: formData.job_title,
      job_location: formData.job_location,
      submitted_at: submittedAt,
    };

    console.log('Step 9: User params ready:', JSON.stringify(userParams));
    
    try {
      const userResp = await emailjs.send(serviceId, userTemplateId, userParams);
      console.log('Step 10: User email sent');
    } catch (err) {
      console.log('Step 10 FAIL: User email error:', JSON.stringify(err));
      throw err;
    }

    console.log('Step 11: Success!');
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify({ success: true, message: 'Application submitted!' }),
    };

  } catch (error) {
    console.log('FINAL ERROR:', JSON.stringify(error));
    console.log('Error type:', typeof error);
    console.log('Error keys:', Object.keys(error || {}));
    
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: 'An error occurred' }),
    };
  }
};