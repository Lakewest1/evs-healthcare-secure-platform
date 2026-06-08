import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// Custom hook for scroll reveal with better performance
// ─────────────────────────────────────────────────────────────────────────────
function useReveal(threshold = 0.2, rootMargin = "0px") {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold, margin: rootMargin });
  return [ref, isInView];
}

// ─────────────────────────────────────────────────────────────────────────────
// Feature Dataset with Unsplash Images
// ─────────────────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    id: 1,
    number: "01",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: "Fast Placement",
    desc: "Immediate start opportunities available for candidates with 5+ months experience in care settings.",
    stat: "48hrs",
    statLabel: "Avg. placement time",
    accent: "#C4972A",
    gradient: "linear-gradient(135deg, #C4972A 0%, #e8b84a 100%)",
    img: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&q=80",
  },
  {
    id: 2,
    number: "02",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    title: "Flexible Shifts",
    desc: "Day, night or weekend, local shifts designed to fit your lifestyle and family commitments.",
    stat: "24/7",
    statLabel: "Support availability",
    accent: "#1a6b4a",
    gradient: "linear-gradient(135deg, #1a6b4a 0%, #2a9d6e 100%)",
    img: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80",
  },
  {
    id: 3,
    number: "03",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
    title: "Competitive Pay",
    desc: "Weekly pay with holiday pay included. Competitive rates across all grades and specialisms.",
    stat: "£18–£45",
    statLabel: "Per hour rates",
    accent: "#C4972A",
    gradient: "linear-gradient(135deg, #C4972A 0%, #e8b84a 100%)",
    img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
  },
  {
    id: 4,
    number: "04",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    title: "NHS Opportunities",
    desc: "Roles in NHS trusts and leading private healthcare providers across North-West England.",
    stat: "150+",
    statLabel: "NHS partner sites",
    accent: "#005EB8",
    gradient: "linear-gradient(135deg, #005EB8 0%, #0088E8 100%)",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
  },
  {
    id: 5,
    number: "05",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    title: "Compliance Support",
    desc: "We handle your enhanced DBS check and all mandatory training including manual handling.",
    stat: "100%",
    statLabel: "Compliance managed",
    accent: "#1a6b4a",
    gradient: "linear-gradient(135deg, #1a6b4a 0%, #2a9d6e 100%)",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
  {
    id: 6,
    number: "06",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "Career Growth",
    desc: "Ongoing training, mentorship and development pathways for every healthcare professional we place.",
    stat: "500+",
    statLabel: "Workers placed",
    accent: "#C4972A",
    gradient: "linear-gradient(135deg, #C4972A 0%, #e8b84a 100%)",
    img: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&q=80",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Modern Feature Card Component with Image Overlay Effect
// ─────────────────────────────────────────────────────────────────────────────
function FeatureCard({ feature, index }) {
  const [ref, inView] = useReveal(0.3);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, x: 100, rotateY: 10 }}
      animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        background: "#fff",
        borderRadius: "28px",
        overflow: "hidden",
        cursor: "pointer",
        transformStyle: "preserve-3d",
      }}
    >
      {/* 3D Tilt Effect on Hover */}
      <motion.div
        animate={{
          rotateX: isHovered ? (mousePosition.y - 50) * 0.1 : 0,
          rotateY: isHovered ? (mousePosition.x - 50) * 0.1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          position: "relative",
          background: "#fff",
          borderRadius: "28px",
          padding: "32px",
          boxShadow: isHovered
            ? "0 30px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(196,151,42,0.2)"
            : "0 4px 20px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)",
          transition: "box-shadow 0.3s ease",
        }}
      >
        {/* Animated Gradient Border on Hover */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "28px",
            padding: "2px",
            background: feature.gradient,
            opacity: 0,
            pointerEvents: "none",
          }}
        >
          <div style={{ background: "#fff", borderRadius: "26px", width: "100%", height: "100%" }} />
        </motion.div>

        {/* Image Overlay on Hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 10,
                borderRadius: "28px",
                overflow: "hidden",
              }}
            >
              {/* Background Image */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${feature.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "brightness(0.9)",
                  transform: "scale(1.05)",
                }}
              />
              {/* Gradient Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(135deg, ${feature.accent}dd, ${feature.accent}99)`,
                }}
              />
              {/* Content on Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "32px",
                  color: "#fff",
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "16px",
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(10px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  {feature.icon}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    color: "#f0c060",
                    marginBottom: 8,
                  }}
                >
                  EVS Healthcare
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, lineHeight: 1.2 }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.9 }}>{feature.desc}</p>
                <motion.div
                  animate={{ width: isHovered ? 40 : 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    height: 3,
                    background: "#fff",
                    borderRadius: 999,
                    marginTop: 24,
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Default Card Content */}
        <motion.div
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          style={{ position: "relative", zIndex: 2 }}
        >
          {/* Card Number Badge */}
          <div
            style={{
              position: "absolute",
              top: 24,
              right: 24,
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 700,
              color: "#e2e8f0",
              letterSpacing: "1px",
            }}
          >
            {feature.number}
          </div>

          {/* Icon with Animation */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
            style={{
              width: 56,
              height: 56,
              borderRadius: "16px",
              background: `linear-gradient(135deg, ${feature.accent}10, ${feature.accent}05)`,
              border: `1px solid ${feature.accent}20`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: feature.accent,
              marginBottom: 24,
            }}
          >
            {feature.icon}
          </motion.div>

          {/* Title */}
          <h3
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: 12,
              letterSpacing: "-0.02em",
            }}
          >
            {feature.title}
          </h3>

          {/* Description */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 400,
              color: "#64748b",
              lineHeight: 1.65,
              marginBottom: 28,
            }}
          >
            {feature.desc}
          </p>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: "linear-gradient(90deg, #e2e8f0, transparent)",
              marginBottom: 20,
            }}
          />

          {/* Stat Row */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <motion.span
              animate={{ color: isHovered ? feature.accent : "#0f172a" }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 24,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              {feature.stat}
            </motion.span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                fontWeight: 500,
                color: "#94a3b8",
              }}
            >
              {feature.statLabel}
            </span>
          </div>
        </motion.div>

        {/* Arrow Indicator */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            bottom: 28,
            right: 28,
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: feature.gradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Modern Section Header Component
// ─────────────────────────────────────────────────────────────────────────────
function SectionHeader() {
  const [ref, inView] = useReveal(0.3);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      style={{ textAlign: "center", marginBottom: 64 }}
    >
      {/* Eyebrow with animated line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div style={{ width: 40, height: 2, background: "#C4972A", borderRadius: 999 }} />
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
          Why EVS Healthcare
        </span>
        <div style={{ width: 40, height: 2, background: "#C4972A", borderRadius: 999 }} />
      </motion.div>

      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(2rem, 4vw, 3.2rem)",
          fontWeight: 800,
          color: "#0f172a",
          letterSpacing: "-0.03em",
          lineHeight: 1.2,
          marginBottom: 20,
        }}
      >
        Your Career,{" "}
        <span style={{ position: "relative", display: "inline-block" }}>
          Our Commitment
          <motion.span
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{
              position: "absolute",
              bottom: -8,
              left: 0,
              right: 0,
              height: 3,
              background: "linear-gradient(90deg, #C4972A, #f0c060)",
              borderRadius: 999,
              transformOrigin: "left",
            }}
          />
        </span>
      </motion.h2>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 16,
          fontWeight: 400,
          color: "#64748b",
          maxWidth: 520,
          margin: "0 auto",
          lineHeight: 1.7,
        }}
      >
        A 24/7 agency placing healthcare professionals into NHS trusts,
        private hospitals and care homes across North-West England.
      </motion.p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero Banner Component
// ─────────────────────────────────────────────────────────────────────────────
function HeroBanner() {
  const [ref, inView] = useReveal(0.3);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 100 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
      style={{
        position: "relative",
        width: "100%",
        height: 420,
        borderRadius: 32,
        overflow: "hidden",
        marginBottom: 64,
        boxShadow: "0 30px 60px -20px rgba(0,0,0,0.25)",
      }}
    >
      {/* Background Image with Parallax Effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 1.2 }}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(15,29,61,0.85), rgba(15,29,61,0.55))",
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "rgba(196,151,42,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4972A" strokeWidth="1.8">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </motion.div>

        <h1
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            color: "#fff",
            marginBottom: 16,
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
          }}
        >
          Exceptional Care,
          <br />
          Trusted Service
        </h1>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "rgba(255,255,255,0.9)",
            fontSize: 16,
            maxWidth: 520,
            lineHeight: 1.65,
          }}
        >
          Professional healthcare staffing solutions tailored to your needs
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────
export default function WhyChooseUs() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700;14..32,800;14..32,900&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .evs-why-section {
          padding: 80px 8% 100px;
          background: linear-gradient(135deg, #ffffff 0%, #faf9f7 100%);
        }

        .evs-why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        @media (max-width: 1100px) {
          .evs-why-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
          .evs-why-section {
            padding: 60px 6% 80px;
          }
        }

        @media (max-width: 640px) {
          .evs-why-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .evs-why-section {
            padding: 48px 5% 60px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
          background: #C4972A;
          border-radius: 4px;
        }
      `}</style>

      <section className="evs-why-section">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <HeroBanner />
          <SectionHeader />
          <div className="evs-why-grid">
            {FEATURES.map((feature, idx) => (
              <FeatureCard key={feature.id} feature={feature} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}