// components/home/TrustBadges.jsx
import { useRef } from "react";
import { useInView } from "framer-motion";

// Lucide Icons - Professional icon set
import {
  ShieldCheck,
  BadgeCheck,
  Wallet,
  Clock3,
  Zap,
  Building2,
  Users,
  CalendarDays,
  TrendingUp,
  GraduationCap,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// PERFORMANCE OPTIMIZED Trust Badges
//
// Desktop: full animation suite — float, pop, rings, pulse, hover glow, marquee
// Mobile (≤767px): ALL per-card animations stripped via CSS @media.
//   Only the marquee translateX runs — single compositor-thread transform,
//   zero layout impact, smooth on every Android/iOS device.
//
// The isMobile JS checks are replaced with CSS @media throughout so the
// correct behaviour is applied regardless of SSR or resize edge cases.
// ─────────────────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return [ref, isInView];
}

// ─────────────────────────────────────────────────────────────────────────────
// Trust Tags Data
// ─────────────────────────────────────────────────────────────────────────────
const TRUST_TAGS = [
  { id: 1,  label: "DBS Checked",           icon: ShieldCheck,   color: "#C4972A" },
  { id: 2,  label: "CQC Compliant",         icon: BadgeCheck,    color: "#C4972A" },
  { id: 3,  label: "Weekly Pay",            icon: Wallet,        color: "#C4972A" },
  { id: 4,  label: "24/7 Support",          icon: Clock3,        color: "#C4972A" },
  { id: 5,  label: "Fast Placement",        icon: Zap,           color: "#C4972A" },
  { id: 6,  label: "NHS Opportunities",     icon: Building2,     color: "#005EB8" },
  { id: 7,  label: "Dedicated Consultants", icon: Users,         color: "#C4972A" },
  { id: 8,  label: "Flexible Shifts",       icon: CalendarDays,  color: "#C4972A" },
  { id: 9,  label: "Career Development",    icon: TrendingUp,    color: "#C4972A" },
  { id: 10, label: "Training Support",      icon: GraduationCap, color: "#C4972A" },
];

// ─────────────────────────────────────────────────────────────────────────────
// CSS
// ─────────────────────────────────────────────────────────────────────────────
const CSS = `
  /* ── Marquee track ───────────────────────────────────────────────────────
     Single translateX on the container — one compositor layer, works fine
     on every mobile device. Speed is set via CSS custom property so the
     @media override below can slow it without touching JS.
  ──────────────────────────────────────────────────────────────────────── */
  @keyframes tb-marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .tb-track {
    display: flex;
    width: max-content;
    will-change: transform;
    animation: tb-marquee var(--tb-speed, 45s) linear infinite;
  }
  /* Pause on hover — desktop only (touch devices have no hover state) */
  @media (hover: hover) {
    .tb-track:hover { animation-play-state: paused; }
  }

  /* ── Card base ───────────────────────────────────────────────────────────
     Desktop: tb-pop entrance + tb-float idle loop.
     Mobile:  animation: none — static cards, only the track moves.
  ──────────────────────────────────────────────────────────────────────── */
  @keyframes tb-pop {
    from { opacity: 0; transform: scale(0.6); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes tb-float {
    0%,100% { transform: translateY(0)   rotateZ(0deg); }
    25%     { transform: translateY(-5px) rotateZ(1.5deg); }
    75%     { transform: translateY(5px)  rotateZ(-1.5deg); }
  }

  .tb-card {
    position: relative;
    flex-shrink: 0;
    cursor: pointer;
    margin: 0 8px;
    width: 90px;
    height: 90px;
    /* Desktop: pop in then float */
    animation:
      tb-pop   0.45s cubic-bezier(0.22,1,0.36,1) both,
      tb-float 4.5s  ease-in-out infinite;
    animation-delay:
      calc(var(--i) * 0.15s),
      calc(var(--i) * 0.15s);
  }

  /* ── Ball face ── */
  .tb-face {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: #ffffff;
    border: 1.5px solid rgba(196,151,42,0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04), 0 0 0 1px rgba(196,151,42,0.06);
    overflow: hidden;
    transition: box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
  }
  /* Hover glow — only fires on pointer devices */
  @media (hover: hover) {
    .tb-card:hover .tb-face {
      box-shadow:
        0 0 18px rgba(196,151,42,0.35),
        0 4px 16px rgba(0,0,0,0.08),
        0 0 0 1px rgba(196,151,42,0.18);
      border-color: rgba(196,151,42,0.45);
      transform: scale(1.05);
    }
  }

  /* ── Inner gradient pulse ── */
  @keyframes tb-pulse {
    0%,100% { opacity: 0.03; }
    50%      { opacity: 0.10; }
  }
  .tb-inner-pulse {
    position: absolute;
    inset: 6px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(196,151,42,0.06), transparent 70%);
    pointer-events: none;
    animation: tb-pulse 2.5s ease-in-out infinite;
  }

  /* ── Sweep shimmer on hover ── */
  .tb-sweep {
    position: absolute;
    top: 0; left: -55%;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(196,151,42,0.12), transparent);
    transform: skewX(-20deg);
    pointer-events: none;
    opacity: 0;
    transition: none;
  }
  @keyframes tb-sweep {
    from { left: -55%; opacity: 0.3; }
    to   { left: 110%; opacity: 0.3; }
  }
  @media (hover: hover) {
    .tb-card:hover .tb-sweep {
      animation: tb-sweep 1s ease-in-out infinite;
    }
  }

  /* ── Icon ── */
  .tb-icon {
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  @media (hover: hover) {
    .tb-card:hover .tb-icon {
      transform: scale(1.1) rotate(-3deg);
    }
  }

  /* ── Label ── */
  .tb-label {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 9px;
    color: #475569;
    text-align: center;
    padding: 0 4px;
    line-height: 1.2;
    position: relative;
    z-index: 1;
    transition: opacity 0.2s ease;
    opacity: 0.9;
  }
  @media (hover: hover) {
    .tb-card:hover .tb-label { opacity: 1; }
  }

  /* ── Rotating rings ── */
  @keyframes tb-ring-cw  { to { transform: rotate(360deg);  } }
  @keyframes tb-ring-ccw { to { transform: rotate(-360deg); } }
  .tb-ring-cw {
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    border: 1px solid rgba(196,151,42,0.12);
    pointer-events: none;
    animation: tb-ring-cw  8s linear infinite;
  }
  .tb-ring-ccw {
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    border: 1px solid rgba(196,151,42,0.06);
    pointer-events: none;
    animation: tb-ring-ccw 10s linear infinite;
  }

  /* ── Pulsing outer ring on hover ── */
  @keyframes tb-hover-ring {
    from { transform: scale(1);   opacity: 0.4; }
    to   { transform: scale(1.3); opacity: 0;   }
  }
  .tb-hover-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 1.5px solid #C4972A;
    pointer-events: none;
    opacity: 0;
    animation: none;
  }
  @media (hover: hover) {
    .tb-card:hover .tb-hover-ring {
      animation: tb-hover-ring 1s ease-out infinite;
    }
  }

  /* ── Section reveal ── */
  @keyframes tb-reveal {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .tb-section-reveal {
    animation: tb-reveal 0.6s cubic-bezier(0.22,1,0.36,1) both;
  }

  /* ─────────────────────────────────────────────────────────────────────────
     MOBILE OVERRIDES (≤767px)
     Kill every per-card animation. Only the marquee track translateX runs.
     Cards are fully visible (opacity:1, transform:none) from the start —
     no entrance pop, no float, no rings, no pulse, no hover glow.
     The track still scrolls smoothly as a single GPU layer.
  ───────────────────────────────────────────────────────────────────────── */
  @media (max-width: 767px) {
    /* Smaller card footprint */
    .tb-card {
      width: 74px;
      height: 74px;
      margin: 0 6px;
      /* Remove pop + float — card appears instantly, fully opaque */
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }

    /* Static, clean face — no transition overhead */
    .tb-face {
      transition: none !important;
      transform: none !important;
    }

    /* Kill inner pulse */
    .tb-inner-pulse {
      animation: none !important;
      opacity: 0 !important;
    }

    /* Kill sweep */
    .tb-sweep {
      display: none !important;
    }

    /* Kill rotating rings */
    .tb-ring-cw,
    .tb-ring-ccw {
      animation: none !important;
      border: none !important;
    }

    /* Kill hover ring */
    .tb-hover-ring {
      display: none !important;
    }

    /* Icon — no transition */
    .tb-icon {
      transition: none !important;
    }

    /* Slightly larger label for readability on small screens */
    .tb-label {
      font-size: 8px;
      opacity: 1 !important;
      transition: none !important;
    }

    /* Tighter marquee padding */
    .tb-track {
      /* Slightly faster on narrow screens — less content visible */
      --tb-speed: 32s;
    }
  }

  /* Extra small phones */
  @media (max-width: 390px) {
    .tb-card {
      width: 66px;
      height: 66px;
      margin: 0 5px;
    }
    .tb-label { font-size: 7.5px; }
  }

  /* ── Reduced motion — belt-and-braces on top of mobile strip ── */
  @media (prefers-reduced-motion: reduce) {
    .tb-track        { animation-duration: 120s !important; } /* slow crawl */
    .tb-card         { animation: none !important; opacity: 1 !important; transform: none !important; }
    .tb-ring-cw,
    .tb-ring-ccw,
    .tb-inner-pulse,
    .tb-hover-ring,
    .tb-sweep        { animation: none !important; }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING TRUST CARD — pure HTML + CSS, zero JS animation overhead
// ─────────────────────────────────────────────────────────────────────────────
function TrustCard({ item, index }) {
  const Icon = item.icon;
  return (
    <div
      className="tb-card"
      style={{ "--i": index }}
    >
      <div className="tb-face">
        <div className="tb-inner-pulse" />
        <div className="tb-sweep" />

        <div className="tb-icon">
          <Icon size={22} strokeWidth={1.8} color={item.color} />
        </div>

        <span className="tb-label">{item.label}</span>

        <div className="tb-ring-cw" />
        <div className="tb-ring-ccw" />
        <div className="tb-hover-ring" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INFINITE MARQUEE — CSS animation on a single div; no Framer Motion
// Speed is now set via CSS variable only (no JS isMobile branch).
// ─────────────────────────────────────────────────────────────────────────────
function TrustMarquee({ items, isInView }) {
  // Duplicate once — CSS marquee needs 2× content so the loop is seamless
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        overflow: "hidden",
        position: "relative",
        width: "100%",
        padding: "12px 0",
        // Fade edges — wider fade on desktop, narrower on mobile
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      {/* Only render once section is in view — saves paint on initial load */}
      {isInView && (
        <div
          className="tb-track"
          // Default speed (45s desktop) is set in CSS;
          // mobile override (32s) is in the @media block above.
        >
          {doubled.map((item, idx) => (
            <TrustCard
              key={`${item.id}-${idx}`}
              item={item}
              index={idx % items.length}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN TRUST BADGES COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function TrustBadges({ className = "", variant = "light" }) {
  const [ref, inView] = useReveal(0.15);
  const isDark = variant === "dark";

  return (
    <>
      <style>{CSS}</style>

      <section
        ref={ref}
        className={`${className}${inView ? " tb-section-reveal" : ""}`}
        style={{
          // padding controlled by CSS @media — no JS isMobile branch
          padding: "20px 0",
          background: isDark
            ? "linear-gradient(135deg, #0a1628 0%, #0f1d3d 100%)"
            : "linear-gradient(135deg, #ffffff 0%, #fefcf8 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle background radial */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(196,151,42,0.03), transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            position: "relative",
            zIndex: 2,
          }}
        >
          <TrustMarquee items={TRUST_TAGS} isInView={inView} />

          {/* Subtle bottom divider — hidden on mobile via CSS */}
          <div className="tb-divider-wrap">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 16,
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 1,
                  background: "rgba(196,151,42,0.15)",
                  borderRadius: 999,
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}