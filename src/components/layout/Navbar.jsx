// components/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EVSLogo from "../EVSLogo";

// ─────────────────────────────────────────────────────────────────────────────
// EVS HEALTHCARE SOLUTIONS LTD — 2026 Navbar
//
// Design language:
//  • Floating pill nav — sits 12px from viewport edges, rounded corners
//    Not edge-to-edge: the 2026 standard (Linear, Raycast, Vercel)
//  • Glassy white surface — rgba(255,255,255,0.82) + blur(20px)
//    Logo (navy-coloured) reads perfectly on light glass
//  • Gold hairline border at rest → brightens on scroll
//  • Active link: gold pill slides under text (layoutId, one motion instance)
//  • Logotype: "EVS" heavy / "HEALTHCARE SOLUTIONS" medium / "LTD" small caps
//  • Mobile: full-height right drawer, navy glass, staggered link reveal
//  • No per-card state, no perpetual loops, no particles
// ─────────────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Home", "About", "Jobs", "Training", "Register", "Contact"];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800;14..32,900&display=swap');

  /* ── Desktop nav link ── */
  .evs-link {
    position: relative;
    font-family: 'Inter', sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    letter-spacing: 0.01em;
    color: rgba(15,29,61,0.55);
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px 2px;
    white-space: nowrap;
    transition: color 0.18s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .evs-link:hover { color: #0f1d3d; }
  .evs-link[data-active="true"] {
    color: #0f1d3d;
    font-weight: 600;
  }

  /* ── CTA button ── */
  .evs-apply {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: #ffffff;
    background: #0f1d3d;
    border: none;
    border-radius: 10px;
    padding: 9px 20px;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.2s ease,
                box-shadow  0.2s ease,
                transform   0.15s cubic-bezier(0.34,1.56,0.64,1);
    -webkit-tap-highlight-color: transparent;
    position: relative;
    overflow: hidden;
  }
  .evs-apply::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(196,151,42,0.18), transparent 60%);
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  .evs-apply:hover {
    background: #162447;
    box-shadow: 0 4px 18px rgba(15,29,61,0.22);
    transform: translateY(-1px);
  }
  .evs-apply:hover::after { opacity: 1; }
  .evs-apply:active { transform: translateY(0); }

  /* ── Hamburger bars ── */
  .evs-bar {
    display: block;
    width: 20px;
    height: 1.8px;
    border-radius: 2px;
    background: #0f1d3d;
    transition: transform 0.28s cubic-bezier(0.22,1,0.36,1),
                opacity   0.18s ease,
                width     0.22s ease;
  }
  .evs-burger[data-open="true"] .evs-bar:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  .evs-burger[data-open="true"] .evs-bar:nth-child(2) {
    opacity: 0;
    width: 0;
  }
  .evs-burger[data-open="true"] .evs-bar:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  /* ── Drawer nav link ── */
  .evs-dlk {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-family: 'Inter', sans-serif;
    font-size: 17px;
    font-weight: 500;
    letter-spacing: 0.01em;
    color: rgba(255,255,255,0.65);
    background: transparent;
    border: none;
    border-radius: 10px;
    padding: 13px 14px;
    cursor: pointer;
    text-align: left;
    transition: color 0.18s ease, background 0.18s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .evs-dlk:hover {
    color: #ffffff;
    background: rgba(255,255,255,0.06);
  }
  .evs-dlk[data-active="true"] {
    color: #C4972A;
    background: rgba(196,151,42,0.08);
    font-weight: 600;
  }
  .evs-dlk-arrow {
    font-size: 18px;
    color: rgba(196,151,42,0.35);
    transition: transform 0.18s ease, color 0.18s ease;
    flex-shrink: 0;
    line-height: 1;
  }
  .evs-dlk:hover .evs-dlk-arrow,
  .evs-dlk[data-active="true"] .evs-dlk-arrow {
    transform: translateX(3px);
    color: #C4972A;
  }

  /* ── Overlay ── */
  .evs-overlay {
    position: fixed;
    inset: 0;
    background: rgba(5,10,20,0.55);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    z-index: 1008;
  }

  /* ── Visibility helpers ── */
  @media (min-width: 769px) { .evs-mob { display: none !important; } }
  @media (max-width: 768px) { .evs-dsk { display: none !important; } }

  /* ── Focus ring ── */
  .evs-link:focus-visible,
  .evs-apply:focus-visible,
  .evs-dlk:focus-visible {
    outline: 2px solid #C4972A;
    outline-offset: 3px;
    border-radius: 6px;
  }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: rgba(196,151,42,0.35);
    border-radius: 99px;
  }
  ::-webkit-scrollbar-thumb:hover { background: rgba(196,151,42,0.60); }

  /* ── Reduced motion ── */
  @media (prefers-reduced-motion: reduce) {
    .evs-bar, .evs-link, .evs-apply,
    .evs-dlk, .evs-dlk-arrow { transition: none !important; }
  }
`;

const drawerV = {
  hidden:  { x: "100%", transition: { type: "spring", damping: 28, stiffness: 260 } },
  visible: {
    x: 0,
    transition: { type: "spring", damping: 24, stiffness: 210, staggerChildren: 0.045, delayChildren: 0.06 },
  },
  exit: { x: "100%", transition: { type: "spring", damping: 32, stiffness: 300 } },
};

const itemV = {
  hidden:  { opacity: 0, x: 18 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.32, ease: [0.22,1,0.36,1] } },
};

const overlayV = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22 } },
  exit:    { opacity: 0, transition: { duration: 0.18 } },
};

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const closeRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) setTimeout(() => closeRef.current?.focus(), 80);
  }, [menuOpen]);

  const goTo = (section) => {
    setActiveLink(section);
    setMenuOpen(false);
    const el = document.getElementById(section.toLowerCase());
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Floating nav geometry — contracts and sinks on scroll
  const navStyle = {
    position: "fixed",
    top:   scrolled ? 8  : 12,
    left:  scrolled ? 12 : 16,
    right: scrolled ? 12 : 16,
    zIndex: 1010,
    height: scrolled ? 60 : 68,
    borderRadius: scrolled ? 14 : 18,
    padding: "0 clamp(14px, 2.8vw, 30px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    background: scrolled
      ? "rgba(255,255,255,0.94)"
      : "rgba(255,255,255,0.78)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: scrolled
      ? "1px solid rgba(196,151,42,0.30)"
      : "1px solid rgba(196,151,42,0.16)",
    boxShadow: scrolled
      ? "0 8px 32px rgba(15,29,61,0.12), 0 2px 8px rgba(15,29,61,0.06)"
      : "0 2px 12px rgba(15,29,61,0.05)",
    transition: [
      "top 0.38s cubic-bezier(0.22,1,0.36,1)",
      "left 0.38s cubic-bezier(0.22,1,0.36,1)",
      "right 0.38s cubic-bezier(0.22,1,0.36,1)",
      "height 0.38s cubic-bezier(0.22,1,0.36,1)",
      "border-radius 0.38s cubic-bezier(0.22,1,0.36,1)",
      "border-color 0.3s ease",
      "box-shadow 0.3s ease",
      "background 0.3s ease",
    ].join(", "),
  };

  return (
    <>
      <style>{CSS}</style>

      {/* ── FLOATING NAV ───────────────────────────────────────────────────── */}
      <nav style={navStyle} role="navigation" aria-label="Main navigation">

        {/* ── LOGOTYPE ── */}
        <button
          onClick={() => goTo("Home")}
          aria-label="EVS Healthcare Solutions — go to home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            flexShrink: 0,
            textAlign: "left",
          }}
        >
          <EVSLogo
            size={scrolled ? 40 : 46}
            style={{ transition: "width 0.38s ease, height 0.38s ease", flexShrink: 0 }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Line 1 */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, lineHeight: 1 }}>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 900,
                fontSize: scrolled ? 13 : 14.5,
                color: "#0f1d3d",
                letterSpacing: "0.05em",
                transition: "font-size 0.38s ease",
              }}>
                EVS
              </span>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: scrolled ? 11 : 12.5,
                color: "#0f1d3d",
                letterSpacing: "0.09em",
                transition: "font-size 0.38s ease",
              }}>
                HEALTHCARE SOLUTIONS
              </span>
            </div>
            {/* Line 2 */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: 2.5,
            }}>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: 8,
                color: "rgba(15,29,61,0.38)",
                letterSpacing: "0.20em",
                textTransform: "uppercase",
              }}>
                Ltd
              </span>
              <span style={{
                width: 2.5, height: 2.5, borderRadius: "50%",
                background: "#C4972A", display: "inline-block", flexShrink: 0,
              }} />
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontStyle: "italic",
                fontSize: 9,
                color: "#C4972A",
                letterSpacing: "0.01em",
                fontWeight: 400,
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
            gap: "clamp(18px, 2.2vw, 28px)",
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
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "calc(100% + 4px)",
                    height: 2,
                    background: "linear-gradient(90deg, #C4972A, #e8b84a)",
                    borderRadius: "99px 99px 0 0",
                  }}
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* ── DESKTOP CTA ── */}
        <button className="evs-apply evs-dsk" onClick={() => goTo("Register")}>
          Apply Now
        </button>

        {/* ── HAMBURGER (mobile only) ── */}
        <div className="evs-mob" style={{ marginLeft: "auto" }}>
          <button
            className="evs-burger"
            data-open={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="evs-drawer"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              width: 42,
              height: 42,
              background: menuOpen ? "rgba(196,151,42,0.10)" : "rgba(15,29,61,0.05)",
              border: `1px solid ${menuOpen ? "rgba(196,151,42,0.25)" : "rgba(15,29,61,0.10)"}`,
              borderRadius: 11,
              cursor: "pointer",
              padding: 0,
              flexShrink: 0,
              transition: "background 0.2s ease, border-color 0.2s ease",
            }}
          >
            <span className="evs-bar" />
            <span className="evs-bar" />
            <span className="evs-bar" />
          </button>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ─────────────────────────────────────────────────── */}
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
                width: "min(86%, 330px)",
                zIndex: 1010,
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                overflowX: "hidden",
                background: "rgba(10,22,40,0.97)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderLeft: "1px solid rgba(196,151,42,0.14)",
                boxShadow: "-16px 0 48px rgba(0,0,0,0.30)",
              }}
            >
              {/* Drawer header */}
              <motion.div
                variants={itemV}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 20px 16px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  flexShrink: 0,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <EVSLogo size={36} />
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                      <span style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 900, fontSize: 12.5,
                        color: "#ffffff", letterSpacing: "0.05em",
                      }}>
                        EVS
                      </span>
                      <span style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600, fontSize: 10.5,
                        color: "#ffffff", letterSpacing: "0.08em",
                      }}>
                        HEALTHCARE SOLUTIONS
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                      <span style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 7.5, fontWeight: 700,
                        color: "rgba(255,255,255,0.30)",
                        letterSpacing: "0.20em", textTransform: "uppercase",
                      }}>
                        Ltd
                      </span>
                      <span style={{
                        width: 2, height: 2, borderRadius: "50%",
                        background: "#C4972A", display: "inline-block",
                      }} />
                      <span style={{
                        fontFamily: "'Inter', sans-serif",
                        fontStyle: "italic", fontSize: 8.5,
                        color: "#C4972A", fontWeight: 400,
                      }}>
                        We care in time.
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  ref={closeRef}
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  style={{
                    width: 34, height: 34,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: "50%",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.45)",
                    fontSize: 14, flexShrink: 0,
                    transition: "background 0.18s ease, color 0.18s ease, border-color 0.18s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(196,151,42,0.14)";
                    e.currentTarget.style.color = "#C4972A";
                    e.currentTarget.style.borderColor = "rgba(196,151,42,0.30)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                  }}
                >
                  ✕
                </button>
              </motion.div>

              {/* Nav links */}
              <nav style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                padding: "12px 12px 8px",
                gap: 2,
              }}>
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

              {/* Drawer footer */}
              <motion.div
                variants={itemV}
                style={{
                  padding: "14px 20px calc(20px + env(safe-area-inset-bottom, 0px))",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  flexShrink: 0,
                }}
              >
                <button
                  className="evs-apply"
                  onClick={() => goTo("Register")}
                  style={{ width: "100%", padding: "13px 24px", fontSize: 15, borderRadius: 12 }}
                >
                  Apply Now →
                </button>

                <div style={{ textAlign: "center" }}>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 10, fontWeight: 600,
                    color: "rgba(255,255,255,0.26)",
                    marginBottom: 5,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                  }}>
                    24 / 7 Support
                  </p>
                  <a
                    href="tel:01772379989"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 18, fontWeight: 700,
                      color: "#C4972A",
                      textDecoration: "none",
                      letterSpacing: "0.03em",
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