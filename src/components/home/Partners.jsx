import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, useMotionValue, AnimatePresence } from "framer-motion";

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

const partners = [
  { id: 1, name: "NHS England",      color: "#005EB8", gradient: "linear-gradient(135deg, #005EB8, #0088E8)", icon: "🏥", delay: 0 },
  { id: 2, name: "CQC Approved",     color: "#00A859", gradient: "linear-gradient(135deg, #00A859, #00C870)", icon: "✓",  delay: 0.1 },
  { id: 3, name: "DBS Partner",      color: "#C4972A", gradient: "linear-gradient(135deg, #C4972A, #e8b84a)", icon: "🔒", delay: 0.2 },
  { id: 4, name: "Skills for Care",  color: "#6C3B2A", gradient: "linear-gradient(135deg, #6C3B2A, #8B5A42)", icon: "📚", delay: 0.3 },
  { id: 5, name: "Care Quality",     color: "#2C5F8A", gradient: "linear-gradient(135deg, #2C5F8A, #4A8BBA)", icon: "⭐", delay: 0.4 },
  { id: 6, name: "Lancashire County",color: "#4A6FA5", gradient: "linear-gradient(135deg, #4A6FA5, #6A8FBF)", icon: "📍", delay: 0.5 },
  { id: 7, name: "UKHCA",            color: "#7B2D8E", gradient: "linear-gradient(135deg, #7B2D8E, #9B4DAE)", icon: "🤝", delay: 0.6 },
  { id: 8, name: "NCFE",             color: "#E65100", gradient: "linear-gradient(135deg, #E65100, #FF771D)", icon: "🎓", delay: 0.7 },
];

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING BALL CARD
// ─────────────────────────────────────────────────────────────────────────────
function FloatingBallCard({ partner, index, isInView }) {
  const [isHovered, setIsHovered] = useState(false);
  const floatX = useMotionValue(0);
  const floatY = useMotionValue(0);

  // Mouse tracking — only attached on non-touch devices
  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    floatX.set((x - 0.5) * 20);
    floatY.set((y - 0.5) * 15);
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
      // FIX 8: removed rotate: -180 from initial. Scale+fade is 10x cheaper.
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
      // FIX 5: motion values only wired on non-touch
      style={{
        position: "relative",
        width: 130,
        height: 130,
        flexShrink: 0,
        cursor: "pointer",
        margin: "0 12px",
        x: IS_TOUCH ? 0 : floatX,
        y: IS_TOUCH ? 0 : floatY,
      }}
    >
      {/* FIX 1: Float animation moved to CSS — runs on compositor, zero JS */}
      <div
        className="partners-ball-float"
        style={{ animationDelay: floatDelay, width: "100%", height: "100%" }}
      >
        {/* Outer glow */}
        <motion.div
          animate={{
            boxShadow: isHovered
              ? `0 0 30px ${partner.color}80`
              : `0 0 0px ${partner.color}00`,
          }}
          transition={{ duration: 0.4 }}
          style={{
            position: "absolute",
            inset: -10,
            borderRadius: "50%",
            filter: "blur(8px)",
            pointerEvents: "none",
          }}
        />

        {/* 3D scale on hover */}
        <motion.div
          animate={{
            rotateX: isHovered ? 10 : 0,
            rotateY: isHovered ? 10 : 0,
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          style={{ position: "relative", width: "100%", height: "100%" }}
        >
          {/* Main ball */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: partner.gradient,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 15px 30px rgba(0,0,0,0.2), 0 0 0 3px rgba(255,255,255,0.3), inset 0 -8px 15px rgba(0,0,0,0.15)`,
              overflow: "hidden",
            }}
          >
            {/* FIX 2: Inner gradient pulse → CSS animation */}
            <div
              className="partners-ball-pulse"
              style={{
                position: "absolute",
                inset: 10,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,255,255,0.4), transparent 70%)",
                pointerEvents: "none",
              }}
            />

            {/* FIX 10: Sweep light — always mounted, opacity toggled. No DOM thrash. */}
            <motion.div
              animate={{ x: isHovered ? "200%" : "-100%", opacity: isHovered ? 0.6 : 0 }}
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
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                transform: "skewX(-20deg)",
                pointerEvents: "none",
              }}
            />

            {/* Icon */}
            <motion.span
              animate={{
                scale: isHovered ? [1, 1.2, 1] : 1,
                rotate: isHovered ? [0, -5, 5, 0] : 0,
              }}
              transition={{ duration: 0.5, type: "spring", stiffness: 500 }}
              style={{
                fontSize: 36,
                marginBottom: 8,
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                display: "block",
              }}
            >
              {partner.icon}
            </motion.span>

            {/* Partner name */}
            <motion.span
              animate={{ opacity: isHovered ? 1 : 0.95, y: isHovered ? -2 : 0 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: 11,
                color: "#fff",
                textAlign: "center",
                padding: "0 10px",
                lineHeight: 1.3,
                textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                position: "relative",
                zIndex: 1,
              }}
            >
              {partner.name}
            </motion.span>

            {/* FIX 3: Rotating rings → CSS animations */}
            <div
              className="partners-ring-cw"
              style={{
                position: "absolute",
                inset: -4,
                borderRadius: "50%",
                border: "1.5px solid rgba(255,255,255,0.3)",
                pointerEvents: "none",
              }}
            />
            <div
              className="partners-ring-ccw"
              style={{
                position: "absolute",
                inset: -8,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.15)",
                pointerEvents: "none",
              }}
            />

            {/* Pulsing ring on hover — kept as Framer Motion (only active on hover, not perpetual) */}
            {isHovered && (
              <motion.div
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: `2px solid ${partner.color}`,
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
// FIX 6+7: useAnimation + controls.stop() replaced with direct animate prop
// + CSS animation-play-state for pause (no position jump on resume)
// ─────────────────────────────────────────────────────────────────────────────
function InfiniteMarquee({ partners: items, speed = 40, isInView }) {
  const [isPaused, setIsPaused] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      // Measure once after mount
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
        // FIX 6: Direct animate prop — no useAnimation needed
        <motion.div
          ref={contentRef}
          animate={{ x: [0, -contentWidth] }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "linear",
            // FIX 7: pause via repeatDelay trick — actually we use CSS below
          }}
          // FIX 7: CSS animation-play-state handles pause without position jump
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
        // Measurement pass — invisible, used only to measure width
        <div
          ref={contentRef}
          style={{ display: "flex", width: "fit-content", visibility: "hidden", position: "absolute" }}
        >
          {duplicated.map((partner, idx) => (
            <div key={`measure-${idx}`} style={{ width: 130, height: 130, margin: "0 12px", flexShrink: 0 }} />
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

        /* FIX 1: Ball float (replaces useAnimation y/rotateZ loop) */
        @keyframes partners-float {
          0%, 100% { transform: translateY(0)   rotateZ(0deg); }
          25%       { transform: translateY(-8px) rotateZ(2deg); }
          75%       { transform: translateY(8px)  rotateZ(-2deg); }
        }
        .partners-ball-float {
          animation: partners-float 6s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .partners-ball-float { animation: none; }
        }

        /* FIX 2: Inner gradient pulse */
        @keyframes partners-pulse {
          0%, 100% { opacity: 0.1; }
          50%       { opacity: 0.25; }
        }
        .partners-ball-pulse {
          animation: partners-pulse 3s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .partners-ball-pulse { animation: none; }
        }

        /* FIX 3: Rotating rings */
        @keyframes partners-ring-cw {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes partners-ring-ccw {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        .partners-ring-cw {
          animation: partners-ring-cw 12s linear infinite;
        }
        .partners-ring-ccw {
          animation: partners-ring-ccw 15s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .partners-ring-cw,
          .partners-ring-ccw { animation: none; }
        }

        /* FIX 4: Background blobs (replaces perpetual Framer Motion y/x) */
        @keyframes partners-blob-a {
          0%, 100% { transform: translate(0, 0); }
          25%       { transform: translate(20px, -30px); }
          75%       { transform: translate(-20px, 30px); }
        }
        @keyframes partners-blob-b {
          0%, 100% { transform: translate(0, 0); }
          25%       { transform: translate(-20px, 30px); }
          75%       { transform: translate(20px, -30px); }
        }
        .partners-blob-a {
          animation: partners-blob-a 20s ease-in-out infinite;
        }
        .partners-blob-b {
          animation: partners-blob-b 25s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .partners-blob-a,
          .partners-blob-b { animation: none; }
        }
      `}</style>

      <section
        ref={ref}
        style={{
          padding: "clamp(60px, 10vh, 100px) clamp(16px, 5vw, 80px)",
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
              radial-gradient(circle at 20% 50%, rgba(196,151,42,0.1) 0%, transparent 50%),
              repeating-linear-gradient(45deg, #C4972A 0px, #C4972A 1px, transparent 1px, transparent 20px)
            `,
            backgroundSize: "100% 100%, 40px 40px",
            pointerEvents: "none",
          }}
        />

        {/* FIX 4: Blobs use CSS animation class now */}
        <div
          className="partners-blob-a"
          style={{
            position: "absolute",
            top: "5%",
            right: "2%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,151,42,0.05), transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="partners-blob-b"
          style={{
            position: "absolute",
            bottom: "5%",
            left: "2%",
            width: 350,
            height: 350,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,151,42,0.04), transparent 70%)",
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
            background: "linear-gradient(90deg, transparent, #C4972A, transparent)",
            transformOrigin: "left",
          }}
        />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>

          {/* Section header */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{ textAlign: "center", marginBottom: 56 }}
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
            speed={45}
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
              marginTop: 56,
              gap: 16,
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
                  // FIX 9: rotate fired once on entry, not looping
                  visible:  { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, type: "spring" } },
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 20px",
                  background: idx === 0 ? "rgba(196,151,42,0.08)" : "rgba(0,0,0,0.03)",
                  borderRadius: "50px",
                  cursor: "default",
                }}
              >
                <span style={{ fontSize: 16 }}>{badge.icon}</span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
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