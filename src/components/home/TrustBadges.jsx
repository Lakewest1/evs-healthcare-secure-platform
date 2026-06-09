// components/home/TrustBadges.jsx
import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, useMotionValue, AnimatePresence } from "framer-motion";

// Lucide Icons - Professional icon set
import {
  ShieldCheck,
  BadgeCheck,
  Wallet,
  Clock3,
  Zap,
  Building2,
  Users,
  CalendarDays,
  TrendingUp,
  GraduationCap,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// PERFORMANCE OPTIMIZED Trust Badges
// Features: CSS float animations, Framer Motion marquee, hover effects
// ─────────────────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return [ref, isInView];
}

// Detect touch/mobile once at module level
const IS_TOUCH =
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

// ─────────────────────────────────────────────────────────────────────────────
// Trust Tags Data - Premium Healthcare Benefits with Lucide Icons
// ─────────────────────────────────────────────────────────────────────────────
const TRUST_TAGS = [
  { id: 1, label: "DBS Checked", icon: ShieldCheck, color: "#C4972A", delay: 0 },
  { id: 2, label: "CQC Compliant", icon: BadgeCheck, color: "#C4972A", delay: 0.1 },
  { id: 3, label: "Weekly Pay", icon: Wallet, color: "#C4972A", delay: 0.2 },
  { id: 4, label: "24/7 Support", icon: Clock3, color: "#C4972A", delay: 0.3 },
  { id: 5, label: "Fast Placement", icon: Zap, color: "#C4972A", delay: 0.4 },
  { id: 6, label: "NHS Opportunities", icon: Building2, color: "#005EB8", delay: 0.5 },
  { id: 7, label: "Dedicated Consultants", icon: Users, color: "#C4972A", delay: 0.6 },
  { id: 8, label: "Flexible Shifts", icon: CalendarDays, color: "#C4972A", delay: 0.7 },
  { id: 9, label: "Career Development", icon: TrendingUp, color: "#C4972A", delay: 0.8 },
  { id: 10, label: "Training Support", icon: GraduationCap, color: "#C4972A", delay: 0.9 },
];

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING TRUST CARD - White card with gold border
// ─────────────────────────────────────────────────────────────────────────────
function FloatingTrustCard({ item, index, isInView }) {
  const [isHovered, setIsHovered] = useState(false);
  const floatX = useMotionValue(0);
  const floatY = useMotionValue(0);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const cardSize = isMobile ? 75 : 90;
  const iconSize = isMobile ? 18 : 22;

  // Mouse tracking — only attached on non-touch devices
  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    floatX.set((x - 0.5) * 12);
    floatY.set((y - 0.5) * 8);
  }, [floatX, floatY]);

  const handleMouseLeave = useCallback(() => {
    floatX.set(0);
    floatY.set(0);
    setIsHovered(false);
  }, [floatX, floatY]);

  const onEnter = useCallback(() => setIsHovered(true), []);

  // Float delay offset for CSS animation
  const floatDelay = `${(index % TRUST_TAGS.length) * 0.15}s`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: item.delay,
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
        margin: "0 8px",
        x: IS_TOUCH ? 0 : floatX,
        y: IS_TOUCH ? 0 : floatY,
      }}
    >
      {/* Float animation wrapper */}
      <div
        className="trust-ball-float"
        style={{ animationDelay: floatDelay, width: "100%", height: "100%" }}
      >
        {/* Outer glow */}
        <motion.div
          animate={{
            boxShadow: isHovered
              ? `0 0 20px ${item.color}80`
              : `0 0 0px ${item.color}00`,
          }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            inset: -6,
            borderRadius: "50%",
            filter: "blur(5px)",
            pointerEvents: "none",
          }}
        />

        {/* Scale on hover */}
        <motion.div
          animate={{
            rotateX: isHovered ? 6 : 0,
            rotateY: isHovered ? 6 : 0,
            scale: isHovered ? 1.04 : 1,
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
              background: "#ffffff",
              border: `1.5px solid ${item.color}25`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 2px 8px rgba(0,0,0,0.04), 0 0 0 1px rgba(196,151,42,0.06)`,
              overflow: "hidden",
            }}
          >
            {/* Inner pulse glow */}
            <div
              className="trust-ball-pulse"
              style={{
                position: "absolute",
                inset: 6,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(196,151,42,0.06), transparent 70%)",
                pointerEvents: "none",
              }}
            />

            {/* Sweep light — always mounted, opacity toggled */}
            <motion.div
              animate={{ x: isHovered ? "200%" : "-100%", opacity: isHovered ? 0.3 : 0 }}
              transition={
                isHovered
                  ? { duration: 1, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.2 }
              }
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "50%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(196,151,42,0.12), transparent)",
                transform: "skewX(-20deg)",
                pointerEvents: "none",
              }}
            />

            {/* Icon - Lucide */}
            <motion.div
              animate={{
                scale: isHovered ? [1, 1.08, 1] : 1,
                rotate: isHovered ? [0, -3, 3, 0] : 0,
              }}
              transition={{ duration: 0.35, type: "spring", stiffness: 500 }}
              style={{
                marginBottom: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <item.icon
                size={iconSize}
                strokeWidth={1.8}
                color={item.color}
              />
            </motion.div>

            {/* Label */}
            <motion.span
              animate={{ opacity: isHovered ? 1 : 0.9, y: isHovered ? -1 : 0 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: isMobile ? 7.5 : 9,
                color: "#475569",
                textAlign: "center",
                padding: "0 4px",
                lineHeight: 1.2,
                position: "relative",
                zIndex: 1,
              }}
            >
              {item.label}
            </motion.span>

            {/* Rotating rings */}
            <div
              className="trust-ring-cw"
              style={{
                position: "absolute",
                inset: -3,
                borderRadius: "50%",
                border: "1px solid rgba(196,151,42,0.12)",
                pointerEvents: "none",
              }}
            />
            <div
              className="trust-ring-ccw"
              style={{
                position: "absolute",
                inset: -6,
                borderRadius: "50%",
                border: "1px solid rgba(196,151,42,0.06)",
                pointerEvents: "none",
              }}
            />

            {/* Pulsing ring on hover */}
            {isHovered && (
              <motion.div
                initial={{ scale: 1, opacity: 0.4 }}
                animate={{ scale: 1.3, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: `1.5px solid ${item.color}`,
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
// INFINITE MARQUEE - Same as Partners component
// ─────────────────────────────────────────────────────────────────────────────
function TrustMarquee({ items, speed = 45, isInView }) {
  const [isPaused, setIsPaused] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);
  const contentRef = useRef(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

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
        padding: isMobile ? "10px 0" : "14px 0",
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
          {duplicated.map((item, idx) => (
            <FloatingTrustCard
              key={`${item.id}-${idx}`}
              item={item}
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
          {duplicated.map((item, idx) => (
            <div key={`measure-${idx}`} style={{ width: 90, height: 90, margin: "0 8px", flexShrink: 0 }} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN TRUST BADGES COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function TrustBadges({ className = "", variant = "light" }) {
  const [ref, inView] = useReveal(0.15);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const isDark = variant === "dark";

  return (
    <>
      <style>{`
        /* ── CSS ANIMATIONS — all run on GPU compositor thread ── */

        /* Trust ball float animation */
        @keyframes trust-float {
          0%, 100% { transform: translateY(0)   rotateZ(0deg); }
          25%       { transform: translateY(-5px) rotateZ(1.5deg); }
          75%       { transform: translateY(5px)  rotateZ(-1.5deg); }
        }
        .trust-ball-float {
          animation: trust-float 4.5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .trust-ball-float { animation: none; }
        }

        /* Inner gradient pulse */
        @keyframes trust-pulse {
          0%, 100% { opacity: 0.03; }
          50%       { opacity: 0.1; }
        }
        .trust-ball-pulse {
          animation: trust-pulse 2.5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .trust-ball-pulse { animation: none; }
        }

        /* Rotating rings */
        @keyframes trust-ring-cw {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes trust-ring-ccw {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        .trust-ring-cw {
          animation: trust-ring-cw 8s linear infinite;
        }
        .trust-ring-ccw {
          animation: trust-ring-ccw 10s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .trust-ring-cw,
          .trust-ring-ccw { animation: none; }
        }

        /* Ultra mobile optimization */
        @media (max-width: 480px) {
          .trust-ball-float > div > div {
            border-width: 1px !important;
          }
        }
      `}</style>

      <section
        ref={ref}
        className={className}
        style={{
          padding: isMobile ? "20px 16px" : "24px 5%",
          background: isDark 
            ? "linear-gradient(135deg, #0a1628 0%, #0f1d3d 100%)"
            : "linear-gradient(135deg, #ffffff 0%, #fefcf8 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle Background Pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle at 20% 50%, rgba(196,151,42,0.03), transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 2 }}>
          
          {/* SINGLE ROW - Trust Benefits with Framer Motion marquee */}
          <TrustMarquee
            items={TRUST_TAGS}
            speed={isMobile ? 35 : 45}
            isInView={inView}
          />

          {/* Subtle Bottom Divider - Only on desktop */}
          {!isMobile && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 16,
              }}
            >
              <div style={{ width: 50, height: 1, background: "rgba(196,151,42,0.15)", borderRadius: 999 }} />
            </div>
          )}
        </div>
      </section>
    </>
  );
}