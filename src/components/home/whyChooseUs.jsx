// components/home/WhyChooseUs.jsx
import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// Custom hook for scroll reveal
// ─────────────────────────────────────────────────────────────────────────────
function useReveal(threshold = 0.2, rootMargin = "0px") {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold, margin: rootMargin });
  return [ref, isInView];
}

// Detect mobile
const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

// ─────────────────────────────────────────────────────────────────────────────
// Feature Dataset with Images
// ─────────────────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    id: 1,
    title: "Fast Placement",
    desc: "Immediate start opportunities available for candidates with 5+ months experience in care settings.",
    stat: "48hrs",
    statLabel: "avg. placement time",
    accent: "#C4972A",
    img: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&q=80",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: "Flexible Shifts",
    desc: "Day, night or weekend, local shifts designed to fit your lifestyle and family commitments.",
    stat: "24/7",
    statLabel: "support availability",
    accent: "#C4972A",
    img: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: "Competitive Pay",
    desc: "Weekly pay with holiday pay included. Competitive rates across all grades and specialisms.",
    stat: "£18–£45",
    statLabel: "per hour rates",
    accent: "#C4972A",
    img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
  },
  {
    id: 4,
    title: "NHS Opportunities",
    desc: "Roles in NHS trusts and leading private healthcare providers across North-West England.",
    stat: "150+",
    statLabel: "NHS partner sites",
    accent: "#005EB8",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    id: 5,
    title: "Compliance Support",
    desc: "We handle your enhanced DBS check and all mandatory training including manual handling.",
    stat: "100%",
    statLabel: "compliance managed",
    accent: "#C4972A",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
    ),
  },
  {
    id: 6,
    title: "Career Growth",
    desc: "Ongoing training, mentorship and development pathways for every healthcare professional we place.",
    stat: "500+",
    statLabel: "workers placed",
    accent: "#C4972A",
    img: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&q=80",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Feature Card - With Overlay Image on Hover
// Uses: Expand on click for mobile, subtle overlay image on hover for desktop
// ─────────────────────────────────────────────────────────────────────────────
function FeatureCard({ feature, index }) {
  const [ref, inView] = useReveal(0.3);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const mobile = isMobile();

  // Handle expand on click for mobile
  const handleClick = () => {
    if (mobile) {
      setIsExpanded(!isExpanded);
    }
  };

  // Motion variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const statBarVariants = {
    hidden: { width: 0 },
    visible: { 
      width: "100%",
      transition: { duration: 0.8, delay: index * 0.1 + 0.3 }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    },
    exit: { 
      opacity: 0, 
      scale: 1.05,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      onMouseEnter={() => !mobile && setIsHovered(true)}
      onMouseLeave={() => !mobile && setIsHovered(false)}
      onClick={handleClick}
      style={{
        position: "relative",
        background: "#ffffff",
        borderRadius: "20px",
        border: `1px solid ${isHovered && !mobile ? "rgba(196,151,42,0.25)" : "#f0f0f0"}`,
        cursor: mobile ? "pointer" : "default",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        boxShadow: isHovered && !mobile ? "0 8px 25px rgba(0,0,0,0.08)" : "none",
        minWidth: mobile ? 280 : "auto",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Image Overlay on Hover - Desktop Only */}
      {!mobile && (
        <AnimatePresence>
          {isHovered && (
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 10,
                borderRadius: "20px",
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
              {/* Content on Overlay */}
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
                  padding: "28px",
                  color: "#fff",
                }}
              >
                {/* Icon on overlay */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "14px",
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(10px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                    color: "#fff",
                  }}
                >
                  {feature.icon}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: 8,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {feature.title}
                </h3>

                {/* Stat on overlay */}
                <div style={{ marginBottom: 12 }}>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "28px",
                      fontWeight: 800,
                      color: "#fff",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    {feature.stat}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "11px",
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.7)",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      marginLeft: 8,
                    }}
                  >
                    {feature.statLabel}
                  </span>
                </div>

                {/* Description on overlay */}
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.85)",
                    lineHeight: 1.6,
                    marginBottom: 16,
                  }}
                >
                  {feature.desc.length > 120 ? feature.desc.substring(0, 120) + "..." : feature.desc}
                </p>

                {/* Learn more indicator */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: 500,
                    opacity: 0.8,
                  }}
                >
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Card Content - Always Visible */}
      <div style={{ padding: "24px", position: "relative", zIndex: 2 }}>
        {/* Icon Row */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "14px",
            background: `linear-gradient(135deg, ${feature.accent}12, ${feature.accent}05)`,
            border: `1px solid ${feature.accent}15`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: feature.accent,
            marginBottom: 20,
            transition: "transform 0.2s ease",
            transform: isHovered && !mobile ? "scale(1.02)" : "scale(1)",
          }}
        >
          {feature.icon}
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "18px",
            fontWeight: 700,
            color: "#0f172a",
            marginBottom: 8,
            letterSpacing: "-0.02em",
          }}
        >
          {feature.title}
        </h3>

        {/* Stat Row */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "24px",
                fontWeight: 800,
                color: feature.accent,
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              {feature.stat}
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {feature.statLabel}
            </span>
          </div>
          {/* Visual indicator bar */}
          <motion.div
            variants={statBarVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{
              height: 2,
              background: `linear-gradient(90deg, ${feature.accent}, ${feature.accent}20)`,
              borderRadius: 2,
              marginTop: 8,
              maxWidth: 60,
            }}
          />
        </div>

        {/* Short Description - Always visible */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "13.5px",
            fontWeight: 400,
            color: "#64748b",
            lineHeight: 1.6,
            marginBottom: 0,
          }}
        >
          {isExpanded || (!mobile && isHovered) ? feature.desc : feature.desc.substring(0, 90) + "..."}
        </p>

        {/* Expand Indicator for Mobile */}
        {mobile && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: 16,
              color: feature.accent,
              fontSize: "12px",
              fontWeight: 500,
            }}
          >
            <span>{isExpanded ? "Show less" : "Read more"}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Horizontal Scroll Component for Mobile
// ─────────────────────────────────────────────────────────────────────────────
function HorizontalScroll({ children }) {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 20);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container && isMobileDevice) {
      container.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [isMobileDevice]);

  if (!isMobileDevice) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px" }}>
        {children}
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          style={{
            position: "absolute",
            left: -10,
            top: "50%",
            transform: "translateY(-50%)",
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#fff",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            cursor: "pointer",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C4972A" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          style={{
            position: "absolute",
            right: -10,
            top: "50%",
            transform: "translateY(-50%)",
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#fff",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            cursor: "pointer",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C4972A" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      <div
        ref={scrollContainerRef}
        style={{
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          gap: "20px",
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "thin",
          paddingBottom: "10px",
        }}
        className="hide-scrollbar"
      >
        {children}
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          height: 3px;
        }
        .hide-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          borderRadius: 3px;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb {
          background: #C4972A;
          borderRadius: 3px;
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section Header Component
// ─────────────────────────────────────────────────────────────────────────────
function SectionHeader() {
  const [ref, inView] = useReveal(0.3);

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.15 }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      ref={ref}
      variants={headerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{ textAlign: "center", marginBottom: 56 }}
    >
      <motion.div variants={childVariants}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
          }}
        >
          <div style={{ width: 30, height: 2, background: "#C4972A", borderRadius: 999 }} />
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
            Why Choose Us
          </span>
          <div style={{ width: 30, height: 2, background: "#C4972A", borderRadius: 999 }} />
        </div>
      </motion.div>

      <motion.h2
        variants={childVariants}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          fontWeight: 800,
          color: "#0f172a",
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
          marginBottom: 16,
        }}
      >
        Your Career,{" "}
        <span style={{ color: "#C4972A" }}>Our Commitment</span>
      </motion.h2>

      <motion.p
        variants={childVariants}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "15px",
          fontWeight: 400,
          color: "#64748b",
          maxWidth: 520,
          margin: "0 auto",
          lineHeight: 1.65,
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
  const mobile = isMobile();

  const bannerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={bannerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{
        position: "relative",
        width: "100%",
        height: mobile ? 280 : 380,
        borderRadius: 24,
        overflow: "hidden",
        marginBottom: 56,
        boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(15,29,61,0.85), rgba(15,29,61,0.6))",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <h1
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: mobile ? "clamp(1.5rem, 6vw, 2rem)" : "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
            color: "#fff",
            marginBottom: 12,
            letterSpacing: "-0.02em",
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
            fontSize: mobile ? 13 : 15,
            maxWidth: 480,
            lineHeight: 1.6,
          }}
        >
          Professional healthcare staffing solutions tailored to your needs
        </p>
      </div>
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
          padding: 60px 5% 80px;
          background: #ffffff;
        }

        @media (min-width: 768px) {
          .evs-why-section {
            padding: 80px 8% 100px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <section className="evs-why-section">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <HeroBanner />
          <SectionHeader />
          <HorizontalScroll>
            {FEATURES.map((feature, idx) => (
              <FeatureCard key={feature.id} feature={feature} index={idx} />
            ))}
          </HorizontalScroll>
        </div>
      </section>
    </>
  );
}