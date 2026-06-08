import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// Modern Recruitment Process — Premium Timeline with 3D Effects
// Features: Staggered animations, 3D cards, particle effects, interactive steps
// ─────────────────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return [ref, isInView];
}

const steps = [
  {
    num: "01",
    title: "Apply Online",
    desc: "Submit your application with basic details and your preferred role type in under 5 minutes.",
    icon: "📝",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    accent: "#667eea",
  },
  {
    num: "02",
    title: "Upload Your CV",
    desc: "Share your CV and relevant certifications securely through our encrypted portal.",
    icon: "📄",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    accent: "#f093fb",
  },
  {
    num: "03",
    title: "Interview",
    desc: "Meet with our dedicated team for a quick and professional interview, virtual or in-person.",
    icon: "🤝",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    accent: "#4facfe",
  },
  {
    num: "04",
    title: "Compliance Checks",
    desc: "We process your enhanced DBS check and verify all required documents seamlessly.",
    icon: "✅",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    accent: "#43e97b",
  },
  {
    num: "05",
    title: "Job Placement",
    desc: "Get placed in a role that matches your skills, location, and career preferences.",
    icon: "🎯",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    accent: "#fa709a",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Modern Step Component with 3D Flip and Interactive Elements
// ─────────────────────────────────────────────────────────────────────────────
function Step({ step, index, isInView }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);

  const stepVariants = {
    hidden: { opacity: 0, x: -50, rotateY: -15 },
    visible: { 
      opacity: 1, 
      x: 0, 
      rotateY: 0,
      transition: { 
        duration: 0.6, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: { 
      scaleY: 1,
      transition: { duration: 0.8, delay: (index + 1) * 0.15 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, delay: index * 0.15 + 0.2 }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={stepVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
        display: "flex",
        gap: "clamp(24px, 4vw, 48px)",
        alignItems: "flex-start",
        position: "relative",
        perspective: "1000px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsExpanded(false);
      }}
    >
      {/* Left Column: Number & Connector */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        {/* Number Circle with Glow Effect */}
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
            boxShadow: isHovered 
              ? "0 0 30px rgba(196,151,42,0.6), 0 8px 24px rgba(0,0,0,0.2)"
              : "0 8px 24px rgba(196,151,42,0.35)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          style={{
            width: "clamp(56px, 8vw, 70px)",
            height: "clamp(56px, 8vw, 70px)",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${step.accent}, ${step.accent}cc)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(18px, 2.5vw, 22px)",
            color: "#fff",
            boxShadow: "0 8px 24px rgba(196,151,42,0.35)",
            position: "relative",
            cursor: "pointer",
          }}
        >
          {/* Inner Ring Animation */}
          <motion.div
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
              opacity: isHovered ? [0.5, 0.2, 0.5] : 0,
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              position: "absolute",
              inset: -8,
              borderRadius: "50%",
              border: `2px solid ${step.accent}`,
              opacity: 0,
            }}
          />
          {step.num}
        </motion.div>

        {/* Connecting Line with Gradient */}
        {index < steps.length - 1 && (
          <motion.div
            variants={lineVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              width: 2,
              flex: 1,
              minHeight: 60,
              background: `linear-gradient(to bottom, ${step.accent} 0%, rgba(196,151,42,0.1) 100%)`,
              margin: "12px 0",
              transformOrigin: "top",
            }}
          />
        )}
      </div>

      {/* Right Column: Step Content */}
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{
          paddingBottom: index < steps.length - 1 ? "clamp(32px, 5vh, 48px)" : 0,
          paddingTop: 8,
          flex: 1,
        }}
      >
        {/* Card Container with Glass Effect */}
        <motion.div
          animate={{
            scale: isHovered ? 1.02 : 1,
            backgroundColor: isHovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
          }}
          transition={{ duration: 0.3 }}
          style={{
            padding: "20px 24px",
            borderRadius: "20px",
            backdropFilter: "blur(10px)",
            border: `1px solid ${isHovered ? `rgba(${parseInt(step.accent.slice(1, 3), 16)}, ${parseInt(step.accent.slice(3, 5), 16)}, ${parseInt(step.accent.slice(5, 7), 16)}, 0.2)` : "rgba(255,255,255,0.1)"}`,
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Header with Icon and Title */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <motion.span
              animate={{
                rotate: isHovered ? [0, -10, 10, -5, 0] : 0,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.5 }}
              style={{ fontSize: "clamp(24px, 3vw, 28px)" }}
            >
              {step.icon}
            </motion.span>
            <motion.h3
              animate={{
                color: isHovered ? step.accent : "#f0c060",
                x: isHovered ? 5 : 0,
              }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(18px, 2.5vw, 22px)",
                fontWeight: 700,
                margin: 0,
              }}
            >
              {step.title}
            </motion.h3>
          </div>

          {/* Description with Expand/Collapse */}
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: isExpanded || isHovered ? 1 : 0.8,
                height: "auto"
              }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                overflow: "hidden",
              }}
            >
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "clamp(13px, 1.6vw, 15px)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {step.desc}
              </p>
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    display: "block",
                    marginTop: 12,
                    paddingTop: 12,
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                    fontSize: "12px",
                    color: step.accent,
                  }}
                >
                  ✨ Ready to begin? Click to learn more about this step.
                </motion.span>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicator */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: isHovered ? "100%" : 0 }}
            transition={{ duration: 0.4 }}
            style={{
              height: 2,
              background: step.gradient,
              marginTop: 16,
              borderRadius: 999,
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Recruitment Process Component
// ─────────────────────────────────────────────────────────────────────────────
export default function RecruitmentProcess() {
  const [ref, inView] = useReveal(0.2);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.5]);

  // Floating particles animation
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 5,
    delay: Math.random() * 5,
  }));

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        padding: "clamp(60px, 10vh, 100px) clamp(16px, 5vw, 80px)",
        background: "linear-gradient(135deg, #0a1628 0%, #0f1d3d 50%, #1a2a4a 100%)",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.sin(particle.id) * 50, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(196,151,42,${0.1 + particle.id * 0.02}), transparent)`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Decorative Gradient Orbs */}
      <motion.div
        style={{ y, opacity }}
        aria-hidden="true"
        css={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "clamp(400px, 60vw, 600px)",
          height: "clamp(400px, 60vw, 600px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,151,42,0.15), transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]), opacity }}
        aria-hidden="true"
        css={{
          position: "absolute",
          bottom: "-20%",
          left: "-10%",
          width: "clamp(350px, 50vw, 500px)",
          height: "clamp(350px, 50vw, 500px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(100,100,255,0.08), transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1000, margin: "0 auto" }}>
        
        {/* Section Header with Enhanced Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "clamp(48px, 8vh, 80px)" }}
        >
          {/* Animated Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 20,
              padding: "6px 16px",
              background: "rgba(196,151,42,0.1)",
              borderRadius: "50px",
              backdropFilter: "blur(10px)",
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ width: 6, height: 6, borderRadius: "50%", background: "#C4972A" }}
            />
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#C4972A",
            }}>
              How It Works
            </span>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ width: 6, height: 6, borderRadius: "50%", background: "#C4972A" }}
            />
          </motion.div>

          {/* Main Heading with Animated Underline */}
          <motion.h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.03em",
              marginBottom: 20,
              position: "relative",
              display: "inline-block",
            }}
          >
            Your Path to{" "}
            <span style={{ color: "#C4972A" }}>Placement</span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                position: "absolute",
                bottom: -10,
                left: 0,
                right: 0,
                height: 3,
                background: "linear-gradient(90deg, transparent, #C4972A, #f0c060, #C4972A, transparent)",
                transformOrigin: "left",
              }}
            />
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(14px, 1.6vw, 16px)",
              color: "rgba(255,255,255,0.7)",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.65,
            }}
          >
            A simple, transparent 5-step journey from application to your dream healthcare role
          </motion.p>
        </motion.div>

        {/* Steps Timeline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {steps.map((step, idx) => (
            <Step key={idx} step={step} index={idx} isInView={inView} />
          ))}
        </div>

        {/* Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{ textAlign: "center", marginTop: "clamp(48px, 8vh, 64px)" }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: "linear-gradient(135deg, #C4972A, #8B6914)",
              border: "none",
              padding: "14px 32px",
              borderRadius: "50px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              color: "#fff",
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(196,151,42,0.3)",
              transition: "all 0.3s ease",
            }}
          >
            Start Your Application Today →
          </motion.button>
        </motion.div>

        {/* Bottom Decorative Line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            marginTop: "clamp(48px, 8vh, 64px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <div style={{ width: 40, height: 1, background: "rgba(196,151,42,0.3)", borderRadius: 999 }} />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#C4972A",
            }}
          />
          <div style={{ width: 40, height: 1, background: "rgba(196,151,42,0.3)", borderRadius: 999 }} />
        </motion.div>
      </div>
    </section>
  );
}