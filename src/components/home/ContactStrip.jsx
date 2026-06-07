import { useInView } from "../../hooks/useInView";

export default function ContactStrip() {
  const [ref, inView] = useInView(0.3);

  const contacts = [
    { icon: "📍", label: "Office Address", value: "1a John William Street, Preston, PR1 4XE" },
    { icon: "📞", label: "Phone", value: "01772 493994 / 07466 999218" },
    { icon: "✉️", label: "Email", value: "admin_1@evshealthcare.co.uk" },
    { icon: "🌐", label: "Website", value: "www.evshealthcare.co.uk" },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      style={{ padding: "80px 8%", background: "#0f1d3d" }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 40,
        }}
      >
        {contacts.map((c, i) => (
          <div
            key={i}
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(20px)",
              transition: `all 0.6s ease ${i * 0.1}s`,
              display: "flex",
              gap: 16,
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "rgba(196,151,42,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                flexShrink: 0,
              }}
            >
              {c.icon}
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 12,
                  letterSpacing: 1,
                  marginBottom: 4,
                }}
              >
                {c.label.toUpperCase()}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#fff",
                  fontSize: 14,
                  lineHeight: 1.5,
                }}
              >
                {c.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
