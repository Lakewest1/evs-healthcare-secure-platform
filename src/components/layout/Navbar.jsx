// components/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import EVSLogo from "../EVSLogo";
import { Menu, X } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// EVS HEALTHCARE SOLUTIONS LTD — Professional Enterprise Navbar
// ─────────────────────────────────────────────────────────────────────────────

// Streamlined navigation links
const NAV_LINKS = [
  "About",
  "Jobs",
  "Training",
  "Employers",
  "Contact",
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700;14..32,800;14..32,900&display=swap');

  /* ─── DESKTOP NAV LINK ─────────────────────────────────────────────── */
  .evs-link {
    position: relative;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.01em;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px 4px;
    white-space: nowrap;
    transition: color 0.2s ease;
    -webkit-tap-highlight-color: transparent;
    flex-shrink: 0;
  }
  
  /* Hero state (transparent navbar) - white text */
  .navbar-transparent .evs-link {
    color: rgba(255, 255, 255, 0.85);
  }
  .navbar-transparent .evs-link:hover {
    color: #ffffff;
  }
  .navbar-transparent .evs-link[data-active="true"] {
    color: #C4972A;
    font-weight: 600;
  }
  
  /* Scrolled state (white navbar) - navy text */
  .navbar-scrolled .evs-link {
    color: rgba(15, 29, 61, 0.65);
  }
  .navbar-scrolled .evs-link:hover {
    color: #0f1d3d;
  }
  .navbar-scrolled .evs-link[data-active="true"] {
    color: #C4972A;
    font-weight: 600;
  }

  /* Responsive link font shrink for tight viewports */
  @media (max-width: 1100px) {
    .evs-link { font-size: 13px; }
  }
  @media (max-width: 900px) {
    .evs-link { font-size: 12px; }
  }

  /* ─── CTA BUTTON (Apply Now) ───────────────────────────────────────── */
  .evs-apply {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.03em;
    border-radius: 8px;
    padding: 8px 20px;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    transition: all 0.2s ease;
    -webkit-tap-highlight-color: transparent;
  }
  
  /* Hero state - gold button with white text */
  .navbar-transparent .evs-apply {
    background: #C4972A;
    color: #ffffff;
    border: none;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  .navbar-transparent .evs-apply:hover {
    background: #d4aa3a;
    transform: translateY(-1px);
  }
  
  /* Scrolled state - navy button with white text */
  .navbar-scrolled .evs-apply {
    background: #0f1d3d;
    color: #ffffff;
    border: none;
  }
  .navbar-scrolled .evs-apply:hover {
    background: #1a2a50;
    transform: translateY(-1px);
  }

  /* ─── HIRE STAFF BUTTON (outline style) ─────────────────────────────── */
  .evs-hire-staff {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.02em;
    background: transparent;
    border-radius: 8px;
    padding: 8px 18px;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    transition: all 0.2s ease;
    -webkit-tap-highlight-color: transparent;
  }
  
  /* Hero state - white outline */
  .navbar-transparent .evs-hire-staff {
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.4);
  }
  .navbar-transparent .evs-hire-staff:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.7);
  }
  
  /* Scrolled state - navy outline */
  .navbar-scrolled .evs-hire-staff {
    color: #0f1d3d;
    border: 1px solid rgba(15, 29, 61, 0.2);
  }
  .navbar-scrolled .evs-hire-staff:hover {
    background: rgba(15, 29, 61, 0.05);
    border-color: #C4972A;
  }

  /* ─── MOBILE NAVBAR - FIXED ─────────────────────────────────────────── */
  @media (max-width: 767px) {
    /* Hide desktop elements */
    .evs-dsk { display: none !important; }
    
    /* Show mobile elements */
    .evs-mob { display: flex !important; }
    
    /* Mobile navbar styles */
    .navbar-mobile {
      background: #ffffff !important;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08) !important;
      backdrop-filter: none !important;
    }
  }
  
  @media (min-width: 768px) { 
    .evs-mob { display: none !important; } 
  }

  /* ─── MOBILE DRAWER LINKS ──────────────────────────────────────────── */
  .evs-dlk {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.01em;
    color: rgba(255,255,255,0.75);
    background: transparent;
    border: none;
    border-radius: 10px;
    padding: 14px 16px;
    cursor: pointer;
    text-align: left;
    transition: color 0.18s ease, background 0.18s ease;
    -webkit-tap-highlight-color: transparent;
    min-height: 52px;
  }
  .evs-dlk:hover                { color: #fff; background: rgba(255,255,255,0.08); }
  .evs-dlk[data-active="true"]  { color: #C4972A; background: rgba(196,151,42,0.12); font-weight: 600; }
  .evs-dlk:focus-visible        { outline: 2px solid #C4972A; outline-offset: -2px; }

  .evs-dlk-arrow {
    font-size: 18px;
    line-height: 1;
    color: rgba(196,151,42,0.4);
    flex-shrink: 0;
    transition: transform 0.18s ease, color 0.18s ease;
  }
  .evs-dlk:hover .evs-dlk-arrow,
  .evs-dlk[data-active="true"] .evs-dlk-arrow {
    transform: translateX(4px);
    color: #C4972A;
  }

  /* ─── MOBILE DRAWER CTA (Hire Staff) ───────────────────────────────── */
  .evs-mobile-hire {
    width: 100%;
    padding: 14px 24px;
    font-size: 15px;
    font-weight: 700;
    border-radius: 12px;
    background: rgba(255,255,255,0.08);
    color: #C4972A;
    border: 1px solid rgba(196,151,42,0.3);
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
  }
  .evs-mobile-hire:hover {
    background: rgba(196,151,42,0.15);
    border-color: #C4972A;
  }

  /* ─── OVERLAY ──────────────────────────────────────────────────────── */
  .evs-overlay {
    position: fixed;
    inset: 0;
    background: rgba(5,10,22,0.6);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 999;
    pointer-events: auto;
  }

  /* ─── MOBILE DRAWER Z-INDEX FIX ────────────────────────────────────── */
  .evs-drawer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(88vw, 340px);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    background: rgba(10,22,40,0.98);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-left: 1px solid rgba(196,151,42,0.15);
    box-shadow: -8px 0 32px rgba(0,0,0,0.3);
    pointer-events: auto;
  }

  /* Ensure navbar is above content but below drawer when closed */
  .navbar-mobile,
  .navbar-transparent,
  .navbar-scrolled {
    z-index: 1001 !important;
  }

  /* ─── ACCESSIBILITY ─────────────────────────────────────────────────── */
  .evs-link:focus-visible,
  .evs-apply:focus-visible,
  .evs-hire-staff:focus-visible {
    outline: 2px solid #C4972A;
    outline-offset: 3px;
    border-radius: 4px;
  }

  /* ─── REDUCED MOTION ────────────────────────────────────────────────── */
  @media (prefers-reduced-motion: reduce) {
    .evs-bar, .evs-link, .evs-apply, .evs-hire-staff, .evs-dlk,
    .evs-dlk-arrow { transition: none !important; }
  }
`;

// ── Framer Motion variants ─────────────────────────────────────────────────
const drawerV = {
  hidden:  { x: "100%", transition: { type: "spring", damping: 28, stiffness: 260 } },
  visible: {
    x: 0,
    transition: { type: "spring", damping: 24, stiffness: 210, staggerChildren: 0.045, delayChildren: 0.06 },
  },
  exit: { x: "100%", transition: { type: "spring", damping: 32, stiffness: 300 } },
};
const itemV = {
  hidden:  { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.30, ease: [0.22,1,0.36,1] } },
};
const overlayV = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22 } },
  exit:    { opacity: 0, transition: { duration: 0.18 } },
};

// ─────────────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const closeRef = useRef(null);
  const navigate = useNavigate();

  // Detect mobile for navbar styling
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Update active link based on scroll position (only on home page)
  useEffect(() => {
    const handleScrollHighlight = () => {
      // Only highlight if we're on the home page
      if (window.location.pathname !== "/") {
        setActiveLink("");
        return;
      }
      
      const scrollPosition = window.scrollY + 100;
      
      const sections = ["about", "jobs", "training", "for-employers", "contact"];
      const sectionMap = {
        "about": "About",
        "jobs": "Jobs",
        "training": "Training",
        "for-employers": "Employers",
        "contact": "Contact"
      };
      
      let found = false;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveLink(sectionMap[section] || "");
            found = true;
            break;
          }
        }
      }
      if (!found) setActiveLink("");
    };
    
    window.addEventListener("scroll", handleScrollHighlight);
    handleScrollHighlight();
    return () => window.removeEventListener("scroll", handleScrollHighlight);
  }, []);

  // Body scroll lock when drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [menuOpen]);

  // Focus trap
  useEffect(() => {
    if (menuOpen) setTimeout(() => closeRef.current?.focus(), 80);
  }, [menuOpen]);

  // Close drawer on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  // ── Navigation Handlers ──

  // Smooth scroll to section (only on home page)
  const goTo = (section) => {
    setActiveLink(section);
    setMenuOpen(false);
    
    // If we're on the home page, scroll to the section
    if (window.location.pathname === "/") {
      const sectionMap = {
        "About": "about",
        "Jobs": "jobs",
        "Training": "training",
        "Employers": "for-employers",
        "Contact": "contact"
      };
      
      const sectionId = sectionMap[section] || section.toLowerCase();
      const el = document.getElementById(sectionId);
      if (el) {
        const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    } else {
      // If on another page, navigate to home and scroll after load
      navigate("/");
      setTimeout(() => {
        const sectionMap = {
          "About": "about",
          "Jobs": "jobs",
          "Training": "training",
          "Employers": "for-employers",
          "Contact": "contact"
        };
        const sectionId = sectionMap[section] || section.toLowerCase();
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 300);
    }
  };

  // ── Navigate to Jobs Page ──
  const goToJobs = () => {
    setMenuOpen(false);
    setActiveLink("");
    navigate("/jobs");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── UPDATED: Apply Now → Jobs Page ──
  const goToApply = () => {
    setActiveLink("");
    setMenuOpen(false);
    navigate("/jobs");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Hire Staff goes to employers section
  const goToEmployers = () => {
    setActiveLink("");
    setMenuOpen(false);
    
    if (window.location.pathname === "/") {
      const el = document.getElementById("for-employers");
      if (el) {
        const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById("for-employers");
        if (el) {
          const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 300);
    }
  };

  // Logo home handler
  const goHome = () => {
    setActiveLink("");
    setMenuOpen(false);
    if (window.location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  // Determine navbar class for styling
  const navbarClass = isMobile 
    ? "navbar-mobile" 
    : (scrolled ? "navbar-scrolled" : "navbar-transparent");

  // On mobile, always use white background with navy text
  const navBackground = isMobile
    ? "#ffffff"
    : (scrolled ? "rgba(255, 255, 255, 0.96)" : "transparent");
  
  const navBorderBottom = isMobile
    ? "1px solid rgba(0, 0, 0, 0.08)"
    : (scrolled ? "1px solid rgba(0, 0, 0, 0.06)" : "none");
  
  const navBackdropFilter = isMobile ? "none" : (scrolled ? "blur(16px)" : "none");

  // Text colors
  const getTextColor = () => {
    if (isMobile) return "#0f1d3d";
    return scrolled ? "#0f1d3d" : "#ffffff";
  };

  const getSecondaryTextColor = () => {
    if (isMobile) return "#0f1d3d";
    return scrolled ? "#0f1d3d" : "rgba(255,255,255,0.95)";
  };

  const getLtdColor = () => {
    if (isMobile) return "rgba(15,29,61,0.5)";
    return scrolled ? "rgba(15,29,61,0.5)" : "rgba(255,255,255,0.65)";
  };

  // Check if on jobs page for active link highlighting
  const isJobsPage = window.location.pathname === "/jobs";

  return (
    <>
      <style>{CSS}</style>

      <nav
        className={navbarClass}
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1001,
          width: "100%",
          background: navBackground,
          backdropFilter: navBackdropFilter,
          WebkitBackdropFilter: navBackdropFilter,
          borderBottom: navBorderBottom,
          transition: "background 0.3s ease, backdrop-filter 0.3s ease, border-bottom 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: isMobile ? "12px 20px" : (scrolled ? "12px 24px" : "16px 24px"),
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "clamp(16px, 2vw, 32px)",
            transition: "padding 0.3s ease",
          }}
        >
          {/* ── LOGOTYPE ── */}
          <button
            onClick={goHome}
            aria-label="EVS Healthcare Solutions — return to home"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(10px, 1.5vw, 16px)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              flexShrink: 0,
            }}
          >
            <EVSLogo size={isMobile ? 38 : (scrolled ? 42 : 48)} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(4px, 0.6vw, 6px)", lineHeight: 1.1, flexWrap: "nowrap" }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 900,
                  fontSize: isMobile ? "16px" : "clamp(16px, 1.6vw, 20px)",
                  color: getTextColor(),
                  letterSpacing: "0.03em",
                  transition: "color 0.3s ease",
                  whiteSpace: "nowrap",
                }}>
                  EVS
                </span>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: isMobile ? "11px" : "clamp(12px, 1.2vw, 16px)",
                  color: getSecondaryTextColor(),
                  letterSpacing: "0.06em",
                  transition: "color 0.3s ease",
                  whiteSpace: "nowrap",
                }}>
                  HEALTHCARE SOLUTION
                </span>
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: isMobile ? "7px" : "clamp(8px, 0.8vw, 10px)",
                  color: getLtdColor(),
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  transition: "color 0.3s ease",
                  whiteSpace: "nowrap",
                }}>
                  Ltd
                </span>
                <span style={{
                  width: 3, height: 3,
                  borderRadius: "50%",
                  background: "#C4972A",
                  display: "inline-block",
                  flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontStyle: "italic",
                  fontSize: isMobile ? "7px" : "clamp(8px, 0.7vw, 10px)",
                  color: "#C4972A",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                  transition: "color 0.3s ease",
                  whiteSpace: "nowrap",
                }}>
                  We care in time.
                </span>
              </div>
            </div>
          </button>

          {/* ── DESKTOP LINKS ── */}
          <div
            className="evs-dsk"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(20px, 2.5vw, 36px)",
              flex: 1,
              justifyContent: "center",
            }}
          >
            {NAV_LINKS.map((link) => {
              // For Jobs link, check if we're on the jobs page
              const isActive = link === "Jobs" 
                ? window.location.pathname === "/jobs"
                : activeLink === link;
              
              // For Jobs link, navigate to /jobs instead of scrolling
              const handleClick = link === "Jobs" ? goToJobs : () => goTo(link);
              
              return (
                <button
                  key={link}
                  className="evs-link"
                  data-active={isActive}
                  onClick={handleClick}
                >
                  {link}
                  {isActive && (
                    <motion.span
                      layoutId="evs-pill"
                      style={{
                        position: "absolute",
                        bottom: -4,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "calc(100% + 8px)",
                        height: 2,
                        background: "linear-gradient(90deg, #C4972A, #e8b84a)",
                        borderRadius: 999,
                      }}
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* ── DESKTOP DUAL CTA ── */}
          <div className="evs-dsk" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button className="evs-hire-staff" onClick={goToEmployers}>
              Hire Staff
            </button>
            {/* ── UPDATED: Apply Now → Jobs Page ── */}
            <button className="evs-apply" onClick={goToApply}>
              Apply Now
            </button>
          </div>

          {/* ── MOBILE HAMBURGER MENU BUTTON ── */}
          <button
            className="evs-mob"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              flexShrink: 0,
              color: "#0f1d3d",
              zIndex: 1002,
            }}
          >
            {menuOpen ? (
              <X size={24} strokeWidth={2} />
            ) : (
              <Menu size={24} strokeWidth={2} />
            )}
          </button>
        </div>
      </nav>

      {/* ── MOBILE DRAWER with proper z-index layering ── */}
      <AnimatePresence mode="wait">
        {menuOpen && (
          <>
            <motion.div
              className="evs-overlay"
              variants={overlayV}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            <motion.aside
              id="evs-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              variants={drawerV}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="evs-drawer"
            >
              <motion.div
                variants={itemV}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "24px 20px 20px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <EVSLogo size={40} />
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: 15, color: "#fff", letterSpacing: "0.05em" }}>EVS</span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 12, color: "#fff", letterSpacing: "0.06em" }}>HEALTHCARE SOLUTIONS</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 3 }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 8, fontWeight: 800, color: "rgba(255,255,255,0.45)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Ltd</span>
                      <span style={{ width: 2.5, height: 2.5, borderRadius: "50%", background: "#C4972A" }} />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontStyle: "italic", fontSize: 8.5, color: "#C4972A", fontWeight: 500 }}>We care in time.</span>
                    </div>
                  </div>
                </div>

                <button
                  ref={closeRef}
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  style={{
                    width: 36, height: 36,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "50%",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: 18,
                    transition: "all 0.2s ease",
                  }}
                >
                  ✕
                </button>
              </motion.div>

              <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
                {NAV_LINKS.map((link) => {
                  const isActive = link === "Jobs" 
                    ? window.location.pathname === "/jobs"
                    : activeLink === link;
                  
                  const handleClick = link === "Jobs" ? goToJobs : () => goTo(link);
                  
                  return (
                    <motion.div key={link} variants={itemV}>
                      <button
                        className="evs-dlk"
                        data-active={isActive}
                        onClick={handleClick}
                      >
                        {link}
                        <span className="evs-dlk-arrow">›</span>
                      </button>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                variants={itemV}
                style={{
                  padding: "16px 20px 24px",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <button className="evs-mobile-hire" onClick={goToEmployers}>
                  Hire Staff
                </button>
                {/* ── UPDATED: Apply Now → Jobs Page ── */}
                <button
                  className="evs-apply"
                  onClick={goToApply}
                  style={{
                    width: "100%",
                    padding: "14px 24px",
                    fontSize: 15,
                    borderRadius: 12,
                    background: "#C4972A",
                    color: "#0f1d3d",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Apply Now →
                </button>

                <div style={{ textAlign: "center", marginTop: 12 }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.35)", marginBottom: 6, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                    24 / 7 Support
                  </p>
                  <a
                    href="tel:01772493994"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#C4972A",
                      textDecoration: "none",
                    }}
                  >
                    01772 493 994
                  </a>
                </div>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}