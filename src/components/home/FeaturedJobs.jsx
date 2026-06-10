import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Stethoscope,
  Building2,
  HeartHandshake,
  Brain,
  Heart,
  Star,
  Flame,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Modern Featured Jobs Section — Premium Job Cards with Advanced Interactions
// Features: Staggered animations, hover effects, salary indicators, job badges
// ─────────────────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return [ref, isInView];
}

const jobs = [
  {
    id: 1,
    title: "Registered Nurse (RGN)",
    type: "Temporary / Permanent",
    location: "Preston, Lancashire",
    pay: "£18–£24/hr",
    payValue: 21,
    urgent: true,
    icon: Stethoscope,
    shift: "Day & Night Shifts",
    experience: "2+ years preferred",
  },
  {
    id: 2,
    title: "Healthcare Care Assistant",
    type: "Flexible Shifts Available",
    location: "North-West England",
    pay: "£12–£15/hr",
    payValue: 13.5,
    urgent: false,
    icon: Building2,
    shift: "Flexible Hours",
    experience: "No experience required",
  },
  {
    id: 3,
    title: "Support Worker",
    type: "Temporary / Permanent",
    location: "Preston & Surrounding",
    pay: "£11–£14/hr",
    payValue: 12.5,
    urgent: true,
    icon: HeartHandshake,
    shift: "Weekend Availability",
    experience: "Driving license preferred",
  },
  {
    id: 4,
    title: "RMN Mental Health Nurse",
    type: "Full Time / Part Time",
    location: "Lancashire Area",
    pay: "£22–£30/hr",
    payValue: 26,
    urgent: false,
    icon: Brain,
    shift: "Rotating Shifts",
    experience: "NMC Registered",
  },
  {
    id: 5,
    title: "Senior Carer",
    type: "Immediate Start",
    location: "North-West England",
    pay: "£14–£17/hr",
    payValue: 15.5,
    urgent: false,
    icon: Heart,
    shift: "Day Shifts Only",
    experience: "NVQ Level 3 required",
  },
  {
    id: 6,
    title: "Domestic Worker",
    type: "Flexible Hours",
    location: "Preston, Lancashire",
    pay: "£10.50–£12/hr",
    payValue: 11.25,
    urgent: false,
    icon: Star,
    shift: "Morning / Afternoon",
    experience: "Basic cleaning skills",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Premium Job Card Component with 3D Effects
// ─────────────────────────────────────────────────────────────────────────────
function JobCard({ job, index, isInView }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const JobIcon = job.icon;

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        delay: index * 0.08,
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
          position: "relative",
          background: "#ffffff",
          borderRadius: "24px",
          padding: "28px",
          height: "100%",
          boxShadow: isHovered
            ? "0 20px 40px -12px rgba(15,29,61,0.15), 0 0 0 1px rgba(196,151,42,0.2)"
            : "0 4px 12px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)",
          border: `1px solid ${isHovered ? "rgba(196,151,42,0.25)" : "rgba(0,0,0,0.06)"}`,
          cursor: "pointer",
          overflow: "hidden",
          transition: "box-shadow 0.3s ease, border-color 0.3s ease",
        }}
      >
        {/* Animated Background Gradient */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.06 : 0,
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(196,151,42,0.8), transparent 50%)`,
          }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            borderRadius: "24px",
          }}
        />

        {/* Top Accent Bar */}
        <motion.div
          animate={{
            scaleX: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.4 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "linear-gradient(90deg, #C4972A, #f0c060, #C4972A)",
            borderRadius: "24px 24px 0 0",
            transformOrigin: "left",
          }}
        />

        {/* Save Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.preventDefault();
            setIsSaved(!isSaved);
          }}
          aria-label={isSaved ? "Remove from saved" : "Save job"}
          aria-pressed={isSaved}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: isSaved ? "#C4972A" : "rgba(0,0,0,0.04)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10,
            transition: "background 0.3s ease",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={isSaved ? "#ffffff" : "none"}
            stroke={isSaved ? "#ffffff" : "#64748b"}
            strokeWidth="2"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </motion.button>

        {/* Urgent Badge — Flame icon replaces 🔥 */}
        <AnimatePresence>
          {job.urgent && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              style={{
                position: "absolute",
                top: 20,
                left: 20,
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                color: "#fff",
                fontSize: 10,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                letterSpacing: 1,
                padding: "4px 10px 4px 8px",
                borderRadius: "20px",
                boxShadow: "0 2px 8px rgba(239,68,68,0.3)",
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Flame size={11} strokeWidth={2} aria-hidden="true" />
              URGENT
            </motion.div>
          )}
        </AnimatePresence>

        {/* Job Icon — Lucide, replaces emoji */}
        <div style={{ marginBottom: 20, marginTop: job.urgent ? 20 : 0 }}>
          <motion.div
            animate={{
              scale: isHovered ? 1.05 : 1,
              rotate: isHovered ? 5 : 0,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            style={{
              width: 56,
              height: 56,
              borderRadius: "16px",
              background: "linear-gradient(135deg, rgba(196,151,42,0.12), rgba(196,151,42,0.04))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
              color: "#C4972A",
            }}
          >
            <JobIcon size={26} strokeWidth={1.6} aria-hidden="true" />
          </motion.div>

          <motion.h3
            animate={{
              color: isHovered ? "#C4972A" : "#0f1d3d",
              x: isHovered ? 3 : 0,
            }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 6,
              letterSpacing: "-0.01em",
            }}
          >
            {job.title}
          </motion.h3>

          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              color: "#64748b",
              fontWeight: 500,
            }}
          >
            {job.type}
          </span>
        </div>

        {/* Job Details */}
        <div style={{ marginBottom: 24 }}>
          {/* Location */}
          <motion.div
            animate={{ x: isHovered ? 3 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 10,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C4972A" strokeWidth="1.8">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: "#4a5568",
              }}
            >
              {job.location}
            </span>
          </motion.div>

          {/* Pay Rate with Animated Indicator */}
          <motion.div
            animate={{ x: isHovered ? 3 : 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 10,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C4972A" strokeWidth="1.8">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: "#0f1d3d",
                fontWeight: 700,
              }}
            >
              {job.pay}
            </span>
            <motion.div
              animate={{ width: isHovered ? `${(job.payValue / 30) * 100}%` : "0%" }}
              transition={{ duration: 0.5 }}
              style={{
                height: 4,
                background: "linear-gradient(90deg, #C4972A, #f0c060)",
                borderRadius: 2,
                flex: 1,
                maxWidth: 80,
              }}
            />
          </motion.div>

          {/* Shift */}
          <motion.div
            animate={{ x: isHovered ? 3 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C4972A" strokeWidth="1.8">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                color: "#64748b",
              }}
            >
              {job.shift}
            </span>
          </motion.div>
        </div>

        {/* Experience Tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "rgba(196,151,42,0.08)",
            padding: "4px 10px",
            borderRadius: "12px",
            marginBottom: 16,
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              color: "#C4972A",
              fontWeight: 500,
            }}
          >
            {job.experience}
          </span>
        </motion.div>

        {/* Apply Button */}
        <motion.a
          href="#register"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            display: "block",
            textAlign: "center",
            background: "#0f1d3d",
            color: "#ffffff",
            padding: "12px 20px",
            borderRadius: "14px",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: 13,
            textDecoration: "none",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, #C4972A, #8B6914)";
            e.currentTarget.style.color = "#0f1d3d";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#0f1d3d";
            e.currentTarget.style.color = "#ffffff";
          }}
        >
          <span style={{ position: "relative", zIndex: 2 }}>Apply for This Role →</span>
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: isHovered ? "0%" : "-100%" }}
            transition={{ duration: 0.4 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #C4972A, #8B6914)",
              zIndex: 1,
            }}
          />
        </motion.a>

        {/* Decorative Corner */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.3 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
            width: 40,
            height: 40,
            borderRight: "2px solid #C4972A",
            borderBottom: "2px solid #C4972A",
            borderRadius: "0 0 16px 0",
            pointerEvents: "none",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Featured Jobs Component
// ─────────────────────────────────────────────────────────────────────────────
export default function FeaturedJobs() {
  const [ref, inView] = useReveal(0.1);
  const [filter, setFilter] = useState("all");
  const [visibleJobs, setVisibleJobs] = useState(jobs);

  const filters = [
    { key: "all", label: "All Jobs", count: jobs.length },
    { key: "urgent", label: "Urgent", count: jobs.filter(j => j.urgent).length },
    { key: "nursing", label: "Nursing", count: jobs.filter(j => j.title.includes("Nurse")).length },
    { key: "care", label: "Care", count: jobs.filter(j => j.title.includes("Care") || j.title.includes("Support")).length },
  ];

  useEffect(() => {
    if (filter === "all") {
      setVisibleJobs(jobs);
    } else if (filter === "urgent") {
      setVisibleJobs(jobs.filter(j => j.urgent));
    } else if (filter === "nursing") {
      setVisibleJobs(jobs.filter(j => j.title.includes("Nurse")));
    } else if (filter === "care") {
      setVisibleJobs(jobs.filter(j => j.title.includes("Care") || j.title.includes("Support")));
    }
  }, [filter]);

  return (
    <section
      id="jobs"
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
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, #C4972A, transparent)",
          opacity: 0.3,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, #C4972A, transparent)",
          opacity: 0.3,
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 48,
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 12,
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
                Open Positions
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
                marginTop: 0,
                marginBottom: 0,
              }}
            >
              Featured Healthcare Jobs
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: "#4a5568",
                marginTop: 12,
                maxWidth: 400,
              }}
            >
              Discover rewarding opportunities in healthcare across North-West England
            </p>
          </div>

          <motion.a
            href="#all-jobs"
            whileHover={{ x: 5 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#C4972A",
              fontWeight: 600,
              fontSize: 14,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            View All Jobs
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 32,
            flexWrap: "wrap",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            paddingBottom: 16,
          }}
        >
          {filters.map((f) => (
            <motion.button
              key={f.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(f.key)}
              style={{
                background: filter === f.key ? "linear-gradient(135deg, #C4972A, #8B6914)" : "transparent",
                border: filter === f.key ? "none" : "1px solid rgba(0,0,0,0.08)",
                padding: "8px 20px",
                borderRadius: "40px",
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: filter === f.key ? "#0f1d3d" : "#64748b",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {f.label}
              <span
                style={{
                  marginLeft: 8,
                  opacity: 0.7,
                  fontSize: 11,
                }}
              >
                ({f.count})
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Job Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: 28,
            }}
          >
            {visibleJobs.map((job, idx) => (
              <JobCard
                key={`${job.id}-${filter}`}
                job={job}
                index={idx}
                isInView={inView}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {visibleJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: "center",
              padding: "60px 20px",
              background: "rgba(0,0,0,0.02)",
              borderRadius: "24px",
            }}
          >
            {/* Search icon replaces 🔍 */}
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" style={{ opacity: 0.5, margin: "0 auto", display: "block" }} aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 18,
                color: "#64748b",
                marginTop: 16,
              }}
            >
              No jobs found in this category
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: "#94a3b8",
                marginTop: 8,
              }}
            >
              Try adjusting your filter or check back later for new opportunities
            </p>
          </motion.div>
        )}

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