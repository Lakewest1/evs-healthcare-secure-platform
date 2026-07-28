// ─────────────────────────────────────────────────────────────────────────────
// EVS Healthcare Solutions — Jobs Page
// Fonts: Manrope (headings, stat numbers), Inter (body, buttons, UI)
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
//  SECTION — JOBS
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
    location: "Across London",
    pay: "£13–£23/hr",
    payValue: 18,
    urgent: false,
    icon: Building2,
    shift: "Flexible Hours",
    experience: "Plus Training",
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
    location: "Across London",
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
    location: "Across London",
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
          Explore {JOBS_DATA.length} opportunities across North-West England -
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
//  ROOT EXPORT — Jobs Only
// ══════════════════════════════════════════════════════════════════════════════
// ─────────────────────────────────────────────────────────────────────────────
export default function Jobs() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700;14..32,800;14..32,900&family=Manrope:wght@400;500;600;700;800&display=swap');

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
          align-items: center;
          justify-content: center;
          text-align: center;
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
          font-family: 'Manrope', sans-serif;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 700;
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
        .jobs-banner-stats { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; justify-content: center; }
        .jobs-banner-stat  { display: flex; align-items: baseline; gap: 6px; }
        .jobs-banner-stat-number {
          font-family: 'Manrope', sans-serif;
          font-size: clamp(20px, 2vw, 26px);
          font-weight: 700;
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
          font-family: 'Manrope', sans-serif;
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
        .jobs-empty h3 { font-family: 'Manrope', sans-serif; font-size: 20px; color: #0f1d3d; margin: 16px 0 8px; }
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
          .jobs-load-more, .jobs-banner-image {
            transition: none !important;
            animation: none !important;
          }
          .jobs-banner-image { transform: none !important; }
        }
      `}</style>

      <main id="main-content">
        <JobsSection />
      </main>
    </>
  );
}