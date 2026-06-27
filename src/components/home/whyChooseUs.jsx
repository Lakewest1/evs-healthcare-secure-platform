import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ─────────────────────────────────────────────────────────────────────────────
// SCROLL REVEAL ARCHITECTURE
// ─────────────────────────────────────────────────────────────────────────────
// Strategy: Pure CSS keyframes executed on the GPU compositor thread.
// Only `opacity` and `transform` are animated — zero layout/paint triggers.
// JS (Framer Motion's existing useInView) only adds a CSS class once.
// No scroll listeners. No rAF loops. No new dependencies.
//
// Card directions per grid column:
//   Desktop 3-col: nth-child(3n+1)=LEFT · nth-child(3n+2)=UP · nth-child(3n+3)=RIGHT
//   Tablet  2-col: nth-child(odd)=LEFT  · nth-child(even)=RIGHT
//   Mobile  1-col: ALL=UP (horizontal slides on a single column cause
//                  Android scrollbar flash)
//
// Stagger: --delay CSS custom property set per card via inline style.
//   This avoids generating N individual CSS rules for N stagger offsets.
// ─────────────────────────────────────────────────────────────────────────────

const EASE = {
  smooth: [0.16, 1, 0.3, 1],
  snappy: [0.25, 0.1, 0.25, 1],
};

// Framer Motion variants — kept only for elements that already used them
// (HeroBanner, SectionHeader). Cards now use CSS keyframes.
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: EASE.smooth },
  },
});

const barVariant = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    originX: 0,
    transition: { duration: 0.7, ease: EASE.smooth },
  },
};

// ─── Icon token constants ──────────────────────────────────────────────────
const ICON_BG     = "#FDF6E3";
const ICON_BORDER = "rgba(196,151,42,0.18)";
const ICON_COLOR  = "#8B6914";
const ICON_SIZE   = 52;
const ICON_RADIUS = 14;

const FEATURES = [
  {
    id: 1,
    number: "01",
    title: "Fast Placement",
    desc: "Immediate start opportunities available for candidates with 5+ months experience in care settings.",
    stat: "48hrs",
    statLabel: "avg. placement time",
    accent: "#C4972A",
    accentRgb: "196,151,42",
    img: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=900&q=80",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    id: 2,
    number: "02",
    title: "Flexible Shifts",
    desc: "Day, night or weekend, local shifts designed to fit your lifestyle and family commitments.",
    stat: "24/7",
    statLabel: "support availability",
    accent: "#C4972A",
    accentRgb: "196,151,42",
    img: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=900&q=80",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    id: 3,
    number: "03",
    title: "Competitive Pay",
    desc: "Weekly pay with holiday pay included. Competitive rates across all grades and specialisms.",
    stat: "£18–£45",
    statLabel: "per hour rates",
    accent: "#C4972A",
    accentRgb: "196,151,42",
    img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=900&q=80",
   icon: (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {/* Curved stem: arc from top-right, curving over to left, then down */}
    <path d="M15.5 6.5a4 4 0 00-7 2.5V18"/>
    {/* Crossbar through the stem */}
    <line x1="6" y1="13" x2="14" y2="13"/>
    {/* Base stroke */}
    <line x1="6" y1="18" x2="18" y2="18"/>
  </svg>
),
  },
  {
    id: 4,
    number: "04",
    title: "NHS Opportunities",
    desc: "Roles in NHS trusts and leading private healthcare providers situated in North West England.",
    stat: "150+",
    statLabel: "NHS partner sites",
    accent: "#C4972A",
    accentRgb: "196,151,42",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=80",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    id: 5,
    number: "05",
    title: "Compliance Support",
    desc: "We handle your enhanced DBS check and all mandatory training including manual handling.",
    stat: "100%",
    statLabel: "compliance managed",
    accent: "#C4972A",
    accentRgb: "196,151,42",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
    ),
  },
  {
    id: 6,
    number: "06",
    title: "Career Growth",
    desc: "Ongoing training, mentorship and development pathways for every healthcare professional we place.",
    stat: "500+",
    statLabel: "workers placed",
    accent: "#C4972A",
    accentRgb: "196,151,42",
    img: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=900&q=80",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    id: 7,
    number: "07",
    title: "Temporary to Permanent Role",
    desc: "Start on a temporary basis with the opportunity to transition into a permanent position. A great way to find long-term employment while gaining valuable experience.",
    stat: "90%",
    statLabel: "conversion rate",
    accent: "#C4972A",
    accentRgb: "196,151,42",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 11 12 14 22 4"/>
      </svg>
    ),
  },
  {
    id: 8,
    number: "08",
    title: "Fixed Contract Role",
    desc: "Fixed-term contracts offering stability and guaranteed hours for a set period. Ideal for those seeking consistent work with a defined end date.",
    stat: "6–12",
    statLabel: "month contracts",
    accent: "#C4972A",
    accentRgb: "196,151,42",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&q=80",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>
      </svg>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FeatureCard — CSS keyframe scroll reveal
// ─────────────────────────────────────────────────────────────────────────────
// The card starts invisible via the `.wcu-card` base class.
// When useInView fires, we add `.wcu-revealed` which plays the keyframe.
// WHICH keyframe plays is controlled purely by CSS nth-child selectors —
// no JS needs to know the card's column position.
// ─────────────────────────────────────────────────────────────────────────────
function FeatureCard({ feature, index }) {
  const ref           = useRef(null);
  const inView        = useInView(ref, { once: true, amount: 0.12 });
  const [hovered,  setHovered]  = useState(false);
  const [expanded, setExpanded] = useState(false);
  const isMobileRef = useRef(false);

  useEffect(() => {
    const check = () => { isMobileRef.current = window.innerWidth < 768; };
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const onEnter = useCallback(() => { if (!isMobileRef.current) setHovered(true);  }, []);
  const onLeave = useCallback(() => { if (!isMobileRef.current) setHovered(false); }, []);
  const onFocus = useCallback(() => { if (!isMobileRef.current) setHovered(true);  }, []);
  const onBlur  = useCallback(() => { if (!isMobileRef.current) setHovered(false); }, []);
  const onTap   = useCallback(() => { if (isMobileRef.current)  setExpanded(v => !v); }, []);

  // CSS custom property drives the stagger delay — one rule covers all cards.
  // Cap at 0.4s so cards deep in the list don't wait too long on slow scroll.
  const delayS = `${Math.min(index * 0.08, 0.4)}s`;

  return (
    <motion.article
      ref={ref}
      // ── CSS reveal: class toggled by inView, keyframe does the work ──────
      className={`wcu-card${inView ? " wcu-revealed" : ""}`}
      style={{
        // Stagger injected as a CSS custom property, consumed in @keyframes rule
        "--wcu-delay": delayS,
        // ── Hover interaction (kept on inline style — these are dynamic) ──
        position:    "relative",
        borderRadius: 20,
        overflow:    "hidden",
        background:  "#ffffff",
        border:      `1px solid ${hovered ? `rgba(${feature.accentRgb},0.28)` : "rgba(0,0,0,0.06)"}`,
        boxShadow:   hovered
          ? `0 20px 40px rgba(15,29,61,0.12), 0 4px 12px rgba(15,29,61,0.06)`
          : `0 2px 8px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)`,
        transition:  "box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
        cursor:      "pointer",
        display:     "flex",
        flexDirection: "column",
        height:      "100%",
        transform:   hovered ? "translateY(-4px)" : "translateY(0)",
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onTap}
      aria-label={feature.title}
    >
      {/* ── Image overlay on hover (Framer Motion — desktop only) ────────── */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
        transition={{ duration: 0.38, ease: EASE.smooth }}
        style={{
          position: "absolute", inset: 0, zIndex: 10,
          pointerEvents: "none", borderRadius: 20, overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${feature.img})`,
            backgroundSize: "cover", backgroundPosition: "center",
            transform:  hovered ? "scale(1)" : "scale(1.04)",
            transition: "transform 0.55s ease",
          }}
        />
        <div
          style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(160deg, rgba(${feature.accentRgb},0.88) 0%, rgba(${feature.accentRgb},0.72) 100%)`,
          }}
        />
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.3, delay: hovered ? 0.06 : 0, ease: EASE.smooth }}
          style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column", justifyContent: "flex-end",
            padding: 28, color: "#fff",
          }}
        >
          <div style={{ width: ICON_SIZE, height: ICON_SIZE, borderRadius: ICON_RADIUS, background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, color: "#fff" }}>
            {feature.icon}
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", marginBottom: 5 }}>EVS Healthcare</div>
          <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 20, fontWeight: 700, lineHeight: 1.25, marginBottom: 8, color: "#fff" }}>{feature.title}</h3>
          <div style={{ display: "flex", alignItems: "baseline", gap: 7, marginBottom: 10 }}>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1 }}>{feature.stat}</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.72)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{feature.statLabel}</span>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.88)", marginBottom: 18 }}>{feature.desc}</p>
          <motion.div
            animate={{ width: hovered ? 36 : 0 }}
            transition={{ duration: 0.4, delay: 0.14, ease: EASE.smooth }}
            style={{ height: 2, background: "rgba(255,255,255,0.55)", borderRadius: 999 }}
          />
        </motion.div>
      </motion.div>

      {/* ── Default card face ─────────────────────────────────────────────── */}
      <div style={{ padding: "24px 24px 20px", display: "flex", flexDirection: "column", flex: 1, position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
          <div style={{ width: ICON_SIZE, height: ICON_SIZE, borderRadius: ICON_RADIUS, background: ICON_BG, border: `1px solid ${ICON_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", color: ICON_COLOR, flexShrink: 0 }}>
            {feature.icon}
          </div>
          <span aria-hidden="true" style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(15,29,61,0.15)" }}>
            {feature.number}
          </span>
        </div>

        <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 18, fontWeight: 700, color: "#0f1d3d", marginBottom: 6, lineHeight: 1.3, letterSpacing: "-0.01em" }}>
          {feature.title}
        </h3>

        <div style={{ display: "flex", alignItems: "baseline", gap: 7, margin: "10px 0 6px" }}>
          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em", color: feature.accent, lineHeight: 1 }}>
            {feature.stat}
          </span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {feature.statLabel}
          </span>
        </div>

        <motion.div
          variants={barVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ height: 2, width: 52, background: `linear-gradient(90deg, ${feature.accent}, rgba(${feature.accentRgb},0.15))`, borderRadius: 999, marginBottom: 14 }}
        />

        <div style={{ height: 1, background: "rgba(15,29,61,0.06)", marginBottom: 14 }} />

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, fontWeight: 400, color: "#4a5568", lineHeight: 1.65, flex: 1 }}>
          {feature.desc}
        </p>

        <button
          onClick={(e) => { e.stopPropagation(); setExpanded(v => !v); }}
          aria-expanded={expanded}
          className="evs-expand-btn"
          style={{ display: "none", alignItems: "center", gap: 5, marginTop: 14, background: "none", border: "none", padding: 0, cursor: "pointer", color: feature.accent, fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600 }}
        >
          <span>{expanded ? "Show less" : "Read more"}</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }} aria-hidden="true">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HeroBanner — unchanged Framer Motion (already animates correctly)
// ─────────────────────────────────────────────────────────────────────────────
function HeroBanner() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp(0)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{ position: "relative", width: "100%", borderRadius: 24, overflow: "hidden", marginBottom: 64, boxShadow: "0 20px 40px -12px rgba(15,29,61,0.15)", aspectRatio: "21 / 7", minHeight: 220 }}
    >
      <motion.div
        initial={{ scale: 1.06 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 1.2, ease: EASE.smooth }}
        style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=80')", backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(15,29,61,0.88) 0%, rgba(15,29,61,0.60) 100%)" }} />
      <div aria-hidden="true" style={{ position: "absolute", left: 0, top: "15%", bottom: "15%", width: 4, background: "linear-gradient(180deg, transparent, #C4972A, transparent)", borderRadius: "0 4px 4px 0" }} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.25, ease: EASE.smooth }}
        style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 clamp(20px, 5vw, 80px)" }}
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE.smooth }}
          style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(196,151,42,0.15)", border: "1.5px solid rgba(196,151,42,0.35)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C4972A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </motion.div>
        <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(1.6rem, 4vw, 2.8rem)", fontWeight: 700, color: "#fff", marginBottom: 10, letterSpacing: "-0.01em", lineHeight: 1.2 }}>
          Exceptional Care,{" "}<span style={{ color: "#C4972A" }}>Trusted Service</span>
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.85)", fontSize: "clamp(13px, 1.5vw, 15px)", maxWidth: 480, lineHeight: 1.65 }}>
          Professional healthcare staffing solutions tailored to your needs
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SectionHeader — unchanged Framer Motion
// ─────────────────────────────────────────────────────────────────────────────
function SectionHeader() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} style={{ textAlign: "center", marginBottom: 56 }}>
      <motion.div
        variants={fadeUp(0)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 18 }}
      >
        <motion.div initial={{ scaleX: 0, originX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.6, delay: 0.2, ease: EASE.smooth }} style={{ width: 32, height: 2, background: "#C4972A", borderRadius: 999 }} />
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "#C4972A" }}>Why Choose Us</span>
        <motion.div initial={{ scaleX: 0, originX: 1 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.6, delay: 0.2, ease: EASE.smooth }} style={{ width: 32, height: 2, background: "#C4972A", borderRadius: 999 }} />
      </motion.div>

      <motion.h2
        variants={fadeUp(0.1)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(1.85rem, 4vw, 2.9rem)", fontWeight: 700, color: "#0f1d3d", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 16 }}
      >
        Your Career,{" "}
        <span style={{ position: "relative", display: "inline-block" }}>
          <span style={{ color: "#C4972A" }}>Our Commitment</span>
          <motion.span
            initial={{ scaleX: 0, originX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.55, ease: EASE.smooth }}
            style={{ position: "absolute", bottom: -5, left: 0, right: 0, height: 2.5, background: "linear-gradient(90deg, #C4972A, rgba(196,151,42,0.2))", borderRadius: 999, display: "block" }}
          />
        </span>
      </motion.h2>

      <motion.p
        variants={fadeUp(0.2)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 400, color: "#4a5568", maxWidth: 520, margin: "0 auto", lineHeight: 1.65 }}
      >
        A 24/7 agency placing healthcare professionals into NHS trusts,
        private hospitals and care homes situated in North West England.
      </motion.p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CtaStrip — left/right split CSS reveals
// ─────────────────────────────────────────────────────────────────────────────
// The single fadeUp wrapper is replaced with two CSS-revealed children so
// the text panel slides in from the left and the buttons from the right.
// ─────────────────────────────────────────────────────────────────────────────
function CtaStrip() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const navigate = useNavigate();

  const goToJobs = (e) => {
    e.preventDefault();
    navigate("/jobs");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={ref}
      style={{
        marginTop: 64, borderRadius: 24,
        background: "linear-gradient(135deg, #0f1d3d 0%, #1a2a50 100%)",
        padding: "clamp(36px, 5vw, 52px) clamp(28px, 5vw, 52px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 28, flexWrap: "wrap", position: "relative", overflow: "hidden",
      }}
    >
      {/* Decorative circle */}
      <div aria-hidden="true" style={{ position: "absolute", top: -60, right: -60, width: 240, height: 240, borderRadius: "50%", border: "36px solid rgba(196,151,42,0.07)", pointerEvents: "none" }} />

      {/* Left text — slides in from the left */}
      <div
        className={`wcu-cta-left${inView ? " wcu-revealed" : ""}`}
        style={{ position: "relative", zIndex: 1 }}
      >
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C4972A", marginBottom: 8 }}>
          Ready to get started?
        </div>
        <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.28, letterSpacing: "-0.01em" }}>
          Join hundreds of healthcare<br />professionals placed by EVS.
        </h3>
      </div>

      {/* Right buttons — slides in from the right */}
      <div
        className={`wcu-cta-right${inView ? " wcu-revealed" : ""}`}
        style={{ display: "flex", gap: 12, flexWrap: "wrap", position: "relative", zIndex: 1 }}
      >
        <motion.a
          href="/jobs"
          whileHover={{ scale: 1.04, boxShadow: "0 10px 28px rgba(196,151,42,0.45)" }}
          whileTap={{ scale: 0.97 }}
          onClick={goToJobs}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg, #C4972A, #8B6914)", color: "#0f1d3d", padding: "13px 30px", borderRadius: 50, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14, textDecoration: "none", letterSpacing: "0.03em", boxShadow: "0 4px 16px rgba(196,151,42,0.3)", whiteSpace: "nowrap", cursor: "pointer" }}
        >
          Apply Now
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </motion.a>

        <motion.a
          href="tel:+441772379989"
          whileHover={{ scale: 1.03, background: "rgba(255,255,255,0.13)" }}
          whileTap={{ scale: 0.97 }}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", color: "#ffffff", padding: "13px 26px", borderRadius: 50, fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, textDecoration: "none", letterSpacing: "0.02em", border: "1px solid rgba(255,255,255,0.15)", whiteSpace: "nowrap" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .12h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
          </svg>
          01772288307
        </motion.a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HorizontalScroll — unchanged
// ─────────────────────────────────────────────────────────────────────────────
function HorizontalScroll({ children }) {
  const containerRef = useRef(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showLeft,  setShowLeft]  = useState(false);
  const [showRight, setShowRight] = useState(true);

  useEffect(() => {
    const check = () => setIsMobileView(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const onScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 20);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 20);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (el && isMobileView) {
      el.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => el.removeEventListener("scroll", onScroll);
    }
  }, [isMobileView, onScroll]);

  const scrollBy = (dir) => {
    containerRef.current?.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  if (!isMobileView) {
    return <div className="evs-why-grid">{children}</div>;
  }

  return (
    <div style={{ position: "relative" }}>
      <AnimatePresence>
        {showLeft && (
          <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={() => scrollBy("left")} aria-label="Scroll left" style={{ position: "absolute", left: -14, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", background: "#fff", border: "1px solid rgba(15,29,61,0.12)", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", cursor: "pointer", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C4972A" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showRight && (
          <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={() => scrollBy("right")} aria-label="Scroll right" style={{ position: "absolute", right: -14, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", background: "#fff", border: "1px solid rgba(15,29,61,0.12)", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", cursor: "pointer", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C4972A" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
          </motion.button>
        )}
      </AnimatePresence>
      <div ref={containerRef} className="evs-why-hscroll" style={{ display: "flex", overflowX: "auto", gap: 16, paddingBottom: 12, WebkitOverflowScrolling: "touch", scrollSnapType: "x mandatory" }}>
        {Array.isArray(children)
          ? children.map((child, i) => (
              <div key={i} style={{ flexShrink: 0, width: "min(80vw, 300px)", scrollSnapAlign: "start" }}>
                {child}
              </div>
            ))
          : children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WhyChooseUs — root export
// ─────────────────────────────────────────────────────────────────────────────
export default function WhyChooseUs() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700;14..32,800;14..32,900&family=Manrope:wght@400;500;600;700;800&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        /* ═══════════════════════════════════════════════════════════════════
           CSS SCROLL REVEAL KEYFRAMES
           Only opacity + transform are animated.
           Both are compositor-only — zero layout/paint on main thread.
           animation-fill-mode: both keeps elements invisible until they
           play, then keeps them visible after — prevents FOUC.
        ═══════════════════════════════════════════════════════════════════ */

        @keyframes wcuSlideLeft {
          from { opacity: 0; transform: translateX(-44px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        @keyframes wcuSlideRight {
          from { opacity: 0; transform: translateX(44px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        @keyframes wcuFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Card base: hidden until .wcu-revealed is added by inView ────── */
        .wcu-card {
          opacity: 0;
          /* No transform here — the keyframe sets the start state */
        }

        /* ── Revealed: play the right keyframe based on column position ─────
           Desktop 3-column grid:
             nth-child(3n+1) = col 1 → slide from LEFT
             nth-child(3n+2) = col 2 → fade UP
             nth-child(3n+3) = col 3 → slide from RIGHT

           The animation-delay is driven by --wcu-delay CSS custom property
           injected per card via inline style. One rule covers all 8 stagger
           values — no N-class explosion.

           animation-duration: 0.6s — fast enough to feel snappy, long enough
           to feel intentional. Slower than 0.8s feels sluggish on mobile.
        ─────────────────────────────────────────────────────────────────── */

        /* Desktop 3-col */
        .evs-why-grid .wcu-card.wcu-revealed:nth-child(3n+1) {
          animation: wcuSlideLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1)
                     var(--wcu-delay, 0s) both;
        }
        .evs-why-grid .wcu-card.wcu-revealed:nth-child(3n+2) {
          animation: wcuFadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)
                     var(--wcu-delay, 0s) both;
        }
        .evs-why-grid .wcu-card.wcu-revealed:nth-child(3n+3) {
          animation: wcuSlideRight 0.6s cubic-bezier(0.16, 1, 0.3, 1)
                     var(--wcu-delay, 0s) both;
        }

        /* ── CTA Strip left/right ─────────────────────────────────────────── */
        .wcu-cta-left {
          opacity: 0;
        }
        .wcu-cta-left.wcu-revealed {
          animation: wcuSlideLeft 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0s both;
        }

        .wcu-cta-right {
          opacity: 0;
        }
        .wcu-cta-right.wcu-revealed {
          animation: wcuSlideRight 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
        }

        /* ═══════════════════════════════════════════════════════════════════
           TABLET — 2-column grid (≤1050px ≥768px)
           Column directions change: odd=LEFT, even=RIGHT
           Override the nth-child(3n) rules above.
        ═══════════════════════════════════════════════════════════════════ */
        @media (max-width: 1050px) and (min-width: 768px) {
          .evs-why-grid .wcu-card.wcu-revealed:nth-child(3n+1),
          .evs-why-grid .wcu-card.wcu-revealed:nth-child(3n+2),
          .evs-why-grid .wcu-card.wcu-revealed:nth-child(3n+3) {
            animation: none; /* reset */
          }
          /* Re-apply with 2-col logic */
          .evs-why-grid .wcu-card.wcu-revealed:nth-child(odd) {
            animation: wcuSlideLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1)
                       var(--wcu-delay, 0s) both;
          }
          .evs-why-grid .wcu-card.wcu-revealed:nth-child(even) {
            animation: wcuSlideRight 0.6s cubic-bezier(0.16, 1, 0.3, 1)
                       var(--wcu-delay, 0s) both;
          }
        }

        /* ═══════════════════════════════════════════════════════════════════
           MOBILE — single-column horizontal scroll carousel (< 768px)
           No left/right slides: translateX on a single column causes
           Android to flash a horizontal scrollbar. All cards fade up.
           Horizontal scroll cards use .evs-why-hscroll parent, NOT .evs-why-grid,
           so the .evs-why-grid selectors don't apply anyway — but we add
           an explicit fade-up for the wcu-card wrapper inside the carousel.
        ═══════════════════════════════════════════════════════════════════ */
        @media (max-width: 767px) {
          /* Cards in the horizontal scroll carousel */
          .wcu-card.wcu-revealed {
            animation: wcuFadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)
                       var(--wcu-delay, 0s) both;
          }
          /* CTA strip: stack, both panels fade-up (no horizontal clips) */
          .wcu-cta-left.wcu-revealed,
          .wcu-cta-right.wcu-revealed {
            animation: wcuFadeUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0s both;
          }
        }

        /* ═══════════════════════════════════════════════════════════════════
           ACCESSIBILITY — honour prefers-reduced-motion.
           Skip ALL animations; elements jump straight to final visible state.
        ═══════════════════════════════════════════════════════════════════ */
        @media (prefers-reduced-motion: reduce) {
          .wcu-card,
          .wcu-cta-left,
          .wcu-cta-right {
            opacity: 1 !important;
            animation: none !important;
            transition-duration: 0.01ms !important;
          }
          /* Also covers Framer Motion transitions inside cards */
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* ═══════════════════════════════════════════════════════════════════
           LAYOUT
        ═══════════════════════════════════════════════════════════════════ */

        .evs-why-section {
          padding: 72px 5% 88px;
          background: #ffffff;
          /* Clip the off-screen translateX start positions to prevent
             horizontal scrollbar flash during animation on any browser */
          overflow-x: hidden;
        }

        .evs-why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
          align-items: stretch;
        }

        .why-choose-card {
          transition: box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease !important;
        }

        @media (max-width: 1050px) and (min-width: 768px) {
          .evs-why-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 18px;
          }
        }

        @media (max-width: 767px) {
          .evs-why-section { padding: 52px 5% 68px; }
          .evs-expand-btn  { display: flex !important; }
        }

        .evs-why-hscroll::-webkit-scrollbar        { height: 3px; }
        .evs-why-hscroll::-webkit-scrollbar-track  { background: rgba(196,151,42,0.08); border-radius: 3px; }
        .evs-why-hscroll::-webkit-scrollbar-thumb  { background: #C4972A; border-radius: 3px; }
      `}</style>

      <section className="evs-why-section" aria-labelledby="why-evs-heading" id="why">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <HeroBanner />
          <SectionHeader />
          <HorizontalScroll>
            {FEATURES.map((feature, idx) => (
              <FeatureCard key={feature.id} feature={feature} index={idx} />
            ))}
          </HorizontalScroll>
          <CtaStrip />
        </div>
      </section>
    </>
  );
}