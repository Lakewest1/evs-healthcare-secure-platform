import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// Modern Recruitment Process — Clean White Background, Performance Optimized
// Features: Staggered animations, clean cards, no lag on scroll
// ─────────────────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return [ref, isInView];
}

// Detect mobile for performance
const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

const steps = [
  {
    num: "01",
    title: "Apply Online",
    desc: "Submit your application with basic details and your preferred role type in under 5 minutes.",
    icon: "📝",
    accent: "#C4972A",
    bgGradient: "linear-gradient(135deg, #FFF8F0, #FFFFFF)",
  },
  {
    num: "02",
    title: "Upload Your CV",
    desc: "Share your CV and relevant certifications securely through our encrypted portal.",
    icon: "📄",
    accent: "#C4972A",
    bgGradient: "linear-gradient(135deg, #FFFFFF, #FFF8F0)",
  },
  {
    num: "03",
    title: "Interview",
    desc: "Meet with our dedicated team for a quick and professional interview, virtual or in-person.",
    icon: "🤝",
    accent: "#C4972A",
    bgGradient: "linear-gradient(135deg, #FFF8F0, #FFFFFF)",
  },
  {
    num: "04",
    title: "Compliance Checks",
    desc: "We process your enhanced DBS check and verify all required documents seamlessly.",
    icon: "✅",
    accent: "#C4972A",
    bgGradient: "linear-gradient(135deg, #FFFFFF, #FFF8F0)",
  },
  {
    num: "05",
    title: "Job Placement",
    desc: "Get placed in a role that matches your skills, location, and career preferences.",
    icon: "🎯",
    accent: "#C4972A",
    bgGradient: "linear-gradient(135deg, #FFF8F0, #FFFFFF)",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Step Component - Clean and Performant
// ─────────────────────────────────────────────────────────────────────────────
function Step({ step, index, isInView }) {
  const [isHovered, setIsHovered] = useState(false);
  const mobile = isMobile();

  const stepVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5, 
        delay: index * 0.1,
      }
    }
  };

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: { 
      scaleY: 1,
      transition: { duration: 0.6, delay: (index + 1) * 0.1 }
    }
  };

  return (
    <motion.div
      variants={stepVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
        display: "flex",
        gap: "clamp(20px, 4vw, 32px)",
        alignItems: "flex-start",
        position: "relative",
      }}
      onMouseEnter={() => !mobile && setIsHovered(true)}
      onMouseLeave={() => !mobile && setIsHovered(false)}
    >
      {/* Left Column: Number & Connector */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        {/* Number Circle */}
        <motion.div
          animate={{
            scale: isHovered && !mobile ? 1.05 : 1,
            borderColor: isHovered && !mobile ? step.accent : "#e2e8f0",
          }}
          transition={{ duration: 0.3 }}
          style={{
            width: "clamp(50px, 7vw, 60px)",
            height: "clamp(50px, 7vw, 60px)",
            borderRadius: "50%",
            background: "#fff",
            border: `2px solid ${isHovered && !mobile ? step.accent : "#e2e8f0"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(16px, 2.5vw, 18px)",
            color: step.accent,
            boxShadow: isHovered && !mobile ? `0 4px 12px ${step.accent}30` : "none",
            position: "relative",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          {step.num}
        </motion.div>

        {/* Connecting Line */}
        {index < steps.length - 1 && (
          <motion.div
            variants={lineVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              width: 2,
              flex: 1,
              minHeight: mobile ? 40 : 50,
              background: "linear-gradient(to bottom, #C4972A 0%, #f0c060 100%)",
              margin: "8px 0",
              transformOrigin: "top",
              borderRadius: 2,
            }}
          />
        )}
      </div>

      {/* Right Column: Step Content */}
      <motion.div
        style={{
          paddingBottom: index < steps.length - 1 ? "clamp(24px, 4vh, 32px)" : 0,
          paddingTop: 4,
          flex: 1,
        }}
      >
        {/* Card Container */}
        <motion.div
          animate={{
            scale: isHovered && !mobile ? 1.01 : 1,
            boxShadow: isHovered && !mobile 
              ? "0 8px 25px rgba(0,0,0,0.08), 0 0 0 1px rgba(196,151,42,0.2)"
              : "0 2px 8px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.03)",
          }}
          transition={{ duration: 0.3 }}
          style={{
            padding: "clamp(16px, 3vw, 20px) clamp(20px, 4vw, 24px)",
            borderRadius: "20px",
            background: "#ffffff",
            border: "1px solid #f0f0f0",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          {/* Header with Icon and Title */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <motion.span
              animate={{
                scale: isHovered && !mobile ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
              style={{ 
                fontSize: "clamp(22px, 3vw, 26px)",
                background: `linear-gradient(135deg, ${step.accent}15, ${step.accent}05)`,
                padding: "8px",
                borderRadius: "12px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {step.icon}
            </motion.span>
            <motion.h3
              animate={{
                color: isHovered && !mobile ? step.accent : "#1e293b",
              }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(16px, 2.5vw, 18px)",
                fontWeight: 700,
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              {step.title}
            </motion.h3>
          </div>

          {/* Description */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#64748b",
              fontSize: "clamp(13px, 1.6vw, 14px)",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            {step.desc}
          </p>

          {/* Progress Indicator on Hover */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ 
              width: isHovered && !mobile ? "40px" : 0,
              opacity: isHovered && !mobile ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            style={{
              height: 2,
              background: `linear-gradient(90deg, ${step.accent}, #f0c060)`,
              marginTop: 14,
              borderRadius: 2,
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Recruitment Process Component - White Background, No Lag
// ─────────────────────────────────────────────────────────────────────────────
export default function RecruitmentProcess() {
  const [ref, inView] = useReveal(0.2);
  const mobile = isMobile();

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        padding: "clamp(60px, 10vh, 100px) clamp(16px, 5vw, 80px)",
        background: "#ffffff",
        overflow: "hidden",
      }}
    >
      {/* Decorative Background Elements - Simplified for Performance */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "clamp(300px, 40vw, 500px)",
          height: "clamp(300px, 40vw, 500px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,151,42,0.03), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "-10%",
          width: "clamp(250px, 35vw, 400px)",
          height: "clamp(250px, 35vw, 400px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,151,42,0.02), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 900, margin: "0 auto" }}>
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "clamp(40px, 8vh, 60px)" }}
        >
          {/* Eyebrow Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                width: 30,
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
              How It Works
            </span>
            <div
              style={{
                width: 30,
                height: 2,
                background: "#C4972A",
                borderRadius: 999,
              }}
            />
          </div>

          {/* Main Heading */}
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              color: "#0f172a",
              letterSpacing: "-0.02em",
              marginBottom: 16,
            }}
          >
            Your Path to{" "}
            <span style={{ color: "#C4972A" }}>Placement</span>
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(14px, 1.6vw, 15px)",
              color: "#64748b",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            A simple, transparent 5-step journey from application to your dream healthcare role
          </p>

          {/* Decorative Underline */}
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: 60 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              height: 2,
              background: "linear-gradient(90deg, #C4972A, #f0c060)",
              borderRadius: 999,
              margin: "24px auto 0",
            }}
          />
        </motion.div>

        {/* Steps Timeline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {steps.map((step, idx) => (
            <Step key={idx} step={step} index={idx} isInView={inView} />
          ))}
        </div>

        {/* Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{ textAlign: "center", marginTop: "clamp(40px, 6vh, 56px)" }}
        >
          <motion.button
            whileHover={{ scale: mobile ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: "linear-gradient(135deg, #C4972A, #8B6914)",
              border: "none",
              padding: "clamp(12px, 2vh, 14px) clamp(28px, 5vw, 36px)",
              borderRadius: "50px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(13px, 1.5vw, 14px)",
              fontWeight: 600,
              color: "#fff",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(196,151,42,0.3)",
              transition: "all 0.2s ease",
            }}
          >
            Start Your Application Today →
          </motion.button>
        </motion.div>

        {/* Bottom Decorative Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          style={{
            marginTop: "clamp(40px, 6vh, 56px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <div style={{ width: 50, height: 1, background: "rgba(196,151,42,0.2)", borderRadius: 999 }} />
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#C4972A",
              opacity: 0.6,
            }}
          />
          <div style={{ width: 50, height: 1, background: "rgba(196,151,42,0.2)", borderRadius: 999 }} />
        </motion.div>
      </div>

      {/* CSS for reduced motion */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700;14..32,800;14..32,900&display=swap');

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}