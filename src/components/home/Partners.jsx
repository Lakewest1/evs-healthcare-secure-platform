import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// Premium Partners Section — Single Infinite Marquee
// Features: Single row marquee, 3D ball cards, smooth infinite scroll
// ─────────────────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return [ref, isInView];
}

const partners = [
  { id: 1, name: "NHS England", color: "#005EB8", gradient: "linear-gradient(135deg, #005EB8, #0088E8)", icon: "🏥", delay: 0 },
  { id: 2, name: "CQC Approved", color: "#00A859", gradient: "linear-gradient(135deg, #00A859, #00C870)", icon: "✓", delay: 0.1 },
  { id: 3, name: "DBS Partner", color: "#C4972A", gradient: "linear-gradient(135deg, #C4972A, #e8b84a)", icon: "🔒", delay: 0.2 },
  { id: 4, name: "Skills for Care", color: "#6C3B2A", gradient: "linear-gradient(135deg, #6C3B2A, #8B5A42)", icon: "📚", delay: 0.3 },
  { id: 5, name: "Care Quality", color: "#2C5F8A", gradient: "linear-gradient(135deg, #2C5F8A, #4A8BBA)", icon: "⭐", delay: 0.4 },
  { id: 6, name: "Lancashire County", color: "#4A6FA5", gradient: "linear-gradient(135deg, #4A6FA5, #6A8FBF)", icon: "📍", delay: 0.5 },
  { id: 7, name: "UKHCA", color: "#7B2D8E", gradient: "linear-gradient(135deg, #7B2D8E, #9B4DAE)", icon: "🤝", delay: 0.6 },
  { id: 8, name: "NCFE", color: "#E65100", gradient: "linear-gradient(135deg, #E65100, #FF771D)", icon: "🎓", delay: 0.7 },
];

// ─────────────────────────────────────────────────────────────────────────────
// 3D Floating Ball Card with Smooth Animations
// ─────────────────────────────────────────────────────────────────────────────
function FloatingBallCard({ partner, index, isInView }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const controls = useAnimation();
  
  // Smooth float animation
  const floatY = useMotionValue(0);
  const floatX = useMotionValue(0);
  
  useEffect(() => {
    if (isInView) {
      controls.start({
        y: [0, -8, 0, 8, 0],
        rotateZ: [0, 2, 0, -2, 0],
        transition: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.2,
        },
      });
    }
  }, [isInView, index, controls]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    floatX.set((x - 0.5) * 20);
    floatY.set((y - 0.5) * 15);
  };

  const handleMouseLeave = () => {
    floatX.set(0);
    floatY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      animate={controls}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        width: 130,
        height: 130,
        flexShrink: 0,
        cursor: "pointer",
        margin: "0 12px",
        x: floatX,
        y: floatY,
      }}
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: partner.delay,
      }}
    >
      {/* Outer Glow Effect */}
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

      {/* 3D Ball Card */}
      <motion.div
        animate={{
          rotateX: isHovered ? 10 : 0,
          rotateY: isHovered ? 10 : 0,
          scale: isHovered ? 1.08 : 1,
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
            background: partner.gradient,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 15px 30px rgba(0,0,0,0.2), 0 0 0 3px rgba(255,255,255,0.3), inset 0 -8px 15px rgba(0,0,0,0.15)`,
          }}
        >
          {/* Animated Inner Gradient */}
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
              inset: 10,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,255,255,0.4), transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Sweeping Light Effect on Hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "100%", opacity: 0.6 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
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
            )}
          </AnimatePresence>

          {/* Icon with Bounce Effect */}
          <motion.span
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
              rotate: isHovered ? [0, -5, 5, 0] : 0,
            }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 500,
            }}
            style={{
              fontSize: 36,
              marginBottom: 8,
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
            }}
          >
            {partner.icon}
          </motion.span>

          {/* Partner Name */}
          <motion.span
            animate={{
              opacity: isHovered ? 1 : 0.95,
              y: isHovered ? -2 : 0,
            }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              color: "#fff",
              textAlign: "center",
              padding: "0 10px",
              lineHeight: 1.3,
              textShadow: "0 1px 2px rgba(0,0,0,0.2)",
            }}
          >
            {partner.name}
          </motion.span>

          {/* Decorative Rings */}
          <motion.div
            animate={{
              rotate: 360,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{
              rotate: { duration: 12, repeat: Infinity, ease: "linear" },
              scale: { duration: 0.3 },
            }}
            style={{
              position: "absolute",
              inset: -4,
              borderRadius: "50%",
              border: `1.5px solid rgba(255,255,255,0.3)`,
              pointerEvents: "none",
            }}
          />

          <motion.div
            animate={{
              rotate: -360,
              scale: isHovered ? 1.15 : 1,
            }}
            transition={{
              rotate: { duration: 15, repeat: Infinity, ease: "linear" },
              scale: { duration: 0.3 },
            }}
            style={{
              position: "absolute",
              inset: -8,
              borderRadius: "50%",
              border: `1px solid rgba(255,255,255,0.15)`,
              pointerEvents: "none",
            }}
          />

          {/* Pulsing Ring on Hover */}
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
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Infinite Smooth Marquee
// ─────────────────────────────────────────────────────────────────────────────
function InfiniteMarquee({ partners, speed = 40, isInView }) {
  const [isPaused, setIsPaused] = useState(false);
  const [width, setWidth] = useState(0);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    if (contentRef.current && containerRef.current) {
      setWidth(contentRef.current.scrollWidth / 2);
    }
  }, []);

  useEffect(() => {
    if (isInView && !isPaused && width > 0) {
      controls.start({
        x: -width,
        transition: {
          duration: speed,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        },
      });
    } else {
      controls.stop();
    }
  }, [isInView, isPaused, width, speed, controls]);

  // Duplicate partners for seamless infinite loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <div
      ref={containerRef}
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
      <motion.div
        ref={contentRef}
        animate={controls}
        initial={{ x: 0 }}
        style={{
          display: "flex",
          width: "fit-content",
        }}
      >
        {duplicatedPartners.map((partner, idx) => (
          <FloatingBallCard
            key={`${partner.id}-${idx}`}
            partner={partner}
            index={idx}
            isInView={isInView}
          />
        ))}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Partners Component with Single Infinite Marquee
// ─────────────────────────────────────────────────────────────────────────────
export default function Partners() {
  const [ref, inView] = useReveal(0.15);
  const headerControls = useAnimation();

  useEffect(() => {
    if (inView) {
      headerControls.start("visible");
    }
  }, [inView, headerControls]);

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
    <section
      ref={ref}
      style={{
        padding: "clamp(60px, 10vh, 100px) clamp(16px, 5vw, 80px)",
        background: "linear-gradient(135deg, #ffffff 0%, #fefcf8 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Grid */}
      <motion.div
        animate={{
          opacity: inView ? 0.03 : 0,
        }}
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

      {/* Floating Animated Blobs */}
      <motion.div
        animate={{
          y: [0, -30, 0, 30, 0],
          x: [0, 20, 0, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
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
      <motion.div
        animate={{
          y: [0, 30, 0, -30, 0],
          x: [0, -20, 0, 20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
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

      {/* Top Animated Border */}
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
        
        {/* Section Header with Staggered Animation */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={headerControls}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          {/* Eyebrow */}
          <motion.div
            variants={childVariants}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: 30 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                height: 2,
                background: "#C4972A",
                borderRadius: 999,
              }}
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
              style={{
                height: 2,
                background: "#C4972A",
                borderRadius: 999,
              }}
            />
          </motion.div>

          {/* Main Heading */}
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

        {/* Single Infinite Marquee Row */}
        <InfiniteMarquee
          partners={partners}
          speed={45}
          isInView={inView}
        />

        {/* Trust Indicator Badges with Staggered Reveal */}
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
            { icon: "✓", text: "Full Compliance Certified", color: "#64748b" },
            { icon: "⭐", text: "Rated Excellent", color: "#64748b" },
          ].map((badge, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.9 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, type: "spring" } },
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
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{ fontSize: 16 }}
              >
                {badge.icon}
              </motion.span>
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
  );
}