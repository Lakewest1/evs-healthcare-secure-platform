import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';
import {
  ArrowLeft,
  Send,
  CheckCircle,
  AlertCircle,
  Upload,
  FileText,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  X,
  Loader2,
  Heart,
  Building2,
  Stethoscope,
  MessageCircle
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// EVS Healthcare — Job Application Page (FREE with EmailJS)
// Features: CV upload to Cloudinary, email notifications, auto-reply via linked template
// ─────────────────────────────────────────────────────────────────────────────

// ── EmailJS Configuration (from .env) ──
const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

// ── Cloudinary Configuration (from .env) ──
const CLOUDINARY_CONFIG = {
  CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  UPLOAD_PRESET: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
};

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "olamilake95@gmail.com";

// Log configuration status
console.log("📧 EmailJS Config Status:");
console.log("  SERVICE_ID:", EMAILJS_CONFIG.SERVICE_ID || "❌ Missing");
console.log("  TEMPLATE_ID:", EMAILJS_CONFIG.TEMPLATE_ID || "❌ Missing");
console.log("  PUBLIC_KEY:", EMAILJS_CONFIG.PUBLIC_KEY ? "✅ Set" : "❌ Missing");
console.log("  ADMIN_EMAIL:", ADMIN_EMAIL);

console.log("☁️ Cloudinary Config Status:");
console.log("  CLOUD_NAME:", CLOUDINARY_CONFIG.CLOUD_NAME || "❌ Missing");
console.log("  UPLOAD_PRESET:", CLOUDINARY_CONFIG.UPLOAD_PRESET || "❌ Missing");

const JOBS = [
  {
    id: 1,
    title: "Registered Nurse (RGN)",
    type: "Temporary / Permanent",
    location: "Preston, Lancashire",
    pay: "£26–£38/hr",
    urgent: true,
    icon: Stethoscope,
    shift: "Day & Night Shifts",
    experience: "2+ years preferred",
  },
  {
    id: 2,
    title: "Healthcare Care Assistant",
    type: "Flexible Shifts Available",
    location: "North-West England",
    pay: "£13–£23/hr",
    urgent: false,
    icon: Building2,
    shift: "Flexible Hours",
    experience: "No experience required",
  },
  {
    id: 3,
    title: "Support Worker",
    type: "Temporary / Permanent",
    location: "Preston & Surrounding",
    pay: "£13–£23/hr",
    urgent: true,
    icon: Building2,
    shift: "Weekend Availability",
    experience: "Driving license preferred",
  },
  {
    id: 4,
    title: "RMN Mental Health Nurse",
    type: "Full Time / Part Time",
    location: "Lancashire Area",
    pay: "£30–£40/hr",
    urgent: false,
    icon: Stethoscope,
    shift: "Rotating Shifts",
    experience: "NMC Registered",
  },
  {
    id: 5,
    title: "Senior Carer",
    type: "Immediate Start",
    location: "North-West England",
    pay: "£18–£25/hr",
    urgent: false,
    icon: Heart,
    shift: "Day Shifts Only",
    experience: "NVQ Level 3 required",
  },
  {
    id: 6,
    title: "Domestic Worker",
    type: "Flexible Hours",
    location: "Preston, Lancashire",
    pay: "£14.50–£12/hr",
    urgent: false,
    icon: Building2,
    shift: "Morning / Afternoon",
    experience: "Basic cleaning skills",
  },
];

export default function Apply() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState(null);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    availability: "",
    experience: "",
    message: "",
  });

  const [cvData, setCvData] = useState(null); // Stores { url, filename, public_id }
  const [cvPreview, setCvPreview] = useState(null);

  // Initialize EmailJS
  useEffect(() => {
    if (!EMAILJS_CONFIG.PUBLIC_KEY) {
      console.error("❌ EmailJS Public Key is missing. Check your .env file.");
      return;
    }
    try {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
      console.log("✅ EmailJS initialized successfully!");
    } catch (error) {
      console.error("❌ Failed to initialize EmailJS:", error);
    }
  }, []);

  // Load Cloudinary Widget Script
  useEffect(() => {
    // Check if script is already loaded
    if (document.getElementById('cloudinary-widget-script')) return;
    
    const script = document.createElement('script');
    script.id = 'cloudinary-widget-script';
    script.src = 'https://upload-widget.cloudinary.com/global/all.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      // Cleanup
      const existingScript = document.getElementById('cloudinary-widget-script');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  // Get job from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("job");
    if (id) {
      const job = JOBS.find((j) => j.id === parseInt(id));
      if (job) {
        setSelectedJob(job);
      }
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.fullName.trim()) {
        setError("Please enter your full name");
        return false;
      }
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
        setError("Please enter a valid email address");
        return false;
      }
      if (!formData.phone.trim()) {
        setError("Please enter your phone number");
        return false;
      }
      setError(null);
      return true;
    }
    if (step === 2) {
      if (!cvData) {
        setError("Please upload your CV");
        return false;
      }
      setError(null);
      return true;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
      setError(null);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    setError(null);
  };

  // ── Cloudinary Upload Widget ──
  const openUploadWidget = () => {
    // Check if Cloudinary widget is available
    if (!window.cloudinary) {
      setError("Upload widget is loading. Please try again in a moment.");
      // Try to load the script again
      const script = document.createElement('script');
      script.src = 'https://upload-widget.cloudinary.com/global/all.js';
      script.async = true;
      script.onload = () => {
        // Retry after script loads
        setTimeout(openUploadWidget, 500);
      };
      document.body.appendChild(script);
      return;
    }

    // Check if Cloudinary config is valid
    if (!CLOUDINARY_CONFIG.CLOUD_NAME || !CLOUDINARY_CONFIG.UPLOAD_PRESET) {
      setError("Cloudinary configuration is missing. Please check your .env file.");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: CLOUDINARY_CONFIG.CLOUD_NAME,
          uploadPreset: CLOUDINARY_CONFIG.UPLOAD_PRESET,
          sources: ['local', 'camera', 'url', 'google_drive', 'dropbox'],
          multiple: false,
          clientAllowedFormats: ['pdf', 'doc', 'docx', 'txt', 'rtf'],
          maxFileSize: 5000000, // 5MB
          showAdvancedOptions: false,
          cropping: false,
          styles: {
            palette: {
              window: "#FFFFFF",
              windowBorder: "#C4972A",
              tabIcon: "#C4972A",
              menuIcons: "#C4972A",
              textDark: "#0f1d3d",
              textLight: "#64748b",
              link: "#C4972A",
              action: "#C4972A",
              inactiveTabIcon: "#e2e8f0",
              error: "#F44235",
              inProgress: "#C4972A",
              complete: "#20B832",
              sourceBg: "#f8fafc",
            },
            fonts: {
              default: {
                active: true,
              },
            },
          },
        },
        (error, result) => {
          setIsUploading(false);
          
          if (error) {
            console.error("❌ Cloudinary Upload Error:", error);
            setError("Failed to upload CV. Please try again.");
            return;
          }

          if (result && result.event === 'success') {
            // Upload successful!
            const fileData = {
              url: result.info.secure_url,
              filename: result.info.original_filename,
              public_id: result.info.public_id,
            };
            setCvData(fileData);
            setCvPreview(result.info.original_filename);
            setError(null);
            console.log("✅ CV uploaded successfully:", fileData);
          }
        }
      );
      widget.open();
    } catch (error) {
      console.error("❌ Widget Error:", error);
      setIsUploading(false);
      setError("Failed to open upload widget. Please try again.");
    }
  };

  const removeCV = () => {
    setCvData(null);
    setCvPreview(null);
  };

  // ── Send Email using EmailJS ──
  const sendEmail = async () => {
    // Check if config is valid
    if (!EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID) {
      throw new Error("EmailJS configuration is missing. Check your .env file.");
    }

    // Prepare template parameters
    const templateParams = {
      // Recipient (admin)
      to_email: ADMIN_EMAIL,
      to_name: "EVS Healthcare Recruitment",
      
      // Applicant details
      from_name: formData.fullName,
      from_email: formData.email,
      from_phone: formData.phone,
      address: formData.address || "Not provided",
      availability: formData.availability || "Not specified",
      experience: formData.experience || "Not specified",
      message: formData.message || "No additional message",
      
      // Job details
      job_title: selectedJob?.title || "Not specified",
      job_location: selectedJob?.location || "",
      job_pay: selectedJob?.pay || "",
      job_type: selectedJob?.type || "",
      submitted_at: new Date().toLocaleString(),
      
      // CV information - NOW WITH ACTUAL URL!
      cv_filename: cvData?.filename || "No CV attached",
      cv_url: cvData?.url || "Not uploaded", // This is the secure Cloudinary URL!
    };

    console.log("📧 Sending email with config:", {
      serviceId: EMAILJS_CONFIG.SERVICE_ID,
      templateId: EMAILJS_CONFIG.TEMPLATE_ID,
    });
    console.log("📧 Template params:", templateParams);

    try {
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );
      console.log("✅ Email sent successfully!", response);
      return response;
    } catch (error) {
      console.error("❌ EmailJS Error Details:", error);
      console.error("  Status:", error.status);
      console.error("  Text:", error.text);
      
      if (error.text) {
        try {
          const errorData = JSON.parse(error.text);
          throw new Error(errorData.message || error.text);
        } catch {
          throw new Error(error.text || error.message);
        }
      }
      throw error;
    }
  };

  // ── Main Submit Handler ──
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Send email with CV URL
      await sendEmail();

      // Success!
      setIsSubmitted(true);

    } catch (err) {
      console.error("❌ Email Error:", err);
      setError(
        err.message || 
        "Failed to submit application. Please try again or email your CV to " + ADMIN_EMAIL
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Render Steps ──────────────────────────────────────────────────────────

  const renderStep1 = () => (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="apply-step">
        <h3 className="apply-step-title">Personal Information</h3>
        <p className="apply-step-subtitle">Tell us about yourself so we can match you with the right role</p>

        <div className="apply-form-group">
          <label className="apply-label">
            <User size={16} /> Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g., John Smith"
            className="apply-input"
            required
          />
        </div>

        <div className="apply-form-group">
          <label className="apply-label">
            <Mail size={16} /> Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g., john@example.com"
            className="apply-input"
            required
          />
        </div>

        <div className="apply-form-group">
          <label className="apply-label">
            <Phone size={16} /> Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g., 01234 567890"
            className="apply-input"
            required
          />
        </div>

        <div className="apply-form-group">
          <label className="apply-label">
            <MapPin size={16} /> Address (Optional)
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="e.g., Preston, Lancashire"
            className="apply-input"
          />
        </div>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="apply-step">
        <h3 className="apply-step-title">CV Upload & Additional Info</h3>
        <p className="apply-step-subtitle">Upload your CV securely via Cloudinary</p>

        <div className="apply-form-group">
          <label className="apply-label">
            <Briefcase size={16} /> Availability
          </label>
          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="apply-input"
          >
            <option value="">Select availability...</option>
            <option value="Immediate">Immediate Start</option>
            <option value="1-2 weeks">Available in 1-2 weeks</option>
            <option value="2-4 weeks">Available in 2-4 weeks</option>
            <option value="1 month+">Available in 1 month+</option>
            <option value="Flexible">Flexible availability</option>
          </select>
        </div>

        <div className="apply-form-group">
          <label className="apply-label">
            <Clock size={16} /> Experience Level
          </label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="apply-input"
          >
            <option value="">Select experience...</option>
            <option value="Entry Level">Entry Level (0-1 year)</option>
            <option value="Junior">Junior (1-3 years)</option>
            <option value="Mid Level">Mid Level (3-5 years)</option>
            <option value="Senior">Senior (5+ years)</option>
            <option value="Managerial">Managerial</option>
          </select>
        </div>

        <div className="apply-form-group">
          <label className="apply-label">
            <FileText size={16} /> Upload CV *
          </label>
          <div className="apply-upload-area">
            {!cvData ? (
              <div>
                <button
                  type="button"
                  onClick={openUploadWidget}
                  className="apply-btn-primary"
                  disabled={isUploading}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {isUploading ? (
                    <>
                      <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={18} /> Click to Upload CV
                    </>
                  )}
                </button>
                <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>
                  Supports PDF, DOC, DOCX (Max 5MB)
                </p>
              </div>
            ) : (
              <div className="apply-file-preview">
                <FileText size={20} />
                <span className="apply-file-name">{cvData.filename}</span>
                <button 
                  onClick={removeCV} 
                  className="apply-file-remove"
                  type="button"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="apply-form-group">
          <label className="apply-label">
            <MessageCircle size={16} /> Additional Message (Optional)
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us anything else we should know about you..."
            rows={4}
            className="apply-input apply-textarea"
          />
        </div>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="apply-step">
        <h3 className="apply-step-title">Review & Submit</h3>
        <p className="apply-step-subtitle">Please review your application before submitting</p>

        <div className="apply-review-card">
          <div className="apply-review-section">
            <h4>Personal Information</h4>
            <div className="apply-review-item">
              <span className="apply-review-label">Name</span>
              <span className="apply-review-value">{formData.fullName}</span>
            </div>
            <div className="apply-review-item">
              <span className="apply-review-label">Email</span>
              <span className="apply-review-value">{formData.email}</span>
            </div>
            <div className="apply-review-item">
              <span className="apply-review-label">Phone</span>
              <span className="apply-review-value">{formData.phone}</span>
            </div>
            {formData.address && (
              <div className="apply-review-item">
                <span className="apply-review-label">Address</span>
                <span className="apply-review-value">{formData.address}</span>
              </div>
            )}
          </div>

          {selectedJob && (
            <div className="apply-review-section">
              <h4>Applying For</h4>
              <div className="apply-review-item">
                <span className="apply-review-label">Role</span>
                <span className="apply-review-value" style={{ color: "#C4972A", fontWeight: 600 }}>
                  {selectedJob.title}
                </span>
              </div>
              <div className="apply-review-item">
                <span className="apply-review-label">Location</span>
                <span className="apply-review-value">{selectedJob.location}</span>
              </div>
              <div className="apply-review-item">
                <span className="apply-review-label">Pay</span>
                <span className="apply-review-value">{selectedJob.pay}</span>
              </div>
            </div>
          )}

          <div className="apply-review-section">
            <h4>Documents</h4>
            <div className="apply-review-item">
              <span className="apply-review-label">CV</span>
              <span className="apply-review-value" style={{ color: "#10b981" }}>
                ✓ {cvData?.filename} uploaded
              </span>
            </div>
            {cvData?.url && (
              <div className="apply-review-item">
                <span className="apply-review-label">Download Link</span>
                <span className="apply-review-value" style={{ fontSize: '12px', wordBreak: 'break-all' }}>
                  <a href={cvData.url} target="_blank" rel="noopener noreferrer" style={{ color: "#C4972A" }}>
                    View CV
                  </a>
                </span>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 24 }}>
          <button onClick={prevStep} className="apply-btn-secondary">
            Back
          </button>
          <button onClick={handleSubmit} className="apply-btn-primary" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                Submitting...
              </>
            ) : (
              <>
                Submit Application <Send size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderThankYou = () => {
    const jobTitle = selectedJob?.title || "EVS Healthcare";
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="apply-thank-you"
      >
        <div className="apply-success-icon">
          <CheckCircle size={64} />
        </div>
        <h2 className="apply-success-title">Application Submitted! 🎉</h2>
        <p className="apply-success-text">
          Thank you for applying to <strong>{jobTitle}</strong>.
          <br />
          We've received your application and our team will review it shortly.
        </p>
        
        <div className="apply-success-card">
          <h4>📋 What happens next?</h4>
          <ul className="apply-success-list">
            <li>
              <span style={{ fontSize: "18px", marginRight: "10px" }}>📧</span>
              You'll receive a confirmation email shortly
            </li>
            <li>
              <span style={{ fontSize: "18px", marginRight: "10px" }}>📞</span>
              Our recruitment team will review your CV
            </li>
            <li>
              <span style={{ fontSize: "18px", marginRight: "10px" }}>⏰</span>
              We'll contact you within 2-3 business days
            </li>
            <li>
              <span style={{ fontSize: "18px", marginRight: "10px" }}>💼</span>
              If shortlisted, we'll schedule an interview
            </li>
          </ul>
        </div>

        <div className="apply-success-buttons">
          <button 
            onClick={() => navigate("/")} 
            className="apply-btn-primary"
            style={{ padding: "14px 36px", fontSize: "15px" }}
          >
            🏠 Return to Home
          </button>
          <button 
            onClick={() => navigate("/jobs")} 
            className="apply-btn-secondary"
            style={{ padding: "14px 36px", fontSize: "15px" }}
          >
            📋 View More Jobs
          </button>
        </div>
      </motion.div>
    );
  };

  // ── Main Render ──────────────────────────────────────────────────────────

  if (isSubmitted) {
    return (
      <div className="apply-page">
        <div className="apply-container">
          {renderThankYou()}
        </div>

        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="apply-page">
      <div className="apply-container">
        <button onClick={() => navigate(-1)} className="apply-back-btn">
          <ArrowLeft size={16} /> Back
        </button>

        <div className="apply-header">
          <h1 className="apply-title">
            Apply for{" "}
            <span style={{ color: "#C4972A" }}>
              {selectedJob?.title || "Healthcare Role"}
            </span>
          </h1>
          {selectedJob && (
            <div className="apply-job-badge">
              <span className="apply-job-location">{selectedJob.location}</span>
              <span className="apply-job-pay">{selectedJob.pay}</span>
              {selectedJob.urgent && (
                <span className="apply-job-urgent">URGENT</span>
              )}
            </div>
          )}
          <p className="apply-subtitle">
            Complete the form below to apply for this position. Our team will review your application and get back to you within 2-3 business days.
          </p>
        </div>

        <div className="apply-progress">
          <div className="apply-progress-steps">
            {[1, 2, 3].map((s) => (
              <div key={s} className="apply-progress-step">
                <div className={`apply-progress-circle ${step >= s ? "active" : ""}`}>
                  {step > s ? <CheckCircle size={16} /> : s}
                </div>
                <span className="apply-progress-label">
                  {s === 1 ? "Personal" : s === 2 ? "CV Upload" : "Review"}
                </span>
              </div>
            ))}
          </div>
          <div className="apply-progress-bar">
            <div className="apply-progress-bar-fill" style={{ width: `${((step - 1) / 2) * 100}%` }} />
          </div>
        </div>

        {error && (
          <div className="apply-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form className="apply-form">
          <AnimatePresence mode="wait">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </AnimatePresence>

          {step < 3 && (
            <div className="apply-navigation">
              <button
                type="button"
                onClick={prevStep}
                className={step === 1 ? "apply-btn-hidden" : "apply-btn-secondary"}
                style={{ visibility: step === 1 ? "hidden" : "visible" }}
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="apply-btn-primary"
              >
                Continue →
              </button>
            </div>
          )}
        </form>

        <div className="apply-footer">
          <p>
            By submitting this application, you agree to our{" "}
            <a href="#privacy" style={{ color: "#C4972A" }}>Privacy Policy</a>.
            Your data will be used solely for recruitment purposes.
          </p>
        </div>
      </div>

      <style>{`
        .apply-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          padding: 80px 20px 60px;
        }

        .apply-container {
          max-width: 720px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 28px;
          padding: 40px 36px;
          box-shadow: 0 20px 60px rgba(15,29,61,0.08);
          border: 1px solid rgba(0,0,0,0.04);
        }

        .apply-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          color: #64748b;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px 0;
          margin-bottom: 20px;
          transition: color 0.2s;
        }
        .apply-back-btn:hover { color: #0f1d3d; }

        .apply-header { margin-bottom: 32px; }

        .apply-title {
          font-family: 'Inter', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: #0f1d3d;
          margin-bottom: 8px;
        }

        .apply-job-badge {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 12px;
        }

        .apply-job-location {
          font-size: 13px;
          color: #64748b;
          background: #f1f5f9;
          padding: 4px 12px;
          border-radius: 20px;
        }
        .apply-job-pay {
          font-size: 13px;
          color: #0f1d3d;
          font-weight: 700;
          background: #fefcf8;
          padding: 4px 12px;
          border-radius: 20px;
          border: 1px solid rgba(196,151,42,0.2);
        }
        .apply-job-urgent {
          font-size: 11px;
          font-weight: 700;
          color: #fff;
          background: #ef4444;
          padding: 4px 10px;
          border-radius: 20px;
        }

        .apply-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: #64748b;
          line-height: 1.6;
          margin-top: 4px;
        }

        .apply-progress { margin-bottom: 32px; }
        .apply-progress-steps {
          display: flex;
          justify-content: space-between;
          position: relative;
          z-index: 2;
        }
        .apply-progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .apply-progress-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #e2e8f0;
          color: #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: 14px;
          transition: all 0.3s;
        }
        .apply-progress-circle.active {
          background: #C4972A;
          color: #0f1d3d;
          box-shadow: 0 4px 12px rgba(196,151,42,0.3);
        }
        .apply-progress-label {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          color: #94a3b8;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .apply-progress-bar {
          height: 3px;
          background: #e2e8f0;
          border-radius: 3px;
          margin-top: -18px;
          position: relative;
          z-index: 1;
        }
        .apply-progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #C4972A, #f0c060);
          border-radius: 3px;
          transition: width 0.5s ease;
        }

        .apply-step { padding: 8px 0; }
        .apply-step-title {
          font-family: 'Inter', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #0f1d3d;
          margin-bottom: 4px;
        }
        .apply-step-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: #64748b;
          margin-bottom: 24px;
        }

        .apply-form-group {
          margin-bottom: 18px;
        }

        .apply-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #334155;
          margin-bottom: 6px;
        }

        .apply-input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1.5px solid #e2e8f0;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: #0f1d3d;
          background: #fafbfc;
          transition: all 0.2s;
          outline: none;
        }
        .apply-input:focus {
          border-color: #C4972A;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(196,151,42,0.08);
        }
        .apply-input::placeholder {
          color: #94a3b8;
        }

        .apply-textarea {
          min-height: 100px;
          resize: vertical;
        }

        .apply-input select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          cursor: pointer;
        }

        .apply-upload-area {
          border: 2px dashed #e2e8f0;
          border-radius: 16px;
          padding: 32px;
          text-align: center;
          transition: all 0.2s;
          cursor: pointer;
        }
        .apply-upload-area:hover {
          border-color: #C4972A;
          background: #fefcf8;
        }

        .apply-upload-label {
          cursor: pointer;
          display: block;
          width: 100%;
        }

        .apply-upload-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .apply-upload-icon {
          color: #C4972A;
        }

        .apply-upload-text {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #0f1d3d;
        }

        .apply-upload-hint {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: #94a3b8;
        }

        .apply-file-preview {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: #f1f5f9;
          border-radius: 12px;
        }

        .apply-file-name {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #0f1d3d;
          flex: 1;
        }

        .apply-file-remove {
          background: none;
          border: none;
          cursor: pointer;
          color: #94a3b8;
          padding: 4px;
          transition: color 0.2s;
        }
        .apply-file-remove:hover { color: #ef4444; }

        .apply-review-card {
          background: #f8fafc;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid #e2e8f0;
        }

        .apply-review-section {
          padding: 12px 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .apply-review-section:last-child { border-bottom: none; }

        .apply-review-section h4 {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }

        .apply-review-item {
          display: flex;
          justify-content: space-between;
          padding: 4px 0;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
        }

        .apply-review-label {
          color: #94a3b8;
        }

        .apply-review-value {
          color: #0f1d3d;
          font-weight: 500;
          text-align: right;
        }

        .apply-navigation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 28px;
          padding-top: 24px;
          border-top: 1px solid #e2e8f0;
        }

        .apply-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 32px;
          border-radius: 40px;
          background: linear-gradient(135deg, #C4972A, #8B6914);
          color: #0f1d3d;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: 14px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 14px rgba(196,151,42,0.3);
        }
        .apply-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(196,151,42,0.4);
        }
        .apply-btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .apply-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          border-radius: 40px;
          background: transparent;
          color: #0f1d3d;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 14px;
          border: 1.5px solid #e2e8f0;
          cursor: pointer;
          transition: all 0.2s;
        }
        .apply-btn-secondary:hover {
          background: #f8fafc;
          border-color: #C4972A;
        }

        .apply-btn-hidden {
          visibility: hidden;
        }

        .apply-error {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-radius: 12px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          margin-bottom: 20px;
        }

        .apply-thank-you {
          text-align: center;
          padding: 20px 0;
        }

        .apply-success-icon {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #ecfdf5;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: #10b981;
        }

        .apply-success-title {
          font-family: 'Inter', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: #0f1d3d;
          margin-bottom: 8px;
        }

        .apply-success-text {
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          color: #64748b;
          max-width: 440px;
          margin: 0 auto 24px;
          line-height: 1.6;
        }

        .apply-success-card {
          background: #f8fafc;
          border-radius: 16px;
          padding: 24px;
          text-align: left;
          margin-bottom: 28px;
          border: 1px solid #e2e8f0;
        }

        .apply-success-card h4 {
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #0f1d3d;
          margin-bottom: 12px;
        }

        .apply-success-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .apply-success-list li {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: #475569;
          padding: 8px 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .apply-success-buttons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 8px;
        }

        .apply-footer {
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
          text-align: center;
        }

        .apply-footer p {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: #94a3b8;
        }

        @media (max-width: 640px) {
          .apply-container {
            padding: 24px 18px;
          }
          .apply-title {
            font-size: 22px;
          }
          .apply-job-badge {
            gap: 6px;
          }
          .apply-progress-steps {
            gap: 8px;
          }
          .apply-progress-label {
            font-size: 8px;
          }
          .apply-navigation {
            flex-direction: column-reverse;
            gap: 12px;
          }
          .apply-navigation button {
            width: 100%;
            justify-content: center;
          }
          .apply-btn-secondary {
            width: 100%;
            justify-content: center;
          }
          .apply-review-item {
            flex-direction: column;
            gap: 2px;
          }
          .apply-review-value {
            text-align: left;
          }
          .apply-upload-area {
            padding: 20px;
          }
          .apply-success-buttons {
            flex-direction: column;
            align-items: center;
          }
          .apply-success-buttons button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}