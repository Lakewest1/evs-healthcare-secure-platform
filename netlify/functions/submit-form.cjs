will this work : 
// netlify/functions/submit-form.cjs
const emailjs = require('@emailjs/nodejs');

// Simple in-memory store for submitted form IDs (prevents duplicates within a request window)
const recentSubmissions = new Map();
const SUBMISSION_WINDOW = 5000; // 5 second window to catch duplicates

// Cleanup old submissions every 10 seconds
setInterval(() => {
  const now = Date.now();
  for (const [id, timestamp] of recentSubmissions.entries()) {
    if (now - timestamp > SUBMISSION_WINDOW) {
      recentSubmissions.delete(id);
    }
  }
}, 10000);

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

    // ── DUPLICATE PREVENTION ──
    // Create a unique fingerprint from form data to detect duplicates
    const submissionId = `${formData.from_email}_${formData.from_name}_${formData.submitted_at || Date.now()}`;
    
    if (recentSubmissions.has(submissionId)) {
      console.warn('Duplicate submission detected:', submissionId);
      return {
        statusCode: 200, // Return 200 to prevent client retry, but don't send emails
        body: JSON.stringify({ 
          success: true, 
          message: 'Your application was submitted successfully!',
          isDuplicate: true
        }),
      };
    }

    // Mark this submission as processed
    recentSubmissions.set(submissionId, Date.now());

    // Get secrets from environment variables
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const adminTemplateId = process.env.EMAILJS_TEMPLATE_ID;
    const userTemplateId = process.env.EMAILJS_USER_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;
    const adminEmail = process.env.ADMIN_EMAIL || 'olamilake95@gmail.com';

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

    // ── PREPARE TIMESTAMP ──
    const submittedAt = formData.submitted_at || new Date().toLocaleString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    // ── 1. SEND ADMIN EMAIL (COMPLETE DETAILS) ──
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

    const adminResponse = await emailjs.send(
      serviceId,
      adminTemplateId,
      adminParams
    );
    console.log('Admin email sent successfully:', {
      messageId: adminResponse.$id,
      to: adminEmail,
      timestamp: submittedAt,
    });

    // ── 2. SEND USER CONFIRMATION EMAIL ──
    const userParams = {
      to_email: formData.from_email || 'no-reply@evshealthcare.co.uk',
      to_name: formData.from_name || 'Applicant',
      from_name: 'EVS Healthcare Recruitment',
      job_title: formData.job_title || 'Not specified',
      job_location: formData.job_location || 'Not specified',
      submitted_at: submittedAt,
    };

    const userResponse = await emailjs.send(
      serviceId,
      userTemplateId,
      userParams
    );
    console.log('User confirmation email sent successfully:', {
      messageId: userResponse.$id,
      to: formData.from_email,
      timestamp: submittedAt,
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Your application was submitted successfully!' 
      }),
    };
  } catch (error) {
    console.error('EmailJS Function Error:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
    });

    const clientMessage = error.code === 'ENOTFOUND' 
      ? 'Network error. Please check your connection and try again.'
      : 'An unexpected error occurred. Please try again.';

    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        error: clientMessage,
      }),
    };
  }
};