import { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import {
  Search,
  GraduationCap,
  Zap,
  Users,
  CheckCircle,
  DollarSign,
  MapPin,
  FolderOpen,
  MessageCircle,
  ArrowRight,
  Plus,
  Minus,
  Sparkles,
  Clock,
  Briefcase,
  Shield,
  CreditCard,
  Compass,
  Phone,
  Mail,
  ChevronDown
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Premium FAQ Section — Enterprise-Grade Accordion with Advanced Animations
// Features: Smooth expand/collapse, 3D hover effects, animated icons, staggered reveal
// FIXED: Mobile view shows only 3 FAQs with "Show More" button to reduce scrolling
// ─────────────────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold, margin: "-50px 0px" });
  return [ref, isInView];
}

const faqs = [
  {
    id: 1,
    q: "Do I need experience to apply?",
    a: "Not necessarily. If you have at least 5 months of care experience, you may be eligible for immediate start. For candidates without experience, we offer mandatory training including manual handling onsite and care certification to get you work-ready.",
    category: "Application",
    icon: GraduationCap,
  },
  {
    id: 2,
    q: "How quickly can I be placed?",
    a: "Candidates with relevant experience can often be placed within days of completing compliance checks. We work as fast as possible to match you with appropriate local shifts. Our record placement time is just 48 hours from application to first shift!",
    category: "Placement",
    icon: Zap,
  },
  {
    id: 3,
    q: "What types of roles do you recruit for?",
    a: "We recruit for Healthcare Care Assistants, Support Workers, Social Workers, RGN and RMN Nurses, Domestic Workers, and other care sector roles on both temporary and permanent basis. We have opportunities across all skill levels and specializations.",
    category: "Roles",
    icon: Users,
  },
  {
    id: 4,
    q: "Do you cover enhanced DBS checks?",
    a: "Yes, we assist with the enhanced DBS application process. We guide you through every step to ensure you're fully compliant before your first shift. Our dedicated compliance team handles all paperwork and follows up with you throughout the process.",
    category: "Compliance",
    icon: Shield,
  },
  {
    id: 5,
    q: "What is the pay structure?",
    a: "We offer competitive pay rates with both weekly and monthly payment options. Holiday pay is included and rates vary by role and grade. Contact us for specific salary information for your role. We also offer bonuses for referrals and long-term placements.",
    category: "Pay",
    icon: CreditCard,
  },
  {
    id: 6,
    q: "What areas do you cover?",
    a: "Our primary coverage is across the North-West of England, with a particular focus on Preston and surrounding Lancashire areas. Most of our shifts are local to where you live. We're expanding our coverage area based on demand.",
    category: "Location",
    icon: Compass,
  },
];

// Detect mobile for responsive behavior
const isMobile = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
};

// ─────────────────────────────────────────────────────────────────────────────
// Premium FAQ Accordion Item Component
// ─────────────────────────────────────────────────────────────────────────────
function FAQItem({ faq, index, isInView, isOpen, onToggle, isMobileView }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);
  const IconComponent = faq.icon;

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [faq.a]);

  const handleMouseMove = (e) => {
    if (isMobileView) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.08,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onMouseEnter={() => !isMobileView && setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      style={{
        position: "relative",
        perspective: "1000px",
      }}
    >
      <motion.div
        animate={{
          rotateX: isHovered && !isMobileView ? 3 : 0,
          rotateY: isHovered && !isMobileView ? (mousePosition.x - 50) * 0.1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          position: "relative",
          background: "white",
          borderRadius: "24px",
          border: `1px solid ${isOpen ? "#C4972A" : isHovered && !isMobileView ? "rgba(196,151,42,0.25)" : "rgba(0,0,0,0.06)"}`,
          boxShadow: isOpen
            ? "0 12px 24px -8px rgba(196,151,42,0.15)"
            : isHovered && !isMobileView
            ? "0 8px 20px -8px rgba(0,0,0,0.08)"
            : "0 1px 3px rgba(0,0,0,0.03)",
          overflow: "hidden",
          transition: "all 0.3s ease",
        }}
      >
        {/* Dynamic Spotlight Effect - desktop only */}
        {!isMobileView && (
          <motion.div
            animate={{
              opacity: isHovered ? 0.04 : 0,
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(196,151,42,0.8), transparent 60%)`,
            }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              borderRadius: "24px",
            }}
          />
        )}

        {/* Question Button */}
        <button
          onClick={() => onToggle()}
          style={{
            width: "100%",
            textAlign: "left",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "clamp(20px, 4vw, 28px) clamp(24px, 5vw, 32px)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            position: "relative",
            zIndex: 2,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1 }}>
            {/* Animated Icon */}
            <motion.div
              animate={{
                scale: isHovered && !isMobileView ? 1.08 : 1,
                rotate: isHovered && !isMobileView ? [0, -5, 5, 0] : 0,
              }}
              transition={{ duration: 0.4 }}
              style={{
                width: 44,
                height: 44,
                borderRadius: "14px",
                background: isOpen
                  ? "linear-gradient(135deg, #C4972A, #8B6914)"
                  : "rgba(196,151,42,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.3s ease",
              }}
            >
              <IconComponent 
                size={22} 
                strokeWidth={1.6} 
                style={{ color: isOpen ? "#fff" : "#C4972A" }} 
              />
            </motion.div>

            {/* Question Text */}
            <motion.span
              animate={{
                color: isOpen ? "#C4972A" : "#0f1d3d",
                x: isHovered && !isMobileView ? 3 : 0,
              }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(14px, 1.5vw, 16px)",
                flex: 1,
                lineHeight: 1.4,
              }}
            >
              {faq.q}
            </motion.span>
          </div>

          {/* Animated Plus/Minus Icon */}
          <motion.div
            animate={{
              rotate: isOpen ? 45 : 0,
              scale: isHovered && !isMobileView ? 1.05 : 1,
            }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: isOpen || isHovered ? "rgba(196,151,42,0.1)" : "rgba(0,0,0,0.04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "background 0.3s ease",
            }}
          >
            {isOpen ? (
              <Minus size={16} strokeWidth={2.5} style={{ color: "#C4972A" }} />
            ) : (
              <Plus size={16} strokeWidth={2.5} style={{ color: isHovered ? "#C4972A" : "#64748b" }} />
            )}
          </motion.div>
        </button>

        {/* Answer Section with Smooth Animation */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div
                ref={contentRef}
                style={{
                  padding: "0 24px 28px 24px",
                  paddingLeft: "clamp(24px, 5vw, 88px)",
                }}
              >
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: "#4a5568",
                    fontSize: "clamp(13px, 1.5vw, 14px)",
                    lineHeight: 1.8,
                    borderLeft: "3px solid #C4972A",
                    paddingLeft: 20,
                  }}
                >
                  {faq.a}
                </motion.div>

                {/* Category Tag */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  style={{
                    marginTop: 16,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "4px 12px",
                    background: "rgba(196,151,42,0.08)",
                    borderRadius: "20px",
                  }}
                >
                  <FolderOpen size={11} style={{ color: "#C4972A" }} />
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11,
                      fontWeight: 500,
                      color: "#C4972A",
                    }}
                  >
                    {faq.category}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative Elements */}
        <motion.div
          animate={{
            opacity: isOpen ? 1 : 0,
            width: isOpen ? "100%" : "0%",
          }}
          transition={{ duration: 0.4 }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: 2,
            background: "linear-gradient(90deg, #C4972A, #f0c060)",
            borderRadius: "0 0 24px 24px",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main FAQ Component with Premium Features
// ─────────────────────────────────────────────────────────────────────────────
export default function FAQ() {
  const [ref, inView] = useReveal(0.1);
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFaqs, setFilteredFaqs] = useState(faqs);
  const [showAll, setShowAll] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const headerControls = useAnimation();

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Smooth scroll helper
  const goToSection = (sectionId) => {
    const el = document.getElementById(sectionId.toLowerCase());
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (inView) {
      headerControls.start("visible");
    }
  }, [inView, headerControls]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = faqs.filter(
        (faq) =>
          faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.a.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFaqs(filtered);
      // Reset showAll when searching
      setShowAll(false);
    } else {
      setFilteredFaqs(faqs);
    }
  }, [searchTerm]);

  // Determine which FAQs to display
  const displayedFaqs = isMobileView && !searchTerm && !showAll
    ? filteredFaqs.slice(0, 3)
    : filteredFaqs;

  const hasMoreFaqs = isMobileView && !searchTerm && filteredFaqs.length > 3;

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, staggerChildren: 0.15 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

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
          top: "10%",
          right: "5%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,151,42,0.02), transparent)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,151,42,0.015), transparent)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 2 }}>
        
        {/* Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={headerControls}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          {/* Eyebrow */}
          <motion.div variants={childVariants}>
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
                FAQ
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
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            variants={childVariants}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 800,
              color: "#0f1d3d",
              letterSpacing: "-0.02em",
              marginBottom: 16,
            }}
          >
            Common Questions{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #C4972A, #e8b84a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Answered
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={childVariants}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: "#4a5568",
              maxWidth: 500,
              margin: "0 auto",
              lineHeight: 1.65,
            }}
          >
            Everything you need to know about working with EVS Healthcare
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ marginBottom: 32 }}
        >
          <div
            style={{
              position: "relative",
              maxWidth: 400,
              margin: "0 auto",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <Search size={18} strokeWidth={1.8} style={{ color: "#94a3b8" }} />
            </div>
            <input
              type="text"
              placeholder="Search your question..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 20px 14px 48px",
                borderRadius: "60px",
                border: "1px solid rgba(0,0,0,0.06)",
                background: "#fff",
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                outline: "none",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#C4972A";
                e.target.style.boxShadow = "0 0 0 3px rgba(196,151,42,0.08)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(0,0,0,0.06)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
        </motion.div>

        {/* FAQ Accordion Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {displayedFaqs.length > 0 ? (
            displayedFaqs.map((faq, idx) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                index={idx}
                isInView={inView}
                isOpen={openIndex === idx}
                onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
                isMobileView={isMobileView}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                textAlign: "center",
                padding: "60px 20px",
                background: "#fff",
                borderRadius: "24px",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <Search size={48} strokeWidth={1.5} style={{ color: "#94a3b8", opacity: 0.5, margin: "0 auto" }} />
              <h3
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 18,
                  color: "#64748b",
                  marginTop: 16,
                }}
              >
                No questions found
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: "#94a3b8",
                  marginTop: 8,
                }}
              >
                Try a different search term or browse all questions
              </p>
            </motion.div>
          )}
        </div>

        {/* Show More / Show Less Button - Mobile Only */}
        {hasMoreFaqs && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ textAlign: "center", marginTop: 24 }}
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "transparent",
                border: "1px solid rgba(196,151,42,0.3)",
                color: "#C4972A",
                padding: "12px 28px",
                borderRadius: "40px",
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {showAll ? (
                <>
                  Show Less <ChevronDown size={14} style={{ transform: "rotate(180deg)" }} />
                </>
              ) : (
                <>
                  Show More Questions <ChevronDown size={14} />
                </>
              )}
            </motion.button>
            
            {/* Hint text */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                color: "#94a3b8",
                marginTop: 10,
              }}
            >
              {showAll 
                ? `${filteredFaqs.length} questions displayed` 
                : `Showing ${Math.min(3, filteredFaqs.length)} of ${filteredFaqs.length} questions`}
            </p>
          </motion.div>
        )}

        {/* Still Have Questions - PROPER CTA BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            marginTop: 48,
            padding: isMobileView ? "32px 20px" : "40px 32px",
            background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
            borderRadius: "28px",
            textAlign: "center",
            border: "1px solid rgba(196,151,42,0.15)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          }}
        >
          <div
            style={{
              width: isMobileView ? 48 : 56,
              height: isMobileView ? 48 : 56,
              borderRadius: "50%",
              background: "rgba(196,151,42,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              color: "#C4972A",
            }}
          >
            <MessageCircle size={isMobileView ? 24 : 28} strokeWidth={1.5} />
          </div>
          
          <h3
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: isMobileView ? "clamp(18px, 4vw, 20px)" : "clamp(20px, 4vw, 24px)",
              fontWeight: 700,
              color: "#0f1d3d",
              marginBottom: 8,
            }}
          >
            Still have questions?
          </h3>
          
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: isMobileView ? 13 : 14,
              color: "#64748b",
              marginBottom: 24,
              maxWidth: 450,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Our team responds within 2 hours on weekdays
          </p>
          
          {/* DUAL CTA BUTTONS */}
          <div
            style={{
              display: "flex",
              gap: isMobileView ? 12 : 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                goToSection("contact");
              }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "linear-gradient(135deg, #C4972A, #8B6914)",
                color: "#0f1d3d",
                padding: isMobileView ? "12px 24px" : "14px 32px",
                borderRadius: "50px",
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobileView ? 13 : 14,
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(196,151,42,0.3)",
                transition: "all 0.2s ease",
              }}
            >
              <Mail size={isMobileView ? 14 : 16} />
              Send us a message
              <ArrowRight size={isMobileView ? 12 : 14} />
            </motion.a>
            
            <motion.a
              href="tel:01772493994"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "transparent",
                color: "#0f1d3d",
                padding: isMobileView ? "12px 24px" : "14px 32px",
                borderRadius: "50px",
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobileView ? 13 : 14,
                fontWeight: 600,
                textDecoration: "none",
                border: "1.5px solid rgba(15,29,61,0.2)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(196,151,42,0.05)";
                e.currentTarget.style.borderColor = "#C4972A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(15,29,61,0.2)";
              }}
            >
              <Phone size={isMobileView ? 14 : 16} />
              Call 01772 493994
            </motion.a>
          </div>
          
          {/* Response time indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginTop: 20,
              paddingTop: 16,
              borderTop: "1px solid rgba(0,0,0,0.05)",
              flexWrap: "wrap",
            }}
          >
            <Clock size={12} style={{ color: "#94a3b8" }} />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobileView ? 10 : 11,
                color: "#94a3b8",
              }}
            >
              Mon-Fri, 9am-6pm
            </span>
            <span style={{ color: "#cbd5e1", display: isMobileView ? "none" : "inline" }}>•</span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobileView ? 10 : 11,
                color: "#94a3b8",
              }}
            >
              Weekend emergency support available
            </span>
          </div>
        </motion.div>

        {/* Bottom Decorative Line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
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