import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MessageCircle, X, ChevronRight, Clock, CheckCircle, Users, Award } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Floating WhatsApp Button — Professional Healthcare Support
// Features: Pulse animation, hover effects, optional tooltip, responsive
// ─────────────────────────────────────────────────────────────────────────────

export default function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Show tooltip after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 5000);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleCloseTooltip = (e) => {
    e.stopPropagation();
    setShowTooltip(false);
  };

  const whatsappNumber = "447466999218";
  const whatsappMessage = "Hello! I'm interested in learning more about EVS Healthcare opportunities.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <style>{`
        @keyframes waPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4);
          }
          70% {
            box-shadow: 0 0 0 12px rgba(37, 211, 102, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
          }
        }
        
        @keyframes waRing {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.3);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .wa-pulse, .wa-ring {
            animation: none !important;
          }
        }
      `}</style>

      {/* Tooltip / Quick Message Card */}
      <AnimatePresence>
        {showTooltip && !isMobile && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{
              position: "fixed",
              bottom: 100,
              right: 28,
              zIndex: 998,
              background: "#ffffff",
              borderRadius: "20px",
              boxShadow: "0 12px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
              width: 280,
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() => window.open(whatsappLink, "_blank")}
          >
            {/* Header */}
            <div
              style={{
                background: "#25D366",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MessageCircle size={18} style={{ color: "#fff" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  WhatsApp Support
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 10,
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  Online · Usually replies in minutes
                </div>
              </div>
              <button
                onClick={handleCloseTooltip}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "none",
                  borderRadius: "50%",
                  width: 24,
                  height: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#fff",
                }}
              >
                <X size={12} />
              </button>
            </div>

            {/* Content */}
            <div style={{ padding: "14px 16px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#22c55e",
                    animation: "waPulse 1.5s infinite",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    color: "#64748b",
                  }}
                >
                  We typically reply within 5 minutes
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: "#1e293b",
                  lineHeight: 1.5,
                  marginBottom: 12,
                }}
              >
                👋 Hi! Got questions about jobs, pay, or compliance? Chat with our team directly on WhatsApp.
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: 8,
                  borderTop: "1px solid #e2e8f0",
                }}
              >
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Clock size={10} style={{ color: "#94a3b8" }} />
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 10,
                        color: "#94a3b8",
                      }}
                    >
                      24/7
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <CheckCircle size={10} style={{ color: "#94a3b8" }} />
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 10,
                        color: "#94a3b8",
                      }}
                    >
                      Free
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    color: "#25D366",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    Chat Now
                  </span>
                  <ChevronRight size={12} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp Button */}
      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          scale: isHovered ? 1.08 : 1,
          rotate: isHovered ? [0, -5, 5, 0] : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 20,
          rotate: { duration: 0.3 },
        }}
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          zIndex: 999,
          width: isMobile ? 52 : 58,
          height: isMobile ? 52 : 58,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #25D366, #128C7E)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 24px rgba(37,211,102,0.35)",
          textDecoration: "none",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
      >
        {/* Pulsing rings */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "rgba(37,211,102,0.3)",
            animation: "waPulse 1.8s infinite",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "rgba(37,211,102,0.15)",
            animation: "waRing 2s infinite",
            pointerEvents: "none",
            animationDelay: "0.5s",
          }}
        />

        {/* Inner icon container */}
        <motion.div
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.2 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MessageCircle
            size={isMobile ? 26 : 30}
            strokeWidth={1.8}
            style={{ color: "#fff" }}
          />
        </motion.div>

        {/* Small notification badge */}
        <div
          style={{
            position: "absolute",
            top: -4,
            right: -4,
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#ef4444",
            border: "2px solid #fff",
            zIndex: 1,
          }}
        />
      </motion.a>

      {/* CSS for reduced motion */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .wa-pulse, .wa-ring {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}