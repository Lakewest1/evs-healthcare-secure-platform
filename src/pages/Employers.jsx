// pages/Employers.jsx — EVS Healthcare Solutions
// Production-ready: WCAG AA, SSR-safe, single style block, env-var form endpoint,
// PoundSterling (not DollarSign), aria-describedby on all inputs, autocomplete attrs,
// double-submit guard, dev-only console.error, useReducedMotion throughout.
// Fully responsive for mobile devices with modern styling.

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Users,
  Clock,
  Shield,
  Star,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Award,
  Heart,
  Briefcase,
  Calendar,
  PoundSterling,
  ShieldCheck,
  UserCheck,
  Zap,
  Headphones,
  ClipboardCheck,
  Globe,
  Send,
  X,
  Loader2,
  Stethoscope,
  AlertCircle,
  GraduationCap,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Design tokens
// ─────────────────────────────────────────────────────────────────────────────
const T = {
  navy:       "#0f1d3d",
  navyLight:  "#1a2a50",
  navyDeep:   "#0a1628",
  gold:       "#C4972A",
  goldDark:   "#8B6914",
  goldLight:  "#f0c060",
  cream:      "#fefcf8",
  white:      "#ffffff",
  slate:      "#475569",
  slateLight: "#64748b",
  mutedSoft:  "#94a3b8",
  border:     "rgba(0,0,0,0.06)",
  borderGold: "rgba(196,151,42,0.2)",
  blue:       "#2563eb",
  green:      "#16a34a",
  red:        "#dc2626",
  surface:    "#f8fafc",
};

const EASE = [0.16, 1, 0.3, 1];

// ─────────────────────────────────────────────────────────────────────────────
// Form endpoint — set VITE_FORMSPREE_ID in your .env file.
// ─────────────────────────────────────────────────────────────────────────────
const FORMSPREE_URL = import.meta.env.VITE_FORMSPREE_ID
  ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`
  : null;

// ─────────────────────────────────────────────────────────────────────────────
// Shared reveal hook — per-section so each section animates independently
// ─────────────────────────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return [ref, inView];
}

// ─────────────────────────────────────────────────────────────────────────────
// Animated counter hook — RAF-based, easeOutCubic, cleans up on unmount
// ─────────────────────────────────────────────────────────────────────────────
function useAnimatedCounter(end, duration = 2000, shouldAnimate = false) {
  const [count,       setCount]       = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!shouldAnimate || hasAnimated) return;

    let startTime = null;

    const tick = (ts) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const p       = Math.min(elapsed / duration, 1);
      const eased   = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * end));
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount(end);
        setHasAnimated(true);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [shouldAnimate, hasAnimated, end, duration]);

  return count;
}

// ─────────────────────────────────────────────────────────────────────────────
// Mobile detection hook — SSR-safe
// ─────────────────────────────────────────────────────────────────────────────
function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);
  
  return isMobile;
}

// ─────────────────────────────────────────────────────────────────────────────
// Animation factory
// ─────────────────────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, delay, ease: EASE } },
});
const scaleIn = (delay = 0) => ({
  hidden:  { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay, ease: EASE } },
});

// ─────────────────────────────────────────────────────────────────────────────
// Shared sub-components
// ─────────────────────────────────────────────────────────────────────────────
function SectionEyebrow({ children }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <span style={{ width: 28, height: 2, background: T.gold, borderRadius: 999, display: "block" }} />
      <span className="eyebrow-text">{children}</span>
      <span style={{ width: 28, height: 2, background: T.gold, borderRadius: 999, display: "block" }} />
    </div>
  );
}

function SectionHeading({ children, light = false }) {
  return (
    <h2
      className="section-heading"
      style={{ color: light ? T.white : T.navy }}
    >
      {children}
    </h2>
  );
}

const Au = ({ children }) => (
  <span style={{ color: T.gold }}>{children}</span>
);

// ─────────────────────────────────────────────────────────────────────────────
// Infinite Horizontal Scroll Component
// ─────────────────────────────────────────────────────────────────────────────
function InfiniteSlider({ children, gap = 16, speed = 30, pauseOnHover = true }) {
  const [isPaused, setIsPaused] = useState(false);
  
  return (
    <div 
      className="infinite-slider-wrapper"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      onTouchStart={() => pauseOnHover && setIsPaused(true)}
      onTouchEnd={() => pauseOnHover && setIsPaused(false)}
    >
      <div 
        className={`infinite-slider-track${isPaused ? ' paused' : ''}`}
        style={{ 
          '--speed': `${speed}s`, 
          '--gap': `${gap}px`,
          willChange: 'transform'
        }}
      >
        <div className="infinite-slider-group">
          {children}
        </div>
        <div className="infinite-slider-group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Horizontal Scroll with Buttons
// ─────────────────────────────────────────────────────────────────────────────
function HorizontalScroll({ children, gap = 16 }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);
  
  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);
  
  const scroll = useCallback((dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ 
      left: dir === 'left' ? -300 : 300, 
      behavior: 'smooth' 
    });
  }, []);
  
  return (
    <div className="horizontal-scroll-container">
      {canScrollLeft && (
        <button 
          className="scroll-btn scroll-btn-left" 
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>
      )}
      <div 
        ref={scrollRef}
        className="horizontal-scroll-content"
        style={{ gap: `${gap}px` }}
      >
        {children}
      </div>
      {canScrollRight && (
        <button 
          className="scroll-btn scroll-btn-right" 
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Flip to Next Card Component (Process Steps)
// ─────────────────────────────────────────────────────────────────────────────
function FlipToNextCard({ steps }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showBack, setShowBack] = useState(false);
  
  const goToNext = useCallback(() => {
    if (isFlipping) return;
    setIsFlipping(true);
    setShowBack(true);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % steps.length);
      setShowBack(false);
      setIsFlipping(false);
    }, 600);
  }, [isFlipping, steps.length]);
  
  const goToPrev = useCallback(() => {
    if (isFlipping) return;
    setIsFlipping(true);
    setShowBack(true);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + steps.length) % steps.length);
      setShowBack(false);
      setIsFlipping(false);
    }, 600);
  }, [isFlipping, steps.length]);
  
  const handleCardClick = useCallback(() => {
    goToNext();
  }, [goToNext]);
  
  const step = steps[currentIndex];
  const nextStep = steps[(currentIndex + 1) % steps.length];
  const Icon = step.icon;
  
  return (
    <div className="flip-next-carousel">
      <div className="flip-next-inner">
        <div 
          className={`flip-next-card${showBack ? ' flipped' : ''}`}
          onClick={handleCardClick}
          role="button"
          tabIndex={0}
          aria-label={`Step ${step.num}: ${step.title}. ${showBack ? step.desc : 'Tap to see next step'}. Currently viewing step ${currentIndex + 1} of ${steps.length}.`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleCardClick();
            }
          }}
        >
          <div className="flip-next-front">
            <div className="emp-process-num">{step.num}</div>
            <div className="emp-process-icon">
              <Icon size={28} strokeWidth={1.6} aria-hidden="true" />
            </div>
            <h3 className="emp-card-title">{step.title}</h3>
            <span className="flip-next-hint">Tap to see next step →</span>
          </div>
          <div className="flip-next-back">
            <div className="emp-process-num">{step.num}</div>
            <h3 className="emp-card-title">{step.title}</h3>
            <p className="emp-card-desc">{step.desc}</p>
            <span className="flip-next-hint">Switching to: {nextStep.title}</span>
          </div>
        </div>
      </div>
      
      <div className="flip-next-controls">
        <button
          className="flip-nav-btn"
          onClick={goToPrev}
          disabled={isFlipping}
          aria-label="Previous step"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="flip-dots" role="tablist" aria-label="Process steps">
          {steps.map((_, index) => (
            <button
              key={index}
              className={`flip-dot${index === currentIndex ? ' active' : ''}`}
              onClick={() => {
                if (index !== currentIndex && !isFlipping) {
                  setIsFlipping(true);
                  setShowBack(true);
                  setTimeout(() => {
                    setCurrentIndex(index);
                    setShowBack(false);
                    setIsFlipping(false);
                  }, 600);
                }
              }}
              disabled={isFlipping}
              aria-label={`Go to step ${index + 1}`}
              aria-selected={index === currentIndex}
              role="tab"
            />
          ))}
        </div>
        
        <button
          className="flip-nav-btn"
          onClick={goToNext}
          disabled={isFlipping}
          aria-label="Next step"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Form data
// ─────────────────────────────────────────────────────────────────────────────
const PROFESSION_TYPES = [
  "Registered Nurse (RN)", "Healthcare Assistant (HCA)", "Support Worker",
  "Senior Care Assistant", "Mental Health Nurse", "Learning Disability Nurse",
  "Paediatric Nurse", "Midwife", "Occupational Therapist", "Physiotherapist",
  "Speech and Language Therapist", "Radiographer", "Paramedic", "Pharmacist",
  "Biomedical Scientist", "Social Worker", "Nursery Nurse",
  "Theatre Practitioner", "Other",
];

const SPECIALTIES = [
  "General Medicine", "Surgery", "Emergency & Urgent Care", "Intensive Care (ICU)",
  "Mental Health & Psychiatry", "Paediatrics & Child Health", "Maternity & Obstetrics",
  "Elderly Care & Geriatrics", "Community Nursing", "Learning Disabilities",
  "Palliative & End of Life Care", "Oncology", "Cardiology", "Neurology",
  "Orthopaedics", "Rehabilitation", "Theatre & Recovery", "Other",
];

const EMPLOYMENT_TYPES = [
  { value: "temporary",    label: "Temporary / Agency" },
  { value: "temp-to-perm", label: "Temp-to-Perm" },
  { value: "permanent",    label: "Permanent Placement" },
  { value: "contract",     label: "Contract / Fixed-Term" },
];

const URGENCY_LEVELS = [
  { value: "immediate",  label: "Immediate (within 24hrs)" },
  { value: "urgent",     label: "Urgent (24–48hrs)" },
  { value: "short-term", label: "Short-term (within 1 week)" },
  { value: "planned",    label: "Planned (1–4 weeks)" },
  { value: "flexible",   label: "Flexible / No Rush" },
];

const SHIFT_PATTERNS = [
  "Days (8am–8pm)", "Nights (8pm–8am)", "Long Days (12hr)",
  "Early (7am–3pm)", "Late (2pm–10pm)", "Flexible / Mixed",
  "Monday–Friday Office Hours", "Weekends Only",
];

// ─────────────────────────────────────────────────────────────────────────────
// Content arrays
// ─────────────────────────────────────────────────────────────────────────────
const BENEFITS = [
  {
    icon: UserCheck,
    title: "Fully Vetted Professionals",
    desc: "All candidates are DBS checked, reference verified, and compliance certified before placement.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    desc: "Round-the-clock support and staffing, including emergency cover and last-minute requests.",
  },
  {
    icon: ShieldCheck,
    title: "NHS-Approved Standards",
    desc: "All staff meet NHS compliance requirements with mandatory training tracked and updated.",
  },
  {
    icon: PoundSterling,
    title: "Competitive UK Rates",
    desc: "Transparent, affordable pricing with no hidden fees. Value without compromising quality.",
  },
  {
    icon: Users,
    title: "5,000+ Professionals",
    desc: "Access a growing network of over 5,000 healthcare professionals across the UK.",
  },
  {
    icon: Headphones,
    title: "Dedicated Account Manager",
    desc: "Your own dedicated contact who knows your organisation's specific workforce needs.",
  },
];

const SERVICES = [
  {
    icon: Briefcase,
    title: "Temporary Staffing",
    desc: "Flexible, short-term cover for sickness, holidays, and peak demand periods.",
    color: T.gold,
  },
  {
    icon: Calendar,
    title: "Temp-to-Perm",
    desc: "Try before you commit - convert temporary staff to permanent after a trial period.",
    color: T.blue,
  },
  {
    icon: UserCheck,
    title: "Permanent Placements",
    desc: "Long-term recruitment for permanent roles across all healthcare settings.",
    color: T.green,
  },
  {
    icon: Building2,
    title: "Contract Staffing",
    desc: "Specialist contract staff for specific projects, initiatives, or fixed-term requirements.",
    color: T.gold,
  },
];

const SECTORS = [
  { name: "NHS Trusts",           icon: Building2, count: "150+", desc: "Partner sites across the UK" },
  { name: "Private Hospitals",    icon: Heart,     count: "50+",  desc: "Independent healthcare providers" },
  { name: "Care Homes",           icon: Shield,    count: "200+", desc: "Residential and nursing homes" },
  { name: "Local Councils",       icon: MapPin,    count: "30+",  desc: "Social care authorities" },
  { name: "Recruitment Vendors",  icon: Users,     count: "100+", desc: "Agency partners" },
  { name: "Community Services",   icon: Globe,     count: "80+",  desc: "Community healthcare providers" },
];

const WHY_EVS = [
  {
    icon: Shield,
    title: "Quality Assured",
    desc: "Every professional is vetted, trained, and compliant with NHS and CQC standards.",
    stat: "98% satisfaction",
  },
  {
    icon: Zap,
    title: "Fast Response",
    desc: "Average placement time of 24–48 hours for urgent staffing requirements.",
    stat: "48hr response",
  },
  {
    icon: Star,
    title: "5-Star Service",
    desc: "Consistently rated excellent by our clients for reliability and professionalism.",
    stat: "4.9/5 rating",
  },
  {
    icon: Award,
    title: "Industry Accredited",
    desc: "Recognised for excellence in healthcare recruitment and staffing solutions.",
    stat: "100% compliant",
  },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit Request",     desc: "Tell us your staffing needs through our simple request form.",                icon: ClipboardCheck },
  { num: "02", title: "Needs Assessment",   desc: "We assess your requirements and create a tailored staffing plan.",            icon: Phone          },
  { num: "03", title: "Candidate Matching", desc: "We match your needs with our pool of vetted, compliant professionals.",       icon: Users          },
  { num: "04", title: "Placement & Support",desc: "Staff are placed and we provide ongoing 24/7 support and follow-up.",        icon: Headphones     },
];

// ─────────────────────────────────────────────────────────────────────────────
// HERO BANNER
// ─────────────────────────────────────────────────────────────────────────────
function HeroBanner() {
  const [ref, inView] = useReveal(0.2);
  const shouldReduce  = useReducedMotion();

  const professionals = useAnimatedCounter(5000, 2000, inView);
  const satisfaction  = useAnimatedCounter(98,   1800, inView);
  const partners      = useAnimatedCounter(500,  1900, inView);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const heroStats = [
    { num: `${professionals.toLocaleString()}+`, label: "Healthcare Professionals" },
    { num: `${satisfaction}%`,                   label: "Client Satisfaction"      },
    { num: "24/7",                               label: "Support Available"        },
    { num: `${partners}+`,                       label: "Partner Sites"            },
  ];

  return (
    <motion.div
      ref={ref}
      variants={fadeUp(0)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="emp-hero"
      aria-label="Employers hero banner"
    >
      <div className="emp-hero-bg">
        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80"
          srcSet="
            https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=75 800w,
            https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80 1200w,
            https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80 1600w
          "
          sizes="(max-width: 768px) 100vw, 1200px"
          alt="Healthcare professionals collaborating in a modern hospital corridor"
          className="emp-hero-img"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="emp-hero-overlay" aria-hidden="true" />
      </div>

      <div className="emp-hero-body">
        <div className="emp-hero-icon" aria-hidden="true">
          <Building2 size={26} strokeWidth={1.6} />
        </div>

        <span className="emp-hero-eyebrow">For Employers &amp; Care Providers</span>

        <h1 className="emp-hero-title">
          Your Trusted{" "}
          <span className="emp-hero-highlight">Healthcare Staffing</span>{" "}
          Partner
        </h1>

        <p className="emp-hero-sub">
          Access a growing network of over 5,000 fully vetted healthcare professionals.
          From emergency cover to permanent placements - we deliver quality staff, fast.
        </p>

        <div className="emp-hero-btns">
          <motion.button
            whileHover={shouldReduce ? {} : { scale: 1.04, boxShadow: "0 10px 28px rgba(196,151,42,0.5)" }}
            whileTap={shouldReduce ? {} : { scale: 0.97 }}
            onClick={() => scrollTo("employer-request-form")}
            className="emp-btn-primary"
            aria-label="Go to the staff request form"
          >
            Request Staff Now <ArrowRight size={15} aria-hidden="true" />
          </motion.button>

          <motion.button
            whileHover={shouldReduce ? {} : { scale: 1.03, background: "rgba(255,255,255,0.14)" }}
            whileTap={shouldReduce ? {} : { scale: 0.97 }}
            onClick={() => scrollTo("employer-services")}
            className="emp-btn-secondary"
            aria-label="View our staffing services"
          >
            Explore Services
          </motion.button>
        </div>

        <div className="emp-hero-stats" role="list" aria-label="Key statistics">
          {heroStats.map((s, i) => (
            <div key={i} className="emp-hero-stat-group" role="listitem">
              {i > 0 && <div className="emp-hero-divider" aria-hidden="true" />}
              <div>
                <span className="emp-hero-stat-num">{s.num}</span>
                <span className="emp-hero-stat-lbl">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES — Mobile: 2x2 grid
// ─────────────────────────────────────────────────────────────────────────────
function ServicesSection() {
  const [ref, inView] = useReveal(0.1);
  const shouldReduce  = useReducedMotion();
  const isMobile = useMobile();

  return (
    <section ref={ref} id="employer-services" aria-labelledby="services-heading" className="emp-section">
      <motion.div
        variants={fadeUp(0)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="emp-section-hdr"
      >
        <SectionEyebrow>Our Services</SectionEyebrow>
        <SectionHeading id="services-heading">
          Staffing Solutions <Au>For Every Need</Au>
        </SectionHeading>
        <p className="emp-section-sub">
          Flexible, reliable, and cost-effective staffing solutions tailored to your organisation.
        </p>
      </motion.div>

      {isMobile ? (
        <div className="mobile-grid-2x2" role="list">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                variants={fadeUp(i * 0.08)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                whileHover={shouldReduce ? {} : { y: -4, borderColor: T.borderGold, boxShadow: "0 12px 28px rgba(0,0,0,0.07)" }}
                className="emp-card"
                role="listitem"
              >
                <div className="emp-card-icon" style={{ color: s.color }}>
                  <Icon size={26} strokeWidth={1.6} aria-hidden="true" />
                </div>
                <h3 className="emp-card-title">{s.title}</h3>
                <p className="emp-card-desc">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <ul className="emp-grid-4" role="list">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={s.title}>
                <motion.div
                  variants={fadeUp(i * 0.08)}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  whileHover={shouldReduce ? {} : { y: -4, borderColor: T.borderGold, boxShadow: "0 12px 28px rgba(0,0,0,0.07)" }}
                  className="emp-card"
                >
                  <div className="emp-card-icon" style={{ color: s.color }}>
                    <Icon size={26} strokeWidth={1.6} aria-hidden="true" />
                  </div>
                  <h3 className="emp-card-title">{s.title}</h3>
                  <p className="emp-card-desc">{s.desc}</p>
                </motion.div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BENEFITS — Mobile: horizontal slide with buttons
// ─────────────────────────────────────────────────────────────────────────────
function BenefitsSection() {
  const [ref, inView] = useReveal(0.1);
  const shouldReduce  = useReducedMotion();
  const isMobile = useMobile();

  return (
    <section ref={ref} aria-labelledby="benefits-heading" className="emp-section emp-section-cream">
      <motion.div
        variants={fadeUp(0)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="emp-section-hdr"
      >
        <SectionEyebrow>Why Choose EVS</SectionEyebrow>
        <SectionHeading id="benefits-heading">
          Your Strategic <Au>Staffing Partner</Au>
        </SectionHeading>
        <p className="emp-section-sub">
          We deliver quality healthcare professionals when you need them most.
        </p>
      </motion.div>

      {isMobile ? (
        <HorizontalScroll gap={16}>
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                variants={fadeUp(i * 0.06)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                whileHover={shouldReduce ? {} : { y: -3, borderColor: T.borderGold }}
                className="emp-benefit-card mobile-slide-card"
              >
                <div className="emp-benefit-icon">
                  <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="emp-card-title" style={{ fontSize: 15, marginBottom: 5 }}>{b.title}</h3>
                  <p className="emp-card-desc">{b.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </HorizontalScroll>
      ) : (
        <ul className="emp-grid-3" role="list">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <li key={b.title}>
                <motion.div
                  variants={fadeUp(i * 0.06)}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  whileHover={shouldReduce ? {} : { y: -3, borderColor: T.borderGold }}
                  className="emp-benefit-card"
                >
                  <div className="emp-benefit-icon">
                    <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="emp-card-title" style={{ fontSize: 15, marginBottom: 5 }}>{b.title}</h3>
                    <p className="emp-card-desc">{b.desc}</p>
                  </div>
                </motion.div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WHY EVS — Mobile: auto marquee, pause on hover
// ─────────────────────────────────────────────────────────────────────────────
function WhyEVSSection() {
  const [ref, inView] = useReveal(0.1);
  const shouldReduce  = useReducedMotion();
  const isMobile = useMobile();

  return (
    <section ref={ref} aria-labelledby="why-evs-heading" className="emp-section">
      <motion.div
        variants={fadeUp(0)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="emp-section-hdr"
      >
        <SectionEyebrow>Why EVS Healthcare</SectionEyebrow>
        <SectionHeading id="why-evs-heading">
          Built on <Au>Trust</Au> and <Au>Excellence</Au>
        </SectionHeading>
        <p className="emp-section-sub">
          Our commitment to quality and reliability has made us a trusted partner for healthcare organisations.
        </p>
      </motion.div>

      {isMobile ? (
        <InfiniteSlider gap={16} speed={25} pauseOnHover={true}>
          {WHY_EVS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={fadeUp(i * 0.08)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                whileHover={shouldReduce ? {} : { y: -4, borderColor: T.borderGold }}
                className="emp-card emp-card-center mobile-slide-card"
              >
                <div className="emp-why-icon">
                  <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                </div>
                <h3 className="emp-card-title">{item.title}</h3>
                <p className="emp-card-desc" style={{ marginBottom: 14 }}>{item.desc}</p>
                <span className="emp-stat-badge">{item.stat}</span>
              </motion.div>
            );
          })}
        </InfiniteSlider>
      ) : (
        <ul className="emp-grid-4" role="list">
          {WHY_EVS.map((item, i) => {
            const Icon = item.icon;
            return (
              <li key={item.title}>
                <motion.div
                  variants={fadeUp(i * 0.08)}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  whileHover={shouldReduce ? {} : { y: -4, borderColor: T.borderGold }}
                  className="emp-card emp-card-center"
                >
                  <div className="emp-why-icon">
                    <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                  </div>
                  <h3 className="emp-card-title">{item.title}</h3>
                  <p className="emp-card-desc" style={{ marginBottom: 14 }}>{item.desc}</p>
                  <span className="emp-stat-badge">{item.stat}</span>
                </motion.div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTORS — Mobile: infinite slider
// ─────────────────────────────────────────────────────────────────────────────
function SectorsSection() {
  const [ref, inView] = useReveal(0.1);
  const shouldReduce  = useReducedMotion();
  const isMobile = useMobile();

  return (
    <section ref={ref} aria-labelledby="sectors-heading" className="emp-section emp-section-cream">
      <motion.div
        variants={fadeUp(0)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="emp-section-hdr"
      >
        <SectionEyebrow>Who We Work With</SectionEyebrow>
        <SectionHeading id="sectors-heading">
          Trusted Across <Au>Every Sector</Au>
        </SectionHeading>
        <p className="emp-section-sub">
          We partner with a wide range of healthcare organisations across the UK.
        </p>
      </motion.div>

      {isMobile ? (
        <InfiniteSlider gap={16} speed={30} pauseOnHover={false}>
          {SECTORS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.name}
                variants={scaleIn(i * 0.05)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                whileHover={shouldReduce ? {} : { y: -3, borderColor: T.borderGold }}
                className="emp-sector-card mobile-slide-card"
              >
                <div className="emp-benefit-icon">
                  <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="emp-card-title" style={{ fontSize: 14, marginBottom: 2 }}>{s.name}</h3>
                  <span className="emp-sector-count">{s.count}</span>
                  <span className="emp-card-desc" style={{ fontSize: 12 }}>{s.desc}</span>
                </div>
              </motion.div>
            );
          })}
        </InfiniteSlider>
      ) : (
        <ul className="emp-grid-3" role="list">
          {SECTORS.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={s.name}>
                <motion.div
                  variants={scaleIn(i * 0.05)}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  whileHover={shouldReduce ? {} : { y: -3, borderColor: T.borderGold }}
                  className="emp-sector-card"
                >
                  <div className="emp-benefit-icon">
                    <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="emp-card-title" style={{ fontSize: 14, marginBottom: 2 }}>{s.name}</h3>
                    <span className="emp-sector-count">{s.count}</span>
                    <span className="emp-card-desc" style={{ fontSize: 12 }}>{s.desc}</span>
                  </div>
                </motion.div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROCESS — Mobile: flip to next card on click
// ─────────────────────────────────────────────────────────────────────────────
function ProcessSection() {
  const [ref, inView] = useReveal(0.1);
  const shouldReduce  = useReducedMotion();
  const isMobile = useMobile();

  return (
    <section ref={ref} aria-labelledby="process-heading" className="emp-section">
      <motion.div
        variants={fadeUp(0)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="emp-section-hdr"
      >
        <SectionEyebrow>How It Works</SectionEyebrow>
        <SectionHeading id="process-heading">
          A Simple <Au>4-Step</Au> Process
        </SectionHeading>
        <p className="emp-section-sub">
          A streamlined approach to finding the right healthcare professionals for your organisation.
        </p>
      </motion.div>

      {isMobile ? (
        <motion.div
          variants={fadeUp(0.15)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <FlipToNextCard steps={PROCESS_STEPS} />
        </motion.div>
      ) : (
        <ol className="emp-grid-4" role="list">
          {PROCESS_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <li key={step.num}>
                <motion.div
                  variants={fadeUp(i * 0.1)}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  whileHover={shouldReduce ? {} : { y: -4, borderColor: T.borderGold }}
                  className="emp-card emp-card-center"
                >
                  <div className="emp-process-num">{step.num}</div>
                  <div className="emp-process-icon">
                    <Icon size={21} strokeWidth={1.6} aria-hidden="true" />
                  </div>
                  <h3 className="emp-card-title">{step.title}</h3>
                  <p className="emp-card-desc">{step.desc}</p>
                </motion.div>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// REQUEST FORM
// ─────────────────────────────────────────────────────────────────────────────
const BLANK_FORM = {
  organisationName: "", organisationType: "", contactName:  "",
  jobTitle: "",         email: "",            phone: "",
  professionType: "",   otherProfession: "",  specialty: "",
  employmentType: "",   urgency: "",          numberOfStaff: "1",
  shiftPattern: "",     startDate: "",        endDate: "",
  location: "",         postcode: "",         rateOffered: "",
  requirements: "",     howHeard: "",
};

function RequestForm() {
  const [ref, inView]       = useReveal(0.05);
  const [formData,  setFormData]     = useState(BLANK_FORM);
  const [errors,    setErrors]       = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [submitStatus, setStatus]    = useState(null);
  const [hp, setHp] = useState("");
  const lastSubmit = useRef(0);
  const shouldReduce = useReducedMotion();

  const validate = useCallback(() => {
    const e = {};
    if (!formData.organisationName.trim()) e.organisationName = "Organisation name is required";
    if (!formData.contactName.trim())      e.contactName = "Contact name is required";
    if (!formData.email.trim()) {
      e.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = "Enter a valid email address";
    }
    if (!formData.phone.trim())            e.phone = "Phone number is required";
    if (!formData.professionType)          e.professionType = "Select a profession type";
    if (formData.professionType === "Other" && !formData.otherProfession.trim())
      e.otherProfession = "Please specify the profession";
    if (!formData.employmentType)          e.employmentType = "Select an employment type";
    if (!formData.urgency)                 e.urgency = "Select an urgency level";
    if (!formData.location.trim())         e.location = "Location is required";
    if (!formData.requirements.trim())     e.requirements = "Please describe your requirements";
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (prev[name]) {
        const next = { ...prev };
        delete next[name];
        return next;
      }
      return prev;
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hp) return;
    if (isSubmitting) return;

    if (Date.now() - lastSubmit.current < 15000) {
      setErrors({ form: "Please wait a moment before submitting again." });
      return;
    }

    if (!validate()) return;

    if (!FORMSPREE_URL) {
      if (import.meta.env.DEV) {
        console.error(
          "[EVS Employers] VITE_FORMSPREE_ID is not set. Add it to your .env file."
        );
      }
      setStatus("error");
      return;
    }

    setSubmitting(true);
    setStatus(null);

    try {
      const payload = {
        _subject: `New Staff Request — ${formData.organisationName}`,
        ...formData,
        otherProfession: formData.professionType === "Other" ? formData.otherProfession : "N/A",
        submittedAt: new Date().toISOString(),
      };
      const res = await fetch(FORMSPREE_URL, {
        method:  "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body:    JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      lastSubmit.current = Date.now();
      setStatus("success");
      setFormData(BLANK_FORM);
      setErrors({});
      setTimeout(() => {
        document.getElementById("rf-success")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    } catch (err) {
      if (import.meta.env.DEV) console.error("[EVS Employers] Form submit error:", err);
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (name) =>
    `rf-input${errors[name] ? " rf-input-error" : ""}`;

  const fieldProps = (name) => ({
    name,
    id:               name,
    value:            formData[name],
    onChange:         handleChange,
    className:        inputClass(name),
    "aria-invalid":   !!errors[name],
    "aria-describedby": errors[name] ? `${name}-err` : undefined,
  });

  return (
    <section
      ref={ref}
      id="employer-request-form"
      aria-labelledby="rf-heading"
      className="emp-section"
    >
      <motion.div
        variants={fadeUp(0)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="emp-section-hdr"
      >
        <SectionEyebrow>Request Staff</SectionEyebrow>
        <SectionHeading id="rf-heading">
          Tell Us What You <Au>Need</Au>
        </SectionHeading>
        <p className="emp-section-sub">
          Fill in the form and our team will match you with the right professionals within hours.
        </p>
      </motion.div>

      {submitStatus === "success" ? (
        <motion.div
          variants={scaleIn(0)}
          initial="hidden"
          animate="visible"
          className="rf-success"
          id="rf-success"
          role="status"
          aria-live="polite"
        >
          <div className="rf-success-icon" aria-hidden="true">
            <CheckCircle size={48} strokeWidth={1.4} />
          </div>
          <h3 className="rf-success-title">Request Submitted!</h3>
          <p className="rf-success-desc">
            Thank you. One of our account managers will contact you within{" "}
            <strong>2 hours</strong> to discuss your requirements.
          </p>
          <div className="rf-success-ticks" aria-label="What happens next">
            <div className="rf-success-tick"><Clock size={15} aria-hidden="true" /><span>Response within 2 hours</span></div>
            <div className="rf-success-tick"><Users size={15} aria-hidden="true" /><span>5,000+ professionals available</span></div>
            <div className="rf-success-tick"><CheckCircle size={15} aria-hidden="true" /><span>98% client satisfaction</span></div>
          </div>
          <button
            className="rf-another-btn"
            onClick={() => {
              setStatus(null);
              document.getElementById("employer-request-form")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Submit Another Request
          </button>
        </motion.div>
      ) : (
        <motion.form
          variants={fadeUp(0.15)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          onSubmit={handleSubmit}
          className="rf-form"
          noValidate
          aria-label="Staff request form"
        >
          {/* Honeypot */}
          <div style={{ position: "absolute", left: "-9999px", opacity: 0 }} aria-hidden="true">
            <label htmlFor="hp-website">Website</label>
            <input id="hp-website" type="text" name="website" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
          </div>

          {submitStatus === "error" && (
            <div className="rf-error-banner" role="alert">
              <AlertCircle size={17} aria-hidden="true" />
              <div>
                <strong>Submission failed.</strong>{" "}
                {!FORMSPREE_URL
                  ? "Form endpoint not configured. Please call us on "
                  : "Please try again or call us on "}
                <a href="tel:01772493994" className="rf-link">01772 493994</a>.
              </div>
              <button
                type="button"
                onClick={() => setStatus(null)}
                className="rf-error-close"
                aria-label="Dismiss error"
              >
                <X size={15} />
              </button>
            </div>
          )}

          {errors.form && (
            <div className="rf-error-banner" role="alert">
              <AlertCircle size={17} aria-hidden="true" />
              <div>{errors.form}</div>
              <button type="button" onClick={() => setErrors((prev) => { const n = {...prev}; delete n.form; return n; })} className="rf-error-close" aria-label="Dismiss error"><X size={15} /></button>
            </div>
          )}

          <fieldset className="rf-group">
            <legend className="rf-legend">
              <Building2 size={17} aria-hidden="true" /> Organisation Details
            </legend>
            <div className="rf-row">
              <div className="rf-field">
                <label htmlFor="organisationName" className="rf-label">
                  Organisation Name <span className="rf-req" aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. St. Mary's Hospital"
                  autoComplete="organization"
                  {...fieldProps("organisationName")}
                />
                {errors.organisationName && (
                  <span id="organisationName-err" className="rf-err" role="alert">{errors.organisationName}</span>
                )}
              </div>
              <div className="rf-field">
                <label htmlFor="organisationType" className="rf-label">Organisation Type</label>
                <select {...fieldProps("organisationType")} className="rf-input rf-select">
                  <option value="">Select type…</option>
                  <option value="nhs-trust">NHS Trust</option>
                  <option value="private-hospital">Private Hospital</option>
                  <option value="care-home">Care Home</option>
                  <option value="nursing-home">Nursing Home</option>
                  <option value="local-council">Local Council</option>
                  <option value="community-service">Community Service</option>
                  <option value="recruitment-agency">Recruitment Agency (Vendor)</option>
                  <option value="gp-practice">GP Practice</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset className="rf-group">
            <legend className="rf-legend">
              <Mail size={17} aria-hidden="true" /> Contact Information
            </legend>
            <div className="rf-row rf-row-3">
              <div className="rf-field">
                <label htmlFor="contactName" className="rf-label">
                  Contact Name <span className="rf-req" aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sarah Johnson"
                  autoComplete="name"
                  {...fieldProps("contactName")}
                />
                {errors.contactName && (
                  <span id="contactName-err" className="rf-err" role="alert">{errors.contactName}</span>
                )}
              </div>
              <div className="rf-field">
                <label htmlFor="jobTitle" className="rf-label">Job Title</label>
                <input
                  type="text"
                  placeholder="e.g. Ward Manager"
                  autoComplete="organization-title"
                  {...fieldProps("jobTitle")}
                />
              </div>
              <div className="rf-field">
                <label htmlFor="email" className="rf-label">
                  Email Address <span className="rf-req" aria-hidden="true">*</span>
                </label>
                <input
                  type="email"
                  placeholder="sarah@hospital.nhs.uk"
                  autoComplete="email"
                  inputMode="email"
                  {...fieldProps("email")}
                />
                {errors.email && (
                  <span id="email-err" className="rf-err" role="alert">{errors.email}</span>
                )}
              </div>
            </div>
            <div className="rf-row">
              <div className="rf-field">
                <label htmlFor="phone" className="rf-label">
                  Phone Number <span className="rf-req" aria-hidden="true">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 07700 900000"
                  autoComplete="tel"
                  inputMode="tel"
                  {...fieldProps("phone")}
                />
                {errors.phone && (
                  <span id="phone-err" className="rf-err" role="alert">{errors.phone}</span>
                )}
              </div>
              <div className="rf-field">
                <label htmlFor="howHeard" className="rf-label">How did you hear about us?</label>
                <select {...fieldProps("howHeard")} className="rf-input rf-select">
                  <option value="">Select…</option>
                  <option value="google">Google Search</option>
                  <option value="recommendation">Colleague Recommendation</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="nhs-framework">NHS Framework</option>
                  <option value="event">Healthcare Event / Conference</option>
                  <option value="existing-client">Existing Client</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset className="rf-group">
            <legend className="rf-legend">
              <Stethoscope size={17} aria-hidden="true" /> Staff Requirements
            </legend>
            <div className="rf-row rf-row-3">
              <div className="rf-field">
                <label htmlFor="professionType" className="rf-label">
                  Profession Type <span className="rf-req" aria-hidden="true">*</span>
                </label>
                <select {...fieldProps("professionType")} className={`rf-input rf-select${errors.professionType ? " rf-input-error" : ""}`}>
                  <option value="">Select profession…</option>
                  {PROFESSION_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.professionType && (
                  <span id="professionType-err" className="rf-err" role="alert">{errors.professionType}</span>
                )}
              </div>
              {formData.professionType === "Other" && (
                <div className="rf-field">
                  <label htmlFor="otherProfession" className="rf-label">
                    Specify Profession <span className="rf-req" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter profession"
                    {...fieldProps("otherProfession")}
                  />
                  {errors.otherProfession && (
                    <span id="otherProfession-err" className="rf-err" role="alert">{errors.otherProfession}</span>
                  )}
                </div>
              )}
              <div className="rf-field">
                <label htmlFor="specialty" className="rf-label">Specialty / Department</label>
                <select {...fieldProps("specialty")} className="rf-input rf-select">
                  <option value="">Select specialty…</option>
                  {SPECIALTIES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="rf-field">
                <label htmlFor="numberOfStaff" className="rf-label">Number of Staff</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  inputMode="numeric"
                  {...fieldProps("numberOfStaff")}
                />
              </div>
            </div>
            <div className="rf-row rf-row-3">
              <div className="rf-field">
                <label htmlFor="employmentType" className="rf-label">
                  Employment Type <span className="rf-req" aria-hidden="true">*</span>
                </label>
                <select {...fieldProps("employmentType")} className={`rf-input rf-select${errors.employmentType ? " rf-input-error" : ""}`}>
                  <option value="">Select type…</option>
                  {EMPLOYMENT_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
                {errors.employmentType && (
                  <span id="employmentType-err" className="rf-err" role="alert">{errors.employmentType}</span>
                )}
              </div>
              <div className="rf-field">
                <label htmlFor="urgency" className="rf-label">
                  Urgency Level <span className="rf-req" aria-hidden="true">*</span>
                </label>
                <select {...fieldProps("urgency")} className={`rf-input rf-select${errors.urgency ? " rf-input-error" : ""}`}>
                  <option value="">Select urgency…</option>
                  {URGENCY_LEVELS.map((l) => (
                    <option key={l.value} value={l.value}>{l.label}</option>
                  ))}
                </select>
                {errors.urgency && (
                  <span id="urgency-err" className="rf-err" role="alert">{errors.urgency}</span>
                )}
              </div>
              <div className="rf-field">
                <label htmlFor="shiftPattern" className="rf-label">Shift Pattern</label>
                <select {...fieldProps("shiftPattern")} className="rf-input rf-select">
                  <option value="">Select pattern…</option>
                  {SHIFT_PATTERNS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="rf-row">
              <div className="rf-field">
                <label htmlFor="startDate" className="rf-label">Start Date</label>
                <input type="date" {...fieldProps("startDate")} />
              </div>
              <div className="rf-field">
                <label htmlFor="endDate" className="rf-label">End Date (if known)</label>
                <input type="date" {...fieldProps("endDate")} />
              </div>
            </div>
          </fieldset>

          <fieldset className="rf-group">
            <legend className="rf-legend">
              <MapPin size={17} aria-hidden="true" /> Location &amp; Budget
            </legend>
            <div className="rf-row rf-row-3">
              <div className="rf-field">
                <label htmlFor="location" className="rf-label">
                  Location <span className="rf-req" aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Manchester"
                  autoComplete="address-level2"
                  {...fieldProps("location")}
                />
                {errors.location && (
                  <span id="location-err" className="rf-err" role="alert">{errors.location}</span>
                )}
              </div>
              <div className="rf-field">
                <label htmlFor="postcode" className="rf-label">Postcode</label>
                <input
                  type="text"
                  placeholder="e.g. M1 1AA"
                  autoComplete="postal-code"
                  {...fieldProps("postcode")}
                />
              </div>
              <div className="rf-field">
                <label htmlFor="rateOffered" className="rf-label">Rate Offered (if known)</label>
                <input
                  type="text"
                  placeholder="e.g. £25/hr"
                  {...fieldProps("rateOffered")}
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="rf-group">
            <legend className="rf-legend">
              <ClipboardCheck size={17} aria-hidden="true" /> Additional Requirements
            </legend>
            <div className="rf-field">
              <label htmlFor="requirements" className="rf-label">
                Specific Requirements <span className="rf-req" aria-hidden="true">*</span>
              </label>
              <textarea
                rows={5}
                placeholder="Describe qualifications, experience, compliance requirements, language skills, or other essential criteria…"
                {...fieldProps("requirements")}
              />
              {errors.requirements && (
                <span id="requirements-err" className="rf-err" role="alert">{errors.requirements}</span>
              )}
              <span className="rf-help">
                Include compliance requirements, qualifications, or any specific skills needed.
              </span>
            </div>
          </fieldset>

          <div className="rf-submit-wrap">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={!isSubmitting && !shouldReduce ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting && !shouldReduce ? { scale: 0.98 } : {}}
              className="rf-submit-btn"
              aria-disabled={isSubmitting}
            >
              {isSubmitting ? (
                <><Loader2 size={17} className="rf-spinner" aria-hidden="true" /> Submitting…</>
              ) : (
                <><Send size={15} aria-hidden="true" /> Submit Staff Request</>
              )}
            </motion.button>
            <p className="rf-disclaimer">
              By submitting you agree to our{" "}
              <a href="/privacy-policy" className="rf-link">Privacy Policy</a>.
              We will never share your data with third parties.
            </p>
          </div>
        </motion.form>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA
// ─────────────────────────────────────────────────────────────────────────────
function CTASection() {
  const [ref, inView] = useReveal(0.2);
  const navigate      = useNavigate();
  const shouldReduce  = useReducedMotion();

  const scrollToForm = useCallback(() => {
    document.getElementById("employer-request-form")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section ref={ref} aria-labelledby="cta-heading" className="emp-section emp-cta-section">
      <motion.div
        variants={fadeUp(0.1)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="emp-cta-inner"
      >
        <div aria-hidden="true" className="emp-cta-glow" />
        <div className="emp-cta-body">
          <SectionHeading light id="cta-heading">
            Ready to Find Your Next <Au>Healthcare Professionals</Au>?
          </SectionHeading>
          <p className="emp-cta-sub">
            Join hundreds of healthcare organisations that trust EVS for their staffing needs.
            Submit a request and we'll respond within 2 hours.
          </p>
          <div className="emp-cta-btns">
            <motion.button
              whileHover={shouldReduce ? {} : { scale: 1.04, boxShadow: "0 10px 28px rgba(196,151,42,0.5)" }}
              whileTap={shouldReduce ? {} : { scale: 0.97 }}
              onClick={scrollToForm}
              className="emp-btn-primary"
              aria-label="Go to staff request form"
            >
              Request Staff Now <ArrowRight size={15} aria-hidden="true" />
            </motion.button>
            <motion.button
              whileHover={shouldReduce ? {} : { scale: 1.03 }}
              whileTap={shouldReduce ? {} : { scale: 0.97 }}
              onClick={() => navigate("/contact")}
              className="emp-btn-secondary"
              aria-label="Go to contact page"
            >
              Contact Us
            </motion.button>
          </div>
          <ul className="emp-cta-ticks" aria-label="Trust signals">
            {["500+ partner sites served", "98% satisfaction rate", "24/7 support available"].map((t) => (
              <li key={t} className="emp-cta-tick">
                <CheckCircle size={15} color={T.gold} aria-hidden="true" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────────────────────
export default function Employers() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        a:focus-visible, button:focus-visible, input:focus-visible,
        select:focus-visible, textarea:focus-visible {
          outline: 2px solid #C4972A;
          outline-offset: 3px;
          border-radius: 4px;
        }

        .emp-page {
          padding: clamp(80px,12vh,120px) clamp(16px,5vw,80px);
          background: #f8fafc;
          min-height: 100vh;
        }
        .emp-container { max-width: 1200px; margin: 0 auto; }

        .eyebrow-text {
          font-family: 'Inter', sans-serif;
          font-size: 10px; font-weight: 800;
          letter-spacing: 0.22em; text-transform: uppercase; color: #C4972A;
          white-space: nowrap;
        }
        .section-heading {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 700; letter-spacing: -0.02em; line-height: 1.2;
          margin-bottom: 14px;
        }
        .emp-section-hdr {
          text-align: center; margin-bottom: clamp(36px,5vh,56px);
        }
        .emp-section-sub {
          font-family: 'Inter', sans-serif; font-size: clamp(13px, 1.2vw, 14px);
          color: #64748b; max-width: 500px; margin: 0 auto; line-height: 1.68;
        }

        .emp-section {
          padding: clamp(52px,8vh,80px) 0;
        }
        .emp-section-cream { 
          background: #fefcf8; 
          border-radius: 24px; 
          padding: clamp(32px, 5vw, 48px) clamp(16px, 3vw, 24px); 
          margin: 8px 0; 
        }

        .emp-card {
          background: #fff; border-radius: 20px; padding: clamp(22px,3vw,30px) clamp(18px,2.5vw,26px);
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          height: 100%;
        }
        .emp-card-center { text-align: center; }
        .emp-card-title {
          font-family: 'Inter', sans-serif; font-size: clamp(15px, 1.5vw, 17px); 
          font-weight: 700;
          color: #0f1d3d; margin-bottom: 8px; letter-spacing: -0.01em;
        }
        .emp-card-desc {
          font-family: 'Inter', sans-serif; font-size: clamp(12px, 1.1vw, 13px);
          color: #64748b; line-height: 1.65; margin: 0;
        }
        .emp-card-icon {
          width: 52px; height: 52px; border-radius: 14px;
          background: rgba(196,151,42,0.08);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
        }

        .emp-benefit-card {
          display: flex; align-items: flex-start; gap: 14px;
          background: #fff; border-radius: 16px;
          padding: clamp(16px,2.5vw,24px);
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 1px 2px rgba(0,0,0,0.04);
          transition: transform 0.25s ease, border-color 0.25s ease;
          height: 100%;
        }
        .emp-benefit-icon {
          width: 44px; height: 44px; border-radius: 12px;
          background: rgba(196,151,42,0.08);
          display: flex; align-items: center; justify-content: center;
          color: #C4972A; flex-shrink: 0;
        }

        .emp-sector-card {
          display: flex; align-items: center; gap: 12px;
          background: #fff; border-radius: 14px;
          padding: clamp(14px,2vw,20px);
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 1px 2px rgba(0,0,0,0.04);
          transition: transform 0.25s ease, border-color 0.25s ease;
          height: 100%;
        }
        .emp-sector-count {
          font-family: 'Inter', sans-serif; font-size: 12px;
          font-weight: 700; color: #C4972A; margin-right: 5px;
        }

        .emp-why-icon {
          width: 56px; height: 56px; border-radius: 50%;
          background: rgba(196,151,42,0.08);
          display: flex; align-items: center; justify-content: center;
          color: #C4972A; margin: 0 auto 16px;
        }
        .emp-stat-badge {
          font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 700;
          color: #C4972A; background: rgba(196,151,42,0.08);
          padding: 4px 12px; border-radius: 20px; display: inline-block;
        }

        .emp-process-num {
          font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 800;
          color: #C4972A; letter-spacing: 2px; margin-bottom: 10px;
        }
        .emp-process-icon {
          width: 52px; height: 52px; border-radius: 50%;
          background: rgba(196,151,42,0.08);
          display: flex; align-items: center; justify-content: center;
          color: #C4972A; margin: 0 auto 16px;
        }

        .emp-grid-4 {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: clamp(14px,2.5vw,24px); list-style: none;
        }
        .emp-grid-3 {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: clamp(12px,2vw,20px); list-style: none;
        }

        .emp-hero {
          position: relative; border-radius: 24px; overflow: hidden;
          margin-bottom: 48px;
          box-shadow: 0 8px 32px rgba(15,29,61,0.1);
        }
        .emp-hero-bg { 
          position: relative; 
          width: 100%; 
          height: clamp(480px, 65vh, 560px);
          overflow: hidden; 
        }
        .emp-hero-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.6s ease;
        }
        .emp-hero:hover .emp-hero-img { transform: scale(1.03); }
        .emp-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(10,22,40,0.93), rgba(15,29,61,0.68));
        }
        .emp-hero-body {
          position: absolute; inset: 0; display: flex; flex-direction: column;
          justify-content: center; padding: clamp(28px, 4vw, 56px) clamp(24px, 5vw, 64px); 
          color: #fff;
        }
        .emp-hero-icon {
          width: clamp(42px, 5vw, 50px); height: clamp(42px, 5vw, 50px); 
          border-radius: 14px;
          background: rgba(196,151,42,0.18); border: 1px solid rgba(196,151,42,0.3);
          display: flex; align-items: center; justify-content: center;
          color: #C4972A; margin-bottom: clamp(12px, 2vw, 18px);
        }
        .emp-hero-eyebrow {
          font-family: 'Inter', sans-serif; font-size: clamp(10px, 1vw, 11px); 
          font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase; color: #C4972A; 
          margin-bottom: clamp(10px, 1.5vw, 14px);
        }

        .emp-hero-title {
          font-family: 'Nunito Sans', sans-serif;
          font-size: clamp(1.8rem, 4.5vw, 3.6rem);
          font-weight: 900;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: clamp(12px, 1.5vw, 16px);
          color: #fff;
          text-shadow: 0 2px 20px rgba(4,10,32,0.55), 0 1px 4px rgba(4,10,32,0.4);
        }
        .emp-hero-highlight {
          background: linear-gradient(135deg, #C4972A, #f0c060, #e8b84a);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; 
          background-clip: text;
        }
        .emp-hero-sub {
          font-family: 'Inter', sans-serif; font-size: clamp(13px, 1.4vw, 16px);
          color: rgba(255,255,255,0.82); max-width: 540px; line-height: 1.72; 
          margin-bottom: clamp(20px, 3vw, 28px);
        }
        .emp-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: clamp(20px, 3vw, 28px); }
        .emp-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: clamp(10px, 1.4vw, 14px) clamp(18px, 2.8vw, 32px); border-radius: 50px;
          background: linear-gradient(135deg, #C4972A, #8B6914);
          color: #fff; font-family: 'Inter', sans-serif;
          font-size: clamp(12px, 1.2vw, 14px); font-weight: 700; border: none; cursor: pointer;
          box-shadow: 0 2px 8px rgba(196,151,42,0.25); transition: box-shadow 0.2s;
          white-space: nowrap;
        }
        .emp-btn-primary:hover { box-shadow: 0 4px 16px rgba(196,151,42,0.4); }
        .emp-btn-secondary {
          display: inline-flex; align-items: center;
          padding: clamp(10px, 1.4vw, 14px) clamp(18px, 2.8vw, 32px); border-radius: 50px;
          background: rgba(255,255,255,0.08);
          border: 1.5px solid rgba(255,255,255,0.2); color: #fff;
          font-family: 'Inter', sans-serif; font-size: clamp(12px, 1.2vw, 14px); 
          font-weight: 600;
          cursor: pointer; transition: background 0.2s, border-color 0.2s;
          white-space: nowrap;
        }
        .emp-btn-secondary:hover { background: rgba(255,255,255,0.13); border-color: rgba(255,255,255,0.35); }
        .emp-hero-stats { 
          display: flex; align-items: center; gap: clamp(10px, 2vw, 18px); 
          flex-wrap: wrap; 
        }
        .emp-hero-stat-group { display: flex; align-items: center; gap: clamp(10px, 1.5vw, 14px); }
        .emp-hero-divider { width: 1px; height: clamp(24px, 3vh, 30px); background: rgba(255,255,255,0.15); }
        .emp-hero-stat-num {
          font-family: 'Inter', sans-serif; font-size: clamp(16px, 2vw, 24px);
          font-weight: 800; color: #C4972A; display: block;
        }
        .emp-hero-stat-lbl {
          font-family: 'Inter', sans-serif; font-size: clamp(10px, 0.9vw, 11px);
          color: rgba(255,255,255,0.6); font-weight: 500;
        }

        .emp-cta-section { padding-bottom: clamp(52px,8vh,80px); }
        .emp-cta-inner {
          background: linear-gradient(135deg, #0a1628 0%, #0f1d3d 50%, #1a2a4a 100%);
          border-radius: 28px; padding: clamp(32px,6vw,60px) clamp(20px,5vw,56px);
          position: relative; overflow: hidden;
        }
        .emp-cta-glow {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(circle at 70% 30%, rgba(196,151,42,0.07), transparent 60%);
        }
        .emp-cta-body { position: relative; z-index: 2; text-align: center; }
        .emp-cta-sub {
          font-family: 'Inter', sans-serif; font-size: clamp(13px, 1.2vw, 14px);
          color: rgba(255,255,255,0.78); max-width: 500px;
          margin: 0 auto clamp(20px, 4vh, 32px); line-height: 1.72;
        }
        .emp-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 24px; }
        .emp-cta-ticks {
          display: flex; align-items: center; justify-content: center;
          gap: clamp(16px, 3vw, 24px); flex-wrap: wrap; list-style: none;
          padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.08);
        }
        .emp-cta-tick {
          display: flex; align-items: center; gap: 7px;
          font-family: 'Inter', sans-serif; font-size: clamp(11px, 1vw, 12px);
          color: rgba(255,255,255,0.62); font-weight: 500;
        }

        .rf-form { max-width: 900px; margin: 0 auto; }
        .rf-error-banner {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 14px 18px; background: #fef2f2; border: 1px solid #fecaca;
          border-radius: 12px; color: #dc2626;
          font-family: 'Inter', sans-serif; font-size: clamp(12px, 1.1vw, 13px);
          margin-bottom: 24px; line-height: 1.5;
        }
        .rf-error-close {
          margin-left: auto; background: none; border: none;
          color: #dc2626; cursor: pointer; padding: 4px; border-radius: 4px; flex-shrink: 0;
        }
        .rf-group {
          background: #fff; border-radius: 16px; padding: clamp(18px,3vw,28px);
          margin-bottom: 20px; border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
        }
        .rf-legend {
          font-family: 'Inter', sans-serif; font-size: clamp(14px, 1.3vw, 15px); 
          font-weight: 700;
          color: #0f1d3d; margin-bottom: 18px;
          display: flex; align-items: center; gap: 10px; width: 100%;
          padding-bottom: 12px; border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .rf-legend svg { color: #C4972A; flex-shrink: 0; }
        .rf-row {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: clamp(12px,2vw,20px); margin-bottom: 16px;
        }
        .rf-row:last-child { margin-bottom: 0; }
        .rf-row-3 { grid-template-columns: repeat(3, 1fr); }
        .rf-field { display: flex; flex-direction: column; }
        .rf-label {
          font-family: 'Inter', sans-serif; font-size: clamp(12px, 1.1vw, 13px); 
          font-weight: 600;
          color: #334155; margin-bottom: 6px;
        }
        .rf-req { color: #dc2626; }
        .rf-input, .rf-select {
          width: 100%; padding: clamp(10px, 1.2vw, 11px) clamp(12px, 1.5vw, 14px);
          border: 1.5px solid #e2e8f0; border-radius: 10px;
          font-family: 'Inter', sans-serif; font-size: clamp(13px, 1.1vw, 14px); 
          color: #0f1d3d;
          background: #fff; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .rf-input:focus, .rf-select:focus {
          outline: none; border-color: #C4972A;
          box-shadow: 0 0 0 3px rgba(196,151,42,0.12);
        }
        .rf-input-error { border-color: #dc2626 !important; }
        .rf-input-error:focus { box-shadow: 0 0 0 3px rgba(220,38,38,0.12) !important; }
        .rf-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 8L1 3h10z' fill='%2394a3b8'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 14px center;
          padding-right: 36px; cursor: pointer;
        }
        textarea.rf-input { resize: vertical; min-height: 110px; }
        .rf-err {
          font-family: 'Inter', sans-serif; font-size: clamp(11px, 1vw, 12px);
          color: #dc2626; margin-top: 4px;
        }
        .rf-help {
          font-family: 'Inter', sans-serif; font-size: clamp(11px, 1vw, 12px);
          color: #94a3b8; margin-top: 6px;
        }
        .rf-submit-wrap { text-align: center; padding-top: 12px; }
        .rf-submit-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: clamp(13px, 1.5vw, 15px) clamp(28px, 4vw, 44px); 
          border-radius: 50px;
          background: linear-gradient(135deg, #C4972A, #8B6914);
          color: #fff; font-family: 'Inter', sans-serif;
          font-size: clamp(13px, 1.2vw, 15px); font-weight: 700; 
          border: none; cursor: pointer;
          box-shadow: 0 2px 12px rgba(196,151,42,0.3);
          transition: opacity 0.2s, box-shadow 0.2s;
          min-width: clamp(200px, 30vw, 240px); justify-content: center;
        }
        .rf-submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .rf-spinner { animation: rf-spin 1s linear infinite; }
        @keyframes rf-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .rf-disclaimer {
          font-family: 'Inter', sans-serif; font-size: clamp(11px, 1vw, 12px);
          color: #94a3b8; margin-top: 12px;
        }
        .rf-link { color: #C4972A; text-decoration: underline; }
        .rf-success {
          max-width: 600px; margin: 0 auto; text-align: center;
          background: #fff; border-radius: 24px;
          padding: clamp(28px,5vw,52px) clamp(20px,4vw,44px);
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
        }
        .rf-success-icon {
          width: clamp(64px, 8vw, 80px); height: clamp(64px, 8vw, 80px); 
          border-radius: 50%;
          background: rgba(22,163,74,0.1);
          display: flex; align-items: center; justify-content: center;
          color: #16a34a; margin: 0 auto 18px;
        }
        .rf-success-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.4rem, 2.5vw, 1.8rem); 
          font-weight: 700; color: #0f1d3d; margin-bottom: 10px;
        }
        .rf-success-desc {
          font-family: 'Inter', sans-serif; font-size: clamp(13px, 1.2vw, 14px);
          color: #64748b; line-height: 1.72; margin-bottom: 24px;
        }
        .rf-success-ticks {
          display: flex; gap: clamp(12px, 2vw, 20px); 
          justify-content: center; flex-wrap: wrap; margin-bottom: 24px;
        }
        .rf-success-tick {
          display: flex; align-items: center; gap: 7px;
          font-family: 'Inter', sans-serif; font-size: clamp(12px, 1.1vw, 13px);
          color: #0f1d3d; font-weight: 600;
        }
        .rf-success-tick svg { color: #16a34a; flex-shrink: 0; }
        .rf-another-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: clamp(11px, 1.3vw, 13px) clamp(24px, 3vw, 32px); 
          border-radius: 50px;
          background: #fff; color: #C4972A;
          font-family: 'Inter', sans-serif; font-size: clamp(13px, 1.2vw, 14px); 
          font-weight: 700;
          border: 2px solid #C4972A; cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .rf-another-btn:hover { background: #C4972A; color: #fff; }

        .mobile-grid-2x2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .mobile-grid-2x2 .emp-card { min-height: 100%; }

        .horizontal-scroll-container { position: relative; overflow: hidden; }
        .horizontal-scroll-content {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 4px 0;
        }
        .horizontal-scroll-content::-webkit-scrollbar { display: none; }
        .mobile-slide-card {
          flex: 0 0 280px;
          scroll-snap-align: start;
          min-width: 280px;
          max-width: 320px;
        }
        .emp-benefit-card.mobile-slide-card {
          flex: 0 0 280px; min-width: 280px; max-width: 320px; height: auto;
        }
        .emp-sector-card.mobile-slide-card {
          flex: 0 0 260px; min-width: 260px; max-width: 300px; height: auto;
        }
        .emp-card.mobile-slide-card {
          flex: 0 0 260px; min-width: 260px; max-width: 300px; height: auto;
        }

        .scroll-btn {
          position: absolute; top: 50%; transform: translateY(-50%); z-index: 10;
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(255,255,255,0.95); border: 1px solid rgba(0,0,0,0.1);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #0f1d3d; transition: all 0.2s ease;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .scroll-btn:hover { background: #f8fafc; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
        .scroll-btn:active { transform: translateY(-50%) scale(0.95); }
        .scroll-btn-left { left: -4px; }
        .scroll-btn-right { right: -4px; }

        .infinite-slider-wrapper { overflow: hidden; position: relative; }
        .infinite-slider-track {
          display: flex; width: max-content;
          animation: infinite-scroll var(--speed, 30s) linear infinite;
          will-change: transform;
        }
        .infinite-slider-track.paused { animation-play-state: paused; }
        .infinite-slider-group { display: flex; gap: var(--gap, 16px); flex-shrink: 0; }

        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .flip-next-carousel {
          position: relative; display: flex;
          flex-direction: column; align-items: center; gap: 20px;
        }
        .flip-next-inner {
          perspective: 1000px; width: 100%;
          max-width: 340px; height: 280px;
        }
        .flip-next-card {
          position: relative; width: 100%; height: 100%;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d; cursor: pointer;
          will-change: transform;
        }
        .flip-next-card.flipped { transform: rotateY(180deg); }
        .flip-next-front, .flip-next-back {
          position: absolute; width: 100%; height: 100%;
          backface-visibility: hidden; border-radius: 20px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 32px 24px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        }
        .flip-next-front { background: #fff; transform: rotateY(0deg); }
        .flip-next-back {
          background: linear-gradient(135deg, #fefcf8, #fff);
          transform: rotateY(180deg);
          border: 1px solid rgba(196,151,42,0.15);
        }
        .flip-next-back .emp-card-title { color: #C4972A; margin-bottom: 16px; font-size: 18px; }
        .flip-next-back .emp-card-desc { text-align: center; font-size: 15px; line-height: 1.7; }
        .flip-next-front .emp-card-title { font-size: 18px; margin-bottom: 4px; }
        .flip-next-front .emp-process-icon { width: 64px; height: 64px; margin-bottom: 20px; }
        .flip-next-front .emp-process-icon svg { width: 32px; height: 32px; }
        .flip-next-front .emp-process-num { font-size: 13px; margin-bottom: 12px; }
        .flip-next-hint {
          font-family: 'Inter', sans-serif; font-size: 12px;
          color: #94a3b8; margin-top: 16px; font-style: italic;
        }
        .flip-next-back .emp-process-num { font-size: 13px; margin-bottom: 8px; }
        .flip-next-card:focus-visible {
          outline: 2px solid #C4972A;
          outline-offset: 3px;
          border-radius: 20px;
        }

        .flip-next-controls { display: flex; align-items: center; gap: 16px; }
        .flip-nav-btn {
          width: 44px; height: 44px; border-radius: 50%;
          background: #fff; border: 1px solid rgba(0,0,0,0.1);
          box-shadow: 0 2px 8px rgba(0,0,0,0.08); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #0f1d3d; transition: all 0.2s ease;
        }
        .flip-nav-btn:hover:not(:disabled) {
          background: #f8fafc; box-shadow: 0 4px 12px rgba(0,0,0,0.12);
          border-color: #C4972A;
        }
        .flip-nav-btn:active:not(:disabled) { transform: scale(0.95); }
        .flip-nav-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .flip-dots { display: flex; gap: 8px; align-items: center; }
        .flip-dot {
          width: 10px; height: 10px; border-radius: 50%;
          border: none; cursor: pointer; background: #e2e8f0;
          transition: all 0.3s ease; padding: 0;
        }
        .flip-dot.active { background: #C4972A; width: 28px; border-radius: 20px; }
        .flip-dot:hover:not(:disabled) { background: #cbd5e1; }
        .flip-dot.active:hover:not(:disabled) { background: #C4972A; }
        .flip-dot:disabled { cursor: not-allowed; }

        @media (max-width: 1100px) {
          .emp-grid-4 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 900px) {
          .emp-grid-3 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .emp-hero-bg { height: clamp(500px, 75vh, 600px) !important; }
          .emp-hero-body { padding: clamp(24px, 4vw, 40px); }
          .emp-grid-4 { grid-template-columns: 1fr; }
          .emp-grid-3 { grid-template-columns: 1fr; }
          .rf-row, .rf-row-3 { grid-template-columns: 1fr; }
          .emp-hero-stats { gap: 8px; justify-content: center; }
          .emp-hero-stat-group { gap: 8px; }
          .emp-hero-divider { height: 18px; }
          .emp-hero-btns { flex-direction: column; align-items: stretch; }
          .emp-btn-primary, .emp-btn-secondary { justify-content: center; white-space: normal; }
          .emp-cta-btns { flex-direction: column; align-items: stretch; }
          .emp-cta-ticks { flex-direction: column; gap: 8px; align-items: center; }
          .rf-success-ticks { flex-direction: column; align-items: center; }
          .emp-section-cream { padding: clamp(24px, 4vw, 36px) clamp(12px, 2vw, 20px); }
          .rf-group { padding: clamp(16px, 3vw, 20px); }
          .rf-submit-btn { min-width: 100%; }
        }
        @media (max-width: 480px) {
          .emp-hero-title { font-size: clamp(1.5rem, 6vw, 2rem); }
          .emp-hero-sub { font-size: clamp(12px, 3.5vw, 14px); }
          .emp-hero-stats { gap: 6px; flex-wrap: wrap; justify-content: center; }
          .emp-hero-stat-group { gap: 6px; }
          .emp-hero-stat-num { font-size: clamp(14px, 4vw, 18px); }
          .emp-hero-stat-lbl { font-size: clamp(9px, 2.5vw, 10px); }
          .emp-cta-inner { padding: clamp(24px, 5vw, 32px) clamp(16px, 3vw, 24px); }
          .rf-success { padding: clamp(20px, 4vw, 28px) clamp(16px, 3vw, 24px); }
          .section-heading { font-size: clamp(1.4rem, 4.5vw, 1.8rem); }
          .emp-card { padding: clamp(16px, 3vw, 20px); }
          .emp-benefit-card { flex-direction: column; align-items: center; text-align: center; }
          .emp-sector-card { flex-direction: column; align-items: center; text-align: center; }
          .emp-benefit-icon { margin-bottom: 8px; }
          .emp-card-title { font-size: clamp(14px, 4vw, 16px); }
          .rf-legend { font-size: clamp(13px, 3.5vw, 14px); }
          .mobile-grid-2x2 { gap: 12px; }
          .mobile-grid-2x2 .emp-card { padding: clamp(14px, 2.5vw, 18px); }
          .flip-next-inner { height: 260px; max-width: 300px; }
          .scroll-btn { width: 36px; height: 36px; }
          .flip-nav-btn { width: 40px; height: 40px; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
          .emp-hero-img { transform: none !important; }
          .infinite-slider-track { animation: none !important; }
          .flip-next-card { transition: none !important; }
        }
      `}</style>

      <main className="emp-page" id="main-content">
        <div className="emp-container">
          <HeroBanner />
          <ServicesSection />
          <BenefitsSection />
          <WhyEVSSection />
          <SectorsSection />
          <ProcessSection />
          <RequestForm />
          <CTASection />
        </div>
      </main>
    </>
  );
}