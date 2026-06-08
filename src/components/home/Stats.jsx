import { useRef, useEffect, useState, useCallback, memo } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// EVS Healthcare — Stats Section  (Principal Engineer Rebuild)
//
// Fixes applied vs previous version:
//   FIX-1  Duplicate `transition` on separator div — was silently killing width anim
//   FIX-2  Duplicate `transform` on icon div — hover transform was dead code
//   FIX-3  Duplicate `transition` on icon — entrance was overriding hover
//   FIX-4  `isDesktop` was not reactive and crashed SSR — replaced with useMediaQuery
//   FIX-5  useScrollParallax attached to internal decorative divs — wrong ref targets;
//          parallax now applied to the section root element
//   FIX-6  useSlowSequentialReveal had a memory leak — interval clearup was inside
//          setTimeout callback (returned to nowhere). Fixed with module-level ref
//   FIX-7  useCounterComplete glow flicker — replaced with one-shot CSS keyframe
//          keyed off a state flag (no re-render during glow window)
//   FIX-8  evsDustTrail clipped by overflow:hidden — removed (invisible effect)
//   FIX-9  Scroll handler setState without rAF throttle — fixed
//  FIX-10  background:"white" on dust trail — moot after FIX-8
//  FIX-11  Section bg #f9fafb inconsistent — unified to #ffffff
//  FIX-12  Horizontal padding clamp too narrow (12px min) — fixed to 20px min
//  FIX-13  Gold sweep bar used translateX(-100%) — replaced with scaleX pattern
//  FIX-14  Mouse tilt string rebuild on every pixel — CSS custom property via ref
// ─────────────────────────────────────────────────────────────────────────────

// ── Hook: IntersectionObserver, fires once ────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ── Hook: Sequential card reveal — FIXED memory leak (FIX-6) ─────────────
function useSequentialReveal(enabled, total, interval = 600) {
  const [revealed, setRevealed] = useState(0);
  const intervalRef = useRef(null);  // FIX-6: ref lives outside setTimeout
  const timeoutRef  = useRef(null);

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
      clearInterval(intervalRef.current);  // FIX-6: always cleaned up
    };
  }, [enabled, total, interval]);

  return revealed;
}

// ── Hook: rAF-based counter with easeOutExpo ─────────────────────────────
function useCounter(target, duration = 2200, enabled = false) {
  const [count, setCount] = useState(0);
  const [done, setDone]   = useState(false);  // FIX-7: done flag instead of complete state
  const rafRef  = useRef(null);
  const started = useRef(false);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!enabled || started.current) return;
    started.current = true;
    if (prefersReduced) { setCount(target); setDone(true); return; }

    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setCount(Math.round(e * target));
      if (p < 1) { rafRef.current = requestAnimationFrame(tick); }
      else       { setDone(true); }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [enabled, target, duration, prefersReduced]);

  return { count, done };
}

// ── Hook: rAF-throttled scroll parallax (FIX-5 + FIX-9) ─────────────────
// Attached to the section root (not decorative children).
// State updated via rAF to cap at one setState per frame.
function useScrollParallax(speed = 0.3) {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
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
    onScroll(); // initial
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speed]);

  return [sectionRef, offset];
}

// ── Hook: reactive desktop detection (FIX-4) ─────────────────────────────
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1025px) and (hover: hover)");
    setIsDesktop(mql.matches);
    const handler = (e) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────
const STATS = [
  { value: 500, suffix: "+",  label: "Healthcare Workers Placed", icon: "👩‍⚕️", desc: "Across NHS & private sector"   },
  { value: 150, suffix: "+",  label: "Partner Care Homes",        icon: "🏥",  desc: "UK-wide trusted network"        },
  { value: 98,  suffix: "%",  label: "Client Satisfaction Rate",  icon: "⭐",  desc: "Verified post-placement survey" },
  { value: 24,  suffix: "/7", label: "Support Available",         icon: "📞",  desc: "Always here when you need us"   },
];

// ─────────────────────────────────────────────────────────────────────────────
// StatCard
// ─────────────────────────────────────────────────────────────────────────────
function StatCard({ stat, isVisible, index }) {
  const { count, done }   = useCounter(stat.value, 2200, isVisible);
  const [hovered, setHovered] = useState(false);
  const isDesktop             = useIsDesktop();
  const cardRef               = useRef(null);

  // FIX-14: CSS custom property update instead of string rebuild per pixel
  const handleMouseMove = useCallback((e) => {
    if (!isDesktop || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
    const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
    cardRef.current.style.setProperty("--tilt-x", `${x}%`);
    cardRef.current.style.setProperty("--tilt-y", `${y}%`);
  }, [isDesktop]);

  // FIX-2 + FIX-3: icon transform and transition split into entrance vs hover
  // using a composited single declaration that handles both states
  const iconTransform = !isVisible
    ? "scale(0.5) rotate(-10deg)"
    : hovered
      ? "scale(1.12) rotate(2deg)"
      : "scale(1) rotate(0deg)";

  const iconTransition = !isVisible
    ? "opacity 0.3s ease, transform 0.3s ease"
    : "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s ease, border-color 0.3s ease, opacity 0.6s ease 0.6s";

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        if (cardRef.current) {
          cardRef.current.style.setProperty("--tilt-x", "50%");
          cardRef.current.style.setProperty("--tilt-y", "50%");
        }
      }}
      onMouseMove={handleMouseMove}
      style={{
        "--tilt-x": "50%",
        "--tilt-y": "50%",
        position: "relative",
        background: "#ffffff",
        border: `1px solid ${hovered ? "rgba(196,151,42,0.45)" : "rgba(0,0,0,0.07)"}`,
        borderRadius: 20,
        padding: "clamp(28px, 4vw, 44px) clamp(20px, 3vw, 32px) clamp(24px, 3vw, 38px)",
        boxShadow: hovered
          ? "0 24px 64px rgba(0,0,0,0.12), 0 6px 20px rgba(196,151,42,0.12)"
          : "0 2px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
        textAlign: "center",
        cursor: "default",
        // Sequential slide-in from left — one card at a time
        opacity:   isVisible ? 1 : 0,
        transform: isVisible
          ? hovered ? "translateY(-8px) scale(1.02)" : "translateX(0) scale(1)"
          : "translateX(-80px) scale(0.93)",
        transition: `opacity 1.2s cubic-bezier(0.16,1,0.3,1),
                     transform ${isVisible && hovered ? "0.3s cubic-bezier(0.22,1,0.36,1)" : "1.2s cubic-bezier(0.16,1,0.3,1)"},
                     border-color 0.3s ease,
                     box-shadow 0.4s cubic-bezier(0.22,1,0.36,1)`,
        willChange: "opacity, transform",
        overflow: "hidden",
      }}
      aria-label={`${stat.label}: ${stat.value}${stat.suffix}`}
    >
      {/* ── Gold accent sweep — scaleX(0→1) on hover (FIX-13) ── */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: 3,
        background: "linear-gradient(90deg, #C4972A, #f0c060, #C4972A)",
        borderRadius: "20px 20px 0 0",
        transformOrigin: "left center",
        transform: hovered ? "scaleX(1)" : "scaleX(0)",
        opacity: hovered ? 1 : 0.6,
        transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
      }} />

      {/* ── Mouse tilt radial glow — reads from CSS custom props (FIX-14) ── */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(circle at var(--tilt-x) var(--tilt-y), rgba(196,151,42,0.05), transparent 60%)",
        opacity: hovered && isDesktop ? 1 : 0,
        transition: "opacity 0.4s ease",
        pointerEvents: "none",
        borderRadius: 20,
      }} />

      {/* ── Subtle gold wash on hover ── */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(160deg, rgba(196,151,42,0.03) 0%, transparent 60%)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s ease",
        pointerEvents: "none",
        borderRadius: 20,
      }} />

      {/* ── Glass shine sweep every 12s ── */}
      <div style={{
        position: "absolute",
        top: "50%", left: "-20%",
        width: "60%", height: "120%",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)",
        transform: "skewX(-15deg) translateY(-50%)",
        animation: `evsGlassShine 12s ease-in-out ${index * 3}s infinite`,
        pointerEvents: "none",
        zIndex: 1,
      }} />

      {/* ── Icon — FIX-2 + FIX-3: single resolved transform/transition ── */}
      <div style={{
        fontSize: "clamp(26px, 3.5vw, 34px)",
        marginBottom: "clamp(14px, 2vw, 18px)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "clamp(50px, 7vw, 64px)",
        height: "clamp(50px, 7vw, 64px)",
        borderRadius: "50%",
        background: hovered
          ? "linear-gradient(135deg, rgba(196,151,42,0.12), rgba(196,151,42,0.06))"
          : "rgba(0,0,0,0.03)",
        border: `1px solid ${hovered ? "rgba(196,151,42,0.25)" : "rgba(0,0,0,0.06)"}`,
        transform: iconTransform,           // single resolved value
        transition: iconTransition,         // single resolved value
        opacity: isVisible ? 1 : 0,
        position: "relative",
        zIndex: 2,
      }}>
        {stat.icon}
      </div>

      {/* ── Counter — FIX-7: CSS keyframe glow on `done`, no flicker ── */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className={done ? "evs-counter-glow" : ""}
        style={{
          fontFamily: "'Nunito Sans', sans-serif",
          fontSize: "clamp(1.9rem, 3.5vw, 3.4rem)",
          fontWeight: 900,
          lineHeight: 1,
          marginBottom: "clamp(8px, 1.2vw, 10px)",
          color: "#0f1d3d",
          letterSpacing: "-0.02em",
          position: "relative",
          zIndex: 2,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(10px)",
          transition: isVisible
            ? "opacity 0.8s ease 0.8s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.8s"
            : "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        <span>{count}</span>
        <span style={{ color: "#C4972A" }}>{stat.suffix}</span>
      </div>

      {/* ── Label ── */}
      <div style={{
        fontFamily: "'Nunito Sans', sans-serif",
        fontSize: "clamp(13px, 1.8vw, 15px)",
        fontWeight: 700,
        color: "#1a2540",
        letterSpacing: "0.1px",
        marginBottom: "clamp(5px, 0.8vw, 7px)",
        lineHeight: 1.3,
        position: "relative", zIndex: 2,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(8px)",
        transition: isVisible
          ? "opacity 0.8s ease 1.0s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 1.0s"
          : "opacity 0.3s ease, transform 0.3s ease",
      }}>
        {stat.label}
      </div>

      {/* ── Descriptor ── */}
      <div style={{
        fontFamily: "'Nunito Sans', sans-serif",
        fontSize: "clamp(11px, 1.4vw, 12.5px)",
        color: "#6b7a99",
        letterSpacing: "0.1px",
        lineHeight: 1.5,
        fontStyle: "italic",
        position: "relative", zIndex: 2,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(6px)",
        transition: isVisible
          ? "opacity 0.8s ease 1.15s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 1.15s"
          : "opacity 0.3s ease, transform 0.3s ease",
      }}>
        {stat.desc}
      </div>

      {/* ── Bottom separator — FIX-1: single transition declaration ── */}
      <div style={{
        height: 1.5,
        background: "linear-gradient(90deg, transparent, #C4972A, transparent)",
        borderRadius: 999,
        margin: "clamp(16px, 2.5vw, 22px) auto 0",
        position: "relative", zIndex: 2,
        // FIX-1: width and opacity/transform share one transition block
        width: hovered ? "55%" : "28%",
        opacity: isVisible ? 0.55 : 0,
        transform: isVisible ? "scaleX(1)" : "scaleX(0)",
        transition: isVisible
          ? `width 0.5s cubic-bezier(0.16,1,0.3,1),
             opacity 0.6s ease 1.3s,
             transform 0.6s cubic-bezier(0.16,1,0.3,1) 1.3s`
          : "opacity 0.3s ease, transform 0.3s ease",
      }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Stats — section root
// ─────────────────────────────────────────────────────────────────────────────
export default function Stats() {
  const [sectionRef, inView]    = useInView(0.15);
  // FIX-5: parallax attached to the section root, not decorative children
  const [parallaxRef, dotOffset]  = useScrollParallax(0.18);
  const [parallaxRef2, orbOffset] = useScrollParallax(0.09);
  const [lineRevealed, setLineRevealed] = useState(false);

  // Attach all three refs to the same section element
  const setRefs = useCallback((el) => {
    sectionRef.current   = el;
    parallaxRef.current  = el;
    parallaxRef2.current = el;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const revealedCount = useSequentialReveal(inView, STATS.length, 580);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setLineRevealed(true), 400);
      return () => clearTimeout(t);
    }
  }, [inView]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700;800;900&display=swap');

        /* ── Counter glow — one-shot CSS animation, no re-render (FIX-7) ── */
        @keyframes evsCounterGlow {
          0%   { text-shadow: none; }
          35%  { text-shadow: 0 0 22px rgba(196,151,42,0.5), 0 0 44px rgba(196,151,42,0.22); }
          100% { text-shadow: none; }
        }
        .evs-counter-glow {
          animation: evsCounterGlow 1s cubic-bezier(0.22,1,0.36,1) 0.05s 1 forwards;
        }

        /* ── Glass shine sweep every 12s ── */
        @keyframes evsGlassShine {
          0%, 88%  { left: -20%; opacity: 0; }
          89%      { opacity: 0.6; }
          94%      { left: 130%; opacity: 0; }
          100%     { left: 130%; opacity: 0; }
        }

        /* ── Headline shimmer ── */
        @keyframes evsStatShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        /* ── Divider dot pulse ── */
        @keyframes evsSlowPulse {
          0%, 100% { box-shadow: 0 0 8px rgba(196,151,42,0.3); }
          50%      { box-shadow: 0 0 20px rgba(196,151,42,0.6); }
        }

        /* ── Responsive grid ── */
        .evs-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(14px, 2.5vw, 28px);
        }
        @media (max-width: 1024px) {
          .evs-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 520px) {
          .evs-stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }

        /* ── Section padding ── */
        .evs-stats-section {
          padding: clamp(72px, 10vh, 112px) clamp(20px, 6vw, 96px) clamp(72px, 9vh, 104px);
        }
        @media (max-width: 480px) {
          .evs-stats-section {
            padding: 56px 16px 52px;
          }
        }

        /* ── Touch — disable hover-only animations ── */
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
        style={{
          position: "relative",
          background: "#ffffff",  // FIX-11: unified to white
          overflow: "hidden",
        }}
      >

        {/* ── Parallax dot grid (FIX-5: reads from section scroll) ── */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: "radial-gradient(circle, rgba(15,29,61,0.045) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          transform: `translateY(${dotOffset * 0.18}px)`,
          pointerEvents: "none",
          willChange: "transform",
        }} />

        {/* ── Layered gold orb — moves at different speed ── */}
        <div aria-hidden="true" style={{
          position: "absolute",
          top: "-12%", left: "-5%",
          width: "clamp(260px, 45vw, 480px)",
          height: "clamp(260px, 45vw, 480px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,151,42,0.055) 0%, transparent 70%)",
          zIndex: 0, pointerEvents: "none",
          transform: `translateY(${orbOffset * 0.09}px)`,
          willChange: "transform",
        }} />

        {/* ── Navy orb bottom-right — moves slowest ── */}
        <div aria-hidden="true" style={{
          position: "absolute",
          bottom: "-10%", right: "-6%",
          width: "clamp(200px, 35vw, 360px)",
          height: "clamp(200px, 35vw, 360px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(15,29,61,0.035) 0%, transparent 70%)",
          zIndex: 0, pointerEvents: "none",
          transform: `translateY(${-orbOffset * 0.06}px)`,
          willChange: "transform",
        }} />

        {/* ── Content ── */}
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto" }}>

          {/* ── Section header ── */}
          <div style={{
            textAlign: "center",
            marginBottom: "clamp(44px, 7vh, 72px)",
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(20px)",
            transition: "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
          }}>
            {/* Eyebrow */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              marginBottom: 16,
              flexWrap: "wrap",
              justifyContent: "center",
            }}>
              <div style={{
                width: 36, height: 1.5, background: "#C4972A", borderRadius: 999,
                opacity: inView ? 1 : 0,
                transform: inView ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "right",
                transition: "opacity 0.6s ease 0.3s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
              }} />
              <span style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: "clamp(10px, 1.3vw, 11px)",
                fontWeight: 800,
                letterSpacing: "4px", textTransform: "uppercase",
                color: "#C4972A",
                whiteSpace: "nowrap",
              }}>
                Our Impact
              </span>
              <div style={{
                width: 36, height: 1.5, background: "#C4972A", borderRadius: 999,
                opacity: inView ? 1 : 0,
                transform: inView ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: "opacity 0.6s ease 0.3s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
              }} />
            </div>

            <h2 style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: "clamp(1.5rem, 3vw, 2.6rem)",
              fontWeight: 900,
              color: "#0f1d3d",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              margin: "0 0 16px",
              padding: "0 clamp(8px, 2vw, 24px)",
            }}>
              Trusted Numbers That{" "}
              <span style={{
                background: "linear-gradient(90deg, #b8821e 0%, #C4972A 40%, #d4a832 60%, #C4972A 80%, #b8821e 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "evsStatShimmer 4s linear infinite",
              }}>
                Speak for Themselves
              </span>
            </h2>

            <p style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: "clamp(13px, 1.6vw, 15px)",
              color: "#6b7a99",
              maxWidth: 480,
              margin: "0 auto",
              lineHeight: 1.65,
              fontWeight: 400,
              padding: "0 clamp(8px, 2vw, 24px)",
            }}>
              Every number reflects a real person placed, a partnership built,
              and a commitment kept across North-West England.
            </p>
          </div>

          {/* ── Section reveal divider ── */}
          <div style={{
            display: "flex", alignItems: "center", gap: 18,
            marginBottom: "clamp(32px, 5vh, 48px)",
            maxWidth: 400,
            marginLeft: "auto",
            marginRight: "auto",
          }}>
            <div style={{
              flex: 1, height: 1.5,
              background: "linear-gradient(90deg, transparent, #C4972A)",
              transform: lineRevealed ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "right",
              transition: "transform 1s cubic-bezier(0.16,1,0.3,1)",
            }} />
            <div style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#C4972A",
              boxShadow: "0 0 8px rgba(196,151,42,0.3)",
              animation: lineRevealed ? "evsSlowPulse 3s ease-in-out infinite" : "none",
              opacity: lineRevealed ? 1 : 0,
              transform: lineRevealed ? "scale(1)" : "scale(0)",
              transition: "opacity 0.5s ease 0.5s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.5s",
              flexShrink: 0,
            }} />
            <div style={{
              flex: 1, height: 1.5,
              background: "linear-gradient(90deg, #C4972A, transparent)",
              transform: lineRevealed ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition: "transform 1s cubic-bezier(0.16,1,0.3,1)",
            }} />
          </div>

          {/* ── Cards grid — sequential reveal ── */}
          <div className="evs-stats-grid">
            {STATS.map((s, i) => (
              <StatCard
                key={s.label}
                stat={s}
                isVisible={i < revealedCount}
                index={i}
              />
            ))}
          </div>

          {/* ── Bottom divider ── */}
          <div style={{
            marginTop: "clamp(48px, 7vh, 80px)",
            display: "flex", alignItems: "center", gap: 18,
            opacity: inView ? 1 : 0,
            transition: "opacity 1.2s ease 0.8s",
          }}>
            <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.07)" }} />
            <div style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#C4972A",
              boxShadow: "0 0 8px rgba(196,151,42,0.5)",
            }} />
            <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.07)" }} />
          </div>

        </div>
      </section>
    </>
  );
}