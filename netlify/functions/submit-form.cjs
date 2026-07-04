// netlify/functions/submit-form.cjs
const emailjs = require('@emailjs/nodejs');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const formData = JSON.parse(event.body);
    console.log('Received form data:', formData);

    // Get secrets from environment variables
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const adminTemplateId = process.env.EMAILJS_TEMPLATE_ID; // Admin template
    const userTemplateId = process.env.EMAILJS_USER_TEMPLATE_ID; // User confirmation template (NEW)
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;

    // Validate environment variables
    if (!serviceId || !adminTemplateId || !userTemplateId || !publicKey || !privateKey) {
      console.error('Missing EmailJS environment variables:', {
        serviceId: !!serviceId,
        adminTemplateId: !!adminTemplateId,
        userTemplateId: !!userTemplateId,
        publicKey: !!publicKey,
        privateKey: !!privateKey,
      });
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'Server configuration error. Missing EmailJS credentials.' 
        }),
      };
    }

    // Initialize EmailJS with both keys
    emailjs.init({
      publicKey: publicKey,
      privateKey: privateKey,
    });

    // ── 1. Send Admin Email ──
    const adminParams = {
      to_email: 'admin_1@evshealthcare.co.uk',
      to_name: 'EVS Healthcare Recruitment',
      from_name: formData.from_name || 'Website Visitor',
      from_email: formData.from_email || 'no-reply@evshealthcare.co.uk',
      from_phone: formData.from_phone || 'Not provided',
      address: formData.address || 'Not provided',
      availability: formData.availability || 'Not specified',
      experience: formData.experience || 'Not specified',
      message: formData.message || 'No additional message',
      job_title: formData.job_title || 'Not specified',
      job_location: formData.job_location || '',
      job_pay: formData.job_pay || '',
      job_type: formData.job_type || '',
      job_department: formData.job_department || '',
      job_shift: formData.job_shift || '',
      cv_filename: formData.cv_filename || 'No CV attached',
      cv_url: formData.cv_url || 'Not uploaded',
      submitted_at: formData.submitted_at || new Date().toLocaleString(),
    };

    const adminResponse = await emailjs.send(
      serviceId,
      adminTemplateId,
      adminParams
    );
    console.log('Admin email sent:', adminResponse);

    // ── 2. Send User Confirmation Email ──
    const userParams = {
      to_email: formData.from_email || 'no-reply@evshealthcare.co.uk',
      to_name: formData.from_name || 'Applicant',
      from_name: formData.from_name || 'Website Visitor',
      job_title: formData.job_title || 'Not specified',
      job_location: formData.job_location || '',
      submitted_at: formData.submitted_at || new Date().toLocaleString(),
    };

    const userResponse = await emailjs.send(
      serviceId,
      userTemplateId,
      userParams
    );
    console.log('User confirmation sent:', userResponse);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Your application was submitted successfully!' 
      }),
    };
  } catch (error) {
    console.error('EmailJS Function Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        error: error.message || 'An unexpected error occurred.' 
      }),
    };
  }
};