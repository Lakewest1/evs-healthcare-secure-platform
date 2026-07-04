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
    console.log('Received form data:', formData);

    const submissionId = `${formData.from_email}_${formData.from_name}_${formData.submitted_at || Date.now()}`;
    
    if (recentSubmissions.has(submissionId)) {
      console.warn('Duplicate submission detected');
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          success: true, 
          message: 'Your application was submitted successfully!',
        }),
      };
    }

    recentSubmissions.set(submissionId, Date.now());

    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const adminTemplateId = process.env.EMAILJS_TEMPLATE_ID;
    const userTemplateId = process.env.EMAILJS_USER_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;
    const adminEmail = process.env.ADMIN_EMAIL || 'olamilake95@gmail.com';

    if (!serviceId || !adminTemplateId || !userTemplateId || !publicKey || !privateKey) {
      console.error('Missing EmailJS environment variables');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error' }),
      };
    }

    emailjs.init({ publicKey, privateKey });

    const submittedAt = formData.submitted_at || new Date().toLocaleString('en-GB', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    });

    const adminParams = {
      to_email: adminEmail,
      to_name: 'EVS Healthcare Recruitment',
      from_name: formData.from_name || 'Website Visitor',
      from_email: formData.from_email || 'no-reply@evshealthcare.co.uk',
      from_phone: formData.from_phone || 'Not provided',
      address: formData.address || 'Not provided',
      availability: formData.availability || 'Not specified',
      experience: formData.experience || 'Not specified',
      message: formData.message || 'No additional message',
      job_title: formData.job_title || 'Not specified',
      job_location: formData.job_location || 'Not specified',
      job_pay: formData.job_pay || 'Not specified',
      job_type: formData.job_type || 'Not specified',
      job_department: formData.job_department || 'Not specified',
      job_shift: formData.job_shift || 'Not specified',
      cv_filename: formData.cv_filename || 'No CV attached',
      cv_url: formData.cv_url || 'Not uploaded',
      submitted_at: submittedAt,
    };

    const adminResponse = await emailjs.send(serviceId, adminTemplateId, adminParams);
    console.log('Admin email sent');

 const userParams = {
  from_email: formData.from_email,
  from_name: formData.from_name,
  job_title: formData.job_title || '',
  job_location: formData.job_location || '',
  job_pay: formData.job_pay || '',
  job_type: formData.job_type || '',
  submitted_at: submittedAt || '',
};

    const userResponse = await emailjs.send(serviceId, userTemplateId, userParams);
    console.log('User confirmation email sent');

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify({ success: true, message: 'Your application was submitted successfully!' }),
    };
  } catch (error) {
    console.error('EmailJS Function Error:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: 'An error occurred' }),
    };
  }
};