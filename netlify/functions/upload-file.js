// netlify/functions/upload-file.js
const cloudinary = require('cloudinary').v2;

exports.handler = async (event, context) => {
  // 1. Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    // 2. Configure Cloudinary using environment variables
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // 3. Parse the file from the request
    // The file is sent as base64 in the request body
    const { file, folder = 'evs-healthcare' } = JSON.parse(event.body);

    if (!file) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No file provided' }),
      };
    }

    // 4. Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file, {
      folder: folder,
      resource_type: 'auto', // Automatically detect file type
      allowed_formats: ['pdf', 'docx', 'doc'], // Restrict to document formats
      max_bytes: 5000000, // 5MB limit
    });

    console.log('Cloudinary upload successful:', result.secure_url);

    // 5. Return the secure URL to your frontend
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        url: result.secure_url,
        public_id: result.public_id,
      }),
    };
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message || 'File upload failed.',
      }),
    };
  }
};