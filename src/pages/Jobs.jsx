import { useRef, useState, useEffect } from "react";
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
  Search,
  Filter,
  X,
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

// ─────────────────────────────────────────────────────────────────────────────
// Job Card Component
// ─────────────────────────────────────────────────────────────────────────────
function JobCard({ job, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [mobile, setMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMobile(window.innerWidth < 768);
  }, []);

  const JobIcon = job.icon;

  const handleApplyClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      navigate(`/apply?job=${job.id}`);
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => !mobile && setIsHovered(true)}
      onMouseLeave={() => !mobile && setIsHovered(false)}
      style={{
        position: "relative",
        background: "#ffffff",
        borderRadius: "20px",
        padding: mobile ? "20px" : "24px",
        border: `1px solid ${isHovered ? "rgba(196,151,42,0.3)" : "rgba(0,0,0,0.06)"}`,
        boxShadow: isHovered
          ? "0 12px 30px -12px rgba(15,29,61,0.12)"
          : "0 2px 8px rgba(0,0,0,0.04)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Top Row: Icon, Title, Urgent Badge */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            width: mobile ? 44 : 52,
            height: mobile ? 44 : 52,
            borderRadius: "14px",
            background: "linear-gradient(135deg, rgba(196,151,42,0.12), rgba(196,151,42,0.04))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#C4972A",
            flexShrink: 0,
          }}
        >
          <JobIcon size={mobile ? 20 : 24} strokeWidth={1.6} />
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: mobile ? 16 : 18,
                fontWeight: 700,
                color: "#0f1d3d",
                margin: 0,
              }}
            >
              {job.title}
            </h3>
            {job.urgent && (
              <span
                style={{
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  color: "#fff",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: 1,
                  padding: "2px 10px",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Flame size={10} /> URGENT
              </span>
            )}
          </div>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              color: "#64748b",
            }}
          >
            {job.type} • {job.department}
          </span>
        </div>
      </div>

      {/* Details Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
          gap: 8,
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4972A" strokeWidth="1.8">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#4a5568" }}>
            {job.location}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4972A" strokeWidth="1.8">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#0f1d3d", fontWeight: 700 }}>
            {job.pay}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4972A" strokeWidth="1.8">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#64748b" }}>
            {job.shift}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4972A" strokeWidth="1.8">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#64748b" }}>
            {job.experience}
          </span>
        </div>
      </div>

      {/* Bottom Row: Posted Date + Apply Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          paddingTop: 14,
          borderTop: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            color: "#94a3b8",
          }}
        >
          Posted {job.posted}
        </span>

        <div style={{ display: "flex", gap: 10 }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsSaved(!isSaved);
            }}
            style={{
              padding: "8px 14px",
              borderRadius: "10px",
              background: isSaved ? "#C4972A" : "rgba(0,0,0,0.04)",
              border: "none",
              color: isSaved ? "#ffffff" : "#64748b",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              transition: "all 0.2s ease",
            }}
          >
            {isSaved ? "Saved ✓" : "Save"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleApplyClick}
            style={{
              padding: "8px 24px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #C4972A, #8B6914)",
              border: "none",
              color: "#0f1d3d",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 700,
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(196,151,42,0.25)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(196,151,42,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(196,151,42,0.25)";
            }}
          >
            Apply Now →
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Jobs Page Component
// ─────────────────────────────────────────────────────────────────────────────
export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [visibleCount, setVisibleCount] = useState(6);

  const departments = ["All", ...new Set(JOBS_DATA.map((job) => job.department))];

  // Filter and sort jobs
  const getFilteredJobs = () => {
    let filtered = JOBS_DATA;

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(term) ||
          job.location.toLowerCase().includes(term) ||
          job.department.toLowerCase().includes(term)
      );
    }

    // Department filter
    if (filterDepartment !== "All") {
      filtered = filtered.filter((job) => job.department === filterDepartment);
    }

    // Sort
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.posted) - new Date(a.posted));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.posted) - new Date(b.posted));
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
  };

  const filteredJobs = getFilteredJobs();
  const displayedJobs = filteredJobs.slice(0, visibleCount);
  const hasMore = visibleCount < filteredJobs.length;

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, filteredJobs.length));
  };

  return (
    <section
      style={{
        padding: "clamp(80px, 12vh, 120px) clamp(16px, 5vw, 80px)",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 40 }}
        >
          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              color: "#0f1d3d",
              marginBottom: 8,
              letterSpacing: "-0.02em",
            }}
          >
            All Jobs
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              color: "#64748b",
            }}
          >
            Discover {JOBS_DATA.length} healthcare opportunities across North-West England
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 32,
            alignItems: "center",
            background: "#ffffff",
            padding: 16,
            borderRadius: "16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            border: "1px solid rgba(0,0,0,0.04)",
          }}
        >
          {/* Search */}
          <div
            style={{
              flex: 1,
              minWidth: 200,
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "#f1f5f9",
              borderRadius: "10px",
              padding: "0 14px",
            }}
          >
            <Search size={18} color="#94a3b8" />
            <input
              type="text"
              placeholder="Search jobs, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                padding: "10px 0",
                border: "none",
                background: "transparent",
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: "#0f1d3d",
                outline: "none",
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#94a3b8",
                  padding: 4,
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Department Filter */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#f1f5f9",
              borderRadius: "10px",
              padding: "0 14px",
            }}
          >
            <Filter size={16} color="#94a3b8" />
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              style={{
                padding: "10px 8px",
                border: "none",
                background: "transparent",
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: "#0f1d3d",
                outline: "none",
                cursor: "pointer",
              }}
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#f1f5f9",
              borderRadius: "10px",
              padding: "0 14px",
            }}
          >
            <span style={{ fontSize: 12, color: "#94a3b8" }}>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: "10px 8px",
                border: "none",
                background: "transparent",
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: "#0f1d3d",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="highest">Highest Pay</option>
              <option value="lowest">Lowest Pay</option>
            </select>
          </div>
        </motion.div>

        {/* Results Count */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: "#64748b",
            }}
          >
            Showing <strong>{displayedJobs.length}</strong> of{" "}
            <strong>{filteredJobs.length}</strong> jobs
          </p>
        </div>

        {/* Job Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 20,
          }}
        >
          {displayedJobs.map((job, index) => (
            <JobCard key={job.id} job={job} index={index} />
          ))}
        </div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: "center",
              padding: "80px 20px",
              background: "#ffffff",
              borderRadius: "20px",
              border: "1px solid rgba(0,0,0,0.04)",
            }}
          >
            <Search size={48} color="#94a3b8" style={{ margin: "0 auto 16px", display: "block" }} />
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 20,
                color: "#0f1d3d",
                marginBottom: 8,
              }}
            >
              No jobs found
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: "#94a3b8",
              }}
            >
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}

        {/* Load More */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ textAlign: "center", marginTop: 32 }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={loadMore}
              style={{
                padding: "12px 40px",
                borderRadius: "40px",
                background: "transparent",
                border: "1px solid #C4972A",
                color: "#C4972A",
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#C4972A";
                e.currentTarget.style.color = "#0f1d3d";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#C4972A";
              }}
            >
              Load More Jobs <ChevronDown size={16} style={{ display: "inline", marginLeft: 8 }} />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}