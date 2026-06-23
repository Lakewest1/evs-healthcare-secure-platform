// ─────────────────────────────────────────────────────────────────────────────
// EVS Healthcare Solutions — Jobs Page
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, useInView, AnimatePresence, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Stethoscope,
  Building2,
  HeartHandshake,
  Brain,
  Heart,
  Star,
  Flame,
  ChevronDown,
  Search,
  Filter,
  X,
  MapPin,
  Clock,
  Shield,
  Briefcase,
  Users,
  CheckCircle,
  Quote,
  Award,
  ThumbsUp,
  Trophy,
  BadgeCheck,
  GraduationCap,
  Handshake,
  ShieldCheck,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Design tokens
// ─────────────────────────────────────────────────────────────────────────────
const T = {
  navy:       "#0f1d3d",
  navyLight:  "#1a2a50",
  gold:       "#C4972A",
  goldDark:   "#8B6914",
  goldLight:  "#f0c060",
  white:      "#ffffff",
  slate:      "#4a5568",
  slateLight: "#64748b",
  mutedSoft:  "#94a3b8",
  border:     "rgba(0,0,0,0.06)",
  borderGold: "rgba(196,151,42,0.25)",
  surface:    "#f8fafc",
};

const EASE = [0.16, 1, 0.3, 1];

// ─────────────────────────────────────────────────────────────────────────────
// SSR-safe mobile hook — no window at module evaluation time
// ─────────────────────────────────────────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared reveal hook
// ─────────────────────────────────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return [ref, inView];
}

// ─────────────────────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 1 — JOBS
// ══════════════════════════════════════════════════════════════════════════════
// ─────────────────────────────────────────────────────────────────────────────

const JOBS_DATA = [
  {
    id: 1,
    title: "Registered Nurse (RGN)",
    type: "Temporary / Permanent",
    location: "Preston, Lancashire",
    pay: "£26–£38/hr",
    payValue: 32,
    urgent: true,
    icon: Stethoscope,
    shift: "Day & Night Shifts",
    experience: "2+ years preferred",
    department: "Nursing",
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "Healthcare Care Assistant",
    type: "Flexible Shifts Available",
    location: "North-West England",
    pay: "£13–£23/hr",
    payValue: 18,
    urgent: false,
    icon: Building2,
    shift: "Flexible Hours",
    experience: "No experience required",
    department: "Care",
    posted: "5 days ago",
  },
  {
    id: 3,
    title: "Support Worker",
    type: "Temporary / Permanent",
    location: "Preston & Surrounding",
    pay: "£13–£23/hr",
    payValue: 18,
    urgent: true,
    icon: HeartHandshake,
    shift: "Weekend Availability",
    experience: "Driving license preferred",
    department: "Support",
    posted: "1 week ago",
  },
  {
    id: 4,
    title: "RMN Mental Health Nurse",
    type: "Full Time / Part Time",
    location: "Lancashire Area",
    pay: "£30–£40/hr",
    payValue: 35,
    urgent: false,
    icon: Brain,
    shift: "Rotating Shifts",
    experience: "NMC Registered",
    department: "Nursing",
    posted: "3 days ago",
  },
  {
    id: 5,
    title: "Senior Carer",
    type: "Immediate Start",
    location: "North-West England",
    pay: "£18–£25/hr",
    payValue: 21.5,
    urgent: false,
    icon: Heart,
    shift: "Day Shifts Only",
    experience: "NVQ Level 3 required",
    department: "Care",
    posted: "6 days ago",
  },
  {
    id: 6,
    title: "Domestic Worker",
    type: "Flexible Hours",
    location: "Preston, Lancashire",
    pay: "£13–£16/hr",
    payValue: 14.5,
    urgent: false,
    icon: Star,
    shift: "Morning / Afternoon",
    experience: "Basic cleaning skills",
    department: "Support",
    posted: "2 weeks ago",
  },
];

// Parse "2 days ago" / "1 week ago" → day count for sorting
const POSTED_TO_DAYS = (posted) => {
  const match = posted.match(/(\d+)\s+(day|week)/);
  if (!match) return 0;
  const [, num, unit] = match;
  return unit === "week" ? Number(num) * 7 : Number(num);
};

// ── Job Card ──────────────────────────────────────────────────────────────────
function JobCard({ job, index }) {
  const navigate     = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const JobIcon      = job.icon;
  const shouldReduce = useReducedMotion();

  const handleApply = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      const params = new URLSearchParams({
        jobId: job.id,
        jobTitle: job.title,
        jobLocation: job.location,
        jobPay: job.pay,
        jobType: job.type,
        jobDepartment: job.department,
        jobPayValue: job.payValue,
        jobShift: job.shift,
        jobExperience: job.experience,
      });
      navigate(`/apply?${params.toString()}`);
    }, 300);
  }, [navigate, job]);

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3), ease: EASE }}
      className="job-card"
      role="article"
      aria-label={`${job.title} — ${job.pay}`}
    >
      <div className="job-card-top">
        <div className="job-card-icon" aria-hidden="true">
          <JobIcon size={24} strokeWidth={1.6} />
        </div>
        <div className="job-card-heading">
          <div className="job-card-title-row">
            <h3 className="job-card-title">{job.title}</h3>
            {job.urgent && (
              <span className="job-card-urgent" role="status">
                <Flame size={10} aria-hidden="true" /> Urgent
              </span>
            )}
          </div>
          <span className="job-card-meta">{job.type} · {job.department}</span>
        </div>
      </div>

      <div className="job-card-details">
        <div className="job-card-detail">
          <MapPin size={14} className="job-card-detail-icon" aria-hidden="true" />
          <span>{job.location}</span>
        </div>
        <div className="job-card-detail job-card-detail-pay">
          <span className="job-card-pay-symbol" aria-hidden="true">£</span>
          <span>{job.pay}</span>
        </div>
        <div className="job-card-detail">
          <Clock size={14} className="job-card-detail-icon" aria-hidden="true" />
          <span>{job.shift}</span>
        </div>
        <div className="job-card-detail">
          <Shield size={14} className="job-card-detail-icon" aria-hidden="true" />
          <span>{job.experience}</span>
        </div>
      </div>

      <div className="job-card-bottom">
        <span className="job-card-posted">Posted {job.posted}</span>
        <div className="job-card-actions">
          <button
            type="button"
            onClick={() => setIsSaved((s) => !s)}
            className={`job-card-save${isSaved ? " active" : ""}`}
            aria-pressed={isSaved}
            aria-label={isSaved ? `Unsave ${job.title}` : `Save ${job.title}`}
          >
            {isSaved ? "Saved ✓" : "Save"}
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="job-card-apply"
            aria-label={`Apply for ${job.title}`}
          >
            Apply now →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Jobs Banner ───────────────────────────────────────────────────────────────
function JobsBanner() {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="jobs-banner"
      aria-label="Jobs page banner"
    >
      <div className="jobs-banner-bg">
        <img
          src="https://res.cloudinary.com/dbqdgvvgq/image/upload/v1780786463/mathekame-hospital-5765027_1920_ojwyi1.jpg"
          alt="Hospital corridor — EVS Healthcare careers"
          className="jobs-banner-image"
          loading="eager"
          decoding="async"
          fetchpriority="high"
        />
        <div className="jobs-banner-overlay" aria-hidden="true" />
      </div>
      <div className="jobs-banner-content">
        <div className="jobs-banner-icon" aria-hidden="true">
          <Briefcase size={28} strokeWidth={1.6} />
        </div>
        <h1 className="jobs-banner-title">
          Find Your <span className="jobs-banner-highlight">Dream Healthcare Role</span>
        </h1>
        <p className="jobs-banner-subtitle">
          Explore {JOBS_DATA.length} opportunities across North-West England —
          from nursing to support roles, we have the perfect position for you.
        </p>
        <div className="jobs-banner-stats" aria-label="Key statistics">
          <div className="jobs-banner-stat">
            <span className="jobs-banner-stat-number">{JOBS_DATA.length}</span>
            <span className="jobs-banner-stat-label">Open Positions</span>
          </div>
          <div className="jobs-banner-stat-divider" aria-hidden="true" />
          <div className="jobs-banner-stat">
            <span className="jobs-banner-stat-number">3</span>
            <span className="jobs-banner-stat-label">Departments</span>
          </div>
          <div className="jobs-banner-stat-divider" aria-hidden="true" />
          <div className="jobs-banner-stat">
            <span className="jobs-banner-stat-number">24/7</span>
            <span className="jobs-banner-stat-label">Support Available</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Jobs Section ─────────────────────────────────────────────────────────
function JobsSection() {
  const [searchTerm,       setSearchTerm]       = useState("");
  const [filterDepartment, setFilterDepartment] = useState("All");
  const [sortBy,           setSortBy]           = useState("newest");
  const [visibleCount,     setVisibleCount]     = useState(6);
  const shouldReduce = useReducedMotion();

  const departments = useMemo(
    () => ["All", ...new Set(JOBS_DATA.map((j) => j.department))],
    []
  );

  const filteredJobs = useMemo(() => {
    let list = [...JOBS_DATA];
    if (searchTerm.trim()) {
      const t = searchTerm.trim().toLowerCase();
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(t) ||
          j.location.toLowerCase().includes(t) ||
          j.department.toLowerCase().includes(t)
      );
    }
    if (filterDepartment !== "All") {
      list = list.filter((j) => j.department === filterDepartment);
    }
    switch (sortBy) {
      case "newest":  list.sort((a, b) => POSTED_TO_DAYS(a.posted) - POSTED_TO_DAYS(b.posted)); break;
      case "oldest":  list.sort((a, b) => POSTED_TO_DAYS(b.posted) - POSTED_TO_DAYS(a.posted)); break;
      case "highest": list.sort((a, b) => b.payValue - a.payValue); break;
      case "lowest":  list.sort((a, b) => a.payValue - b.payValue); break;
      default: break;
    }
    return list;
  }, [searchTerm, filterDepartment, sortBy]);

  useEffect(() => { setVisibleCount(6); }, [searchTerm, filterDepartment, sortBy]);

  const displayed = filteredJobs.slice(0, visibleCount);
  const hasMore   = visibleCount < filteredJobs.length;

  return (
    <section className="jobs-page" aria-labelledby="jobs-page-heading" id="jobs">
      <div className="jobs-container">
        <JobsBanner />

        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08, ease: EASE }}
          className="jobs-toolbar"
          role="search"
          aria-label="Filter and search jobs"
        >
          <div className="jobs-search">
            <Search size={18} aria-hidden="true" />
            <input
              type="search"
              placeholder="Search jobs, locations…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              maxLength={80}
              aria-label="Search jobs by title or location"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="jobs-search-clear"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="jobs-select-wrap">
            <Filter size={16} aria-hidden="true" />
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              aria-label="Filter by department"
            >
              {departments.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="jobs-select-wrap">
            <span className="jobs-select-label" id="sort-label">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-labelledby="sort-label"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="highest">Highest pay</option>
              <option value="lowest">Lowest pay</option>
            </select>
          </div>
        </motion.div>

        <p className="jobs-count" aria-live="polite" aria-atomic="true">
          Showing <strong>{displayed.length}</strong> of{" "}
          <strong>{filteredJobs.length}</strong> jobs
        </p>

        <div className="jobs-grid" role="list" aria-label="Job listings">
          <AnimatePresence mode="popLayout">
            {displayed.map((job, i) => (
              <JobCard key={job.id} job={job} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {filteredJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="jobs-empty"
            role="status"
          >
            <Search size={44} aria-hidden="true" />
            <h3>No jobs found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </motion.div>
        )}

        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="jobs-load-more-wrap"
          >
            <button
              type="button"
              onClick={() =>
                setVisibleCount((p) => Math.min(p + 6, filteredJobs.length))
              }
              className="jobs-load-more"
            >
              Load more jobs <ChevronDown size={16} aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 2 — PARTNERS
// ══════════════════════════════════════════════════════════════════════════════
// ─────────────────────────────────────────────────────────────────────────────

const PARTNERS = [
  { id: 1, name: "NHS England", logo: "./src/images/NSH.jpeg", fallbackIcon: Building2, fallbackColor: "#005EB8", website: "https://www.england.nhs.uk/" },
  { id: 2, name: "CQC", logo: "./src/images/cqc.jpeg", fallbackIcon: ShieldCheck, fallbackColor: "#00A859", website: "https://www.cqc.org.uk/" },
  { id: 3, name: "DBS", logo: "./src/images/dbs.jpeg", fallbackIcon: Shield, fallbackColor: T.gold, website: "https://www.gov.uk/government/organisations/disclosure-and-barring-service" },
  { id: 4, name: "Skills for Care", logo: "./src/images/skillcare.jpeg", fallbackIcon: GraduationCap, fallbackColor: "#6C3B2A", website: "https://www.skillsforcare.org.uk/" },
  { id: 5, name: "Lancashire County Council", logo: "./src/images/lacashire.jpeg", fallbackIcon: MapPin, fallbackColor: "#4A6FA5", website: "https://www.lancashire.gov.uk/" },
  { id: 6, name: "Homecare Association", logo: "./src/images/homecare.jpeg", fallbackIcon: Heart, fallbackColor: "#7B2D8E", website: "https://www.homecareassociation.org.uk/" },
  { id: 7, name: "NCFE", logo: "./src/images/ncfe.jpeg", fallbackIcon: Award, fallbackColor: "#E65100", website: "https://www.ncfe.org.uk/" },
];

const headerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, staggerChildren: 0.15 } },
};
const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const badgeContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
};
const badgeVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, type: "spring" } },
};

function DesktopPartnerCard({ partner, index }) {
  const [imgError, setImgError] = useState(false);
  const FallbackIcon = partner.fallbackIcon;
  const open = () => window.open(partner.website, "_blank", "noopener,noreferrer");

  return (
    <div className="pt-card" style={{ "--i": index }} onClick={open} role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") open(); }}
      aria-label={`Visit ${partner.name} website`}>
      <div className="pt-face">
        <div className="pt-hover-pulse" />
        {!imgError ? (
          <img src={partner.logo} alt={`${partner.name} logo`} className="pt-logo"
            onError={() => setImgError(true)} loading="lazy" decoding="async" />
        ) : (
          <div className="pt-fallback-icon">
            <FallbackIcon size={40} strokeWidth={1.5} color={partner.fallbackColor} />
          </div>
        )}
        <span className="pt-label">{partner.name}</span>
        <div className="pt-ring-cw" />
        <div className="pt-ring-ccw" />
      </div>
    </div>
  );
}

function MobilePartnerCard({ partner }) {
  const [imgError, setImgError] = useState(false);
  const FallbackIcon = partner.fallbackIcon;
  const open = () => window.open(partner.website, "_blank", "noopener,noreferrer");

  return (
    <div className="pt-mobile-card" onClick={open} role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") open(); }}
      aria-label={`Visit ${partner.name} website`}>
      {!imgError ? (
        <img src={partner.logo} alt={`${partner.name} logo`} className="pt-mobile-logo"
          onError={() => setImgError(true)} loading="lazy" decoding="async" />
      ) : (
        <div className="pt-mobile-icon">
          <FallbackIcon size={28} strokeWidth={1.5} color={partner.fallbackColor} />
        </div>
      )}
      <span className="pt-mobile-label">{partner.name}</span>
    </div>
  );
}

function MobileMarquee({ items }) {
  const doubled = [...items, ...items];
  return (
    <div className="pt-mobile-marquee-container">
      <div className="pt-mobile-track">
        {doubled.map((partner, idx) => (
          <MobilePartnerCard key={`${partner.id}-${idx}`} partner={partner} />
        ))}
      </div>
    </div>
  );
}

function DesktopMarquee({ items, isInView }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", position: "relative", width: "100%", padding: "20px 0",
      maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
      {isInView && (
        <div className="pt-track" style={{ "--pt-speed": "50s" }}>
          {doubled.map((partner, idx) => (
            <DesktopPartnerCard key={`${partner.id}-${idx}`} partner={partner} index={idx % items.length} />
          ))}
        </div>
      )}
    </div>
  );
}

function PartnersSection() {
  const [ref, inView] = useReveal(0.15);
  const isMobile = useIsMobile();
  const shouldReduce = useReducedMotion();

  return (
    <section ref={ref} aria-labelledby="partners-heading" style={{
      padding: "clamp(50px, 8vh, 80px) clamp(16px, 5vw, 80px)",
      background: T.white, position: "relative", overflow: "hidden",
    }}>
      {!isMobile && !shouldReduce && (
        <motion.div animate={{ opacity: inView ? 0.03 : 0 }} transition={{ duration: 1 }}
          aria-hidden="true" style={{
            position: "absolute", inset: 0,
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(196,151,42,0.06) 0%, transparent 50%),
              repeating-linear-gradient(45deg, #C4972A 0px, #C4972A 1px, transparent 1px, transparent 30px)
            `,
            backgroundSize: "100% 100%, 30px 30px", pointerEvents: "none",
          }} />
      )}

      {!isMobile && (
        <>
          <div className="pt-blob-a" aria-hidden="true" style={{
            position: "absolute", top: "5%", right: "2%",
            width: 280, height: 280, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,151,42,0.03), transparent 70%)",
            pointerEvents: "none",
          }} />
          <div className="pt-blob-b" aria-hidden="true" style={{
            position: "absolute", bottom: "5%", left: "2%",
            width: 320, height: 320, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,151,42,0.02), transparent 70%)",
            pointerEvents: "none",
          }} />
        </>
      )}

      <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: EASE }} aria-hidden="true" style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg, transparent, ${T.gold}, ${T.goldLight}, ${T.gold}, transparent)`,
          transformOrigin: "left",
        }} />

      <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: EASE, delay: 0.3 }} aria-hidden="true" style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg, transparent, ${T.gold}, ${T.goldLight}, ${T.gold}, transparent)`,
          transformOrigin: "right",
        }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <motion.div variants={headerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}
          style={{ textAlign: "center", marginBottom: isMobile ? 32 : 56 }}>
          <motion.div variants={childVariants} style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <motion.div initial={{ width: 0 }} animate={inView ? { width: 30 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ height: 2, background: T.gold, borderRadius: 999 }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700,
              letterSpacing: "4px", textTransform: "uppercase", color: T.gold }} id="partners-heading">
              Trusted Partners
            </span>
            <motion.div initial={{ width: 0 }} animate={inView ? { width: 30 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ height: 2, background: T.gold, borderRadius: 999 }} />
          </motion.div>

          <motion.h2 variants={childVariants} style={{
            fontFamily: "'Inter', sans-serif", fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)",
            fontWeight: 800, color: T.navy, letterSpacing: "-0.02em", marginBottom: 16,
          }}>
            Trusted By Leading{" "}
            <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6, type: "spring" }} style={{
                display: "inline-block",
                background: `linear-gradient(135deg, ${T.gold}, #e8b84a)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
              Organizations
            </motion.span>
          </motion.h2>

          <motion.p variants={childVariants} style={{
            fontFamily: "'Inter', sans-serif", fontSize: 14, color: T.slate,
            maxWidth: 520, margin: "0 auto", lineHeight: 1.65,
          }}>
            We're proud to work with and be recognized by industry leaders across healthcare
          </motion.p>
        </motion.div>

        {isMobile ? <MobileMarquee items={PARTNERS} /> : <DesktopMarquee items={PARTNERS} isInView={inView} />}

        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={badgeContainerVariants}
          style={{ display: "flex", alignItems: "center", justifyContent: "center",
            marginTop: isMobile ? 32 : 56, gap: isMobile ? 10 : 16, flexWrap: "wrap" }}>
          <motion.div variants={badgeVariants}
            whileHover={isMobile || shouldReduce ? {} : { scale: 1.03, y: -2 }} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: isMobile ? "6px 14px" : "8px 20px",
              background: "rgba(196,151,42,0.08)", borderRadius: 50,
              cursor: "default", border: "1px solid rgba(196,151,42,0.12)",
            }}>
            <Trophy size={isMobile ? 13 : 16} style={{ color: T.gold }} aria-hidden="true" />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: isMobile ? 11 : 13,
              fontWeight: 600, color: T.gold }}>
              7+ Trusted Partnerships
            </span>
          </motion.div>

          <motion.div variants={badgeVariants}
            whileHover={isMobile || shouldReduce ? {} : { scale: 1.03, y: -2 }} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: isMobile ? "6px 14px" : "8px 20px",
              background: "rgba(0,0,0,0.03)", borderRadius: 50,
              cursor: "default", border: "1px solid rgba(0,0,0,0.06)",
            }}>
            <BadgeCheck size={isMobile ? 13 : 16} style={{ color: T.slateLight }} aria-hidden="true" />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: isMobile ? 11 : 13,
              fontWeight: 500, color: T.slateLight }}>
              Full Compliance Certified
            </span>
          </motion.div>

          <motion.div variants={badgeVariants}
            whileHover={isMobile || shouldReduce ? {} : { scale: 1.03, y: -2 }} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: isMobile ? "6px 14px" : "8px 20px",
              background: "rgba(0,0,0,0.03)", borderRadius: 50,
              cursor: "default", border: "1px solid rgba(0,0,0,0.06)",
            }}>
            <div style={{ display: "flex", gap: 2 }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={isMobile ? 10 : 12} fill={T.goldLight} stroke={T.goldLight} aria-hidden="true" />
              ))}
            </div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: isMobile ? 11 : 13,
              fontWeight: 500, color: T.slateLight }}>
              Rated Excellent
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
//  ROOT EXPORT — Jobs → Partners
// ══════════════════════════════════════════════════════════════════════════════
// ─────────────────────────────────────────────────────────────────────────────
export default function Jobs() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700;14..32,800;14..32,900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Accessibility ── */
        a:focus-visible, button:focus-visible, select:focus-visible, input:focus-visible {
          outline: 2px solid #C4972A;
          outline-offset: 3px;
          border-radius: 4px;
        }

        /* ══════════════════════════════════════════════════════════════════ */
        /* JOBS SECTION */
        /* ══════════════════════════════════════════════════════════════════ */
        .jobs-page {
          padding: clamp(80px, 12vh, 120px) clamp(16px, 5vw, 80px);
          background: #f8fafc;
          min-height: 100vh;
        }
        .jobs-container { max-width: 1200px; margin: 0 auto; }

        /* Banner */
        .jobs-banner {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          margin-bottom: 40px;
          box-shadow: 0 20px 40px -12px rgba(15,29,61,0.15);
        }
        .jobs-banner-bg {
          position: relative;
          width: 100%;
          height: 280px;
          overflow: hidden;
        }
        .jobs-banner-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .jobs-banner:hover .jobs-banner-image { transform: scale(1.03); }
        .jobs-banner-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(15,29,61,0.88), rgba(15,29,61,0.60));
        }
        .jobs-banner-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px 48px;
          color: #fff;
        }
        .jobs-banner-icon {
          width: 56px; height: 56px;
          border-radius: 16px;
          background: rgba(196,151,42,0.2);
          border: 1px solid rgba(196,151,42,0.3);
          display: flex; align-items: center; justify-content: center;
          color: #C4972A;
          margin-bottom: 16px;
        }
        .jobs-banner-title {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 0 0 8px;
          line-height: 1.2;
        }
        .jobs-banner-highlight {
          background: linear-gradient(135deg, #C4972A, #f0c060, #e8b84a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .jobs-banner-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: clamp(14px, 1.2vw, 16px);
          color: rgba(255,255,255,0.85);
          max-width: 520px;
          line-height: 1.6;
          margin: 0 0 20px;
        }
        .jobs-banner-stats { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
        .jobs-banner-stat  { display: flex; align-items: baseline; gap: 6px; }
        .jobs-banner-stat-number {
          font-family: 'Inter', sans-serif;
          font-size: clamp(20px, 2vw, 26px);
          font-weight: 800;
          color: #C4972A;
        }
        .jobs-banner-stat-label {
          font-family: 'Inter', sans-serif;
          font-size: clamp(11px, 0.9vw, 13px);
          color: rgba(255,255,255,0.7);
          font-weight: 500;
        }
        .jobs-banner-stat-divider { width: 1px; height: 28px; background: rgba(255,255,255,0.2); }

        /* Toolbar */
        .jobs-toolbar {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          align-items: center;
          background: #fff;
          padding: 14px 16px;
          border-radius: 16px;
          box-shadow: 0 1px 2px rgba(15,29,61,0.04);
          border: 1px solid rgba(0,0,0,0.06);
          margin-bottom: 28px;
        }
        .jobs-search {
          flex: 1;
          min-width: 200px;
          display: flex;
          align-items: center;
          gap: 10px;
          background: #f8fafc;
          border-radius: 10px;
          padding: 0 14px;
          color: #94a3b8;
        }
        .jobs-search input {
          flex: 1;
          padding: 10px 0;
          border: none;
          background: transparent;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: #0f1d3d;
          outline: none;
        }
        .jobs-search input::placeholder { color: #94a3b8; }
        .jobs-search-clear {
          background: none; border: none; cursor: pointer;
          color: #94a3b8; padding: 4px; display: flex; border-radius: 6px;
          transition: color 0.2s, background 0.2s;
        }
        .jobs-search-clear:hover { color: #0f1d3d; background: rgba(0,0,0,0.04); }
        .jobs-select-wrap {
          display: flex; align-items: center; gap: 8px;
          background: #f8fafc; border-radius: 10px; padding: 0 14px; color: #94a3b8;
        }
        .jobs-select-label { font-size: 12px; font-family: 'Inter', sans-serif; }
        .jobs-select-wrap select {
          padding: 10px 8px; border: none; background: transparent;
          font-family: 'Inter', sans-serif; font-size: 13px;
          color: #0f1d3d; outline: none; cursor: pointer;
        }
        .jobs-count {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: #64748b;
          margin-bottom: 20px;
        }

        /* Job grid & cards */
        .jobs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
          gap: 20px;
        }
        .job-card {
          position: relative;
          background: #fff;
          border-radius: 20px;
          padding: 24px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
          transition: box-shadow 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
        }
        .job-card:hover {
          border-color: rgba(196,151,42,0.3);
          box-shadow: 0 16px 32px -16px rgba(15,29,61,0.14);
          transform: translateY(-2px);
        }
        .job-card-top { display: flex; gap: 16px; margin-bottom: 16px; }
        .job-card-icon {
          width: 52px; height: 52px; border-radius: 14px;
          background: linear-gradient(135deg, rgba(196,151,42,0.14), rgba(196,151,42,0.04));
          display: flex; align-items: center; justify-content: center;
          color: #C4972A; flex-shrink: 0;
        }
        .job-card-heading { flex: 1; min-width: 0; }
        .job-card-title-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .job-card-title {
          font-family: 'Inter', sans-serif;
          font-size: 18px; font-weight: 700;
          color: #0f1d3d; margin: 0; letter-spacing: -0.005em;
        }
        .job-card-urgent {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: #fff; font-size: 10px; font-weight: 700;
          letter-spacing: 0.05em; padding: 3px 9px; border-radius: 20px;
          display: inline-flex; align-items: center; gap: 4px;
          text-transform: uppercase; font-family: 'Inter', sans-serif;
        }
        .job-card-meta { font-family: 'Inter', sans-serif; font-size: 12px; color: #64748b; }
        .job-card-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 9px;
          margin-bottom: 16px;
        }
        .job-card-detail {
          display: flex; align-items: center; gap: 7px;
          font-family: 'Inter', sans-serif; font-size: 13px; color: #4a5568;
        }
        .job-card-detail-icon { color: #C4972A; flex-shrink: 0; }
        .job-card-detail-pay { color: #0f1d3d; font-weight: 700; }
        .job-card-pay-symbol {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #C4972A;
          flex-shrink: 0;
          line-height: 1;
        }

        .job-card-bottom {
          display: flex; justify-content: space-between;
          align-items: center; flex-wrap: wrap;
          gap: 12px; padding-top: 14px;
          border-top: 1px solid rgba(0,0,0,0.06);
        }
        .job-card-posted { font-family: 'Inter', sans-serif; font-size: 12px; color: #94a3b8; }
        .job-card-actions { display: flex; gap: 10px; }
        .job-card-save {
          padding: 8px 14px; border-radius: 10px;
          background: rgba(0,0,0,0.04); border: none;
          color: #64748b; cursor: pointer;
          font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600;
          transition: background 0.2s, color 0.2s, transform 0.15s;
        }
        .job-card-save:hover { transform: scale(1.04); }
        .job-card-save.active { background: #C4972A; color: #fff; }
        .job-card-apply {
          padding: 8px 22px; border-radius: 10px;
          background: linear-gradient(135deg, #C4972A, #8B6914);
          border: none; color: #0f1d3d; cursor: pointer;
          font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 700;
          box-shadow: 0 4px 12px rgba(196,151,42,0.25);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .job-card-apply:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(196,151,42,0.35); }
        .jobs-empty {
          text-align: center; padding: 80px 20px;
          background: #fff; border-radius: 20px;
          border: 1px solid rgba(0,0,0,0.06); color: #94a3b8;
        }
        .jobs-empty h3 { font-family: 'Inter', sans-serif; font-size: 20px; color: #0f1d3d; margin: 16px 0 8px; }
        .jobs-empty p  { font-family: 'Inter', sans-serif; font-size: 14px; }
        .jobs-load-more-wrap { text-align: center; margin-top: 32px; }
        .jobs-load-more {
          padding: 12px 40px; border-radius: 40px;
          background: transparent; border: 1px solid #C4972A;
          color: #C4972A; font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 600; cursor: pointer;
          display: inline-flex; align-items: center; gap: 8px;
          transition: background 0.2s, color 0.2s, transform 0.15s;
        }
        .jobs-load-more:hover { background: #C4972A; color: #0f1d3d; transform: translateY(-1px); }

        /* ══════════════════════════════════════════════════════════════════ */
        /* PARTNERS SECTION */
        /* ══════════════════════════════════════════════════════════════════ */

        /* Desktop marquee */
        @keyframes pt-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .pt-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: pt-marquee var(--pt-speed, 50s) linear infinite;
        }
        .pt-track:hover { animation-play-state: paused; }

        @keyframes pt-pop {
          from { opacity: 0; transform: scale(0.6); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes pt-float {
          0%,100% { transform: translateY(0) rotateZ(0deg); }
          25%     { transform: translateY(-4px) rotateZ(1deg); }
          75%     { transform: translateY(4px) rotateZ(-1deg); }
        }
        .pt-card {
          position: relative; flex-shrink: 0;
          cursor: pointer; margin: 0 12px;
          width: 120px; height: 120px;
          animation:
            pt-pop   0.45s cubic-bezier(0.22,1,0.36,1) both,
            pt-float 5s ease-in-out infinite;
          animation-delay: calc(var(--i) * 0.15s), calc(var(--i) * 0.15s);
        }
        .pt-face {
          position: absolute; inset: 0;
          border-radius: 20px; background: #fff;
          border: 1px solid rgba(0,0,0,0.08);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          overflow: hidden;
          transition: box-shadow 0.3s, border-color 0.3s, transform 0.3s;
        }
        .pt-card:hover .pt-face {
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          border-color: rgba(196,151,42,0.3);
          transform: scale(1.05);
        }
        .pt-logo {
          width: 56px; height: 56px; object-fit: contain;
          margin-bottom: 10px;
          filter: grayscale(100%);
          transition: filter 0.3s, transform 0.3s;
        }
        .pt-card:hover .pt-logo { filter: grayscale(0%); transform: scale(1.05); }
        .pt-fallback-icon {
          width: 48px; height: 48px; margin-bottom: 8px;
          display: flex; align-items: center; justify-content: center;
          filter: grayscale(100%);
          transition: filter 0.3s, transform 0.3s;
        }
        .pt-card:hover .pt-fallback-icon { filter: grayscale(0%); transform: scale(1.05); }
        .pt-label {
          font-family: 'Inter', sans-serif;
          font-weight: 600; font-size: 10px; color: #4a5568;
          text-align: center; padding: 0 8px; line-height: 1.3;
          transition: color 0.2s;
        }
        .pt-card:hover .pt-label { color: #C4972A; }

        @keyframes pt-ring-cw  { to { transform: rotate(360deg);  } }
        @keyframes pt-ring-ccw { to { transform: rotate(-360deg); } }
        .pt-ring-cw {
          position: absolute; inset: -4px; border-radius: 20px;
          border: 1px solid rgba(196,151,42,0.1); pointer-events: none;
          animation: pt-ring-cw 12s linear infinite;
        }
        .pt-ring-ccw {
          position: absolute; inset: -8px; border-radius: 24px;
          border: 1px solid rgba(196,151,42,0.06); pointer-events: none;
          animation: pt-ring-ccw 15s linear infinite;
        }
        @keyframes pt-hover-pulse {
          from { transform: scale(1); opacity: 0.2; }
          to   { transform: scale(1.3); opacity: 0; }
        }
        .pt-hover-pulse {
          position: absolute; inset: 0; border-radius: 20px;
          background: rgba(196,151,42,0.15); pointer-events: none; opacity: 0;
        }
        .pt-card:hover .pt-hover-pulse {
          animation: pt-hover-pulse 0.8s ease-out infinite;
        }
        @keyframes pt-blob-a {
          0%,100% { transform: translate(0,0); }
          25%     { transform: translate(12px,-16px); }
          75%     { transform: translate(-12px,16px); }
        }
        @keyframes pt-blob-b {
          0%,100% { transform: translate(0,0); }
          25%     { transform: translate(-12px,16px); }
          75%     { transform: translate(12px,-16px); }
        }
        .pt-blob-a { animation: pt-blob-a 18s ease-in-out infinite; }
        .pt-blob-b { animation: pt-blob-b 22s ease-in-out infinite; }

        /* Mobile marquee */
        @keyframes pt-mobile-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .pt-mobile-marquee-container {
          overflow: hidden; position: relative;
          width: 100%; padding: 16px 0;
        }
        .pt-mobile-track {
          display: flex; width: max-content;
          animation: pt-mobile-marquee 40s linear infinite;
        }
        .pt-mobile-track:hover { animation-play-state: paused; }
        .pt-mobile-card {
          flex-shrink: 0; cursor: pointer;
          margin: 0 10px; width: 100px; height: 100px;
          background: #fff; border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.08);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .pt-mobile-card:active { transform: scale(0.98); }
        .pt-mobile-logo  { width: 42px; height: 42px; object-fit: contain; margin-bottom: 8px; }
        .pt-mobile-icon  { width: 38px; height: 38px; margin-bottom: 8px; display: flex; align-items: center; justify-content: center; }
        .pt-mobile-label {
          font-family: 'Inter', sans-serif; font-weight: 600;
          font-size: 8.5px; color: #4a5568;
          text-align: center; padding: 0 6px; line-height: 1.3;
        }

        /* ══════════════════════════════════════════════════════════════════ */
        /* RESPONSIVE */
        /* ══════════════════════════════════════════════════════════════════ */
        @media (max-width: 768px) {
          .jobs-banner-bg      { height: 380px; }
          .jobs-banner-content { padding: 28px 24px; }
          .jobs-banner-icon    { width: 44px; height: 44px; }
          .jobs-banner-title   { font-size: clamp(1.4rem, 5vw, 1.8rem); }
          .jobs-banner-stats   { gap: 12px; }
          .jobs-banner-stat-divider { height: 20px; }
          .jobs-grid           { grid-template-columns: 1fr; }
          .jobs-toolbar        { padding: 12px; }
          .jobs-select-wrap select { padding: 8px 4px; font-size: 12px; }
        }

        @media (max-width: 480px) {
          .jobs-banner-title   { font-size: clamp(1.3rem, 5vw, 1.6rem); }
          .job-card-details    { grid-template-columns: 1fr; }
        }

        /* Reduced motion — strip all non-essential animations */
        @media (prefers-reduced-motion: reduce) {
          .job-card, .job-card-save, .job-card-apply,
          .jobs-load-more, .jobs-banner-image,
          .pt-track, .pt-mobile-track, .pt-card,
          .pt-ring-cw, .pt-ring-ccw, .pt-hover-pulse,
          .pt-blob-a, .pt-blob-b {
            transition: none !important;
            animation: none !important;
          }
          .jobs-banner-image { transform: none !important; }
        }
      `}</style>

      <main id="main-content">
        <JobsSection />
        <PartnersSection />
      </main>
    </>
  );
}