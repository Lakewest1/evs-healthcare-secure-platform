import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EVSLogo from "../EVSLogo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const links = ["Home", "About", "Jobs", "Register", "Contact","Training"];

  // Advanced menu animation variants
  const menuVariants = {
    hidden: {
      x: "-100%",
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
        mass: 0.8,
      },
    },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 180,
        mass: 0.8,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      x: "-100%",
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 250,
        mass: 0.8,
      },
    },
  };

  const overlayVariants = {
    hidden: { 
      opacity: 0,
      backdropFilter: "blur(0px)",
    },
    visible: { 
      opacity: 1,
      backdropFilter: "blur(8px)",
      transition: { 
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      } 
    },
    exit: { 
      opacity: 0,
      backdropFilter: "blur(0px)",
      transition: { 
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      } 
    },
  };

  const linkVariants = {
    hidden: { 
      opacity: 0, 
      x: -40,
      rotate: -5,
    },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        delay: 0.06 * i,
        duration: 0.5,
        type: "spring",
        damping: 15,
        stiffness: 120,
      },
    }),
    hover: {
      x: 12,
      color: "#C4972A",
      backgroundColor: "rgba(196,151,42,0.08)",
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 200,
      },
    },
    tap: {
      scale: 0.97,
      transition: {
        duration: 0.1,
      },
    },
  };

  // Advanced hamburger animation variants
  const topLineVariants = {
    closed: {
      rotate: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    open: {
      rotate: 45,
      y: 10,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  const middleLineVariants = {
    closed: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.15,
      },
    },
  };

  const bottomLineVariants = {
    closed: {
      rotate: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    open: {
      rotate: -45,
      y: -10,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  const hamburgerGlowVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: [0, 1.2, 1],
      opacity: [0, 0.3, 0],
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Logo animation variants
  const logoVariants = {
    initial: { scale: 1 },
    whileTap: { scale: 0.95 },
  };

  // Floating particles for menu background
  const particleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: [0, 1, 0],
      opacity: [0, 0.1, 0],
      transition: {
        delay: i * 0.05,
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop",
      },
    }),
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: "#ffffff",
          boxShadow: "0 2px 15px rgba(0,0,0,0.08)",
          transition: "all 0.3s ease",
          padding: "0 5%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "90px",
        }}
      >
        {/* Modern Hamburger Button with Glow Effect */}
        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "rgba(26,45,90,0.05)",
            border: "none",
            cursor: "pointer",
            padding: "14px",
            zIndex: 1002,
            position: "relative",
            width: "52px",
            height: "52px",
            borderRadius: "16px",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
          }}
          className="burger"
          whileHover={{ 
            background: "rgba(196,151,42,0.1)",
            scale: 1.05,
          }}
          whileTap={{ scale: 0.95 }}
          animate={menuOpen ? "open" : "closed"}
        >
          {/* Glow effect on click */}
          <motion.div
            variants={hamburgerGlowVariants}
            initial="initial"
            animate={menuOpen ? "animate" : "initial"}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              borderRadius: "16px",
              background: "radial-gradient(circle, rgba(196,151,42,0.3), transparent)",
              pointerEvents: "none",
            }}
          />
          
          {/* Hamburger Icon */}
          <div style={{ position: "relative", width: "26px", height: "20px" }}>
            <motion.div
              style={{
                position: "absolute",
                width: "26px",
                height: "2.5px",
                background: "linear-gradient(135deg, #1a2d5a, #C4972A)",
                borderRadius: "3px",
                top: "0",
                left: "0",
              }}
              variants={topLineVariants}
              animate={menuOpen ? "open" : "closed"}
            />
            <motion.div
              style={{
                position: "absolute",
                width: "26px",
                height: "2.5px",
                background: "linear-gradient(135deg, #1a2d5a, #C4972A)",
                borderRadius: "3px",
                top: "8.5px",
                left: "0",
              }}
              variants={middleLineVariants}
              animate={menuOpen ? "open" : "closed"}
            />
            <motion.div
              style={{
                position: "absolute",
                width: "26px",
                height: "2.5px",
                background: "linear-gradient(135deg, #1a2d5a, #C4972A)",
                borderRadius: "3px",
                bottom: "0",
                left: "0",
              }}
              variants={bottomLineVariants}
              animate={menuOpen ? "open" : "closed"}
            />
          </div>
        </motion.button>

        {/* Logo with animation */}
        <motion.div 
          style={{ display: "flex", alignItems: "center", gap: 16 }}
          variants={logoVariants}
          initial="initial"
          whileTap="whileTap"
        >
          <EVSLogo size={56} />
          <div>
            <motion.div
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: 18,
                color: "#1a2d5a",
                letterSpacing: 1.5,
                lineHeight: 1.2,
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              EVS HEALTHCARE SOLUTION LIMITED
            </motion.div>
            <motion.div
              style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: 11,
                color: "#C4972A",
                letterSpacing: 0.5,
                marginTop: 2,
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              We care in time.
            </motion.div>
          </div>
        </motion.div>

        {/* Desktop links */}
        <div
          style={{ display: "flex", gap: 32, alignItems: "center" }}
          className="nav-links-desktop"
        >
          {links.map((l, i) => (
            <motion.a
              key={l}
              href={`#${l.toLowerCase()}`}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                fontWeight: 500,
                color: "#2d3748",
                textDecoration: "none",
                letterSpacing: 0.3,
                transition: "color 0.2s",
                position: "relative",
              }}
              whileHover={{ color: "#C4972A" }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              {l}
              <motion.div
                style={{
                  position: "absolute",
                  bottom: -4,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: "#C4972A",
                  borderRadius: 2,
                }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
          <motion.a
            href="#register"
            style={{
              background: "linear-gradient(135deg, #C4972A, #8B6914)",
              color: "#fff",
              padding: "10px 28px",
              borderRadius: 30,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              textDecoration: "none",
              letterSpacing: 0.5,
              boxShadow: "0 4px 15px rgba(196,151,42,0.4)",
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 8px 25px rgba(196,151,42,0.5)",
              transition: { type: "spring", stiffness: 300 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            Apply Now
          </motion.a>
        </div>

        {/* Spacer for mobile */}
        <div style={{ width: "52px", visibility: "hidden" }} className="nav-spacer" />
      </nav>

      {/* Advanced Mobile Menu with Particles */}
      <AnimatePresence mode="wait">
        {menuOpen && (
          <>
            {/* Backdrop overlay with blur */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={overlayVariants}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(15,43,77,0.85)",
                backdropFilter: "blur(8px)",
                zIndex: 1000,
              }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Animated floating particles in background */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={particleVariants}
                initial="hidden"
                animate="visible"
                style={{
                  position: "fixed",
                  width: Math.random() * 6 + 2,
                  height: Math.random() * 6 + 2,
                  background: `rgba(196,151,42,${Math.random() * 0.3 + 0.1})`,
                  borderRadius: "50%",
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  zIndex: 1000,
                  pointerEvents: "none",
                }}
              />
            ))}

            {/* Slide-out menu panel with spring animation */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                width: "min(85%, 380px)",
                background: "linear-gradient(135deg, #ffffff 0%, #fef9f0 100%)",
                boxShadow: "10px 0 50px rgba(0,0,0,0.15)",
                zIndex: 1001,
                display: "flex",
                flexDirection: "column",
                padding: "100px 32px 40px 32px",
              }}
            >
              {/* Elegant Close Button */}
              <motion.button
                onClick={() => setMenuOpen(false)}
                style={{
                  position: "absolute",
                  top: "28px",
                  right: "28px",
                  background: "rgba(196,151,42,0.1)",
                  border: "1px solid rgba(196,151,42,0.2)",
                  cursor: "pointer",
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  color: "#C4972A",
                  transition: "all 0.3s",
                }}
                whileHover={{ 
                  background: "rgba(196,151,42,0.2)",
                  rotate: 90,
                  scale: 1.1,
                  borderColor: "rgba(196,151,42,0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                ✕
              </motion.button>

              {/* Menu Header with Stagger Animation */}
              <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={linkVariants}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 56,
                  paddingBottom: 24,
                  borderBottom: "2px solid rgba(196,151,42,0.2)",
                }}
              >
                <motion.div
                  whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
                  style={{ cursor: "pointer" }}
                >
                  <EVSLogo size={52} />
                </motion.div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 700,
                      fontSize: 16,
                      color: "#1a2d5a",
                      letterSpacing: 1,
                    }}
                  >
                    EVS HEALTHCARE
                  </div>
                  <div
                    style={{
                      fontFamily: "Georgia, serif",
                      fontStyle: "italic",
                      fontSize: 10,
                      color: "#C4972A",
                      marginTop: 2,
                    }}
                  >
                    We care in time.
                  </div>
                </div>
              </motion.div>

              {/* Modern Animated Navigation Links */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  flex: 1,
                }}
              >
                {links.map((l, i) => (
                  <motion.a
                    key={l}
                    href={`#${l.toLowerCase()}`}
                    custom={i + 1}
                    initial="hidden"
                    animate="visible"
                    variants={linkVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 22,
                      fontWeight: 500,
                      color: "#2d3748",
                      textDecoration: "none",
                      padding: "14px 20px",
                      borderRadius: "16px",
                      transition: "all 0.2s",
                      margin: "2px 0",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {l}
                    <motion.span
                      initial={{ x: -10, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                      style={{ color: "#C4972A", fontSize: 20 }}
                    >
                      →
                    </motion.span>
                  </motion.a>
                ))}
              </div>

              {/* Premium CTA Button */}
              <motion.a
                href="#register"
                custom={links.length + 1}
                initial="hidden"
                animate="visible"
                variants={linkVariants}
                onClick={() => setMenuOpen(false)}
                style={{
                  background: "linear-gradient(135deg, #C4972A, #8B6914)",
                  color: "#fff",
                  padding: "18px 28px",
                  borderRadius: 50,
                  textAlign: "center",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  textDecoration: "none",
                  marginTop: 32,
                  marginBottom: 20,
                  boxShadow: "0 8px 20px rgba(196,151,42,0.3)",
                  position: "relative",
                  overflow: "hidden",
                }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 12px 30px rgba(196,151,42,0.4)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Shine effect on hover */}
                <motion.div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  }}
                  whileHover={{ left: "100%", transition: { duration: 0.6 } }}
                />
                Apply Now →
              </motion.a>

              {/* Contact Section with Pulse Animation */}
              <motion.div
                custom={links.length + 2}
                initial="hidden"
                animate="visible"
                variants={linkVariants}
                style={{
                  marginTop: 20,
                  paddingTop: 20,
                  borderTop: "1px solid rgba(196,151,42,0.2)",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: "#94a3b8",
                    marginBottom: 8,
                  }}
                >
                  Need help? We're here 24/7
                </p>
                <motion.p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#C4972A",
                    cursor: "pointer",
                  }}
                  whileHover={{ scale: 1.05 }}
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  📞 01772 379989
                </motion.p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&family=Crimson+Text:ital,wght@0,600;1,400&display=swap');
        
        @media(max-width:768px) {
          .nav-links-desktop {
            display: none !important;
          }
          .burger {
            display: flex !important;
          }
          .nav-spacer {
            display: block !important;
          }
        }
        
        @media(min-width:769px) {
          .burger {
            display: none !important;
          }
          .nav-spacer {
            display: none !important;
          }
        }

        /* Smooth scrolling for the whole page when menu is open */
        body {
          transition: overflow 0.3s ease;
        }
      `}</style>
    </>
  );
}