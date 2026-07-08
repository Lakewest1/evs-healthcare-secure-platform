import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2, Bookmark } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// EVS Healthcare - Blog: NHS Staffing Shortages 2026
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

const BlogNHSShortage = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Understanding NHS Staffing Shortages: What Healthcare Workers Need to Know in 2026",
    author: { "@type": "Organization", name: "EVS Healthcare Solutions" },
    datePublished: "2026-07-07",
  };

  return (
    <>
      <Helmet>
        <title>Understanding NHS Staffing Shortages in 2026 | EVS Healthcare</title>
        <meta
          name="description"
          content="A look at why NHS staffing shortages persist in 2026, which roles are most affected, and how healthcare workers can find reliable placements."
        />
        <link rel="canonical" href="https://www.evshealthcare.co.uk/blog/nhs-staffing-shortages-2026" />
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
                Industry Insights
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
              Understanding NHS Staffing Shortages: What Healthcare Workers Need to Know in 2026
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
                <span>5 min read</span>
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
              The NHS has spent the past several years navigating one of its most significant workforce
              challenges: an ongoing gap between the number of registered nurses, mental health
              practitioners, and care staff needed, and the number actually available to fill rotas. For
              healthcare workers, this gap has created both pressure and opportunity - pressure on
              existing staff covering extra shifts, and opportunity for qualified professionals seeking
              flexible, well-paid placements.
            </motion.p>

            {/* Section 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              style={{ marginBottom: 36 }}
            >
              <h2
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "clamp(1.3rem, 2vw, 1.6rem)",
                  fontWeight: 700,
                  color: T.navy,
                  letterSpacing: "-0.01em",
                  marginBottom: 16,
                  paddingBottom: 12,
                  borderBottom: `2px solid ${T.borderGold}`,
                  display: "inline-block",
                }}
              >
                Why the Shortage Persists
              </h2>
              <p style={{ marginBottom: 12 }}>
                A combination of factors keeps staffing gaps in place: an ageing population that increases
                demand for both acute and community care, retention challenges as experienced staff leave
                the profession, and the time it takes to train and register new nurses through the NMC.
                Rural and outer-city areas often feel this most acutely, where fewer candidates are willing
                or able to commute regularly.
              </p>
            </motion.div>

            {/* Section 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
              style={{ marginBottom: 36 }}
            >
              <h2
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "clamp(1.3rem, 2vw, 1.6rem)",
                  fontWeight: 700,
                  color: T.navy,
                  letterSpacing: "-0.01em",
                  marginBottom: 16,
                  paddingBottom: 12,
                  borderBottom: `2px solid ${T.borderGold}`,
                  display: "inline-block",
                }}
              >
                Which Roles Are Most in Demand
              </h2>
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
                  "Registered Nurses (RGN) - particularly for acute and primary care wards",
                  "Mental Health Nurses (RMN) - both community and inpatient settings",
                  "Healthcare Assistants - across hospital, residential, and home care settings",
                  "Support Workers - especially in learning disability and autism services",
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

            {/* Section 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
              style={{ marginBottom: 36 }}
            >
              <h2
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "clamp(1.3rem, 2vw, 1.6rem)",
                  fontWeight: 700,
                  color: T.navy,
                  letterSpacing: "-0.01em",
                  marginBottom: 16,
                  paddingBottom: 12,
                  borderBottom: `2px solid ${T.borderGold}`,
                  display: "inline-block",
                }}
              >
                What This Means If You're Looking for Work
              </h2>
              <p style={{ marginBottom: 12 }}>
                If you're a qualified nurse, carer, or support worker, this environment generally means
                more available shifts, competitive hourly rates, and - if you choose - the ability to work
                flexibly across multiple sites rather than committing to a single employer. The trade-off is
                that not every agency vets placements to the same standard, so it's worth checking that any
                recruiter you work with is properly compliant (DBS checks, NMC verification, and clear
                contracts) before accepting a role.
              </p>
            </motion.div>

            {/* Section 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
              style={{ marginBottom: 36 }}
            >
              <h2
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "clamp(1.3rem, 2vw, 1.6rem)",
                  fontWeight: 700,
                  color: T.navy,
                  letterSpacing: "-0.01em",
                  marginBottom: 16,
                  paddingBottom: 12,
                  borderBottom: `2px solid ${T.borderGold}`,
                  display: "inline-block",
                }}
              >
                How EVS Healthcare Supports Candidates
              </h2>
              <p style={{ marginBottom: 12 }}>
                As an NHS framework approved supplier, we handle compliance checks upfront so candidates can
                move into placements quickly and providers can trust the staff we send. Our team supports
                candidates with shift matching, documentation, and ongoing placement support rather than a
                one-off job listing.
              </p>
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
                Looking for your next healthcare role?{" "}
                <Link
                  to="/jobs"
                  style={{
                    color: T.gold,
                    fontWeight: 700,
                    textDecoration: "underline",
                    textUnderlineOffset: 4,
                  }}
                >
                  Browse current vacancies
                </Link>{" "}
                or{" "}
                <Link
                  to="/contact"
                  style={{
                    color: T.gold,
                    fontWeight: 700,
                    textDecoration: "underline",
                    textUnderlineOffset: 4,
                  }}
                >
                  get in touch with our team
                </Link>
                .
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
                  to="/jobs"
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
                  View Open Roles <ArrowRight size={14} />
                </Link>

                <Link
                  to="/contact"
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
                  Contact Us
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

export default BlogNHSShortage;