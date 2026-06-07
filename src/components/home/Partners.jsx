import { useInView } from "../../hooks/useInView";

export default function Partners() {
  const [ref, inView] = useInView(0.2);

  const partners = [
    "NHS England",
    "CQC Approved",
    "DBS Partner",
    "Skills for Care",
    "Care Quality",
    "Lancashire County",
  ];

  return (
    <section
      ref={ref}
      style={{ padding: "60px 8%", background: "#fff", borderTop: "1px solid #eef0f8", borderBottom: "1px solid #eef0f8" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: 40,
            opacity: inView ? 1 : 0,
            transition: "all 0.7s",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "#94a3b8",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Trusted By & Compliant With
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 32,
            alignItems: "center",
          }}
        >
          {partners.map((p, i) => (
            <div
              key={i}
              style={{
                padding: "12px 28px",
                borderRadius: 12,
                border: "1px solid #eef0f8",
                background: "#fafbff",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: 13,
                color: "#64748b",
                letterSpacing: 0.5,
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(10px)",
                transition: `all 0.5s ease ${i * 0.08}s`,
              }}
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
