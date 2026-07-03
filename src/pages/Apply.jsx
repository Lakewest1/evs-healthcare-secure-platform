import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
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
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// EVS Healthcare — Job Application Page (FREE with EmailJS via Netlify Function)
// Architecture: React Frontend → Netlify Function → EmailJS API
// Keys are stored securely on the server, never exposed to the browser.
// ─────────────────────────────────────────────────────────────────────────────

// ── Cloudinary Configuration (from .env) ──
// These are safe to expose in the browser (public keys/presets)
const CLOUDINARY_CONFIG = {
  CLOUD_NAME: import.meta.env.CLOUDINARY_CLOUD_NAME,
  UPLOAD_PRESET: import.meta.env.CLOUDINARY_UPLOAD_PRESET,
};

const ADMIN_EMAIL = import.meta.env.ADMIN_EMAIL;

if (!ADMIN_EMAIL && import.meta.env.DEV) {
  console.error("ADMIN_EMAIL is not set. Submissions will fail until this is configured.");
}

if (import.meta.env.DEV) {
  console.log("[dev] Cloudinary cloud configured:", Boolean(CLOUDINARY_CONFIG.CLOUD_NAME));
}

// ── Job data (fallback if no job selected) ──
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

// ── Utility Functions ──
const sanitizeInput = (value, maxLength = 500) => {
  if (typeof value !== "string") return "";
  return value
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
};

const isValidEmail = (value) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim());

const isValidPhone = (value) =>
  /^[+()0-9\s-]{7,20}$/.test(value.trim());

const FIELD_LIMITS = {
  fullName: 100,
  email: 150,
  phone: 20,
  address: 200,
  message: 1000,
};

export default function Apply() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState(null);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // ── Form State ──
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    availability: "",
    experience: "",
    message: "",
  });

  // ── Honeypot ──
  const [hp, setHp] = useState("");

  // ── CV State ──
  const [cvData, setCvData] = useState(null);
  const [cvPreview, setCvPreview] = useState(null);

  // ── Rate limiting ──
  const lastSubmitRef = useRef(0);
  const SUBMIT_COOLDOWN_MS = 15000;

  // ── Load Cloudinary Widget Script ──
  useEffect(() => {
    if (document.getElementById('cloudinary-widget-script')) return;

    const script = document.createElement('script');
    script.id = 'cloudinary-widget-script';
    script.src = 'https://upload-widget.cloudinary.com/global/all.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById('cloudinary-widget-script');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  // ── Get job from URL query params (NEW: enhanced to capture all job details) ──
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    // Check if job details are passed as URL parameters (from Jobs page)
    const jobId = params.get("jobId") || params.get("job");
    
    if (jobId) {
      // Try to find job by ID in JOBS array
      let job = JOBS.find((j) => j.id === parseInt(jobId, 10));
      
      // If not found by ID, try to build job from URL parameters
      if (!job) {
        const jobTitle = params.get("jobTitle");
        const jobLocation = params.get("jobLocation");
        const jobPay = params.get("jobPay");
        const jobType = params.get("jobType");
        const jobDepartment = params.get("jobDepartment");
        const jobShift = params.get("jobShift");
        const jobExperience = params.get("jobExperience");
        
        if (jobTitle) {
          job = {
            id: parseInt(jobId, 10) || 0,
            title: jobTitle,
            location: jobLocation || "Location not specified",
            pay: jobPay || "Pay not specified",
            type: jobType || "Not specified",
            department: jobDepartment || "Not specified",
            shift: jobShift || "Not specified",
            experience: jobExperience || "Not specified",
            urgent: params.get("urgent") === "true",
          };
        }
      }
      
      if (job) {
        setSelectedJob(job);
        
        // Pre-fill the experience field if job experience is available
        if (job.experience && job.experience !== "Not specified") {
          setFormData(prev => ({
            ...prev,
            experience: job.experience || prev.experience,
          }));
        }
      }
    }
  }, [location]);

  // ── Handle form changes ──
  const handleChange = (e) => {
    const { name, value } = e.target;
    const limit = FIELD_LIMITS[name];
    setFormData((prev) => ({
      ...prev,
      [name]: limit ? value.slice(0, limit) : value,
    }));
  };

  // ── Validation ──
  const validateStep = () => {
    if (step === 1) {
      if (!formData.fullName.trim()) {
        setError("Please enter your full name");
        return false;
      }
      if (!formData.email.trim() || !isValidEmail(formData.email)) {
        setError("Please enter a valid email address");
        return false;
      }
      if (!formData.phone.trim() || !isValidPhone(formData.phone)) {
        setError("Please enter a valid phone number");
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
      setStep((s) => s + 1);
      setError(null);
    }
  };

  const prevStep = () => {
    setStep((s) => s - 1);
    setError(null);
  };

  // ── Cloudinary Upload Widget ──
const openUploadWidget = () => {
  // Wait for Cloudinary to be available
  if (!window.cloudinary) {
    setError("Upload widget is loading. Please try again in a moment.");
    
    // Force reload the script if it's missing
    const existingScript = document.getElementById('cloudinary-widget-script');
    if (existingScript) {
      existingScript.remove();
    }
    
    const script = document.createElement('script');
    script.id = 'cloudinary-widget-script';
    script.src = 'https://upload-widget.cloudinary.com/global/all.js';
    script.async = true;
    script.onload = () => {
      // Retry after script loads
      setTimeout(openUploadWidget, 500);
    };
    document.body.appendChild(script);
    return;
  }

  if (!CLOUDINARY_CONFIG.CLOUD_NAME || !CLOUDINARY_CONFIG.UPLOAD_PRESET) {
    setError("Upload is temporarily unavailable. Please try again later.");
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
        maxFileSize: 5000000,
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
      (widgetError, result) => {
        setIsUploading(false);

        if (widgetError) {
          setError("Failed to upload CV. Please try again.");
          return;
        }

        if (result && result.event === 'success') {
          const allowed = ['pdf', 'doc', 'docx', 'txt', 'rtf'];
          const format = (result.info.format || '').toLowerCase();
          if (format && !allowed.includes(format)) {
            setError("That file type isn't supported. Please upload a PDF or Word document.");
            return;
          }

          const fileData = {
            url: result.info.secure_url,
            filename: sanitizeInput(result.info.original_filename, 150),
            public_id: result.info.public_id,
          };
          setCvData(fileData);
          setCvPreview(fileData.filename);
          setError(null);
        }
      }
    );
    widget.open();
  } catch (err) {
    setIsUploading(false);
    setError("Failed to open upload widget. Please try again.");
  }
};

  const removeCV = () => {
    setCvData(null);
    setCvPreview(null);
  };

  // ── Send Email via Netlify Function (SECURE) ──
  // All EmailJS keys are stored on the server in Netlify environment variables.
  // This function sends the form data to your Netlify Function, which then
  // securely calls the EmailJS API. No API keys are exposed to the browser.
  const sendEmail = useCallback(async () => {
    // Build the template parameters exactly as before
    const templateParams = {
      to_email: ADMIN_EMAIL,
      to_name: "EVS Healthcare Recruitment",

      from_name: sanitizeInput(formData.fullName, FIELD_LIMITS.fullName),
      from_email: sanitizeInput(formData.email, FIELD_LIMITS.email),
      from_phone: sanitizeInput(formData.phone, FIELD_LIMITS.phone),
      address: sanitizeInput(formData.address, FIELD_LIMITS.address) || "Not provided",
      availability: formData.availability || "Not specified",
      experience: formData.experience || "Not specified",
      message: sanitizeInput(formData.message, FIELD_LIMITS.message) || "No additional message",

      job_title: selectedJob?.title || "Not specified",
      job_location: selectedJob?.location || "",
      job_pay: selectedJob?.pay || "",
      job_type: selectedJob?.type || "",
      job_department: selectedJob?.department || "",
      job_shift: selectedJob?.shift || "",
      submitted_at: new Date().toLocaleString(),

      cv_filename: cvData?.filename || "No CV attached",
      cv_url: cvData?.url || "Not uploaded",
    };

    try {
      // Call your secure Netlify Function instead of EmailJS directly
      const response = await fetch('/.netlify/functions/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(templateParams),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application');
      }

      return result;
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("Submission error:", err);
      }
      throw new Error(err.message || 'Could not send your application. Please try again.');
    }
  }, [formData, selectedJob, cvData]);

  // ── Main Submit Handler ──
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hp) {
      setError("Something went wrong. Please refresh and try again.");
      return;
    }

    if (!validateStep()) return;

    const now = Date.now();
    if (now - lastSubmitRef.current < SUBMIT_COOLDOWN_MS) {
      setError("Please wait a moment before submitting again.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await sendEmail();
      lastSubmitRef.current = now;
      setIsSubmitted(true);
    } catch (err) {
      setError(
        err.message ||
        `Failed to submit application. Please try again or email your CV directly.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Render Steps ──

  const renderStep1 = () => (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="apply-step">
        <h3 className="apply-step-title">Personal information</h3>
        <p className="apply-step-subtitle">Tell us about yourself so we can match you with the right role</p>

        <div className="apply-form-group">
          <label className="apply-label" htmlFor="fullName">
            <User size={16} /> Full name <span className="apply-required">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g., John Smith"
            className="apply-input"
            autoComplete="name"
            maxLength={FIELD_LIMITS.fullName}
            required
          />
        </div>

        <div className="apply-form-group">
          <label className="apply-label" htmlFor="email">
            <Mail size={16} /> Email address <span className="apply-required">*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g., john@example.com"
            className="apply-input"
            autoComplete="email"
            maxLength={FIELD_LIMITS.email}
            required
          />
        </div>

        <div className="apply-form-group">
          <label className="apply-label" htmlFor="phone">
            <Phone size={16} /> Phone number <span className="apply-required">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g., 01234 567890"
            className="apply-input"
            autoComplete="tel"
            maxLength={FIELD_LIMITS.phone}
            required
          />
        </div>

        <div className="apply-form-group">
          <label className="apply-label" htmlFor="address">
            <MapPin size={16} /> Address <span className="apply-optional">(optional)</span>
          </label>
          <input
            id="address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="e.g., Preston, Lancashire"
            className="apply-input"
            autoComplete="address-level2"
            maxLength={FIELD_LIMITS.address}
          />
        </div>

        {/* Honeypot */}
        <div className="apply-honeypot" aria-hidden="true">
          <label htmlFor="company-website">Company website</label>
          <input
            id="company-website"
            type="text"
            name="company-website"
            tabIndex={-1}
            autoComplete="off"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
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
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="apply-step">
        <h3 className="apply-step-title">CV upload &amp; additional info</h3>
        <p className="apply-step-subtitle">Upload your CV securely — accepted formats are PDF, DOC, and DOCX</p>

        <div className="apply-form-group">
          <label className="apply-label" htmlFor="availability">
            <Briefcase size={16} /> Availability
          </label>
          <select
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="apply-input apply-select"
          >
            <option value="">Select availability...</option>
            <option value="Immediate">Immediate start</option>
            <option value="1-2 weeks">Available in 1–2 weeks</option>
            <option value="2-4 weeks">Available in 2–4 weeks</option>
            <option value="1 month+">Available in 1 month+</option>
            <option value="Flexible">Flexible availability</option>
          </select>
        </div>

        <div className="apply-form-group">
          <label className="apply-label" htmlFor="experience">
            <Clock size={16} /> Experience level
          </label>
          <select
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="apply-input apply-select"
          >
            <option value="">Select experience...</option>
            <option value="Entry Level">Entry level (0–1 year)</option>
            <option value="Junior">Junior (1–3 years)</option>
            <option value="Mid Level">Mid level (3–5 years)</option>
            <option value="Senior">Senior (5+ years)</option>
            <option value="Managerial">Managerial</option>
          </select>
          {/* Show pre-filled job experience hint */}
          {selectedJob?.experience && selectedJob.experience !== "Not specified" && (
            <div style={{ 
              marginTop: 6, 
              fontSize: 12, 
              color: '#64748b',
              fontFamily: "'Inter', sans-serif",
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <span style={{ color: '#C4972A' }}>•</span>
              Job requires: <strong>{selectedJob.experience}</strong>
            </div>
          )}
        </div>

        <div className="apply-form-group">
          <label className="apply-label">
            <FileText size={16} /> Upload CV <span className="apply-required">*</span>
          </label>

          {!cvData ? (
            <button
              type="button"
              onClick={openUploadWidget}
              className="apply-upload-area"
              disabled={isUploading}
            >
              <span className="apply-upload-icon">
                {isUploading ? (
                  <Loader2 size={26} className="apply-spin" />
                ) : (
                  <Upload size={26} />
                )}
              </span>
              <span className="apply-upload-text">
                {isUploading ? "Uploading…" : "Click to upload your CV"}
              </span>
              <span className="apply-upload-hint">PDF, DOC, or DOCX · max 5MB</span>
            </button>
          ) : (
            <div className="apply-file-preview">
              <span className="apply-file-icon"><FileText size={18} /></span>
              <span className="apply-file-name">{cvData.filename}</span>
              <button
                onClick={removeCV}
                className="apply-file-remove"
                type="button"
                aria-label="Remove uploaded CV"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="apply-form-group">
          <label className="apply-label" htmlFor="message">
            <MessageCircle size={16} /> Additional message <span className="apply-optional">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us anything else we should know about you..."
            rows={4}
            className="apply-input apply-textarea"
            maxLength={FIELD_LIMITS.message}
          />
          <span className="apply-char-count">{formData.message.length}/{FIELD_LIMITS.message}</span>
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
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="apply-step">
        <h3 className="apply-step-title">Review &amp; submit</h3>
        <p className="apply-step-subtitle">Please check your details before sending your application</p>

        <div className="apply-review-card">
          <div className="apply-review-section">
            <h4>Personal information</h4>
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
              <h4>Applying for</h4>
              <div className="apply-review-item">
                <span className="apply-review-label">Role</span>
                <span className="apply-review-value apply-review-highlight">
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
              {selectedJob.type && (
                <div className="apply-review-item">
                  <span className="apply-review-label">Type</span>
                  <span className="apply-review-value">{selectedJob.type}</span>
                </div>
              )}
              {selectedJob.shift && selectedJob.shift !== "Not specified" && (
                <div className="apply-review-item">
                  <span className="apply-review-label">Shift</span>
                  <span className="apply-review-value">{selectedJob.shift}</span>
                </div>
              )}
            </div>
          )}

          <div className="apply-review-section">
            <h4>Documents</h4>
            <div className="apply-review-item">
              <span className="apply-review-label">CV</span>
              <span className="apply-review-value apply-review-success">
                <CheckCircle size={14} /> {cvData?.filename} uploaded
              </span>
            </div>
            {cvData?.url && (
              <div className="apply-review-item">
                <span className="apply-review-label">Preview</span>
                <span className="apply-review-value">
                  <a
                    href={cvData.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="apply-review-link"
                  >
                    View CV ↗
                  </a>
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="apply-review-actions">
          <button onClick={prevStep} className="apply-btn-secondary" type="button">
            Back
          </button>
          <button onClick={handleSubmit} className="apply-btn-primary" disabled={isSubmitting} type="button">
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="apply-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit application <Send size={16} />
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
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="apply-thank-you"
      >
        <motion.div
          className="apply-success-icon"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <CheckCircle size={56} />
        </motion.div>
        <h2 className="apply-success-title">Application submitted</h2>
        <p className="apply-success-text">
          Thank you for applying to <strong>{jobTitle}</strong>. We've received your
          application and our team will review it shortly.
        </p>

        <div className="apply-success-card">
          <h4>What happens next</h4>
          <ul className="apply-success-list">
            <li>
              <Mail size={16} className="apply-success-list-icon" />
              You'll receive a confirmation email shortly
            </li>
            <li>
              <FileText size={16} className="apply-success-list-icon" />
              Our recruitment team will review your CV
            </li>
            <li>
              <Clock size={16} className="apply-success-list-icon" />
              We'll contact you within 2–3 business days
            </li>
            <li>
              <Briefcase size={16} className="apply-success-list-icon" />
              If shortlisted, we'll schedule an interview
            </li>
          </ul>
        </div>

        <div className="apply-success-buttons">
          <button onClick={() => navigate("/")} className="apply-btn-primary">
            Return home
          </button>
          <button onClick={() => navigate("/jobs")} className="apply-btn-secondary">
            View more jobs
          </button>
        </div>
      </motion.div>
    );
  };

  // ── Main Render ──

  if (isSubmitted) {
    return (
      <div className="apply-page">
        <div className="apply-container">{renderThankYou()}</div>
        <ApplyStyles />
      </div>
    );
  }

  return (
    <div className="apply-page">
      <div className="apply-container">
        <button onClick={() => navigate(-1)} className="apply-back-btn" type="button">
          <ArrowLeft size={16} /> Back
        </button>

        <div className="apply-header">
          <h1 className="apply-title">
            Apply for <span className="apply-title-accent">{selectedJob?.title || "Healthcare Role"}</span>
          </h1>
          {selectedJob && (
            <div className="apply-job-badge">
              <span className="apply-job-chip">{selectedJob.location}</span>
              <span className="apply-job-chip apply-job-chip-pay">{selectedJob.pay}</span>
              {selectedJob.urgent && <span className="apply-job-chip apply-job-chip-urgent">Urgent</span>}
              {selectedJob.type && selectedJob.type !== "Not specified" && (
                <span className="apply-job-chip">{selectedJob.type}</span>
              )}
            </div>
          )}
          <p className="apply-subtitle">
            Complete the form below to apply for this position. Our team will review your
            application and get back to you within 2–3 business days.
          </p>
        </div>

        <div className="apply-progress">
          <div className="apply-progress-steps">
            {[1, 2, 3].map((s) => (
              <div key={s} className="apply-progress-step">
                <div className={`apply-progress-circle ${step >= s ? "active" : ""} ${step > s ? "done" : ""}`}>
                  {step > s ? <CheckCircle size={16} /> : s}
                </div>
                <span className={`apply-progress-label ${step >= s ? "active" : ""}`}>
                  {s === 1 ? "Personal" : s === 2 ? "CV upload" : "Review"}
                </span>
              </div>
            ))}
          </div>
          <div className="apply-progress-bar">
            <motion.div
              className="apply-progress-bar-fill"
              animate={{ width: `${((step - 1) / 2) * 100}%` }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              className="apply-error"
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 20 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              role="alert"
            >
              <AlertCircle size={18} />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form className="apply-form" onSubmit={(e) => e.preventDefault()} noValidate>
          <AnimatePresence mode="wait">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </AnimatePresence>

          {step < 3 && (
            <div className="apply-navigation">
              {step > 1 ? (
                <button type="button" onClick={prevStep} className="apply-btn-secondary">
                  Back
                </button>
              ) : (
                <span />
              )}
              <button type="button" onClick={nextStep} className="apply-btn-primary">
                Continue →
              </button>
            </div>
          )}
        </form>

        <div className="apply-footer">
          <ShieldCheck size={14} className="apply-footer-icon" />
          <p>
            By submitting this application, you agree to our{" "}
            <a href="#privacy" className="apply-footer-link">Privacy Policy</a>. Your data is used
            solely for recruitment purposes.
          </p>
        </div>
      </div>

      <ApplyStyles />
    </div>
  );
}

// ── Styles ──
function ApplyStyles() {
  return (
    <style>{`
      :root {
        --navy: #0f1d3d;
        --navy-soft: #1a2d5a;
        --gold: #C4972A;
        --gold-deep: #8B6914;
        --gold-light: #f0c060;
        --ink: #0f1d3d;
        --muted: #64748b;
        --muted-soft: #94a3b8;
        --line: #e2e8f0;
        --surface: #fafbfc;
        --surface-alt: #f8fafc;
        --success: #10b981;
        --danger: #dc2626;
      }

      .apply-page {
        min-height: 100vh;
        background:
          radial-gradient(circle at 8% 0%, rgba(196,151,42,0.06), transparent 45%),
          linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
        padding: 88px 20px 64px;
      }

      .apply-container {
        max-width: 720px;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 24px;
        padding: 44px 40px;
        box-shadow:
          0 1px 2px rgba(15,29,61,0.04),
          0 24px 64px -12px rgba(15,29,61,0.12);
        border: 1px solid rgba(15,29,61,0.05);
      }

      .apply-back-btn {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        font-family: 'Inter', sans-serif;
        font-size: 13px;
        font-weight: 500;
        color: var(--muted);
        background: none;
        border: none;
        cursor: pointer;
        padding: 6px 0;
        margin-bottom: 24px;
        transition: color 0.15s ease, transform 0.15s ease;
      }
      .apply-back-btn:hover { color: var(--navy); transform: translateX(-2px); }
      .apply-back-btn:focus-visible {
        outline: 2px solid var(--gold);
        outline-offset: 4px;
        border-radius: 4px;
      }

      .apply-header { margin-bottom: 36px; }

      .apply-title {
        font-family: 'Inter', sans-serif;
        font-size: 30px;
        line-height: 1.2;
        font-weight: 800;
        letter-spacing: -0.01em;
        color: var(--navy);
        margin-bottom: 12px;
      }
      .apply-title-accent { color: var(--gold-deep); }

      .apply-job-badge {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 14px;
      }

      .apply-job-chip {
        font-family: 'Inter', sans-serif;
        font-size: 12.5px;
        font-weight: 600;
        color: var(--muted);
        background: var(--surface-alt);
        padding: 5px 13px;
        border-radius: 20px;
        border: 1px solid var(--line);
      }
      .apply-job-chip-pay {
        color: var(--navy);
        background: #fefcf6;
        border-color: rgba(196,151,42,0.25);
      }
      .apply-job-chip-urgent {
        color: #fff;
        background: #ef4444;
        border-color: #ef4444;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        font-size: 11px;
      }

      .apply-subtitle {
        font-family: 'Inter', sans-serif;
        font-size: 14.5px;
        color: var(--muted);
        line-height: 1.65;
      }

      .apply-progress { margin-bottom: 36px; }
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
        gap: 8px;
      }
      .apply-progress-circle {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: #fff;
        color: var(--muted-soft);
        border: 2px solid var(--line);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Inter', sans-serif;
        font-weight: 700;
        font-size: 13px;
        transition: all 0.25s ease;
      }
      .apply-progress-circle.active {
        background: var(--gold);
        color: var(--navy);
        border-color: var(--gold);
        box-shadow: 0 0 0 4px rgba(196,151,42,0.15);
      }
      .apply-progress-circle.done {
        background: var(--navy);
        border-color: var(--navy);
        color: #fff;
      }
      .apply-progress-label {
        font-family: 'Inter', sans-serif;
        font-size: 10.5px;
        color: var(--muted-soft);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        transition: color 0.25s ease;
      }
      .apply-progress-label.active { color: var(--navy); }

      .apply-progress-bar {
        height: 3px;
        background: var(--line);
        border-radius: 3px;
        margin-top: -17px;
        position: relative;
        z-index: 1;
        overflow: hidden;
      }
      .apply-progress-bar-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--gold), var(--gold-light));
        border-radius: 3px;
      }

      .apply-step { padding: 4px 0; }
      .apply-step-title {
        font-family: 'Inter', sans-serif;
        font-size: 19px;
        font-weight: 700;
        color: var(--navy);
        margin-bottom: 5px;
        letter-spacing: -0.005em;
      }
      .apply-step-subtitle {
        font-family: 'Inter', sans-serif;
        font-size: 13.5px;
        color: var(--muted);
        margin-bottom: 26px;
        line-height: 1.5;
      }

      .apply-form-group { margin-bottom: 18px; }

      .apply-label {
        display: flex;
        align-items: center;
        gap: 6px;
        font-family: 'Inter', sans-serif;
        font-size: 13px;
        font-weight: 600;
        color: #334155;
        margin-bottom: 7px;
      }
      .apply-required { color: var(--gold-deep); }
      .apply-optional {
        font-weight: 400;
        color: var(--muted-soft);
        font-size: 12px;
      }

      .apply-input {
        width: 100%;
        padding: 12px 16px;
        border-radius: 11px;
        border: 1.5px solid var(--line);
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        color: var(--navy);
        background: var(--surface);
        transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
        outline: none;
      }
      .apply-input:focus-visible {
        border-color: var(--gold);
        background: #ffffff;
        box-shadow: 0 0 0 4px rgba(196,151,42,0.1);
      }
      .apply-input::placeholder { color: var(--muted-soft); }

      .apply-select {
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 16px center;
        cursor: pointer;
      }

      .apply-textarea { min-height: 100px; resize: vertical; }
      .apply-char-count {
        display: block;
        text-align: right;
        font-family: 'Inter', sans-serif;
        font-size: 11px;
        color: var(--muted-soft);
        margin-top: 4px;
      }

      .apply-upload-area {
        width: 100%;
        border: 2px dashed var(--line);
        border-radius: 16px;
        padding: 30px 20px;
        text-align: center;
        background: var(--surface-alt);
        transition: border-color 0.2s ease, background 0.2s ease, transform 0.15s ease;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }
      .apply-upload-area:hover:not(:disabled) {
        border-color: var(--gold);
        background: #fefcf6;
      }
      .apply-upload-area:focus-visible {
        outline: 2px solid var(--gold);
        outline-offset: 2px;
      }
      .apply-upload-area:disabled { cursor: not-allowed; opacity: 0.75; }

      .apply-upload-icon { color: var(--gold-deep); }
      .apply-upload-text {
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-weight: 600;
        color: var(--navy);
      }
      .apply-upload-hint {
        font-family: 'Inter', sans-serif;
        font-size: 12px;
        color: var(--muted-soft);
      }

      .apply-file-preview {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 13px 16px;
        background: #f0fdf4;
        border: 1.5px solid #bbf7d0;
        border-radius: 12px;
      }
      .apply-file-icon { color: var(--success); display: flex; }
      .apply-file-name {
        font-family: 'Inter', sans-serif;
        font-size: 13px;
        font-weight: 500;
        color: var(--navy);
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .apply-file-remove {
        background: none;
        border: none;
        cursor: pointer;
        color: var(--muted-soft);
        padding: 4px;
        display: flex;
        border-radius: 6px;
        transition: color 0.15s ease, background 0.15s ease;
      }
      .apply-file-remove:hover { color: var(--danger); background: rgba(220,38,38,0.08); }

      .apply-honeypot {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0 0 0 0);
        white-space: nowrap;
        left: -9999px;
      }

      .apply-review-card {
        background: var(--surface-alt);
        border-radius: 16px;
        padding: 22px 24px;
        border: 1px solid var(--line);
      }
      .apply-review-section {
        padding: 13px 0;
        border-bottom: 1px solid var(--line);
      }
      .apply-review-section:first-child { padding-top: 0; }
      .apply-review-section:last-child { border-bottom: none; padding-bottom: 0; }

      .apply-review-section h4 {
        font-family: 'Inter', sans-serif;
        font-size: 12px;
        font-weight: 700;
        color: var(--muted);
        text-transform: uppercase;
        letter-spacing: 0.06em;
        margin-bottom: 9px;
      }

      .apply-review-item {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        padding: 4px 0;
        font-family: 'Inter', sans-serif;
        font-size: 13.5px;
      }
      .apply-review-label { color: var(--muted-soft); flex-shrink: 0; }
      .apply-review-value {
        color: var(--navy);
        font-weight: 500;
        text-align: right;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .apply-review-highlight { color: var(--gold-deep); font-weight: 700; }
      .apply-review-success { color: var(--success); }
      .apply-review-link {
        color: var(--gold-deep);
        text-decoration: none;
        font-weight: 600;
      }
      .apply-review-link:hover { text-decoration: underline; }

      .apply-review-actions {
        display: flex;
        justify-content: center;
        gap: 12px;
        margin-top: 26px;
      }

      .apply-navigation {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 30px;
        padding-top: 26px;
        border-top: 1px solid var(--line);
      }

      .apply-btn-primary {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 12px 30px;
        border-radius: 40px;
        background: linear-gradient(135deg, var(--gold), var(--gold-deep));
        color: var(--navy);
        font-family: 'Inter', sans-serif;
        font-weight: 700;
        font-size: 14px;
        border: none;
        cursor: pointer;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
        box-shadow: 0 4px 14px rgba(196,151,42,0.28);
      }
      .apply-btn-primary:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 8px 22px rgba(196,151,42,0.36);
      }
      .apply-btn-primary:focus-visible {
        outline: 2px solid var(--navy);
        outline-offset: 3px;
      }
      .apply-btn-primary:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }

      .apply-btn-secondary {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 12px 26px;
        border-radius: 40px;
        background: transparent;
        color: var(--navy);
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        font-size: 14px;
        border: 1.5px solid var(--line);
        cursor: pointer;
        transition: border-color 0.15s ease, background 0.15s ease;
      }
      .apply-btn-secondary:hover { background: var(--surface-alt); border-color: var(--gold); }
      .apply-btn-secondary:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }

      .apply-error {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 13px 16px;
        border-radius: 12px;
        background: #fef2f2;
        border: 1px solid #fecaca;
        color: var(--danger);
        font-family: 'Inter', sans-serif;
        font-size: 13px;
        overflow: hidden;
      }

      .apply-thank-you { text-align: center; padding: 12px 0; }

      .apply-success-icon {
        width: 68px;
        height: 68px;
        border-radius: 50%;
        background: #ecfdf5;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 22px;
        color: var(--success);
      }

      .apply-success-title {
        font-family: 'Inter', sans-serif;
        font-size: 26px;
        font-weight: 800;
        color: var(--navy);
        margin-bottom: 10px;
        letter-spacing: -0.01em;
      }

      .apply-success-text {
        font-family: 'Inter', sans-serif;
        font-size: 14.5px;
        color: var(--muted);
        max-width: 420px;
        margin: 0 auto 26px;
        line-height: 1.65;
      }

      .apply-success-card {
        background: var(--surface-alt);
        border-radius: 16px;
        padding: 24px;
        text-align: left;
        margin-bottom: 28px;
        border: 1px solid var(--line);
      }
      .apply-success-card h4 {
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-weight: 700;
        color: var(--navy);
        margin-bottom: 13px;
      }

      .apply-success-list { list-style: none; padding: 0; margin: 0; }
      .apply-success-list li {
        font-family: 'Inter', sans-serif;
        font-size: 13.5px;
        color: #475569;
        padding: 7px 0;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .apply-success-list-icon { color: var(--gold-deep); flex-shrink: 0; }

      .apply-success-buttons {
        display: flex;
        gap: 14px;
        flex-wrap: wrap;
        justify-content: center;
      }

      .apply-footer {
        margin-top: 30px;
        padding-top: 22px;
        border-top: 1px solid var(--line);
        display: flex;
        align-items: flex-start;
        justify-content: center;
        gap: 6px;
        text-align: center;
      }
      .apply-footer-icon { color: var(--muted-soft); margin-top: 1px; flex-shrink: 0; }
      .apply-footer p {
        font-family: 'Inter', sans-serif;
        font-size: 12px;
        color: var(--muted-soft);
        line-height: 1.5;
      }
      .apply-footer-link { color: var(--gold-deep); font-weight: 600; }

      .apply-spin { animation: apply-spin 0.9s linear infinite; }
      @keyframes apply-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      @media (prefers-reduced-motion: reduce) {
        .apply-spin { animation-duration: 2s; }
      }

      @media (max-width: 640px) {
        .apply-page { padding: 72px 14px 48px; }
        .apply-container { padding: 28px 20px; border-radius: 20px; }
        .apply-title { font-size: 23px; }
        .apply-job-badge { gap: 6px; }
        .apply-progress-label { font-size: 9px; }
        .apply-navigation { flex-direction: column-reverse; gap: 12px; }
        .apply-navigation button { width: 100%; }
        .apply-review-actions { flex-direction: column-reverse; }
        .apply-review-actions button { width: 100%; }
        .apply-review-item { flex-direction: column; gap: 2px; }
        .apply-review-value { text-align: left; }
        .apply-success-buttons { flex-direction: column; align-items: stretch; }
      }
    `}</style>
  );
}