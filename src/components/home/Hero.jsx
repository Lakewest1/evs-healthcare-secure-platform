import { useState, useEffect, useRef, useMemo } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// EVS Healthcare Hero — Optimized for Mobile Performance
// Features: Reduced particles on mobile, disabled parallax, simplified animations
// ─────────────────────────────────────────────────────────────────────────────

// Detect mobile device for performance optimization
const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
};

// Reduce particles on mobile (from 22 to 6)
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
  { emoji: "👩‍⚕️", quote: "EVS found me a placement within 5 days.", name: "Sarah M.", role: "Registered Nurse" },
  { emoji: "👨‍⚕️", quote: "Professional, fast and genuinely caring team.", name: "James T.", role: "Mental Health Nurse" },
  { emoji: "👩‍⚕️", quote: "Weekly pay and great shifts, couldn't ask for more.", name: "Amara O.", role: "Healthcare Assistant" },
  { emoji: "👨‍⚕️", quote: "Placed into my ideal NHS trust within a week.", name: "David K.", role: "Senior Care Worker" },
];

const JOBS = [
  { title: "Registered Nurse (RGN)", pay: "£18–£24/hr", urgent: true },
  { title: "Mental Health Nurse (RMN)", pay: "£22–£30/hr", urgent: false },
];

// ── Testimonial Carousel Component (Optimized) ────────────────────────────────
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

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, contentVisible]);

  const t = TESTIMONIALS[currentIndex];

  // Hide on mobile if needed
  if (isMobile()) return null;

  return (
    <div
      className="evs-testimonial-stack"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        position: "absolute",
        bottom: 118,
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
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 14,
          padding: "10px 16px",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: "0 4px 18px rgba(0,0,0,0.22)",
          minWidth: 240,
          maxWidth: 320,
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? "translateX(-40px)" : "translateX(0)",
          transition: `opacity ${transitionDuration}ms cubic-bezier(0.4,0,0.2,1), transform ${transitionDuration}ms cubic-bezier(0.4,0,0.2,1)`,
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #C4972A, #8B6914)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
            flexShrink: 0,
          }}
        >
          {t.emoji}
        </div>

        <div style={{ textAlign: "left" }}>
          <div style={{ display: "flex", gap: 1, marginBottom: 2 }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} style={{ color: "#f0c060", fontSize: 10 }}>★</span>
            ))}
          </div>
          <div
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: 11.5,
              color: "rgba(255,255,255,0.88)",
              fontStyle: "italic",
              lineHeight: 1.35,
              maxWidth: 210,
            }}
          >
            "{t.quote}"
          </div>
          <div
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: 10,
              color: "rgba(255,255,255,0.45)",
              marginTop: 3,
              fontWeight: 600,
            }}
          >
            {t.name} · {t.role}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 4, marginTop: 8, justifyContent: "center" }}>
        {TESTIMONIALS.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === currentIndex ? 14 : 5,
              height: 5,
              borderRadius: 3,
              background: i === currentIndex ? "#C4972A" : "rgba(255,255,255,0.2)",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const [phase, setPhase] = useState("split");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const mobile = useMemo(() => isMobile(), []);

  // Faster reveal on mobile
  useEffect(() => {
    const openDelay = mobile ? 400 : 800;
    const doneDelay = mobile ? 1500 : 2200;
    
    const t1 = setTimeout(() => setPhase("open"), openDelay);
    const t2 = setTimeout(() => setPhase("done"), doneDelay);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [mobile]);

  useEffect(() => {
    if (phase !== "split" && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [phase]);

  // Disable parallax on mobile for performance
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
  const CURTAIN = mobile ? "transform 0.8s cubic-bezier(0.76,0,0.24,1)" : "transform 1.2s cubic-bezier(0.76,0,0.24,1)";

  const enter = (delay = "0s") => ({
    opacity: contentVisible ? 1 : 0,
    transform: contentVisible ? "none" : "translateY(22px)",
    transition: `opacity ${mobile ? 0.5 : 0.85}s cubic-bezier(0.22,1,0.36,1) ${delay},
                 transform ${mobile ? 0.5 : 0.85}s cubic-bezier(0.22,1,0.36,1) ${delay}`,
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;800;900&display=swap');

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
          from { background-position: 30% center; }
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

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .evs-float-card { 
            display: none !important; 
          }
          .evs-testimonial-stack { 
            display: none !important; 
          }
          .evs-curtain-label { 
            font-size: 10px !important; 
          }
          .evs-edge-pulse {
            animation: none !important;
          }
        }

        @media (max-width: 480px) {
          .evs-curtain-label { 
            display: none !important; 
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
          background: "#06112b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {/* Video Background - Mobile optimized */}
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          aria-hidden="true"
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
            transform: (!mobile && phase === "done") 
              ? `scale(1.04) translate(${mouse.x * -4}px, ${mouse.y * -3}px)` 
              : "scale(1.04)",
            transition: (!mobile && phase === "done") ? "transform 0.18s ease-out" : "none",
            opacity: panelOpen ? 1 : 0,
            willChange: "transform",
          }}
        >
          <source
            src="https://res.cloudinary.com/dbqdgvvgq/video/upload/v1780785467/148756-794599376_medium_hpciyw.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            background: "linear-gradient(170deg, rgba(4,10,32,0.60) 0%, rgba(4,10,32,0.50) 55%, rgba(4,10,32,0.72) 100%)",
            opacity: panelOpen ? 1 : 0,
            transition: "opacity 1.8s ease 0.2s",
            pointerEvents: "none",
          }}
        />

        {/* Light ray sweep - disabled on mobile */}
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
                opacity: mobile ? 0.3 : 0,
                animation: mobile ? "none" : `evsFloat ${p.dur}s ease-in-out ${p.delay}s infinite`,
              }}
            >
              <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                <rect x="4" y="0" width="2" height="10" rx="1" fill="rgba(196,151,42,0.45)" />
                <rect x="0" y="4" width="10" height="2" rx="1" fill="rgba(196,151,42,0.45)" />
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
                background: "rgba(196,151,42,0.50)",
                zIndex: 5,
                pointerEvents: "none",
                opacity: mobile ? 0.2 : 0,
                animation: mobile ? "none" : `evsFloat ${p.dur}s ease-in-out ${p.delay}s infinite`,
              }}
            />
          )
        )}

        {/* LEFT CURTAIN - Simplified on mobile */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "50%",
            height: "100%",
            zIndex: 20,
            overflow: "hidden",
            transform: panelOpen ? "translateX(-100%)" : "translateX(0)",
            transition: panelOpen ? CURTAIN : "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              background: "linear-gradient(to right, rgba(5,14,48,0.96) 0%, rgba(10,30,80,0.88) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "-8%",
              left: "-8%",
              right: "-8%",
              bottom: "-8%",
              backgroundImage: "url('https://res.cloudinary.com/dbqdgvvgq/image/upload/v1780786625/mathekame-hospital-5765027_1920_tklbds.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              animation: mobile ? "none" : "evsKenL 24s ease-in-out infinite alternate",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: mobile ? 8 : 16,
            }}
          >
            <div style={{ display: "flex", gap: mobile ? 6 : 12, marginBottom: mobile ? 0 : 4 }}>
              {["👩‍⚕️", "🤝", "🎓"].map((ic, i) => (
                <span key={i} style={{ fontSize: mobile ? 18 : 26, opacity: 0.9 }}>{ic}</span>
              ))}
            </div>
            <div
              className="evs-curtain-label"
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: mobile ? 10 : 13,
                fontWeight: 700,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "rgba(196,151,42,0.85)",
                marginBottom: mobile ? 2 : 6,
              }}
            >
              Connecting
            </div>
            <div
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: mobile ? "clamp(1rem, 2.5vw, 1.6rem)" : "clamp(1.4rem, 3vw, 2.2rem)",
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.15,
                textAlign: "center",
                padding: "0 12px",
              }}
            >
              Healthcare<br />Professionals
            </div>
          </div>

          <div
            className="evs-edge-pulse"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: 3,
              zIndex: 5,
              background: "linear-gradient(to bottom, transparent, rgba(196,151,42,0.95) 35%, rgba(255,215,70,1) 50%, rgba(196,151,42,0.95) 65%, transparent)",
              animation: mobile ? "none" : undefined,
            }}
          />
        </div>

        {/* RIGHT CURTAIN - Simplified on mobile */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "50%",
            height: "100%",
            zIndex: 20,
            overflow: "hidden",
            transform: panelOpen ? "translateX(100%)" : "translateX(0)",
            transition: panelOpen ? CURTAIN : "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              background: "linear-gradient(to left, rgba(4,4,14,0.96) 0%, rgba(18,24,52,0.88) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "-8%",
              left: "-8%",
              right: "-8%",
              bottom: "-8%",
              backgroundImage: "url('https://res.cloudinary.com/dbqdgvvgq/image/upload/v1780786463/mathekame-hospital-5765027_1920_ojwyi1.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              animation: mobile ? "none" : "evsKenR 28s ease-in-out infinite alternate",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: mobile ? 8 : 16,
            }}
          >
            <div style={{ display: "flex", gap: mobile ? 6 : 12, marginBottom: mobile ? 0 : 4 }}>
              {["🏥", "⚕️", "📋"].map((ic, i) => (
                <span key={i} style={{ fontSize: mobile ? 18 : 26, opacity: 0.9 }}>{ic}</span>
              ))}
            </div>
            <div
              className="evs-curtain-label"
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: mobile ? 10 : 13,
                fontWeight: 700,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "rgba(196,151,42,0.85)",
                marginBottom: mobile ? 2 : 6,
              }}
            >
              With
            </div>
            <div
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: mobile ? "clamp(1rem, 2.5vw, 1.6rem)" : "clamp(1.4rem, 3vw, 2.2rem)",
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.15,
                textAlign: "center",
                padding: "0 12px",
              }}
            >
              Leading<br />Employers
            </div>
          </div>

          <div
            className="evs-edge-pulse"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: 3,
              zIndex: 5,
              background: "linear-gradient(to bottom, transparent, rgba(196,151,42,0.95) 35%, rgba(255,215,70,1) 50%, rgba(196,151,42,0.95) 65%, transparent)",
              animation: mobile ? "none" : undefined,
            }}
          />
        </div>

        {/* Centre seam */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "calc(50% - 1px)",
            width: 2,
            zIndex: 21,
            background: "linear-gradient(to bottom, transparent, rgba(196,151,42,0.9) 25%, rgba(255,215,80,1) 50%, rgba(196,151,42,0.9) 75%, transparent)",
            boxShadow: "0 0 22px 6px rgba(196,151,42,0.55)",
            opacity: panelOpen ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Centre reveal text */}
        {!panelOpen && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 22,
              textAlign: "center",
              pointerEvents: "none",
              animation: "evsCentreIn 0.5s ease 0.1s both",
            }}
          >
            <div style={{ width: 40, height: 1, background: "rgba(196,151,42,0.6)", margin: "8px auto 0" }} />
          </div>
        )}

        {/* HERO CONTENT - CENTER */}
        <div
          style={{
            position: "absolute",
            top: mobile ? "55%" : "60%",
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
          <h1
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: mobile ? "clamp(1.8rem, 6vw, 3rem)" : "clamp(2.2rem, 5vw, 4.5rem)",
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              marginBottom: mobile ? 12 : 18,
              ...enter(mobile ? "0.3s" : "0.55s"),
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
              HealthCare Career
            </span> 
            <br />
            With EVS
          </h1>

          <p
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              color: "rgba(255,255,255,0.78)",
              fontSize: mobile ? "clamp(0.85rem, 3.5vw, 1rem)" : "clamp(1rem, 1.6vw, 1.16rem)",
              fontWeight: 400,
              lineHeight: 1.72,
              maxWidth: 520,
              marginBottom: mobile ? 24 : 36,
              padding: "0 16px",
              ...enter(mobile ? "0.45s" : "0.7s"),
            }}
          >
            Connecting exceptional healthcare professionals with NHS trusts,
            private hospitals, and leading care providers across North-West England.
          </p>

          <div
            style={{
              display: "flex",
              gap: mobile ? 10 : 14,
              flexWrap: "wrap",
              justifyContent: "center",
              ...enter(mobile ? "0.6s" : "0.84s"),
            }}
          >
            <a
              href="#register"
              style={{
                background: "#C4972A",
                color: "#fff",
                padding: mobile ? "10px 24px" : "14px 38px",
                borderRadius: 999,
                fontFamily: "'Nunito Sans', sans-serif",
                fontWeight: 800,
                fontSize: mobile ? 11 : 13,
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                textDecoration: "none",
                boxShadow: "0 8px 26px rgba(196,151,42,0.45)",
                transition: "all 0.2s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              Apply Now →
            </a>
            <a
              href="#jobs"
              style={{
                background: "rgba(255,255,255,0.11)",
                border: "1.5px solid rgba(255,255,255,0.50)",
                color: "#fff",
                padding: mobile ? "10px 24px" : "14px 38px",
                borderRadius: 999,
                fontFamily: "'Nunito Sans', sans-serif",
                fontWeight: 700,
                fontSize: mobile ? 11 : 13,
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                textDecoration: "none",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                transition: "all 0.2s ease",
              }}
            >
              View Open Roles
            </a>
          </div>
        </div>

        <TestimonialCarousel contentVisible={contentVisible} />

        {/* Floating Open Positions - Hidden on mobile */}
        <div
          className="evs-float-card"
          style={{
            position: "absolute",
            right: "3%",
            top: "70%",
            transform: contentVisible ? "translateY(-50%)" : "translateY(-50%) translateX(22px)",
            zIndex: 10,
            background: "rgba(255,255,255,0.10)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: 20,
            padding: "20px 22px",
            minWidth: 220,
            boxShadow: "0 12px 40px rgba(0,0,0,0.30)",
            opacity: contentVisible ? 1 : 0,
            transition: "opacity 0.9s ease 1.0s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 1.0s",
          }}
        >
          <div style={{
            fontFamily: "'Nunito Sans', sans-serif",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
            marginBottom: 1,
          }}>
            Open Positions Today
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {JOBS.map((job, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.07)",
                borderRadius: 10,
                padding: "9px 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
              }}>
                <div>
                  <div style={{
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#fff",
                    lineHeight: 1.3,
                  }}>
                    {job.title}
                  </div>
                  <div style={{
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: 11,
                    color: "#C4972A",
                    fontWeight: 600,
                    marginTop: 2,
                  }}>
                    {job.pay}
                  </div>
                </div>
                {job.urgent && (
                  <div style={{
                    background: "#ef4444",
                    borderRadius: 4,
                    padding: "2px 7px",
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: 9,
                    fontWeight: 800,
                    color: "#fff",
                    letterSpacing: "0.5px",
                    flexShrink: 0,
                  }}>
                    URGENT
                  </div>
                )}
              </div>
            ))}
          </div>

          <a href="#register" style={{
            display: "block",
            textAlign: "center",
            marginTop: 14,
            background: "linear-gradient(135deg, #C4972A, #8B6914)",
            color: "#fff",
            padding: "9px 16px",
            borderRadius: 10,
            fontFamily: "'Nunito Sans', sans-serif",
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "1px",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}>
            Apply in 60 seconds →
          </a>
        </div>
      </section>
    </>
  );
}