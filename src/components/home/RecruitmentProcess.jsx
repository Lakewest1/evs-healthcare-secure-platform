import { useInView } from "../../hooks/useInView";

export default function RecruitmentProcess() {
  const [ref, inView] = useInView(0.2);

  const steps = [
    {
      num: "01",
      title: "Apply Online",
      desc: "Submit your application with basic details and your preferred role type.",
      icon: "📝",
    },
    {
      num: "02",
      title: "Upload Your CV",
      desc: "Share your CV and relevant certifications securely through our portal.",
      icon: "📄",
    },
    {
      num: "03",
      title: "Interview",
      desc: "Meet with our dedicated team for a quick and professional interview.",
      icon: "🤝",
    },
    {
      num: "04",
      title: "Compliance Checks",
      desc: "We process your enhanced DBS check and verify all required documents.",
      icon: "✅",
    },
    {
      num: "05",
      title: "Job Placement",
      desc: "Get placed in a role that matches your skills, location, and preferences.",
      icon: "🎯",
    },
  ];

  return (
    <section
      ref={ref}
      style={{
        padding: "100px 8%",
        background: "linear-gradient(135deg, #0f1d3d 0%, #1a2d5a 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative circle */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(196,151,42,0.05)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Section header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 64,
            opacity: inView ? 1 : 0,
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
            HOW IT WORKS
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
              fontWeight: 900,
              color: "#fff",
            }}
          >
            Your Path to Placement
          </h2>
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {steps.map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 32,
                alignItems: "flex-start",
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateX(-30px)",
                transition: `all 0.7s ease ${i * 0.15}s`,
              }}
            >
              {/* Number + connector line */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #C4972A, #8B6914)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 900,
                    fontSize: 18,
                    color: "#fff",
                    boxShadow: "0 8px 24px rgba(196,151,42,0.35)",
                    flexShrink: 0,
                  }}
                >
                  {s.num}
                </div>
                {i < steps.length - 1 && (
                  <div
                    style={{
                      width: 2,
                      flex: 1,
                      minHeight: 40,
                      background:
                        "linear-gradient(to bottom, rgba(196,151,42,0.6), rgba(196,151,42,0.1))",
                      margin: "8px 0",
                    }}
                  />
                )}
              </div>

              {/* Step content */}
              <div
                style={{
                  paddingBottom: i < steps.length - 1 ? 32 : 0,
                  paddingTop: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 8,
                  }}
                >
                  <span style={{ fontSize: 22 }}>{s.icon}</span>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#f0c060",
                    }}
                  >
                    {s.title}
                  </h3>
                </div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: 14,
                    lineHeight: 1.7,
                    maxWidth: 480,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
