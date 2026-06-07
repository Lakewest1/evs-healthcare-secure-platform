import { useState } from "react";
import { useInView } from "../../hooks/useInView";

export default function FAQ() {
  const [ref, inView] = useInView(0.1);
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      q: "Do I need experience to apply?",
      a: "Not necessarily. If you have at least 5 months of care experience, you may be eligible for immediate start. For candidates without experience, we offer mandatory training including manual handling onsite and care certification to get you work-ready.",
    },
    {
      q: "How quickly can I be placed?",
      a: "Candidates with relevant experience can often be placed within days of completing compliance checks. We work as fast as possible to match you with appropriate local shifts.",
    },
    {
      q: "What types of roles do you recruit for?",
      a: "We recruit for Healthcare Care Assistants, Support Workers, Social Workers, RGN and RMN Nurses, Domestic Workers, and other care sector roles on both temporary and permanent basis.",
    },
    {
      q: "Do you cover enhanced DBS checks?",
      a: "Yes, we assist with the enhanced DBS application process. We guide you through every step to ensure you're fully compliant before your first shift.",
    },
    {
      q: "What is the pay structure?",
      a: "We offer competitive pay rates with both weekly and monthly payment options. Holiday pay is included and rates vary by role and grade. Contact us for specific salary information for your role.",
    },
    {
      q: "What areas do you cover?",
      a: "Our primary coverage is across the North-West of England, with a particular focus on Preston and surrounding Lancashire areas. Most of our shifts are local to where you live.",
    },
  ];

  return (
    <section
      ref={ref}
      style={{ padding: "100px 8%", background: "#fafbff" }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Section header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 60,
            opacity: inView ? 1 : 0,
            transition: "all 0.7s",
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
            FAQ
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem,3vw,2.6rem)",
              fontWeight: 900,
              color: "#0f1d3d",
            }}
          >
            Common Questions
          </h2>
        </div>

        {/* Accordion items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {faqs.map((f, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                border: `1px solid ${open === i ? "#C4972A" : "#eef0f8"}`,
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(15px)",
                transition: `opacity 0.6s ease ${i * 0.07}s, transform 0.6s ease ${i * 0.07}s, border-color 0.2s`,
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "22px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: 15,
                    color: "#0f1d3d",
                  }}
                >
                  {f.q}
                </span>
                <span
                  style={{
                    color: "#C4972A",
                    fontSize: 20,
                    flexShrink: 0,
                    transition: "transform 0.3s",
                    transform: open === i ? "rotate(45deg)" : "none",
                  }}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div
                  style={{
                    padding: "0 24px 22px",
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#64748b",
                    fontSize: 14,
                    lineHeight: 1.8,
                  }}
                >
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
