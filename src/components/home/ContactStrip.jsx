import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Copy,
  Check,
  ArrowRight,
  Send,
  MessageCircle,
  Building2,
  Clock,
  Sparkles,
  User,
  AtSign,
  FileText,
  CheckCircle,
  AlertCircle
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Fully Responsive Contact Section — Modern Contact Information + Contact Form
// Features: Responsive grid, mobile-optimized, formspree integration
// FIXED: High-contrast input fields (WCAG 1.4.11 compliant)
// ─────────────────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.3) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return [ref, isInView];
}

// Detect screen size for responsive design
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

// ─────────────────────────────────────────────────────────────────────────────
// Unified Contact Information Component (Responsive)
// ─────────────────────────────────────────────────────────────────────────────
function UnifiedContactInfo({ isInView }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [copiedItem, setCopiedItem] = useState(null);
  const { isMobile } = useScreenSize();

  const contactItems = [
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
      value: "01772 493994",
      secondary: "07466 999218",
      action: "Call Now",
      link: "tel:01772493994",
      isLink: true,
    },
    { 
      icon: Mail, 
      label: "Email", 
      value: "admin_1@evshealthcare.co.uk",
      action: "Copy Email",
      isLink: false,
    },
  ];

  const handleCopy = async (text, item) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(item);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
        setCopiedItem(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        delay: 0.2,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Responsive styles
  const cardPadding = isMobile ? "20px" : "24px";
  const headerIconSize = isMobile ? 40 : 44;
  const headerFontSize = isMobile ? 15 : 16;
  const contactItemGap = isMobile ? 14 : 16;
  const iconBoxSize = isMobile ? 32 : 36;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
      }}
    >
      <div
        style={{
          position: "relative",
          background: "rgba(15,29,61,0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: "24px",
          padding: cardPadding,
          height: "100%",
          border: `1px solid ${isHovered ? "rgba(196,151,42,0.35)" : "rgba(196,151,42,0.15)"}`,
          transition: "border-color 0.2s ease",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 20,
            paddingBottom: 12,
            borderBottom: "1px solid rgba(196,151,42,0.15)",
          }}
        >
          <div
            style={{
              width: headerIconSize,
              height: headerIconSize,
              borderRadius: "14px",
              background: "linear-gradient(135deg, rgba(196,151,42,0.15), rgba(196,151,42,0.05))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#C4972A",
            }}
          >
            <MessageCircle size={isMobile ? 20 : 22} strokeWidth={1.6} />
          </div>
          <div>
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: headerFontSize,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 2,
              }}
            >
              Contact Information
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobile ? 10 : 11,
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Reach us through any channel
            </p>
          </div>
        </div>

        {/* Contact Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: contactItemGap }}>
          {contactItems.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: isMobile ? 10 : 12,
                }}
              >
                <div
                  style={{
                    width: iconBoxSize,
                    height: iconBoxSize,
                    borderRadius: "12px",
                    background: "rgba(196,151,42,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: "#C4972A",
                  }}
                >
                  <IconComponent size={isMobile ? 16 : 18} strokeWidth={1.6} />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: isMobile ? 9 : 10,
                      fontWeight: 600,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.45)",
                      marginBottom: 2,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: isMobile ? 12 : 13,
                      fontWeight: 500,
                      color: "#fff",
                      lineHeight: 1.4,
                      marginBottom: item.secondary ? 2 : 6,
                      wordBreak: "break-word",
                    }}
                  >
                    {item.value}
                  </div>
                  {item.secondary && (
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: isMobile ? 11 : 12,
                        color: "rgba(255,255,255,0.6)",
                        marginBottom: 6,
                      }}
                    >
                      {item.secondary}
                    </div>
                  )}
                  {item.isLink ? (
                    <a
                      href={item.link}
                      target={item.label === "Office Address" ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        fontFamily: "'Inter', sans-serif",
                        fontSize: isMobile ? 9 : 10,
                        fontWeight: 500,
                        color: "#C4972A",
                        textDecoration: "none",
                        background: "rgba(196,151,42,0.12)",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(196,151,42,0.22)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(196,151,42,0.12)";
                      }}
                    >
                      <span>{item.action}</span>
                      <ArrowRight size={8} />
                    </a>
                  ) : (
                    <button
                      onClick={() => handleCopy(item.value, item.label)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        fontFamily: "'Inter', sans-serif",
                        fontSize: isMobile ? 9 : 10,
                        fontWeight: 500,
                        color: "#C4972A",
                        textDecoration: "none",
                        background: "rgba(196,151,42,0.12)",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {copiedItem === item.label ? (
                        <>
                          <Check size={8} />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={8} />
                          <span>{item.action}</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Contact Form Component (Responsive) - FIXED: High contrast inputs
// ─────────────────────────────────────────────────────────────────────────────
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const { isMobile } = useScreenSize();

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqapvgwk";

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
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        delay: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Responsive styles
  const cardPadding = isMobile ? "20px" : "24px";
  const headerIconSize = isMobile ? 40 : 44;
  const headerFontSize = isMobile ? 15 : 16;
  const inputPadding = isMobile ? "10px 12px" : "12px 14px";
  const textareaRows = isMobile ? 3 : 4;

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
      }}
    >
      <div
        style={{
          position: "relative",
          background: "rgba(15,29,61,0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: "24px",
          padding: cardPadding,
          height: "100%",
          border: `1px solid ${isHovered ? "rgba(196,151,42,0.35)" : "rgba(196,151,42,0.15)"}`,
          transition: "border-color 0.2s ease",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 20,
            paddingBottom: 12,
            borderBottom: "1px solid rgba(196,151,42,0.15)",
          }}
        >
          <div
            style={{
              width: headerIconSize,
              height: headerIconSize,
              borderRadius: "14px",
              background: "linear-gradient(135deg, rgba(196,151,42,0.15), rgba(196,151,42,0.05))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#C4972A",
            }}
          >
            <Send size={isMobile ? 20 : 22} strokeWidth={1.6} />
          </div>
          <div>
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: headerFontSize,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 2,
              }}
            >
              Send us a Message
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobile ? 10 : 11,
                color: "rgba(255,255,255,0.5)",
              }}
            >
              We'll respond within 24 hours
            </p>
          </div>
        </div>

        {isSubmitted ? (
          <div
            style={{
              textAlign: "center",
              padding: isMobile ? "30px 20px" : "40px 20px",
            }}
          >
            <div
              style={{
                width: isMobile ? 56 : 64,
                height: isMobile ? 56 : 64,
                borderRadius: "50%",
                background: "rgba(16,185,129,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                color: "#10b981",
              }}
            >
              <CheckCircle size={isMobile ? 28 : 32} strokeWidth={1.6} />
            </div>
            <h4
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobile ? 16 : 18,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 8,
              }}
            >
              Message Sent!
            </h4>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobile ? 12 : 13,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Thank you. We'll contact you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 14 }}>
              <label
                htmlFor="name"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? 11 : 12,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.7)",
                  marginBottom: 6,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <User size={12} style={{ color: "#C4972A" }} />
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Smith"
                style={{
                  width: "100%",
                  padding: inputPadding,
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.35)",
                  background: "rgba(255,255,255,0.12)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? 13 : 14,
                  color: "#ffffff",
                  outline: "none",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#C4972A";
                  e.target.style.background = "rgba(255,255,255,0.18)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(196,151,42,0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.35)";
                  e.target.style.background = "rgba(255,255,255,0.12)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label
                htmlFor="email"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? 11 : 12,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.7)",
                  marginBottom: 6,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <AtSign size={12} style={{ color: "#C4972A" }} />
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                style={{
                  width: "100%",
                  padding: inputPadding,
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.35)",
                  background: "rgba(255,255,255,0.12)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? 13 : 14,
                  color: "#ffffff",
                  outline: "none",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#C4972A";
                  e.target.style.background = "rgba(255,255,255,0.18)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(196,151,42,0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.35)";
                  e.target.style.background = "rgba(255,255,255,0.12)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label
                htmlFor="phone"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? 11 : 12,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.7)",
                  marginBottom: 6,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Phone size={12} style={{ color: "#C4972A" }} />
                Phone (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="01234 567890"
                style={{
                  width: "100%",
                  padding: inputPadding,
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.35)",
                  background: "rgba(255,255,255,0.12)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? 13 : 14,
                  color: "#ffffff",
                  outline: "none",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#C4972A";
                  e.target.style.background = "rgba(255,255,255,0.18)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(196,151,42,0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.35)";
                  e.target.style.background = "rgba(255,255,255,0.12)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div style={{ marginBottom: 18 }}>
              <label
                htmlFor="message"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? 11 : 12,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.7)",
                  marginBottom: 6,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <FileText size={12} style={{ color: "#C4972A" }} />
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={textareaRows}
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell us how we can help..."
                style={{
                  width: "100%",
                  padding: inputPadding,
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.35)",
                  background: "rgba(255,255,255,0.12)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? 13 : 14,
                  color: "#ffffff",
                  outline: "none",
                  resize: "vertical",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#C4972A";
                  e.target.style.background = "rgba(255,255,255,0.18)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(196,151,42,0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.35)";
                  e.target.style.background = "rgba(255,255,255,0.12)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {error && (
              <div
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  borderRadius: "12px",
                  padding: "10px 14px",
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <AlertCircle size={14} style={{ color: "#ef4444" }} />
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: isMobile ? 11 : 12,
                    color: "#ef4444",
                    margin: 0,
                  }}
                >
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: isMobile ? "12px 16px" : "14px 20px",
                borderRadius: "40px",
                border: "none",
                background: "linear-gradient(135deg, #C4972A, #8B6914)",
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobile ? 13 : 14,
                fontWeight: 600,
                color: "#0f1d3d",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                opacity: isSubmitting ? 0.7 : 1,
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              {isSubmitting ? (
                <>Sending...</>
              ) : (
                <>
                  Send Message
                  <Send size={14} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Contact Component (Fully Responsive)
// ─────────────────────────────────────────────────────────────────────────────
export default function ContactStrip() {
  const [ref, inView] = useReveal(0.2);
  const headerControls = useAnimation();
  const { isMobile, isTablet } = useScreenSize();

  useEffect(() => {
    if (inView) {
      headerControls.start("visible");
    }
  }, [inView, headerControls]);

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Responsive grid layout
  const getGridColumns = () => {
    if (isMobile) return "1fr";
    if (isTablet) return "repeat(2, 1fr)";
    return "repeat(2, 1fr)";
  };

  const getHeadingSize = () => {
    if (isMobile) return "clamp(1.3rem, 5vw, 1.6rem)";
    return "clamp(1.5rem, 3vw, 2rem)";
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        position: "relative",
        padding: isMobile ? "clamp(40px, 8vh, 60px) clamp(16px, 4vw, 80px)" : "clamp(60px, 12vh, 100px) clamp(16px, 5vw, 80px)",
        background: "linear-gradient(135deg, #0f1d3d 0%, #1a2a50 100%)",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(196,151,42,0.05) 0%, transparent 50%),
            repeating-linear-gradient(45deg, rgba(196,151,42,0.02) 0px, rgba(196,151,42,0.02) 1px, transparent 1px, transparent 30px)
          `,
          backgroundSize: "100% 100%, 40px 40px",
          pointerEvents: "none",
        }}
      />

      {/* Floating Decorative Orbs - Hidden on mobile for performance */}
      {!isMobile && (
        <>
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "5%",
              width: 250,
              height: 250,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(196,151,42,0.03), transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "10%",
              right: "5%",
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(196,151,42,0.02), transparent 70%)",
              pointerEvents: "none",
            }}
          />
        </>
      )}

      {/* Top Animated Border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, #C4972A, #f0c060, #C4972A, transparent)",
          transformOrigin: "left",
        }}
      />

      {/* Bottom Animated Border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, #C4972A, #f0c060, #C4972A, transparent)",
          transformOrigin: "right",
        }}
      />

      <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 2 }}>
        
        {/* Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={headerControls}
          style={{ textAlign: "center", marginBottom: isMobile ? 32 : 40 }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: isMobile ? 10 : 12,
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: 30 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                height: 2,
                background: "#C4972A",
                borderRadius: 999,
              }}
            />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobile ? 10 : 11,
                fontWeight: 700,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "#C4972A",
              }}
            >
              Get In Touch
            </span>
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: 30 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                height: 2,
                background: "#C4972A",
                borderRadius: 999,
              }}
            />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: getHeadingSize(),
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.02em",
              marginBottom: isMobile ? 8 : 10,
              padding: isMobile ? "0 16px" : 0,
            }}
          >
            Connect With{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #C4972A, #f0c060)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              EVS Healthcare
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: isMobile ? 12 : 13,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 500,
              margin: "0 auto",
              lineHeight: 1.6,
              padding: isMobile ? "0 12px" : 0,
            }}
          >
            Reach out to our team for any inquiries, support, or career opportunities
          </motion.p>
        </motion.div>

        {/* Responsive Grid Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: getGridColumns(),
            gap: isMobile ? 20 : 24,
          }}
        >
          <UnifiedContactInfo isInView={inView} />
          <ContactForm />
        </div>

        {/* Bottom Decorative Line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            marginTop: isMobile ? 32 : 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <div style={{ width: 60, height: 1, background: "rgba(196,151,42,0.25)", borderRadius: 999 }} />
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#C4972A",
              opacity: 0.5,
            }}
          />
          <div style={{ width: 60, height: 1, background: "rgba(196,151,42,0.25)", borderRadius: 999 }} />
        </motion.div>
      </div>
    </section>
  );
}