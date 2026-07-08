import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2, Lightbulb, CheckCircle, FileText, Mic, Target, BookOpen } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// EVS Healthcare - Blog: How to Pass Your NMC Interview
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
  mutedSoft: "#94a3b8",
  border: "rgba(0,0,0,0.06)",
  borderGold: "rgba(196,151,42,0.2)",
  surface: "#f8fafc",
};

const EASE = [0.16, 1, 0.3, 1];

const BlogHowToPassNMCInterview = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Prepare for Your NMC Interview: A Practical Guide",
    author: { "@type": "Organization", name: "EVS Healthcare Solutions" },
    datePublished: "2026-07-07",
  };

  return (
    <>
      <Helmet>
        <title>How to Pass Your NMC Interview | Tips from EVS Healthcare</title>
        <meta
          name="description"
          content="Practical tips for preparing for your NMC interview, including common questions and how to structure your answers using the STAR method."
        />
        <link rel="canonical" href="https://www.evshealthcare.co.uk/blog/how-to-pass-nmc-interview" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main style={{ fontFamily: "'Inter', sans-serif" }}>
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* BLOG HERO HEADER */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section
          style={{
            background: `linear-gradient(135deg, ${T.navyDeep} 0%, ${T.navy} 50%, ${T.navyLight} 100%)`,
            padding: "clamp(100px, 14vh, 140px) clamp(16px, 5vw, 80px) clamp(60px, 8vh, 80px)",
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
              width: "clamp(300px, 40vw, 500px)",
              height: "clamp(300px, 40vw, 500px)",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(196,151,42,0.05), transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "-10%",
              left: "-5%",
              width: "clamp(200px, 30vw, 400px)",
              height: "clamp(200px, 30vw, 400px)",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(196,151,42,0.03), transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 2 }}>
            {/* Back to blog link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              style={{ marginBottom: 32 }}
            >
              <Link
                to="/blog"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = T.gold)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              >
                <ArrowLeft size={14} /> Back to Blog
              </Link>
            </motion.div>

            {/* Category tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              style={{ marginBottom: 20 }}
            >
              <span
                style={{
                  display: "inline-block",
                  background: "rgba(196,151,42,0.15)",
                  color: T.gold,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  padding: "6px 14px",
                  borderRadius: 20,
                  border: "1px solid rgba(196,151,42,0.25)",
                }}
              >
                Career Advice
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
                fontWeight: 800,
                color: T.white,
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
                marginBottom: 24,
              }}
            >
              How to Prepare for Your NMC Interview: A Practical Guide
            </motion.h1>

            {/* Meta info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "clamp(12px, 2vw, 24px)",
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Calendar size={14} style={{ color: T.gold }} />
                <span>July 7, 2026</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <User size={14} style={{ color: T.gold }} />
                <span>EVS Healthcare Solutions</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Clock size={14} style={{ color: T.gold }} />
                <span>4 min read</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* BLOG CONTENT */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section
          style={{
            padding: "clamp(40px, 6vh, 60px) clamp(16px, 5vw, 80px) clamp(60px, 10vh, 100px)",
            background: T.white,
          }}
        >
          <article
            style={{
              maxWidth: 760,
              margin: "0 auto",
              fontFamily: "'Inter', sans-serif",
              color: T.slate,
              lineHeight: 1.85,
              fontSize: "clamp(14px, 1.1vw, 16px)",
            }}
          >
            {/* Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
              style={{
                fontSize: "clamp(16px, 1.3vw, 18px)",
                color: T.navy,
                fontWeight: 500,
                lineHeight: 1.8,
                marginBottom: 28,
                padding: "20px 24px",
                background: T.surface,
                borderRadius: 16,
                border: `1px solid ${T.border}`,
                borderLeft: `3px solid ${T.gold}`,
              }}
            >
              For internationally trained nurses, the NMC (Nursing and Midwifery Council) interview is
              often the final hurdle before registering to practise in the UK. It can feel high-stakes,
              but with the right preparation it's a manageable process built around demonstrating your
              clinical knowledge and professional judgement.
            </motion.p>

            {/* Section 1 - What the Interview Assesses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              style={{ marginBottom: 36 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "rgba(196,151,42,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: T.gold,
                    flexShrink: 0,
                  }}
                >
                  <Target size={18} strokeWidth={1.5} />
                </div>
                <h2
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)",
                    fontWeight: 700,
                    color: T.navy,
                    letterSpacing: "-0.01em",
                    margin: 0,
                  }}
                >
                  What the Interview Actually Assesses
                </h2>
              </div>
              <p style={{ marginBottom: 12 }}>
                The interview isn't designed to catch you out - it's structured to confirm that you
                understand UK clinical standards, can communicate clearly in a healthcare setting, and can
                apply the NMC Code to real situations. Most questions are scenario-based rather than pure
                theory.
              </p>
            </motion.div>

            {/* Section 2 - Common Question Areas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
              style={{ marginBottom: 36 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "rgba(196,151,42,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: T.gold,
                    flexShrink: 0,
                  }}
                >
                  <FileText size={18} strokeWidth={1.5} />
                </div>
                <h2
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)",
                    fontWeight: 700,
                    color: T.navy,
                    letterSpacing: "-0.01em",
                    margin: 0,
                  }}
                >
                  Common Question Areas
                </h2>
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "16px 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {[
                  "Your motivation for working in the UK healthcare system",
                  "Specific examples from your clinical experience",
                  "How you've handled a difficult patient or family interaction",
                  "Your understanding of the NMC Code and professional accountability",
                  "How you'd respond to a clinical safety concern or near-miss",
                ].map((item, index) => (
                  <li
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      padding: "12px 16px",
                      background: T.surface,
                      borderRadius: 12,
                      border: `1px solid ${T.border}`,
                      fontSize: 14,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = T.borderGold;
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = T.border;
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: T.gold,
                        color: T.navy,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      {index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Section 3 - STAR Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
              style={{ marginBottom: 36 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "rgba(196,151,42,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: T.gold,
                    flexShrink: 0,
                  }}
                >
                  <Lightbulb size={18} strokeWidth={1.5} />
                </div>
                <h2
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)",
                    fontWeight: 700,
                    color: T.navy,
                    letterSpacing: "-0.01em",
                    margin: 0,
                  }}
                >
                  Structuring Your Answers: The STAR Method
                </h2>
              </div>
              <p style={{ marginBottom: 16 }}>
                Interviewers respond well to answers that follow a clear structure. The STAR method -
                Situation, Task, Action, Result - helps you explain a real example concisely: describe the
                situation, what needed to happen, what you specifically did, and the outcome. This avoids
                vague or overly general answers.
              </p>

              {/* STAR Breakdown Cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: 12,
                  marginTop: 20,
                }}
              >
                {[
                  { letter: "S", label: "Situation", desc: "Set the scene and context", color: "#C4972A" },
                  { letter: "T", label: "Task", desc: "What needed to be done", color: "#8B6914" },
                  { letter: "A", label: "Action", desc: "What you specifically did", color: "#C4972A" },
                  { letter: "R", label: "Result", desc: "The outcome achieved", color: "#8B6914" },
                ].map((item, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "16px",
                      background: T.surface,
                      borderRadius: 12,
                      border: `1px solid ${T.border}`,
                      textAlign: "center",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = T.borderGold;
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = T.border;
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: item.color,
                        color: T.white,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: 16,
                        fontWeight: 800,
                        margin: "0 auto 8px",
                      }}
                    >
                      {item.letter}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        fontWeight: 700,
                        color: T.navy,
                        marginBottom: 4,
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 11,
                        color: T.slateLight,
                        lineHeight: 1.4,
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Section 4 - Practical Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
              style={{ marginBottom: 36 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "rgba(196,151,42,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: T.gold,
                    flexShrink: 0,
                  }}
                >
                  <CheckCircle size={18} strokeWidth={1.5} />
                </div>
                <h2
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)",
                    fontWeight: 700,
                    color: T.navy,
                    letterSpacing: "-0.01em",
                    margin: 0,
                  }}
                >
                  Practical Tips Before Interview Day
                </h2>
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "16px 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {[
                  { icon: BookOpen, text: <><strong>Review the NMC Code</strong> in detail - questions often reference it directly.</> },
                  { icon: Mic, text: <><strong>Practise speaking your answers aloud</strong>, not just writing them down.</> },
                  { icon: CheckCircle, text: <><strong>Be honest about gaps</strong> in your experience rather than overstating it - reflective answers are viewed positively.</> },
                  { icon: FileText, text: <><strong>Prepare 2-3 STAR examples</strong> in advance that can flex across different question types.</> },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        padding: "14px 16px",
                        background: T.surface,
                        borderRadius: 12,
                        border: `1px solid ${T.border}`,
                        fontSize: 14,
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = T.borderGold;
                        e.currentTarget.style.transform = "translateX(4px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = T.border;
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: "rgba(196,151,42,0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: T.gold,
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={16} strokeWidth={1.5} />
                      </div>
                      <span style={{ lineHeight: 1.6 }}>{item.text}</span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* CTA BOX */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
              style={{
                marginTop: 48,
                padding: "clamp(24px, 4vw, 36px)",
                background: `linear-gradient(135deg, ${T.navyDeep}, ${T.navy})`,
                borderRadius: 20,
                textAlign: "center",
                border: `1px solid ${T.borderGold}`,
              }}
            >
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(15px, 1.2vw, 17px)",
                  color: T.white,
                  fontWeight: 500,
                  marginBottom: 20,
                  lineHeight: 1.7,
                }}
              >
                Need support preparing for your NMC interview? Our team offers guidance to candidates going
                through registration.{" "}
                <Link
                  to="/contact"
                  style={{
                    color: T.gold,
                    fontWeight: 700,
                    textDecoration: "underline",
                    textUnderlineOffset: 4,
                  }}
                >
                  Get in touch
                </Link>{" "}
                to find out more, or{" "}
                <Link
                  to="/jobs"
                  style={{
                    color: T.gold,
                    fontWeight: 700,
                    textDecoration: "underline",
                    textUnderlineOffset: 4,
                  }}
                >
                  view current roles
                </Link>{" "}
                available once you're registered.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 12,
                }}
              >
                <Link
                  to="/contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "13px 28px",
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
                  Get in Touch <ArrowRight size={14} />
                </Link>

                <Link
                  to="/jobs"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "13px 28px",
                    borderRadius: 50,
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(10px)",
                    border: "1.5px solid rgba(255,255,255,0.2)",
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
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  View Current Roles
                </Link>
              </div>
            </motion.div>
          </article>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* RELATED / FOOTER NAVIGATION */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section
          style={{
            padding: "clamp(30px, 4vh, 40px) clamp(16px, 5vw, 80px)",
            background: T.surface,
            borderTop: `1px solid ${T.border}`,
          }}
        >
          <div
            style={{
              maxWidth: 760,
              margin: "0 auto",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
            }}
          >
            <Link
              to="/blog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: T.slate,
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = T.gold)}
              onMouseLeave={(e) => (e.currentTarget.style.color = T.slate)}
            >
              <ArrowLeft size={16} /> More Articles
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: T.mutedSoft,
                }}
              >
                Share this article
              </span>
              <button
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: T.white,
                  border: `1px solid ${T.border}`,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: T.slate,
                  transition: "all 0.2s ease",
                }}
                aria-label="Share article"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = T.gold;
                  e.currentTarget.style.color = T.gold;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = T.border;
                  e.currentTarget.style.color = T.slate;
                }}
              >
                <Share2 size={14} />
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default BlogHowToPassNMCInterview;