import EVSLogo from "../EVSLogo";

export default function Footer() {
  return (
    <footer style={{ background: "#080f1f", padding: "40px 8%" }}>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <EVSLogo size={36} />
          <div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: 13,
                color: "#fff",
              }}
            >
              EVS HEALTHCARE LTD
            </div>
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: 10,
                color: "#C4972A",
              }}
            >
              We care in time.
            </div>
          </div>
        </div>

        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "rgba(255,255,255,0.4)",
            fontSize: 12,
          }}
        >
          © 2025 EVS Healthcare Solutions Limited. Company No. registered in
          England & Wales. GDPR Compliant.
        </div>

        <div style={{ display: "flex", gap: 20 }}>
          {["Privacy Policy", "GDPR", "Terms"].map((l) => (
            <a
              key={l}
              href="#"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(255,255,255,0.45)",
                fontSize: 12,
                textDecoration: "none",
              }}
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
