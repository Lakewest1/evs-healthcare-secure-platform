import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation, useScroll, useTransform, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// Fully Responsive Contact Section — Modern Contact Information + Contact Form
// Features: Responsive grid, mobile-optimized, formspree integration
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
      icon: "📍", 
      label: "Office Address", 
      value: "1a John William Street, Preston, PR1 4XE",
      action: "Get Directions",
      link: "https://maps.google.com/?q=1a+John+William+Street+Preston+PR1+4XE",
      isLink: true,
    },
    { 
      icon: "📞", 
      label: "Phone", 
      value: "01772 493994",
      secondary: "07466 999218",
      action: "Call Now",
      link: "tel:01772493994",
      isLink: true,
    },
    { 
      icon: "✉️", 
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
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          padding: cardPadding,
          height: "100%",
          border: `1px solid ${isHovered ? "rgba(196,151,42,0.3)" : "rgba(255,255,255,0.08)"}`,
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
            borderBottom: "1px solid rgba(255,255,255,0.08)",
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
              fontSize: isMobile ? 20 : 22,
            }}
          >
            📬
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
          {contactItems.map((item, idx) => (
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
                  borderRadius: "10px",
                  background: "rgba(196,151,42,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: isMobile ? 16 : 18,
                  flexShrink: 0,
                }}
              >
                {item.icon}
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
                      background: "rgba(196,151,42,0.1)",
                      padding: "3px 8px",
                      borderRadius: "14px",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(196,151,42,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(196,151,42,0.1)";
                    }}
                  >
                    <span>{item.action}</span>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
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
                      background: "rgba(196,151,42,0.1)",
                      padding: "3px 8px",
                      borderRadius: "14px",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <span>{copiedItem === item.label ? "Copied!" : item.action}</span>
                    {copiedItem !== item.label && (
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M16 3h5v5M14 10l6-6M4 20L20 4"/>
                      </svg>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Contact Form Component (Responsive)
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
  const inputPadding = isMobile ? "8px 12px" : "10px 14px";
  const textareaRows = isMobile ? 2 : 3;

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
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          padding: cardPadding,
          height: "100%",
          border: `1px solid ${isHovered ? "rgba(196,151,42,0.3)" : "rgba(255,255,255,0.08)"}`,
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
            borderBottom: "1px solid rgba(255,255,255,0.08)",
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
              fontSize: isMobile ? 20 : 22,
            }}
          >
            ✉️
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
              padding: isMobile ? "20px" : "30px 20px",
            }}
          >
            <div
              style={{
                width: isMobile ? 48 : 56,
                height: isMobile ? 48 : 56,
                borderRadius: "50%",
                background: "rgba(16,185,129,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 12px",
              }}
            >
              <svg width={isMobile ? 24 : 28} height={isMobile ? 24 : 28} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <h4
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobile ? 15 : 16,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 6,
              }}
            >
              Message Sent!
            </h4>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobile ? 11 : 12,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Thank you. We'll contact you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 12 }}>
              <label
                htmlFor="name"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? 10 : 11,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.6)",
                  marginBottom: 4,
                  display: "block",
                }}
              >
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: inputPadding,
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.05)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? 11 : 12,
                  color: "#fff",
                  outline: "none",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#C4972A";
                  e.target.style.background = "rgba(255,255,255,0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.1)";
                  e.target.style.background = "rgba(255,255,255,0.05)";
                }}
              />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label
                htmlFor="email"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? 10 : 11,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.6)",
                  marginBottom: 4,
                  display: "block",
                }}
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: inputPadding,
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.05)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? 11 : 12,
                  color: "#fff",
                  outline: "none",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#C4972A";
                  e.target.style.background = "rgba(255,255,255,0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.1)";
                  e.target.style.background = "rgba(255,255,255,0.05)";
                }}
              />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label
                htmlFor="phone"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? 10 : 11,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.6)",
                  marginBottom: 4,
                  display: "block",
                }}
              >
                Phone (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: inputPadding,
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.05)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? 11 : 12,
                  color: "#fff",
                  outline: "none",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#C4972A";
                  e.target.style.background = "rgba(255,255,255,0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.1)";
                  e.target.style.background = "rgba(255,255,255,0.05)";
                }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label
                htmlFor="message"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? 10 : 11,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.6)",
                  marginBottom: 4,
                  display: "block",
                }}
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={textareaRows}
                value={formData.message}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: inputPadding,
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.05)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? 11 : 12,
                  color: "#fff",
                  outline: "none",
                  resize: "vertical",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#C4972A";
                  e.target.style.background = "rgba(255,255,255,0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.1)";
                  e.target.style.background = "rgba(255,255,255,0.05)";
                }}
              />
            </div>

            {error && (
              <div
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  borderRadius: "10px",
                  padding: "8px 12px",
                  marginBottom: 14,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: isMobile ? 10 : 11,
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
                padding: isMobile ? "8px 16px" : "10px 16px",
                borderRadius: "10px",
                border: "none",
                background: "linear-gradient(135deg, #C4972A, #8B6914)",
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobile ? 12 : 13,
                fontWeight: 600,
                color: "#fff",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                opacity: isSubmitting ? 0.7 : 1,
                transition: "all 0.2s ease",
              }}
            >
              {isSubmitting ? "Sending..." : "Send Message →"}
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
        background: "linear-gradient(135deg, #0a1628 0%, #0f1d3d 50%, #1a2a4a 100%)",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(196,151,42,0.06) 0%, transparent 50%),
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
              background: "radial-gradient(circle, rgba(196,151,42,0.04), transparent 70%)",
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
              background: "radial-gradient(circle, rgba(196,151,42,0.03), transparent 70%)",
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
                fontWeight: 800,
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