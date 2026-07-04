// netlify/functions/submit-form.js
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
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY; // ✅ NEW: Private Key

    // Validate environment variables
    if (!serviceId || !templateId || !publicKey || !privateKey) {
      console.error('Missing EmailJS environment variables:', {
        serviceId: !!serviceId,
        templateId: !!templateId,
        publicKey: !!publicKey,
        privateKey: !!privateKey, // ✅ NEW
      });
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'Server configuration error. Missing EmailJS credentials.' 
        }),
      };
    }

    // ✅ CORRECT: Initialize EmailJS with BOTH keys for strict mode
    emailjs.init({
      publicKey: publicKey,
      privateKey: privateKey, // ✅ NEW: Required for strict mode
    });

    // Send the email
    const response = await emailjs.send(
      serviceId,
      templateId,
      {
        to_email: formData.email || 'admin@evshealthcare.co.uk',
        from_name: formData.name || 'Website Visitor',
        message: formData.message || 'No message provided',
      }
    );

    console.log('EmailJS success:', response);

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