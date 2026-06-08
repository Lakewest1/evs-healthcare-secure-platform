// components/home/TrustBadges.jsx
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// Premium Trust Badges — Elegant Slow Speed Marquee with Zoom Effect
// Features: Balanced card sizes, expanded trust items, smooth marquee
// ─────────────────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return [ref, isInView];
}

// Expanded Trust Tags Data - Rich variety of benefits
const TRUST_TAGS = [
  { id: 1, label: "DBS Checked", icon: "✓", color: "#4ade80", gradient: "linear-gradient(135deg, #4ade80, #22c55e)" },
  { id: 2, label: "CQC Compliant", icon: "✓", color: "#4ade80", gradient: "linear-gradient(135deg, #4ade80, #22c55e)" },
  { id: 3, label: "Weekly Pay", icon: "💰", color: "#C4972A", gradient: "linear-gradient(135deg, #C4972A, #e8b84a)" },
  { id: 4, label: "24/7 Support", icon: "🕒", color: "#C4972A", gradient: "linear-gradient(135deg, #C4972A, #e8b84a)" },
  { id: 5, label: "Fast Placement", icon: "⚡", color: "#f59e0b", gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)" },
  { id: 6, label: "NHS Opportunities", icon: "🏥", color: "#005EB8", gradient: "linear-gradient(135deg, #005EB8, #0088E8)" },
  { id: 7, label: "Dedicated Consultants", icon: "👥", color: "#8b5cf6", gradient: "linear-gradient(135deg, #8b5cf6, #a78bfa)" },
  { id: 8, label: "Flexible Shifts", icon: "📅", color: "#06b6d4", gradient: "linear-gradient(135deg, #06b6d4, #22d3ee)" },
  { id: 9, label: "Career Development", icon: "📈", color: "#10b981", gradient: "linear-gradient(135deg, #10b981, #34d399)" },
  { id: 10, label: "Training Support", icon: "📚", color: "#8B5CF6", gradient: "linear-gradient(135deg, #8B5CF6, #A78BFA)" },
];

// Partner Logos Data - Expanded
const TRUST_LOGOS = [
  { id: 1, label: "NHS", icon: "🏥", color: "#005EB8", gradient: "linear-gradient(135deg, #005EB8, #0088E8)" },
  { id: 2, label: "CQC", icon: "✓", color: "#007F4E", gradient: "linear-gradient(135deg, #007F4E, #00A859)" },
  { id: 3, label: "Skills for Care", icon: "📚", color: "#4B2882", gradient: "linear-gradient(135deg, #4B2882, #6B3A9E)" },
  { id: 4, label: "DBS Partner", icon: "🔒", color: "#C4972A", gradient: "linear-gradient(135deg, #C4972A, #e8b84a)" },
  { id: 5, label: "UKHCA", icon: "🤝", color: "#7B2D8E", gradient: "linear-gradient(135deg, #7B2D8E, #9B4DAE)" },
  { id: 6, label: "NCFE", icon: "🎓", color: "#E65100", gradient: "linear-gradient(135deg, #E65100, #FF771D)" },
];

// ─────────────────────────────────────────────────────────────────────────────
// 3D Floating Card - Balanced Size (105x105 for tags, 115x115 for logos)
// ─────────────────────────────────────────────────────────────────────────────
function FloatingTrustCard({ item, index, isInView, type = "tag", progress = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const controls = useAnimation();
  
  const floatY = useMotionValue(0);
  const floatX = useMotionValue(0);
  
  // Smooth zoom effect based on progress
  const zoomScale = useTransform(progress, [0, 0.3, 0.5, 0.7, 1], [0.95, 1.02, 1.05, 1.02, 0.95]);
  const zoomRotate = useTransform(progress, [0, 0.5, 1], [-2, 2, -2]);
  
  useEffect(() => {
    if (isInView) {
      controls.start({
        y: [0, -3, 0, 3, 0],
        rotateZ: [0, 1.5, 0, -1.5, 0],
        transition: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.05,
        },
      });
    }
  }, [isInView, index, controls]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    floatX.set((x - 0.5) * 10);
    floatY.set((y - 0.5) * 6);
  };

  const handleMouseLeave = () => {
    floatX.set(0);
    floatY.set(0);
    setIsHovered(false);
  };

  // Balanced sizes - slightly increased
  const cardSize = type === "logo" ? 115 : 105;
  const iconSize = type === "logo" ? 26 : 24;
  const fontSize = type === "logo" ? 10 : 9.5;

  return (
    <motion.div
      ref={cardRef}
      animate={controls}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        width: cardSize,
        height: cardSize,
        flexShrink: 0,
        cursor: "pointer",
        margin: "0 8px",
        x: floatX,
        y: floatY,
        scale: zoomScale,
        rotate: zoomRotate,
      }}
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={isInView ? { opacity: 1, scale: zoomScale, rotate: 0 } : {}}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: index * 0.04,
      }}
    >
      {/* Subtle Outer Glow */}
      <motion.div
        animate={{
          boxShadow: isHovered
            ? `0 0 18px ${item.color}aa`
            : `0 0 0px ${item.color}00`,
          scale: isHovered ? 1.04 : 1,
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          inset: -5,
          borderRadius: "50%",
          filter: "blur(5px)",
          pointerEvents: "none",
        }}
      />

      {/* 3D Ball Card */}
      <motion.div
        animate={{
          rotateX: isHovered ? 6 : 0,
          rotateY: isHovered ? 6 : 0,
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 20,
        }}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Main Ball */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: item.gradient,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 8px 16px rgba(0,0,0,0.1), 0 0 0 2px rgba(255,255,255,0.25), inset 0 -3px 6px rgba(0,0,0,0.08)`,
          }}
        >
          {/* Inner Glow */}
          <motion.div
            animate={{
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              inset: 6,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,255,255,0.4), transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Light Sweep on Hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "100%", opacity: 0.45 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "50%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  transform: "skewX(-20deg)",
                  pointerEvents: "none",
                }}
              />
            )}
          </AnimatePresence>

          {/* Icon - Balanced Size */}
          <motion.span
            animate={{
              scale: isHovered ? [1, 1.08, 1] : 1,
              rotate: isHovered ? [0, -3, 3, 0] : 0,
            }}
            transition={{
              duration: 0.35,
              type: "spring",
              stiffness: 500,
            }}
            style={{
              fontSize: iconSize,
              marginBottom: 5,
              filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))",
            }}
          >
            {item.icon}
          </motion.span>

          {/* Label - Balanced Text Size */}
          <motion.span
            animate={{
              opacity: isHovered ? 1 : 0.95,
              y: isHovered ? -1 : 0,
            }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: fontSize,
              color: "#fff",
              textAlign: "center",
              padding: "0 5px",
              lineHeight: 1.25,
              textShadow: "0 1px 1px rgba(0,0,0,0.15)",
            }}
          >
            {item.label}
          </motion.span>

          {/* Decorative Ring */}
          <motion.div
            animate={{
              rotate: 360,
              scale: isHovered ? 1.04 : 1,
            }}
            transition={{
              rotate: { duration: 10, repeat: Infinity, ease: "linear" },
              scale: { duration: 0.25 },
            }}
            style={{
              position: "absolute",
              inset: -3,
              borderRadius: "50%",
              border: `1.5px solid rgba(255,255,255,0.2)`,
              pointerEvents: "none",
            }}
          />

          {/* Pulse Ring on Hover */}
          {isHovered && (
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.25, opacity: 0 }}
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
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Elegant Slow Speed Continuous Marquee
// ─────────────────────────────────────────────────────────────────────────────
function ElegantMarquee({ items, speed = 50, isInView, type = "tag", direction = "left" }) {
  const [width, setWidth] = useState(0);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const controls = useAnimation();
  const progress = useMotionValue(0);

  useEffect(() => {
    if (contentRef.current && containerRef.current) {
      setWidth(contentRef.current.scrollWidth / 2);
    }
  }, []);

  useEffect(() => {
    if (isInView && width > 0) {
      const startX = direction === "left" ? 0 : -width;
      const endX = direction === "left" ? -width : 0;
      
      controls.start({
        x: [startX, endX],
        transition: {
          duration: speed,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        },
      });
      
      // Animate progress for smooth zoom effect
      const interval = setInterval(() => {
        let newProgress = progress.get() + 0.003;
        if (newProgress > 1) newProgress = 0;
        progress.set(newProgress);
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [isInView, width, speed, controls, direction, progress]);

  // Duplicate items 3 times for seamless loop
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div
      ref={containerRef}
      style={{
        overflow: "hidden",
        position: "relative",
        width: "100%",
        padding: "10px 0",
        maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
      }}
    >
      <motion.div
        ref={contentRef}
        animate={controls}
        initial={{ x: direction === "left" ? 0 : -width }}
        style={{
          display: "flex",
          width: "fit-content",
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <FloatingTrustCard
            key={`${item.id}-${idx}`}
            item={item}
            index={idx}
            isInView={isInView}
            type={type}
            progress={progress}
          />
        ))}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main TrustBadges Component - Balanced Sizes
// ─────────────────────────────────────────────────────────────────────────────
export default function TrustBadges({ className = "", variant = "light" }) {
  const [ref, inView] = useReveal(0.15);

  const isDark = variant === "dark";

  const pulseVariants = {
    animate: {
      scale: [1, 1.08, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      ref={ref}
      className={className}
      style={{
        padding: "clamp(25px, 5vh, 40px) clamp(16px, 5vw, 80px)",
        background: isDark 
          ? "linear-gradient(135deg, #0a1628 0%, #0f1d3d 100%)"
          : "linear-gradient(135deg, #ffffff 0%, #fefcf8 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle Background Pattern */}
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

      {/* Gentle Floating Background Blobs */}
      <motion.div
        animate={{
          y: [0, -15, 0, 15, 0],
          x: [0, 10, 0, -10, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,151,42,0.04), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{
          y: [0, 15, 0, -15, 0],
          x: [0, -10, 0, 10, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,151,42,0.03), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 2 }}>
        
        {/* TOP ROW - Trust Benefits (Balanced Size Cards) */}
        <ElegantMarquee
          items={TRUST_TAGS}
          speed={50}
          isInView={inView}
          type="tag"
          direction="right"
        />

        {/* Center Divider with Gentle Pulse */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            margin: "14px 0",
          }}
        >
          <div style={{ width: 50, height: 1, background: "rgba(196,151,42,0.25)", borderRadius: 999 }} />
          <motion.span
            variants={pulseVariants}
            animate="animate"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: isDark ? "rgba(255,255,255,0.45)" : "#94a3b8",
            }}
          >
            Trusted By
          </motion.span>
          <div style={{ width: 50, height: 1, background: "rgba(196,151,42,0.25)", borderRadius: 999 }} />
        </motion.div>

        {/* BOTTOM ROW - Partner Logos (Slightly Larger) */}
        <ElegantMarquee
          items={TRUST_LOGOS}
          speed={55}
          isInView={inView}
          type="logo"
          direction="left"
        />
      </div>
    </section>
  );
}