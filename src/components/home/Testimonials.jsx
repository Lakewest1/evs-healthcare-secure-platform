import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  Star, 
  Verified, 
  User, 
  Stethoscope, 
  Heart, 
  Brain,
  Briefcase,
  Clock,
  Users,
  CheckCircle,
  Quote,
  Award,
  ThumbsUp,
  MapPin
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Modern Testimonials Section — Carousel with 3 visible testimonials
// Features: 3 testimonials visible at once, 5-second auto-slide
// Updated: Removed self-referential Google Reviews card
//          Integrated rating badge into section header
// ─────────────────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return [ref, isInView];
}

// Avatar icon mapping based on role
const getAvatarIcon = (role, name) => {
  if (role.includes("Nurse") || role.includes("RGN") || role.includes("RMN")) return Stethoscope;
  if (role.includes("Care Assistant") || role.includes("Home Care")) return Heart;
  if (role.includes("Support Worker")) return Users;
  if (role.includes("Senior Carer")) return Award;
  if (role.includes("Coordinator")) return Briefcase;
  return User;
};

const testimonials = [
  {
    id: 1,
    name: "Amara O.",
    role: "Registered Nurse",
    text: "EVS Healthcare placed me within two weeks of registering. The team was professional, handled all my compliance paperwork, and I'm now working regular shifts locally. Couldn't be happier.",
    rating: 5,
    avatarIcon: Stethoscope,
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
    avatarIcon: Heart,
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
    avatarIcon: Users,
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
    avatarIcon: Brain,
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
    avatarIcon: Award,
    location: "Bolton",
    date: "1 week ago",
    verified: true,
  },
  {
    id: 6,
    name: "Michael T.",
    role: "Care Coordinator",
    text: "Professional, responsive, and genuinely caring. EVS has transformed how we recruit temporary staff. Highly recommended!",
    rating: 5,
    avatarIcon: Briefcase,
    location: "Manchester",
    date: "2 weeks ago",
    verified: true,
  },
  {
    id: 7,
    name: "Linda P.",
    role: "Home Care Assistant",
    text: "The training provided was excellent. I felt fully prepared for my first shift. Support team is always available when needed.",
    rating: 5,
    avatarIcon: Heart,
    location: "Preston",
    date: "3 weeks ago",
    verified: true,
  },
  {
    id: 8,
    name: "Robert K.",
    role: "RGN Nurse",
    text: "Best agency I've worked with. Consistent shifts, great pay, and they actually listen to your preferences.",
    rating: 5,
    avatarIcon: Stethoscope,
    location: "Blackburn",
    date: "1 month ago",
    verified: true,
  },
  {
    id: 9,
    name: "Emma W.",
    role: "Support Worker",
    text: "EVS found me a role close to home with flexible hours that suit my family life. Can't recommend them enough!",
    rating: 5,
    avatarIcon: Users,
    location: "Bolton",
    date: "2 months ago",
    verified: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Testimonial Card Component
// ─────────────────────────────────────────────────────────────────────────────
function TestimonialCard({ testimonial, isActive }) {
  const [isHovered, setIsHovered] = useState(false);
  const AvatarIcon = testimonial.avatarIcon;

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        opacity: isActive ? 1 : 0.3,
        scale: isActive ? 1 : 0.95,
      }}
      transition={{ duration: 0.3 }}
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "24px",
        border: `1px solid ${isHovered ? "rgba(196,151,42,0.25)" : "rgba(0,0,0,0.06)"}`,
        boxShadow: isHovered
          ? "0 12px 24px -8px rgba(15,29,61,0.12), 0 4px 8px rgba(0,0,0,0.04)"
          : "0 2px 8px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)",
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
    >
      {/* Quote Icon */}
      <div style={{ marginBottom: 12 }}>
        <Quote size={24} strokeWidth={1.5} style={{ color: "rgba(196,151,42,0.3)" }} />
      </div>

      {/* Star Rating */}
      <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={16} fill="#f0c060" stroke="#f0c060" style={{ color: "#f0c060" }} />
        ))}
      </div>

      {/* Testimonial Text */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
          color: "#4a5568",
          lineHeight: 1.7,
          marginBottom: 20,
          flex: 1,
        }}
      >
        "{testimonial.text}"
      </p>

      {/* User Info */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "auto" }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: `linear-gradient(135deg, rgba(196,151,42,0.12), rgba(196,151,42,0.04))`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#C4972A",
          }}
        >
          <AvatarIcon size={22} strokeWidth={1.6} />
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                color: "#0f1d3d",
                fontSize: 14,
              }}
            >
              {testimonial.name}
            </span>
            {testimonial.verified && (
              <span
                style={{
                  background: "#10b981",
                  color: "#fff",
                  fontSize: 8,
                  padding: "2px 6px",
                  borderRadius: "20px",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <CheckCircle size={8} /> Verified
              </span>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
              marginTop: 2,
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                color: "#94a3b8",
                fontSize: 10,
              }}
            >
              {testimonial.role}
            </span>
            <span style={{ color: "#cbd5e1", fontSize: 8 }}>•</span>
            <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Clock size={9} style={{ color: "#94a3b8" }} />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: "#94a3b8",
                  fontSize: 10,
                }}
              >
                {testimonial.date}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Carousel Component - Shows 3 testimonials at a time
// ─────────────────────────────────────────────────────────────────────────────
function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const autoPlayRef = useRef(null);
  const totalTestimonials = testimonials.length;
  const visibleCount = 3;

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + visibleCount) % totalTestimonials);
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, totalTestimonials, visibleCount]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - visibleCount + totalTestimonials) % totalTestimonials);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + visibleCount) % totalTestimonials);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const visibleTestimonials = [];
  for (let i = 0; i < visibleCount; i++) {
    const index = (currentIndex + i) % totalTestimonials;
    visibleTestimonials.push(testimonials[index]);
  }

  if (isMobile) {
    const currentTestimonial = testimonials[currentIndex % totalTestimonials];
    return (
      <div style={{ position: "relative" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <TestimonialCard testimonial={currentTestimonial} isActive={true} />
          </motion.div>
        </AnimatePresence>

        <button
          onClick={handlePrev}
          style={{
            position: "absolute",
            left: -20,
            top: "50%",
            transform: "translateY(-50%)",
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C4972A" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          style={{
            position: "absolute",
            right: -20,
            top: "50%",
            transform: "translateY(-50%)",
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C4972A" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
          {Array.from({ length: totalTestimonials }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 10000);
              }}
              style={{
                width: idx === currentIndex % totalTestimonials ? 24 : 8,
                height: 8,
                borderRadius: 4,
                border: "none",
                background: idx === currentIndex % totalTestimonials ? "#C4972A" : "rgba(0,0,0,0.08)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={handlePrev}
        style={{
          position: "absolute",
          left: -20,
          top: "50%",
          transform: "translateY(-50%)",
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "#fff",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
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
          e.currentTarget.style.background = "#fff";
          e.currentTarget.querySelector('svg').style.stroke = "#C4972A";
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4972A" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        style={{
          position: "absolute",
          right: -20,
          top: "50%",
          transform: "translateY(-50%)",
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "#fff",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
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
          e.currentTarget.style.background = "#fff";
          e.currentTarget.querySelector('svg').style.stroke = "#C4972A";
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4972A" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
        }}
      >
        <AnimatePresence mode="wait">
          {visibleTestimonials.map((testimonial, idx) => (
            <motion.div
              key={`${currentIndex}-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <TestimonialCard testimonial={testimonial} isActive={true} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div
        style={{
          width: "100%",
          height: 3,
          background: "rgba(0,0,0,0.05)",
          borderRadius: 3,
          marginTop: 32,
          overflow: "hidden",
        }}
      >
        <motion.div
          key={currentIndex}
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #C4972A, #f0c060)",
            borderRadius: 3,
          }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 24 }}>
        {Array.from({ length: Math.ceil(totalTestimonials / visibleCount) }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentIndex(idx * visibleCount);
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 10000);
            }}
            style={{
              width: idx === Math.floor(currentIndex / visibleCount) ? 32 : 10,
              height: 10,
              borderRadius: 5,
              border: "none",
              background: idx === Math.floor(currentIndex / visibleCount) ? "#C4972A" : "rgba(0,0,0,0.08)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Testimonials Component
// ─────────────────────────────────────────────────────────────────────────────
export default function Testimonials() {
  const [ref, inView] = useReveal(0.2);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      ref={ref}
      style={{
        padding: "clamp(60px, 10vh, 100px) clamp(16px, 5vw, 80px)",
        background: "#ffffff",
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
          background: "radial-gradient(circle, rgba(196,151,42,0.03), transparent 70%)",
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
          background: "radial-gradient(circle, rgba(196,151,42,0.02), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        
        {/* Section Header with Integrated Rating Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          {/* Eyebrow */}
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

          {/* Main Heading */}
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 800,
              color: "#0f1d3d",
              letterSpacing: "-0.02em",
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            What Our Workers Say
          </h2>

          {/* Integrated Rating Badge - Replaces the standalone Google Reviews card */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(196,151,42,0.08)",
              border: "1px solid rgba(196,151,42,0.15)",
              borderRadius: "40px",
              padding: "6px 16px",
              marginTop: 8,
            }}
          >
            <div style={{ display: "flex", gap: 3 }}>
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Star key={i} size={13} fill="#f0c060" stroke="#f0c060" style={{ color: "#f0c060" }} />
              ))}
            </div>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                fontWeight: 600,
                color: "#C4972A",
              }}
            >
              5.0
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                color: "#7A5C10",
              }}
            >
              · {testimonials.length} reviews
            </span>
          </div>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: "#4a5568",
              maxWidth: 520,
              margin: "24px auto 0",
              textAlign: "center",
              lineHeight: 1.65,
            }}
          >
            Real stories from healthcare professionals who found their perfect role through EVS
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <TestimonialCarousel />

        {/* Trust Indicators - Hidden on Mobile */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              marginTop: 48,
              display: "flex",
              justifyContent: "center",
              gap: 32,
              flexWrap: "wrap",
              paddingTop: 32,
              borderTop: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", gap: 2 }}>
                {[1,2,3,4,5].map((_, i) => (
                  <Star key={i} size={14} fill="#f0c060" stroke="#f0c060" style={{ color: "#f0c060" }} />
                ))}
              </div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#64748b" }}>
                5.0 Average Rating
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Users size={16} style={{ color: "#C4972A" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#64748b" }}>
                500+ Happy Workers
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <ThumbsUp size={14} style={{ color: "#C4972A" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#64748b" }}>
                100% Verified Reviews
              </span>
            </div>
          </motion.div>
        )}

        {/* Bottom Decorative Line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
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