// components/home/Partners.jsx
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Lucide Icons
import {
  Building2,
  Shield,
  GraduationCap,
  Handshake,
  Star,
  MapPin,
  CheckCircle,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// PERFORMANCE OPTIMIZED Partners
// Strategy: zero Framer Motion per card — all per-card animations are pure CSS
// running on the GPU compositor thread (transform / opacity only).
// Framer Motion kept ONLY for section header reveal (one staggered sequence).
// ─────────────────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return [ref, isInView];
}

// ─────────────────────────────────────────────────────────────────────────────
// Partner Data
// ─────────────────────────────────────────────────────────────────────────────
const PARTNERS = [
  { id: 1, name: "NHS England",       color: "#005EB8", icon: Building2    },
  { id: 2, name: "CQC Approved",      color: "#00A859", icon: Shield       },
  { id: 3, name: "DBS Partner",       color: "#C4972A", icon: Shield       },
  { id: 4, name: "Skills for Care",   color: "#6C3B2A", icon: GraduationCap},
  { id: 5, name: "Care Quality",      color: "#2C5F8A", icon: Star         },
  { id: 6, name: "Lancashire County", color: "#4A6FA5", icon: MapPin       },
  { id: 7, name: "UKHCA",             color: "#7B2D8E", icon: Handshake    },
  { id: 8, name: "NCFE",              color: "#E65100", icon: GraduationCap},
];

// ─────────────────────────────────────────────────────────────────────────────
// CSS — all card animations in one <style> block, compositor-thread only
// ─────────────────────────────────────────────────────────────────────────────
const CSS = `
  /* ── Marquee track ── */
  @keyframes pt-marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .pt-track {
    display: flex;
    width: max-content;
    will-change: transform;
    animation: pt-marquee var(--pt-speed, 45s) linear infinite;
  }
  .pt-track:hover { animation-play-state: paused; }

  /* ── Card entrance + float (one combined animation chain) ── */
  @keyframes pt-pop {
    from { opacity: 0; transform: scale(0.6); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes pt-float {
    0%,100% { transform: translateY(0)   rotateZ(0deg); }
    25%     { transform: translateY(-6px) rotateZ(1.5deg); }
    75%     { transform: translateY(6px)  rotateZ(-1.5deg); }
  }
  .pt-card {
    position: relative;
    flex-shrink: 0;
    cursor: pointer;
    margin: 0 10px;
    width: 110px;
    height: 110px;
    animation:
      pt-pop   0.45s cubic-bezier(0.22,1,0.36,1) both,
      pt-float 5s   ease-in-out infinite;
    animation-delay: calc(var(--i) * 0.2s), calc(var(--i) * 0.2s);
  }

  /* ── Ball face ── */
  .pt-face {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: linear-gradient(135deg, #ffffff, #fefcf8);
    border: 1.5px solid rgba(196,151,42,0.20);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.04), 0 0 0 1px rgba(196,151,42,0.08);
    overflow: hidden;
    transition: box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
  }
  .pt-card:hover .pt-face {
    box-shadow:
      0 0 22px rgba(196,151,42,0.38),
      0 6px 20px rgba(0,0,0,0.08),
      0 0 0 1px rgba(196,151,42,0.20);
    border-color: rgba(196,151,42,0.45);
    transform: scale(1.06);
  }

  /* ── Inner gradient pulse ── */
  @keyframes pt-pulse {
    0%,100% { opacity: 0.05; }
    50%      { opacity: 0.15; }
  }
  .pt-inner-pulse {
    position: absolute;
    inset: 8px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(196,151,42,0.08), transparent 70%);
    pointer-events: none;
    animation: pt-pulse 3s ease-in-out infinite;
  }

  /* ── Sweep shimmer on hover ── */
  .pt-sweep {
    position: absolute;
    top: 0; left: -55%;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(196,151,42,0.15), transparent);
    transform: skewX(-20deg);
    pointer-events: none;
    opacity: 0;
  }
  @keyframes pt-sweep {
    from { left: -55%; opacity: 0.4; }
    to   { left: 110%; opacity: 0.4; }
  }
  .pt-card:hover .pt-sweep {
    animation: pt-sweep 1.2s ease-in-out infinite;
  }

  /* ── Icon micro-bounce on hover ── */
  .pt-icon {
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  .pt-card:hover .pt-icon {
    transform: scale(1.12) rotate(-3deg);
  }

  /* ── Partner name label ── */
  .pt-label {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 10px;
    color: #475569;
    text-align: center;
    padding: 0 8px;
    line-height: 1.3;
    position: relative;
    z-index: 1;
    opacity: 0.9;
    transition: opacity 0.2s ease;
  }
  .pt-card:hover .pt-label { opacity: 1; }

  /* ── Rotating rings ── */
  @keyframes pt-ring-cw  { to { transform: rotate(360deg);  } }
  @keyframes pt-ring-ccw { to { transform: rotate(-360deg); } }
  .pt-ring-cw {
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 1px solid rgba(196,151,42,0.15);
    pointer-events: none;
    animation: pt-ring-cw  10s linear infinite;
  }
  .pt-ring-ccw {
    position: absolute;
    inset: -7px;
    border-radius: 50%;
    border: 1px solid rgba(196,151,42,0.08);
    pointer-events: none;
    animation: pt-ring-ccw 12s linear infinite;
  }

  /* ── Pulsing outer ring on hover ── */
  @keyframes pt-hover-ring {
    from { transform: scale(1); opacity: 0.4; }
    to   { transform: scale(1.4); opacity: 0;  }
  }
  .pt-hover-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 1.5px solid var(--partner-color, #C4972A);
    pointer-events: none;
    opacity: 0;
    animation: none;
  }
  .pt-card:hover .pt-hover-ring {
    animation: pt-hover-ring 1.2s ease-out infinite;
  }

  /* ── Background blobs — CSS only, no JS ── */
  @keyframes pt-blob-a {
    0%,100% { transform: translate(0, 0); }
    25%     { transform: translate(15px, -20px); }
    75%     { transform: translate(-15px, 20px); }
  }
  @keyframes pt-blob-b {
    0%,100% { transform: translate(0, 0); }
    25%     { transform: translate(-15px, 20px); }
    75%     { transform: translate(15px, -20px); }
  }
  .pt-blob-a { animation: pt-blob-a 18s ease-in-out infinite; }
  .pt-blob-b { animation: pt-blob-b 22s ease-in-out infinite; }

  /* ── Mobile sizing ── */
  @media (max-width: 767px) {
    .pt-card   { width: 85px; height: 85px; }
    .pt-label  { font-size: 8.5px; }
    .pt-icon svg { width: 22px !important; height: 22px !important; }
  }

  /* ── Reduced motion ── */
  @media (prefers-reduced-motion: reduce) {
    .pt-track        { animation: pt-marquee var(--pt-speed, 45s) linear infinite; }
    .pt-card         { animation: none !important; }
    .pt-ring-cw,
    .pt-ring-ccw,
    .pt-inner-pulse,
    .pt-hover-ring,
    .pt-sweep,
    .pt-blob-a,
    .pt-blob-b       { animation: none !important; }
  }

  /* ── Ultra-mobile border thinning ── */
  @media (max-width: 480px) {
    .pt-face { border-width: 1px; }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// PARTNER CARD — pure HTML + CSS, zero JS animation overhead
// ─────────────────────────────────────────────────────────────────────────────
function PartnerCard({ partner, index }) {
  const Icon = partner.icon;
  return (
    <div
      className="pt-card"
      style={{ "--i": index, "--partner-color": partner.color }}
    >
      <div className="pt-face">
        <div className="pt-inner-pulse" />
        <div className="pt-sweep" />

        <div className="pt-icon">
          <Icon size={28} strokeWidth={1.8} color={partner.color} />
        </div>

        <span className="pt-label">{partner.name}</span>

        <div className="pt-ring-cw" />
        <div className="pt-ring-ccw" />
        <div className="pt-hover-ring" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INFINITE MARQUEE — CSS animation, no scroll-width measurement, no RAF loop
// ─────────────────────────────────────────────────────────────────────────────
function InfiniteMarquee({ items, isInView }) {
  const doubled = [...items, ...items];
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const speed = isMobile ? "35s" : "45s";

  return (
    <div
      style={{
        overflow: "hidden",
        position: "relative",
        width: "100%",
        padding: "16px 0",
        maskImage:
          "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
      }}
    >
      {isInView && (
        <div className="pt-track" style={{ "--pt-speed": speed }}>
          {doubled.map((partner, idx) => (
            <PartnerCard
              key={`${partner.id}-${idx}`}
              partner={partner}
              index={idx % items.length}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Framer Motion variants — used ONLY for the header (one set, not per card)
// ─────────────────────────────────────────────────────────────────────────────
const headerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.15 },
  },
};
const childVariants = {
  hidden:   { opacity: 0, y: 20 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
const badgeContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
};
const badgeVariants = {
  hidden:  { opacity: 0, y: 20, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, type: "spring" } },
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PARTNERS COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function Partners() {
  const [ref, inView] = useReveal(0.15);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <>
      <style>{CSS}</style>

      <section
        ref={ref}
        style={{
          padding: "clamp(50px, 8vh, 80px) clamp(16px, 5vw, 80px)",
          background: "linear-gradient(135deg, #ffffff 0%, #fefcf8 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated background grid — one Framer instance, not per-card */}
        <motion.div
          animate={{ opacity: inView ? 0.03 : 0 }}
          transition={{ duration: 1 }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(196,151,42,0.08) 0%, transparent 50%),
              repeating-linear-gradient(45deg, #C4972A 0px, #C4972A 1px, transparent 1px, transparent 20px)
            `,
            backgroundSize: "100% 100%, 30px 30px",
            pointerEvents: "none",
          }}
        />

        {/* Background blobs — pure CSS, zero JS */}
        <div
          className="pt-blob-a"
          style={{
            position: "absolute",
            top: "5%", right: "2%",
            width: isMobile ? 180 : 280,
            height: isMobile ? 180 : 280,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,151,42,0.04), transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="pt-blob-b"
          style={{
            position: "absolute",
            bottom: "5%", left: "2%",
            width: isMobile ? 200 : 320,
            height: isMobile ? 200 : 320,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,151,42,0.03), transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Top border — one Framer instance */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg, transparent, #C4972A, #f0c060, #C4972A, transparent)",
            transformOrigin: "left",
          }}
        />

        {/* Bottom border — one Framer instance */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg, transparent, #C4972A, #f0c060, #C4972A, transparent)",
            transformOrigin: "right",
          }}
        />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>

          {/* ── Section header — Framer Motion stagger (runs ONCE on reveal) ── */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{ textAlign: "center", marginBottom: isMobile ? 40 : 56 }}
          >
            {/* Eyebrow */}
            <motion.div
              variants={childVariants}
              style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: 30 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ height: 2, background: "#C4972A", borderRadius: 999 }}
              />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11, fontWeight: 800,
                  letterSpacing: "4px", textTransform: "uppercase",
                  color: "#C4972A",
                }}
              >
                Trusted Partners
              </span>
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: 30 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{ height: 2, background: "#C4972A", borderRadius: 999 }}
              />
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={childVariants}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)",
                fontWeight: 800, color: "#0f1d3d",
                letterSpacing: "-0.02em", marginBottom: 16,
              }}
            >
              Trusted By Leading{" "}
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
                style={{
                  display: "inline-block",
                  background: "linear-gradient(135deg, #C4972A, #e8b84a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Organizations
              </motion.span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              variants={childVariants}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14, color: "#64748b",
                maxWidth: 520, margin: "0 auto", lineHeight: 1.65,
              }}
            >
              We're proud to work with and be recognized by industry leaders across healthcare
            </motion.p>
          </motion.div>

          {/* ── Marquee — pure CSS per card ── */}
          <InfiniteMarquee items={PARTNERS} isInView={inView} />

          {/* ── Trust indicator badges — stagger runs ONCE on reveal ── */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={badgeContainerVariants}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              marginTop: isMobile ? 40 : 56,
              gap: isMobile ? 12 : 16,
              flexWrap: "wrap",
            }}
          >
            {[
              { icon: "🏆", text: "8+ Trusted Partnerships", highlight: true },
              { icon: "✓",  text: "Full Compliance Certified" },
              { icon: "⭐", text: "Rated Excellent" },
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                variants={badgeVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: `${isMobile ? 6 : 8}px ${isMobile ? 16 : 20}px`,
                  background: badge.highlight ? "rgba(196,151,42,0.08)" : "rgba(0,0,0,0.03)",
                  borderRadius: "50px",
                  cursor: "default",
                }}
              >
                <span style={{ fontSize: isMobile ? 14 : 16 }}>{badge.icon}</span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: isMobile ? 12 : 13,
                    fontWeight: badge.highlight ? 600 : 500,
                    color: badge.highlight ? "#C4972A" : "#64748b",
                  }}
                >
                  {badge.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}