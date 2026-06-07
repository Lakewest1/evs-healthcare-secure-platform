export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/447466999218"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 999,
        width: 58,
        height: 58,
        borderRadius: "50%",
        background: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 8px 24px rgba(37,211,102,0.45)",
        fontSize: 28,
        animation: "waPulse 3s infinite",
        textDecoration: "none",
      }}
    >
      💬
      <style>{`
        @keyframes waPulse {
          0%, 100% { box-shadow: 0 8px 24px rgba(37,211,102,0.45); }
          50% { box-shadow: 0 8px 36px rgba(37,211,102,0.7), 0 0 0 8px rgba(37,211,102,0.12); }
        }
      `}</style>
    </a>
  );
}
