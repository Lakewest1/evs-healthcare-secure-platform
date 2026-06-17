import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Jobs Page — All Available Positions
// Features: Search, filter, sort, pagination, apply functionality
// ─────────────────────────────────────────────────────────────────────────────

const JOBS_DATA = [
  {
    id: 1,
    title: "Registered Nurse (RGN)",
    type: "Temporary / Permanent",
    location: "Preston, Lancashire",
    pay: "£26–£38/hr",
    payValue: 21,
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
    payValue: 13.5,
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
    payValue: 12.5,
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
    payValue: 26,
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
    payValue: 15.5,
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
    pay: "£14.50–£12/hr",
    payValue: 11.25,
    urgent: false,
    icon: Star,
    shift: "Morning / Afternoon",
    experience: "Basic cleaning skills",
    department: "Support",
    posted: "2 weeks ago",
  },
];

// Relative-time strings like "2 days ago" don't parse via `new Date()` —
// the original sort silently produced NaN comparisons for "newest"/"oldest".
// This converts each string to an approximate day count purely for ordering.
const POSTED_TO_DAYS = (posted) => {
  const match = posted.match(/(\d+)\s+(day|week)/);
  if (!match) return 0;
  const [, num, unit] = match;
  return unit === "week" ? Number(num) * 7 : Number(num);
};

function JobCard({ job, index }) {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const JobIcon = job.icon;

  const handleApplyClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => navigate(`/apply?job=${job.id}`), 300);
  }, [navigate, job.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3), ease: [0.16, 1, 0.3, 1] }}
      className="job-card"
    >
      <div className="job-card-top">
        <div className="job-card-icon">
          <JobIcon size={24} strokeWidth={1.6} aria-hidden="true" />
        </div>

        <div className="job-card-heading">
          <div className="job-card-title-row">
            <h3 className="job-card-title">{job.title}</h3>
            {job.urgent && (
              <span className="job-card-urgent">
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
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
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
            className={`job-card-save ${isSaved ? "active" : ""}`}
            aria-pressed={isSaved}
          >
            {isSaved ? "Saved ✓" : "Save"}
          </button>

          <button type="button" onClick={handleApplyClick} className="job-card-apply">
            Apply now →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Banner Component with Cloudinary Background
// ─────────────────────────────────────────────────────────────────────────────
function JobsBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="jobs-banner"
    >
      <div className="jobs-banner-bg">
        <img
          src="https://res.cloudinary.com/dbqdgvvgq/image/upload/v1780786463/mathekame-hospital-5765027_1920_ojwyi1.jpg"
          alt="EVS Healthcare - Hospital and Healthcare Careers"
          className="jobs-banner-image"
          loading="eager"
        />
        <div className="jobs-banner-overlay" />
      </div>
      <div className="jobs-banner-content">
        <div className="jobs-banner-icon">
          <Briefcase size={28} strokeWidth={1.6} />
        </div>
        <h1 className="jobs-banner-title">
          Find Your <span className="jobs-banner-highlight">Dream Healthcare Role</span>
        </h1>
        <p className="jobs-banner-subtitle">
          Explore {JOBS_DATA.length} opportunities across North-West England — 
          from nursing to support roles, we have the perfect position for you.
        </p>
        <div className="jobs-banner-stats">
          <div className="jobs-banner-stat">
            <span className="jobs-banner-stat-number">{JOBS_DATA.length}</span>
            <span className="jobs-banner-stat-label">Open Positions</span>
          </div>
          <div className="jobs-banner-stat-divider" />
          <div className="jobs-banner-stat">
            <span className="jobs-banner-stat-number">6</span>
            <span className="jobs-banner-stat-label">Departments</span>
          </div>
          <div className="jobs-banner-stat-divider" />
          <div className="jobs-banner-stat">
            <span className="jobs-banner-stat-number">24/7</span>
            <span className="jobs-banner-stat-label">Support Available</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [visibleCount, setVisibleCount] = useState(6);

  const departments = useMemo(
    () => ["All", ...new Set(JOBS_DATA.map((job) => job.department))],
    []
  );

  // Recomputed via useMemo from the immutable JOBS_DATA source rather than
  // sorting `filtered` in place — the original directly called `.sort()` on
  // an array derived from `JOBS_DATA` without first cloning it, which under
  // React 18 strict mode's double-invoked effects could leave the shared
  // module-level array in an inconsistently mutated order across renders.
  const filteredJobs = useMemo(() => {
    let filtered = [...JOBS_DATA];

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(term) ||
          job.location.toLowerCase().includes(term) ||
          job.department.toLowerCase().includes(term)
      );
    }

    if (filterDepartment !== "All") {
      filtered = filtered.filter((job) => job.department === filterDepartment);
    }

    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => POSTED_TO_DAYS(a.posted) - POSTED_TO_DAYS(b.posted));
        break;
      case "oldest":
        filtered.sort((a, b) => POSTED_TO_DAYS(b.posted) - POSTED_TO_DAYS(a.posted));
        break;
      case "highest":
        filtered.sort((a, b) => b.payValue - a.payValue);
        break;
      case "lowest":
        filtered.sort((a, b) => a.payValue - b.payValue);
        break;
      default:
        break;
    }

    return filtered;
  }, [searchTerm, filterDepartment, sortBy]);

  const displayedJobs = filteredJobs.slice(0, visibleCount);
  const hasMore = visibleCount < filteredJobs.length;

  const loadMore = () => setVisibleCount((prev) => Math.min(prev + 6, filteredJobs.length));

  return (
    <section className="jobs-page">
      <div className="jobs-container">
        {/* ── Banner at the top ── */}
        <JobsBanner />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="jobs-toolbar"
        >
          <div className="jobs-search">
            <Search size={18} aria-hidden="true" />
            <input
              type="text"
              placeholder="Search jobs, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              maxLength={80}
              aria-label="Search jobs"
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
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="jobs-select-wrap">
            <span className="jobs-select-label">Sort:</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort jobs">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="highest">Highest pay</option>
              <option value="lowest">Lowest pay</option>
            </select>
          </div>
        </motion.div>

        <p className="jobs-count">
          Showing <strong>{displayedJobs.length}</strong> of <strong>{filteredJobs.length}</strong> jobs
        </p>

        <div className="jobs-grid">
          {displayedJobs.map((job, index) => (
            <JobCard key={job.id} job={job} index={index} />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="jobs-empty">
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
            <button type="button" onClick={loadMore} className="jobs-load-more">
              Load more jobs <ChevronDown size={16} />
            </button>
          </motion.div>
        )}
      </div>

      <style>{`
        :root {
          --navy: #0f1d3d;
          --gold: #C4972A;
          --gold-deep: #8B6914;
          --gold-light: #f0c060;
          --muted: #64748b;
          --muted-soft: #94a3b8;
          --line: rgba(0,0,0,0.06);
          --surface: #f8fafc;
        }

        .jobs-page {
          padding: clamp(80px, 12vh, 120px) clamp(16px, 5vw, 80px);
          background: var(--surface);
          min-height: 100vh;
        }
        .jobs-container { max-width: 1200px; margin: 0 auto; }

        /* ── BANNER STYLES ── */
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
        .jobs-banner:hover .jobs-banner-image {
          transform: scale(1.03);
        }
        .jobs-banner-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(15,29,61,0.88) 0%, rgba(15,29,61,0.60) 100%);
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
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: rgba(196,151,42,0.2);
          border: 1px solid rgba(196,151,42,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C4972A;
          margin-bottom: 16px;
        }
        .jobs-banner-title {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 0 0 8px 0;
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
          margin: 0 0 20px 0;
        }
        .jobs-banner-stats {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }
        .jobs-banner-stat {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
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
        .jobs-banner-stat-divider {
          width: 1px;
          height: 28px;
          background: rgba(255,255,255,0.2);
        }

        /* ── TOOLBAR ── */
        .jobs-toolbar {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          align-items: center;
          background: #fff;
          padding: 14px 16px;
          border-radius: 16px;
          box-shadow: 0 1px 2px rgba(15,29,61,0.04);
          border: 1px solid var(--line);
          margin-bottom: 28px;
        }

        .jobs-search {
          flex: 1;
          min-width: 200px;
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--surface);
          border-radius: 10px;
          padding: 0 14px;
          color: var(--muted-soft);
        }
        .jobs-search input {
          flex: 1;
          padding: 10px 0;
          border: none;
          background: transparent;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: var(--navy);
          outline: none;
        }
        .jobs-search input::placeholder { color: var(--muted-soft); }
        .jobs-search-clear {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--muted-soft);
          padding: 4px;
          display: flex;
          border-radius: 6px;
        }
        .jobs-search-clear:hover { color: var(--navy); background: rgba(0,0,0,0.04); }
        .jobs-search-clear:focus-visible,
        .jobs-search:has(input:focus-visible) {
          outline: 2px solid var(--gold);
          outline-offset: 2px;
        }

        .jobs-select-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--surface);
          border-radius: 10px;
          padding: 0 14px;
          color: var(--muted-soft);
        }
        .jobs-select-label { font-size: 12px; }
        .jobs-select-wrap select {
          padding: 10px 8px;
          border: none;
          background: transparent;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          color: var(--navy);
          outline: none;
          cursor: pointer;
        }
        .jobs-select-wrap select:focus-visible {
          outline: 2px solid var(--gold);
          outline-offset: 2px;
          border-radius: 4px;
        }

        .jobs-count {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: var(--muted);
          margin-bottom: 20px;
        }

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
          border: 1px solid var(--line);
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
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(196,151,42,0.14), rgba(196,151,42,0.04));
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gold);
          flex-shrink: 0;
        }
        .job-card-heading { flex: 1; min-width: 0; }
        .job-card-title-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .job-card-title {
          font-family: 'Inter', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--navy);
          margin: 0;
          letter-spacing: -0.005em;
        }
        .job-card-urgent {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 3px 9px;
          border-radius: 20px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          text-transform: uppercase;
        }
        .job-card-meta {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: var(--muted);
        }

        .job-card-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 9px;
          margin-bottom: 16px;
        }
        .job-card-detail {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          color: #4a5568;
        }
        .job-card-detail-icon { color: var(--gold); flex-shrink: 0; }
        .job-card-detail-pay { color: var(--navy); font-weight: 700; }
        .job-card-detail-pay svg { color: var(--gold); flex-shrink: 0; }

        .job-card-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          padding-top: 14px;
          border-top: 1px solid var(--line);
        }
        .job-card-posted {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: var(--muted-soft);
        }
        .job-card-actions { display: flex; gap: 10px; }

        .job-card-save {
          padding: 8px 14px;
          border-radius: 10px;
          background: rgba(0,0,0,0.04);
          border: none;
          color: var(--muted);
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 600;
          transition: background 0.2s ease, color 0.2s ease, transform 0.15s ease;
        }
        .job-card-save:hover { transform: scale(1.04); }
        .job-card-save.active { background: var(--gold); color: #fff; }
        .job-card-save:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }

        .job-card-apply {
          padding: 8px 22px;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--gold), var(--gold-deep));
          border: none;
          color: var(--navy);
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(196,151,42,0.25);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .job-card-apply:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(196,151,42,0.35); }
        .job-card-apply:focus-visible { outline: 2px solid var(--navy); outline-offset: 2px; }

        .jobs-empty {
          text-align: center;
          padding: 80px 20px;
          background: #fff;
          border-radius: 20px;
          border: 1px solid var(--line);
          color: var(--muted-soft);
        }
        .jobs-empty h3 {
          font-family: 'Inter', sans-serif;
          font-size: 20px;
          color: var(--navy);
          margin: 16px 0 8px;
        }
        .jobs-empty p { font-family: 'Inter', sans-serif; font-size: 14px; color: var(--muted-soft); }

        .jobs-load-more-wrap { text-align: center; margin-top: 32px; }
        .jobs-load-more {
          padding: 12px 40px;
          border-radius: 40px;
          background: transparent;
          border: 1px solid var(--gold);
          color: var(--gold);
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background 0.2s ease, color 0.2s ease, transform 0.15s ease;
        }
        .jobs-load-more:hover { background: var(--gold); color: var(--navy); transform: translateY(-1px); }
        .jobs-load-more:focus-visible { outline: 2px solid var(--navy); outline-offset: 3px; }

        /* ── MOBILE RESPONSIVE ── */
        @media (max-width: 768px) {
          .jobs-banner-bg { height: 380px; }
          .jobs-banner-content { padding: 28px 24px; }
          .jobs-banner-icon { width: 44px; height: 44px; }
          .jobs-banner-icon svg { width: 20px; height: 20px; }
          .jobs-banner-title { font-size: clamp(1.4rem, 5vw, 1.8rem); }
          .jobs-banner-stats { gap: 12px; }
          .jobs-banner-stat-divider { height: 20px; }
          .jobs-grid { grid-template-columns: 1fr; }
          .jobs-toolbar { padding: 12px; }
          .jobs-select-wrap select { padding: 8px 4px; font-size: 12px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .job-card, .job-card-save, .job-card-apply, .jobs-load-more,
          .jobs-banner-image { transition: none; }
          .jobs-banner-image { transform: none !important; }
        }
      `}</style>
    </section>
  );
}