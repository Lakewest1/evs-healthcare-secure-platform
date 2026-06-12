import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  Mail, 
  Star, 
  Building2, 
  CheckCircle, 
  MessageCircle,
  ArrowRight,
  Sparkles,
  Shield,
  Users,
  Award,
  ClipboardCheck,
  BadgeCheck,
  Heart
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Premium CTA Section — Enterprise-Grade Call to Action
// Features: 3D parallax, animated particles, floating elements, magnetic buttons
// FIXED: NHS-compliant trust indicators (no unauthorised "NHS Approved" claims)
// ─────────────────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.3) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold, margin: "-50px 0px" });
  return [ref, isInView];
}

// ─────────────────────────────────────────────────────────────────────────────
// Magnetic Button Component with Advanced Haptics
// ─────────────────────────────────────────────────────────────────────────────
function MagneticButton({ children, href, variant = "primary", icon: IconComponent, onClick }) {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const buttonStyles = {
    primary: {
      background: "linear-gradient(135deg, #ffffff, #fefaf5)",
      color: "#0f1d3d",
      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
      hoverShadow: "0 15px 40px rgba(0,0,0,0.25)",
    },
    secondary: {
      background: "linear-gradient(135deg, #25D366, #128C7E)",
      color: "#fff",
      boxShadow: "0 8px 24px rgba(37,211,102,0.3)",
      hoverShadow: "0 15px 40px rgba(37,211,102,0.4)",
    },
  };

  const currentStyle = buttonStyles[variant];

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      target={variant === "secondary" ? "_blank" : "_self"}
      rel={variant === "secondary" ? "noopener noreferrer" : ""}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{
        x: position.x,
        y: position.y,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        background: currentStyle.background,
        color: currentStyle.color,
        padding: "16px 40px",
        borderRadius: "60px",
        fontFamily: "'Inter', sans-serif",
        fontWeight: 700,
        fontSize: "clamp(14px, 1.5vw, 15px)",
        textDecoration: "none",
        boxShadow: isHovered ? currentStyle.hoverShadow : currentStyle.boxShadow,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Ripple Effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background: `radial-gradient(circle, rgba(255,255,255,0.3), transparent)`,
              borderRadius: "60px",
            }}
          />
        )}
      </AnimatePresence>

      {IconComponent && <IconComponent size={18} strokeWidth={1.8} />}
      <span>{children}</span>
      
      {/* Arrow Animation on Hover */}
      <motion.span
        animate={{ x: isHovered ? 5 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowRight size={16} />
      </motion.span>
    </motion.a>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main CTA Component with Premium Effects
// ─────────────────────────────────────────────────────────────────────────────
export default function CTA() {
  const [ref, inView] = useReveal(0.2);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [particles, setParticles] = useState([]);
  const controls = useAnimation();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);

  // Create floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1.5,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      angle: Math.random() * 360,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0, 20, 0],
      rotate: [0, 5, 0, -5, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // FIXED: NHS-compliant trust indicators
  // Replaced "NHS Approved" (which could imply unauthorised endorsement)
  // with accurate, defensible claims
  const trustIndicators = [
    { 
      icon: Users, 
      text: "500+ Workers Placed", 
      color: "#C4972A",
      description: "Healthcare professionals placed across North-West England"
    },
    { 
      icon: Shield, 
      text: "CQC Compliant", 
      color: "#00A859",
      description: "Registered with Care Quality Commission"
    },
    { 
      icon: Heart, 
      text: "Free DBS Support", 
      color: "#10b981",
      description: "Enhanced DBS application assistance"
    },
  ];

  // Alternative if actually registered as NHS framework supplier:
  // const trustIndicators = [
  //   { icon: Users, text: "500+ Workers Placed", color: "#C4972A" },
  //   { icon: Building2, text: "NHS Framework Supplier", color: "#005EB8" },
  //   { icon: Heart, text: "Free DBS Support", color: "#10b981" },
  // ];

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("01772 493994");
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("admin_1@evshealthcare.co.uk");
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        padding: "clamp(80px, 15vh, 120px) clamp(16px, 5vw, 80px)",
        background: "linear-gradient(135deg, #0f1d3d 0%, #1a2a50 50%, #0f1d3d 100%)",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      {/* Animated Gradient Background */}
      <motion.div
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(196,151,42,0.12), transparent 50%)`,
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          animate={{
            y: [0, -80, 0],
            x: [0, Math.sin(particle.angle) * 60, 0],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(196,151,42,${0.25 + particle.id * 0.005}), transparent)`,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}

      {/* Animated Gradient Orbs */}
      <motion.div
        style={{ y }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-30%",
          right: "-20%",
          width: "60vw",
          height: "60vw",
          maxWidth: 600,
          maxHeight: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,151,42,0.06), transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]) }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          position: "absolute",
          bottom: "-30%",
          left: "-20%",
          width: "50vw",
          height: "50vw",
          maxWidth: 500,
          maxHeight: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(100,100,255,0.04), transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Top Animated Border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "linear-gradient(90deg, transparent, #C4972A, #f0c060, #C4972A, transparent)",
          transformOrigin: "left",
          zIndex: 1,
        }}
      />

      {/* Bottom Animated Border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "linear-gradient(90deg, transparent, #C4972A, #f0c060, #C4972A, transparent)",
          transformOrigin: "right",
          zIndex: 1,
        }}
      />

      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          style={{ textAlign: "center" }}
        >
          {/* Floating Decorative Star */}
          <motion.div
            variants={floatingVariants}
            animate="animate"
            style={{
              position: "absolute",
              top: -30,
              left: "50%",
              transform: "translateX(-50%)",
              width: 60,
              height: 60,
              opacity: 0.25,
              pointerEvents: "none",
            }}
          >
            <Sparkles size={50} strokeWidth={1} style={{ color: "#C4972A" }} />
          </motion.div>

          {/* Main Heading with Animated Gradient */}
          <motion.h2
            variants={itemVariants}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.03em",
              marginBottom: 20,
              lineHeight: 1.2,
            }}
          >
            Ready to Start Your{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #C4972A, #f0c060, #e8b84a, #C4972A)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradientShift 3s linear infinite",
              }}
            >
              Healthcare Career?
            </span>
          </motion.h2>

          {/* Animated Underline */}
          <motion.div
            variants={itemVariants}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              width: 100,
              height: 3,
              background: "linear-gradient(90deg, #C4972A, #f0c060, #C4972A)",
              borderRadius: 999,
              margin: "0 auto 24px",
            }}
          />

          {/* Description */}
          <motion.p
            variants={itemVariants}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(14px, 1.6vw, 16px)",
              color: "rgba(255,255,255,0.85)",
              maxWidth: 560,
              margin: "0 auto 40px",
              lineHeight: 1.7,
            }}
          >
            Whether you're experienced or just starting out — at EVS Healthcare,
            there's a chance for everyone. Join our growing team of healthcare
            professionals today.
          </motion.p>

          {/* Trust Indicators - NHS COMPLIANT (No unauthorised NHS claims) */}
          <motion.div
            variants={itemVariants}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 20,
              marginBottom: 40,
              flexWrap: "wrap",
            }}
          >
            {trustIndicators.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + idx * 0.1 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(10px)",
                  padding: "8px 20px",
                  borderRadius: "40px",
                  border: "1px solid rgba(196,151,42,0.2)",
                }}
              >
                <item.icon size={14} style={{ color: item.color }} />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  {item.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            style={{
              display: "flex",
              gap: 20,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <MagneticButton
              href="#register"
              variant="primary"
              icon={ClipboardCheck}
            >
              Apply Today
            </MagneticButton>

            <MagneticButton
              href="https://wa.me/447466999218"
              variant="secondary"
              icon={MessageCircle}
            >
              WhatsApp Us
            </MagneticButton>
          </motion.div>

          {/* Contact Info Note */}
          <motion.div
            variants={itemVariants}
            style={{
              marginTop: 40,
              paddingTop: 24,
              borderTop: "1px solid rgba(255,255,255,0.08)",
              display: "inline-flex",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.04)",
                padding: "8px 20px",
                borderRadius: "40px",
                cursor: "pointer",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onClick={handleCopyPhone}
            >
              <Phone size={14} style={{ color: "#C4972A" }} />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                01772 493994
              </span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.04)",
                padding: "8px 20px",
                borderRadius: "40px",
                cursor: "pointer",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onClick={handleCopyEmail}
            >
              <Mail size={14} style={{ color: "#C4972A" }} />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                admin_1@evshealthcare.co.uk
              </span>
            </motion.div>
          </motion.div>

          {/* Bottom Decorative Element */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{
              marginTop: "clamp(40px, 6vh, 50px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
            }}
          >
            <div style={{ width: 60, height: 1, background: "rgba(196,151,42,0.3)", borderRadius: 999 }} />
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#C4972A",
                boxShadow: "0 0 12px rgba(196,151,42,0.6)",
              }}
            />
            <div style={{ width: 60, height: 1, background: "rgba(196,151,42,0.3)", borderRadius: 999 }} />
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}