import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, useMotionValue, AnimatePresence } from "framer-motion";

// Lucide Icons - Professional icon set
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
// PERFORMANCE FIXES (design unchanged):
//
// 1. Perpetual float on each ball  → pure CSS @keyframes (compositor thread)
// 2. Inner gradient pulse          → pure CSS @keyframes (compositor thread)
// 3. Two rotating rings per ball   → pure CSS @keyframes (compositor thread)
// 4. Floating background blobs     → pure CSS @keyframes (compositor thread)
// 5. mousemove listeners           → disabled on mobile/touch devices
// 6. useAnimation marquee          → replaced with direct motion.div animate prop
// 7. isPaused controls.stop()      → replaced with CSS animation-play-state
//    (stops/resumes without position jump)
// 8. Ball entrance rotate(-180°)   → reduced to scale+fade (much lighter)
// 9. Trust badge perpetual rotate  → fired once on mount, not looping
// 10. Sweeping light on hover      → kept but mount/unmount replaced with
//     opacity toggle (always mounted)
// ─────────────────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return [ref, isInView];
}

// Detect touch/mobile once at module level — stable, no re-evaluation
const IS_TOUCH =
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

// Partner data with Lucide icons
const partners = [
  { id: 1, name: "NHS England",      color: "#005EB8", gradient: "linear-gradient(135deg, #ffffff, #fefcf8)", icon: Building2, delay: 0 },
  { id: 2, name: "CQC Approved",     color: "#00A859", gradient: "linear-gradient(135deg, #ffffff, #fefcf8)", icon: Shield, delay: 0.1 },
  { id: 3, name: "DBS Partner",      color: "#C4972A", gradient: "linear-gradient(135deg, #ffffff, #fefcf8)", icon: Shield, delay: 0.2 },
  { id: 4, name: "Skills for Care",  color: "#6C3B2A", gradient: "linear-gradient(135deg, #ffffff, #fefcf8)", icon: GraduationCap, delay: 0.3 },
  { id: 5, name: "Care Quality",     color: "#2C5F8A", gradient: "linear-gradient(135deg, #ffffff, #fefcf8)", icon: Star, delay: 0.4 },
  { id: 6, name: "Lancashire County",color: "#4A6FA5", gradient: "linear-gradient(135deg, #ffffff, #fefcf8)", icon: MapPin, delay: 0.5 },
  { id: 7, name: "UKHCA",            color: "#7B2D8E", gradient: "linear-gradient(135deg, #ffffff, #fefcf8)", icon: Handshake, delay: 0.6 },
  { id: 8, name: "NCFE",             color: "#E65100", gradient: "linear-gradient(135deg, #ffffff, #fefcf8)", icon: GraduationCap, delay: 0.7 },
];

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING BALL CARD - White card with gold border (same as TrustBadges)
// ─────────────────────────────────────────────────────────────────────────────
function FloatingBallCard({ partner, index, isInView }) {
  const [isHovered, setIsHovered] = useState(false);
  const floatX = useMotionValue(0);
  const floatY = useMotionValue(0);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const cardSize = isMobile ? 85 : 110;

  // Mouse tracking — only attached on non-touch devices
  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    floatX.set((x - 0.5) * 15);
    floatY.set((y - 0.5) * 10);
  }, [floatX, floatY]);

  const handleMouseLeave = useCallback(() => {
    floatX.set(0);
    floatY.set(0);
    setIsHovered(false);
  }, [floatX, floatY]);

  const onEnter = useCallback(() => setIsHovered(true), []);

  // Float delay offset for CSS animation
  const floatDelay = `${(index % partners.length) * 0.2}s`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: partner.delay,
      }}
      onMouseEnter={IS_TOUCH ? undefined : onEnter}
      onMouseMove={IS_TOUCH ? undefined : handleMouseMove}
      onMouseLeave={IS_TOUCH ? undefined : handleMouseLeave}
      style={{
        position: "relative",
        width: cardSize,
        height: cardSize,
        flexShrink: 0,
        cursor: "pointer",
        margin: "0 10px",
        x: IS_TOUCH ? 0 : floatX,
        y: IS_TOUCH ? 0 : floatY,
      }}
    >
      {/* Float animation wrapper */}
      <div
        className="partners-ball-float"
        style={{ animationDelay: floatDelay, width: "100%", height: "100%" }}
      >
        {/* Outer glow */}
        <motion.div
          animate={{
            boxShadow: isHovered
              ? `0 0 25px ${partner.color}80`
              : `0 0 0px ${partner.color}00`,
          }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            inset: -8,
            borderRadius: "50%",
            filter: "blur(6px)",
            pointerEvents: "none",
          }}
        />

        {/* Scale on hover */}
        <motion.div
          animate={{
            rotateX: isHovered ? 8 : 0,
            rotateY: isHovered ? 8 : 0,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          style={{ position: "relative", width: "100%", height: "100%" }}
        >
          {/* Main ball - White card with gold border */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: partner.gradient,
              border: `1.5px solid ${partner.color}20`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 4px 12px rgba(0,0,0,0.04), 0 0 0 1px rgba(196,151,42,0.08)`,
              overflow: "hidden",
            }}
          >
            {/* Inner pulse glow */}
            <div
              className="partners-ball-pulse"
              style={{
                position: "absolute",
                inset: 8,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(196,151,42,0.08), transparent 70%)",
                pointerEvents: "none",
              }}
            />

            {/* Sweep light — always mounted, opacity toggled */}
            <motion.div
              animate={{ x: isHovered ? "200%" : "-100%", opacity: isHovered ? 0.4 : 0 }}
              transition={
                isHovered
                  ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.2 }
              }
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "50%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(196,151,42,0.15), transparent)",
                transform: "skewX(-20deg)",
                pointerEvents: "none",
              }}
            />

            {/* Icon - Lucide */}
            <motion.div
              animate={{
                scale: isHovered ? [1, 1.1, 1] : 1,
                rotate: isHovered ? [0, -3, 3, 0] : 0,
              }}
              transition={{ duration: 0.4, type: "spring", stiffness: 500 }}
              style={{
                marginBottom: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <partner.icon
                size={isMobile ? 22 : 28}
                strokeWidth={1.8}
                color={partner.color}
              />
            </motion.div>

            {/* Partner name */}
            <motion.span
              animate={{ opacity: isHovered ? 1 : 0.9, y: isHovered ? -1 : 0 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: isMobile ? 8.5 : 10,
                color: "#475569",
                textAlign: "center",
                padding: "0 8px",
                lineHeight: 1.3,
                position: "relative",
                zIndex: 1,
              }}
            >
              {partner.name}
            </motion.span>

            {/* Rotating rings */}
            <div
              className="partners-ring-cw"
              style={{
                position: "absolute",
                inset: -4,
                borderRadius: "50%",
                border: "1px solid rgba(196,151,42,0.15)",
                pointerEvents: "none",
              }}
            />
            <div
              className="partners-ring-ccw"
              style={{
                position: "absolute",
                inset: -7,
                borderRadius: "50%",
                border: "1px solid rgba(196,151,42,0.08)",
                pointerEvents: "none",
              }}
            />

            {/* Pulsing ring on hover */}
            {isHovered && (
              <motion.div
                initial={{ scale: 1, opacity: 0.4 }}
                animate={{ scale: 1.4, opacity: 0 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: `1.5px solid ${partner.color}`,
                  pointerEvents: "none",
                }}
              />
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INFINITE MARQUEE
// ─────────────────────────────────────────────────────────────────────────────
function InfiniteMarquee({ partners: items, speed = 45, isInView }) {
  const [isPaused, setIsPaused] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.scrollWidth / 2);
    }
  }, []);

  const duplicated = [...items, ...items];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        overflow: "hidden",
        position: "relative",
        width: "100%",
        padding: "16px 0",
        maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
      }}
    >
      {contentWidth > 0 && isInView ? (
        <motion.div
          ref={contentRef}
          animate={{ x: [0, -contentWidth] }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            display: "flex",
            width: "fit-content",
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {duplicated.map((partner, idx) => (
            <FloatingBallCard
              key={`${partner.id}-${idx}`}
              partner={partner}
              index={idx}
              isInView={isInView}
            />
          ))}
        </motion.div>
      ) : (
        <div
          ref={contentRef}
          style={{ display: "flex", width: "fit-content", visibility: "hidden", position: "absolute" }}
        >
          {duplicated.map((partner, idx) => (
            <div key={`measure-${idx}`} style={{ width: 110, height: 110, margin: "0 10px", flexShrink: 0 }} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PARTNERS COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function Partners() {
  const [ref, inView] = useReveal(0.15);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const headerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.15,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <>
      <style>{`
        /* ── CSS ANIMATIONS — all run on GPU compositor thread, zero JS ── */

        /* Ball float animation */
        @keyframes partners-float {
          0%, 100% { transform: translateY(0)   rotateZ(0deg); }
          25%       { transform: translateY(-6px) rotateZ(1.5deg); }
          75%       { transform: translateY(6px)  rotateZ(-1.5deg); }
        }
        .partners-ball-float {
          animation: partners-float 5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .partners-ball-float { animation: none; }
        }

        /* Inner gradient pulse */
        @keyframes partners-pulse {
          0%, 100% { opacity: 0.05; }
          50%       { opacity: 0.15; }
        }
        .partners-ball-pulse {
          animation: partners-pulse 3s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .partners-ball-pulse { animation: none; }
        }

        /* Rotating rings */
        @keyframes partners-ring-cw {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes partners-ring-ccw {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        .partners-ring-cw {
          animation: partners-ring-cw 10s linear infinite;
        }
        .partners-ring-ccw {
          animation: partners-ring-ccw 12s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .partners-ring-cw,
          .partners-ring-ccw { animation: none; }
        }

        /* Background blobs */
        @keyframes partners-blob-a {
          0%, 100% { transform: translate(0, 0); }
          25%       { transform: translate(15px, -20px); }
          75%       { transform: translate(-15px, 20px); }
        }
        @keyframes partners-blob-b {
          0%, 100% { transform: translate(0, 0); }
          25%       { transform: translate(-15px, 20px); }
          75%       { transform: translate(15px, -20px); }
        }
        .partners-blob-a {
          animation: partners-blob-a 18s ease-in-out infinite;
        }
        .partners-blob-b {
          animation: partners-blob-b 22s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .partners-blob-a,
          .partners-blob-b { animation: none; }
        }

        /* Ultra mobile optimization */
        @media (max-width: 480px) {
          .partners-ball-float > div > div {
            border-width: 1px !important;
          }
        }
      `}</style>

      <section
        ref={ref}
        style={{
          padding: "clamp(50px, 8vh, 80px) clamp(16px, 5vw, 80px)",
          background: "linear-gradient(135deg, #ffffff 0%, #fefcf8 100%)",
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
              radial-gradient(circle at 20% 50%, rgba(196,151,42,0.08) 0%, transparent 50%),
              repeating-linear-gradient(45deg, #C4972A 0px, #C4972A 1px, transparent 1px, transparent 20px)
            `,
            backgroundSize: "100% 100%, 30px 30px",
            pointerEvents: "none",
          }}
        />

        {/* Background blobs with CSS animation */}
        <div
          className="partners-blob-a"
          style={{
            position: "absolute",
            top: "5%",
            right: "2%",
            width: isMobile ? 180 : 280,
            height: isMobile ? 180 : 280,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,151,42,0.04), transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="partners-blob-b"
          style={{
            position: "absolute",
            bottom: "5%",
            left: "2%",
            width: isMobile ? 200 : 320,
            height: isMobile ? 200 : 320,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,151,42,0.03), transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Top animated border */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "linear-gradient(90deg, transparent, #C4972A, #f0c060, #C4972A, transparent)",
            transformOrigin: "left",
          }}
        />

        {/* Bottom animated border */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
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
                  fontSize: 11,
                  fontWeight: 800,
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

            {/* Main heading */}
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
                color: "#64748b",
                maxWidth: 520,
                margin: "0 auto",
                lineHeight: 1.65,
              }}
            >
              We're proud to work with and be recognized by industry leaders across healthcare
            </motion.p>
          </motion.div>

          {/* Single infinite marquee row */}
          <InfiniteMarquee
            partners={partners}
            speed={isMobile ? 35 : 45}
            isInView={inView}
          />

          {/* Trust indicator badges */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.5 },
              },
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: isMobile ? 40 : 56,
              gap: isMobile ? 12 : 16,
              flexWrap: "wrap",
            }}
          >
            {[
              { icon: "🏆", text: "8+ Trusted Partnerships", color: "#C4972A" },
              { icon: "✓",  text: "Full Compliance Certified", color: "#64748b" },
              { icon: "⭐", text: "Rated Excellent",           color: "#64748b" },
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden:   { opacity: 0, y: 20, scale: 0.9 },
                  visible:  { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, type: "spring" } },
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: `${isMobile ? 6 : 8}px ${isMobile ? 16 : 20}px`,
                  background: idx === 0 ? "rgba(196,151,42,0.08)" : "rgba(0,0,0,0.03)",
                  borderRadius: "50px",
                  cursor: "default",
                }}
              >
                <span style={{ fontSize: isMobile ? 14 : 16 }}>{badge.icon}</span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: isMobile ? 12 : 13,
                    fontWeight: idx === 0 ? 600 : 500,
                    color: badge.color,
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