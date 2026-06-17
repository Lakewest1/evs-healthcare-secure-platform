import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Copy,
  Check,
  ArrowRight,
  Send,
  MessageCircle,
  Clock,
  User,
  AtSign,
  FileText,
  CheckCircle,
  AlertCircle,
  Shield,
  Heart,
  Star,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// ── Social icons from react-icons ──
import { 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaLinkedin, 
  FaSnapchat, 
  FaTiktok, 
  FaTelegram 
} from "react-icons/fa";

// ─────────────────────────────────────────────────────────────────────────────
// Contact Page — Modern Enterprise-Grade Contact Experience
// Features: Hero banner, contact info cards, form with validation, map,
//           working hours, FAQ section, social media links
// ─────────────────────────────────────────────────────────────────────────────

// ── Detect screen size ──
const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      });
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return screenSize;
};

// ── Contact Information Items ──
const CONTACT_ITEMS = [
  { 
    icon: MapPin, 
    label: "Office Address", 
    value: "1a John William Street, Preston, PR1 4XE",
    action: "Get Directions",
    link: "https://maps.google.com/?q=1a+John+William+Street+Preston+PR1+4XE",
    isLink: true,
  },
  { 
    icon: Phone, 
    label: "Phone", 
    value: "07466999218",
    secondary: "07466 999218",
    action: "Call Now",
    link: "tel:07466999218",
    isLink: true,
  },
  { 
    icon: Phone, 
    label: "Out of Hours", 
    value: "07308 863868",
    action: "Call Now",
    link: "tel:07308863868",
    isLink: true,
  },
  { 
    icon: Mail, 
    label: "General Enquiries", 
    value: "admin_1@evshealthcare.co.uk",
    action: "Copy Email",
    isLink: false,
  },
  { 
    icon: Mail, 
    label: "Recruitment", 
    value: "hentrintta@evshealthcare.co.uk",
    action: "Copy Email",
    isLink: false,
  },
  { 
    icon: Mail, 
    label: "HealthCara", 
    value: "EVS4961@HEALTHCARA@GMAIL.COM",
    action: "Copy Email",
    isLink: false,
  },
];

// ── Trust Badges ──
const TRUST_BADGES = [
  { icon: Shield, label: "CQC Compliant", color: "#00A859" },
  { icon: Heart, label: "Free DBS Support", color: "#10b981" },
  { icon: Star, label: "500+ Workers Placed", color: "#C4972A" },
];

// ── Working Hours ──
const WORKING_HOURS = [
  { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
  { day: "Saturday", hours: "9:00 AM - 2:00 PM" },
  { day: "Sunday", hours: "Closed" },
  { day: "Out of Hours Support", hours: "24/7 Emergency" },
];

// ── FAQ Data ──
const FAQS = [
  {
    question: "How do I apply for a job at EVS Healthcare?",
    answer: "You can apply directly through our website by visiting the Jobs page, browsing available positions, and clicking 'Apply Now' on your desired role. You'll be guided through our simple application process."
  },
  {
    question: "What documents do I need to provide?",
    answer: "You'll need to provide your CV, proof of identity (passport or driving license), proof of address, and any relevant qualifications or certifications. Our recruitment team will guide you through the full compliance process."
  },
  {
    question: "Do you offer training and development?",
    answer: "Yes! We provide ongoing training, mandatory updates, and professional development opportunities to all our healthcare professionals. This includes manual handling, safeguarding, and role-specific training."
  },
  {
    question: "How quickly can I start working?",
    answer: "Once your compliance checks are complete and you've been placed in a suitable role, you can start working immediately. Our average placement time is within 48 hours."
  },
  {
    question: "What areas do you cover?",
    answer: "We primarily cover North-West England, including Preston, Lancashire, and surrounding areas. We work with NHS trusts, private hospitals, and care homes across the region."
  },
];

// ── Social Media Links (using react-icons) ──
const SOCIAL_LINKS = [
  { 
    icon: FaSnapchat, 
    label: "Snapchat", 
    url: "https://www.snapchat.com/add/evsrecruitment?share_id=K7sZjmh406w&locale=en-GB", 
    color: "#FFFC00",
    username: "@evsrecruitment"
  },
  { 
    icon: FaInstagram, 
    label: "Instagram", 
    url: "https://www.instagram.com/evsrecruitment?utm_source=qr&igsh=eWJmZHUyZ3B6cms2", 
    color: "#E4405F",
    username: "@evsrecruitment"
  },
  { 
    icon: FaTiktok, 
    label: "TikTok", 
    url: "https://www.tiktok.com/@evs.recruitment?_r=1&_t=ZN-97HokvF2OAA", 
    color: "#000000",
    username: "@evs.recruitment"
  },
  { 
    icon: FaLinkedin, 
    label: "LinkedIn", 
    url: "https://www.linkedin.com/in/evs-healthcare-solutions-limited-b9100121a?utm_source=share_via&utm_content=profile&utm_medium=member_android", 
    color: "#0077B5",
    username: "EVS Healthcare"
  },
  { 
    icon: FaTwitter, 
    label: "X (Twitter)", 
    url: "https://x.com/EvsSoulutions", 
    color: "#1DA1F2",
    username: "@EvsSoulutions"
  },
  { 
    icon: FaTelegram, 
    label: "Telegram", 
    url: "https://t.me/+447466999218", 
    color: "#26A5E4",
    username: "+447466999218"
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Hero Banner Component
// ─────────────────────────────────────────────────────────────────────────────
function ContactHero() {
  const { isMobile } = useScreenSize();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="contact-hero"
    >
      <div className="contact-hero-bg">
        <img
          src="https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781738736/main-sample.jpg"
          alt="EVS Healthcare - Contact Us"
          className="contact-hero-image"
          loading="eager"
        />
        <div className="contact-hero-overlay" />
      </div>
      <div className="contact-hero-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="contact-hero-badge"
        >
          <span className="contact-hero-badge-text">📞 24/7 Support</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="contact-hero-title"
        >
          Get in <span className="contact-hero-highlight">Touch</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="contact-hero-subtitle"
        >
          We're here to help. Reach out to our team for any inquiries, 
          support, or career opportunities.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="contact-hero-stats"
        >
          <div className="contact-hero-stat">
            <span className="contact-hero-stat-number">24/7</span>
            <span className="contact-hero-stat-label">Support Available</span>
          </div>
          <div className="contact-hero-stat-divider" />
          <div className="contact-hero-stat">
            <span className="contact-hero-stat-number">&lt;24hr</span>
            <span className="contact-hero-stat-label">Response Time</span>
          </div>
          <div className="contact-hero-stat-divider" />
          <div className="contact-hero-stat">
            <span className="contact-hero-stat-number">100%</span>
            <span className="contact-hero-stat-label">Satisfaction Rate</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Social Links Component
// ─────────────────────────────────────────────────────────────────────────────
function SocialLinks() {
  const { isMobile } = useScreenSize();

  return (
    <div className="contact-social">
      <h3 className="contact-social-title">Connect With Us</h3>
      <p className="contact-social-subtitle">
        Follow us on social media for updates, job alerts, and more
      </p>
      <div className="contact-social-links">
        {SOCIAL_LINKS.map((social, idx) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={idx}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="contact-social-link"
              style={{ 
                color: social.color,
                borderColor: isMobile ? 'transparent' : `${social.color}30`,
              }}
              aria-label={`Follow us on ${social.label}`}
            >
              <Icon size={isMobile ? 18 : 20} />
              <span className="contact-social-label">{social.label}</span>
              {social.username && (
                <span className="contact-social-username">{social.username}</span>
              )}
            </motion.a>
          );
        })}
      </div>
      
      {/* Snapchat-specific CTA */}
      <div className="contact-social-snapchat">
        <span className="contact-social-snapchat-text">📸 Add us on Snapchat!</span>
        <span className="contact-social-snapchat-username">Username: evsrecruitment</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Working Hours Component
// ─────────────────────────────────────────────────────────────────────────────
function WorkingHours({ isInView }) {
  const { isMobile } = useScreenSize();

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="contact-hours"
    >
      <div className="contact-hours-header">
        <Clock size={isMobile ? 20 : 24} strokeWidth={1.6} />
        <h3 className="contact-hours-title">Working Hours</h3>
      </div>
      <div className="contact-hours-grid">
        {WORKING_HOURS.map((item, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="contact-hours-item"
          >
            <span className="contact-hours-day">{item.day}</span>
            <span className="contact-hours-time">{item.hours}</span>
          </motion.div>
        ))}
      </div>
      <p className="contact-hours-note">
        <span className="contact-hours-note-icon">🕐</span>
        Out of hours support available for urgent staffing needs
      </p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ Component
// ─────────────────────────────────────────────────────────────────────────────
function FAQSection({ isInView }) {
  const [openIndex, setOpenIndex] = useState(null);
  const { isMobile } = useScreenSize();

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.5,
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="contact-faq"
    >
      <div className="contact-faq-header">
        <HelpCircle size={isMobile ? 20 : 24} strokeWidth={1.6} />
        <h3 className="contact-faq-title">Frequently Asked Questions</h3>
      </div>
      <div className="contact-faq-list">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`contact-faq-item ${isOpen ? "open" : ""}`}
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="contact-faq-question"
                aria-expanded={isOpen}
              >
                <span className="contact-faq-question-text">{faq.question}</span>
                {isOpen ? (
                  <ChevronUp size={18} className="contact-faq-icon" />
                ) : (
                  <ChevronDown size={18} className="contact-faq-icon" />
                )}
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="contact-faq-answer"
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Map Component
// ─────────────────────────────────────────────────────────────────────────────
function MapEmbed() {
  return (
    <div className="contact-map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2352.234567891011!2d-2.703844!3d53.759123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487b6b2e6a6b6b6b%3A0x6b6b6b6b6b6b6b6b!2s1a%20John%20William%20Street%2C%20Preston!5e0!3m2!1sen!2suk!4v1700000000000"
        className="contact-map-iframe"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="EVS Healthcare Office Location"
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Contact Info Card Component
// ─────────────────────────────────────────────────────────────────────────────
function ContactInfoCard({ item, index, isInView }) {
  const [isCopied, setIsCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { isMobile } = useScreenSize();
  const IconComponent = item.icon;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.value);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`contact-info-card ${isHovered ? "hovered" : ""}`}
    >
      <div className="contact-info-card-icon">
        <IconComponent size={isMobile ? 18 : 20} strokeWidth={1.6} />
      </div>
      <div className="contact-info-card-content">
        <span className="contact-info-card-label">{item.label}</span>
        <p className="contact-info-card-value">{item.value}</p>
        {item.secondary && (
          <p className="contact-info-card-secondary">{item.secondary}</p>
        )}
        {item.isLink ? (
          <a
            href={item.link}
            target={item.label === "Office Address" ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="contact-info-card-action"
          >
            {item.action} <ArrowRight size={12} />
          </a>
        ) : (
          <button onClick={handleCopy} className="contact-info-card-action">
            {isCopied ? (
              <>
                <Check size={12} /> Copied!
              </>
            ) : (
              <>
                <Copy size={12} /> {item.action}
              </>
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Contact Form Component
// ─────────────────────────────────────────────────────────────────────────────
function ContactFormSection({ isInView }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const { isMobile } = useScreenSize();

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpqeeloy";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        const data = await response.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="contact-form-wrapper"
    >
      <div className="contact-form-header">
        <div className="contact-form-header-icon">
          <Send size={isMobile ? 20 : 22} strokeWidth={1.6} />
        </div>
        <div>
          <h3 className="contact-form-title">Send us a Message</h3>
          <p className="contact-form-subtitle">We'll respond within 24 hours</p>
        </div>
      </div>

      {isSubmitted ? (
        <div className="contact-form-success">
          <div className="contact-form-success-icon">
            <CheckCircle size={isMobile ? 28 : 32} strokeWidth={1.6} />
          </div>
          <h4 className="contact-form-success-title">Message Sent!</h4>
          <p className="contact-form-success-text">
            Thank you. We'll contact you shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="contact-form-group">
            <label htmlFor="name" className="contact-form-label">
              <User size={12} /> Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Smith"
              className="contact-form-input"
            />
          </div>

          <div className="contact-form-group">
            <label htmlFor="email" className="contact-form-label">
              <AtSign size={12} /> Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
              className="contact-form-input"
            />
          </div>

          <div className="contact-form-group">
            <label htmlFor="phone" className="contact-form-label">
              <Phone size={12} /> Phone (Optional)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="01234 567890"
              className="contact-form-input"
            />
          </div>

          <div className="contact-form-group">
            <label htmlFor="message" className="contact-form-label">
              <FileText size={12} /> Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows={isMobile ? 3 : 4}
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Tell us how we can help..."
              className="contact-form-textarea"
            />
          </div>

          {error && (
            <div className="contact-form-error">
              <AlertCircle size={14} />
              <p>{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="contact-form-submit"
          >
            {isSubmitting ? (
              "Sending..."
            ) : (
              <>
                Send Message <Send size={14} />
              </>
            )}
          </button>
        </form>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Trust Badges Component
// ─────────────────────────────────────────────────────────────────────────────
function TrustBadges({ isInView }) {
  const { isMobile } = useScreenSize();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.4,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="contact-trust-badges"
    >
      {TRUST_BADGES.map((badge, idx) => {
        const Icon = badge.icon;
        return (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="contact-trust-badge"
          >
            <div
              className="contact-trust-badge-icon"
              style={{ color: badge.color }}
            >
              <Icon size={isMobile ? 16 : 18} strokeWidth={1.6} />
            </div>
            <span className="contact-trust-badge-label">{badge.label}</span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Contact Page Component
// ─────────────────────────────────────────────────────────────────────────────
export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const { isMobile, isTablet } = useScreenSize();

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const getGridColumns = () => {
    if (isMobile) return "1fr";
    if (isTablet) return "repeat(2, 1fr)";
    return "repeat(2, 1fr)";
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* ── Hero Banner ── */}
        <ContactHero />

        {/* ── Main Content ── */}
        <motion.section
          ref={ref}
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="contact-main"
        >
          {/* Section Header */}
          <div className="contact-section-header">
            <div className="contact-section-badge">
              <span className="contact-section-badge-text">Connect With Us</span>
            </div>
            <h2 className="contact-section-title">
              We'd Love to <span className="contact-section-highlight">Hear From You</span>
            </h2>
            <p className="contact-section-subtitle">
              Whether you're looking for a career opportunity or need staffing solutions,
              our team is ready to assist.
            </p>
          </div>

          {/* ── Trust Badges ── */}
          <TrustBadges isInView={inView} />

          {/* ── Grid: Contact Info + Form ── */}
          <div
            className="contact-grid"
            style={{
              display: "grid",
              gridTemplateColumns: getGridColumns(),
              gap: isMobile ? 20 : 24,
            }}
          >
            {/* Left Column: Contact Info */}
            <div>
              <div className="contact-info-grid">
                {CONTACT_ITEMS.map((item, idx) => (
                  <ContactInfoCard
                    key={idx}
                    item={item}
                    index={idx}
                    isInView={inView}
                  />
                ))}
              </div>

              {/* ── Working Hours ── */}
              <WorkingHours isInView={inView} />

              {/* ── Social Links ── */}
              <SocialLinks />
            </div>

            {/* Right Column: Form + Map */}
            <div>
              {/* Contact Form */}
              <ContactFormSection isInView={inView} />

              {/* ── Map ── */}
              <MapEmbed />
            </div>
          </div>

          {/* ── FAQ Section ── */}
          <FAQSection isInView={inView} />
        </motion.section>

        {/* ── Bottom Decorative Line ── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="contact-bottom-line"
        >
          <div className="contact-bottom-line-bar" />
          <div className="contact-bottom-line-dot" />
          <div className="contact-bottom-line-bar" />
        </motion.div>
      </div>

      {/* ── Styles ── */}
      <style>{`
        /* ── Base ── */
        .contact-page {
          min-height: 100vh;
          background: #f8fafc;
          padding: clamp(80px, 12vh, 120px) clamp(16px, 5vw, 80px);
        }
        .contact-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ── Hero Banner ── */
        .contact-hero {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          margin-bottom: 60px;
          box-shadow: 0 20px 40px -12px rgba(15,29,61,0.15);
        }
        .contact-hero-bg {
          position: relative;
          width: 100%;
          height: 320px;
          overflow: hidden;
        }
        .contact-hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .contact-hero:hover .contact-hero-image {
          transform: scale(1.03);
        }
        .contact-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(15,29,61,0.88) 0%, rgba(15,29,61,0.60) 100%);
        }
        .contact-hero-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px 48px;
          color: #fff;
        }
        .contact-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(196,151,42,0.2);
          border: 1px solid rgba(196,151,42,0.3);
          padding: 6px 16px;
          border-radius: 40px;
          margin-bottom: 16px;
          width: fit-content;
        }
        .contact-hero-badge-text {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #C4972A;
          letter-spacing: 0.5px;
        }
        .contact-hero-title {
          font-family: 'Inter', sans-serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 0 0 8px 0;
          line-height: 1.2;
        }
        .contact-hero-highlight {
          background: linear-gradient(135deg, #C4972A, #f0c060, #e8b84a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .contact-hero-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: clamp(14px, 1.2vw, 16px);
          color: rgba(255,255,255,0.85);
          max-width: 520px;
          line-height: 1.6;
          margin: 0 0 20px 0;
        }
        .contact-hero-stats {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }
        .contact-hero-stat {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
        .contact-hero-stat-number {
          font-family: 'Inter', sans-serif;
          font-size: clamp(20px, 2vw, 26px);
          font-weight: 800;
          color: #C4972A;
        }
        .contact-hero-stat-label {
          font-family: 'Inter', sans-serif;
          font-size: clamp(11px, 0.9vw, 13px);
          color: rgba(255,255,255,0.7);
          font-weight: 500;
        }
        .contact-hero-stat-divider {
          width: 1px;
          height: 28px;
          background: rgba(255,255,255,0.2);
        }

        /* ── Section Header ── */
        .contact-main {
          margin-bottom: 40px;
        }
        .contact-section-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .contact-section-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        .contact-section-badge-text {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #C4972A;
        }
        .contact-section-title {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 800;
          color: #0f1d3d;
          letter-spacing: -0.02em;
          margin: 0 0 12px 0;
        }
        .contact-section-highlight {
          color: #C4972A;
        }
        .contact-section-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: clamp(14px, 1.2vw, 16px);
          color: #64748b;
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* ── Trust Badges ── */
        .contact-trust-badges {
          display: flex;
          justify-content: center;
          gap: 24px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }
        .contact-trust-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #fff;
          padding: 8px 20px;
          border-radius: 40px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }
        .contact-trust-badge-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .contact-trust-badge-label {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #0f1d3d;
        }

        /* ── Contact Info Cards ── */
        .contact-info-grid {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .contact-info-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          background: #fff;
          padding: 18px 20px;
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.06);
          transition: all 0.3s ease;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }
        .contact-info-card.hovered {
          border-color: rgba(196,151,42,0.3);
          box-shadow: 0 8px 24px -12px rgba(15,29,61,0.12);
          transform: translateY(-2px);
        }
        .contact-info-card-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(196,151,42,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C4972A;
          flex-shrink: 0;
        }
        .contact-info-card-content {
          flex: 1;
          min-width: 0;
        }
        .contact-info-card-label {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: #94a3b8;
          display: block;
          margin-bottom: 2px;
        }
        .contact-info-card-value {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #0f1d3d;
          margin: 0 0 2px 0;
        }
        .contact-info-card-secondary {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: #64748b;
          margin: 0 0 6px 0;
        }
        .contact-info-card-action {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 500;
          color: #C4972A;
          background: rgba(196,151,42,0.1);
          padding: 4px 12px;
          border-radius: 20px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .contact-info-card-action:hover {
          background: rgba(196,151,42,0.2);
        }

        /* ── Working Hours ── */
        .contact-hours {
          background: #fff;
          padding: 24px;
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
          margin-top: 16px;
        }
        .contact-hours-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          color: #C4972A;
        }
        .contact-hours-title {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #0f1d3d;
          margin: 0;
        }
        .contact-hours-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .contact-hours-item {
          display: flex;
          justify-content: space-between;
          padding: 6px 0;
          border-bottom: 1px solid rgba(0,0,0,0.04);
        }
        .contact-hours-item:last-child {
          border-bottom: none;
        }
        .contact-hours-day {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #0f1d3d;
        }
        .contact-hours-time {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          color: #64748b;
          font-weight: 500;
        }
        .contact-hours-note {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: #94a3b8;
          margin: 12px 0 0;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .contact-hours-note-icon {
          font-size: 14px;
        }

        /* ── Social Links ── */
        .contact-social {
          background: #fff;
          padding: 24px;
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
          margin-top: 16px;
        }
        .contact-social-title {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #0f1d3d;
          margin: 0 0 4px 0;
        }
        .contact-social-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: #94a3b8;
          margin: 0 0 16px 0;
        }
        .contact-social-links {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .contact-social-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 12px;
          background: rgba(0,0,0,0.04);
          text-decoration: none;
          transition: all 0.3s ease;
          color: #64748b;
          border: 1px solid transparent;
        }
        .contact-social-link:hover {
          background: rgba(0,0,0,0.08);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        .contact-social-label {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 500;
        }
        .contact-social-username {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          color: #94a3b8;
          background: rgba(0,0,0,0.04);
          padding: 2px 8px;
          border-radius: 6px;
        }
        .contact-social-snapchat {
          margin-top: 12px;
          padding: 12px 16px;
          background: rgba(255,252,0,0.08);
          border: 1px solid rgba(255,252,0,0.2);
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .contact-social-snapchat-text {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #0f1d3d;
        }
        .contact-social-snapchat-username {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: #C4972A;
          background: rgba(196,151,42,0.1);
          padding: 4px 12px;
          border-radius: 6px;
        }

        /* ── Contact Form ── */
        .contact-form-wrapper {
          background: #fff;
          padding: 28px 24px;
          border-radius: 20px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }
        .contact-form-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .contact-form-header-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(196,151,42,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C4972A;
        }
        .contact-form-title {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #0f1d3d;
          margin: 0;
        }
        .contact-form-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: #94a3b8;
          margin: 0;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .contact-form-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .contact-form-label {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .contact-form-input,
        .contact-form-textarea {
          width: 100%;
          padding: 10px 14px;
          border-radius: 12px;
          border: 1.5px solid rgba(0,0,0,0.08);
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: #0f1d3d;
          background: #f8fafc;
          transition: all 0.2s ease;
          outline: none;
        }
        .contact-form-input:focus,
        .contact-form-textarea:focus {
          border-color: #C4972A;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(196,151,42,0.08);
        }
        .contact-form-input::placeholder,
        .contact-form-textarea::placeholder {
          color: #94a3b8;
        }
        .contact-form-textarea {
          resize: vertical;
          min-height: 80px;
        }

        .contact-form-error {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 10px;
          padding: 10px 14px;
          color: #ef4444;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
        }

        .contact-form-submit {
          width: 100%;
          padding: 12px 20px;
          border-radius: 40px;
          border: none;
          background: linear-gradient(135deg, #C4972A, #8B6914);
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #0f1d3d;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .contact-form-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(196,151,42,0.3);
        }
        .contact-form-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .contact-form-success {
          text-align: center;
          padding: 30px 20px;
        }
        .contact-form-success-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(16,185,129,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #10b981;
          margin: 0 auto 16px;
        }
        .contact-form-success-title {
          font-family: 'Inter', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #0f1d3d;
          margin: 0 0 8px 0;
        }
        .contact-form-success-text {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: #64748b;
          margin: 0;
        }

        /* ── Map ── */
        .contact-map {
          margin-top: 16px;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
          height: 220px;
        }
        .contact-map-iframe {
          width: 100%;
          height: 100%;
          border: 0;
        }

        /* ── FAQ ── */
        .contact-faq {
          background: #fff;
          padding: 28px 24px;
          border-radius: 20px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
          margin-top: 24px;
        }
        .contact-faq-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          color: #C4972A;
        }
        .contact-faq-title {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #0f1d3d;
          margin: 0;
        }
        .contact-faq-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .contact-faq-item {
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.06);
          overflow: hidden;
          transition: border-color 0.3s ease;
        }
        .contact-faq-item.open {
          border-color: rgba(196,151,42,0.3);
        }
        .contact-faq-question {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 16px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #0f1d3d;
          text-align: left;
          transition: background 0.2s ease;
        }
        .contact-faq-question:hover {
          background: rgba(0,0,0,0.02);
        }
        .contact-faq-question-text {
          flex: 1;
          padding-right: 12px;
        }
        .contact-faq-icon {
          color: #C4972A;
          flex-shrink: 0;
        }
        .contact-faq-answer {
          padding: 0 16px 16px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          color: #64748b;
          line-height: 1.6;
        }
        .contact-faq-answer p {
          margin: 0;
        }

        /* ── Bottom Decorative Line ── */
        .contact-bottom-line {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 40px;
        }
        .contact-bottom-line-bar {
          width: 60px;
          height: 1px;
          background: rgba(196,151,42,0.25);
          border-radius: 999;
        }
        .contact-bottom-line-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #C4972A;
          opacity: 0.5;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .contact-hero-bg { height: 340px; }
          .contact-hero-content { padding: 28px 24px; }
          .contact-hero-stats { gap: 12px; }
          .contact-hero-stat-divider { height: 20px; }
          .contact-trust-badges { gap: 12px; }
          .contact-trust-badge { padding: 6px 14px; }
          .contact-trust-badge-label { font-size: 11px; }
          .contact-info-card { padding: 14px 16px; }
          .contact-form-wrapper { padding: 20px 16px; }
          .contact-grid { gap: 16px; }
          .contact-hours { padding: 18px; }
          .contact-social { padding: 18px; }
          .contact-social-links { gap: 8px; }
          .contact-social-link { padding: 6px 10px; }
          .contact-social-username { display: none; }
          .contact-social-snapchat { 
            flex-direction: column; 
            align-items: flex-start; 
            gap: 6px;
          }
          .contact-map { height: 180px; }
          .contact-faq { padding: 20px 16px; }
          .contact-faq-question { font-size: 13px; padding: 12px 14px; }
        }

        @media (max-width: 480px) {
          .contact-hero-bg { height: 380px; }
          .contact-hero-title { font-size: 1.6rem; }
          .contact-hero-stat-number { font-size: 18px; }
          .contact-hero-stat-label { font-size: 10px; }
          .contact-info-card { flex-direction: column; align-items: center; text-align: center; }
          .contact-info-card-icon { width: 48px; height: 48px; }
          .contact-info-card-content { text-align: center; }
          .contact-info-card-action { justify-content: center; }
          .contact-hours-item { flex-direction: column; align-items: flex-start; gap: 2px; }
          .contact-social-link { padding: 6px 10px; }
          .contact-social-label { font-size: 11px; }
          .contact-map { height: 150px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-hero-image,
          .contact-info-card,
          .contact-form-submit,
          .contact-social-link {
            transition: none !important;
          }
          .contact-hero-image { transform: none !important; }
        }
      `}</style>
    </div>
  );
}