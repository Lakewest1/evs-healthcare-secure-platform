import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FileText, File, Handshake, ShieldCheck, Target, ChevronLeft, ChevronRight } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Modern Recruitment Process — Clean White Background, Performance Optimized
// Features: 5 steps side by side on desktop, responsive grid on tablet, 
//           CAROUSEL/SLIDER on mobile (click to reveal other processes)
// ─────────────────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return [ref, isInView];
}

// Responsive breakpoints
const getResponsiveLayout = () => {
  if (typeof window === 'undefined') return { isDesktop: true, isTablet: false, isMobile: false };
  const width = window.innerWidth;
  return {
    isDesktop: width >= 1024,
    isTablet: width >= 768 && width < 1024,
    isMobile: width < 768,
  };
};

// ── Icon wrapper — consistent sizing and colour for all step icons ──
const StepIconWrapper = ({ icon: Icon, size = 26 }) => (
  <Icon
    size={size}
    strokeWidth={1.6}
    style={{ color: "currentColor", display: "block" }}
    aria-hidden="true"
  />
);

const steps = [
  {
    num: "01",
    title: "Apply Online",
    desc: "Submit your application with basic details and your preferred role type in under 5 minutes.",
    icon: FileText,
    accent: "#C4972A",
  },
  {
    num: "02",
    title: "Upload Your CV",
    desc: "Share your CV and relevant certifications securely through our encrypted portal.",
    icon: File,
    accent: "#C4972A",
  },
  {
    num: "03",
    title: "Interview",
    desc: "Meet with our dedicated team for a quick and professional interview, virtual or in-person.",
    icon: Handshake,
    accent: "#C4972A",
  },
  {
    num: "04",
    title: "Compliance Checks",
    desc: "We process your enhanced DBS check and verify all required documents seamlessly.",
    icon: ShieldCheck,
    accent: "#C4972A",
  },
  {
    num: "05",
    title: "Job Placement",
    desc: "Get placed in a role that matches your skills, location, and career preferences.",
    icon: Target,
    accent: "#C4972A",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Step Component - Clean and Performant
// ─────────────────────────────────────────────────────────────────────────────
function Step({ step, index, isInView, layoutType = "desktop", isActive = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = layoutType === "mobile";

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        delay: index * 0.08,
      }
    }
  };

  // Responsive paddings and sizes
  const getPadding = () => {
    if (layoutType === "mobile") return "28px 20px";
    if (layoutType === "tablet") return "24px 16px";
    return "28px 20px";
  };

  const getTitleSize = () => {
    if (layoutType === "mobile") return "18px";
    if (layoutType === "tablet") return "16px";
    return "18px";
  };

  const getDescSize = () => {
    if (layoutType === "mobile") return "13px";
    if (layoutType === "tablet") return "12px";
    return "13px";
  };

  const getIconSize = () => {
    if (layoutType === "mobile") return 28;
    if (layoutType === "tablet") return 24;
    return 26;
  };

  const getNumberSize = () => {
    if (layoutType === "mobile") return "56px";
    if (layoutType === "tablet") return "48px";
    return "clamp(52px, 7vw, 60px)";
  };

  const isInteractive = layoutType === "desktop" || layoutType === "tablet";

  return (
    <motion.div
      variants={stepVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onMouseEnter={() => isInteractive && setIsHovered(true)}
      onMouseLeave={() => isInteractive && setIsHovered(false)}
      style={{
        background: "#ffffff",
        borderRadius: "24px",
        border: `1px solid ${isActive ? "#C4972A" : (isHovered && isInteractive ? "rgba(196,151,42,0.25)" : "rgba(0,0,0,0.06)")}`,
        padding: getPadding(),
        transition: "all 0.3s ease",
        boxShadow: isActive 
          ? "0 20px 40px -12px rgba(196,151,42,0.25), 0 0 0 1px rgba(196,151,42,0.15)"
          : (isHovered && isInteractive
            ? "0 12px 24px -8px rgba(15,29,61,0.12), 0 0 0 1px rgba(196,151,42,0.1)"
            : "0 2px 8px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)"),
        transform: (isHovered && isInteractive) || isActive ? "translateY(-4px)" : "translateY(0)",
        textAlign: "center",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: isMobile ? "pointer" : "default",
      }}
    >
      {/* Number Circle */}
      <motion.div
        animate={{
          scale: (isHovered && isInteractive) || isActive ? 1.05 : 1,
          borderColor: (isHovered && isInteractive) || isActive ? step.accent : "#e2e8f0",
        }}
        transition={{ duration: 0.3 }}
        style={{
          width: getNumberSize(),
          height: getNumberSize(),
          borderRadius: "50%",
          background: (isActive && isMobile) ? "linear-gradient(135deg, #C4972A, #8B6914)" : "#ffffff",
          border: `2px solid ${(isHovered && isInteractive) || isActive ? step.accent : "#e2e8f0"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 800,
          fontSize: layoutType === "mobile" ? "18px" : "18px",
          color: (isActive && isMobile) ? "#ffffff" : step.accent,
          boxShadow: (isHovered && isInteractive) || isActive ? `0 4px 12px rgba(196,151,42,0.15)` : "none",
          margin: "0 auto 16px auto",
          transition: "all 0.3s ease",
        }}
      >
        {step.num}
      </motion.div>

      {/* Icon */}
      <motion.div
        animate={{
          scale: (isHovered && isInteractive) || isActive ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 12,
          color: (isActive && isMobile) ? "#C4972A" : step.accent,
        }}
      >
        <StepIconWrapper icon={step.icon} size={getIconSize()} />
      </motion.div>

      {/* Title */}
      <motion.h3
        animate={{
          color: (isHovered && isInteractive) || isActive ? step.accent : "#0f1d3d",
        }}
        transition={{ duration: 0.3 }}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: getTitleSize(),
          fontWeight: 700,
          marginBottom: 8,
          letterSpacing: "-0.01em",
        }}
      >
        {step.title}
      </motion.h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          color: "#4a5568",
          fontSize: getDescSize(),
          lineHeight: 1.65,
          margin: 0,
          flex: 1,
        }}
      >
        {step.desc}
      </p>

      {/* Progress Indicator */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ 
          width: ((isHovered && isInteractive) || isActive) ? "40px" : 0,
          opacity: ((isHovered && isInteractive) || isActive) ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          height: 2,
          background: `linear-gradient(90deg, ${step.accent}, #f0c060)`,
          marginTop: 16,
          borderRadius: 2,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Mobile Carousel Component - Users can click through steps
// ─────────────────────────────────────────────────────────────────────────────
function MobileCarousel({ steps, isInView }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % steps.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const goToStep = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const currentStep = steps[currentIndex];

  return (
    <div style={{ position: "relative", padding: "0 10px" }}>
      {/* Carousel Container */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          style={{ width: "100%" }}
        >
          <Step
            step={currentStep}
            index={currentIndex}
            isInView={isInView}
            layoutType="mobile"
            isActive={true}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        aria-label="Previous step"
        style={{
          position: "absolute",
          left: -15,
          top: "50%",
          transform: "translateY(-50%)",
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "#ffffff",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#C4972A";
          e.currentTarget.querySelector('svg').style.stroke = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#ffffff";
          e.currentTarget.querySelector('svg').style.stroke = "#C4972A";
        }}
      >
        <ChevronLeft size={20} strokeWidth={2.5} style={{ color: "#C4972A" }} />
      </button>

      <button
        onClick={handleNext}
        aria-label="Next step"
        style={{
          position: "absolute",
          right: -15,
          top: "50%",
          transform: "translateY(-50%)",
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "#ffffff",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#C4972A";
          e.currentTarget.querySelector('svg').style.stroke = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#ffffff";
          e.currentTarget.querySelector('svg').style.stroke = "#C4972A";
        }}
      >
        <ChevronRight size={20} strokeWidth={2.5} style={{ color: "#C4972A" }} />
      </button>

      {/* Progress Dots */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          marginTop: 28,
        }}
      >
        {steps.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToStep(idx)}
            style={{
              width: idx === currentIndex ? 32 : 8,
              height: 8,
              borderRadius: 4,
              border: "none",
              background: idx === currentIndex ? "#C4972A" : "rgba(0,0,0,0.15)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            aria-label={`Go to step ${idx + 1}`}
          />
        ))}
      </div>

      {/* Step Counter */}
      <div
        style={{
          textAlign: "center",
          marginTop: 16,
          fontFamily: "'Inter', sans-serif",
          fontSize: 12,
          color: "#94a3b8",
        }}
      >
        Step {currentIndex + 1} of {steps.length}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Recruitment Process Component - Fully Responsive
// ─────────────────────────────────────────────────────────────────────────────
export default function RecruitmentProcess() {
  const [ref, inView] = useReveal(0.2);
  const [layoutType, setLayoutType] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      const { isDesktop, isTablet, isMobile } = getResponsiveLayout();
      if (isDesktop) setLayoutType("desktop");
      else if (isTablet) setLayoutType("tablet");
      else setLayoutType("mobile");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = layoutType === "mobile";
  const isTablet = layoutType === "tablet";

  // Responsive grid layout for tablet
  const getGridStyles = () => {
    if (isTablet) {
      return {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "20px",
      };
    }
    return {
      display: "flex",
      flexDirection: "row",
      gap: "22px",
      justifyContent: "center",
      alignItems: "stretch",
    };
  };

  // Split steps for tablet view (2-2-1 layout)
  const firstTwoSteps = steps.slice(0, 2);
  const nextTwoSteps = steps.slice(2, 4);
  const lastStep = steps.slice(4, 5);

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
      {/* Decorative Background Elements */}
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

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto" }}>
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "clamp(40px, 8vh, 56px)" }}
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
                fontSize: 10,
                fontWeight: 700,
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
              color: "#0f1d3d",
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
              color: "#4a5568",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.65,
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
              height: 2.5,
              background: "linear-gradient(90deg, #C4972A, #f0c060)",
              borderRadius: 999,
              margin: "24px auto 0",
            }}
          />
        </motion.div>

        {/* Steps - Responsive Layout */}
        {isMobile ? (
          // MOBILE: Carousel/Slider with click navigation
          <MobileCarousel steps={steps} isInView={inView} />
        ) : isTablet ? (
          // Tablet: 2x2 grid + centered last card
          <div>
            <div style={getGridStyles()}>
              {firstTwoSteps.map((step, idx) => (
                <Step key={idx} step={step} index={idx} isInView={inView} layoutType={layoutType} />
              ))}
            </div>
            <div style={getGridStyles()} className="tablet-middle-row">
              {nextTwoSteps.map((step, idx) => (
                <Step key={idx + 2} step={step} index={idx + 2} isInView={inView} layoutType={layoutType} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
              <div style={{ width: "calc(50% - 10px)" }}>
                {lastStep.map((step, idx) => (
                  <Step key={idx + 4} step={step} index={idx + 4} isInView={inView} layoutType={layoutType} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Desktop: 5 cards side by side in one row
          <div style={getGridStyles()}>
            {steps.map((step, idx) => (
              <Step key={idx} step={step} index={idx} isInView={inView} layoutType={layoutType} />
            ))}
          </div>
        )}

        {/* Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{ textAlign: "center", marginTop: "clamp(48px, 8vh, 64px)" }}
        >
          <motion.button
            whileHover={{ scale: isMobile ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: "linear-gradient(135deg, #C4972A, #8B6914)",
              border: "none",
              padding: "clamp(12px, 2vh, 14px) clamp(28px, 5vw, 36px)",
              borderRadius: "50px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(13px, 1.5vw, 14px)",
              fontWeight: 600,
              color: "#0f1d3d",
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

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700;14..32,800;14..32,900&display=swap');

        @media (max-width: 1024px) and (min-width: 768px) {
          .tablet-middle-row {
            margin-top: 20px;
          }
        }

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