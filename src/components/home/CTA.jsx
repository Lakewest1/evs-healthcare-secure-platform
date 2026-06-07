import { useInView } from "../../hooks/useInView";

export default function CTA() {
  const [ref, inView] = useInView(0.3);

  return (
    <section
      ref={ref}
      style={{
        padding: "80px 8%",
        background:
          "linear-gradient(135deg, #C4972A 0%, #8B6914 50%, #6B4F0E 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Radial glow overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 70% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)",
        }}
      />

      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(20px)",
            transition: "all 0.7s",
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
              fontWeight: 900,
              color: "#fff",
              marginBottom: 16,
            }}
          >
            Ready to Start Your Healthcare Career?
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "rgba(255,255,255,0.85)",
              fontSize: 16,
              marginBottom: 36,
              lineHeight: 1.7,
            }}
          >
            Whether you're experienced or just starting out — at EVS Healthcare,
            there's a chance for everyone. Contact us today at 01772 493994 or
            apply online.
          </p>
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="#register"
              style={{
                background: "#fff",
                color: "#8B6914",
                padding: "15px 40px",
                borderRadius: 50,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: 15,
                textDecoration: "none",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.transform = "translateY(-3px)")
              }
              onMouseLeave={(e) => (e.target.style.transform = "")}
            >
              Apply Today
            </a>
            <a
              href="https://wa.me/447466999218"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#25D366",
                color: "#fff",
                padding: "15px 40px",
                borderRadius: 50,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: 15,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-3px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "")
              }
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
