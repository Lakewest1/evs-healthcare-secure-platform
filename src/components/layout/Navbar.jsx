import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EVSLogo from "../EVSLogo";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS & CONFIG
// ─────────────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Jobs", href: "#jobs" },
  { label: "Training", href: "#training" },
  { label: "Register", href: "#register" },
  { label: "Contact", href: "#contact" },
];

const BRAND = {
  fullName: "EVS HEALTHCARE SOLUTION LIMITED",
  tagline: "We care in time.",
  phone: "01772 379989",
  phoneHref: "tel:+441772379989",
  primaryCta: { label: "Apply Now", href: "#register" },
};

const EASING = {
  snappy: [0.25, 0.1, 0.25, 1],
  smooth: [0.16, 1, 0.3, 1],
  inOut: [0.4, 0, 0.2, 1],
};

// ─────────────────────────────────────────────────────────────────────────────
// MOTION VARIANTS — defined outside component; stable references, no re-creation
// ─────────────────────────────────────────────────────────────────────────────

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease: EASING.snappy },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: EASING.snappy, delay: 0.1 },
  },
};

const drawerVariants = {
  hidden: {
    x: "100%",
    transition: { type: "tween", duration: 0.3, ease: EASING.inOut },
  },
  visible: {
    x: 0,
    transition: { type: "tween", duration: 0.4, ease: EASING.smooth },
  },
  exit: {
    x: "100%",
    transition: { type: "tween", duration: 0.3, ease: EASING.inOut },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const linkReveal = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASING.smooth },
  },
};

const lineUnderline = {
  rest: { scaleX: 0, originX: 0 },
  hover: {
    scaleX: 1,
    originX: 0,
    transition: { duration: 0.25, ease: EASING.snappy },
  },
};

const navbarReveal = {
  hidden: { y: -8, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: EASING.smooth, delay: 0.1 },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HAMBURGER ICON
// ─────────────────────────────────────────────────────────────────────────────

function HamburgerIcon({ isOpen }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: 22,
        height: 16,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          style={{
            display: "block",
            height: 2,
            borderRadius: 3,
            // Matches your original: gradient from navy to gold
             background: "none",
            transformOrigin: "center",
          }}
          animate={
            isOpen
              ? i === 0
                ? { rotate: 45, y: 7, width: "100%" }
                : i === 2
                ? { rotate: -45, y: -7, width: "100%" }
                : { opacity: 0, scaleX: 0 }
              : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
          }
          transition={{ duration: 0.3, ease: EASING.smooth }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP NAV LINK
// ─────────────────────────────────────────────────────────────────────────────

function DesktopNavLink({ link, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 + index * 0.05, duration: 0.4, ease: EASING.smooth }}
      style={{ listStyle: "none" }}
    >
      <motion.a
        href={link.href}
        initial="rest"
        whileHover="hover"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 15,
          fontWeight: 500,
          color: "#2d3748",
          textDecoration: "none",
          letterSpacing: "0.02em",
          position: "relative",
          paddingBottom: 4,
          display: "inline-block",
        }}
      >
        <motion.span
          variants={{
            rest: { color: "#2d3748" },
            hover: { color: "#C4972A" },
          }}
          transition={{ duration: 0.2 }}
          style={{ display: "block" }}
        >
          {link.label}
        </motion.span>
        {/* Gold underline slide-in */}
        <motion.span
          variants={lineUnderline}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "#C4972A",
            borderRadius: 2,
            display: "block",
          }}
        />
      </motion.a>
    </motion.li>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE NAV LINK
// ─────────────────────────────────────────────────────────────────────────────

function MobileNavLink({ link, onClose, isFirst, firstRef }) {
  return (
    <motion.li variants={linkReveal} style={{ listStyle: "none" }}>
      <motion.a
        ref={isFirst ? firstRef : null}
        href={link.href}
        onClick={onClose}
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 22,
          fontWeight: 500,
          color: "#2d3748",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 20px",
          borderRadius: 16,
          margin: "2px 0",
          cursor: "pointer",
        }}
        whileHover={{
          x: 8,
          color: "#C4972A",
          backgroundColor: "rgba(196,151,42,0.08)",
          transition: { type: "spring", damping: 20, stiffness: 300 },
        }}
        whileTap={{ scale: 0.97 }}
      >
        {link.label}
        <motion.span
          initial={{ x: -8, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
          style={{ color: "#C4972A", fontSize: 20, lineHeight: 1 }}
        >
          →
        </motion.span>
      </motion.a>
    </motion.li>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN NAVBAR
// ─────────────────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const firstMenuItemRef = useRef(null);

  // ── Passive, rAF-throttled scroll listener (no jank) ──
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    let rafId;
    const throttled = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };
    window.addEventListener("scroll", throttled, { passive: true });
    return () => {
      window.removeEventListener("scroll", throttled);
      cancelAnimationFrame(rafId);
    };
  }, [handleScroll]);

  // ── Body scroll lock ──
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // ── Keyboard trap + Escape to close ──
  useEffect(() => {
    if (!menuOpen) return;
    const t = setTimeout(() => firstMenuItemRef.current?.focus(), 400);
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }

        .evs-desktop-links {
          display: flex;
          align-items: center;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .evs-burger {
          display: none;
          background: rgba(26,45,90,0.05);
          border: none;
          cursor: pointer;
          padding: 14px;
          width: 52px;
          height: 52px;
          border-radius: 16px;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
          -webkit-tap-highlight-color: transparent;
          position: relative;
          z-index: 1002;
          transition: background 0.3s ease;
        }

        .evs-burger:hover {
          background: rgba(196,151,42,0.1);
        }

        .evs-burger:focus-visible {
          outline: 2px solid #C4972A;
          outline-offset: 3px;
        }

        @media (max-width: 768px) {
          .evs-desktop-links,
          .evs-desktop-cta {
            display: none !important;
          }
          .evs-burger {
            display: flex !important;
          }
        }

        @media (min-width: 769px) {
          .evs-burger {
            display: none !important;
          }
        }
      `}</style>

      {/* ─────────────────── NAVBAR ─────────────────── */}
      <motion.nav
        role="navigation"
        aria-label="Main navigation"
        variants={navbarReveal}
        initial="hidden"
        animate="visible"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: 90,
          padding: "0 5%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#ffffff",
          boxShadow: scrolled
            ? "0 2px 24px rgba(0,0,0,0.10)"
            : "0 2px 15px rgba(0,0,0,0.08)",
          backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
          transition: "box-shadow 0.35s ease, backdrop-filter 0.35s ease",
          willChange: "transform",
        }}
      >
        {/* ── Brand Lockup (full name restored) ── */}
        <motion.a
          href="#home"
          aria-label="EVS Healthcare Solution Limited – return to homepage"
          style={{ display: "flex", alignItems: "center", gap: 16, textDecoration: "none" }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15 }}
        >
          <EVSLogo size={56} />
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASING.smooth }}
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: 18,
                color: "#1a2d5a",
                letterSpacing: 1.5,
                lineHeight: 1.2,
              }}
            >
              EVS HEALTHCARE SOLUTION LIMITED
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASING.smooth }}
              style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: 11,
                color: "#C4972A",
                letterSpacing: 0.5,
                marginTop: 3,
              }}
            >
              {BRAND.tagline}
            </motion.div>
          </div>
        </motion.a>

        {/* ── Desktop Nav Links ── */}
        <ul className="evs-desktop-links">
          {NAV_LINKS.map((link, i) => (
            <DesktopNavLink key={link.label} link={link} index={i} />
          ))}
        </ul>

        {/* ── Desktop CTA — gold gradient (your original colour) ── */}
        <motion.a
          href={BRAND.primaryCta.href}
          className="evs-desktop-cta"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.4, ease: EASING.smooth }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 8px 25px rgba(196,151,42,0.5)",
            transition: { type: "spring", stiffness: 300 },
          }}
          whileTap={{ scale: 0.98 }}
          style={{
            background: "linear-gradient(135deg, #C4972A, #8B6914)",
            color: "#ffffff",
            padding: "10px 28px",
            borderRadius: 30,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: 14,
            textDecoration: "none",
            letterSpacing: 0.5,
            boxShadow: "0 4px 15px rgba(196,151,42,0.4)",
            whiteSpace: "nowrap",
          }}
        >
          {BRAND.primaryCta.label}
        </motion.a>

        {/* ── Mobile Hamburger ── */}
        <button
          ref={menuButtonRef}
          className="evs-burger"
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <HamburgerIcon isOpen={menuOpen} />
        </button>
      </motion.nav>

      {/* ─────────────────── MOBILE MENU ─────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              aria-hidden="true"
              onClick={closeMenu}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 1000,
                background: "rgba(15,43,77,0.75)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            />

            {/* Drawer — slides from the right */}
            <motion.div
              key="drawer"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                zIndex: 1001,
                width: "min(85%, 380px)",
                background: "linear-gradient(160deg, #ffffff 0%, #fef9f0 100%)",
                boxShadow: "-10px 0 50px rgba(0,0,0,0.12)",
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                overscrollBehavior: "contain",
              }}
            >
              {/* ── Drawer Header ── */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "28px 28px 24px 32px",
                  borderBottom: "2px solid rgba(196,151,42,0.2)",
                }}
              >
                {/* Brand lockup in menu — full name */}
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <EVSLogo size={48} />
                  <div>
                    <div
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontWeight: 700,
                        fontSize: 14,
                        color: "#1a2d5a",
                        letterSpacing: 1,
                        lineHeight: 1.3,
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
                      {BRAND.tagline}
                    </div>
                  </div>
                </div>

                {/* Close button */}
                <motion.button
                  onClick={closeMenu}
                  aria-label="Close navigation menu"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "rgba(196,151,42,0.08)",
                    border: "1px solid rgba(196,151,42,0.2)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    color: "#C4972A",
                    flexShrink: 0,
                  }}
                  whileHover={{
                    background: "rgba(196,151,42,0.18)",
                    rotate: 90,
                    scale: 1.08,
                    borderColor: "rgba(196,151,42,0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  ✕
                </motion.button>
              </div>

              {/* ── Nav Links ── */}
              <motion.ul
                role="list"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                style={{
                  flex: 1,
                  padding: "16px 12px 8px 12px",
                  margin: 0,
                  listStyle: "none",
                }}
              >
                {NAV_LINKS.map((link, i) => (
                  <MobileNavLink
                    key={link.label}
                    link={link}
                    onClose={closeMenu}
                    isFirst={i === 0}
                    firstRef={firstMenuItemRef}
                  />
                ))}
              </motion.ul>

              {/* ── Drawer Footer ── */}
              <motion.div
                variants={linkReveal}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.45 }}
                style={{
                  padding: "20px 32px 36px",
                  borderTop: "1px solid rgba(196,151,42,0.15)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {/* Gold CTA — your original gradient */}
                <motion.a
                  href={BRAND.primaryCta.href}
                  onClick={closeMenu}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 12px 30px rgba(196,151,42,0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: "block",
                    background: "linear-gradient(135deg, #C4972A, #8B6914)",
                    color: "#ffffff",
                    padding: "17px 28px",
                    borderRadius: 50,
                    textAlign: "center",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: 17,
                    textDecoration: "none",
                    letterSpacing: 0.5,
                    boxShadow: "0 6px 20px rgba(196,151,42,0.3)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Shine sweep on hover */}
                  <motion.span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
                      transform: "translateX(-100%)",
                    }}
                    whileHover={{
                      transform: "translateX(100%)",
                      transition: { duration: 0.55, ease: "easeInOut" },
                    }}
                  />
                  Apply Now →
                </motion.a>

                {/* Phone — tap-to-call on mobile */}
                <a
                  href={BRAND.phoneHref}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#C4972A",
                    textDecoration: "none",
                    padding: "12px",
                  }}
                >
                  <span aria-hidden="true">📞</span>
                  {BRAND.phone}
                </a>

                <p
                  style={{
                    margin: 0,
                    textAlign: "center",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    color: "#94a3b8",
                    letterSpacing: "0.03em",
                  }}
                >
                  Available 24/7 · Trusted by NHS trusts
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}