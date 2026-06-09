// components/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EVSLogo from "../EVSLogo";

// ─────────────────────────────────────────────────────────────────────────────
// MODERNISED NAVBAR — EVS Healthcare Solutions
//
// Design decisions:
//  • Always-opaque navy bar — continuous with site identity, not a white ghost
//  • Single gold hairline bottom border — the only decoration needed
//  • Sliding pill active indicator (layoutId) — one bold motion, nothing else moves
//  • Right-side mobile drawer — thumb-friendly, full navy panel, no white overlay conflict
//  • Scroll: subtle elevation change only (no background swap)
//  • Removed: 20 particles, logo 360° spin, dual underline conflict, perpetual phone pulse
//  • Framer Motion scoped to: pill slide, drawer enter/exit, link stagger (once)
// ─────────────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Home", "About", "Jobs", "Training", "Register", "Contact"];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&display=swap');

  /* ── Hamburger bars ── */
  .evs-bar {
    display: block;
    width: 22px;
    height: 2px;
    background: #ffffff;
    border-radius: 2px;
    transition: transform 0.3s cubic-bezier(0.22,1,0.36,1),
                opacity   0.2s ease,
                background 0.2s ease;
  }
  .evs-burger[data-open="true"] .evs-bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
    background: #C4972A;
  }
  .evs-burger[data-open="true"] .evs-bar:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
  }
  .evs-burger[data-open="true"] .evs-bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
    background: #C4972A;
  }

  /* ── Desktop link hover underline ── */
  .evs-nav-link {
    position: relative;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: rgba(255,255,255,0.72);
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px 0;
    transition: color 0.2s ease;
    white-space: nowrap;
  }
  .evs-nav-link:hover { color: #ffffff; }
  .evs-nav-link[data-active="true"] { color: #ffffff; }

  /* ── Mobile drawer link ── */
  .evs-drawer-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-family: 'Inter', sans-serif;
    font-size: 18px;
    font-weight: 500;
    color: rgba(255,255,255,0.75);
    background: transparent;
    border: none;
    border-radius: 12px;
    padding: 13px 16px;
    cursor: pointer;
    text-align: left;
    transition: color 0.2s ease, background 0.2s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .evs-drawer-link:hover,
  .evs-drawer-link[data-active="true"] {
    color: #ffffff;
    background: rgba(196,151,42,0.10);
  }
  .evs-drawer-link[data-active="true"] {
    color: #C4972A;
  }
  .evs-drawer-arrow {
    color: rgba(196,151,42,0.45);
    font-size: 14px;
    transition: transform 0.2s ease, color 0.2s ease;
  }
  .evs-drawer-link:hover .evs-drawer-arrow {
    transform: translateX(4px);
    color: #C4972A;
  }

  /* ── Apply Now CTA ── */
  .evs-cta {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0.3px;
    color: #0f1d3d;
    background: linear-gradient(135deg, #C4972A 0%, #e8b84a 100%);
    border: none;
    border-radius: 40px;
    padding: 9px 22px;
    cursor: pointer;
    box-shadow: 0 2px 12px rgba(196,151,42,0.30);
    transition: transform 0.2s cubic-bezier(0.22,1,0.36,1),
                box-shadow 0.2s ease;
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent;
  }
  .evs-cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(196,151,42,0.45);
  }
  .evs-cta:active { transform: translateY(0); }

  /* ── Overlay ── */
  .evs-overlay {
    position: fixed;
    inset: 0;
    background: rgba(5,12,25,0.70);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 998;
  }

  /* ── Responsive visibility ── */
  @media (min-width: 769px) {
    .evs-hamburger-wrap { display: none !important; }
  }
  @media (max-width: 768px) {
    .evs-desktop-links  { display: none !important; }
  }

  /* ── Scrollbar (global, scoped here to avoid duplication) ── */
  ::-webkit-scrollbar       { width: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: rgba(196,151,42,0.40);
    border-radius: 99px;
  }
  ::-webkit-scrollbar-thumb:hover { background: rgba(196,151,42,0.65); }

  /* ── Reduced motion ── */
  @media (prefers-reduced-motion: reduce) {
    .evs-bar,
    .evs-drawer-link,
    .evs-drawer-arrow,
    .evs-cta { transition: none !important; }
  }
`;

// Drawer animation — slides in from right
const drawerVariants = {
  hidden: {
    x: "100%",
    transition: { type: "spring", damping: 28, stiffness: 260, mass: 0.8 },
  },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      damping: 24,
      stiffness: 220,
      mass: 0.8,
      staggerChildren: 0.04,
      delayChildren: 0.08,
    },
  },
  exit: {
    x: "100%",
    transition: { type: "spring", damping: 30, stiffness: 280, mass: 0.7 },
  },
};

const drawerItemVariants = {
  hidden:   { opacity: 0, x: 20 },
  visible:  { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22,1,0.36,1] } },
};

const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
};

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const closeRef = useRef(null);

  // Scroll elevation
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Focus the close button when drawer opens (accessibility)
  useEffect(() => {
    if (menuOpen && closeRef.current) {
      setTimeout(() => closeRef.current?.focus(), 100);
    }
  }, [menuOpen]);

  // Smooth scroll to section
  const goTo = (section) => {
    setActiveLink(section);
    setMenuOpen(false);
    const el = document.getElementById(section.toLowerCase());
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 76;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <style>{CSS}</style>

      {/* ── NAVBAR BAR ─────────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          height: scrolled ? 64 : 72,
          padding: "0 clamp(1rem, 5vw, 4rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          // Always navy — continuous with site identity
          background: "#C4972A",
          // Elevation on scroll: shadow only, no background swap
          boxShadow: scrolled
            ? "0 2px 24px rgba(0,0,0,0.28), 0 1px 0 rgba(196,151,42,0.18)"
            : "0 1px 0 rgba(196,151,42,0.15)",
          transition: "height 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease",
        }}
      >
        {/* ── LOGO ── */}
        <button
          onClick={() => goTo("Home")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            flexShrink: 0,
            textAlign: "left",
          }}
          aria-label="EVS Healthcare — go to homepage"
        >
          <EVSLogo size={scrolled ? 44 : 48} />
          <div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: scrolled ? 13 : 14,
              color: "#ffffff",
              letterSpacing: "1.2px",
              lineHeight: 1.2,
              transition: "font-size 0.3s ease",
            }}>
              EVS HEALTHCARE
            </div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontStyle: "italic",
              fontSize: 9.5,
              color: "#C4972A",
              letterSpacing: "0.4px",
              marginTop: 2,
              opacity: 0.9,
            }}>
              We care in time.
            </div>
          </div>
        </button>

        {/* ── DESKTOP LINKS ── */}
        <div
          className="evs-desktop-links"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(16px, 2.4vw, 32px)",
          }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              className="evs-nav-link"
              data-active={activeLink === link}
              onClick={() => goTo(link)}
            >
              {link}
              {/* Sliding pill — the ONE Framer Motion element per link */}
              {activeLink === link && (
                <motion.span
                  layoutId="nav-pill"
                  style={{
                    position: "absolute",
                    bottom: -1,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: "linear-gradient(90deg, #C4972A, #e8b84a)",
                    borderRadius: "99px 99px 0 0",
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* ── DESKTOP CTA ── */}
        <button
          className="evs-cta evs-desktop-links"
          onClick={() => goTo("Register")}
        >
          Apply Now
        </button>

        {/* ── HAMBURGER (mobile only) ── */}
        <div className="evs-hamburger-wrap" style={{ marginLeft: "auto" }}>
          <button
            className="evs-burger"
            data-open={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 6,
              width: 44,
              height: 44,
              background: menuOpen
                ? "rgba(196,151,42,0.12)"
                : "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 12,
              cursor: "pointer",
              padding: 0,
              transition: "background 0.2s ease, border-color 0.2s ease",
              flexShrink: 0,
            }}
          >
            <span className="evs-bar" />
            <span className="evs-bar" />
            <span className="evs-bar" />
          </button>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ──────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="evs-overlay"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer panel — RIGHT side */}
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                position: "fixed",
                top: 0, right: 0, bottom: 0,
                width: "min(88%, 340px)",
                background: "linear-gradient(160deg, #0f1d3d 0%, #0a1628 100%)",
                borderLeft: "1px solid rgba(196,151,42,0.15)",
                zIndex: 999,
                display: "flex",
                flexDirection: "column",
                padding: "0 0 env(safe-area-inset-bottom, 24px)",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              {/* Drawer header */}
              <motion.div
                variants={drawerItemVariants}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 24px 18px",
                  borderBottom: "1px solid rgba(196,151,42,0.12)",
                  flexShrink: 0,
                }}
              >
                {/* Brand mark */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <EVSLogo size={40} />
                  <div>
                    <div style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 800,
                      fontSize: 13,
                      color: "#ffffff",
                      letterSpacing: "0.8px",
                    }}>
                      EVS HEALTHCARE
                    </div>
                    <div style={{
                      fontFamily: "'Inter', sans-serif",
                      fontStyle: "italic",
                      fontSize: 9,
                      color: "#C4972A",
                      marginTop: 2,
                    }}>
                      We care in time.
                    </div>
                  </div>
                </div>

                {/* Close button */}
                <button
                  ref={closeRef}
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  style={{
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    borderRadius: "50%",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.60)",
                    fontSize: 16,
                    transition: "background 0.2s ease, color 0.2s ease",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(196,151,42,0.15)";
                    e.currentTarget.style.color = "#C4972A";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.60)";
                  }}
                >
                  ✕
                </button>
              </motion.div>

              {/* Nav links */}
              <nav
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  padding: "16px 16px 8px",
                  gap: 4,
                }}
              >
                {NAV_LINKS.map((link, i) => (
                  <motion.div key={link} variants={drawerItemVariants}>
                    <button
                      className="evs-drawer-link"
                      data-active={activeLink === link}
                      onClick={() => goTo(link)}
                    >
                      {link}
                      <span className="evs-drawer-arrow">→</span>
                    </button>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer footer */}
              <motion.div
                variants={drawerItemVariants}
                style={{
                  padding: "16px 24px 24px",
                  borderTop: "1px solid rgba(196,151,42,0.10)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  flexShrink: 0,
                }}
              >
                {/* Full-width CTA */}
                <button
                  className="evs-cta"
                  onClick={() => goTo("Register")}
                  style={{
                    width: "100%",
                    padding: "14px 24px",
                    fontSize: 15,
                    borderRadius: 14,
                  }}
                >
                  Apply Now →
                </button>

                {/* Contact line */}
                <div style={{ textAlign: "center" }}>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    color: "rgba(255,255,255,0.35)",
                    marginBottom: 6,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}>
                    24/7 Support
                  </p>
                  <a
                    href="tel:01772379989"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 17,
                      fontWeight: 700,
                      color: "#C4972A",
                      textDecoration: "none",
                      letterSpacing: "0.3px",
                    }}
                  >
                    01772 379 989
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