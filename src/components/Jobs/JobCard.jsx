import { motion } from "framer-motion";
import { useState } from "react";

export default function JobCard({ job, index }) {
  const [isSaved, setIsSaved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "24px",
        border: `1px solid ${isHovered ? "rgba(196,151,42,0.25)" : "rgba(0,0,0,0.06)"}`,
        boxShadow: isHovered
          ? "0 12px 24px -12px rgba(0,0,0,0.12)"
          : "0 4px 12px rgba(0,0,0,0.04)",
        position: "relative",
        cursor: "pointer",
        transition: "all 0.25s ease",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Row - Icon & Save Button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "14px",
            background: "linear-gradient(135deg, rgba(196,151,42,0.12), rgba(196,151,42,0.04))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "26px",
          }}
        >
          {job.icon}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault();
            setIsSaved(!isSaved);
          }}
          style={{
            border: "none",
            background: isSaved ? "#C4972A" : "rgba(0,0,0,0.05)",
            borderRadius: "50%",
            width: 34,
            height: 34,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={isSaved ? "#fff" : "none"}
            stroke={isSaved ? "#fff" : "#64748b"}
            strokeWidth="2"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </motion.button>
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: "18px",
          fontWeight: 700,
          marginTop: "16px",
          marginBottom: "6px",
          color: "#0f172a",
          letterSpacing: "-0.01em",
        }}
      >
        {job.title}
      </h3>

      {/* Type */}
      <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "16px", fontWeight: 500 }}>
        {job.type}
      </p>

      {/* Location */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4972A" strokeWidth="1.8">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span style={{ fontSize: "13px", color: "#475569" }}>{job.location}</span>
      </div>

      {/* Pay */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4972A" strokeWidth="1.8">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
        <span style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>{job.pay}</span>
        <motion.div
          animate={{ width: isHovered ? `${(job.payValue / 30) * 100}%` : "0%" }}
          transition={{ duration: 0.4 }}
          style={{
            height: "3px",
            background: "linear-gradient(90deg, #C4972A, #f0c060)",
            borderRadius: "2px",
            flex: 1,
            maxWidth: "60px",
          }}
        />
      </div>

      {/* Shift */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4972A" strokeWidth="1.8">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span style={{ fontSize: "12px", color: "#64748b" }}>{job.shift}</span>
      </div>

      {/* Experience Tag - Appears on Hover */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? "auto" : 0 }}
        transition={{ duration: 0.2 }}
        style={{ overflow: "hidden", marginBottom: "12px" }}
      >
        <div
          style={{
            background: "rgba(196,151,42,0.1)",
            padding: "4px 10px",
            borderRadius: "10px",
            display: "inline-block",
          }}
        >
          <span style={{ fontSize: "11px", color: "#C4972A", fontWeight: 500 }}>
            📋 {job.experience}
          </span>
        </div>
      </motion.div>

      {/* Urgent Badge */}
      {job.urgent && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            fontSize: "10px",
            padding: "4px 12px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, #ef4444, #dc2626)",
            color: "#fff",
            fontWeight: 700,
            letterSpacing: "0.5px",
            boxShadow: "0 2px 8px rgba(239,68,68,0.3)",
          }}
        >
          🔥 URGENT
        </motion.div>
      )}

      {/* CTA Button */}
      <motion.a
        href="#register"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        style={{
          display: "block",
          marginTop: "auto",
          textAlign: "center",
          padding: "10px 16px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #0f172a, #1e293b)",
          color: "#fff",
          textDecoration: "none",
          fontSize: "13px",
          fontWeight: 600,
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "linear-gradient(135deg, #C4972A, #8B6914)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "linear-gradient(135deg, #0f172a, #1e293b)";
        }}
      >
        Apply for This Role →
      </motion.a>
    </motion.article>
  );
}