import { useRef, useEffect, useState, useCallback, memo } from "react";
import { Stethoscope, Building2, Star, Phone } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// EVS Healthcare — Stats Section (Mobile Optimized)
//
// Animation: Cards slide in alternating left ↔ right, one after another,
// driven by the existing useSequentialReveal stagger hook.
//   - Even index (0, 2): slide in from LEFT  → translateX(-80px → 0)
//   - Odd  index (1, 3): slide in from RIGHT → translateX(+80px → 0)
//   - Mobile: opacity fade only (no directional shift) for performance
// ─────────────────────────────────────────────────────────────────────────────

const isMobile = () => {
  if (typeof window === "undefined") return false;
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768
  );
};

const mobile = isMobile();

// ── How far cards travel before snapping into place ──────────────────────────
// Increase this value for a more dramatic sweep; decrease for subtlety.
const SLIDE_DISTANCE = 80; // px

// ── Hook: IntersectionObserver, fires once ────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ── Hook: Sequential card reveal ─────────────────────────────────────────────
// Returns the number of cards that should currently be visible.
// Cards are revealed one after the other with `interval` ms between each.
function useSequentialReveal(enabled, total, interval = 600) {
  const [revealed, setRevealed] = useState(0);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    let current = 0;

    timeoutRef.current = setTimeout(() => {
      current = 1;
      setRevealed(1);

      intervalRef.current = setInterval(() => {
        current++;
        setRevealed(current);
        if (current >= total) clearInterval(intervalRef.current);
      }, interval);
    }, 300);

    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, [enabled, total, interval]);

  return revealed;
}

// ── Hook: rAF-based counter with easeOutExpo ─────────────────────────────────
function useCounter(target, duration = 2200, enabled = false) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const rafRef = useRef(null);
  const started = useRef(false);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const animDuration = mobile ? duration * 0.7 : duration;

  useEffect(() => {
    if (!enabled || started.current) return;
    started.current = true;

    if (prefersReduced || mobile) {
      setCount(target);
      setDone(true);
      return;
    }

    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / animDuration, 1);
      const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setCount(Math.round(e * target));
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [enabled, target, animDuration, prefersReduced]);

  return { count, done };
}

// ── Hook: rAF-throttled scroll parallax (disabled on mobile) ─────────────────
function useScrollParallax(speed = 0.3) {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (mobile) return;

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          const scrolled = window.innerHeight - rect.top;
          setOffset(scrolled * speed);
        }
        rafRef.current = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speed]);

  return [sectionRef, offset];
}

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────
const STATS = [
  {
    value: 500,
    suffix: "+",
    label: "Healthcare Workers Placed",
    icon: Stethoscope,
    desc: "Across NHS & private sector",
  },
  {
    value: 150,
    suffix: "+",
    label: "Partner Care Homes",
    icon: Building2,
    desc: "UK-wide trusted network",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Satisfaction Rate",
    icon: Star,
    desc: "Verified post-placement survey",
  },
  {
    value: 24,
    suffix: "/7",
    label: "Support Available",
    icon: Phone,
    desc: "Always here when you need us",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// StatCard
//
// NEW PROP: `fromLeft` (boolean)
//   true  → hidden state is translateX(-SLIDE_DISTANCE px)  [cards 0, 2]
//   false → hidden state is translateX(+SLIDE_DISTANCE px)  [cards 1, 3]
//
// On mobile: no directional transform — opacity fade only (performance).
// ─────────────────────────────────────────────────────────────────────────────
function StatCard({ stat, isVisible, index, fromLeft }) {
  const { count, done } = useCounter(stat.value, 2200, isVisible);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  const StatIcon = stat.icon;

  const iconSize     = mobile ? 22 : 28;
  const iconBoxSize  = mobile ? "clamp(44px, 8vw, 54px)" : "clamp(50px, 7vw, 64px)";
  const fontSize     = mobile ? "clamp(1.5rem, 4vw, 2.2rem)" : "clamp(1.9rem, 3.5vw, 3.4rem)";
  const padding      = mobile
    ? "clamp(20px, 4vw, 32px) clamp(14px, 3vw, 24px) clamp(18px, 3vw, 28px)"
    : "clamp(28px, 4vw, 44px) clamp(20px, 3vw, 32px) clamp(24px, 3vw, 38px)";

  const handleMouseEnter = () => !mobile && setHovered(true);
  const handleMouseLeave = () => !mobile && setHovered(false);
  const handleMouseMove = useCallback((e) => {
    if (mobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
    const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
    cardRef.current.style.setProperty("--tilt-x", `${x}%`);
    cardRef.current.style.setProperty("--tilt-y", `${y}%`);
  }, []);

  const iconTransform = !isVisible
    ? "scale(0.5) rotate(-10deg)"
    : hovered && !mobile
      ? "scale(1.08) rotate(2deg)"
      : "scale(1) rotate(0deg)";

  // ── Directional hidden-state transform ──────────────────────────────────
  // Mobile: pure opacity fade (translateX(0) always) — avoids layout thrash.
  // Desktop: slide in from the side that matches fromLeft.
  const hiddenTranslate = mobile
    ? "translateX(0)"
    : fromLeft
      ? `translateX(-${SLIDE_DISTANCE}px)`
      : `translateX(${SLIDE_DISTANCE}px)`;

  // Visible state: always centred. On hover add the lift.
  const visibleTranslate =
    hovered && !mobile ? "translateY(-4px) scale(1.01)" : "translateX(0) scale(1)";

  const cardTransform = isVisible ? visibleTranslate : hiddenTranslate;

  // ── Transition timing ────────────────────────────────────────────────────
  // When isVisible flips to true: use the entrance easing (long, smooth).
  // When hovered (isVisible already true): snap to hover state quickly.
  // Mobile: shorter transition, no spring.
  const cardTransition = mobile
    ? "opacity 0.55s ease, transform 0.55s ease"
    : isVisible && hovered
      ? "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease"
      : `opacity 1.1s cubic-bezier(0.16,1,0.3,1),
         transform 1.1s cubic-bezier(0.16,1,0.3,1),
         border-color 0.3s ease,
         box-shadow 0.3s ease`;

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        "--tilt-x": "50%",
        "--tilt-y": "50%",
        position: "relative",
        background: "#ffffff",
        border: `1px solid ${hovered && !mobile ? "rgba(196,151,42,0.45)" : "rgba(0,0,0,0.06)"}`,
        borderRadius: mobile ? 16 : 20,
        padding,
        boxShadow:
          hovered && !mobile
            ? "0 20px 50px rgba(0,0,0,0.1), 0 4px 15px rgba(196,151,42,0.1)"
            : "0 2px 12px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)",
        textAlign: "center",
        cursor: "default",
        // ── Core animation values ──
        opacity:   isVisible ? 1 : 0,
        transform: cardTransform,
        transition: cardTransition,
        willChange: "opacity, transform",
        overflow: "hidden",
      }}
      aria-label={`${stat.label}: ${stat.value}${stat.suffix}`}
    >
      {/* Gold accent sweep — desktop only */}
      {!mobile && (
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: 3,
            background: "linear-gradient(90deg, #C4972A, #f0c060, #C4972A)",
            borderRadius: "20px 20px 0 0",
            transformOrigin: "left center",
            transform: hovered ? "scaleX(1)" : "scaleX(0)",
            opacity: hovered ? 1 : 0.6,
            transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
          }}
        />
      )}

      {/* Mouse tilt glow — desktop only */}
      {!mobile && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at var(--tilt-x) var(--tilt-y), rgba(196,151,42,0.05), transparent 60%)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s ease",
            pointerEvents: "none",
            borderRadius: 20,
          }}
        />
      )}

      {/* Glass shine — desktop only */}
      {!mobile && (
        <div
          style={{
            position: "absolute",
            top: "50%", left: "-20%",
            width: "60%", height: "120%",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
            transform: "skewX(-15deg) translateY(-50%)",
            animation: `evsGlassShine 12s ease-in-out ${index * 3}s infinite`,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      )}

      {/* Icon */}
      <div
        style={{
          marginBottom: mobile ? "clamp(10px, 2vw, 14px)" : "clamp(14px, 2vw, 18px)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: iconBoxSize,
          height: iconBoxSize,
          borderRadius: "50%",
          background:
            hovered && !mobile
              ? "linear-gradient(135deg, rgba(196,151,42,0.12), rgba(196,151,42,0.06))"
              : "rgba(0,0,0,0.02)",
          border: `1px solid ${hovered && !mobile ? "rgba(196,151,42,0.2)" : "rgba(0,0,0,0.04)"}`,
          color: "#C4972A",
          transform: iconTransform,
          transition: mobile
            ? "opacity 0.4s ease"
            : "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), background 0.3s ease",
          opacity: isVisible ? 1 : 0,
          position: "relative",
          zIndex: 2,
        }}
      >
        <StatIcon size={iconSize} strokeWidth={1.6} aria-hidden="true" />
      </div>

      {/* Counter */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className={done && !mobile ? "evs-counter-glow" : ""}
        style={{
          fontFamily: "'Nunito Sans', sans-serif",
          fontSize,
          fontWeight: 900,
          lineHeight: 1,
          marginBottom: mobile ? "clamp(6px, 1.5vw, 8px)" : "clamp(8px, 1.2vw, 10px)",
          color: "#0f1d3d",
          letterSpacing: "-0.02em",
          position: "relative",
          zIndex: 2,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(10px)",
          transition: isVisible
            ? "opacity 0.6s ease 0.6s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.6s"
            : "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        <span>{count}</span>
        <span style={{ color: "#C4972A" }}>{stat.suffix}</span>
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily: "'Nunito Sans', sans-serif",
          fontSize: mobile ? "clamp(12px, 2.5vw, 13px)" : "clamp(13px, 1.8vw, 15px)",
          fontWeight: 700,
          color: "#1a2540",
          letterSpacing: "0.1px",
          marginBottom: mobile ? "clamp(4px, 1vw, 5px)" : "clamp(5px, 0.8vw, 7px)",
          lineHeight: 1.3,
          position: "relative",
          zIndex: 2,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(8px)",
          transition: isVisible
            ? "opacity 0.6s ease 0.8s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.8s"
            : "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        {stat.label}
      </div>

      {/* Description */}
      <div
        style={{
          fontFamily: "'Nunito Sans', sans-serif",
          fontSize: mobile ? "clamp(10px, 2vw, 11px)" : "clamp(11px, 1.4vw, 12.5px)",
          color: "#6b7a99",
          letterSpacing: "0.1px",
          lineHeight: 1.5,
          fontStyle: "italic",
          position: "relative",
          zIndex: 2,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(6px)",
          transition: isVisible
            ? "opacity 0.6s ease 1.0s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 1.0s"
            : "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        {stat.desc}
      </div>

      {/* Bottom separator */}
      <div
        style={{
          height: mobile ? 1 : 1.5,
          background: "linear-gradient(90deg, transparent, #C4972A, transparent)",
          borderRadius: 999,
          margin: mobile
            ? "clamp(12px, 3vw, 16px) auto 0"
            : "clamp(16px, 2.5vw, 22px) auto 0",
          position: "relative",
          zIndex: 2,
          width: hovered && !mobile ? "55%" : mobile ? "40%" : "28%",
          opacity: isVisible ? (mobile ? 0.4 : 0.55) : 0,
          transform: isVisible ? "scaleX(1)" : "scaleX(0)",
          transition: isVisible
            ? `width 0.4s cubic-bezier(0.16,1,0.3,1),
               opacity 0.5s ease 1.1s,
               transform 0.5s cubic-bezier(0.16,1,0.3,1) 1.1s`
            : "opacity 0.3s ease, transform 0.3s ease",
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Stats Section
// ─────────────────────────────────────────────────────────────────────────────
export default function Stats() {
  const [sectionRef, inView]      = useInView(0.15);
  const [parallaxRef,  dotOffset] = useScrollParallax(0.18);
  const [parallaxRef2, orbOffset] = useScrollParallax(0.09);
  const [lineRevealed, setLineRevealed] = useState(false);

  const setRefs = useCallback((el) => {
    sectionRef.current   = el;
    parallaxRef.current  = el;
    parallaxRef2.current = el;
  }, []);

  // Stagger interval: 600ms desktop, 300ms mobile
  const revealedCount = useSequentialReveal(
    inView,
    STATS.length,
    mobile ? 300 : 600
  );

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setLineRevealed(true), mobile ? 200 : 400);
      return () => clearTimeout(t);
    }
  }, [inView]);

  const gridGap = mobile ? "clamp(10px, 2.5vw, 16px)" : "clamp(14px, 2.5vw, 28px)";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700;800;900&display=swap');

        @keyframes evsCounterGlow {
          0%   { text-shadow: none; }
          35%  { text-shadow: 0 0 22px rgba(196,151,42,0.5), 0 0 44px rgba(196,151,42,0.22); }
          100% { text-shadow: none; }
        }
        .evs-counter-glow {
          animation: evsCounterGlow 1s cubic-bezier(0.22,1,0.36,1) 0.05s 1 forwards;
        }

        @keyframes evsGlassShine {
          0%, 88%  { left: -20%; opacity: 0; }
          89%      { opacity: 0.6; }
          94%      { left: 130%; opacity: 0; }
          100%     { left: 130%; opacity: 0; }
        }

        @keyframes evsStatShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        @keyframes evsSlowPulse {
          0%, 100% { box-shadow: 0 0 6px rgba(196,151,42,0.3); }
          50%      { box-shadow: 0 0 14px rgba(196,151,42,0.5); }
        }

        .evs-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: ${gridGap};
        }
        @media (max-width: 1024px) {
          .evs-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .evs-stats-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
        }

        .evs-stats-section {
          padding: ${
            mobile
              ? "56px 16px 52px"
              : "clamp(72px, 10vh, 112px) clamp(20px, 6vw, 96px) clamp(72px, 9vh, 104px)"
          };
        }

        @media (hover: none) {
          .evs-counter-glow { animation: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <section
        ref={setRefs}
        className="evs-stats-section"
        aria-label="EVS Healthcare key statistics"
        style={{ position: "relative", background: "#ffffff", overflow: "hidden" }}
      >
        {/* Parallax dot grid — desktop only */}
        {!mobile && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute", inset: 0, zIndex: 0,
              backgroundImage:
                "radial-gradient(circle, rgba(15,29,61,0.045) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
              transform: `translateY(${dotOffset * 0.18}px)`,
              pointerEvents: "none",
              willChange: "transform",
            }}
          />
        )}

        {/* Decorative orbs — desktop only */}
        {!mobile && (
          <>
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "-12%", left: "-5%",
                width: "clamp(260px, 45vw, 480px)",
                height: "clamp(260px, 45vw, 480px)",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(196,151,42,0.055) 0%, transparent 70%)",
                zIndex: 0, pointerEvents: "none",
                transform: `translateY(${orbOffset * 0.09}px)`,
                willChange: "transform",
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: "-10%", right: "-6%",
                width: "clamp(200px, 35vw, 360px)",
                height: "clamp(200px, 35vw, 360px)",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(15,29,61,0.035) 0%, transparent 70%)",
                zIndex: 0, pointerEvents: "none",
                transform: `translateY(${-orbOffset * 0.06}px)`,
                willChange: "transform",
              }}
            />
          </>
        )}

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto" }}>

          {/* Section header */}
          <div
            style={{
              textAlign: "center",
              marginBottom: mobile
                ? "clamp(32px, 6vh, 44px)"
                : "clamp(44px, 7vh, 72px)",
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(15px)",
              transition:
                "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {/* Eyebrow */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginBottom: mobile ? 12 : 16,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: mobile ? 24 : 36,
                  height: 1.5,
                  background: "#C4972A",
                  borderRadius: 999,
                  opacity: inView ? 1 : 0,
                  transform: inView ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "right",
                  transition:
                    "opacity 0.5s ease 0.2s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s",
                }}
              />
              <span
                style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: mobile
                    ? "clamp(9px, 2vw, 10px)"
                    : "clamp(10px, 1.3vw, 11px)",
                  fontWeight: 800,
                  letterSpacing: mobile ? "3px" : "4px",
                  textTransform: "uppercase",
                  color: "#C4972A",
                  whiteSpace: "nowrap",
                }}
              >
                Our Impact
              </span>
              <div
                style={{
                  width: mobile ? 24 : 36,
                  height: 1.5,
                  background: "#C4972A",
                  borderRadius: 999,
                  opacity: inView ? 1 : 0,
                  transform: inView ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transition:
                    "opacity 0.5s ease 0.2s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s",
                }}
              />
            </div>

            <h2
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: mobile
                  ? "clamp(1.3rem, 4vw, 1.8rem)"
                  : "clamp(1.5rem, 3vw, 2.6rem)",
                fontWeight: 900,
                color: "#0f1d3d",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                margin: "0 0 12px",
                padding: "0 clamp(8px, 2vw, 24px)",
              }}
            >
              Trusted Numbers That{" "}
              <span
                style={{
                  background:
                    "linear-gradient(90deg, #b8821e 0%, #C4972A 40%, #d4a832 60%, #C4972A 80%, #b8821e 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: mobile
                    ? "none"
                    : "evsStatShimmer 4s linear infinite",
                }}
              >
                Speak for Themselves
              </span>
            </h2>

            <p
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: mobile
                  ? "clamp(12px, 3vw, 13px)"
                  : "clamp(13px, 1.6vw, 15px)",
                color: "#6b7a99",
                maxWidth: 480,
                margin: "0 auto",
                lineHeight: 1.65,
                fontWeight: 400,
                padding: "0 clamp(8px, 2vw, 24px)",
              }}
            >
              Every number reflects a real person placed, a partnership built,
              and a commitment kept across North-West England.
            </p>
          </div>

          {/* Section reveal divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: mobile ? 12 : 18,
              marginBottom: mobile
                ? "clamp(24px, 4vh, 32px)"
                : "clamp(32px, 5vh, 48px)",
              maxWidth: mobile ? 280 : 400,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div
              style={{
                flex: 1,
                height: mobile ? 1 : 1.5,
                background: "linear-gradient(90deg, transparent, #C4972A)",
                transform: lineRevealed ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "right",
                transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
            <div
              style={{
                width: mobile ? 5 : 6,
                height: mobile ? 5 : 6,
                borderRadius: "50%",
                background: "#C4972A",
                boxShadow: lineRevealed ? "0 0 8px rgba(196,151,42,0.3)" : "none",
                animation:
                  lineRevealed && !mobile
                    ? "evsSlowPulse 3s ease-in-out infinite"
                    : "none",
                opacity: lineRevealed ? 1 : 0,
                transform: lineRevealed ? "scale(1)" : "scale(0)",
                transition:
                  "opacity 0.4s ease 0.4s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.4s",
                flexShrink: 0,
              }}
            />
            <div
              style={{
                flex: 1,
                height: mobile ? 1 : 1.5,
                background: "linear-gradient(90deg, #C4972A, transparent)",
                transform: lineRevealed ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
          </div>

          {/* ── Cards grid ────────────────────────────────────────────────────
              fromLeft = index % 2 === 0
                index 0 → fromLeft=true  → slides from LEFT
                index 1 → fromLeft=false → slides from RIGHT
                index 2 → fromLeft=true  → slides from LEFT
                index 3 → fromLeft=false → slides from RIGHT
              Each card only becomes visible when revealedCount > index,
              so the slide-ins fire one after another (600ms apart on desktop).
          ──────────────────────────────────────────────────────────────────── */}
          <div className="evs-stats-grid">
            {STATS.map((s, i) => (
              <StatCard
                key={s.label}
                stat={s}
                isVisible={i < revealedCount}
                index={i}
                fromLeft={i % 2 === 0}   // ← the only new prop
              />
            ))}
          </div>

          {/* Bottom divider */}
          <div
            style={{
              marginTop: mobile
                ? "clamp(32px, 6vh, 40px)"
                : "clamp(48px, 7vh, 80px)",
              display: "flex",
              alignItems: "center",
              gap: mobile ? 12 : 18,
              opacity: inView ? 1 : 0,
              transition: "opacity 1s ease 0.6s",
            }}
          >
            <div
              style={{
                flex: 1,
                height: mobile ? 0.5 : 1,
                background: "rgba(0,0,0,0.06)",
              }}
            />
            <div
              style={{
                width: mobile ? 5 : 6,
                height: mobile ? 5 : 6,
                borderRadius: "50%",
                background: "#C4972A",
                boxShadow: "0 0 6px rgba(196,151,42,0.4)",
              }}
            />
            <div
              style={{
                flex: 1,
                height: mobile ? 0.5 : 1,
                background: "rgba(0,0,0,0.06)",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}