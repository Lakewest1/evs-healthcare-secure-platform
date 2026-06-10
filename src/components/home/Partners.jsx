// components/home/Partners.jsx
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

// Lucide Icons for fallbacks and badges
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
// PERFORMANCE OPTIMIZED Partners
// Strategy: zero Framer Motion per card — all per-card animations are pure CSS
// running on the GPU compositor thread (transform / opacity only).
// Framer Motion kept ONLY for section header reveal (one staggered sequence).
// 
// UPDATED: Using actual organization logos instead of generic icons
// Logos are displayed on white pill backgrounds with grayscale → color on hover
// Fallback icons use Lucide React components instead of emojis
// ─────────────────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return [ref, isInView];
}

// ─────────────────────────────────────────────────────────────────────────────
// Partner Data with actual logo paths and Lucide fallback icons
// All logos should be placed in /public/images/partners/ directory
// ─────────────────────────────────────────────────────────────────────────────
const PARTNERS = [
  { 
    id: 1, 
    name: "NHS England", 
    logo: "../src/images/NSH.jpeg",
    fallbackIcon: Building2,
    fallbackColor: "#005EB8",
    website: "https://www.england.nhs.uk/"
  },
  { 
    id: 2, 
    name: "CQC", 
    logo: "../src/images/cqc.jpeg",
    fallbackIcon: ShieldCheck,
    fallbackColor: "#00A859",
    website: "https://www.cqc.org.uk/"
  },
  { 
    id: 3, 
    name: "DBS", 
    logo: "../src/images/dbs.jpeg",
    fallbackIcon: Shield,
    fallbackColor: "#C4972A",
    website: "https://www.gov.uk/government/organisations/disclosure-and-barring-service"
  },
  { 
    id: 4, 
    name: "Skills for Care", 
     logo: "../src/images/skillcare.jpeg",
    fallbackIcon: GraduationCap,
    fallbackColor: "#6C3B2A",
    website: "https://www.skillsforcare.org.uk/"
  },
  { 
    id: 5, 
    name: "Lancashire County Council", 
    logo: "../src/images/lacashire.jpeg",
    fallbackIcon: MapPin,
    fallbackColor: "#4A6FA5",
    website: "https://www.lancashire.gov.uk/"
  },
  { 
    id: 6, 
    name: "Homecare Association", 
     logo: "../src/images/homecare.jpeg",
    fallbackIcon: Heart,
    fallbackColor: "#7B2D8E",
    website: "https://www.homecareassociation.org.uk/"
  },
  { 
    id: 7, 
    name: "NCFE", 
     logo: "../src/images/ncfe.jpeg",
    fallbackIcon: Award,
    fallbackColor: "#E65100",
    website: "https://www.ncfe.org.uk/"
  },
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
    animation:
      pt-pop   0.45s cubic-bezier(0.22,1,0.36,1) both,
      pt-float 5s   ease-in-out infinite;
    animation-delay: calc(var(--i) * 0.15s), calc(var(--i) * 0.15s);
  }

  /* ── Card face — white pill background ── */
  .pt-face {
    position: absolute;
    inset: 0;
    border-radius: 20px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    overflow: hidden;
    transition: box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
  }
  .pt-card:hover .pt-face {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    border-color: rgba(196, 151, 42, 0.3);
    transform: scale(1.05);
  }

  /* ── Logo image styling ── */
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

  /* ── Fallback icon styling (Lucide icons) ── */
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

  /* ── Partner name label ── */
  .pt-label {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 10px;
    color: #4a5568;
    text-align: center;
    padding: 0 8px;
    line-height: 1.3;
    position: relative;
    z-index: 1;
    transition: color 0.2s ease;
  }
  .pt-card:hover .pt-label {
    color: #C4972A;
  }

  /* ── Rotating rings (decorative) ── */
  @keyframes pt-ring-cw  { to { transform: rotate(360deg);  } }
  @keyframes pt-ring-ccw { to { transform: rotate(-360deg); } }
  .pt-ring-cw {
    position: absolute;
    inset: -4px;
    border-radius: 20px;
    border: 1px solid rgba(196, 151, 42, 0.1);
    pointer-events: none;
    animation: pt-ring-cw  12s linear infinite;
  }
  .pt-ring-ccw {
    position: absolute;
    inset: -8px;
    border-radius: 24px;
    border: 1px solid rgba(196, 151, 42, 0.06);
    pointer-events: none;
    animation: pt-ring-ccw 15s linear infinite;
  }

  /* ── Pulse effect on hover ── */
  @keyframes pt-hover-pulse {
    from { transform: scale(1); opacity: 0.2; }
    to   { transform: scale(1.3); opacity: 0; }
  }
  .pt-hover-pulse {
    position: absolute;
    inset: 0;
    border-radius: 20px;
    background: rgba(196, 151, 42, 0.15);
    pointer-events: none;
    opacity: 0;
  }
  .pt-card:hover .pt-hover-pulse {
    animation: pt-hover-pulse 0.8s ease-out infinite;
  }

  /* ── Background blobs — CSS only ── */
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

  /* ── Mobile sizing ── */
  @media (max-width: 767px) {
    .pt-card   { width: 100px; height: 100px; margin: 0 8px; }
    .pt-logo   { width: 44px; height: 44px; margin-bottom: 6px; }
    .pt-fallback-icon { width: 38px; height: 38px; margin-bottom: 4px; }
    .pt-label  { font-size: 8.5px; }
  }

  /* ── Reduced motion ── */
  @media (prefers-reduced-motion: reduce) {
    .pt-track        { animation: pt-marquee var(--pt-speed, 45s) linear infinite; }
    .pt-card         { animation: none !important; }
    .pt-ring-cw,
    .pt-ring-ccw,
    .pt-hover-pulse,
    .pt-blob-a,
    .pt-blob-b       { animation: none !important; }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// PARTNER CARD — with actual logo, grayscale to color on hover
// Lucide fallback icons instead of emojis
// ─────────────────────────────────────────────────────────────────────────────
function PartnerCard({ partner, index }) {
  const [imgError, setImgError] = useState(false);
  const FallbackIcon = partner.fallbackIcon;

  const handleImageError = () => {
    setImgError(true);
  };

  const openPartnerWebsite = () => {
    window.open(partner.website, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="pt-card"
      style={{ "--i": index }}
      onClick={openPartnerWebsite}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          openPartnerWebsite();
        }
      }}
      aria-label={`Visit ${partner.name} website`}
    >
      <div className="pt-face">
        <div className="pt-hover-pulse" />
        
        {!imgError ? (
          <img
            src={partner.logo}
            alt={`${partner.name} logo`}
            className="pt-logo"
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="pt-fallback-icon">
            <FallbackIcon 
              size={40} 
              strokeWidth={1.5} 
              color={partner.fallbackColor}
            />
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
// INFINITE MARQUEE — CSS animation, no scroll-width measurement, no RAF loop
// ─────────────────────────────────────────────────────────────────────────────
function InfiniteMarquee({ items, isInView }) {
  const doubled = [...items, ...items];
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const speed = isMobile ? "40s" : "50s";

  return (
    <div
      style={{
        overflow: "hidden",
        position: "relative",
        width: "100%",
        padding: "20px 0",
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
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

  const TrophyIcon = Trophy;
  const BadgeCheckIcon = BadgeCheck;
  const AwardIcon = Award;

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
        {/* Animated background grid */}
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

        {/* Background blobs */}
        <div
          className="pt-blob-a"
          style={{
            position: "absolute",
            top: "5%", right: "2%",
            width: isMobile ? 180 : 280,
            height: isMobile ? 180 : 280,
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
            width: isMobile ? 200 : 320,
            height: isMobile ? 200 : 320,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,151,42,0.02), transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Top border */}
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

        {/* Bottom border */}
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

          {/* Section header */}
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
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "4px",
                  textTransform: "uppercase",
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

            {/* Subtitle */}
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

          {/* Marquee with actual partner logos */}
          <InfiniteMarquee items={PARTNERS} isInView={inView} />

          {/* Trust indicator badges */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={badgeContainerVariants}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: isMobile ? 40 : 56,
              gap: isMobile ? 12 : 16,
              flexWrap: "wrap",
            }}
          >
            <motion.div
              variants={badgeVariants}
              whileHover={{ scale: 1.03, y: -2 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: `${isMobile ? 6 : 8}px ${isMobile ? 16 : 20}px`,
                background: "rgba(196,151,42,0.08)",
                borderRadius: "50px",
                cursor: "default",
                border: "1px solid rgba(196,151,42,0.12)",
              }}
            >
              <TrophyIcon size={isMobile ? 14 : 16} style={{ color: "#C4972A" }} />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? 12 : 13,
                  fontWeight: 600,
                  color: "#C4972A",
                }}
              >
                7+ Trusted Partnerships
              </span>
            </motion.div>

            <motion.div
              variants={badgeVariants}
              whileHover={{ scale: 1.03, y: -2 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: `${isMobile ? 6 : 8}px ${isMobile ? 16 : 20}px`,
                background: "rgba(0,0,0,0.03)",
                borderRadius: "50px",
                cursor: "default",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <BadgeCheckIcon size={isMobile ? 14 : 16} style={{ color: "#4a5568" }} />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? 12 : 13,
                  fontWeight: 500,
                  color: "#64748b",
                }}
              >
                Full Compliance Certified
              </span>
            </motion.div>

            <motion.div
              variants={badgeVariants}
              whileHover={{ scale: 1.03, y: -2 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: `${isMobile ? 6 : 8}px ${isMobile ? 16 : 20}px`,
                background: "rgba(0,0,0,0.03)",
                borderRadius: "50px",
                cursor: "default",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ display: "flex", gap: 2 }}>
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Star key={i} size={isMobile ? 10 : 12} fill="#f0c060" stroke="#f0c060" style={{ color: "#f0c060" }} />
                ))}
              </div>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? 12 : 13,
                  fontWeight: 500,
                  color: "#64748b",
                }}
              >
                Rated Excellent
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}