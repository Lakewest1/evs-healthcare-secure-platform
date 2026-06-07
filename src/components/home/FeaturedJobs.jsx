import { useInView } from "../../hooks/useInView";

export default function FeaturedJobs() {
  const [ref, inView] = useInView(0.1);

  const jobs = [
    {
      title: "Registered Nurse (RGN)",
      type: "Temporary / Permanent",
      location: "Preston, Lancashire",
      pay: "£18–£24/hr",
      urgent: true,
      icon: "👩‍⚕️",
    },
    {
      title: "Healthcare Care Assistant",
      type: "Flexible Shifts Available",
      location: "North-West England",
      pay: "£12–£15/hr",
      urgent: false,
      icon: "🏥",
    },
    {
      title: "Support Worker",
      type: "Temporary / Permanent",
      location: "Preston & Surrounding",
      pay: "£11–£14/hr",
      urgent: true,
      icon: "🤲",
    },
    {
      title: "RMN Mental Health Nurse",
      type: "Full Time / Part Time",
      location: "Lancashire Area",
      pay: "£22–£30/hr",
      urgent: false,
      icon: "🧠",
    },
    {
      title: "Senior Carer",
      type: "Immediate Start",
      location: "North-West England",
      pay: "£14–£17/hr",
      urgent: false,
      icon: "❤️",
    },
    {
      title: "Domestic Worker",
      type: "Flexible Hours",
      location: "Preston, Lancashire",
      pay: "£10.50–£12/hr",
      urgent: false,
      icon: "🌟",
    },
  ];

  return (
    <section
      id="jobs"
      ref={ref}
      style={{ padding: "100px 8%", background: "#fafbff" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Section header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 48,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div
            style={{
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
              OPEN POSITIONS
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
                fontWeight: 900,
                color: "#0f1d3d",
              }}
            >
              Featured Healthcare Jobs
            </h2>
          </div>
          <a
            href="#jobs"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "#C4972A",
              fontWeight: 600,
              fontSize: 14,
              textDecoration: "none",
              opacity: inView ? 1 : 0,
              transition: "all 0.7s ease 0.2s",
            }}
          >
            View All Jobs →
          </a>
        </div>

        {/* Job cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(310px,1fr))",
            gap: 24,
          }}
        >
          {jobs.map((j, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: 20,
                padding: "28px 24px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                border: "1px solid #eef0f8",
                position: "relative",
                overflow: "hidden",
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(30px)",
                transition: `all 0.7s ease ${0.1 + i * 0.1}s`,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 36px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(0,0,0,0.06)";
              }}
            >
              {/* Urgent badge */}
              {j.urgent && (
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    background: "#ef4444",
                    color: "#fff",
                    fontSize: 10,
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700,
                    letterSpacing: 1,
                    padding: "3px 10px",
                    borderRadius: 20,
                  }}
                >
                  URGENT
                </div>
              )}

              {/* Job icon + title */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background:
                      "linear-gradient(135deg, rgba(196,151,42,0.12), rgba(196,151,42,0.04))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                  }}
                >
                  {j.icon}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#0f1d3d",
                      marginBottom: 2,
                    }}
                  >
                    {j.title}
                  </h3>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12,
                      color: "#64748b",
                    }}
                  >
                    {j.type}
                  </span>
                </div>
              </div>

              {/* Location & pay */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  marginBottom: 20,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 13 }}>📍</span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      color: "#64748b",
                    }}
                  >
                    {j.location}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 13 }}>💷</span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      color: "#0f1d3d",
                      fontWeight: 600,
                    }}
                  >
                    {j.pay}
                  </span>
                </div>
              </div>

              {/* Apply button */}
              <a
                href="#register"
                style={{
                  display: "block",
                  textAlign: "center",
                  background: "linear-gradient(135deg, #0f1d3d, #1a2d5a)",
                  color: "#fff",
                  padding: "11px 20px",
                  borderRadius: 12,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.background =
                    "linear-gradient(135deg, #C4972A, #8B6914)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.background =
                    "linear-gradient(135deg, #0f1d3d, #1a2d5a)")
                }
              >
                Apply for This Role
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
