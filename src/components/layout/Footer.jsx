import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import EVSLogo from "../EVSLogo";

// ─────────────────────────────────────────────────────────────────────────────
// Premium Footer Component — Enterprise-Grade Footer with Advanced Animations
// Features: Animated borders, social links, newsletter signup, floating effects
// ─────────────────────────────────────────────────────────────────────────────

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: "spring", stiffness: 100 },
    },
  };

  const socialLinks = [
    { name: "LinkedIn", icon: "🔗", url: "#" },
    { name: "Facebook", icon: "📘", url: "#" },
    { name: "Twitter", icon: "🐦", url: "#" },
    { name: "Instagram", icon: "📸", url: "#" },
  ];

  const quickLinks = [
    { name: "About Us", url: "#about" },
    { name: "Jobs", url: "#jobs" },
    { name: "Contact", url: "#contact" },
    { name: "FAQ", url: "#faq" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", url: "#" },
    { name: "GDPR Compliance", url: "#" },
    { name: "Terms of Service", url: "#" },
    { name: "Cookie Policy", url: "#" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer ref={ref} style={{ position: "relative", background: "#080f1f", overflow: "hidden" }}>
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
          height: 2,
          background: "linear-gradient(90deg, transparent, #C4972A, #f0c060, #C4972A, transparent)",
          transformOrigin: "left",
        }}
      />

      {/* Background Pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(196,151,42,0.03) 0%, transparent 50%),
            repeating-linear-gradient(45deg, rgba(196,151,42,0.02) 0px, rgba(196,151,42,0.02) 1px, transparent 1px, transparent 40px)
          `,
          backgroundSize: "100% 100%, 40px 40px",
          pointerEvents: "none",
        }}
      />

      {/* Main Footer Content */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(40px, 8vh, 60px) clamp(16px, 5vw, 80px)",
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
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "clamp(32px, 5vw, 48px)",
            marginBottom: "clamp(32px, 6vh, 48px)",
          }}
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <EVSLogo size={40} />
              </motion.div>
              <div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: 14,
                    color: "#fff",
                    letterSpacing: "1px",
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
                    fontWeight: 500,
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
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.6,
                marginBottom: 20,
                maxWidth: 280,
              }}
            >
              Providing quality healthcare staffing solutions across North-West England.
              Your trusted partner in care.
            </p>
            {/* Social Links */}
            <div style={{ display: "flex", gap: 12 }}>
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                    fontSize: 18,
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(196,151,42,0.2)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
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
                fontSize: 14,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 20,
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
                  bottom: -6,
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
                      color: "rgba(255,255,255,0.5)",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#C4972A";
                      e.currentTarget.style.transform = "translateX(5px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <span style={{ fontSize: 12 }}>→</span>
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
                fontSize: 14,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 20,
                letterSpacing: "0.5px",
                position: "relative",
                display: "inline-block",
              }}
            >
              Legal
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{
                  position: "absolute",
                  bottom: -6,
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
                      color: "rgba(255,255,255,0.5)",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#C4972A";
                      e.currentTarget.style.transform = "translateX(5px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <span style={{ fontSize: 12 }}>•</span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Newsletter Column */}
          <motion.div variants={itemVariants}>
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 20,
                letterSpacing: "0.5px",
                position: "relative",
                display: "inline-block",
              }}
            >
              Stay Updated
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{
                  position: "absolute",
                  bottom: -6,
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
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.6,
                marginBottom: 16,
              }}
            >
              Subscribe to receive job alerts and updates
            </p>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              <input
                type="email"
                placeholder="Your email address"
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.05)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: "10px 16px",
                  borderRadius: "8px",
                  border: "none",
                  background: "linear-gradient(135deg, #C4972A, #8B6914)",
                  color: "#fff",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                Subscribe
              </motion.button>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 0",
                borderTop: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <span style={{ fontSize: 16 }}>📞</span>
              <div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  Emergency Contact
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#C4972A",
                  }}
                >
                  24/7 Support Line
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={controls}
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "clamp(24px, 4vh, 32px)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "rgba(255,255,255,0.35)",
              fontSize: 11,
              lineHeight: 1.5,
            }}
          >
            © {currentYear} EVS Healthcare Solutions Limited. All rights reserved.
            Company registered in England & Wales. GDPR Compliant.
          </div>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {["Privacy Policy", "GDPR", "Terms"].map((link, idx) => (
              <motion.a
                key={link}
                href="#"
                whileHover={{ x: 2 }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: "rgba(255,255,255,0.4)",
                  fontSize: 11,
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C4972A")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.4)")
                }
              >
                {link}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Back to Top Button */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8, type: "spring" }}
          whileHover={{ y: -3, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: "fixed",
            bottom: 30,
            right: 30,
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #C4972A, #8B6914)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 15px rgba(196,151,42,0.3)",
            zIndex: 100,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </motion.button>
      </div>
    </footer>
  );
}