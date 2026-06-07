import { useInView } from "../../hooks/useInView";

export default function WhyChooseUs() {
  const [ref, inView] = useInView(0.15);

  const features = [
    {
      icon: "⚡",
      title: "Fast Placement",
      desc: "Immediate start opportunities available for candidates with 5+ months experience in care settings.",
    },
    {
      icon: "🗓️",
      title: "Flexible Shifts",
      desc: "Local shifts with flexible working hours designed to fit your lifestyle and family commitments.",
    },
    {
      icon: "💷",
      title: "Competitive Pay",
      desc: "Weekly or monthly payment options with holiday pay and competitive rates across all grades.",
    },
    {
      icon: "🏥",
      title: "NHS Opportunities",
      desc: "Access to roles in NHS trusts and leading private healthcare providers across North-West England.",
    },
    {
      icon: "📋",
      title: "Compliance Support",
      desc: "We handle enhanced DBS checks and mandatory training including manual handling certification.",
    },
    {
      icon: "📈",
      title: "Career Growth",
      desc: "Ongoing training, mentorship, and career development opportunities for all our healthcare workers.",
    },
  ];

  return (
    <section
      id="about"
      ref={ref}
      style={{ padding: "100px 8%", background: "#fafbff" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Section header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 64,
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(20px)",
            transition: "all 0.7s ease",
          }}
        >
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "#C4972A",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            WHY EVS HEALTHCARE
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
              fontWeight: 900,
              color: "#0f1d3d",
              marginBottom: 16,
            }}
          >
            Your Career, Our Commitment
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "#64748b",
              fontSize: 16,
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            As a 24/7 agency supplying both private and public sectors, we give
            you a wide variety of work environments to choose from.
          </p>
        </div>

        {/* Feature cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 28,
          }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: 20,
                padding: "32px 28px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                border: "1px solid #f0f2f8",
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(30px)",
                transition: `all 0.7s ease ${0.1 + i * 0.1}s`,
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 16px 40px rgba(196,151,42,0.15)";
                e.currentTarget.style.borderColor = "#C4972A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow =
                  "0 4px 24px rgba(0,0,0,0.06)";
                e.currentTarget.style.borderColor = "#f0f2f8";
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background:
                    "linear-gradient(135deg, rgba(196,151,42,0.15), rgba(196,151,42,0.05))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  marginBottom: 20,
                }}
              >
                {f.icon}
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#0f1d3d",
                  marginBottom: 10,
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#64748b",
                  fontSize: 14,
                  lineHeight: 1.7,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
