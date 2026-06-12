// components/home/Partners.jsx
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

import {
  Star,
  Trophy,
  Award,
  BadgeCheck,
  Building2,
  Shield,
  GraduationCap,
  Handshake,
  MapPin,
  ShieldCheck,
  Heart,
  CheckCircle
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// STRATEGY:
//   Mobile (< 768px) — zero CSS animations, zero Framer Motion per card.
//   Renders a native CSS scroll-snap marquee: one row of cards that auto-scrolls,
//   pauses on hover, and uses native browser scrolling.
//
//   Desktop (≥ 768px) — original infinite marquee + float animations intact.
// ─────────────────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return [ref, isInView];
}

// Detect mobile once — stable, no re-evaluation on resize
const IS_MOBILE =
  typeof window !== "undefined" && window.innerWidth < 768;

// ─────────────────────────────────────────────────────────────────────────────
// PARTNER DATA
// ─────────────────────────────────────────────────────────────────────────────
const PARTNERS = [
  {
    id: 1,
    name: "NHS England",
    logo: "./src/images/NSH.jpeg",
    fallbackIcon: Building2,
    fallbackColor: "#005EB8",
    website: "https://www.england.nhs.uk/",
  },
  {
    id: 2,
    name: "CQC",
    logo: "./src/images/cqc.jpeg",
    fallbackIcon: ShieldCheck,
    fallbackColor: "#00A859",
    website: "https://www.cqc.org.uk/",
  },
  {
    id: 3,
    name: "DBS",
     logo: "./src/images/dbs.jpeg",
    fallbackIcon: Shield,
    fallbackColor: "#C4972A",
    website: "https://www.gov.uk/government/organisations/disclosure-and-barring-service",
  },
  {
    id: 4,
    name: "Skills for Care",
     logo: "./src/images/skillcare.jpeg",
    fallbackIcon: GraduationCap,
    fallbackColor: "#6C3B2A",
    website: "https://www.skillsforcare.org.uk/",
  },
  {
    id: 5,
    name: "Lancashire County Council",
     logo: "./src/images/lacashire.jpeg",
    fallbackIcon: MapPin,
    fallbackColor: "#4A6FA5",
    website: "https://www.lancashire.gov.uk/",
  },
  {
    id: 6,
    name: "Homecare Association",
     logo: "./src/images/homecare.jpeg",
    fallbackIcon: Heart,
    fallbackColor: "#7B2D8E",
    website: "https://www.homecareassociation.org.uk/",
  },
  {
    id: 7,
    name: "NCFE",
    logo: "./src/images/ncfe.jpeg",
    fallbackIcon: Award,
    fallbackColor: "#E65100",
    website: "https://www.ncfe.org.uk/",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CSS — desktop animations, mobile marquee with auto-scroll
// ─────────────────────────────────────────────────────────────────────────────
const CSS = `
  /* ============================================================ */
  /* DESKTOP: Original marquee animation (≥768px) */
  /* ============================================================ */
  @media (min-width: 768px) {
    @keyframes pt-marquee {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    .pt-track {
      display: flex;
      width: max-content;
      will-change: transform;
      animation: pt-marquee var(--pt-speed, 50s) linear infinite;
    }
    .pt-track:hover { animation-play-state: paused; }

    @keyframes pt-pop {
      from { opacity: 0; transform: scale(0.6); }
      to   { opacity: 1; transform: scale(1); }
    }
    @keyframes pt-float {
      0%,100% { transform: translateY(0) rotateZ(0deg); }
      25%     { transform: translateY(-4px) rotateZ(1deg); }
      75%     { transform: translateY(4px) rotateZ(-1deg); }
    }
    .pt-card {
      position: relative;
      flex-shrink: 0;
      cursor: pointer;
      margin: 0 12px;
      width: 120px;
      height: 120px;
      animation: pt-pop 0.45s cubic-bezier(0.22,1,0.36,1) both,
                 pt-float 5s ease-in-out infinite;
      animation-delay: calc(var(--i) * 0.15s), calc(var(--i) * 0.15s);
    }

    .pt-face {
      position: absolute;
      inset: 0;
      border-radius: 20px;
      background: #ffffff;
      border: 1px solid rgba(0,0,0,0.08);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      overflow: hidden;
      transition: box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
    }
    .pt-card:hover .pt-face {
      box-shadow: 0 8px 24px rgba(0,0,0,0.1);
      border-color: rgba(196,151,42,0.3);
      transform: scale(1.05);
    }

    .pt-logo {
      width: 56px;
      height: 56px;
      object-fit: contain;
      margin-bottom: 10px;
      filter: grayscale(100%);
      transition: filter 0.3s ease, transform 0.3s ease;
    }
    .pt-card:hover .pt-logo {
      filter: grayscale(0%);
      transform: scale(1.05);
    }

    .pt-fallback-icon {
      width: 48px;
      height: 48px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      filter: grayscale(100%);
      transition: filter 0.3s ease, transform 0.3s ease;
    }
    .pt-card:hover .pt-fallback-icon {
      filter: grayscale(0%);
      transform: scale(1.05);
    }

    .pt-label {
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      font-size: 10px;
      color: #4a5568;
      text-align: center;
      padding: 0 8px;
      line-height: 1.3;
      transition: color 0.2s ease;
    }
    .pt-card:hover .pt-label { color: #C4972A; }

    @keyframes pt-ring-cw  { to { transform: rotate(360deg);  } }
    @keyframes pt-ring-ccw { to { transform: rotate(-360deg); } }
    .pt-ring-cw {
      position: absolute;
      inset: -4px;
      border-radius: 20px;
      border: 1px solid rgba(196,151,42,0.1);
      pointer-events: none;
      animation: pt-ring-cw 12s linear infinite;
    }
    .pt-ring-ccw {
      position: absolute;
      inset: -8px;
      border-radius: 24px;
      border: 1px solid rgba(196,151,42,0.06);
      pointer-events: none;
      animation: pt-ring-ccw 15s linear infinite;
    }

    @keyframes pt-hover-pulse {
      from { transform: scale(1); opacity: 0.2; }
      to   { transform: scale(1.3); opacity: 0; }
    }
    .pt-hover-pulse {
      position: absolute;
      inset: 0;
      border-radius: 20px;
      background: rgba(196,151,42,0.15);
      pointer-events: none;
      opacity: 0;
    }
    .pt-card:hover .pt-hover-pulse {
      animation: pt-hover-pulse 0.8s ease-out infinite;
    }

    @keyframes pt-blob-a {
      0%,100% { transform: translate(0, 0); }
      25%     { transform: translate(12px, -16px); }
      75%     { transform: translate(-12px, 16px); }
    }
    @keyframes pt-blob-b {
      0%,100% { transform: translate(0, 0); }
      25%     { transform: translate(-12px, 16px); }
      75%     { transform: translate(12px, -16px); }
    }
    .pt-blob-a { animation: pt-blob-a 18s ease-in-out infinite; }
    .pt-blob-b { animation: pt-blob-b 22s ease-in-out infinite; }
  }

  /* ============================================================ */
  /* MOBILE MARQUEE — auto-scrolling marquee (pauses on hover) */
  /* ============================================================ */
  @media (max-width: 767px) {
    @keyframes pt-mobile-marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    
    .pt-mobile-marquee-container {
      overflow: hidden;
      position: relative;
      width: 100%;
      padding: 16px 0;
    }
    
    .pt-mobile-track {
      display: flex;
      width: max-content;
      animation: pt-mobile-marquee 40s linear infinite;
    }
    
    .pt-mobile-track:hover {
      animation-play-state: paused;
    }
    
    .pt-mobile-card {
      flex-shrink: 0;
      cursor: pointer;
      margin: 0 10px;
      width: 100px;
      height: 100px;
      background: #ffffff;
      border-radius: 16px;
      border: 1px solid rgba(0,0,0,0.08);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    }
    
    .pt-mobile-card:active {
      transform: scale(0.98);
    }
    
    .pt-mobile-logo {
      width: 42px;
      height: 42px;
      object-fit: contain;
      margin-bottom: 8px;
    }
    
    .pt-mobile-icon {
      width: 38px;
      height: 38px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .pt-mobile-label {
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      font-size: 8.5px;
      color: #4a5568;
      text-align: center;
      padding: 0 6px;
      line-height: 1.3;
    }
    
    /* Hide desktop elements on mobile */
    .pt-track, .pt-card, .pt-ring-cw, .pt-ring-ccw, .pt-hover-pulse, .pt-blob-a, .pt-blob-b {
      animation: none !important;
      display: none !important;
    }
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .pt-track, .pt-mobile-track, .pt-card, .pt-ring-cw, .pt-ring-ccw,
    .pt-hover-pulse, .pt-blob-a, .pt-blob-b {
      animation: none !important;
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP CARD — original design, no changes
// ─────────────────────────────────────────────────────────────────────────────
function DesktopCard({ partner, index }) {
  const [imgError, setImgError] = useState(false);
  const FallbackIcon = partner.fallbackIcon;

  const open = () => window.open(partner.website, "_blank", "noopener,noreferrer");

  return (
    <div
      className="pt-card"
      style={{ "--i": index }}
      onClick={open}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") open(); }}
      aria-label={`Visit ${partner.name} website`}
    >
      <div className="pt-face">
        <div className="pt-hover-pulse" />
        {!imgError ? (
          <img
            src={partner.logo}
            alt={`${partner.name} logo`}
            className="pt-logo"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="pt-fallback-icon">
            <FallbackIcon size={40} strokeWidth={1.5} color={partner.fallbackColor} />
          </div>
        )}
        <span className="pt-label">{partner.name}</span>
        <div className="pt-ring-cw" />
        <div className="pt-ring-ccw" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE MARQUEE CARD — static, no animations, no hover effects
// Auto-scrolling marquee that pauses on hover
// ─────────────────────────────────────────────────────────────────────────────
function MobileMarqueeCard({ partner }) {
  const [imgError, setImgError] = useState(false);
  const FallbackIcon = partner.fallbackIcon;

  const open = () => window.open(partner.website, "_blank", "noopener,noreferrer");

  return (
    <div
      className="pt-mobile-card"
      onClick={open}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") open(); }}
      aria-label={`Visit ${partner.name} website`}
    >
      {!imgError ? (
        <img
          src={partner.logo}
          alt={`${partner.name} logo`}
          className="pt-mobile-logo"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      ) : (
        <div className="pt-mobile-icon">
          <FallbackIcon size={28} strokeWidth={1.5} color={partner.fallbackColor} />
        </div>
      )}
      <span className="pt-mobile-label">{partner.name}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE MARQUEE — auto-scrolling marquee with doubled items for seamless loop
// ─────────────────────────────────────────────────────────────────────────────
function MobileMarquee({ items }) {
  // Double the items for seamless infinite scroll
  const doubledItems = [...items, ...items];

  return (
    <div className="pt-mobile-marquee-container">
      <div className="pt-mobile-track">
        {doubledItems.map((partner, idx) => (
          <MobileMarqueeCard key={`${partner.id}-${idx}`} partner={partner} />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP MARQUEE — original, no changes
// ─────────────────────────────────────────────────────────────────────────────
function DesktopMarquee({ items, isInView }) {
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        overflow: "hidden",
        position: "relative",
        width: "100%",
        padding: "20px 0",
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      {isInView && (
        <div className="pt-track" style={{ "--pt-speed": "50s" }}>
          {doubled.map((partner, idx) => (
            <DesktopCard
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
// Framer Motion variants — header only, unchanged
// ─────────────────────────────────────────────────────────────────────────────
const headerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.15 },
  },
};
const childVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
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
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function Partners() {
  const [ref, inView] = useReveal(0.15);

  return (
    <>
      <style>{CSS}</style>

      <section
        ref={ref}
        style={{
          padding: "clamp(50px, 8vh, 80px) clamp(16px, 5vw, 80px)",
          background: "#ffffff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated background grid — desktop only */}
        {!IS_MOBILE && (
          <motion.div
            animate={{ opacity: inView ? 0.03 : 0 }}
            transition={{ duration: 1 }}
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                radial-gradient(circle at 20% 50%, rgba(196,151,42,0.06) 0%, transparent 50%),
                repeating-linear-gradient(45deg, #C4972A 0px, #C4972A 1px, transparent 1px, transparent 30px)
              `,
              backgroundSize: "100% 100%, 30px 30px",
              pointerEvents: "none",
            }}
          />
        )}

        {/* Background blobs — desktop only */}
        {!IS_MOBILE && (
          <>
            <div
              className="pt-blob-a"
              style={{
                position: "absolute",
                top: "5%", right: "2%",
                width: 280, height: 280,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(196,151,42,0.03), transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <div
              className="pt-blob-b"
              style={{
                position: "absolute",
                bottom: "5%", left: "2%",
                width: 320, height: 320,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(196,151,42,0.02), transparent 70%)",
                pointerEvents: "none",
              }}
            />
          </>
        )}

        {/* Top gold border */}
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

        {/* Bottom gold border */}
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

          {/* Section header — Framer Motion, unchanged */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{ textAlign: "center", marginBottom: IS_MOBILE ? 32 : 56 }}
          >
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
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "4px", textTransform: "uppercase", color: "#C4972A" }}>
                Trusted Partners
              </span>
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: 30 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{ height: 2, background: "#C4972A", borderRadius: 999 }}
              />
            </motion.div>

            <motion.h2
              variants={childVariants}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)",
                fontWeight: 800,
                color: "#0f1d3d",
                letterSpacing: "-0.02em",
                marginBottom: 16,
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

            <motion.p
              variants={childVariants}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: "#4a5568",
                maxWidth: 520,
                margin: "0 auto",
                lineHeight: 1.65,
              }}
            >
              We're proud to work with and be recognized by industry leaders across healthcare
            </motion.p>
          </motion.div>

          {/* ── CONDITIONAL RENDER: mobile marquee vs desktop marquee ── */}
          {IS_MOBILE ? (
            <MobileMarquee items={PARTNERS} />
          ) : (
            <DesktopMarquee items={PARTNERS} isInView={inView} />
          )}

          {/* Trust badges — unchanged */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={badgeContainerVariants}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: IS_MOBILE ? 32 : 56,
              gap: IS_MOBILE ? 10 : 16,
              flexWrap: "wrap",
            }}
          >
            <motion.div
              variants={badgeVariants}
              whileHover={IS_MOBILE ? {} : { scale: 1.03, y: -2 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: IS_MOBILE ? "6px 14px" : "8px 20px",
                background: "rgba(196,151,42,0.08)",
                borderRadius: "50px",
                cursor: "default",
                border: "1px solid rgba(196,151,42,0.12)",
              }}
            >
              <Trophy size={IS_MOBILE ? 13 : 16} style={{ color: "#C4972A" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: IS_MOBILE ? 11 : 13, fontWeight: 600, color: "#C4972A" }}>
                7+ Trusted Partnerships
              </span>
            </motion.div>

            <motion.div
              variants={badgeVariants}
              whileHover={IS_MOBILE ? {} : { scale: 1.03, y: -2 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: IS_MOBILE ? "6px 14px" : "8px 20px",
                background: "rgba(0,0,0,0.03)",
                borderRadius: "50px",
                cursor: "default",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <BadgeCheck size={IS_MOBILE ? 13 : 16} style={{ color: "#4a5568" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: IS_MOBILE ? 11 : 13, fontWeight: 500, color: "#64748b" }}>
                Full Compliance Certified
              </span>
            </motion.div>

            <motion.div
              variants={badgeVariants}
              whileHover={IS_MOBILE ? {} : { scale: 1.03, y: -2 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: IS_MOBILE ? "6px 14px" : "8px 20px",
                background: "rgba(0,0,0,0.03)",
                borderRadius: "50px",
                cursor: "default",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ display: "flex", gap: 2 }}>
                {[1,2,3,4,5].map((_, i) => (
                  <Star key={i} size={IS_MOBILE ? 10 : 12} fill="#f0c060" stroke="#f0c060" style={{ color: "#f0c060" }} />
                ))}
              </div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: IS_MOBILE ? 11 : 13, fontWeight: 500, color: "#64748b" }}>
                Rated Excellent
              </span>
            </motion.div>
          </motion.div>

        </div>
      </section>
    </>
  );
}