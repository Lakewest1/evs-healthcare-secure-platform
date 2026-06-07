import { useInView } from "../../hooks/useInView";
import { useCounter } from "../../hooks/useCounter";

function StatItem({ stat, inView, index }) {
  const count = useCounter(stat.value, 2000, inView);
  return (
    <div
      style={{
        textAlign: "center",
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(30px)",
        transition: `all 0.7s ease ${index * 0.15}s`,
      }}
    >
      <div style={{ fontSize: 36, marginBottom: 8 }}>{stat.icon}</div>
      <div
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2rem,4vw,3rem)",
          fontWeight: 900,
          color: "#f0c060",
        }}
      >
        {count}
        {stat.suffix}
      </div>
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          color: "rgba(255,255,255,0.65)",
          fontSize: 14,
          marginTop: 4,
          letterSpacing: 0.3,
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}

export default function Stats() {
  const [ref, inView] = useInView(0.3);

  const stats = [
    { value: 500, suffix: "+", label: "Healthcare Workers Placed", icon: "👩‍⚕️" },
    { value: 150, suffix: "+", label: "Partner Care Homes", icon: "🏥" },
    { value: 98, suffix: "%", label: "Client Satisfaction Rate", icon: "⭐" },
    { value: 24, suffix: "/7", label: "Support Available", icon: "📞" },
  ];

  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(135deg, #0f1d3d 0%, #1a2d5a 100%)",
        padding: "80px 8%",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: 40,
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {stats.map((s, i) => (
          <StatItem key={i} stat={s} inView={inView} index={i} />
        ))}
      </div>
    </section>
  );
}
