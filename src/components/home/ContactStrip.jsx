import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation, useScroll, useTransform, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// Premium Contact Strip — Modern Contact Information Display
// Features: Floating cards, hover effects, animated icons, gradient borders
// ─────────────────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.3) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return [ref, isInView];
}

const contacts = [
  { 
    id: 1,
    icon: "📍", 
    label: "Office Address", 
    value: "1a John William Street, Preston, PR1 4XE",
    action: "Get Directions",
    link: "#",
  },
  { 
    id: 2,
    icon: "📞", 
    label: "Phone", 
    value: "01772 493994 / 07466 999218",
    action: "Call Now",
    link: "tel:01772493994",
  },
  { 
    id: 3,
    icon: "✉️", 
    label: "Email", 
    value: "admin_1@evshealthcare.co.uk",
    action: "Send Message",
    link: "mailto:admin_1@evshealthcare.co.uk",
  },
  { 
    id: 4,
    icon: "🌐", 
    label: "Website", 
    value: "www.evshealthcare.co.uk",
    action: "Visit Website",
    link: "https://www.evshealthcare.co.uk",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Modern Contact Card Component
// ─────────────────────────────────────────────────────────────────────────────
function ContactCard({ contact, index, isInView }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const cardRef = useRef(null);
  const controls = useAnimation();

  // Staggered animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        perspective: "1000px",
      }}
    >
      <motion.div
        animate={{
          rotateY: isHovered ? 5 : 0,
          rotateX: isHovered ? 5 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          position: "relative",
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(10px)",
          borderRadius: "24px",
          padding: "24px",
          height: "100%",
          border: `1px solid ${isHovered ? "rgba(196,151,42,0.4)" : "rgba(255,255,255,0.08)"}`,
          transition: "all 0.3s ease",
          cursor: "pointer",
        }}
      >
        {/* Animated Gradient Border on Hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "24px",
                padding: "2px",
                background: "linear-gradient(135deg, #C4972A, #f0c060, #C4972A)",
                opacity: 0,
                pointerEvents: "none",
              }}
            >
              <div style={{ background: "#0f1d3d", borderRadius: "22px", width: "100%", height: "100%" }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Icon Container with Pulse Animation */}
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? [0, -5, 5, 0] : 0,
          }}
          transition={{ duration: 0.5, type: "spring" }}
          style={{
            width: 56,
            height: 56,
            borderRadius: "16px",
            background: `linear-gradient(135deg, rgba(196,151,42,0.2), rgba(196,151,42,0.05))`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            marginBottom: 20,
            position: "relative",
          }}
        >
          {contact.icon}
          
          {/* Pulsing Ring */}
          {isHovered && (
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "16px",
                border: "2px solid #C4972A",
                pointerEvents: "none",
              }}
            />
          )}
        </motion.div>

        {/* Label */}
        <motion.div
          animate={{
            color: isHovered ? "#C4972A" : "rgba(255,255,255,0.5)",
            x: isHovered ? 3 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          {contact.label}
        </motion.div>

        {/* Value */}
        <motion.div
          animate={{
            y: isHovered ? -2 : 0,
          }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            fontWeight: 500,
            color: "#fff",
            lineHeight: 1.5,
            marginBottom: 16,
            wordBreak: "break-word",
          }}
        >
          {contact.value}
        </motion.div>

        {/* Action Button */}
        <motion.a
          href={contact.link}
          target={contact.label === "Website" ? "_blank" : "_self"}
          rel="noopener noreferrer"
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.98 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            fontWeight: 600,
            color: "#C4972A",
            textDecoration: "none",
            background: "rgba(196,151,42,0.1)",
            padding: "6px 14px",
            borderRadius: "20px",
            transition: "all 0.3s ease",
          }}
          onClick={(e) => {
            if (contact.label !== "Website" && contact.label !== "Phone") {
              e.preventDefault();
              handleCopy(contact.value);
            }
          }}
        >
          <span>{contact.label === "Email" ? (isCopied ? "Copied!" : contact.action) : contact.action}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </motion.a>

        {/* Decorative Corner */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.3 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
            width: 30,
            height: 30,
            borderRight: "2px solid #C4972A",
            borderBottom: "2px solid #C4972A",
            borderRadius: "0 0 12px 0",
            pointerEvents: "none",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Contact Strip Component
// ─────────────────────────────────────────────────────────────────────────────
export default function ContactStrip() {
  const [ref, inView] = useReveal(0.2);
  const headerControls = useAnimation();
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.3]);

  useEffect(() => {
    if (inView) {
      headerControls.start("visible");
    }
  }, [inView, headerControls]);

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        position: "relative",
        padding: "clamp(60px, 12vh, 100px) clamp(16px, 5vw, 80px)",
        background: "linear-gradient(135deg, #0a1628 0%, #0f1d3d 50%, #1a2a4a 100%)",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Pattern */}
      <motion.div
        style={{ y: backgroundY, opacity }}
        aria-hidden="true"
        css={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(196,151,42,0.08) 0%, transparent 50%),
            repeating-linear-gradient(45deg, rgba(196,151,42,0.03) 0px, rgba(196,151,42,0.03) 1px, transparent 1px, transparent 30px)
          `,
          backgroundSize: "100% 100%, 40px 40px",
          pointerEvents: "none",
        }}
      />

      {/* Floating Decorative Orbs */}
      <motion.div
        animate={{
          y: [0, -50, 0, 50, 0],
          x: [0, 30, 0, -30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,151,42,0.05), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{
          y: [0, 50, 0, -50, 0],
          x: [0, -30, 0, 30, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,151,42,0.04), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Top Animated Border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, #C4972A, #f0c060, #C4972A, transparent)",
          transformOrigin: "left",
        }}
      />

      {/* Bottom Animated Border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, #C4972A, #f0c060, #C4972A, transparent)",
          transformOrigin: "right",
        }}
      />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        
        {/* Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={headerControls}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: 30 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                height: 2,
                background: "#C4972A",
                borderRadius: 999,
              }}
            />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "#C4972A",
              }}
            >
              Get In Touch
            </span>
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: 30 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                height: 2,
                background: "#C4972A",
                borderRadius: 999,
              }}
            />
          </div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.02em",
              marginBottom: 12,
            }}
          >
            Connect With{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #C4972A, #f0c060)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              EVS Healthcare
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 500,
              margin: "0 auto",
              lineHeight: 1.65,
            }}
          >
            Reach out to our team for any inquiries, support, or career opportunities
          </motion.p>
        </motion.div>

        {/* Contact Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 24,
          }}
        >
          {contacts.map((contact, index) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              index={index}
              isInView={inView}
            />
          ))}
        </div>

        {/* Bottom Decorative Line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            marginTop: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <div style={{ width: 60, height: 1, background: "rgba(196,151,42,0.3)", borderRadius: 999 }} />
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#C4972A",
              boxShadow: "0 0 10px rgba(196,151,42,0.6)",
            }}
          />
          <div style={{ width: 60, height: 1, background: "rgba(196,151,42,0.3)", borderRadius: 999 }} />
        </motion.div>
      </div>
    </section>
  );
}