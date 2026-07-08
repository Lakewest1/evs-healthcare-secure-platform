import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight, Briefcase, Users, Clock, Award, CheckCircle, ChevronRight, Building2 } from "lucide-react";
import { cityData } from "../data/cityData";

// ─────────────────────────────────────────────────────────────────────────────
// EVS Healthcare — Location Page
// ─────────────────────────────────────────────────────────────────────────────

const T = {
  navy: "#0f1d3d",
  navyLight: "#1a2a50",
  navyDeep: "#0a1628",
  gold: "#C4972A",
  goldDark: "#8B6914",
  goldLight: "#f0c060",
  white: "#ffffff",
  slate: "#475569",
  slateLight: "#64748b",
  border: "rgba(0,0,0,0.06)",
  borderGold: "rgba(196,151,42,0.2)",
};

const EASE = [0.16, 1, 0.3, 1];

// ─── Stats Data ──────────────────────────────────────────────────────────────
const STATS = [
  { value: "500+", label: "Healthcare Workers Placed", sub: "Across NHS & private sector", icon: Users },
  { value: "150+", label: "Partner Care Homes", sub: "UK-wide trusted network", icon: Building2 },
  { value: "98%", label: "Client Satisfaction Rate", sub: "Verified post-placement survey", icon: Award },
  { value: "24/7", label: "Support Available", sub: "Always here when you need us", icon: Clock },
];

// ─── 404 Fallback ────────────────────────────────────────────────────────────
const NotFoundFallback = () => (
  <div style={{
    minHeight: "60vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "80px 20px",
    background: "#f8fafc",
    fontFamily: "'Inter', sans-serif",
  }}>
    <h1 style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 900, color: T.gold, marginBottom: 8, lineHeight: 1 }}>
      404
    </h1>
    <h2 style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)", fontWeight: 700, color: T.navy, marginBottom: 12 }}>
      Location Not Found
    </h2>
    <p style={{ fontSize: 14, color: T.slateLight, maxWidth: 400, marginBottom: 24, lineHeight: 1.6 }}>
      The location you're looking for doesn't exist. Please check the URL or return to our homepage.
    </p>
    <Link
      to="/"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "14px 32px",
        borderRadius: 50,
        background: `linear-gradient(135deg, ${T.gold}, ${T.goldDark})`,
        color: T.navy,
        fontFamily: "'Inter', sans-serif",
        fontSize: 14,
        fontWeight: 700,
        textDecoration: "none",
        transition: "all 0.2s ease",
        boxShadow: "0 2px 8px rgba(196,151,42,0.25)",
      }}
    >
      Back to Home
    </Link>
  </div>
);

// ─── LocationPage ────────────────────────────────────────────────────────────
const LocationPage = ({ cityKey }) => {
  const data = cityData[cityKey];

  if (!data) {
    return <NotFoundFallback />;
  }

  // ─── JSON-LD Schema Markup ─────────────────────────────────────────────────
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    name: `EVS Healthcare Solution Ltd - ${data.city}`,
    description: data.metaDescription,
    areaServed: data.city,
    url: `https://www.evshealthcare.co.uk/${data.slug}`,
  };

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <Helmet>
        <title>{data.metaTitle}</title>
        <meta name="description" content={data.metaDescription} />
        <link rel="canonical" href={`https://www.evshealthcare.co.uk/${data.slug}`} />
        <meta property="og:title" content={data.metaTitle} />
        <meta property="og:description" content={data.metaDescription} />
        <meta property="og:url" content={`https://www.evshealthcare.co.uk/${data.slug}`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main style={{ fontFamily: "'Inter', sans-serif" }}>
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* HERO SECTION */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section
          style={{
            background: `linear-gradient(135deg, ${T.navyDeep} 0%, ${T.navy} 50%, ${T.navyLight} 100%)`,
            color: T.white,
            padding: "clamp(100px, 14vh, 140px) clamp(16px, 5vw, 80px) clamp(80px, 10vh, 100px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background ambient orbs */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-20%",
              right: "-10%",
              width: "clamp(300px, 40vw, 600px)",
              height: "clamp(300px, 40vw, 600px)",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(196,151,42,0.06), transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "-20%",
              left: "-10%",
              width: "clamp(300px, 40vw, 600px)",
              height: "clamp(300px, 40vw, 600px)",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(196,151,42,0.04), transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
            {/* Eyebrow - Company Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 20,
              }}
            >
              <span style={{ width: 30, height: 2, background: T.gold, borderRadius: 999 }} />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "4px",
                  textTransform: "uppercase",
                  color: T.gold,
                }}
              >
                EVS Healthcare Solution Ltd
              </span>
              <span style={{ width: 30, height: 2, background: T.gold, borderRadius: 999 }} />
            </motion.div>

            {/* H1 Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
                fontWeight: 800,
                color: T.white,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                marginBottom: 12,
              }}
            >
              Healthcare Recruitment in{" "}
              <span style={{
                background: `linear-gradient(135deg, ${T.gold}, ${T.goldLight}, #e8b84a)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {data.city}
              </span>
            </motion.h1>

            {/* Subheading - Company tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(13px, 1.1vw, 15px)",
                color: "rgba(255,255,255,0.6)",
                marginBottom: 16,
                fontWeight: 500,
              }}
            >
              EVS Healthcare Solution Ltd — NHS-Approved Recruitment Agency
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(14px, 1.3vw, 17px)",
                color: "rgba(255,255,255,0.8)",
                maxWidth: 640,
                margin: "0 auto 32px",
                lineHeight: 1.7,
              }}
            >
              {data.intro}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 14,
              }}
            >
              <Link
                to="/jobs"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 32px",
                  borderRadius: 50,
                  background: `linear-gradient(135deg, ${T.gold}, ${T.goldDark})`,
                  color: T.navy,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 4px 16px rgba(196,151,42,0.35)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(196,151,42,0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(196,151,42,0.35)";
                }}
              >
                View Jobs <ArrowRight size={16} />
              </Link>

              <Link
                to="/jobs"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 32px",
                  borderRadius: 50,
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(10px)",
                  border: "1.5px solid rgba(255,255,255,0.25)",
                  color: T.white,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.borderColor = "rgba(196,151,42,0.5)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Apply Now
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* STATS SECTION */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section
          style={{
            padding: "clamp(40px, 6vh, 60px) clamp(16px, 5vw, 80px)",
            background: T.white,
            borderBottom: `1px solid ${T.border}`,
          }}
        >
          <div
            style={{
              maxWidth: 1000,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "clamp(20px, 3vw, 32px)",
              textAlign: "center",
            }}
          >
            {STATS.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{
                    padding: "24px 16px",
                    borderRadius: 16,
                    background: "#f8fafc",
                    border: `1px solid ${T.border}`,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: "rgba(196,151,42,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 12px",
                      color: T.gold,
                    }}
                  >
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <div
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "clamp(1.6rem, 2.5vw, 2rem)",
                      fontWeight: 800,
                      color: T.gold,
                      marginBottom: 4,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      fontWeight: 600,
                      color: T.navy,
                      marginBottom: 4,
                    }}
                  >
                    {stat.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11,
                      color: T.slateLight,
                    }}
                  >
                    {stat.sub}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* ABOUT / LOCAL CONTEXT SECTION */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section
          style={{
            padding: "clamp(60px, 10vh, 100px) clamp(16px, 5vw, 80px)",
            background: T.white,
          }}
        >
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <span style={{ width: 30, height: 2, background: T.gold, borderRadius: 999 }} />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "4px",
                    textTransform: "uppercase",
                    color: T.gold,
                  }}
                >
                  About {data.city}
                </span>
                <span style={{ width: 30, height: 2, background: T.gold, borderRadius: 999 }} />
              </div>

              <h2
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  fontWeight: 800,
                  color: T.navy,
                  letterSpacing: "-0.02em",
                  marginBottom: 24,
                  lineHeight: 1.3,
                }}
              >
                Healthcare Staffing in{" "}
                <span style={{ color: T.gold }}>{data.city}</span>
              </h2>

              {data.localContext.map((paragraph, index) => (
                <p
                  key={index}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(14px, 1.1vw, 15px)",
                    color: T.slate,
                    lineHeight: 1.8,
                    marginBottom: 16,
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* ROLES SECTION */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section
          style={{
            padding: "clamp(60px, 10vh, 100px) clamp(16px, 5vw, 80px)",
            background: "#f8fafc",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top border accent */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background: `linear-gradient(90deg, transparent, ${T.gold}, ${T.goldLight}, ${T.gold}, transparent)`,
            }}
          />

          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ textAlign: "center", marginBottom: 48 }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <span style={{ width: 30, height: 2, background: T.gold, borderRadius: 999 }} />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "4px",
                    textTransform: "uppercase",
                    color: T.gold,
                  }}
                >
                  Open Roles
                </span>
                <span style={{ width: 30, height: 2, background: T.gold, borderRadius: 999 }} />
              </div>

              <h2
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  fontWeight: 800,
                  color: T.navy,
                  letterSpacing: "-0.02em",
                  marginBottom: 12,
                }}
              >
                Roles We Recruit For in{" "}
                <span style={{ color: T.gold }}>{data.city}</span>
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: T.slateLight,
                  maxWidth: 500,
                  margin: "0 auto",
                  lineHeight: 1.6,
                }}
              >
                We connect healthcare professionals with leading employers across {data.city}
              </p>
            </motion.div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: 16,
              }}
            >
              {data.roleFocus.map((role, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  style={{
                    background: T.white,
                    padding: "20px 24px",
                    borderRadius: 16,
                    border: `1px solid ${T.border}`,
                    borderLeft: `3px solid ${T.gold}`,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                    transition: "all 0.3s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
                    e.currentTarget.style.borderColor = T.borderGold;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
                    e.currentTarget.style.borderColor = T.border;
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: "rgba(196,151,42,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 12,
                      color: T.gold,
                    }}
                  >
                    <Briefcase size={18} strokeWidth={1.5} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 15,
                      fontWeight: 700,
                      color: T.navy,
                      marginBottom: 4,
                    }}
                  >
                    {role}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11,
                      color: T.gold,
                      fontWeight: 600,
                    }}
                  >
                    <MapPin size={11} />
                    {data.city}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pay band */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                marginTop: 32,
                padding: "16px 24px",
                background: T.white,
                borderRadius: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                border: `1px solid ${T.borderGold}`,
                width: "fit-content",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: T.slate,
                }}
              >
                Typical pay:
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: T.gold,
                }}
              >
                {data.payBand}
              </span>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* CTA SECTION */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section
          style={{
            padding: "clamp(60px, 10vh, 100px) clamp(16px, 5vw, 80px)",
            background: `linear-gradient(135deg, ${T.navyDeep} 0%, ${T.navy} 50%, ${T.navyLight} 100%)`,
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          {/* Background glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle at 70% 30%, rgba(196,151,42,0.08), transparent 60%)`,
              pointerEvents: "none",
            }}
          />

          <div style={{ maxWidth: 650, margin: "0 auto", position: "relative", zIndex: 2 }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 800,
                color: T.white,
                letterSpacing: "-0.02em",
                marginBottom: 16,
                lineHeight: 1.3,
              }}
            >
              Ready to Start Your Healthcare Career in{" "}
              <span style={{ color: T.gold }}>{data.city}</span>?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.7,
                maxWidth: 480,
                margin: "0 auto 32px",
              }}
            >
              Apply today and we'll match you with the perfect role in {data.city}. Our team is ready to help you take the next step.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 14,
              }}
            >
              <Link
                to="/jobs"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "15px 36px",
                  borderRadius: 50,
                  background: `linear-gradient(135deg, ${T.gold}, ${T.goldDark})`,
                  color: T.navy,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 4px 16px rgba(196,151,42,0.35)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(196,151,42,0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(196,151,42,0.35)";
                }}
              >
                Apply Now
              </Link>

              <Link
                to="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "15px 36px",
                  borderRadius: 50,
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(10px)",
                  border: "1.5px solid rgba(255,255,255,0.25)",
                  color: T.white,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.borderColor = "rgba(196,151,42,0.5)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default LocationPage;