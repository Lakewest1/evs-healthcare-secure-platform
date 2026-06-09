import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EVSLogo from "../EVSLogo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

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

  const links = ["Home", "About", "Jobs", "Training", "Register", "Contact"];

  // Handle smooth scroll to section
  const scrollToSection = (sectionId) => {
    setActiveLink(sectionId);
    const element = document.getElementById(sectionId.toLowerCase());
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setMenuOpen(false);
  };

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
    },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      } 
    },
    exit: { 
      opacity: 0,
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
    },
    visible: (i) => ({
      opacity: 1,
      x: 0,
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

  // Hamburger animation variants
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

  const logoVariants = {
    initial: { scale: 1 },
    whileTap: { scale: 0.95 },
  };

  // Particle animation
  const particleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: [0, 1, 0],
      opacity: [0, 0.08, 0],
      transition: {
        delay: i * 0.05,
        duration: 2.5,
        repeat: Infinity,
        repeatType: "loop",
      },
    }),
  };

  // Generate random particles
  const particles = [...Array(20)].map((_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 2,
  }));

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled ? "rgba(255,255,255,0.98)" : "#ffffff",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          boxShadow: scrolled 
            ? "0 4px 20px rgba(0,0,0,0.08)" 
            : "0 1px 0 rgba(0,0,0,0.05)",
          transition: "all 0.3s ease",
          padding: scrolled ? "12px 5%" : "16px 5%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Modern Hamburger Button */}
        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "rgba(26,45,90,0.05)",
            border: "none",
            cursor: "pointer",
            padding: "12px",
            zIndex: 1002,
            position: "relative",
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
          }}
          className="burger"
          whileHover={{ 
            background: "rgba(196,151,42,0.1)",
            scale: 1.02,
          }}
          whileTap={{ scale: 0.95 }}
          animate={menuOpen ? "open" : "closed"}
        >
          {/* Hamburger Icon */}
          <div style={{ position: "relative", width: "22px", height: "18px" }}>
            <motion.div
              style={{
                position: "absolute",
                width: "22px",
                height: "2.5px",
                background: menuOpen ? "#C4972A" : "#1a2d5a",
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
                width: "22px",
                height: "2.5px",
                background: menuOpen ? "#C4972A" : "#1a2d5a",
                borderRadius: "3px",
                top: "7.5px",
                left: "0",
              }}
              variants={middleLineVariants}
              animate={menuOpen ? "open" : "closed"}
            />
            <motion.div
              style={{
                position: "absolute",
                width: "22px",
                height: "2.5px",
                background: menuOpen ? "#C4972A" : "#1a2d5a",
                borderRadius: "3px",
                bottom: "0",
                left: "0",
              }}
              variants={bottomLineVariants}
              animate={menuOpen ? "open" : "closed"}
            />
          </div>
        </motion.button>

        {/* Logo */}
        <motion.div 
          style={{ display: "flex", alignItems: "center", gap: 14 }}
          variants={logoVariants}
          initial="initial"
          whileTap="whileTap"
        >
          <motion.div
            whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
            style={{ cursor: "pointer" }}
            onClick={() => scrollToSection("home")}
          >
            <EVSLogo size={scrolled ? 48 : 52} />
          </motion.div>
          <div>
            <motion.div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: scrolled ? 14 : 15,
                color: "#1a2d5a",
                letterSpacing: 1,
                lineHeight: 1.2,
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              EVS HEALTHCARE LTD
            </motion.div>
            <motion.div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontStyle: "italic",
                fontSize: 10,
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

        {/* Desktop Navigation Links */}
        <div
          style={{ display: "flex", gap: 28, alignItems: "center" }}
          className="nav-links-desktop"
        >
          {links.map((l, i) => (
            <motion.button
              key={l}
              onClick={() => scrollToSection(l)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                color: activeLink === l ? "#C4972A" : "#2d3748",
                textDecoration: "none",
                background: "none",
                border: "none",
                cursor: "pointer",
                position: "relative",
                padding: "8px 0",
              }}
              whileHover={{ color: "#C4972A" }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              {l}
              {(activeLink === l || (!activeLink && l === "Home")) && (
                <motion.div
                  layoutId="activeNav"
                  style={{
                    position: "absolute",
                    bottom: -4,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: "#C4972A",
                    borderRadius: 2,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
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
            </motion.button>
          ))}
          <motion.button
            onClick={() => scrollToSection("register")}
            style={{
              background: "linear-gradient(135deg, #C4972A, #8B6914)",
              color: "#fff",
              padding: "10px 24px",
              borderRadius: 40,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              border: "none",
              cursor: "pointer",
              letterSpacing: 0.5,
              boxShadow: "0 4px 12px rgba(196,151,42,0.3)",
            }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 6px 20px rgba(196,151,42,0.4)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            Apply Now
          </motion.button>
        </div>

        {/* Spacer for mobile layout */}
        <div style={{ width: "48px", visibility: "hidden" }} className="nav-spacer" />
      </nav>

      {/* Mobile Menu with AnimatePresence */}
      <AnimatePresence mode="wait">
        {menuOpen && (
          <>
            {/* Backdrop Overlay */}
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
                background: "rgba(10,22,40,0.92)",
                zIndex: 1000,
              }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Floating Particles */}
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                custom={particle.delay}
                variants={particleVariants}
                initial="hidden"
                animate="visible"
                style={{
                  position: "fixed",
                  width: particle.size,
                  height: particle.size,
                  background: `rgba(196,151,42,0.4)`,
                  borderRadius: "50%",
                  top: `${particle.top}%`,
                  left: `${particle.left}%`,
                  zIndex: 1000,
                  pointerEvents: "none",
                }}
              />
            ))}

            {/* Slide-out Menu Panel */}
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
                width: "min(85%, 360px)",
                background: "linear-gradient(135deg, #ffffff 0%, #fefaf5 100%)",
                boxShadow: "10px 0 40px rgba(0,0,0,0.2)",
                zIndex: 1001,
                display: "flex",
                flexDirection: "column",
                padding: "90px 28px 40px 28px",
              }}
            >
              {/* Close Button */}
              <motion.button
                onClick={() => setMenuOpen(false)}
                style={{
                  position: "absolute",
                  top: "24px",
                  right: "24px",
                  background: "rgba(196,151,42,0.08)",
                  border: "1px solid rgba(196,151,42,0.15)",
                  cursor: "pointer",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  color: "#C4972A",
                }}
                whileHover={{ 
                  background: "rgba(196,151,42,0.15)",
                  rotate: 90,
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.95 }}
              >
                ✕
              </motion.button>

              {/* Menu Header */}
              <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={linkVariants}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 48,
                  paddingBottom: 24,
                  borderBottom: "2px solid rgba(196,151,42,0.12)",
                }}
              >
                <motion.div
                  whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
                >
                  <EVSLogo size={48} />
                </motion.div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 800,
                      fontSize: 14,
                      color: "#1a2d5a",
                      letterSpacing: 0.5,
                    }}
                  >
                    EVS HEALTHCARE LTD
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontStyle: "italic",
                      fontSize: 9,
                      color: "#C4972A",
                      marginTop: 2,
                    }}
                  >
                    We care in time.
                  </div>
                </div>
              </motion.div>

              {/* Navigation Links */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  flex: 1,
                }}
              >
                {links.map((l, i) => (
                  <motion.button
                    key={l}
                    custom={i + 1}
                    initial="hidden"
                    animate="visible"
                    variants={linkVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => scrollToSection(l)}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 20,
                      fontWeight: 500,
                      color: activeLink === l ? "#C4972A" : "#2d3748",
                      textDecoration: "none",
                      padding: "12px 20px",
                      borderRadius: "14px",
                      margin: "2px 0",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: "none",
                      border: "none",
                      width: "100%",
                      textAlign: "left",
                    }}
                  >
                    {l}
                    <motion.span
                      initial={{ x: -10, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                      style={{ color: "#C4972A", fontSize: 18 }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                custom={links.length + 1}
                initial="hidden"
                animate="visible"
                variants={linkVariants}
                onClick={() => {
                  scrollToSection("register");
                  setMenuOpen(false);
                }}
                style={{
                  background: "linear-gradient(135deg, #C4972A, #8B6914)",
                  color: "#fff",
                  padding: "16px 24px",
                  borderRadius: 50,
                  textAlign: "center",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  border: "none",
                  cursor: "pointer",
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
                Apply Now →
              </motion.button>

              {/* Contact Section */}
              <motion.div
                custom={links.length + 2}
                initial="hidden"
                animate="visible"
                variants={linkVariants}
                style={{
                  marginTop: 20,
                  paddingTop: 20,
                  borderTop: "1px solid rgba(196,151,42,0.1)",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    color: "#94a3b8",
                    marginBottom: 8,
                  }}
                >
                  Need help? We're here 24/7
                </p>
                <motion.a
                  href="tel:01772379989"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#C4972A",
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                  whileHover={{ scale: 1.05 }}
                  animate={{ 
                    scale: [1, 1.03, 1],
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  📞 01772 379989
                </motion.a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&display=swap');
        
        @media (max-width: 768px) {
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
        
        @media (min-width: 769px) {
          .burger {
            display: none !important;
          }
          .nav-spacer {
            display: none !important;
          }
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        body {
          transition: overflow 0.3s ease;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
          background: #C4972A;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #8B6914;
        }
      `}</style>
    </>
  );
}