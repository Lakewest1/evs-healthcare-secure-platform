import { motion } from "framer-motion";

export default function JobFilters({ filters, active, setActive }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
        marginBottom: "32px",
        paddingBottom: "16px",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      {filters.map((f) => (
        <motion.button
          key={f.key}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActive(f.key)}
          style={{
            padding: "8px 20px",
            borderRadius: "40px",
            border: active === f.key ? "none" : "1px solid rgba(0,0,0,0.1)",
            background: active === f.key ? "linear-gradient(135deg, #C4972A, #8B6914)" : "transparent",
            color: active === f.key ? "#fff" : "#64748b",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          {f.label}
          <span
            style={{
              marginLeft: "8px",
              opacity: 0.7,
              fontSize: "11px",
            }}
          >
            ({f.count})
          </span>
        </motion.button>
      ))}
    </div>
  );
}