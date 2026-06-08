import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// Modern Testimonials Section — Premium Carousel with Advanced Interactions
// Features: Auto-play carousel, 3D card flip, animated quotes, star ratings
// ─────────────────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return [ref, isInView];
}

const testimonials = [
  {
    id: 1,
    name: "Amara O.",
    role: "Registered Nurse",
    text: "EVS Healthcare placed me within two weeks of registering. The team was professional, handled all my compliance paperwork, and I'm now working regular shifts locally. Couldn't be happier.",
    rating: 5,
    avatar: "👩‍⚕️",
    location: "Manchester",
    date: "3 months ago",
    verified: true,
  },
  {
    id: 2,
    name: "David M.",
    role: "Healthcare Care Assistant",
    text: "I had no previous care experience but EVS gave me mandatory training and helped me get my DBS. Within a month I was working and loving every shift. They truly care.",
    rating: 5,
    avatar: "👨‍⚕️",
    location: "Liverpool",
    date: "2 months ago",
    verified: true,
  },
  {
    id: 3,
    name: "Fatima K.",
    role: "Support Worker",
    text: "The flexible working hours are a lifesaver for me as a single mum. EVS understood my situation and found local shifts that work around my family. The weekly pay is brilliant.",
    rating: 5,
    avatar: "👩‍🎓",
    location: "Preston",
    date: "1 month ago",
    verified: true,
  },
  {
    id: 4,
    name: "James W.",
    role: "Mental Health Nurse",
    text: "The team at EVS is exceptional. They found me a role that perfectly matches my skills and experience. The onboarding process was smooth and professional.",
    rating: 5,
    avatar: "🧠",
    location: "Blackburn",
    date: "2 weeks ago",
    verified: true,
  },
  {
    id: 5,
    name: "Sarah J.",
    role: "Senior Carer",
    text: "I've been with EVS for over a year now. The consistent work, competitive pay, and supportive team make them stand out from other agencies.",
    rating: 5,
    avatar: "❤️",
    location: "Bolton",
    date: "1 week ago",
    verified: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Testimonial Card Component with 3D Effect
// ─────────────────────────────────────────────────────────────────────────────
function TestimonialCard({ testimonial, isActive, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.9, rotateY: -10 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      rotateY: 0,
      transition: { duration: 0.5, type: "spring", stiffness: 200 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      rotateY: 10,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div
      key={testimonial.id}
      variants={cardVariants}
      initial="initial"
      animate={isActive ? "animate" : "exit"}
      exit="exit"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        perspective: "1000px",
      }}
    >
      <motion.div
        animate={{
          rotateX: isHovered ? (mousePosition.y - 50) * 0.1 : 0,
          rotateY: isHovered ? (mousePosition.x - 50) * 0.1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          background: "#ffffff",
          borderRadius: "32px",
          padding: "clamp(40px, 6vw, 60px) clamp(32px, 5vw, 48px)",
          boxShadow: isHovered
            ? "0 30px 60px -20px rgba(0,0,0,0.25), 0 0 0 1px rgba(196,151,42,0.15)"
            : "0 20px 40px -20px rgba(0,0,0,0.1)",
          border: `1px solid ${isHovered ? "rgba(196,151,42,0.2)" : "rgba(0,0,0,0.05)"}`,
          position: "relative",
          overflow: "hidden",
          transition: "box-shadow 0.3s ease, border-color 0.3s ease",
        }}
      >
        {/* Animated Background Gradient */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.05 : 0,
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(196,151,42,0.8), transparent 60%)`,
          }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            borderRadius: "32px",
          }}
        />

        {/* Decorative Corner Accents */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.6 : 0.2,
          }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            width: 40,
            height: 40,
            borderTop: "2px solid #C4972A",
            borderLeft: "2px solid #C4972A",
            borderRadius: "8px 0 0 0",
            pointerEvents: "none",
          }}
        />
        <motion.div
          animate={{
            opacity: isHovered ? 0.6 : 0.2,
          }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            bottom: 24,
            right: 24,
            width: 40,
            height: 40,
            borderBottom: "2px solid #C4972A",
            borderRight: "2px solid #C4972A",
            borderRadius: "0 0 8px 0",
            pointerEvents: "none",
          }}
        />

        {/* Animated Quote Icon */}
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 5 : 0,
          }}
          transition={{ type: "spring", stiffness: 400 }}
          style={{
            fontSize: 64,
            color: "#f0c060",
            fontFamily: "Georgia, serif",
            lineHeight: 0.8,
            marginBottom: 24,
            opacity: 0.4,
          }}
        >
          "
        </motion.div>

        {/* Testimonial Text */}
        <motion.p
          animate={{
            y: isHovered ? -2 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: "'Inter', serif",
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "#334155",
            lineHeight: 1.8,
            fontStyle: "italic",
            marginBottom: 32,
          }}
        >
          {testimonial.text}
        </motion.p>

        {/* Star Rating */}
        <motion.div
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 6,
            marginBottom: 24,
          }}
        >
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1, type: "spring" }}
              style={{ color: "#f0c060", fontSize: 20 }}
            >
              ★
            </motion.span>
          ))}
        </motion.div>

        {/* Avatar and User Info */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 360 : 0,
            }}
            transition={{ duration: 0.5 }}
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(196,151,42,0.15), rgba(196,151,42,0.05))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
            }}
          >
            {testimonial.avatar}
          </motion.div>
          <div style={{ textAlign: "left" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 4,
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  color: "#0f1d3d",
                  fontSize: 18,
                }}
              >
                {testimonial.name}
              </span>
              {testimonial.verified && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    background: "#10b981",
                    color: "#fff",
                    fontSize: 10,
                    padding: "2px 6px",
                    borderRadius: "20px",
                    fontWeight: 600,
                  }}
                >
                  ✓ Verified
                </motion.span>
              )}
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                color: "#C4972A",
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 2,
              }}
            >
              {testimonial.role}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                color: "#94a3b8",
              }}
            >
              <span>📍 {testimonial.location}</span>
              <span>•</span>
              <span>🕒 {testimonial.date}</span>
            </div>
          </div>
        </div>

        {/* Decorative Floating Particles */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0, y: 0, x: 0 }}
                  animate={{ 
                    opacity: [0, 0.6, 0],
                    scale: [0, 1, 0],
                    y: [0, -30, -60],
                    x: [(i - 1) * 15, (i - 1) * 25, (i - 1) * 35]
                  }}
                  transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                  style={{
                    position: "absolute",
                    bottom: "20%",
                    left: `${30 + i * 20}%`,
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: `rgba(196,151,42, ${0.3 + i * 0.2})`,
                    pointerEvents: "none",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Testimonials Component with Carousel
// ─────────────────────────────────────────────────────────────────────────────
export default function Testimonials() {
  const [ref, inView] = useReveal(0.2);
  const [active, setActive] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);

  const totalTestimonials = testimonials.length;

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && inView) {
      autoPlayRef.current = setInterval(() => {
        setActive((prev) => (prev + 1) % totalTestimonials);
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, inView, totalTestimonials]);

  const handleDotClick = (index) => {
    setActive(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + totalTestimonials) % totalTestimonials);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleNext = () => {
    setActive((prev) => (prev + 1) % totalTestimonials);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentTestimonial = testimonials[active];

  return (
    <section
      ref={ref}
      style={{
        padding: "clamp(60px, 10vh, 100px) clamp(16px, 5vw, 80px)",
        background: "linear-gradient(135deg, #fefcf8 0%, #faf9f7 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Decorations */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: "clamp(300px, 40vw, 500px)",
          height: "clamp(300px, 40vw, 500px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,151,42,0.05), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-10%",
          width: "clamp(300px, 40vw, 500px)",
          height: "clamp(300px, 40vw, 500px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,151,42,0.03), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
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
              Testimonials
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

          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 800,
              color: "#0f1d3d",
              letterSpacing: "-0.02em",
              marginBottom: 16,
            }}
          >
            What Our Workers Say
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: "#64748b",
              maxWidth: 480,
              margin: "0 auto 48px",
              lineHeight: 1.65,
            }}
          >
            Real stories from healthcare professionals who found their perfect role through EVS
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div style={{ position: "relative" }}>
          <AnimatePresence mode="wait">
            <TestimonialCard
              key={active}
              testimonial={currentTestimonial}
              isActive={true}
              index={active}
            />
          </AnimatePresence>

          {/* Navigation Arrows */}
          <motion.button
            whileHover={{ scale: 1.1, x: -3 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            style={{
              position: "absolute",
              left: -20,
              top: "50%",
              transform: "translateY(-50%)",
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.1)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              zIndex: 10,
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#C4972A"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, x: 3 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            style={{
              position: "absolute",
              right: -20,
              top: "50%",
              transform: "translateY(-50%)",
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.1)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              zIndex: 10,
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#C4972A"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </motion.button>
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            width: "100%",
            height: 3,
            background: "rgba(0,0,0,0.05)",
            borderRadius: 3,
            marginTop: 48,
            overflow: "hidden",
          }}
        >
          <motion.div
            key={active}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
            onAnimationComplete={() => {
              if (isAutoPlaying) {
                // Auto-play handled by interval
              }
            }}
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #C4972A, #f0c060)",
              borderRadius: 3,
            }}
          />
        </motion.div>

        {/* Navigation Dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 12,
            marginTop: 32,
          }}
        >
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleDotClick(i)}
              style={{
                width: i === active ? 32 : 10,
                height: 10,
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                background: i === active ? "linear-gradient(135deg, #C4972A, #8B6914)" : "#d1d5db",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            marginTop: 48,
            display: "flex",
            justifyContent: "center",
            gap: 32,
            flexWrap: "wrap",
            paddingTop: 32,
            borderTop: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 20 }}>⭐</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#64748b" }}>
              4.9 Average Rating
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 20 }}>👥</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#64748b" }}>
              500+ Happy Workers
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 20 }}>✓</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#64748b" }}>
              100% Verified Reviews
            </span>
          </div>
        </motion.div>

        {/* Bottom Decorative Line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{
            marginTop: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <div style={{ width: 60, height: 1, background: "rgba(196,151,42,0.3)", borderRadius: 999 }} />
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
          <div style={{ width: 60, height: 1, background: "rgba(196,151,42,0.3)", borderRadius: 999 }} />
        </motion.div>
      </div>
    </section>
  );
}