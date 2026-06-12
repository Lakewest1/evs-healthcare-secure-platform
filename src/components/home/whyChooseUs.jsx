import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const EASE = {
  smooth: [0.16, 1, 0.3, 1],
  snappy: [0.25, 0.1, 0.25, 1],
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: EASE.smooth },
  },
});

const cardVariant = (delay = 0) => ({
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: EASE.smooth },
  },
});

const barVariant = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    originX: 0,
    transition: { duration: 0.7, ease: EASE.smooth },
  },
};

// ─── FIX #9-A: Uniform icon token constants ────────────────────────────────
// All cards now share identical icon container styling regardless of
// feature.accent. Previously NHS Opportunities used a blue accent which
// caused that icon background to deviate from the rest.
const ICON_BG     = "#FDF6E3";          // uniform cream
const ICON_BORDER = "rgba(196,151,42,0.18)"; // uniform gold ring
const ICON_COLOR  = "#8B6914";          // uniform dark gold (≥4.6:1 on cream)
const ICON_SIZE   = 52;                 // px — all containers identical
const ICON_RADIUS = 14;                 // px
// ──────────────────────────────────────────────────────────────────────────

// ─── FIX #9-B: accentRgb removed from NHS card — all accents unified ──────
// Previously feature id=4 (NHS Opportunities) had accent "#005EB8" / "0,94,184"
// which produced a blue icon background, blue bar, and blue stat text.
// Now every card uses the gold accent so the grid reads as one cohesive set.
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
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
  },
  {
    id: 4,
    number: "04",
    title: "NHS Opportunities",
    desc: "Roles in NHS trusts and leading private healthcare providers across North-West England.",
    stat: "150+",
    statLabel: "NHS partner sites",
    // ── FIX: was "#005EB8" / "0,94,184" — changed to gold so this card
    //    matches the other five. The NHS blue was breaking icon bg, bar
    //    colour, and stat text colour uniformity across the grid.
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
];

function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const isMobileRef = useRef(false);

  useEffect(() => {
    const check = () => { isMobileRef.current = window.innerWidth < 768; };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const onEnter = useCallback(() => { if (!isMobileRef.current) setHovered(true); }, []);
  const onLeave = useCallback(() => { if (!isMobileRef.current) setHovered(false); }, []);
  const onFocus = useCallback(() => { if (!isMobileRef.current) setHovered(true); }, []);
  const onBlur  = useCallback(() => { if (!isMobileRef.current) setHovered(false); }, []);
  const onTap   = useCallback(() => { if (isMobileRef.current) setExpanded(v => !v); }, []);

  const variants = cardVariant(index * 0.08);

  return (
    // ─── FIX #9-C: Cards fill their grid cell height via alignItems:"stretch"
    //    on the parent grid. height:"100%" here + flex-column layout ensures
    //    every card in a row reaches the same bottom edge, eliminating the
    //    jagged-bottom-edge problem caused by varying description lengths.
    <motion.article
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onTap}
      aria-label={feature.title}
      className="why-choose-card"
      style={{
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        background: "#ffffff",
        border: `1px solid ${hovered ? `rgba(${feature.accentRgb},0.28)` : "rgba(0,0,0,0.06)"}`,
        boxShadow: hovered
          ? `0 20px 40px rgba(15,29,61,0.12), 0 4px 12px rgba(15,29,61,0.06)`
          : `0 2px 8px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)`,
        transition: "box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        // ── FIX: height:100% lets the grid's alignItems:"stretch" drive
        //    all cards in a row to the same height automatically.
        height: "100%",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Image overlay on hover — unchanged */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
        transition={{ duration: 0.38, ease: EASE.smooth }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          pointerEvents: "none",
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${feature.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: hovered ? "scale(1)" : "scale(1.04)",
            transition: "transform 0.55s ease",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(160deg, rgba(${feature.accentRgb},0.88) 0%, rgba(${feature.accentRgb},0.72) 100%)`,
          }}
        />
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.3, delay: hovered ? 0.06 : 0, ease: EASE.smooth }}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: 28,
            color: "#fff",
          }}
        >
          {/* Hover overlay icon — also uses uniform sizing for consistency */}
          <div
            style={{
              width: ICON_SIZE,
              height: ICON_SIZE,
              borderRadius: ICON_RADIUS,
              background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
              color: "#fff",
            }}
          >
            {feature.icon}
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", marginBottom: 5 }}>
            EVS Healthcare
          </div>
          <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, fontWeight: 700, lineHeight: 1.25, marginBottom: 8, color: "#fff" }}>
            {feature.title}
          </h3>
          <div style={{ display: "flex", alignItems: "baseline", gap: 7, marginBottom: 10 }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1 }}>
              {feature.stat}
            </span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.72)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {feature.statLabel}
            </span>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.88)", marginBottom: 18 }}>
            {feature.desc}
          </p>
          <motion.div
            animate={{ width: hovered ? 36 : 0 }}
            transition={{ duration: 0.4, delay: 0.14, ease: EASE.smooth }}
            style={{ height: 2, background: "rgba(255,255,255,0.55)", borderRadius: 999 }}
          />
        </motion.div>
      </motion.div>

      {/* ── Default card face ─────────────────────────────────────────── */}
      <div style={{
        padding: "24px 24px 20px",
        display: "flex",
        flexDirection: "column",
        // ── FIX #9-D: flex:1 here makes the card body expand to fill the
        //    full height of the article element. The description paragraph
        //    at the bottom then uses flex:1 to push any remaining space
        //    downward, keeping the stat + bar always at the same vertical
        //    position across every card in a row.
        flex: 1,
        position: "relative",
        zIndex: 2,
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>

          {/* ── FIX #9-E: Uniform icon container ─────────────────────────
              Previously used feature.accent / feature.accentRgb for the
              icon background and border, which caused the NHS card (#4) to
              render a blue icon background while all others were cream/gold.
              Now ALL six cards share: ICON_BG cream, ICON_BORDER gold ring,
              ICON_COLOR dark gold, ICON_SIZE 52px, ICON_RADIUS 14px.
          ─────────────────────────────────────────────────────────────── */}
          <div
            style={{
              width: ICON_SIZE,
              height: ICON_SIZE,
              borderRadius: ICON_RADIUS,
              background: ICON_BG,
              border: `1px solid ${ICON_BORDER}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // ── All icons render in dark gold — uniform colour
              color: ICON_COLOR,
              flexShrink: 0,
            }}
          >
            {feature.icon}
          </div>

          <span
            aria-hidden="true"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "rgba(15,29,61,0.15)",
            }}
          >
            {feature.number}
          </span>
        </div>

        <h3 style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 18,
          fontWeight: 700,
          color: "#0f1d3d",
          marginBottom: 6,
          lineHeight: 1.3,
          letterSpacing: "-0.01em",
        }}>
          {feature.title}
        </h3>

        {/* Stat — uses feature.accent for the number so cards with different
            accent values can still have contextual colour here if desired.
            Since we've unified all accents to gold this is now always gold,
            but the pattern is kept so a future brand change only needs the
            FEATURES array updated, not the JSX. */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 7, margin: "10px 0 6px" }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            // ── Uses feature.accent — now uniformly gold for all 6 cards.
            color: feature.accent,
            lineHeight: 1,
          }}>
            {feature.stat}
          </span>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            fontWeight: 500,
            color: "#64748b",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}>
            {feature.statLabel}
          </span>
        </div>

        {/* Accent bar — also driven by feature.accent, so uniformly gold */}
        <motion.div
          variants={barVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            height: 2,
            width: 52,
            background: `linear-gradient(90deg, ${feature.accent}, rgba(${feature.accentRgb},0.15))`,
            borderRadius: 999,
            marginBottom: 14,
          }}
        />

        <div style={{ height: 1, background: "rgba(15,29,61,0.06)", marginBottom: 14 }} />

        {/* ── FIX #9-F: Description paragraph uses flex:1 so it grows to
            fill remaining card height. Cards with shorter descriptions
            naturally have more whitespace here rather than being shorter
            overall — all cards in a row stay bottom-aligned. */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13.5,
          fontWeight: 400,
          color: "#4a5568",
          lineHeight: 1.65,
          flex: 1,
        }}>
          {feature.desc}
        </p>

        <button
          onClick={(e) => { e.stopPropagation(); setExpanded(v => !v); }}
          aria-expanded={expanded}
          className="evs-expand-btn"
          style={{
            display: "none",
            alignItems: "center",
            gap: 5,
            marginTop: 14,
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            color: feature.accent,
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          <span>{expanded ? "Show less" : "Read more"}</span>
          <svg
            width="13" height="13" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round"
            style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }}
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
      </div>
    </motion.article>
  );
}

function HeroBanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp(0)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{
        position: "relative",
        width: "100%",
        borderRadius: 24,
        overflow: "hidden",
        marginBottom: 64,
        boxShadow: "0 20px 40px -12px rgba(15,29,61,0.15)",
        aspectRatio: "21 / 7",
        minHeight: 220,
      }}
    >
      <motion.div
        initial={{ scale: 1.06 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 1.2, ease: EASE.smooth }}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
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
        <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1.6rem, 4vw, 2.8rem)", fontWeight: 700, color: "#fff", marginBottom: 10, letterSpacing: "-0.01em", lineHeight: 1.2 }}>
          Exceptional Care,{" "}<span style={{ color: "#C4972A" }}>Trusted Service</span>
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.85)", fontSize: "clamp(13px, 1.5vw, 15px)", maxWidth: 480, lineHeight: 1.65 }}>
          Professional healthcare staffing solutions tailored to your needs
        </p>
      </motion.div>
    </motion.div>
  );
}

function SectionHeader() {
  const ref = useRef(null);
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
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "#C4972A" }}>
          Why Choose Us
        </span>
        <motion.div initial={{ scaleX: 0, originX: 1 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.6, delay: 0.2, ease: EASE.smooth }} style={{ width: 32, height: 2, background: "#C4972A", borderRadius: 999 }} />
      </motion.div>

      <motion.h2
        variants={fadeUp(0.1)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1.85rem, 4vw, 2.9rem)", fontWeight: 700, color: "#0f1d3d", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 16 }}
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
        private hospitals and care homes across North-West England.
      </motion.p>
    </div>
  );
}

function CtaStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp(0)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{ marginTop: 64, borderRadius: 24, background: "linear-gradient(135deg, #0f1d3d 0%, #1a2a50 100%)", padding: "clamp(36px, 5vw, 52px) clamp(28px, 5vw, 52px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 28, flexWrap: "wrap", position: "relative", overflow: "hidden" }}
    >
      <div aria-hidden="true" style={{ position: "absolute", top: -60, right: -60, width: 240, height: 240, borderRadius: "50%", border: "36px solid rgba(196,151,42,0.07)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C4972A", marginBottom: 8 }}>
          Ready to get started?
        </div>
        <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.28, letterSpacing: "-0.01em" }}>
          Join hundreds of healthcare<br />professionals placed by EVS.
        </h3>
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", position: "relative", zIndex: 1 }}>
        <motion.a href="#register" whileHover={{ scale: 1.04, boxShadow: "0 10px 28px rgba(196,151,42,0.45)" }} whileTap={{ scale: 0.97 }} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg, #C4972A, #8B6914)", color: "#0f1d3d", padding: "13px 30px", borderRadius: 50, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14, textDecoration: "none", letterSpacing: "0.03em", boxShadow: "0 4px 16px rgba(196,151,42,0.3)", whiteSpace: "nowrap" }}>
          Apply Now
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </motion.a>
        <motion.a href="tel:+441772379989" whileHover={{ scale: 1.03, background: "rgba(255,255,255,0.13)" }} whileTap={{ scale: 0.97 }} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", color: "#ffffff", padding: "13px 26px", borderRadius: 50, fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, textDecoration: "none", letterSpacing: "0.02em", border: "1px solid rgba(255,255,255,0.15)", whiteSpace: "nowrap" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .12h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
          </svg>
          01772 379989
        </motion.a>
      </div>
    </motion.div>
  );
}

function HorizontalScroll({ children }) {
  const containerRef = useRef(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  useEffect(() => {
    const check = () => setIsMobileView(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
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

export default function WhyChooseUs() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700;14..32,800;14..32,900&display=swap');

        *, *::before, *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }

        .evs-why-section {
          padding: 72px 5% 88px;
          background: #ffffff;
        }

        /* ── FIX #9-G: Grid gets alignItems:"stretch" so every card in a
           row grows to the height of the tallest card in that row.
           Previously this was absent, causing shorter-text cards to render
           at a smaller height and break the visual rhythm of the grid. */
        .evs-why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
          align-items: stretch; /* ← the key fix */
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
          .evs-why-section {
            padding: 52px 5% 68px;
          }
          .evs-expand-btn {
            display: flex !important;
          }
        }

        .evs-why-hscroll::-webkit-scrollbar { height: 3px; }
        .evs-why-hscroll::-webkit-scrollbar-track { background: rgba(196,151,42,0.08); border-radius: 3px; }
        .evs-why-hscroll::-webkit-scrollbar-thumb { background: #C4972A; border-radius: 3px; }
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