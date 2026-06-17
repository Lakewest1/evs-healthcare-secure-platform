import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
  MapPin,
  Clock,
  Shield,
  Bookmark,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Featured Jobs Section — Premium Job Cards with Tilt + Spotlight Interaction
// Features: staggered reveal, mouse-tracked tilt/spotlight (desktop), salary
// indicators, urgent badges, mobile "show more" truncation.
//
// SECURITY NOTE: like Jobs.jsx, this renders only hardcoded local data — no
// live injection surface today. The styling conventions below (CSS classes,
// CSS custom properties driven by clamped numeric state rather than raw
// string interpolation) are kept so this component doesn't need a structural
// rewrite the day job listings come from an API. See Apply.jsx for the
// security model on this site's actual user-input path (the application form).
// ─────────────────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return [ref, isInView];
}

// Single shared viewport hook — the original mounted three independent
// `resize` listeners across different effects (one in FeaturedJobs, one
// per JobCard instance) for what is conceptually one piece of state. Each
// was cleaned up correctly, so it wasn't a leak, but six job cards meant six
// near-identical listeners firing on every resize. Centralizing avoids that
// fan-out as more cards or breakpoints get added.
function useViewport() {
  const [width, setWidth] = useState(() =>
    typeof window === "undefined" ? 1280 : window.innerWidth
  );

  useEffect(() => {
    let frame = null;
    const onResize = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setWidth(window.innerWidth);
        frame = null;
      });
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return {
    width,
    isMobile: width < 768,
    columns: width < 640 ? 1 : width < 1024 ? 2 : 3,
  };
}

const jobs = [
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
  },
];

const MAX_PAY_VALUE = 30;

function JobCard({ job, index, isInView, isMobile }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  // Tracked as CSS custom properties on the card root rather than re-rendering
  // inline style strings on every mousemove pixel — same visual effect, far
  // less render churn, and nothing here echoes raw event data into markup.
  const cardRef = useRef(null);
  const JobIcon = job.icon;
  const active = (isHovered || isFocused) && !isMobile;

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, delay: Math.min(index * 0.08, 0.4), type: "spring", stiffness: 100, damping: 20 },
    },
  };

  const handleMouseMove = useCallback((e) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty("--mx", `${x}`);
    cardRef.current.style.setProperty("--my", `${y}`);
    cardRef.current.style.setProperty("--rx", `${(y - 50) * 0.08}deg`);
    cardRef.current.style.setProperty("--ry", `${(x - 50) * 0.08}deg`);
  }, [isMobile]);

  const resetTilt = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--rx", "0deg");
    cardRef.current.style.setProperty("--ry", "0deg");
  }, []);

  const handleApplyClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => navigate(`/apply?job=${job.id}`), 300);
  }, [navigate, job.id]);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="fj-card-shell"
    >
      <div
        ref={cardRef}
        className={`fj-card ${active ? "active" : ""}`}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setIsHovered(false);
          resetTilt();
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <div className="fj-card-spotlight" aria-hidden="true" />
        <div className="fj-card-accent" aria-hidden="true" />

        <button
          type="button"
          onClick={() => setIsSaved((s) => !s)}
          className={`fj-card-save ${isSaved ? "active" : ""}`}
          aria-label={isSaved ? "Remove from saved jobs" : "Save this job"}
          aria-pressed={isSaved}
        >
          <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
        </button>

        <AnimatePresence>
          {job.urgent && (
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              className="fj-card-urgent"
            >
              <Flame size={11} aria-hidden="true" /> Urgent
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`fj-card-icon ${job.urgent ? "with-badge" : ""}`}>
          <JobIcon size={26} strokeWidth={1.6} aria-hidden="true" />
        </div>

        <h3 className="fj-card-title">{job.title}</h3>
        <span className="fj-card-type">{job.type}</span>

        <div className="fj-card-details">
          <div className="fj-card-detail">
            <MapPin size={14} aria-hidden="true" />
            <span>{job.location}</span>
          </div>

          <div className="fj-card-detail fj-card-detail-pay">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            <span>{job.pay}</span>
            {!isMobile && (
              <span
                className="fj-card-pay-bar"
                style={{ width: active ? `${(job.payValue / MAX_PAY_VALUE) * 100}%` : "0%" }}
              />
            )}
          </div>

          <div className="fj-card-detail">
            <Clock size={14} aria-hidden="true" />
            <span>{job.shift}</span>
          </div>
        </div>

        <div className="fj-card-experience">
          <Shield size={11} aria-hidden="true" />
          <span>{job.experience}</span>
        </div>

        <button type="button" onClick={handleApplyClick} className="fj-card-apply">
          <span>Apply for this role →</span>
        </button>

        <div className="fj-card-corner" aria-hidden="true" />
      </div>
    </motion.div>
  );
}

export default function FeaturedJobs() {
  const [ref, inView] = useReveal(0.1);
  const { isMobile, columns } = useViewport();
  const [filter, setFilter] = useState("all");
  const [showAllJobs, setShowAllJobs] = useState(false);

  const filters = [
    { key: "all", label: "All jobs" },
    { key: "urgent", label: "Urgent" },
    { key: "nursing", label: "Nursing" },
    { key: "care", label: "Care" },
  ];

  const visibleJobs = useMemo(() => {
    switch (filter) {
      case "urgent":
        return jobs.filter((j) => j.urgent);
      case "nursing":
        return jobs.filter((j) => j.title.includes("Nurse"));
      case "care":
        return jobs.filter((j) => j.title.includes("Care") || j.title.includes("Support"));
      default:
        return jobs;
    }
  }, [filter]);

  useEffect(() => {
    setShowAllJobs(false);
  }, [filter]);

  const displayedJobs = isMobile && !showAllJobs && visibleJobs.length > 3
    ? visibleJobs.slice(0, 3)
    : visibleJobs;
  const hasMoreJobs = isMobile && visibleJobs.length > 3;

  return (
    <section id="jobs" ref={ref} className="fj-section">
      <div className="fj-rule fj-rule-top" aria-hidden="true" />
      <div className="fj-rule fj-rule-bottom" aria-hidden="true" />

      <div className="fj-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fj-header"
        >
          <div>
            <div className="fj-eyebrow">
              <span className="fj-eyebrow-line" aria-hidden="true" />
              <span>Open positions</span>
              <span className="fj-eyebrow-line" aria-hidden="true" />
            </div>

            <h2 className="fj-heading">Featured Healthcare Jobs</h2>

            <p className="fj-intro">
              Discover rewarding opportunities in healthcare across North-West England.{" "}
              <a href="#register" className="fj-intro-link">Register for weekly job alerts →</a>
            </p>
          </div>

          <a href="#all-jobs" className="fj-view-all">
            View all jobs
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="fj-filters"
          role="tablist"
          aria-label="Filter jobs by category"
        >
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={filter === f.key}
              onClick={() => setFilter(f.key)}
              className={`fj-filter ${filter === f.key ? "active" : ""}`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fj-grid"
            style={{ "--fj-cols": columns }}
          >
            {displayedJobs.map((job, idx) => (
              <JobCard key={`${job.id}-${filter}`} job={job} index={idx} isInView={inView} isMobile={isMobile} />
            ))}
          </motion.div>
        </AnimatePresence>

        {hasMoreJobs && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="fj-more-wrap"
          >
            <button type="button" onClick={() => setShowAllJobs((s) => !s)} className="fj-more-btn">
              {showAllJobs ? (
                <>Show less jobs <ChevronDown size={14} style={{ transform: "rotate(180deg)" }} /></>
              ) : (
                <>Show more jobs <ChevronDown size={14} /></>
              )}
            </button>
            <p className="fj-more-hint">
              {showAllJobs
                ? `${displayedJobs.length} jobs displayed`
                : `Showing ${Math.min(3, visibleJobs.length)} of ${visibleJobs.length} jobs`}
            </p>
          </motion.div>
        )}

        {visibleJobs.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fj-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <h3>No jobs found in this category</h3>
            <p>Try adjusting your filter or check back later for new opportunities</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="fj-divider"
        >
          <span className="fj-divider-line" />
          <motion.span
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="fj-divider-dot"
          />
          <span className="fj-divider-line" />
        </motion.div>
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
        }

        .fj-section {
          padding: clamp(60px, 10vh, 100px) clamp(16px, 5vw, 80px);
          background: #ffffff;
          position: relative;
          overflow: hidden;
        }
        .fj-rule {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          opacity: 0.3;
        }
        .fj-rule-top { top: 0; }
        .fj-rule-bottom { bottom: 0; }

        .fj-container { max-width: 1200px; margin: 0 auto; }

        .fj-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 48px;
        }
        .fj-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--gold);
        }
        .fj-eyebrow-line { width: 30px; height: 2px; background: var(--gold); border-radius: 999px; }

        .fj-heading {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 800;
          color: var(--navy);
          letter-spacing: -0.02em;
          margin: 0;
        }

        .fj-intro {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: var(--muted);
          margin-top: 10px;
          max-width: 440px;
          line-height: 1.6;
        }
        .fj-intro-link {
          color: var(--gold);
          font-weight: 600;
          text-decoration: none;
          border-bottom: 1px solid rgba(196,151,42,0.35);
          padding-bottom: 1px;
          transition: color 0.2s ease;
        }
        .fj-intro-link:hover { color: var(--gold-deep); }
        .fj-intro-link:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }

        .fj-view-all {
          font-family: 'Inter', sans-serif;
          color: var(--gold);
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: transform 0.2s ease;
        }
        .fj-view-all:hover { transform: translateX(4px); }
        .fj-view-all:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; border-radius: 4px; }

        .fj-filters {
          display: flex;
          gap: 12px;
          margin-bottom: 32px;
          flex-wrap: wrap;
          border-bottom: 1px solid var(--line);
          padding-bottom: 16px;
        }
        .fj-filter {
          background: transparent;
          border: 1px solid rgba(0,0,0,0.08);
          padding: 8px 18px;
          border-radius: 40px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: var(--muted);
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .fj-filter:hover { transform: translateY(-1px); border-color: rgba(196,151,42,0.4); }
        .fj-filter.active {
          background: linear-gradient(135deg, var(--gold), var(--gold-deep));
          border-color: transparent;
          color: var(--navy);
        }
        .fj-filter:focus-visible { outline: 2px solid var(--navy); outline-offset: 2px; }

        .fj-grid {
          display: grid;
          grid-template-columns: repeat(var(--fj-cols, 3), 1fr);
          gap: 24px;
        }

        .fj-card-shell { position: relative; perspective: 1000px; height: 100%; }

        .fj-card {
          --mx: 50; --my: 50; --rx: 0deg; --ry: 0deg;
          position: relative;
          background: #ffffff;
          border-radius: 24px;
          padding: 28px;
          height: 100%;
          border: 1px solid var(--line);
          box-shadow: 0 4px 12px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03);
          transition: box-shadow 0.3s ease, border-color 0.3s ease, transform 0.1s ease;
          transform: rotateX(var(--rx)) rotateY(var(--ry));
          cursor: pointer;
          overflow: hidden;
        }
        .fj-card.active {
          border-color: rgba(196,151,42,0.25);
          box-shadow: 0 20px 40px -12px rgba(15,29,61,0.15), 0 0 0 1px rgba(196,151,42,0.2);
        }
        .fj-card:focus-within { outline: 2px solid var(--gold); outline-offset: 2px; }

        .fj-card-spotlight {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: 24px;
          opacity: 0;
          background: radial-gradient(circle at calc(var(--mx) * 1%) calc(var(--my) * 1%), rgba(196,151,42,0.8), transparent 50%);
          transition: opacity 0.2s ease;
        }
        .fj-card.active .fj-card-spotlight { opacity: 0.06; }

        .fj-card-accent {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--gold-light), var(--gold));
          border-radius: 24px 24px 0 0;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .fj-card.active .fj-card-accent { transform: scaleX(1); }

        .fj-card-save {
          position: absolute;
          top: 20px; right: 20px;
          width: 32px; height: 32px;
          border-radius: 50%;
          background: rgba(0,0,0,0.04);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          color: var(--muted);
          transition: background 0.25s ease, color 0.25s ease, transform 0.15s ease;
        }
        .fj-card-save:hover { transform: scale(1.08); }
        .fj-card-save.active { background: var(--gold); color: #fff; }
        .fj-card-save:focus-visible { outline: 2px solid var(--navy); outline-offset: 2px; }

        .fj-card-urgent {
          position: absolute;
          top: 20px; left: 20px;
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: #fff;
          font-size: 10px;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          letter-spacing: 1px;
          padding: 3px 8px;
          border-radius: 20px;
          box-shadow: 0 2px 8px rgba(239,68,68,0.3);
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 4px;
          text-transform: uppercase;
        }

        .fj-card-icon {
          width: 56px; height: 56px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(196,151,42,0.12), rgba(196,151,42,0.04));
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          color: var(--gold);
          transition: transform 0.3s ease;
        }
        .fj-card-icon.with-badge { margin-top: 20px; }
        .fj-card.active .fj-card-icon { transform: scale(1.05) rotate(5deg); }

        .fj-card-title {
          font-family: 'Inter', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--navy);
          margin: 0 0 4px;
          letter-spacing: -0.01em;
          transition: color 0.25s ease;
        }
        .fj-card.active .fj-card-title { color: var(--gold); }

        .fj-card-type {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: var(--muted);
          font-weight: 500;
        }

        .fj-card-details { margin: 16px 0; display: flex; flex-direction: column; gap: 8px; }
        .fj-card-detail {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          color: #4a5568;
        }
        .fj-card-detail svg { color: var(--gold); flex-shrink: 0; }
        .fj-card-detail-pay { color: var(--navy); font-weight: 700; }
        .fj-card-pay-bar {
          height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--gold-light));
          border-radius: 2px;
          max-width: 70px;
          transition: width 0.5s ease;
        }

        .fj-card-experience {
          background: rgba(196,151,42,0.08);
          padding: 3px 8px;
          border-radius: 10px;
          margin-bottom: 16px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: var(--gold);
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 500;
        }

        .fj-card-apply {
          display: block;
          width: 100%;
          text-align: center;
          background: var(--navy);
          color: #ffffff;
          padding: 12px 20px;
          border-radius: 14px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 13px;
          border: none;
          cursor: pointer;
          transition: background 0.3s ease, color 0.3s ease, transform 0.2s ease;
        }
        .fj-card-apply:hover {
          background: linear-gradient(135deg, var(--gold), var(--gold-deep));
          color: var(--navy);
        }
        .fj-card-apply:active { transform: scale(0.98); }
        .fj-card-apply:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }

        .fj-card-corner {
          position: absolute;
          bottom: 16px; right: 16px;
          width: 40px; height: 40px;
          border-right: 2px solid var(--gold);
          border-bottom: 2px solid var(--gold);
          border-radius: 0 0 12px 0;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .fj-card.active .fj-card-corner { opacity: 0.3; }

        .fj-empty {
          text-align: center;
          padding: 60px 20px;
          background: rgba(0,0,0,0.02);
          border-radius: 24px;
          color: var(--muted-soft);
        }
        .fj-empty h3 {
          font-family: 'Inter', sans-serif;
          font-size: 18px;
          color: var(--muted);
          margin-top: 16px;
        }
        .fj-empty p { font-family: 'Inter', sans-serif; font-size: 14px; color: var(--muted-soft); margin-top: 8px; }

        .fj-more-wrap { text-align: center; margin-top: 32px; }
        .fj-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: 1px solid rgba(196,151,42,0.3);
          color: var(--gold);
          padding: 12px 28px;
          border-radius: 40px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .fj-more-btn:hover { background: rgba(196,151,42,0.08); }
        .fj-more-btn:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }
        .fj-more-hint { font-family: 'Inter', sans-serif; font-size: 11px; color: var(--muted-soft); margin-top: 10px; }

        .fj-divider {
          margin-top: clamp(48px, 8vh, 64px);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        .fj-divider-line { width: 60px; height: 1px; background: rgba(196,151,42,0.3); border-radius: 999px; }
        .fj-divider-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold); display: inline-block; }

        @media (prefers-reduced-motion: reduce) {
          .fj-card, .fj-card-icon, .fj-card-title, .fj-filter, .fj-card-apply { transition: none; }
        }

        @media (max-width: 767px) {
          .fj-card { padding: 20px; transform: none !important; }
          .fj-card-icon { width: 48px; height: 48px; margin-bottom: 12px; }
          .fj-card-icon.with-badge { margin-top: 16px; }
          .fj-card-title { font-size: 16px; }
          .fj-card-type { font-size: 10px; }
          .fj-card-detail span { font-size: 12px; }
          .fj-card-experience span { font-size: 9px; }
          .fj-card-apply { padding: 10px 16px; font-size: 12px; }
          .fj-card-save, .fj-card-urgent { top: 12px; }
          .fj-card-save { right: 12px; }
          .fj-card-urgent { left: 12px; font-size: 9px; }
          .fj-card-corner { width: 24px; height: 24px; bottom: 8px; right: 8px; }
        }
      `}</style>
    </section>
  );
}