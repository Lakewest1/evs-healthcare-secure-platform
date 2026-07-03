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

import { 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaLinkedin, 
  FaSnapchat, 
  FaTiktok, 
  FaTelegram 
} from "react-icons/fa";

const CONTACT_ITEMS = [
  { icon: MapPin, label: "Office Address", value: "1a John William Street, Preston, PR1 4XE", action: "Get Directions", link: "https://maps.google.com/?q=1a+John+William+Street+Preston+PR1+4XE", isLink: true },
  { icon: Phone, label: "Phone", value: "07466999218", secondary: "07466 999218", action: "Call Now", link: "tel:07466999218", isLink: true },
  { icon: Phone, label: "Out of Hours", value: "07308 863868", action: "Call Now", link: "tel:07308863868", isLink: true },
  { icon: Mail, label: "General Enquiries", value: "admin_1@evshealthcare.co.uk", action: "Copy Email", isLink: false },
  { icon: Mail, label: "Recruitment", value: "hentrintta@evshealthcare.co.uk", action: "Copy Email", isLink: false },
  { icon: Mail, label: "HealthCara", value: "EVS4961@HEALTHCARA@GMAIL.COM", action: "Copy Email", isLink: false },
];

const TRUST_BADGES = [
  { icon: Shield, label: "CQC Compliant", color: "#00A859" },
  { icon: Heart, label: "Free DBS Support", color: "#10b981" },
  { icon: Star, label: "500+ Workers Placed", color: "#C4972A" },
];

const WORKING_HOURS = [
  { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
  { day: "Saturday", hours: "9:00 AM - 2:00 PM" },
  { day: "Sunday", hours: "Closed" },
  { day: "Out of Hours Support", hours: "24/7 Emergency" },
];

const FAQS = [
  { question: "How do I apply for a job at EVS Healthcare?", answer: "You can apply directly through our website by visiting the Jobs page, browsing available positions, and clicking 'Apply Now' on your desired role. You'll be guided through our simple application process." },
  { question: "What documents do I need to provide?", answer: "You'll need to provide your CV, proof of identity (passport or driving license), proof of address, and any relevant qualifications or certifications. Our recruitment team will guide you through the full compliance process." },
  { question: "Do you offer training and development?", answer: "Yes! We provide ongoing training, mandatory updates, and professional development opportunities to all our healthcare professionals. This includes manual handling, safeguarding, and role-specific training." },
  { question: "How quickly can I start working?", answer: "Once your compliance checks are complete and you've been placed in a suitable role, you can start working immediately. Our average placement time is within 48 hours." },
  { question: "What areas do you cover?", answer: "We primarily cover North-West England, including Preston, Lancashire, and surrounding areas. We work with NHS trusts, private hospitals, and care homes across the region." },
];

const SOCIAL_LINKS = [
  { icon: FaSnapchat, label: "Snapchat", url: "https://www.snapchat.com/add/evsrecruitment?share_id=K7sZjmh406w&locale=en-GB", color: "#FFFC00", username: "@evsrecruitment" },
  { icon: FaInstagram, label: "Instagram", url: "https://www.instagram.com/evsrecruitment?utm_source=qr&igsh=eWJmZHUyZ3B6cms2", color: "#E4405F", username: "@evsrecruitment" },
  { icon: FaTiktok, label: "TikTok", url: "https://www.tiktok.com/@evs.recruitment?_r=1&_t=ZN-97HokvF2OAA", color: "#000000", username: "@evs.recruitment" },
  { icon: FaLinkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/evs-healthcare-solutions-limited-b9100121a?utm_source=share_via&utm_content=profile&utm_medium=member_android", color: "#0077B5", username: "EVS Healthcare" },
  { icon: FaTwitter, label: "X (Twitter)", url: "https://x.com/EvsSoulutions", color: "#1DA1F2", username: "@EvsSoulutions" },
  { icon: FaTelegram, label: "Telegram", url: "https://t.me/+447466999218", color: "#26A5E4", username: "+447466999218" },
];

const FORMSPREE_URL = import.meta.env.FORMSPREE_CONTACT_URL;

const FIELD_LIMITS = { name: 100, email: 150, phone: 20, message: 1000 };

const sanitize = (v, max) => (typeof v !== "string" ? "" : v.replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, max));
const isValidEmail = (v) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v.trim());
const isValidPhone = (v) => !v.trim() || /^[+()0-9\s-]{7,20}$/.test(v.trim());

// ── Single shared viewport hook (replaces the original useScreenSize that
//    created a new resize listener for every component instance) ──────────
function useViewport() {
  const [w, setW] = useState(() => (typeof window === "undefined" ? 1280 : window.innerWidth));
  useEffect(() => {
    let raf = null;
    const onResize = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { setW(window.innerWidth); raf = null; });
    };
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return { isMobile: w < 768, isTablet: w >= 768 && w < 1024, isDesktop: w >= 1024 };
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero Banner
// ─────────────────────────────────────────────────────────────────────────────
function ContactHero() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="ch-hero"
    >
      <div className="ch-hero-bg">
        <img
          src="https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781738736/main-sample.jpg"
          alt="EVS Healthcare office — contact us"
          className="ch-hero-img"
          loading="eager"
          decoding="async"
        />
        <div className="ch-hero-overlay" aria-hidden="true" />
      </div>

      <div className="ch-hero-content">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="ch-hero-badge">
          <span>📞 24/7 Support</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="ch-hero-title">
          Get in <span className="ch-gold">Touch</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="ch-hero-sub">
          We're here to help. Reach out to our team for any inquiries, support, or career opportunities.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }} className="ch-hero-stats">
          <div className="ch-stat"><span className="ch-stat-n">24/7</span><span className="ch-stat-l">Support Available</span></div>
          <span className="ch-stat-div" aria-hidden="true" />
          <div className="ch-stat"><span className="ch-stat-n">&lt;24hr</span><span className="ch-stat-l">Response Time</span></div>
          <span className="ch-stat-div" aria-hidden="true" />
          <div className="ch-stat"><span className="ch-stat-n">100%</span><span className="ch-stat-l">Satisfaction Rate</span></div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Trust Badges
// ─────────────────────────────────────────────────────────────────────────────
function TrustBadges({ isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2, staggerChildren: 0.1 }}
      className="ch-trust"
    >
      {TRUST_BADGES.map((b, i) => {
        const Icon = b.icon;
        return (
          <div key={i} className="ch-trust-badge">
            <Icon size={16} strokeWidth={1.6} style={{ color: b.color }} aria-hidden="true" />
            <span>{b.label}</span>
          </div>
        );
      })}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Contact Info Card
// ─────────────────────────────────────────────────────────────────────────────
function ContactInfoCard({ item, index, isInView }) {
  const [copied, setCopied] = useState(false);
  const Icon = item.icon;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. non-HTTPS dev env) — silently ignore.
      // A production deployment over HTTPS will always have this available.
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: Math.min(index * 0.07, 0.35), ease: [0.16, 1, 0.3, 1] }}
      className="ch-card"
    >
      <div className="ch-card-icon"><Icon size={20} strokeWidth={1.6} aria-hidden="true" /></div>
      <div className="ch-card-body">
        <span className="ch-card-label">{item.label}</span>
        <p className="ch-card-value">{item.value}</p>
        {item.secondary && <p className="ch-card-secondary">{item.secondary}</p>}
        {item.isLink ? (
          <a
            href={item.link}
            target={item.label === "Office Address" ? "_blank" : "_self"}
            rel="noopener noreferrer nofollow"
            className="ch-card-action"
          >
            {item.action} <ArrowRight size={11} aria-hidden="true" />
          </a>
        ) : (
          <button type="button" onClick={handleCopy} className="ch-card-action">
            {copied ? <><Check size={11} aria-hidden="true" /> Copied!</> : <><Copy size={11} aria-hidden="true" /> {item.action}</>}
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Working Hours
// ─────────────────────────────────────────────────────────────────────────────
function WorkingHours({ isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="ch-hours"
    >
      <div className="ch-hours-hd">
        <Clock size={20} strokeWidth={1.6} aria-hidden="true" />
        <h3>Working Hours</h3>
      </div>
      <div className="ch-hours-grid">
        {WORKING_HOURS.map((row, i) => (
          <div key={i} className="ch-hours-row">
            <span className="ch-hours-day">{row.day}</span>
            <span className="ch-hours-time">{row.hours}</span>
          </div>
        ))}
      </div>
      <p className="ch-hours-note">🕐 Out of hours support available for urgent staffing needs</p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Social Links
// ─────────────────────────────────────────────────────────────────────────────
function SocialLinks() {
  const { isMobile } = useViewport();
  return (
    <div className="ch-social">
      <h3 className="ch-social-title">Connect With Us</h3>
      <p className="ch-social-sub">Follow us on social media for updates, job alerts, and more</p>
      <div className="ch-social-grid">
        {SOCIAL_LINKS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className="ch-social-link"
              style={{ "--social-color": s.color }}
              aria-label={`Follow us on ${s.label}: ${s.username}`}
            >
              <Icon size={isMobile ? 18 : 20} aria-hidden="true" style={{ color: s.color }} />
              <span className="ch-social-name">{s.label}</span>
              <span className="ch-social-handle">{s.username}</span>
            </motion.a>
          );
        })}
      </div>
      <div className="ch-social-snap">
        <span className="ch-social-snap-text">📸 Add us on Snapchat!</span>
        <span className="ch-social-snap-user">Username: evsrecruitment</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Map
// ─────────────────────────────────────────────────────────────────────────────
function MapEmbed() {
  return (
    <div className="ch-map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2352.234567891011!2d-2.703844!3d53.759123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487b6b2e6a6b6b6b%3A0x6b6b6b6b6b6b6b6b!2s1a%20John%20William%20Street%2C%20Preston!5e0!3m2!1sen!2suk!4v1700000000000"
        className="ch-map-frame"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="EVS Healthcare Office Location — 1a John William Street, Preston"
        aria-label="Google Maps showing EVS Healthcare office location"
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────────────────────
function FAQSection({ isInView }) {
  const [open, setOpen] = useState(null);
  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="ch-faq"
    >
      <div className="ch-faq-hd">
        <HelpCircle size={20} strokeWidth={1.6} aria-hidden="true" />
        <h3>Frequently Asked Questions</h3>
      </div>
      <div className="ch-faq-list">
        {FAQS.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className={`ch-faq-item${isOpen ? " open" : ""}`}>
              <button
                type="button"
                onClick={() => toggle(i)}
                className="ch-faq-q"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
                id={`faq-btn-${i}`}
              >
                <span>{faq.question}</span>
                {isOpen
                  ? <ChevronUp size={17} className="ch-faq-chevron" aria-hidden="true" />
                  : <ChevronDown size={17} className="ch-faq-chevron" aria-hidden="true" />}
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="ch-faq-a"
                    style={{ overflow: "hidden" }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Contact Form
// ─────────────────────────────────────────────────────────────────────────────
function ContactForm({ isInView }) {
  const { isMobile } = useViewport();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [hp, setHp] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const lastSubmit = useRef(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const limit = FIELD_LIMITS[name];
    setForm((prev) => ({ ...prev, [name]: limit ? value.slice(0, limit) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hp) return; // honeypot triggered

    // client-side rate limit
    if (Date.now() - lastSubmit.current < 15000) {
      setError("Please wait a moment before submitting again.");
      return;
    }

    // validation
    if (!form.name.trim()) { setError("Please enter your full name."); return; }
    if (!isValidEmail(form.email)) { setError("Please enter a valid email address."); return; }
    if (!isValidPhone(form.phone)) { setError("Please enter a valid phone number."); return; }
    if (!form.message.trim()) { setError("Please enter a message."); return; }

    setSubmitting(true);
    setError(null);

    const payload = {
      name:    sanitize(form.name,    FIELD_LIMITS.name),
      email:   sanitize(form.email,   FIELD_LIMITS.email),
      phone:   sanitize(form.phone,   FIELD_LIMITS.phone),
      message: sanitize(form.message, FIELD_LIMITS.message),
    };

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        lastSubmit.current = Date.now();
        setSubmitted(true);
        setForm({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setSubmitted(false), 6000);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="ch-form-wrap"
    >
      <div className="ch-form-hd">
        <div className="ch-form-hd-icon"><Send size={20} strokeWidth={1.6} aria-hidden="true" /></div>
        <div>
          <h3 className="ch-form-title">Send us a Message</h3>
          <p className="ch-form-sub">We'll respond within 24 hours</p>
        </div>
      </div>

      {submitted ? (
        <div className="ch-form-success">
          <div className="ch-form-success-icon"><CheckCircle size={32} strokeWidth={1.5} aria-hidden="true" /></div>
          <h4>Message Sent!</h4>
          <p>Thank you. We'll be in touch shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="ch-form" noValidate>
          {/* Honeypot — visually hidden, bots fill it, humans don't see it */}
          <div className="ch-hp" aria-hidden="true">
            <label htmlFor="ch-website">Website</label>
            <input id="ch-website" type="text" name="website" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
          </div>

          <div className="ch-form-row">
            <label htmlFor="cf-name" className="ch-form-label"><User size={12} aria-hidden="true" /> Full Name *</label>
            <input id="cf-name" type="text" name="name" value={form.name} onChange={handleChange} required placeholder="John Smith" className="ch-form-input" autoComplete="name" maxLength={FIELD_LIMITS.name} />
          </div>

          <div className="ch-form-row">
            <label htmlFor="cf-email" className="ch-form-label"><AtSign size={12} aria-hidden="true" /> Email Address *</label>
            <input id="cf-email" type="email" name="email" value={form.email} onChange={handleChange} required placeholder="john@example.com" className="ch-form-input" autoComplete="email" maxLength={FIELD_LIMITS.email} />
          </div>

          <div className="ch-form-row">
            <label htmlFor="cf-phone" className="ch-form-label"><Phone size={12} aria-hidden="true" /> Phone <span className="ch-form-opt">(optional)</span></label>
            <input id="cf-phone" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="01234 567890" className="ch-form-input" autoComplete="tel" maxLength={FIELD_LIMITS.phone} />
          </div>

          <div className="ch-form-row">
            <label htmlFor="cf-msg" className="ch-form-label"><FileText size={12} aria-hidden="true" /> Message *</label>
            <textarea id="cf-msg" name="message" rows={isMobile ? 3 : 5} value={form.message} onChange={handleChange} required placeholder="Tell us how we can help..." className="ch-form-textarea" maxLength={FIELD_LIMITS.message} />
            <span className="ch-form-count">{form.message.length}/{FIELD_LIMITS.message}</span>
          </div>

          {error && (
            <div className="ch-form-error" role="alert">
              <AlertCircle size={14} aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          <button type="submit" disabled={submitting} className="ch-form-btn">
            {submitting ? (
              <><span className="ch-spin" aria-hidden="true" /> Sending…</>
            ) : (
              <>Send Message <Send size={14} aria-hidden="true" /></>
            )}
          </button>
        </form>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Contact Page
// ─────────────────────────────────────────────────────────────────────────────
export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0 });
  const { isMobile, isTablet } = useViewport();

  return (
    <div className="ch-page">
      <div className="ch-container">

        <ContactHero />

        <motion.section
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="ch-main"
        >
          {/* Section header */}
          <div className="ch-section-hd">
            <span className="ch-section-eyebrow">Connect With Us</span>
            <h2 className="ch-section-title">
              We'd Love to <span className="ch-gold">Hear From You</span>
            </h2>
            <p className="ch-section-sub">
              Whether you're looking for a career opportunity or need staffing solutions,
              our team is ready to assist.
            </p>
          </div>

          <TrustBadges isInView={inView} />

          {/* Two-column grid */}
          <div className={`ch-grid${isMobile ? " ch-grid-1col" : ""}`}>

            {/* Left column */}
            <div className="ch-col">
              <div className={`ch-info-grid${isMobile ? " ch-info-grid-2x2" : ""}`}>
                {CONTACT_ITEMS.map((item, i) => (
                  <ContactInfoCard key={i} item={item} index={i} isInView={inView} />
                ))}
              </div>
              <WorkingHours isInView={inView} />
              <SocialLinks />
            </div>

            {/* Right column */}
            <div className="ch-col">
              <ContactForm isInView={inView} />
              <MapEmbed />
            </div>
          </div>

          <FAQSection isInView={inView} />
        </motion.section>

        {/* Bottom ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="ch-ornament"
          aria-hidden="true"
        >
          <span className="ch-ornament-bar" />
          <span className="ch-ornament-dot" />
          <span className="ch-ornament-bar" />
        </motion.div>
      </div>

      <style>{`
/* ── Reset helpers ──────────────────────────────────────────────────────── */
.ch-page *, .ch-page *::before, .ch-page *::after { box-sizing: border-box; }
.ch-page button, .ch-page a { font-family: 'Inter', sans-serif; }

/* ── Page shell ─────────────────────────────────────────────────────────── */
.ch-page {
  min-height: 100vh;
  background: #f8fafc;
  padding: clamp(80px,12vh,120px) clamp(16px,5vw,80px) clamp(48px,8vh,80px);
}
.ch-container { max-width: 1200px; margin: 0 auto; }

/* ── Gold utility ────────────────────────────────────────────────────────── */
.ch-gold {
  background: linear-gradient(135deg, #C4972A, #f0c060, #e8b84a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Hero ────────────────────────────────────────────────────────────────── */
.ch-hero {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 56px;
  box-shadow: 0 20px 48px -12px rgba(15,29,61,0.18);
}
.ch-hero-bg {
  position: relative;
  width: 100%;
  height: clamp(280px,38vh,380px);
  overflow: hidden;
}
.ch-hero-img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
  display: block;
}
.ch-hero:hover .ch-hero-img { transform: scale(1.04); }
.ch-hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(140deg, rgba(15,29,61,0.92) 0%, rgba(15,29,61,0.60) 100%);
}
.ch-hero-content {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; justify-content: center;
  padding: clamp(24px,5vw,52px) clamp(24px,6vw,56px);
  color: #fff;
}
.ch-hero-badge {
  display: inline-flex; align-items: center;
  background: rgba(196,151,42,0.18);
  border: 1px solid rgba(196,151,42,0.3);
  padding: 6px 16px; border-radius: 40px;
  margin-bottom: 16px; width: fit-content;
  font-size: 12px; font-weight: 600; color: #C4972A; letter-spacing: 0.5px;
}
.ch-hero-title {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(2rem,4vw,3.2rem);
  font-weight: 800; letter-spacing: -0.02em;
  margin: 0 0 10px; line-height: 1.2; color: #fff;
}
.ch-hero-sub {
  font-size: clamp(13px,1.2vw,16px);
  color: rgba(255,255,255,0.82); max-width: 520px;
  line-height: 1.65; margin: 0 0 22px;
}
.ch-hero-stats {
  display: flex; align-items: center; gap: 20px; flex-wrap: wrap;
}
.ch-stat { display: flex; align-items: baseline; gap: 6px; }
.ch-stat-n {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(20px,2vw,26px);
  font-weight: 800; color: #C4972A;
}
.ch-stat-l {
  font-size: clamp(10px,0.85vw,13px);
  color: rgba(255,255,255,0.68); font-weight: 500;
}
.ch-stat-div {
  display: block; width: 1px; height: 28px;
  background: rgba(255,255,255,0.2);
}

/* ── Main section ────────────────────────────────────────────────────────── */
.ch-main { margin-bottom: 40px; }
.ch-section-hd { text-align: center; margin-bottom: 36px; }
.ch-section-eyebrow {
  display: inline-block;
  font-size: 10px; font-weight: 700;
  letter-spacing: 4px; text-transform: uppercase;
  color: #C4972A; margin-bottom: 12px;
}
.ch-section-title {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(1.75rem,3vw,2.6rem);
  font-weight: 800; color: #0f1d3d;
  letter-spacing: -0.02em; margin: 0 0 12px;
}
.ch-section-sub {
  font-size: clamp(14px,1.2vw,16px);
  color: #64748b; max-width: 520px;
  margin: 0 auto; line-height: 1.65;
}

/* ── Trust badges ────────────────────────────────────────────────────────── */
.ch-trust {
  display: flex; justify-content: center;
  gap: 16px; flex-wrap: wrap; margin-bottom: 36px;
}
.ch-trust-badge {
  display: flex; align-items: center; gap: 8px;
  background: #fff; padding: 8px 20px;
  border-radius: 40px;
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  font-size: 13px; font-weight: 500; color: #0f1d3d;
}

/* ── Two-column grid ─────────────────────────────────────────────────────── */
.ch-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;
}
.ch-grid-1col { grid-template-columns: 1fr; }
.ch-col { display: flex; flex-direction: column; gap: 16px; }

/* ── Info cards ──────────────────────────────────────────────────────────── */
.ch-info-grid { display: flex; flex-direction: column; gap: 12px; }

/* 2x2 grid on mobile — reduces scrolling */
.ch-info-grid-2x2 {
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  gap: 12px !important;
}

.ch-card {
  display: flex; align-items: flex-start; gap: 16px;
  background: #fff; padding: 18px 20px;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  transition: box-shadow 0.25s ease, border-color 0.25s ease, transform 0.2s ease;
}
.ch-card:hover {
  border-color: rgba(196,151,42,0.3);
  box-shadow: 0 10px 28px -12px rgba(15,29,61,0.14);
  transform: translateY(-2px);
}
.ch-card-icon {
  width: 44px; height: 44px; border-radius: 12px;
  background: rgba(196,151,42,0.1);
  display: flex; align-items: center; justify-content: center;
  color: #C4972A; flex-shrink: 0;
}
.ch-card-body { flex: 1; min-width: 0; }
.ch-card-label {
  display: block; font-size: 10.5px; font-weight: 700;
  letter-spacing: 0.6px; text-transform: uppercase;
  color: #94a3b8; margin-bottom: 3px;
}
.ch-card-value {
  font-size: 14px; font-weight: 500; color: #0f1d3d;
  margin: 0 0 2px; overflow-wrap: break-word; word-break: break-all;
}
.ch-card-secondary { font-size: 12px; color: #64748b; margin: 0 0 6px; }
.ch-card-action {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 11px; font-weight: 600; color: #C4972A;
  background: rgba(196,151,42,0.09); padding: 4px 12px;
  border-radius: 20px; border: none; cursor: pointer;
  text-decoration: none; transition: background 0.15s ease;
}
.ch-card-action:hover { background: rgba(196,151,42,0.18); }
.ch-card-action:focus-visible { outline: 2px solid #C4972A; outline-offset: 2px; }

/* ── Working Hours ───────────────────────────────────────────────────────── */
.ch-hours {
  background: #fff; padding: 22px 24px;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.ch-hours-hd {
  display: flex; align-items: center; gap: 10px;
  color: #C4972A; margin-bottom: 16px;
}
.ch-hours-hd h3 {
  font-family: 'Manrope', sans-serif;
  font-size: 15px; font-weight: 700;
  color: #0f1d3d; margin: 0;
}
.ch-hours-grid { display: flex; flex-direction: column; gap: 2px; }
.ch-hours-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 7px 0;
  border-bottom: 1px solid rgba(0,0,0,0.04);
}
.ch-hours-row:last-child { border-bottom: none; }
.ch-hours-day { font-size: 13px; font-weight: 500; color: #0f1d3d; }
.ch-hours-time { font-size: 13px; font-weight: 500; color: #64748b; }
.ch-hours-note { font-size: 12px; color: #94a3b8; margin: 12px 0 0; }

/* ── Social Links ────────────────────────────────────────────────────────── */
.ch-social {
  background: #fff; padding: 22px 24px;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.ch-social-title { font-family: 'Manrope', sans-serif; font-size: 15px; font-weight: 700; color: #0f1d3d; margin: 0 0 4px; }
.ch-social-sub { font-size: 12px; color: #94a3b8; margin: 0 0 16px; }
.ch-social-grid { display: flex; flex-wrap: wrap; gap: 8px; }
.ch-social-link {
  display: flex; align-items: center; gap: 7px;
  padding: 8px 13px; border-radius: 12px;
  background: rgba(0,0,0,0.035);
  border: 1px solid rgba(0,0,0,0.06);
  text-decoration: none;
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}
.ch-social-link:hover {
  background: rgba(0,0,0,0.07);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.ch-social-link:focus-visible { outline: 2px solid #C4972A; outline-offset: 2px; }
.ch-social-name { font-size: 12px; font-weight: 600; color: #334155; }
.ch-social-handle {
  font-size: 10px; color: #94a3b8;
  background: rgba(0,0,0,0.04);
  padding: 2px 7px; border-radius: 6px;
}
.ch-social-snap {
  margin-top: 12px; padding: 12px 16px;
  background: rgba(255,252,0,0.07);
  border: 1px solid rgba(255,252,0,0.25);
  border-radius: 10px;
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
}
.ch-social-snap-text { font-size: 13px; font-weight: 600; color: #0f1d3d; }
.ch-social-snap-user {
  font-size: 12px; font-weight: 500; color: #C4972A;
  background: rgba(196,151,42,0.1); padding: 4px 12px; border-radius: 6px;
}

/* ── Contact Form ────────────────────────────────────────────────────────── */
.ch-form-wrap {
  background: #fff; padding: clamp(20px,3vw,28px) clamp(18px,3vw,26px);
  border-radius: 20px;
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.ch-form-hd {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 20px; padding-bottom: 14px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.ch-form-hd-icon {
  width: 44px; height: 44px; border-radius: 12px;
  background: rgba(196,151,42,0.1);
  display: flex; align-items: center; justify-content: center;
  color: #C4972A; flex-shrink: 0;
}
.ch-form-title { font-family: 'Manrope', sans-serif; font-size: 15px; font-weight: 700; color: #0f1d3d; margin: 0 0 2px; }
.ch-form-sub { font-size: 12px; color: #94a3b8; margin: 0; }

/* Honeypot */
.ch-hp {
  position: absolute; width: 1px; height: 1px;
  overflow: hidden; clip: rect(0 0 0 0);
  white-space: nowrap; left: -9999px;
}

.ch-form { display: flex; flex-direction: column; gap: 14px; }
.ch-form-row { display: flex; flex-direction: column; gap: 5px; position: relative; }
.ch-form-label {
  display: flex; align-items: center; gap: 5px;
  font-size: 12.5px; font-weight: 600; color: #334155;
}
.ch-form-opt { font-weight: 400; color: #94a3b8; font-size: 11px; }
.ch-form-input, .ch-form-textarea {
  width: 100%; padding: 11px 15px;
  border-radius: 11px;
  border: 1.5px solid rgba(0,0,0,0.08);
  font-family: 'Inter', sans-serif;
  font-size: 14px; color: #0f1d3d;
  background: #f8fafc;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
  outline: none;
}
.ch-form-input:focus-visible, .ch-form-textarea:focus-visible {
  border-color: #C4972A; background: #fff;
  box-shadow: 0 0 0 4px rgba(196,151,42,0.1);
}
.ch-form-input::placeholder, .ch-form-textarea::placeholder { color: #94a3b8; }
.ch-form-textarea { resize: vertical; min-height: 90px; }
.ch-form-count {
  text-align: right; font-size: 11px; color: #94a3b8;
  position: absolute; bottom: -18px; right: 0;
}

.ch-form-error {
  display: flex; align-items: center; gap: 8px;
  background: rgba(239,68,68,0.07);
  border: 1px solid rgba(239,68,68,0.2);
  border-radius: 10px; padding: 10px 14px;
  color: #dc2626; font-size: 13px;
}
.ch-form-btn {
  width: 100%; padding: 13px 20px;
  border-radius: 40px; border: none;
  background: linear-gradient(135deg, #C4972A, #8B6914);
  font-size: 14px; font-weight: 700; color: #0f1d3d;
  cursor: pointer; display: flex; align-items: center;
  justify-content: center; gap: 8px;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 4px 14px rgba(196,151,42,0.28);
}
.ch-form-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(196,151,42,0.36);
}
.ch-form-btn:focus-visible { outline: 2px solid #0f1d3d; outline-offset: 3px; }
.ch-form-btn:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }

.ch-spin {
  display: inline-block; width: 14px; height: 14px;
  border: 2px solid rgba(15,29,61,0.3);
  border-top-color: #0f1d3d;
  border-radius: 50%;
  animation: ch-spin 0.75s linear infinite;
}
@keyframes ch-spin { to { transform: rotate(360deg); } }

.ch-form-success {
  text-align: center; padding: 32px 20px;
}
.ch-form-success-icon {
  width: 68px; height: 68px; border-radius: 50%;
  background: rgba(16,185,129,0.1);
  display: flex; align-items: center; justify-content: center;
  color: #10b981; margin: 0 auto 16px;
}
.ch-form-success h4 { font-family: 'Manrope', sans-serif; font-size: 18px; font-weight: 700; color: #0f1d3d; margin: 0 0 8px; }
.ch-form-success p { font-size: 14px; color: #64748b; margin: 0; }

/* ── Map ─────────────────────────────────────────────────────────────────── */
.ch-map {
  border-radius: 16px; overflow: hidden;
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  height: 230px;
}
.ch-map-frame { width: 100%; height: 100%; border: 0; display: block; }

/* ── FAQ ─────────────────────────────────────────────────────────────────── */
.ch-faq {
  background: #fff; padding: clamp(20px,3vw,28px) clamp(18px,3vw,26px);
  border-radius: 20px; margin-top: 24px;
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.ch-faq-hd {
  display: flex; align-items: center; gap: 10px;
  color: #C4972A; margin-bottom: 18px;
}
.ch-faq-hd h3 { font-family: 'Manrope', sans-serif; font-size: 16px; font-weight: 700; color: #0f1d3d; margin: 0; }
.ch-faq-list { display: flex; flex-direction: column; gap: 6px; }
.ch-faq-item {
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.07);
  overflow: hidden;
  transition: border-color 0.2s ease;
}
.ch-faq-item.open { border-color: rgba(196,151,42,0.35); }
.ch-faq-q {
  width: 100%; display: flex;
  justify-content: space-between; align-items: center;
  padding: 14px 16px; background: none; border: none;
  cursor: pointer; font-size: 13.5px; font-weight: 600;
  color: #0f1d3d; text-align: left; gap: 12px;
  transition: background 0.15s ease;
}
.ch-faq-q:hover { background: rgba(0,0,0,0.018); }
.ch-faq-q:focus-visible { outline: 2px solid #C4972A; outline-offset: -2px; border-radius: 11px; }
.ch-faq-chevron { color: #C4972A; flex-shrink: 0; }
.ch-faq-a {
  padding: 0 16px 14px;
  font-size: 13px; color: #475569; line-height: 1.65;
}
.ch-faq-a p { margin: 0; }

/* ── Ornament ────────────────────────────────────────────────────────────── */
.ch-ornament {
  display: flex; align-items: center;
  justify-content: center; gap: 12px; margin-top: 40px;
}
.ch-ornament-bar {
  display: block; width: 60px; height: 1px;
  background: rgba(196,151,42,0.25); border-radius: 999px;
}
.ch-ornament-dot {
  display: block; width: 6px; height: 6px;
  border-radius: 50%; background: #C4972A; opacity: 0.5;
}

/* ── Responsive ──────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .ch-hero-bg { height: clamp(300px,45vh,380px); }
  .ch-hero-content { padding: 24px 22px; }
  .ch-hero-stats { gap: 12px; }
  .ch-stat-div { height: 20px; }
  .ch-trust { gap: 10px; }
  .ch-trust-badge { padding: 6px 14px; font-size: 12px; }
  .ch-card { padding: 14px 16px; }
  .ch-social-handle { display: none; }
  .ch-social-snap { flex-direction: column; align-items: flex-start; gap: 6px; }
  .ch-map { height: 190px; }
  .ch-faq-q { font-size: 13px; padding: 12px 14px; }
}

@media (max-width: 480px) {
  .ch-hero-bg { height: clamp(320px,52vh,420px); }
  .ch-hero-title { font-size: 1.55rem; }
  .ch-stat-n { font-size: 18px; }
  .ch-card { flex-direction: column; align-items: center; text-align: center; }
  .ch-card-body { text-align: center; }
  .ch-card-action { display: inline-flex; justify-content: center; }
  .ch-hours-row { flex-direction: column; gap: 2px; }
  .ch-map { height: 160px; }
  .ch-form-count { position: static; text-align: right; }
  
  /* 2x2 grid cards — more compact on very small screens */
  .ch-info-grid-2x2 {
    gap: 8px !important;
  }
  .ch-info-grid-2x2 .ch-card {
    padding: 12px 10px !important;
  }
  .ch-info-grid-2x2 .ch-card-icon {
    width: 36px !important;
    height: 36px !important;
  }
  .ch-info-grid-2x2 .ch-card-icon svg {
    width: 16px !important;
    height: 16px !important;
  }
  .ch-info-grid-2x2 .ch-card-label {
    font-size: 9px !important;
  }
  .ch-info-grid-2x2 .ch-card-value {
    font-size: 11px !important;
  }
  .ch-info-grid-2x2 .ch-card-action {
    font-size: 10px !important;
    padding: 3px 10px !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ch-hero-img,
  .ch-card,
  .ch-form-btn,
  .ch-social-link { transition: none !important; }
  .ch-hero-img { transform: none !important; }
  .ch-spin { animation-duration: 2s; }
}
      `}</style>
    </div>
  );
}