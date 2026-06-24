import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EVSLogo from "../EVSLogo";
// Import proper social media icons from react-icons
import { 
  FaLinkedin, 
  FaInstagram, 
  FaSnapchat, 
  FaTiktok, 
  FaTwitter, 
  FaTelegram 
} from "react-icons/fa";
import {
  Phone,
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  ArrowUp,
  ChevronRight,
  Shield,
  Heart
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Modern 2026 Footer — Premium Design with Glass Morphism
// Features: Animated borders, social links, newsletter (Formspree), back to top
// UPDATED: React Router Links for all internal navigation
// FIXED: Mobile responsive display issues
// ─────────────────────────────────────────────────────────────────────────────

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());
  const [isMobile, setIsMobile] = useState(false);

  // Formspree endpoint - Replace with your own endpoint ID
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqapvgwk";

  // Check mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Check scroll position to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubscribed(true);
        setEmail("");
        setTimeout(() => setIsSubscribed(false), 5000);
      } else {
        const data = await response.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: "spring", stiffness: 100, damping: 15 },
    },
  };

  // ── Social Media Links ──
  const socialLinks = [
    { 
      name: "LinkedIn", 
      icon: FaLinkedin, 
      url: "https://www.linkedin.com/in/evs-healthcare-solutions-limited-b9100121a?utm_source=share_via&utm_content=profile&utm_medium=member_android", 
      color: "#0077B5"
    },
    { 
      name: "Instagram", 
      icon: FaInstagram, 
      url: "https://www.instagram.com/evsrecruitment?utm_source=qr&igsh=eWJmZHUyZ3B6cms2", 
      color: "#E4405F"
    },
    { 
      name: "Snapchat", 
      icon: FaSnapchat, 
      url: "https://www.snapchat.com/add/evsrecruitment?share_id=K7sZjmh406w&locale=en-GB", 
      color: "#FFFC00"
    },
    { 
      name: "TikTok", 
      icon: FaTiktok, 
      url: "https://www.tiktok.com/@evs.recruitment?_r=1&_t=ZN-97HokvF2OAA", 
      color: "#000000"
    },
    { 
      name: "X (Twitter)", 
      icon: FaTwitter, 
      url: "https://x.com/EvsSoulutions", 
      color: "#1DA1F2"
    },
    { 
      name: "Telegram", 
      icon: FaTelegram, 
      url: "https://t.me/+447466999218", 
      color: "#26A5E4"
    },
  ];

  // ── UPDATED: Quick Links with React Router paths ──
  const quickLinks = [
    { name: "About Us", url: "/about" },
    { name: "Featured Jobs", url: "/jobs" },
    { name: "Contact Us", url: "/contact" },
    { name: "FAQ", url: "/faq" },
    { name: "Testimonials", url: "/testimonials" },
  ];

  // ── UPDATED: Legal Links with React Router paths ──
  const legalLinks = [
    { name: "Privacy Policy", url: "/privacy-policy" },
    { name: "GDPR Compliance", url: "/gdpr-compliance" },
    { name: "Terms of Service", url: "/terms-of-service" },
    { name: "Cookie Policy", url: "/cookie-policy" },
    { name: "Accessibility", url: "/accessibility" },
  ];

  // ── UPDATED: Bottom bar quick legal links ──
  const bottomBarLinks = [
    { name: "Privacy", url: "/privacy-policy" },
    { name: "GDPR", url: "/gdpr-compliance" },
    { name: "Terms", url: "/terms-of-service" },
    { name: "Cookies", url: "/cookie-policy" },
  ];

  // Floating particles for background
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <footer ref={ref} style={{ position: "relative", background: "#0a0f1a", overflow: "hidden" }}>
      {/* Floating Background Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          animate={{
            y: [0, -60, 0],
            x: [0, Math.sin(particle.id) * 30, 0],
            opacity: [0, 0.2, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(196,151,42,${0.4}), transparent)`,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}

      {/* Animated Gradient Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 0%, rgba(196,151,42,0.06), transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Top Animated Border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, #C4972A, #f0c060, #e8b84a, #C4972A, transparent)",
          transformOrigin: "left",
        }}
      />

      {/* Bottom Animated Border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(196,151,42,0.3), rgba(196,151,42,0.1), transparent)",
          transformOrigin: "right",
        }}
      />

      {/* Main Footer Content */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile 
            ? "40px 20px 30px" 
            : "clamp(50px, 10vh, 70px) clamp(20px, 5vw, 80px) clamp(40px, 6vh, 60px)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile 
              ? "1fr" 
              : "repeat(auto-fit, minmax(260px, 1fr))",
            gap: isMobile ? "32px" : "clamp(40px, 6vw, 60px)",
            marginBottom: isMobile ? "32px" : "clamp(40px, 6vh, 60px)",
          }}
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                style={{ cursor: "pointer" }}
              >
                <EVSLogo size={isMobile ? 38 : 44} />
              </motion.div>
              <div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: isMobile ? 13 : 15,
                    color: "#fff",
                    letterSpacing: "1.5px",
                  }}
                >
                  EVS HEALTHCARE LTD
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontStyle: "italic",
                    fontSize: isMobile ? 10 : 11,
                    color: "#C4972A",
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                  }}
                >
                  We care in time.
                </div>
              </div>
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobile ? 12 : 13,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.7,
                marginBottom: 24,
                maxWidth: 280,
              }}
            >
              Providing quality healthcare staffing solutions across North-West England.
              Your trusted partner in care excellence.
            </p>
            
            {/* Social Links */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.name}`}
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    style={{
                      width: isMobile ? 34 : 38,
                      height: isMobile ? 34 : 38,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      color: "rgba(255,255,255,0.6)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${social.color}20`;
                      e.currentTarget.style.borderColor = `${social.color}60`;
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.color = social.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                    }}
                  >
                    <IconComponent size={isMobile ? 16 : 18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* ── UPDATED: Quick Links with React Router Link ── */}
          <motion.div variants={itemVariants}>
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobile ? 14 : 15,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 24,
                letterSpacing: "0.5px",
                position: "relative",
                display: "inline-block",
              }}
            >
              Quick Links
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{
                  position: "absolute",
                  bottom: -8,
                  left: 0,
                  height: 2,
                  background: "linear-gradient(90deg, #C4972A, #f0c060)",
                  borderRadius: 999,
                }}
              />
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {quickLinks.map((link, idx) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: idx * 0.05 }}
                  style={{ marginBottom: 12 }}
                >
                  <Link
                    to={link.url}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: isMobile ? 12 : 13,
                      color: "rgba(255,255,255,0.55)",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#C4972A";
                      e.currentTarget.style.transform = "translateX(6px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <ChevronRight size={12} style={{ opacity: 0.7 }} />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* ── UPDATED: Legal Column with React Router Link ── */}
          <motion.div variants={itemVariants}>
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobile ? 14 : 15,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 24,
                letterSpacing: "0.5px",
                position: "relative",
                display: "inline-block",
              }}
            >
              Legal & Compliance
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{
                  position: "absolute",
                  bottom: -8,
                  left: 0,
                  height: 2,
                  background: "linear-gradient(90deg, #C4972A, #f0c060)",
                  borderRadius: 999,
                }}
              />
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {legalLinks.map((link, idx) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + idx * 0.05 }}
                  style={{ marginBottom: 12 }}
                >
                  <Link
                    to={link.url}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: isMobile ? 12 : 13,
                      color: "rgba(255,255,255,0.55)",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#C4972A";
                      e.currentTarget.style.transform = "translateX(6px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <Shield size={10} style={{ opacity: 0.7 }} />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter & Contact Column */}
          <motion.div variants={itemVariants}>
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobile ? 14 : 15,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 24,
                letterSpacing: "0.5px",
                position: "relative",
                display: "inline-block",
              }}
            >
              Stay Connected
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{
                  position: "absolute",
                  bottom: -8,
                  left: 0,
                  height: 2,
                  background: "linear-gradient(90deg, #C4972A, #f0c060)",
                  borderRadius: 999,
                }}
              />
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobile ? 12 : 13,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.6,
                marginBottom: 20,
              }}
            >
              Subscribe to receive job alerts and latest updates
            </p>
            
            {/* Newsletter Form with Formspree */}
            <form onSubmit={handleSubscribe} style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  style={{
                    flex: 1,
                    minWidth: isMobile ? "100%" : 160,
                    padding: isMobile ? "11px 14px" : "12px 16px",
                    borderRadius: "12px",
                    border: "1px solid rgba(196,151,42,0.2)",
                    background: "rgba(255,255,255,0.05)",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: isMobile ? 12 : 13,
                    color: "#fff",
                    outline: "none",
                    transition: "all 0.3s ease",
                    width: isMobile ? "100%" : "auto",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#C4972A";
                    e.target.style.background = "rgba(255,255,255,0.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(196,151,42,0.2)";
                    e.target.style.background = "rgba(255,255,255,0.05)";
                  }}
                />
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: isMobile ? "11px 20px" : "12px 24px",
                    borderRadius: "40px",
                    border: "none",
                    background: "linear-gradient(135deg, #C4972A, #8B6914)",
                    color: "#0f1d3d",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: isMobile ? 12 : 13,
                    fontWeight: 600,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    opacity: isSubmitting ? 0.7 : 1,
                    transition: "all 0.3s ease",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    width: isMobile ? "100%" : "auto",
                    justifyContent: "center",
                  }}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : isSubscribed ? (
                    <>
                      <CheckCircle size={14} /> Subscribed!
                    </>
                  ) : (
                    <>
                      Subscribe <Send size={12} />
                    </>
                  )}
                </motion.button>
              </div>
              
              {/* Error Message */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginTop: 12,
                    fontSize: 11,
                    color: "#ef4444",
                    fontFamily: "'Inter', sans-serif",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <AlertCircle size={12} />
                  {error}
                </motion.p>
              )}
              
              {/* Success Message */}
              {isSubscribed && !error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginTop: 12,
                    fontSize: 11,
                    color: "#10b981",
                    fontFamily: "'Inter', sans-serif",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <CheckCircle size={12} />
                  Thank you for subscribing! You'll receive updates soon.
                </motion.p>
              )}
            </form>

            {/* Contact Info */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                paddingTop: 20,
                borderTop: "1px solid rgba(196,151,42,0.12)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: isMobile ? 32 : 36,
                    height: isMobile ? 32 : 36,
                    borderRadius: "10px",
                    background: "rgba(196,151,42,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#C4972A",
                  }}
                >
                  <Phone size={isMobile ? 14 : 16} strokeWidth={1.5} />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "1px",
                      color: "rgba(255,255,255,0.4)",
                      textTransform: "uppercase",
                    }}
                  >
                    24/7 Support Line
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: isMobile ? 13 : 14,
                      fontWeight: 700,
                      color: "#C4972A",
                    }}
                  >
                    07466999218
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: isMobile ? 32 : 36,
                    height: isMobile ? 32 : 36,
                    borderRadius: "10px",
                    background: "rgba(196,151,42,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#C4972A",
                  }}
                >
                  <Mail size={isMobile ? 14 : 16} strokeWidth={1.5} />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "1px",
                      color: "rgba(255,255,255,0.4)",
                      textTransform: "uppercase",
                    }}
                  >
                    Email Us
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: isMobile ? 11 : 12,
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.8)",
                      wordBreak: "break-all",
                    }}
                  >
                    admin_1@evshealthcare.co.uk
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── UPDATED: Bottom Bar with React Router Links ── */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={controls}
          style={{
            borderTop: "1px solid rgba(196,151,42,0.12)",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "center" : "center",
            flexWrap: "wrap",
            gap: isMobile ? 16 : 20,
            background: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            padding: isMobile ? "20px 16px" : "24px 28px",
            marginTop: "20px",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "rgba(255,255,255,0.45)",
              fontSize: isMobile ? 11 : 12,
              lineHeight: 1.6,
            }}
          >
            © {currentYear} EVS Healthcare Solutions Limited. All rights reserved.
            <br />
            <span style={{ fontSize: isMobile ? 10 : 11, opacity: 0.7 }}>
              Company registered in England & Wales. GDPR Compliant.
            </span>
          </div>

          <div style={{ display: "flex", gap: isMobile ? 16 : 24, flexWrap: "wrap", justifyContent: "center" }}>
            {bottomBarLinks.map((link) => (
              <motion.div key={link.name} whileHover={{ x: 2 }}>
                <Link
                  to={link.url}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: "rgba(255,255,255,0.45)",
                    fontSize: isMobile ? 11 : 12,
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    letterSpacing: "0.3px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#C4972A")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0, x: -50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            whileHover={{ y: -5, scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            style={{
              position: "fixed",
              bottom: isMobile ? 20 : 30,
              left: isMobile ? 20 : 30,
              width: isMobile ? 40 : 48,
              height: isMobile ? 40 : 48,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #C4972A, #8B6914)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 16px rgba(196,151,42,0.3)",
              zIndex: 1000,
              transition: "all 0.3s ease",
            }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={isMobile ? 18 : 20} strokeWidth={2.5} style={{ color: "#0f1d3d" }} />
          </motion.button>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          footer {
            min-width: 100vw;
            width: 100%;
          }
        }
        @media (max-width: 480px) {
          footer {
            font-size: 12px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </footer>
  );
}