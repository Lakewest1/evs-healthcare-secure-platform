import { useState } from "react";
import { useInView } from "../../hooks/useInView";

export default function Testimonials() {
  const [ref, inView] = useInView(0.2);
  const [active, setActive] = useState(0);

  const testimonials = [
    {
      name: "Amara O.",
      role: "Registered Nurse",
      text: "EVS Healthcare placed me within two weeks of registering. The team was professional, handled all my compliance paperwork, and I'm now working regular shifts locally. Couldn't be happier.",
      rating: 5,
    },
    {
      name: "David M.",
      role: "Healthcare Care Assistant",
      text: "I had no previous care experience but EVS gave me mandatory training and helped me get my DBS. Within a month I was working and loving every shift. They truly care.",
      rating: 5,
    },
    {
      name: "Fatima K.",
      role: "Support Worker",
      text: "The flexible working hours are a lifesaver for me as a single mum. EVS understood my situation and found local shifts that work around my family. The weekly pay is brilliant.",
      rating: 5,
    },
  ];

  const t = testimonials[active];

  return (
    <section
      ref={ref}
      style={{
        padding: "100px 8%",
        background: "linear-gradient(135deg, #fef9f0 0%, #fafbff 100%)",
      }}
    >
      <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
        {/* Section label */}
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "#C4972A",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 12,
            opacity: inView ? 1 : 0,
            transition: "all 0.7s",
          }}
        >
          TESTIMONIALS
        </div>

        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.8rem,3vw,2.6rem)",
            fontWeight: 900,
            color: "#0f1d3d",
            marginBottom: 60,
            opacity: inView ? 1 : 0,
            transition: "all 0.7s 0.1s",
          }}
        >
          What Our Workers Say
        </h2>

        {/* Testimonial card */}
        <div
          style={{
            background: "#fff",
            borderRadius: 28,
            padding: "52px 48px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
            position: "relative",
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(20px)",
            transition: "all 0.7s ease 0.2s",
          }}
        >
          <div
            style={{
              fontSize: 56,
              color: "#f0c060",
              fontFamily: "Georgia, serif",
              lineHeight: 0.6,
              marginBottom: 28,
              opacity: 0.6,
            }}
          >
            "
          </div>
          <p
            style={{
              fontFamily: "'Crimson Text', Georgia, serif",
              fontSize: "clamp(1.1rem,2vw,1.35rem)",
              color: "#374151",
              lineHeight: 1.8,
              fontStyle: "italic",
              marginBottom: 36,
            }}
          >
            {t.text}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              marginBottom: 20,
            }}
          >
            {Array.from({ length: t.rating }).map((_, i) => (
              <span key={i} style={{ color: "#f0c060", fontSize: 18 }}>
                ★
              </span>
            ))}
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              color: "#0f1d3d",
              fontSize: 16,
            }}
          >
            {t.name}
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "#C4972A",
              fontSize: 13,
              marginTop: 4,
            }}
          >
            {t.role}
          </div>
        </div>

        {/* Navigation dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginTop: 32,
          }}
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? 28 : 10,
                height: 10,
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                background: i === active ? "#C4972A" : "#d1d5db",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
