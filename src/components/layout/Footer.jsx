import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import EVSLogo from "../EVSLogo";

// ─────────────────────────────────────────────────────────────────────────────
// Modern 2026 Footer — Premium Design with Glass Morphism
// Features: Animated borders, social links, newsletter (Formspree), back to top
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

  // Formspree endpoint - Replace with your own endpoint ID
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqapvgwk";

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

  const socialLinks = [
    { name: "LinkedIn", icon: "💼", url: "#", color: "#0077B5" },
    { name: "Facebook", icon: "📘", url: "#", color: "#1877F2" },
    { name: "Twitter", icon: "🐦", url: "#", color: "#1DA1F2" },
    { name: "Instagram", icon: "📸", url: "#", color: "#E4405F" },
  ];

  const quickLinks = [
    { name: "About Us", url: "#about" },
    { name: "Featured Jobs", url: "#jobs" },
    { name: "Contact Us", url: "#contact" },
    { name: "FAQ", url: "#faq" },
    { name: "Testimonials", url: "#testimonials" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", url: "#" },
    { name: "GDPR Compliance", url: "#" },
    { name: "Terms of Service", url: "#" },
    { name: "Cookie Policy", url: "#" },
    { name: "Accessibility", url: "#" },
  ];

  // Floating particles for background
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
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
            y: [0, -80, 0],
            x: [0, Math.sin(particle.id) * 40, 0],
            opacity: [0, 0.3, 0],
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
            background: `radial-gradient(circle, rgba(196,151,42,${0.5}), transparent)`,
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
          background: "radial-gradient(ellipse at 50% 0%, rgba(196,151,42,0.08), transparent 60%)",
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
          padding: "clamp(50px, 10vh, 70px) clamp(20px, 5vw, 80px) clamp(40px, 6vh, 60px)",
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
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "clamp(40px, 6vw, 60px)",
            marginBottom: "clamp(40px, 6vh, 60px)",
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
                <EVSLogo size={44} />
              </motion.div>
              <div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: 15,
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
                    fontSize: 11,
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
                fontSize: 13,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.7,
                marginBottom: 24,
                maxWidth: 280,
              }}
            >
              Providing quality healthcare staffing solutions across North-West England.
              Your trusted partner in care excellence.
            </p>
            
            {/* Social Links with Glass Morphism */}
            <div style={{ display: "flex", gap: 12 }}>
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                    fontSize: 18,
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${social.color}20`;
                    e.currentTarget.style.borderColor = `${social.color}60`;
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div variants={itemVariants}>
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
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
                  <a
                    href={link.url}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
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
                    <span style={{ fontSize: 12, opacity: 0.7 }}>→</span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Column */}
          <motion.div variants={itemVariants}>
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
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
                  <a
                    href={link.url}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
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
                    <span style={{ fontSize: 10, opacity: 0.7 }}>•</span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter & Contact Column */}
          <motion.div variants={itemVariants}>
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
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
                fontSize: 13,
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
                    minWidth: 160,
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.05)",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: "#fff",
                    outline: "none",
                    transition: "all 0.3s ease",
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
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: "12px 24px",
                    borderRadius: "12px",
                    border: "none",
                    background: "linear-gradient(135deg, #C4972A, #8B6914)",
                    color: "#fff",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    opacity: isSubmitting ? 0.7 : 1,
                    transition: "all 0.3s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {isSubmitting ? "Sending..." : isSubscribed ? "✓ Subscribed!" : "Subscribe"}
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
                  }}
                >
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
                  }}
                >
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
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "10px",
                    background: "rgba(196,151,42,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                  }}
                >
                  📞
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11,
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    24/7 Support Line
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#C4972A",
                    }}
                  >
                    01772 493994
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "10px",
                    background: "rgba(196,151,42,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                  }}
                >
                  ✉️
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11,
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    Email Us
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    admin_1@evshealthcare.co.uk
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar with Glass Effect */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={controls}
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "clamp(28px, 5vh, 36px)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 20,
            background: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(10px)",
            borderRadius: "16px",
            padding: "24px 28px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "rgba(255,255,255,0.45)",
              fontSize: 12,
              lineHeight: 1.6,
            }}
          >
            © {currentYear} EVS Healthcare Solutions Limited. All rights reserved.
            <br />
            <span style={{ fontSize: 11, opacity: 0.7 }}>
              Company registered in England & Wales. GDPR Compliant.
            </span>
          </div>

          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {["Privacy", "GDPR", "Terms", "Cookies"].map((link, idx) => (
              <motion.a
                key={link}
                href="#"
                whileHover={{ x: 2 }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: "rgba(255,255,255,0.45)",
                  fontSize: 12,
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  letterSpacing: "0.3px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C4972A")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.45)")
                }
              >
                {link}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Back to Top Button - Left Side, Only Appears When Needed */}
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
              bottom: 30,
              left: 30,
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #C4972A, #8B6914)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 20px rgba(196,151,42,0.35)",
              zIndex: 1000,
              transition: "all 0.3s ease",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          footer .bottom-bar {
            flex-direction: column;
            text-align: center;
          }
          .back-to-top {
            bottom: 20px;
            left: 20px;
            width: 40px;
            height: 40px;
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