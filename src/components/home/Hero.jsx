import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Briefcase, 
  Building2, 
  Star, 
  ArrowRight, 
  Eye,
  Sparkles,
  ChevronRight,
  Users,
  Clock,
  CheckCircle,
  Zap,
  Stethoscope,
  Heart,
  TrendingUp,
  Award,
  GraduationCap,
  Handshake,
  Hospital,
  ClipboardList,
  UserRound,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// EVS Healthcare Hero — Professional Clean Design
// FIXES:
//   - Curtain animation works perfectly on mobile devices
//   - Mobile-optimized curtain widths
//   - Proper transform handling
//   - Reduced animation duration for mobile
//   - Touch-friendly curtain reveal
//   - Video background on desktop ONLY, static image on mobile for performance
// ─────────────────────────────────────────────────────────────────────────────

const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
};

const getParticles = () => {
  const mobile = isMobile();
  const count = mobile ? 6 : 22;
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.round(Math.random() * 100 * 10) / 10,
    y: Math.round(Math.random() * 100 * 10) / 10,
    size: i % 4 === 0 ? 2 : i % 3 === 0 ? 1.5 : 1,
    dur: 3 + (i % 5) * 0.7,
    delay: (i % 7) * 0.4,
    type: i % 5 === 0 ? "cross" : "dot",
  }));
};

const PARTICLES = getParticles();

const TESTIMONIALS = [
  { emoji: "👨‍⚕️", quote: "Professional, fast and genuinely caring team.", name: "James T.", role: "Mental Health Nurse", rating: 5 },
  { emoji: "👩‍⚕️", quote: "EVS found me a placement within 5 days. The team was incredibly supportive.", name: "Sarah M.", role: "Registered Nurse", rating: 5 },
  { emoji: "👩‍⚕️", quote: "Weekly pay and great shifts, couldn't ask for more.", name: "Amara O.", role: "Healthcare Assistant", rating: 5 },
  { emoji: "👨‍⚕️", quote: "Placed into my ideal NHS trust within a week.", name: "David K.", role: "Senior Care Worker", rating: 5 },
];

const JOBS = [
  { title: "Registered Nurse (RGN)", pay: "£26–£38/hr", urgent: true, icon: Stethoscope },
  { title: "Mental Health Nurse (RMN)", pay: "£30–£40/hr", urgent: false, icon: Heart },
];

const LEFT_CURTAIN_ICONS = [UserRound, Handshake, GraduationCap];
const RIGHT_CURTAIN_ICONS = [Hospital, Stethoscope, ClipboardList];

function TestimonialCarousel({ contentVisible }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const displayDuration = isMobile() ? 5000 : 4000;
  const transitionDuration = isMobile() ? 500 : 700;

  useEffect(() => {
    if (isPaused || !contentVisible) return;
    const startCycle = () => {
      intervalRef.current = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
          setIsTransitioning(false);
        }, transitionDuration);
      }, displayDuration + transitionDuration);
    };
    startCycle();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPaused, contentVisible]);

  const t = TESTIMONIALS[currentIndex];
  if (isMobile()) return null;

  return (
    <div
      className="evs-testimonial-stack"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        position: "absolute",
        bottom: 100,
        left: 24,
        zIndex: 10,
        pointerEvents: "auto",
        opacity: contentVisible ? 1 : 0,
        transform: contentVisible ? "translateX(0)" : "translateX(-36px)",
        transition: "opacity 0.85s cubic-bezier(0.22,1,0.36,1) 1.0s, transform 0.85s cubic-bezier(0.22,1,0.36,1) 1.0s",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          background: "rgba(15,29,61,0.85)",
          border: "1px solid rgba(196,151,42,0.25)",
          borderRadius: 16,
          padding: "12px 18px",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          minWidth: 260,
          maxWidth: 340,
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? "translateX(-40px)" : "translateX(0)",
          transition: `opacity ${transitionDuration}ms cubic-bezier(0.4,0,0.2,1), transform ${transitionDuration}ms cubic-bezier(0.4,0,0.2,1)`,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #C4972A, #8B6914)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          {t.emoji}
        </div>
        <div style={{ textAlign: "left", flex: 1 }}>
          <div style={{ display: "flex", gap: 2, marginBottom: 3 }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={10} fill="#f0c060" stroke="#f0c060" style={{ color: "#f0c060" }} />
            ))}
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.9)", fontStyle: "italic", lineHeight: 1.4 }}>
            "{t.quote}"
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 4, fontWeight: 600 }}>
            {t.name} · {t.role}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 10, justifyContent: "center" }}>
        {TESTIMONIALS.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === currentIndex ? 16 : 6,
              height: 6,
              borderRadius: 3,
              background: i === currentIndex ? "#C4972A" : "rgba(255,255,255,0.25)",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function RoleSwitcher({ activeRole, onRoleChange }) {
  const mobile = isMobile();
  return (
    <div
      style={{
        display: "inline-flex",
        background: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(12px)",
        borderRadius: 999,
        padding: "4px",
        border: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      {[
        { key: "jobseeker", label: "Job Seeker", Icon: Briefcase },
        { key: "employer",  label: "Employer",   Icon: Building2 },
      ].map(({ key, label, Icon }) => (
        <button
          key={key}
          onClick={() => onRoleChange(key)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: mobile ? "8px 20px" : "10px 28px",
            borderRadius: 999,
            background: activeRole === key ? "#C4972A" : "transparent",
            color: activeRole === key ? "#0f1d3d" : "rgba(255,255,255,0.95)",
            border: "none",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: mobile ? 13 : 14,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          <Icon size={14} />
          {label}
        </button>
      ))}
    </div>
  );
}

export default function Hero() {
  const [phase, setPhase] = useState("split");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [activeRole, setActiveRole] = useState("jobseeker");
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const mobile = useMemo(() => isMobile(), []);
  const navigate = useNavigate();

  useEffect(() => {
    const openDelay = mobile ? 300 : 800;
    const doneDelay = mobile ? 1000 : 2200;
    const t1 = setTimeout(() => setPhase("open"), openDelay);
    const t2 = setTimeout(() => setPhase("done"), doneDelay);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [mobile]);

  // Only attempt to play video on desktop (non-mobile)
  useEffect(() => {
    if (!mobile && phase !== "split" && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [phase, mobile]);

  useEffect(() => {
    if (mobile) return;
    if (phase !== "done") return;
    const el = heroRef.current;
    if (!el) return;
    const handler = (e) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - left) / width - 0.5) * 2,
        y: ((e.clientY - top) / height - 0.5) * 2,
      });
    };
    el.addEventListener("mousemove", handler);
    return () => el.removeEventListener("mousemove", handler);
  }, [phase, mobile]);

  const panelOpen = phase === "open" || phase === "done";
  const contentVisible = phase === "open" || phase === "done";
  
  const CURTAIN_DURATION = mobile ? "0.5s" : "1.2s";
  const CURTAIN_EASING = "cubic-bezier(0.76, 0, 0.24, 1)";
  const CURTAIN_TRANSITION = `transform ${CURTAIN_DURATION} ${CURTAIN_EASING}`;

  // ── SCROLL TO FEATURED JOBS SECTION (at the bottom of the page) ──
  const scrollToFeaturedJobs = () => {
    // Try to find the jobs section by ID first
    const jobsSection = document.getElementById("featured-jobs");
    if (jobsSection) {
      const top = jobsSection.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top, behavior: "smooth" });
      return;
    }
    
    // Fallback: try to find by class name
    const jobsElement = document.querySelector(".jobs-grid, .jobs-section, #jobs");
    if (jobsElement) {
      const top = jobsElement.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top, behavior: "smooth" });
      return;
    }
    
    // Last resort: scroll to bottom of page
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };

  // ── NAVIGATE TO JOBS PAGE ──
  const navigateToJobs = () => {
    navigate("/jobs");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── UPDATED: "Find Your Role" → Scroll to featured jobs at bottom ──
  const handlePrimaryCTA = () => {
    if (activeRole === "jobseeker") {
      // Job Seeker: Scroll to featured jobs section at the bottom
      scrollToFeaturedJobs();
    } else {
      // Employer: Navigate to Employers.jsx page
      navigate("/employers");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ── UPDATED: "View Open Roles" → Navigate to Jobs.jsx page ──
  const handleSecondaryCTA = () => {
    if (activeRole === "jobseeker") {
      // Job Seeker: Navigate to Jobs.jsx page
      navigateToJobs();
    } else {
      // Employer: Navigate to Employers.jsx then scroll to "How It Works" section
      navigate("/employers");
      setTimeout(() => {
        const el = document.getElementById("employer-services");
        if (el) {
          const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 400);
    }
  };

  const enter = (delay = "0s") => ({
    opacity: contentVisible ? 1 : 0,
    transform: contentVisible ? "none" : "translateY(22px)",
    transition: `opacity ${mobile ? 0.5 : 0.85}s cubic-bezier(0.22,1,0.36,1) ${delay},
                 transform ${mobile ? 0.5 : 0.85}s cubic-bezier(0.22,1,0.36,1) ${delay}`,
  });

  const primaryCTAText = activeRole === "jobseeker" ? "Find Your Role" : "Request Staff";
  const secondaryCTAText = activeRole === "jobseeker" ? "View Open Roles" : "How We Work";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Manrope:wght@400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; width: 100%; }

        @keyframes evsEdgeGlow {
          0%,100% { box-shadow: 0 0 14px 4px rgba(196,151,42,0.35); }
          50%     { box-shadow: 0 0 32px 10px rgba(255,210,70,0.70); }
        }
        @keyframes evsEdgePulseBar {
          0%,100% { opacity: 0.75; }
          50%     { opacity: 1; filter: brightness(1.5); }
        }
        .evs-edge-pulse { animation: evsEdgeGlow 1.4s ease-in-out infinite, evsEdgePulseBar 1.4s ease-in-out infinite; }

        @keyframes evsKenL {
          from { background-position: 80% center; }
          to   { background-position: 65% center; }
        }
        @keyframes evsKenR {
          from { background-position: 65% center; }
          to   { background-position: 30% center; }
        }
        @keyframes evsFloat {
          0%,100% { transform: translateY(0) scale(1); opacity: 0.55; }
          50%     { transform: translateY(-12px) scale(1.1); opacity: 0.8; }
        }
        @keyframes evsShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes evsRaySweep {
          0%   { opacity:0; transform: rotate(-15deg) translateX(-120%); }
          30%  { opacity:0.18; }
          100% { opacity:0; transform: rotate(-15deg) translateX(220%); }
        }

        .curtain-panel {
          position: absolute;
          top: 0;
          width: 50%;
          height: 100%;
          z-index: 20;
          overflow: hidden;
          will-change: transform;
        }
        .curtain-left {
          left: 0;
        }
        .curtain-right {
          right: 0;
        }

        /* Mobile static background image (replaces video on phones) */
        .mobile-bg-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('https://res.cloudinary.com/dbqdgvvgq/image/upload/v1780786625/mathekame-hospital-5765027_1920_tklbds.jpg');
          background-size: cover;
          background-position: center;
          z-index: 1;
        }

        @media (max-width: 1200px) {
          .evs-float-card { display: none !important; }
        }
        @media (max-width: 768px) {
          .evs-testimonial-stack { display: none !important; }
          .evs-curtain-label { font-size: 10px !important; }
          .evs-edge-pulse { animation: none !important; }
        }
        @media (max-width: 480px) {
          .evs-curtain-label { display: none !important; }
        }

        .evs-trust-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        @media (max-width: 420px) {
          .evs-trust-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px 16px;
            text-align: left;
            justify-items: start;
          }
        }

        @media (prefers-reduced-motion:reduce) {
          *, *::before, *::after {
            animation-duration:0.01ms !important;
            transition-duration:0.01ms !important;
          }
        }
      `}</style>

      <section
        id="home"
        ref={heroRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          minHeight: mobile ? 600 : 640,
          overflow: "hidden",
          background: "#0f1d3d",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {/* Mobile: Static image background instead of video */}
        {mobile ? (
          <div className="mobile-bg-image" />
        ) : (
          /* Desktop: Video background */
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            aria-hidden="true"
            poster="https://res.cloudinary.com/dbqdgvvgq/image/upload/v1780786463/mathekame-hospital-5765027_1920_ojwyi1.jpg"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              zIndex: 1,
              display: "block",
              transform: (phase === "done")
                ? `scale(1.04) translate(${mouse.x * -4}px, ${mouse.y * -3}px)`
                : "scale(1.04)",
              transition: (phase === "done") ? "transform 0.18s ease-out" : "none",
              opacity: panelOpen ? 1 : 0,
              willChange: "transform",
              filter: "brightness(1.1) contrast(1.05) saturate(1.1)",
            }}
          >
            <source
              src="https://res.cloudinary.com/dbqdgvvgq/video/upload/v1780785467/148756-794599376_medium_hpciyw.mp4"
              type="video/mp4"
            />
          </video>
        )}

        {/* Dark overlay - slightly lighter on mobile for better visibility */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            background: mobile
              ? "linear-gradient(170deg, rgba(15,29,61,0.65) 0%, rgba(15,29,61,0.45) 55%, rgba(15,29,61,0.6) 100%)"
              : "linear-gradient(170deg, rgba(15,29,61,0.5) 0%, rgba(15,29,61,0.3) 55%, rgba(15,29,61,0.55) 100%)",
            opacity: panelOpen ? 1 : 0,
            transition: "opacity 1.8s ease 0.2s",
            pointerEvents: "none",
          }}
        />

        {/* Light ray sweep - desktop only */}
        {contentVisible && !mobile && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-20%",
              left: "-10%",
              width: "60%",
              height: "140%",
              background: "linear-gradient(90deg, transparent 0%, rgba(196,151,42,0.06) 50%, transparent 100%)",
              zIndex: 3,
              animation: "evsRaySweep 3s ease-out 0.5s 1 forwards",
              pointerEvents: "none",
            }}
          />
        )}

        {/* Floating particles - reduced on mobile */}
        {contentVisible && PARTICLES.map((p) =>
          p.type === "cross" ? (
            <div
              key={p.id}
              aria-hidden="true"
              style={{
                position: "absolute",
                left: `${p.x}%`,
                top: `${p.y}%`,
                zIndex: 5,
                pointerEvents: "none",
                opacity: mobile ? 0.2 : 0,
                animation: mobile ? "none" : `evsFloat ${p.dur}s ease-in-out ${p.delay}s infinite`,
              }}
            >
              <svg width="6" height="6" viewBox="0 0 10 10" fill="none">
                <rect x="4" y="0" width="2" height="10" rx="1" fill="rgba(196,151,42,0.35)" />
                <rect x="0" y="4" width="10" height="2" rx="1" fill="rgba(196,151,42,0.35)" />
              </svg>
            </div>
          ) : (
            <div
              key={p.id}
              aria-hidden="true"
              style={{
                position: "absolute",
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                borderRadius: "50%",
                background: "rgba(196,151,42,0.35)",
                zIndex: 5,
                pointerEvents: "none",
                opacity: mobile ? 0.15 : 0,
                animation: mobile ? "none" : `evsFloat ${p.dur}s ease-in-out ${p.delay}s infinite`,
              }}
            />
          )
        )}

        {/* LEFT CURTAIN */}
        <div
          className="curtain-panel curtain-left"
          style={{
            transform: panelOpen ? "translateX(-100%)" : "translateX(0)",
            transition: CURTAIN_TRANSITION,
          }}
        >
          <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "linear-gradient(to right, rgba(5,14,48,0.96) 0%, rgba(10,30,80,0.88) 100%)" }} />
          <div
            style={{
              position: "absolute",
              top: "-8%", left: "-8%", right: "-8%", bottom: "-8%",
              backgroundImage: "url('https://res.cloudinary.com/dbqdgvvgq/image/upload/v1780786625/mathekame-hospital-5765027_1920_tklbds.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              animation: mobile ? "none" : "evsKenL 24s ease-in-out infinite alternate",
            }}
          />
          <div style={{ position: "absolute", inset: 0, zIndex: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: mobile ? 8 : 16 }}>
            <div style={{ display: "flex", gap: mobile ? 10 : 16, marginBottom: mobile ? 0 : 4 }}>
              {LEFT_CURTAIN_ICONS.map((Icon, i) => (
                <div
                  key={i}
                  style={{
                    width: mobile ? 28 : 38,
                    height: mobile ? 28 : 38,
                    borderRadius: "50%",
                    background: "rgba(196,151,42,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0.9,
                  }}
                >
                  <Icon size={mobile ? 14 : 18} style={{ color: "#C4972A" }} strokeWidth={1.6} />
                </div>
              ))}
            </div>
            <div className="evs-curtain-label" style={{ fontFamily: "'Inter', sans-serif", fontSize: mobile ? 10 : 13, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(196,151,42,0.85)", marginBottom: mobile ? 2 : 6 }}>
              Connecting
            </div>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: mobile ? "clamp(1rem, 2.5vw, 1.6rem)" : "clamp(1.4rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", lineHeight: 1.15, textAlign: "center", padding: "0 12px" }}>
              Healthcare<br />Professionals
            </div>
          </div>
          <div
            className="evs-edge-pulse"
            style={{
              position: "absolute", top: 0, right: 0, bottom: 0, width: 3, zIndex: 5,
              background: "linear-gradient(to bottom, transparent, rgba(196,151,42,0.95) 35%, rgba(255,215,70,1) 50%, rgba(196,151,42,0.95) 65%, transparent)",
              animation: mobile ? "none" : undefined,
            }}
          />
        </div>

        {/* RIGHT CURTAIN */}
        <div
          className="curtain-panel curtain-right"
          style={{
            transform: panelOpen ? "translateX(100%)" : "translateX(0)",
            transition: CURTAIN_TRANSITION,
          }}
        >
          <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "linear-gradient(to left, rgba(4,4,14,0.96) 0%, rgba(18,24,52,0.88) 100%)" }} />
          <div
            style={{
              position: "absolute",
              top: "-8%", left: "-8%", right: "-8%", bottom: "-8%",
              backgroundImage: "url('https://res.cloudinary.com/dbqdgvvgq/image/upload/v1780786463/mathekame-hospital-5765027_1920_ojwyi1.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              animation: mobile ? "none" : "evsKenR 28s ease-in-out infinite alternate",
            }}
          />
          <div style={{ position: "absolute", inset: 0, zIndex: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: mobile ? 8 : 16 }}>
            <div style={{ display: "flex", gap: mobile ? 10 : 16, marginBottom: mobile ? 0 : 4 }}>
              {RIGHT_CURTAIN_ICONS.map((Icon, i) => (
                <div
                  key={i}
                  style={{
                    width: mobile ? 28 : 38,
                    height: mobile ? 28 : 38,
                    borderRadius: "50%",
                    background: "rgba(196,151,42,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0.9,
                  }}
                >
                  <Icon size={mobile ? 14 : 18} style={{ color: "#C4972A" }} strokeWidth={1.6} />
                </div>
              ))}
            </div>
            <div className="evs-curtain-label" style={{ fontFamily: "'Inter', sans-serif", fontSize: mobile ? 10 : 13, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(196,151,42,0.85)", marginBottom: mobile ? 2 : 6 }}>
              With
            </div>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: mobile ? "clamp(1rem, 2.5vw, 1.6rem)" : "clamp(1.4rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", lineHeight: 1.15, textAlign: "center", padding: "0 12px" }}>
              Leading<br />Employers
            </div>
          </div>
          <div
            className="evs-edge-pulse"
            style={{
              position: "absolute", top: 0, left: 0, bottom: 0, width: 3, zIndex: 5,
              background: "linear-gradient(to bottom, transparent, rgba(196,151,42,0.95) 35%, rgba(255,215,70,1) 50%, rgba(196,151,42,0.95) 65%, transparent)",
              animation: mobile ? "none" : undefined,
            }}
          />
        </div>

        {/* Centre seam */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", top: 0, bottom: 0, left: "calc(50% - 1px)", width: 2, zIndex: 21,
            background: "linear-gradient(to bottom, transparent, rgba(196,151,42,0.9) 25%, rgba(255,215,80,1) 50%, rgba(196,151,42,0.9) 75%, transparent)",
            boxShadow: "0 0 22px 6px rgba(196,151,42,0.55)",
            opacity: panelOpen ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Centre reveal */}
        {!panelOpen && (
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 22, textAlign: "center", pointerEvents: "none" }}>
            <Sparkles size={24} style={{ color: "#C4972A", margin: "0 auto" }} />
          </div>
        )}

        {/* HERO CONTENT */}
        <div
          style={{
            position: "absolute",
            top: mobile ? "55%" : "58%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            width: "100%",
            maxWidth: 700,
            padding: "0 20px",
          }}
        >
          <div style={{ marginBottom: 24, ...enter(mobile ? "0.2s" : "0.3s") }}>
            <RoleSwitcher activeRole={activeRole} onRoleChange={setActiveRole} />
          </div>

          <h1
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: mobile ? "clamp(1.8rem, 6vw, 3rem)" : "clamp(2.2rem, 5vw, 4.5rem)",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              marginBottom: mobile ? 12 : 18,
              textShadow: "0 2px 20px rgba(4,10,32,0.55), 0 1px 4px rgba(4,10,32,0.4)",
              ...enter(mobile ? "0.35s" : "0.55s"),
            }}
          >
            Find Your Next
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #f5d98a 0%, #C4972A 45%, #f5d98a 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: mobile ? "none" : "evsShimmer 4s linear 1s infinite",
              }}
            >
              Healthcare Career
            </span>
            <br />
            <span
              style={{
                fontSize: "0.75em",
                fontWeight: 800,
                color: "rgba(255,255,255,0.9)",
              }}
            >
              With EVS
            </span>
          </h1>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "rgba(255,255,255,0.85)",
              fontSize: mobile ? "clamp(0.85rem, 3.5vw, 1rem)" : "clamp(1rem, 1.6vw, 1.1rem)",
              fontWeight: 400,
              lineHeight: 1.65,
              maxWidth: 520,
              marginBottom: mobile ? 28 : 36,
              padding: "0 16px",
              ...enter(mobile ? "0.45s" : "0.65s"),
            }}
          >
            Connecting exceptional healthcare professionals with NHS trusts,
            private hospitals, and leading care providers across North-West England.
          </p>

          <div
            style={{
              display: "flex",
              gap: mobile ? 12 : 16,
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: 0,
              ...enter(mobile ? "0.6s" : "0.8s"),
            }}
          >
            {/* ── UPDATED: "Find Your Role" → Scrolls to featured jobs at bottom ── */}
            <button
              onClick={handlePrimaryCTA}
              style={{
                background: "#C4972A",
                color: "#0f1d3d",
                padding: mobile ? "12px 28px" : "14px 36px",
                borderRadius: 999,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: mobile ? 13 : 14,
                letterSpacing: "1px",
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(196,151,42,0.35)",
                transition: "all 0.2s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(196,151,42,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(196,151,42,0.35)";
              }}
            >
              {primaryCTAText} <ArrowRight size={14} />
            </button>

            {/* ── UPDATED: "View Open Roles" → Navigates to Jobs.jsx page ── */}
            <button
              onClick={handleSecondaryCTA}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#fff",
                padding: mobile ? "12px 28px" : "14px 36px",
                borderRadius: 999,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: mobile ? 13 : 14,
                letterSpacing: "0.5px",
                backdropFilter: "blur(12px)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                e.currentTarget.style.borderColor = "rgba(196,151,42,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
              }}
            >
              <Eye size={14} /> {secondaryCTAText}
            </button>
          </div>

          <div
            className="evs-trust-row"
            style={{
              marginTop: 36,
              ...enter(mobile ? "0.7s" : "0.9s"),
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <CheckCircle size={12} style={{ color: "#C4972A" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.6)" }}>NHS Approved</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Users size={12} style={{ color: "#C4972A" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.6)" }}>500+ Workers Placed</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Clock size={12} style={{ color: "#C4972A" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.6)" }}>24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Testimonial Carousel */}
        <TestimonialCarousel contentVisible={contentVisible} />

        {/* Open Positions Widget */}
        <div
          className="evs-float-card"
          style={{
            position: "absolute",
            right: "2%",
            bottom: "12%",
            zIndex: 10,
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 24,
            padding: "16px 18px",
            width: 240,
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.9s ease 1.2s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 1.2s, border-color 0.2s ease, box-shadow 0.2s ease",
            pointerEvents: "auto",
            cursor: "pointer",
          }}
          onClick={navigateToJobs}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(196,151,42,0.45)";
            e.currentTarget.style.boxShadow = "0 8px 32px rgba(196,151,42,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <div style={{ width: 28, height: 28, borderRadius: 10, background: "rgba(196,151,42,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <TrendingUp size={14} style={{ color: "#C4972A" }} />
            </div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#C4972A" }}>
              Open Positions Today
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {JOBS.map((job, i) => {
              const JobIcon = job.icon;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < JOBS.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(196,151,42,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <JobIcon size={14} style={{ color: "#C4972A" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>
                      {job.title}
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#C4972A", fontWeight: 500, marginTop: 2 }}>
                      {job.pay}
                    </div>
                  </div>
                  {job.urgent && (
                    <span style={{ background: "#C4972A", color: "#0f1d3d", fontSize: 8, fontWeight: 800, padding: "3px 8px", borderRadius: 20, letterSpacing: "0.5px", whiteSpace: "nowrap" }}>
                      URGENT
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 12, paddingTop: 10, display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: "rgba(255,255,255,0.45)" }}>
              More roles available
            </span>
            <ChevronRight size={12} style={{ color: "#C4972A", opacity: 0.8 }} />
          </div>
        </div>
      </section>
    </>
  );
}