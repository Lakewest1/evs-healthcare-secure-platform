// components/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EVSLogo from "../EVSLogo";

// ─────────────────────────────────────────────────────────────────────────────
// EVS HEALTHCARE SOLUTIONS LTD — Professional Enterprise Navbar
//
// ENTERPRISE-GRADE DESIGN:
//   • Full-width sticky navbar (no floating pill)
//   • Transparent on hero → white/glass on scroll
//   • Text white on hero → navy on scroll
//   • Hairline bottom border on scroll
//   • Enhanced brand visibility - larger, bolder company name
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

  /* ─── HAMBURGER BARS ───────────────────────────────────────────────── */
  .evs-bar {
    display: block;
    width: 20px;
    height: 2px;
    border-radius: 2px;
    transition: transform 0.28s cubic-bezier(0.22,1,0.36,1),
                opacity   0.18s ease,
                width     0.22s ease;
    pointer-events: none;
  }
  
  /* Hero state - white bars */
  .navbar-transparent .evs-bar {
    background: #ffffff;
  }
  
  /* Scrolled state - navy bars */
  .navbar-scrolled .evs-bar {
    background: #0f1d3d;
  }
  
  .evs-burger[data-open="true"] .evs-bar:nth-child(1) { transform: translateY(8px) rotate(45deg); }
  .evs-burger[data-open="true"] .evs-bar:nth-child(2) { opacity: 0; width: 0; }
  .evs-burger[data-open="true"] .evs-bar:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

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
    z-index: 1008;
  }

  /* ─── RESPONSIVE SHOW/HIDE ─────────────────────────────────────────── */
  @media (max-width: 767px) { 
    .evs-dsk { display: none !important; } 
  }
  @media (min-width: 768px) { 
    .evs-mob { display: none !important; } 
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
  const closeRef = useRef(null);

  // Scroll detection - full width navbar, no border-radius
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Update active link based on scroll position
  useEffect(() => {
    const handleScrollHighlight = () => {
      const scrollPosition = window.scrollY + 100;
      
      const sections = ["about", "jobs", "training", "for-employers", "contact"];
      const sectionMap = {
        "about": "About",
        "jobs": "Jobs",
        "training": "Training",
        "for-employers": "Employers",
        "contact": "Contact"
      };
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveLink(sectionMap[section] || "");
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScrollHighlight);
    handleScrollHighlight();
    return () => window.removeEventListener("scroll", handleScrollHighlight);
  }, []);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Focus trap
  useEffect(() => {
    if (menuOpen) setTimeout(() => closeRef.current?.focus(), 80);
  }, [menuOpen]);

  // Smooth scroll to section
  const goTo = (section) => {
    setActiveLink(section);
    setMenuOpen(false);
    
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
  };

  // Apply Now goes to application section
  const goToApplication = () => {
    setActiveLink("");
    setMenuOpen(false);
    const el = document.getElementById("register");
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Hire Staff goes to employers section
  const goToEmployers = () => {
    setActiveLink("");
    setMenuOpen(false);
    const el = document.getElementById("for-employers");
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Logo home handler
  const goHome = () => {
    setActiveLink("");
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navbarClass = scrolled ? "navbar-scrolled" : "navbar-transparent";

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
          zIndex: 1010,
          width: "100%",
          background: scrolled
            ? "rgba(255, 255, 255, 0.96)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(0, 0, 0, 0.06)"
            : "none",
          transition: "background 0.3s ease, backdrop-filter 0.3s ease, border-bottom 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: scrolled ? "12px 24px" : "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "clamp(16px, 2vw, 32px)",
            transition: "padding 0.3s ease",
          }}
        >
          {/* ── LOGOTYPE - ENHANCED BOLDER, LARGER ── */}
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
            <EVSLogo size={scrolled ? 42 : 48} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* Main company name - LARGER & BOLDER */}
              <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(4px, 0.6vw, 6px)", lineHeight: 1.1, flexWrap: "nowrap" }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(16px, 1.6vw, 20px)",
                  color: scrolled ? "#0f1d3d" : "#ffffff",
                  letterSpacing: "0.03em",
                  transition: "color 0.3s ease",
                  whiteSpace: "nowrap",
                }}>
                  EVS
                </span>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(12px, 1.2vw, 16px)",
                  color: scrolled ? "#0f1d3d" : "rgba(255,255,255,0.95)",
                  letterSpacing: "0.06em",
                  transition: "color 0.3s ease",
                  whiteSpace: "nowrap",
                }}>
                  HEALTHCARE SOLUTIONS
                </span>
              </div>
              
              {/* LTD & Tagline - slightly larger for visibility */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(8px, 0.8vw, 10px)",
                  color: scrolled ? "rgba(15,29,61,0.5)" : "rgba(255,255,255,0.65)",
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
                  fontSize: "clamp(8px, 0.7vw, 10px)",
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
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                className="evs-link"
                data-active={activeLink === link}
                onClick={() => goTo(link)}
              >
                {link}
                {activeLink === link && (
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
            ))}
          </div>

          {/* ── DESKTOP DUAL CTA ── */}
          <div className="evs-dsk" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button className="evs-hire-staff" onClick={goToEmployers}>
              Hire Staff
            </button>
            <button className="evs-apply" onClick={goToApplication}>
              Apply Now
            </button>
          </div>

          {/* ── HAMBURGER (< 768px) ── */}
          <button
            className="evs-mob evs-burger"
            data-open={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              width: 44,
              height: 44,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              flexShrink: 0,
            }}
          >
            <span className="evs-bar" />
            <span className="evs-bar" />
            <span className="evs-bar" />
          </button>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
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
              style={{
                position: "fixed",
                top: 0, right: 0, bottom: 0,
                width: "min(88vw, 340px)",
                zIndex: 1010,
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                background: "rgba(10,22,40,0.98)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderLeft: "1px solid rgba(196,151,42,0.15)",
                boxShadow: "-8px 0 32px rgba(0,0,0,0.3)",
              }}
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
                {NAV_LINKS.map((link) => (
                  <motion.div key={link} variants={itemV}>
                    <button
                      className="evs-dlk"
                      data-active={activeLink === link}
                      onClick={() => goTo(link)}
                    >
                      {link}
                      <span className="evs-dlk-arrow">›</span>
                    </button>
                  </motion.div>
                ))}
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
                <button
                  className="evs-apply"
                  onClick={goToApplication}
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