// components/home/TrustBadges.jsx
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// Premium Trust Badges — Performance Optimized for Mobile
// Features: Reduced animations on mobile, smoother marquee, no scroll lag
// ─────────────────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return [ref, isInView];
}

// Expanded Trust Tags Data - Rich variety of benefits
const TRUST_TAGS = [
  { id: 1, label: "DBS Checked", icon: "✓", color: "#4ade80", gradient: "linear-gradient(135deg, #4ade80, #22c55e)" },
  { id: 2, label: "CQC Compliant", icon: "✓", color: "#4ade80", gradient: "linear-gradient(135deg, #4ade80, #22c55e)" },
  { id: 3, label: "Weekly Pay", icon: "💰", color: "#C4972A", gradient: "linear-gradient(135deg, #C4972A, #e8b84a)" },
  { id: 4, label: "24/7 Support", icon: "🕒", color: "#C4972A", gradient: "linear-gradient(135deg, #C4972A, #e8b84a)" },
  { id: 5, label: "Fast Placement", icon: "⚡", color: "#f59e0b", gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)" },
  { id: 6, label: "NHS Opportunities", icon: "🏥", color: "#005EB8", gradient: "linear-gradient(135deg, #005EB8, #0088E8)" },
  { id: 7, label: "Dedicated Consultants", icon: "👥", color: "#8b5cf6", gradient: "linear-gradient(135deg, #8b5cf6, #a78bfa)" },
  { id: 8, label: "Flexible Shifts", icon: "📅", color: "#06b6d4", gradient: "linear-gradient(135deg, #06b6d4, #22d3ee)" },
  { id: 9, label: "Career Development", icon: "📈", color: "#10b981", gradient: "linear-gradient(135deg, #10b981, #34d399)" },
  { id: 10, label: "Training Support", icon: "📚", color: "#8B5CF6", gradient: "linear-gradient(135deg, #8B5CF6, #A78BFA)" },
];

// Partner Logos Data - Expanded
const TRUST_LOGOS = [
  { id: 1, label: "NHS", icon: "🏥", color: "#005EB8", gradient: "linear-gradient(135deg, #005EB8, #0088E8)" },
  { id: 2, label: "CQC", icon: "✓", color: "#007F4E", gradient: "linear-gradient(135deg, #007F4E, #00A859)" },
  { id: 3, label: "Skills for Care", icon: "📚", color: "#4B2882", gradient: "linear-gradient(135deg, #4B2882, #6B3A9E)" },
  { id: 4, label: "DBS Partner", icon: "🔒", color: "#C4972A", gradient: "linear-gradient(135deg, #C4972A, #e8b84a)" },
  { id: 5, label: "UKHCA", icon: "🤝", color: "#7B2D8E", gradient: "linear-gradient(135deg, #7B2D8E, #9B4DAE)" },
  { id: 6, label: "NCFE", icon: "🎓", color: "#E65100", gradient: "linear-gradient(135deg, #E65100, #FF771D)" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Optimized Floating Card - Works on all devices
// ─────────────────────────────────────────────────────────────────────────────
function FloatingTrustCard({ item, index, isInView, type = "tag", isMobileDevice = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  
  // Card sizes - responsive
  const cardSize = type === "logo" ? 105 : 95;
  const iconSize = type === "logo" ? 24 : 22;
  const fontSize = type === "logo" ? 10 : 9.5;
  const margin = 8;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        width: cardSize,
        height: cardSize,
        flexShrink: 0,
        cursor: "pointer",
        margin: `0 ${margin}px`,
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'scale(1)' : 'scale(0.9)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      {/* Main Ball Card */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transform: isHovered ? 'scale(1.03)' : 'scale(1)',
          transition: 'transform 0.2s ease',
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: item.gradient,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 6px 12px rgba(0,0,0,0.1), 0 0 0 2px rgba(255,255,255,0.25), inset 0 -3px 6px rgba(0,0,0,0.08)`,
          }}
        >
          {/* Simple inner glow */}
          <div
            style={{
              position: "absolute",
              inset: 6,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Icon */}
          <span
            style={{
              fontSize: iconSize,
              marginBottom: 5,
              filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))",
            }}
          >
            {item.icon}
          </span>

          {/* Label */}
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: fontSize,
              color: "#fff",
              textAlign: "center",
              padding: "0 4px",
              lineHeight: 1.2,
              textShadow: "0 1px 1px rgba(0,0,0,0.15)",
            }}
          >
            {item.label}
          </span>

          {/* Decorative ring */}
          <div
            style={{
              position: "absolute",
              inset: -3,
              borderRadius: "50%",
              border: `1px solid rgba(255,255,255,0.2)`,
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Simple CSS Marquee - Works immediately on all devices
// ─────────────────────────────────────────────────────────────────────────────
function SimpleMarquee({ items, speed = 40, type = "tag", direction = "left" }) {
  const containerRef = useRef(null);
  
  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items, ...items];
  
  const animationName = direction === "left" ? "marqueeLeft" : "marqueeRight";
  
  return (
    <div
      ref={containerRef}
      style={{
        overflow: "hidden",
        position: "relative",
        width: "100%",
        padding: "10px 0",
        maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "fit-content",
          animation: `${animationName} ${speed}s linear infinite`,
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <FloatingTrustCard
            key={`${item.id}-${idx}`}
            item={item}
            index={idx}
            isInView={true}
            type={type}
          />
        ))}
      </div>
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main TrustBadges Component - Simple and Works Everywhere
// ─────────────────────────────────────────────────────────────────────────────
export default function TrustBadges({ className = "", variant = "light" }) {
  const [ref, inView] = useReveal(0.15);

  const isDark = variant === "dark";
  
  return (
    <section
      ref={ref}
      className={className}
      style={{
        padding: "clamp(20px, 4vh, 35px) clamp(16px, 5vw, 80px)",
        background: isDark 
          ? "linear-gradient(135deg, #0a1628 0%, #0f1d3d 100%)"
          : "linear-gradient(135deg, #ffffff 0%, #fefcf8 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle Background Pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(196,151,42,0.04) 0%, transparent 50%),
            repeating-linear-gradient(45deg, #C4972A 0px, #C4972A 1px, transparent 1px, transparent 30px)
          `,
          backgroundSize: "100% 100%, 30px 30px",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 2 }}>
        
        {/* TOP ROW - Trust Benefits */}
        <SimpleMarquee
          items={TRUST_TAGS}
          speed={45}
          type="tag"
          direction="right"
        />

        {/* Center Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            margin: "12px 0",
          }}
        >
          <div style={{ width: 50, height: 1, background: "rgba(196,151,42,0.25)", borderRadius: 999 }} />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: isDark ? "rgba(255,255,255,0.45)" : "#94a3b8",
            }}
          >
            Trusted By
          </span>
          <div style={{ width: 50, height: 1, background: "rgba(196,151,42,0.25)", borderRadius: 999 }} />
        </div>

        {/* BOTTOM ROW - Partner Logos */}
        <SimpleMarquee
          items={TRUST_LOGOS}
          speed={50}
          type="logo"
          direction="left"
        />
      </div>
    </section>
  );
}