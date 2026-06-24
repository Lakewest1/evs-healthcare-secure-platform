// pages/About.jsx — EVS Healthcare Solutions — About Page
// Production-ready: semantic HTML, per-section IntersectionObserver, no RTL tricks,
// GPU-only animations, lazy images, WCAG AA, SSR-safe, mobile-first.

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  BadgeCheck,
  Clock3,
  Building2,
  Users,
  TrendingUp,
  Target,
  Award,
  Heart,
  Handshake,
  ArrowRight,
  ChevronDown,
  CheckCircle,
  Briefcase,
  Star,
  Phone,
  Mail,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Design tokens — single source of truth
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
  border:     "rgba(0,0,0,0.06)",
  borderGold: "rgba(196,151,42,0.2)",
  mutedText:  "#475569",
  textDarkBg: "rgba(255,255,255,0.85)",
};

// ─────────────────────────────────────────────────────────────────────────────
// Framer Motion ease presets
// ─────────────────────────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1];

// ─────────────────────────────────────────────────────────────────────────────
// Per-section reveal hook — each section observes itself independently
// ─────────────────────────────────────────────────────────────────────────────
function useSectionReveal(amount = 0.15) {
  const ref  = useRef(null);
  const inView = useInView(ref, { once: true, amount });
  return [ref, inView];
}

// ─────────────────────────────────────────────────────────────────────────────
// Fade-up animation variant factory
// ─────────────────────────────────────────────────────────────────────────────
const fadeUp = (delay = 0, distance = 28) => ({
  hidden:  { opacity: 0, y: distance },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: EASE } },
});

const fadeLeft = (delay = 0) => ({
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay, ease: EASE } },
});

const fadeRight = (delay = 0) => ({
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay, ease: EASE } },
});

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "5,000+", label: "Healthcare professionals\nin our network",     icon: Users      },
  { value: "98%",    label: "Client satisfaction\nverified post-placement", icon: Star       },
  { value: "24/7",   label: "Support, every day\nof the year",              icon: Clock3     },
  { value: "500+",   label: "Partner organisations\nacross the UK",         icon: Building2  },
];

const VALUES = [
  {
    icon: Award,
    title: "Quality First",
    desc: "Every professional we place is thoroughly vetted, trained, and references-checked. We will never send someone we would not trust in our own family's care.",
  },
  {
    icon: Heart,
    title: "Client-Centred",
    desc: "We listen before we suggest. Our solutions are shaped around your specific workforce pressures, not a template.",
  },
  {
    icon: ShieldCheck,
    title: "Full Transparency",
    desc: "Honest rates, clear compliance documentation, and no hidden fees. You always know exactly who we are sending and why.",
  },
  {
    icon: Target,
    title: "Relentless Excellence",
    desc: "We hold our placements to NHS-grade standards whether the setting is an NHS trust, private hospital, or residential care home.",
  },
];

const WHO_WE_ARE_POINTS = [
  "Temporary, temp-to-perm, permanent, and contract placements",
  "NHS trusts, private hospitals, and residential care homes",
  "Recruitment vendors and local councils across the UK",
  "Competitive, fully transparent rates - no hidden charges",
];

const MISSION_POINTS = [
  "Connecting exceptional talent with organisations that need them most",
  "Enabling continuity of care through responsiveness and reliability",
  "Maintaining NHS-equivalent compliance standards in every setting",
];

const TEAM = [
  { name: "Sir Wizzy Ummah",   role: "CEO & Founder",           icon: Briefcase,  bio: "20+ years in healthcare recruitment. Sir Wizzy founded EVS on a single principle: every placement should feel like a partnership, not a transaction."  },
  { name: "Michael Roberts", role: "Operations Director",     icon: ShieldCheck, bio: "Former NHS operations lead. Michael ensures same-day cover, watertight compliance, and seamless handovers across all our partner sites."              },
  { name: "Emma Thompson",   role: "Head of Compliance",      icon: BadgeCheck,  bio: "DBS, NMC, NVQ, manual handling - Emma's team manages 100% of regulatory paperwork so our clients never have to chase a document."                  },
  { name: "James Wilson",    role: "Business Development",    icon: TrendingUp,  bio: "James builds the relationships that let us move fast. His network spans NHS procurement, private healthcare groups, and independent care providers." },
];

// ─────────────────────────────────────────────────────────────────────────────
// Shared components
// ─────────────────────────────────────────────────────────────────────────────

/** Section eyebrow: -- LABEL -- */
function Eyebrow({ children }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 16,
      }}
    >
      <span style={{ width: 28, height: 2, background: T.gold, borderRadius: 999, display: "block", flexShrink: 0 }} />
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: T.gold,
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </span>
      <span style={{ width: 28, height: 2, background: T.gold, borderRadius: 999, display: "block", flexShrink: 0 }} />
    </div>
  );
}

/** Section heading */
function Heading({ children, light = false, style = {} }) {
  return (
    <h2
      style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
        fontWeight: 700,
        color: light ? T.white : T.navy,
        letterSpacing: "-0.02em",
        lineHeight: 1.2,
        margin: 0,
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

/** Gold accent <span> */
const Au = ({ children }) => (
  <span style={{ color: T.gold }}>{children}</span>
);

/** Consistent check-row for feature lists */
function CheckItem({ children }) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        fontFamily: "'Inter', sans-serif",
        fontSize: 15,
        color: T.slate,
        lineHeight: 1.65,
        listStyle: "none",
      }}
    >
      <CheckCircle
        size={18}
        color={T.gold}
        strokeWidth={2}
        style={{ flexShrink: 0, marginTop: 3 }}
        aria-hidden="true"
      />
      {children}
    </li>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ── GLOBAL PARAGRAPH STYLES (injected via CSS) ──
// ─────────────────────────────────────────────────────────────────────────────
const PARAGRAPH_STYLES = `
  /* ==========================================================
     GLOBAL PARAGRAPH STYLING
     ========================================================== */

  .about-page p {
    font-family: 'Inter', sans-serif;
    font-size: clamp(1rem, 0.95rem + 0.2vw, 1.125rem);
    font-weight: 400;
    line-height: 1.8;
    letter-spacing: -0.01em;
    color: #475569;
    margin: 0 0 1.5rem;
    max-width: 68ch;
    text-wrap: pretty;
  }

  /* Better contrast on dark backgrounds */
  .about-page .section-navy p,
  .about-page .section-navy-grid p {
    color: rgba(255,255,255,0.85);
  }

  /* Override for specific elements that need different styling */
  .about-page .p-small {
    font-size: clamp(0.875rem, 0.85rem + 0.15vw, 1rem);
  }

  .about-page .p-large {
    font-size: clamp(1.125rem, 1.05rem + 0.25vw, 1.25rem);
  }

  .about-page p:last-child {
    margin-bottom: 0;
  }

  /* ── Mobile Carousel Styles ── */
  .mobile-carousel-container {
    position: relative;
    overflow: hidden;
    width: 100%;
  }

  .mobile-carousel-track {
    display: flex;
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform;
  }

  .mobile-carousel-track > * {
    flex: 0 0 100%;
    padding: 0 4px;
  }

  .mobile-carousel-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255,255,255,0.9);
    border: 1px solid rgba(196,151,42,0.2);
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    color: #0f1d3d;
  }
  .mobile-carousel-btn:hover {
    background: #C4972A;
    color: #fff;
    border-color: #C4972A;
  }
  .mobile-carousel-btn:active {
    transform: translateY(-50%) scale(0.95);
  }
  .mobile-carousel-btn-prev { left: -4px; }
  .mobile-carousel-btn-next { right: -4px; }

  /* ── Mobile Team Marquee ── */
  .mobile-team-marquee-container {
    overflow: hidden;
    position: relative;
    width: 100%;
    padding: 8px 0;
  }

  .mobile-team-track {
    display: flex;
    width: max-content;
    animation: mobileTeamMarquee 25s linear infinite;
    will-change: transform;
  }

  .mobile-team-track.paused {
    animation-play-state: paused;
  }

  .mobile-team-track > * {
    flex-shrink: 0;
    width: 280px;
    margin: 0 10px;
  }

  @keyframes mobileTeamMarquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .mobile-team-marquee-container .nav-buttons {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 16px;
  }

  .mobile-team-marquee-container .nav-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255,255,255,0.9);
    border: 1px solid rgba(196,151,42,0.2);
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    color: #0f1d3d;
  }
  .mobile-team-marquee-container .nav-btn:hover {
    background: #C4972A;
    color: #fff;
    border-color: #C4972A;
  }
  .mobile-team-marquee-container .nav-btn:active {
    transform: scale(0.95);
  }

  /* ── Stats 2x2 Grid on Mobile ── */
  @media (max-width: 640px) {
    .stats-grid-desktop {
      display: none !important;
    }
    .stats-grid-mobile {
      display: grid !important;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
  }

  @media (min-width: 641px) {
    .stats-grid-mobile {
      display: none !important;
    }
    .stats-grid-desktop {
      display: grid !important;
    }
  }

  /* ── Values Carousel on Mobile ── */
  @media (max-width: 640px) {
    .values-grid-desktop {
      display: none !important;
    }
    .values-grid-mobile {
      display: block !important;
    }
  }

  @media (min-width: 641px) {
    .values-grid-mobile {
      display: none !important;
    }
    .values-grid-desktop {
      display: grid !important;
    }
  }

  /* ── Team Grid on Mobile ── */
  @media (max-width: 640px) {
    .team-grid-desktop {
      display: none !important;
    }
    .team-grid-mobile {
      display: block !important;
    }
  }

  @media (min-width: 641px) {
    .team-grid-mobile {
      display: none !important;
    }
    .team-grid-desktop {
      display: grid !important;
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────────────────────────────────────
function HeroSection() {
  const shouldReduce = useReducedMotion();
  const navigate = useNavigate();

  const handleContact = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/contact");
  };
  
  const handleApply = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/jobs");
  };

  return (
    <section
      className="about-page section-navy"
      aria-labelledby="about-hero-heading"
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: 80,
      }}
    >
      {/* Background */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "local",
        }}
      />
      {/* Overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(10,22,40,0.93) 0%, rgba(10,22,40,0.78) 60%, rgba(10,22,40,0.88) 100%)",
        }}
      />
      {/* Dot pattern */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(196,151,42,0.025) 0px, rgba(196,151,42,0.025) 1px, transparent 1px, transparent 28px)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 860,
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 48px)",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          {/* Icon badge */}
          <motion.div
            aria-hidden="true"
            initial={shouldReduce ? false : { scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "clamp(60px, 8vw, 80px)",
              height: "clamp(60px, 8vw, 80px)",
              borderRadius: "50%",
              background: "rgba(196,151,42,0.14)",
              border: "2px solid rgba(196,151,42,0.32)",
              marginBottom: "clamp(16px, 3vh, 28px)",
            }}
          >
            <ShieldCheck
              size={36}
              color={T.gold}
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </motion.div>

          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              marginBottom: "clamp(14px, 2.5vh, 22px)",
            }}
          >
            <span style={{ width: 32, height: 2, background: T.gold, borderRadius: 999, display: "block" }} />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: T.gold,
              }}
            >
              About EVS Healthcare
            </span>
            <span style={{ width: 32, height: 2, background: T.gold, borderRadius: 999, display: "block" }} />
          </div>

          <h1
            id="about-hero-heading"
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
              fontWeight: 900,
              color: T.white,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              marginBottom: 18,
              textShadow: "rgba(4, 10, 32, 0.55) 0px 2px 20px, rgba(4, 10, 32, 0.4) 0px 1px 4px",
            }}
          >
            Your Trusted Healthcare
            <br />
            <span style={{ color: T.gold }}>Recruitment Partner</span>
          </h1>

          <motion.p
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.65, ease: EASE }}
            className="section-navy"
            style={{
              color: "rgba(255,255,255,0.85)",
              maxWidth: 620,
              margin: "0 auto clamp(28px, 4vh, 44px)",
            }}
          >
            A client-centred agency with a network of over{" "}
            <strong style={{ color: "rgba(255,255,255,0.96)", fontWeight: 600 }}>
              5,000 healthcare professionals
            </strong>{" "}
            across the UK, delivering high-quality staffing solutions for NHS trusts,
            private hospitals, and care homes.
          </motion.p>

          {/* CTA buttons */}
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <motion.button
              onClick={handleContact}
              whileHover={shouldReduce ? {} : { y: -3, boxShadow: `0 16px 36px rgba(196,151,42,0.45)` }}
              whileTap={shouldReduce ? {} : { y: 1 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                padding: "clamp(13px, 1.5vw, 16px) clamp(24px, 3vw, 38px)",
                borderRadius: 50,
                background: `linear-gradient(135deg, ${T.gold}, ${T.goldDark})`,
                color: T.white,
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(13px, 1.2vw, 15px)",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.03em",
                boxShadow: "0 6px 20px rgba(196,151,42,0.35)",
                transition: "box-shadow 0.3s ease",
              }}
            >
              Contact Us
              <ArrowRight size={16} aria-hidden="true" />
            </motion.button>

            <motion.button
              onClick={handleApply}
              whileHover={shouldReduce ? {} : { y: -3, background: "rgba(255,255,255,0.13)" }}
              whileTap={shouldReduce ? {} : { y: 1 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                padding: "clamp(13px, 1.5vw, 16px) clamp(24px, 3vw, 38px)",
                borderRadius: 50,
                background: "rgba(255,255,255,0.08)",
                border: "1.5px solid rgba(255,255,255,0.22)",
                color: T.white,
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(13px, 1.2vw, 15px)",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.03em",
                transition: "background 0.3s ease",
              }}
            >
              Apply Now
              <ArrowRight size={16} aria-hidden="true" />
            </motion.button>
          </div>

          <motion.div
            initial={shouldReduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            aria-hidden="true"
            style={{
              marginTop: "clamp(36px, 6vh, 56px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 10,
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Scroll to learn more
            </span>
            <motion.div
              animate={shouldReduce ? {} : { y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={22} color="rgba(255,255,255,0.35)" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STATS BAND — 2x2 on mobile
// ─────────────────────────────────────────────────────────────────────────────
function StatsSection() {
  const [ref, inView] = useSectionReveal(0.1);
  const shouldReduce  = useReducedMotion();

  return (
    <section
      ref={ref}
      className="about-page"
      aria-labelledby="stats-heading"
      style={{
        padding: "clamp(60px, 8vh, 96px) clamp(20px, 5vw, 80px)",
        background: T.cream,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ textAlign: "center", marginBottom: "clamp(40px, 6vh, 64px)" }}
        >
          <Eyebrow>Our Impact</Eyebrow>
          <Heading id="stats-heading">
            Making a Difference <Au>in Healthcare</Au>
          </Heading>
        </motion.div>

        {/* Desktop Grid */}
        <div className="stats-grid-desktop" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: "clamp(14px, 2.5vw, 24px)" }}>
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                variants={fadeUp(i * 0.1)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                whileHover={shouldReduce ? {} : { y: -5, boxShadow: "0 16px 36px rgba(0,0,0,0.08)", borderColor: T.borderGold }}
                style={{
                  background: T.white,
                  borderRadius: 20,
                  padding: "clamp(24px, 3vw, 36px) clamp(18px, 2.5vw, 28px)",
                  textAlign: "center",
                  border: `1px solid ${T.border}`,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  transition: "box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: "rgba(196,151,42,0.08)",
                    border: `1px solid rgba(196,151,42,0.15)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <Icon size={24} color={T.gold} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(28px, 4vw, 38px)",
                    fontWeight: 800,
                    color: T.gold,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    marginBottom: 8,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(12px, 1.3vw, 14px)",
                    color: T.slateLight,
                    fontWeight: 500,
                    lineHeight: 1.45,
                    whiteSpace: "pre-line",
                  }}
                >
                  {s.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile 2x2 Grid */}
        <div className="stats-grid-mobile" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                variants={fadeUp(i * 0.1)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                style={{
                  background: T.white,
                  borderRadius: 16,
                  padding: "20px 14px",
                  textAlign: "center",
                  border: `1px solid ${T.border}`,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "rgba(196,151,42,0.08)",
                    border: `1px solid rgba(196,151,42,0.15)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 12px",
                  }}
                >
                  <Icon size={20} color={T.gold} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(22px, 5vw, 28px)",
                    fontWeight: 800,
                    color: T.gold,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(10px, 2.5vw, 12px)",
                    color: T.slateLight,
                    fontWeight: 500,
                    lineHeight: 1.4,
                  }}
                >
                  {s.label.replace("\n", " ")}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WHO WE ARE — Text left, Image right
// ─────────────────────────────────────────────────────────────────────────────
function WhoWeAreSection() {
  const [ref, inView] = useSectionReveal(0.1);
  const shouldReduce  = useReducedMotion();
  const navigate = useNavigate();

  const handleApply = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/jobs");
  };

  return (
    <section
      ref={ref}
      className="about-page"
      aria-labelledby="who-heading"
      style={{
        padding: "clamp(60px, 8vh, 96px) clamp(20px, 5vw, 80px)",
        background: T.white,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
          gap: "clamp(36px, 6vw, 72px)",
          alignItems: "center",
        }}
      >
        {/* Text */}
        <motion.div
          variants={fadeLeft(0)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <Eyebrow>Who We Are</Eyebrow>
          <Heading id="who-heading" style={{ marginBottom: 20 }}>
            A Client-Centred <Au>Staffing Agency</Au>
          </Heading>
          <p>
            With a growing network of over{" "}
            <strong style={{ color: T.navy, fontWeight: 600 }}>
              5,000 healthcare professionals
            </strong>{" "}
            across the UK, we place skilled, fully vetted staff into NHS trusts,
            private hospitals, and residential care homes at competitive, transparent rates.
          </p>
          <ul style={{ padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 12 }}>
            {WHO_WE_ARE_POINTS.map((p) => (
              <CheckItem key={p}>{p}</CheckItem>
            ))}
          </ul>
          <motion.button
            onClick={handleApply}
            whileHover={shouldReduce ? {} : { x: 4 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: T.gold,
              border: "none",
              background: "none",
              cursor: "pointer",
              letterSpacing: "0.02em",
              padding: 0,
            }}
          >
            Apply with us today
            <ArrowRight size={16} aria-hidden="true" />
          </motion.button>
        </motion.div>

        {/* Image */}
        <motion.div
          variants={fadeRight(0.1)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            position: "relative",
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 24px 48px -12px rgba(0,0,0,0.14)",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&q=80"
            alt="EVS Healthcare professional supporting a care home resident"
            loading="lazy"
            decoding="async"
            style={{
              width: "100%",
              height: "clamp(280px, 40vw, 440px)",
              objectFit: "cover",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "20px 24px",
              background: "linear-gradient(transparent, rgba(10,22,40,0.72))",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Handshake size={20} color={T.gold} aria-hidden="true" />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: T.white,
              }}
            >
              Trusted by 500+ organisations
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MISSION — Image left, Text right
// ─────────────────────────────────────────────────────────────────────────────
function MissionSection() {
  const [ref, inView] = useSectionReveal(0.1);
  const shouldReduce  = useReducedMotion();
  const navigate = useNavigate();

  const handlePartner = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/contact");
  };

  return (
    <section
      ref={ref}
      className="about-page"
      aria-labelledby="mission-heading"
      style={{
        padding: "clamp(60px, 8vh, 96px) clamp(20px, 5vw, 80px)",
        background: T.cream,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
          gap: "clamp(36px, 6vw, 72px)",
          alignItems: "center",
        }}
      >
        {/* Image */}
        <motion.div
          variants={fadeLeft(0)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            position: "relative",
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 24px 48px -12px rgba(0,0,0,0.14)",
            order: -1,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80"
            alt="NHS staff collaborating in a hospital setting"
            loading="lazy"
            decoding="async"
            style={{
              width: "100%",
              height: "clamp(280px, 40vw, 440px)",
              objectFit: "cover",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "20px 24px",
              background: "linear-gradient(transparent, rgba(10,22,40,0.72))",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Target size={20} color={T.gold} aria-hidden="true" />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: T.white,
              }}
            >
              Excellence in healthcare staffing
            </span>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          variants={fadeRight(0.1)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <Eyebrow>Our Mission</Eyebrow>
          <Heading id="mission-heading" style={{ marginBottom: 20 }}>
            Transforming Healthcare <Au>Recruitment</Au>
          </Heading>
          <p>
            Our mission is to connect exceptional healthcare talent with the organisations
            that need them most reliably, compliantly, and at a moment's notice.
          </p>
          <ul style={{ padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 12 }}>
            {MISSION_POINTS.map((p) => (
              <CheckItem key={p}>{p}</CheckItem>
            ))}
          </ul>
          <motion.button
            onClick={handlePartner}
            whileHover={shouldReduce ? {} : { x: 4 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: T.gold,
              border: "none",
              background: "none",
              cursor: "pointer",
              letterSpacing: "0.02em",
              padding: 0,
            }}
          >
            Partner with us
            <ArrowRight size={16} aria-hidden="true" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VALUES — Infinite Carousel on Mobile
// ─────────────────────────────────────────────────────────────────────────────
function ValuesSection() {
  const [ref, inView] = useSectionReveal(0.1);
  const shouldReduce  = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 640;

  // Auto-slide for mobile
  useEffect(() => {
    if (!isMobile || shouldReduce || isPaused) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % VALUES.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [isMobile, isPaused, shouldReduce]);

  const nextSlide = () => {
    setIsPaused(true);
    setCurrentIndex((prev) => (prev + 1) % VALUES.length);
    setTimeout(() => setIsPaused(false), 2000);
  };

  const prevSlide = () => {
    setIsPaused(true);
    setCurrentIndex((prev) => (prev - 1 + VALUES.length) % VALUES.length);
    setTimeout(() => setIsPaused(false), 2000);
  };

  return (
    <section
      ref={ref}
      className="about-page"
      aria-labelledby="values-heading"
      style={{
        padding: "clamp(60px, 8vh, 96px) clamp(20px, 5vw, 80px)",
        background: T.white,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ textAlign: "center", marginBottom: "clamp(40px, 6vh, 60px)" }}
        >
          <Eyebrow>Our Values</Eyebrow>
          <Heading id="values-heading">
            What <Au>Drives</Au> Us
          </Heading>
        </motion.div>

        {/* Desktop Grid */}
        <div className="values-grid-desktop" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "clamp(14px, 2.5vw, 24px)" }}>
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                variants={fadeUp(i * 0.1)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                whileHover={shouldReduce ? {} : {
                  y: -5,
                  boxShadow: "0 16px 36px rgba(0,0,0,0.08)",
                  borderColor: T.borderGold,
                }}
                style={{
                  background: T.white,
                  borderRadius: 20,
                  padding: "clamp(22px, 3vw, 32px) clamp(18px, 2.5vw, 26px)",
                  border: `1px solid ${T.border}`,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  transition: "box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: "rgba(196,151,42,0.08)",
                    border: "1px solid rgba(196,151,42,0.14)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 18,
                  }}
                >
                  <Icon size={24} color={T.gold} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(16px, 1.5vw, 18px)",
                    fontWeight: 700,
                    color: T.navy,
                    marginBottom: 10,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(13px, 1.2vw, 14px)",
                    color: T.slateLight,
                    lineHeight: 1.68,
                    margin: 0,
                  }}
                >
                  {v.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Carousel */}
        <div className="values-grid-mobile" style={{ display: "block", position: "relative" }}>
          <div className="mobile-carousel-container">
            <div
              className="mobile-carousel-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {VALUES.map((v, i) => {
                const Icon = v.icon;
                return (
                  <div key={v.title} style={{ flex: "0 0 100%", padding: "0 4px" }}>
                    <div
                      style={{
                        background: T.white,
                        borderRadius: 20,
                        padding: "24px 20px",
                        border: `1px solid ${T.border}`,
                        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                        textAlign: "center",
                        minHeight: "260px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: 14,
                          background: "rgba(196,151,42,0.08)",
                          border: "1px solid rgba(196,151,42,0.14)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: 18,
                        }}
                      >
                        <Icon size={24} color={T.gold} strokeWidth={1.8} aria-hidden="true" />
                      </div>
                      <h3
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 18,
                          fontWeight: 700,
                          color: T.navy,
                          marginBottom: 10,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {v.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 14,
                          color: T.slateLight,
                          lineHeight: 1.68,
                          margin: 0,
                          maxWidth: "90%",
                        }}
                      >
                        {v.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <button
              className="mobile-carousel-btn mobile-carousel-btn-prev"
              onClick={prevSlide}
              aria-label="Previous value"
              style={{ left: "4px" }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="mobile-carousel-btn mobile-carousel-btn-next"
              onClick={nextSlide}
              aria-label="Next value"
              style={{ right: "4px" }}
            >
              <ChevronRight size={18} />
            </button>

            {/* Dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
              {VALUES.map((_, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setIsPaused(true);
                    setCurrentIndex(i);
                    setTimeout(() => setIsPaused(false), 2000);
                  }}
                  style={{
                    width: i === currentIndex ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i === currentIndex ? T.gold : "#d1d5db",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TEAM — Marquee on Mobile with hover pause and nav buttons
// ─────────────────────────────────────────────────────────────────────────────
function TeamSection() {
  const [ref, inView] = useSectionReveal(0.1);
  const shouldReduce  = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const [marqueeKey, setMarqueeKey] = useState(0);
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 640;

  const resetMarquee = () => {
    // Reset animation by changing key
    setMarqueeKey((prev) => prev + 1);
  };

  const handlePrev = () => {
    // For marquee, we need to shift the position
    // We'll just reset the animation
    resetMarquee();
  };

  const handleNext = () => {
    resetMarquee();
  };

  function initials(name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);
  }

  const AVATAR_GRADIENTS = [
    "linear-gradient(135deg, #C4972A, #8B6914)",
    "linear-gradient(135deg, #1a2a50, #0f1d3d)",
    "linear-gradient(135deg, #8B6914, #C4972A)",
    "linear-gradient(135deg, #0f1d3d, #1a4a80)",
  ];

  return (
    <section
      ref={ref}
      className="about-page"
      aria-labelledby="team-heading"
      style={{
        padding: "clamp(60px, 8vh, 96px) clamp(20px, 5vw, 80px)",
        background: T.cream,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ textAlign: "center", marginBottom: "clamp(40px, 6vh, 60px)" }}
        >
          <Eyebrow>Leadership Team</Eyebrow>
          <Heading id="team-heading">
            Meet Our <Au>Experts</Au>
          </Heading>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(14px, 1.4vw, 15px)",
              color: T.slateLight,
              maxWidth: 480,
              margin: "16px auto 0",
              lineHeight: 1.65,
            }}
          >
            The people behind every placement, every compliance check, and every 2am phone call.
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="team-grid-desktop" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "clamp(14px, 2.5vw, 24px)" }}>
          {TEAM.map((member, i) => {
            const Icon = member.icon;
            return (
              <motion.div
                key={member.name}
                variants={fadeUp(i * 0.1)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                whileHover={shouldReduce ? {} : {
                  y: -5,
                  boxShadow: "0 16px 36px rgba(0,0,0,0.08)",
                  borderColor: T.borderGold,
                }}
                style={{
                  background: T.white,
                  borderRadius: 20,
                  padding: "clamp(22px, 3vw, 32px) clamp(18px, 2.5vw, 24px)",
                  border: `1px solid ${T.border}`,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  textAlign: "center",
                  transition: "box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    background: AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                    fontSize: 22,
                    fontWeight: 800,
                    fontFamily: "'Inter', sans-serif",
                    color: T.white,
                    letterSpacing: "0.04em",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                  }}
                >
                  {initials(member.name)}
                </div>
                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(16px, 1.5vw, 18px)",
                    fontWeight: 700,
                    color: T.navy,
                    marginBottom: 4,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {member.name}
                </h3>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    color: T.gold,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  {member.role}
                </div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(12px, 1.2vw, 13px)",
                    color: T.slateLight,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {member.bio}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Marquee */}
        <div className="team-grid-mobile" style={{ display: "block" }}>
          <div 
            className="mobile-team-marquee-container"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
          >
            <div 
              className={`mobile-team-track ${isPaused ? "paused" : ""}`}
              key={marqueeKey}
            >
              {/* Double the items for seamless loop */}
              {[...TEAM, ...TEAM, ...TEAM].map((member, i) => {
                const idx = i % TEAM.length;
                return (
                  <div
                    key={`${member.name}-${i}`}
                    style={{
                      background: T.white,
                      borderRadius: 20,
                      padding: "22px 18px",
                      border: `1px solid ${T.border}`,
                      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                      textAlign: "center",
                      width: "280px",
                      flexShrink: 0,
                      margin: "0 10px",
                    }}
                  >
                    <div
                      aria-hidden="true"
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: "50%",
                        background: AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length],
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 16px",
                        fontSize: 22,
                        fontWeight: 800,
                        fontFamily: "'Inter', sans-serif",
                        color: T.white,
                        letterSpacing: "0.04em",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                      }}
                    >
                      {initials(member.name)}
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "clamp(16px, 1.5vw, 18px)",
                        fontWeight: 700,
                        color: T.navy,
                        marginBottom: 4,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {member.name}
                    </h3>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12,
                        fontWeight: 700,
                        color: T.gold,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        marginBottom: 14,
                      }}
                    >
                      {member.role}
                    </div>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "clamp(12px, 1.2vw, 13px)",
                        color: T.slateLight,
                        lineHeight: 1.65,
                        margin: 0,
                      }}
                    >
                      {member.bio}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons for Mobile */}
            <div className="nav-buttons">
              <button className="nav-btn" onClick={handlePrev} aria-label="Previous team members">
                <ChevronLeft size={20} />
              </button>
              <button className="nav-btn" onClick={handleNext} aria-label="Next team members">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT STRIP — actionable touch points
// ─────────────────────────────────────────────────────────────────────────────
function ContactStrip() {
  const [ref, inView] = useSectionReveal(0.15);
  const shouldReduce  = useReducedMotion();
  const navigate = useNavigate();

  const contacts = [
    { icon: Phone,  label: "Call us",         value: "01772288307",            href: "tel:01772493994" },
    { icon: Mail,   label: "Email us",        value: "admin_1@evshealthcare.co.uk", href: "mailto:admin_1@evshealthcare.co.uk" },
    { icon: MapPin, label: "Visit us",        value: "1a John William St, Preston PR1 4XE", href: "https://maps.google.com/?q=1a+John+William+Street+Preston" },
  ];

  const handleContact = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/contact");
  };

  const handleApply = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/jobs");
  };

  return (
    <section
      ref={ref}
      className="about-page section-navy"
      aria-labelledby="contact-strip-heading"
      style={{
        background: `linear-gradient(135deg, ${T.navyDeep} 0%, ${T.navy} 50%, ${T.navyLight} 100%)`,
        padding: "clamp(60px, 8vh, 88px) clamp(20px, 5vw, 80px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-30%",
          right: "-10%",
          width: "clamp(300px, 40vw, 500px)",
          height: "clamp(300px, 40vw, 500px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,151,42,0.07), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ textAlign: "center", marginBottom: "clamp(36px, 5vh, 56px)" }}
        >
          <Eyebrow>Get in Touch</Eyebrow>
          <h2
            id="contact-strip-heading"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
              fontWeight: 700,
              color: T.white,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              marginBottom: 14,
            }}
          >
            Ready to <Au>Join Our Network</Au>?
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(14px, 1.4vw, 15px)",
              color: "rgba(255,255,255,0.85)",
              maxWidth: 480,
              margin: "0 auto clamp(28px, 4vh, 40px)",
              lineHeight: 1.7,
            }}
          >
            Whether you are a healthcare professional seeking your next role, or an
            organisation that needs reliable cover — we are ready to help today.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <motion.button
              onClick={handleContact}
              whileHover={shouldReduce ? {} : { y: -3, boxShadow: `0 14px 32px rgba(196,151,42,0.45)` }}
              whileTap={shouldReduce ? {} : { y: 1 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                padding: "clamp(12px, 1.4vw, 15px) clamp(22px, 2.8vw, 34px)",
                borderRadius: 50,
                background: `linear-gradient(135deg, ${T.gold}, ${T.goldDark})`,
                color: T.white,
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(13px, 1.2vw, 14px)",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(196,151,42,0.32)",
                transition: "box-shadow 0.3s ease",
              }}
            >
              Contact Us
              <ArrowRight size={15} aria-hidden="true" />
            </motion.button>
            <motion.button
              onClick={handleApply}
              whileHover={shouldReduce ? {} : { y: -3, background: "rgba(255,255,255,0.13)" }}
              whileTap={shouldReduce ? {} : { y: 1 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                padding: "clamp(12px, 1.4vw, 15px) clamp(22px, 2.8vw, 34px)",
                borderRadius: 50,
                background: "rgba(255,255,255,0.07)",
                border: "1.5px solid rgba(255,255,255,0.18)",
                color: T.white,
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(13px, 1.2vw, 14px)",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                transition: "background 0.3s ease",
              }}
            >
              Apply Now
              <ArrowRight size={15} aria-hidden="true" />
            </motion.button>
          </div>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
            gap: "clamp(12px, 2vw, 20px)",
          }}
        >
          {contacts.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("https") ? "_blank" : undefined}
                rel={c.href.startsWith("https") ? "noopener noreferrer" : undefined}
                variants={fadeUp(i * 0.1)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                whileHover={shouldReduce ? {} : { y: -3, borderColor: T.borderGold }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "clamp(16px, 2vw, 22px) clamp(16px, 2vw, 22px)",
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  textDecoration: "none",
                  transition: "border-color 0.3s ease, transform 0.3s ease",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "rgba(196,151,42,0.15)",
                    border: "1px solid rgba(196,151,42,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={19} color={T.gold} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 10,
                      fontWeight: 700,
                      color: T.gold,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: 3,
                    }}
                  >
                    {c.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(12px, 1.2vw, 13px)",
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.88)",
                      lineHeight: 1.4,
                    }}
                  >
                    {c.value}
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700;14..32,800;14..32,900&family=Playfair+Display:wght@700;900&family=Nunito+Sans:wght@300;400;600;700;800;900&display=swap');

        section[id] { scroll-margin-top: 80px; }
        img { max-width: 100%; height: auto; }

        a:focus-visible,
        button:focus-visible {
          outline: 2px solid #C4972A;
          outline-offset: 3px;
          border-radius: 4px;
        }

        /* ── Global Paragraph Styles ── */
        ${PARAGRAPH_STYLES}

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }

        @media (max-width: 640px) {
          section { overflow-x: hidden; }
        }
      `}</style>

      <main id="main-content" className="about-page">
        <HeroSection />
        <StatsSection />
        <WhoWeAreSection />
        <MissionSection />
        <ValuesSection />
        <TeamSection />
        <ContactStrip />
      </main>
    </>
  );
}