import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Award,
  Brain,
  Shield,
  BookOpen,
  Clock,
  Search,
  Filter,
  X,
  ChevronDown,
  CheckCircle,
  Users,
  Star,
  Send,
  User,
  Mail,
  Phone,
  MessageSquare,
  ArrowRight,
  Loader2,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS — EVS Healthcare brand system
// ─────────────────────────────────────────────────────────────────────────────
const T = {
  navy:       "#0f1d3d",
  navyMid:    "#1a2a50",
  gold:       "#C4972A",
  goldDeep:   "#8B6914",
  goldLight:  "#f0c060",
  goldTint:   "rgba(196,151,42,0.08)",
  goldBorder: "rgba(196,151,42,0.18)",
  blue:       "#005EB8",
  green:      "#1a6b4a",
  muted:      "#64748b",
  mutedSoft:  "#94a3b8",
  line:       "rgba(0,0,0,0.06)",
  surface:    "#f8fafc",
  white:      "#ffffff",
  text:       "#4a5568",
};

const HEX_TO_RGB = {
  [T.gold]:  "196,151,42",
  [T.blue]:  "0,94,184",
  [T.green]: "26,107,74",
};

const EASE = { smooth: [0.16, 1, 0.3, 1] };

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: EASE.smooth } },
});

// ─── Scroll helper — scrolls to the form and optionally pre-fills a course ──
function scrollToForm(courseTitle = "") {
  const el = document.getElementById("training-enquiry-form");
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  if (courseTitle) {
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("evs:prefill-course", { detail: courseTitle })
      );
    }, 120);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const TRAINING_CATEGORIES = [
  {
    id: "mandatory",
    title: "Mandatory Training",
    icon: Shield,
    description: "Essential training for all healthcare staff to ensure compliance and patient safety.",
    color: T.gold,
    courses: [
      { id:  1, title: "PMVA - Prevention & Management of Violence & Aggression", duration: "2 days",     type: "Classroom" },
      { id:  2, title: "The Care Certification Induction",                         duration: "1 day",      type: "Classroom" },
      { id:  3, title: "Health & Safety including COSHH",                          duration: "Half day",   type: "Online" },
      { id:  4, title: "Fire Safety Awareness",                                    duration: "Half day",   type: "Online" },
      { id:  5, title: "Reporting of Incidents including RIDDOR",                  duration: "Half day",   type: "Online" },
      { id:  6, title: "Basic Life Support including Resuscitation",               duration: "1 day",      type: "Classroom" },
      { id:  7, title: "Safeguarding Adults & Children",                           duration: "1 day",      type: "Classroom" },
      { id:  8, title: "Moving & Positioning",                                     duration: "1 day",      type: "Classroom" },
      { id:  9, title: "Safe Handling of Medication",                              duration: "1 day",      type: "Classroom" },
      { id: 10, title: "Infection Prevention & Control",                            duration: "Half day",   type: "Online" },
      { id: 11, title: "Handling Information, GDPR & Record Keeping",              duration: "Half day",   type: "Online" },
      { id: 12, title: "Fluids & Nutrition",                                       duration: "Half day",   type: "Online" },
      { id: 13, title: "Basic Food Hygiene",                                       duration: "Half day",   type: "Online" },
      { id: 14, title: "Understanding of Role",                                    duration: "Half day",   type: "Online" },
      { id: 15, title: "Medication Competency Workshop",                            duration: "1 day",      type: "Classroom" },
      { id: 16, title: "Communication including Complaints Handling",              duration: "Half day",   type: "Online" },
      { id: 17, title: "Duty of Care",                                             duration: "Half day",   type: "Online" },
      { id: 18, title: "Working in a Person-Centred Way",                          duration: "Half day",   type: "Online" },
      { id: 19, title: "Privacy & Dignity",                                        duration: "Half day",   type: "Online" },
      { id: 20, title: "Equality, Diversity & Inclusion",                          duration: "Half day",   type: "Online" },
      { id: 21, title: "Mental Health, Dementia & Learning Disabilities",          duration: "1 day",      type: "Classroom" },
      { id: 22, title: "Epilepsy and Buccal Training",                             duration: "1 day",      type: "Classroom" },
      { id: 23, title: "MAPA Training",                                            duration: "2 days",     type: "Classroom" },
    ],
  },
  {
    id: "nvq",
    title: "NVQ Qualifications",
    icon: Award,
    description: "National Vocational Qualifications for career progression and professional development.",
    color: T.blue,
    courses: [
      { id: 24, title: "NVQ Level 1 - Introduction to Care",   duration: "3-6 months",   type: "Work-based" },
      { id: 25, title: "NVQ Level 2 - Certificate in Care",     duration: "6-9 months",   type: "Work-based" },
      { id: 26, title: "NVQ Level 3 - Diploma in Care",         duration: "9-12 months",  type: "Work-based" },
      { id: 27, title: "NVQ Level 4 - Advanced Diploma",        duration: "12-18 months", type: "Work-based" },
      { id: 28, title: "NVQ Level 5 - Leadership & Management", duration: "18-24 months", type: "Work-based" },
    ],
  },
  {
    id: "specialist",
    title: "Specialist Training",
    icon: Brain,
    description: "Advanced certifications for specific care needs and clinical specialisations.",
    color: T.green,
    courses: [
      { id: 29, title: "Dementia Care Specialist",    duration: "2 days", type: "Classroom" },
      { id: 30, title: "End of Life Care",            duration: "2 days", type: "Classroom" },
      { id: 31, title: "Mental Health Awareness",     duration: "1 day",  type: "Classroom" },
      { id: 32, title: "Learning Disability Support", duration: "2 days", type: "Classroom" },
      { id: 33, title: "Palliative Care Training",    duration: "2 days", type: "Classroom" },
    ],
  },
];

const TRAINING_PARTNERS = [
  { id: 1, name: "PRICE",                   color: T.gold  },
  { id: 2, name: "AVALON",                  color: T.blue  },
  { id: 3, name: "VERITA",                  color: T.green },
  { id: 4, name: "FLORENCE",                color: "#7B2D8E" },
  { id: 5, name: "NATIONAL MEDICATION CO.", color: "#E65100" },
];

const TOTAL_COURSES = TRAINING_CATEGORIES.reduce((n, c) => n + c.courses.length, 0);

// ─────────────────────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────
function useIsMobile(bp = 768) {
  const [mobile, setMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < bp : false
  );
  useEffect(() => {
    const update = () => setMobile(window.innerWidth < bp);
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, [bp]);
  return mobile;
}

function SectionEyebrow({ label }) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:14 }}>
      <div style={{ width:26, height:2, background:T.gold, borderRadius:999 }} />
      <span style={{ fontFamily:"'Inter',sans-serif", fontSize:10, fontWeight:700, letterSpacing:"4px", textTransform:"uppercase", color:T.gold }}>
        {label}
      </span>
      <div style={{ width:26, height:2, background:T.gold, borderRadius:999 }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BANNER
// ─────────────────────────────────────────────────────────────────────────────
function TrainingBanner() {
  const handleApplyNow = () => {
    scrollToForm();
  };

  return (
    <motion.div
      initial={{ opacity:0, y:20 }}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:0.65, ease:EASE.smooth }}
      className="tb-banner"
    >
      <div className="tb-banner-bg">
        <img
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1400&q=80"
          alt="EVS Healthcare - Training and Development"
          className="tb-banner-img"
          loading="eager"
          fetchPriority="high"
        />
        <div className="tb-banner-overlay" />
      </div>

      <div className="tb-banner-content">
        <div className="tb-banner-icon" aria-hidden="true">
          <GraduationCap size={26} strokeWidth={1.6} />
        </div>

        <h1 className="tb-banner-title">
          Professional{" "}
          <span className="tb-banner-highlight">Development</span>
        </h1>

        <p className="tb-banner-subtitle">
          Comprehensive training programmes to keep our staff compliant,
          skilled, and ready to deliver exceptional care across North-West England.
        </p>

        <div className="tb-banner-stats" role="list">
          {[
            { num: TOTAL_COURSES,              label: "Training Courses" },
            { num: TRAINING_CATEGORIES.length, label: "Categories" },
            { num: "5+",                        label: "Training Partners" },
            { num: "100%",                      label: "Compliance Rate" },
          ].map((s, i) => (
            <div key={i} style={{ display:"contents" }} role="listitem">
              {i > 0 && <div className="tb-divider" aria-hidden="true" />}
              <div className="tb-stat">
                <span className="tb-stat-num">{s.num}</span>
                <span className="tb-stat-lbl">{s.label}</span>
              </div>
            </div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleApplyNow}
          style={{
            marginTop: 20,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 28px",
            borderRadius: "50px",
            background: "linear-gradient(135deg, #C4972A, #8B6914)",
            color: "#fff",
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            width: "fit-content",
            boxShadow: "0 4px 16px rgba(196,151,42,0.32)",
          }}
        >
          Apply Now
          <ArrowRight size={14} />
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COURSE CARD — "Enrol" button scrolls to form and pre-fills the course
// ─────────────────────────────────────────────────────────────────────────────
function CourseCard({ course, index, categoryColor }) {
  const [hovered, setHovered] = useState(false);
  const rgb = HEX_TO_RGB[categoryColor] ?? "196,151,42";

  const handleEnrol = useCallback((e) => {
    e.stopPropagation();
    scrollToForm(course.title);
  }, [course.title]);

  return (
    <motion.div
      initial={{ opacity:0, y:16 }}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:0.38, delay:Math.min(index * 0.025, 0.25), ease:EASE.smooth }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cc-card"
      style={{
        border:    `1px solid ${hovered ? `rgba(${rgb},0.32)` : T.line}`,
        boxShadow: hovered ? `0 8px 24px rgba(${rgb},0.1), 0 2px 6px rgba(0,0,0,0.04)` : "0 1px 3px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      <div className="cc-card-inner">
        <div className="cc-bar" style={{ background:categoryColor }} aria-hidden="true" />
        <div className="cc-content">
          <p className="cc-title">{course.title}</p>
          <div className="cc-meta">
            <span className="cc-meta-item">
              <Clock size={11} aria-hidden="true" style={{ color:T.mutedSoft }} />
              {course.duration}
            </span>
            <span className="cc-meta-item">
              <BookOpen size={11} aria-hidden="true" style={{ color:T.mutedSoft }} />
              {course.type}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleEnrol}
          className="cc-enrol"
          style={{ background:`linear-gradient(135deg, ${categoryColor}, ${categoryColor}cc)` }}
          aria-label={`Enrol in ${course.title}`}
        >
          Enrol
          <ArrowRight size={11} aria-hidden="true" />
        </button>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TRAINING CATEGORY ACCORDION
// ─────────────────────────────────────────────────────────────────────────────
function TrainingCategory({ category, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, amount:0.1 });
  const [open, setOpen] = useState(index === 0);
  const Icon   = category.icon;
  const rgb    = HEX_TO_RGB[category.color] ?? "196,151,42";
  const headingId = `cat-heading-${category.id}`;
  const panelId   = `cat-panel-${category.id}`;

  return (
    <motion.div
      ref={ref}
      variants={fadeUp(index * 0.08)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="cat-block"
    >
      <button
        type="button"
        id={headingId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(o => !o)}
        className="cat-header"
        style={{
          background:   open ? `rgba(${rgb},0.05)` : "transparent",
          borderBottom: open ? `1px solid rgba(${rgb},0.12)` : "1px solid transparent",
        }}
      >
        <div className="cat-header-left">
          <div className="cat-icon" style={{ background:`rgba(${rgb},0.12)`, color:category.color }}>
            <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
          </div>
          <div className="cat-text">
            <span className="cat-title">{category.title}</span>
            <span className="cat-desc">{category.description}</span>
          </div>
        </div>

        <div className="cat-header-right">
          <span className="cat-count">{category.courses.length} courses</span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration:0.28, ease:EASE.smooth }}
            aria-hidden="true"
            style={{ display:"flex" }}
          >
            <ChevronDown size={18} color={T.mutedSoft} />
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headingId}
            initial={{ height:0, opacity:0 }}
            animate={{ height:"auto", opacity:1 }}
            exit={{ height:0, opacity:0 }}
            transition={{ duration:0.3, ease:EASE.smooth }}
            style={{ overflow:"hidden" }}
          >
            <div className="cat-panel">
              <div className="cat-grid">
                {category.courses.map((course, idx) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    index={idx}
                    categoryColor={category.color}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TRAINING PARTNERS
// ─────────────────────────────────────────────────────────────────────────────
function TrainingPartners() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, amount:0.2 });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp(0)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="tp-block"
      aria-label="Training partners"
    >
      <div className="tp-header">
        <SectionEyebrow label="Our Partners" />
        <h3 className="tp-title">Delivering Excellence Through Collaboration</h3>
        <p className="tp-sub">
          EVS has partnered with leading training providers to deliver both classroom
          and online programmes for all our staff.
        </p>
      </div>

      <div className="tp-pills" role="list">
        {TRAINING_PARTNERS.map((partner, idx) => (
          <motion.div
            key={partner.id}
            role="listitem"
            initial={{ opacity:0, scale:0.9 }}
            animate={inView ? { opacity:1, scale:1 } : {}}
            transition={{ delay:idx * 0.07, duration:0.35, ease:EASE.smooth }}
            className="tp-pill"
            style={{
              border:     `1px solid ${partner.color}38`,
              background: `${partner.color}0C`,
              color:      partner.color,
            }}
          >
            {partner.name}
          </motion.div>
        ))}
      </div>

      <p className="tp-footer">+ More training partners available</p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA STRIP — both buttons scroll to the form section
// ─────────────────────────────────────────────────────────────────────────────
function TrainingCTA() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, amount:0.3 });

  const handleApplyNow = () => {
    scrollToForm();
  };

  return (
    <motion.div
      ref={ref}
      variants={fadeUp(0)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="cta-strip"
      role="complementary"
      aria-label="Training call to action"
    >
      <div className="cta-glow" aria-hidden="true" />

      <div className="cta-inner">
        <motion.div
          initial={{ scale:0.7, opacity:0 }}
          animate={inView ? { scale:1, opacity:1 } : {}}
          transition={{ duration:0.5, delay:0.2, ease:EASE.smooth }}
          className="cta-icon"
          aria-hidden="true"
        >
          <GraduationCap size={24} strokeWidth={1.6} style={{ color:T.gold }} />
        </motion.div>

        <h2 className="cta-heading">
          Ready to{" "}
          <span style={{ color:T.gold }}>Advance Your Career</span>?
        </h2>

        <p className="cta-sub">
          Join our team and access comprehensive training programmes to build your skills
          and progress in healthcare.
        </p>

        <div className="cta-btns">
          <motion.button
            type="button"
            whileHover={{ scale:1.04, boxShadow:"0 10px 28px rgba(196,151,42,0.48)" }}
            whileTap={{ scale:0.97 }}
            onClick={() => scrollToForm()}
            className="cta-btn-primary"
          >
            Enquire About Training
            <ArrowRight size={14} aria-hidden="true" />
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale:1.03, background:"rgba(255,255,255,0.14)" }}
            whileTap={{ scale:0.97 }}
            onClick={handleApplyNow}
            className="cta-btn-secondary"
          >
            Apply Now
          </motion.button>
        </div>

        <div className="cta-trust" aria-label="Trust indicators">
          {[
            { icon:<CheckCircle size={13} style={{ color:T.gold }} />, text:"Fully accredited programmes" },
            { icon:<Users       size={13} style={{ color:T.gold }} />, text:"500+ staff trained" },
            { icon:<Star        size={13} style={{ color:T.gold }} />, text:"5-star compliance record" },
          ].map((item, i) => (
            <div key={i} className="cta-trust-item">
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TRAINING ENQUIRY FORM — Formspree integration
// ─────────────────────────────────────────────────────────────────────────────
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_TRAINING_ID || "YOUR_FORMSPREE_ID";

const INITIAL_FORM = {
  name:    "",
  email:   "",
  phone:   "",
  course:  "",
  message: "",
};

const FIELD_ERRORS = {
  name:    "Full name is required",
  email:   "A valid email address is required",
  phone:   "",
  course:  "Please select a course of interest",
  message: "",
};

function validate(fields) {
  const errs = {};
  if (!fields.name.trim())                          errs.name    = FIELD_ERRORS.name;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = FIELD_ERRORS.email;
  if (!fields.course)                               errs.course  = FIELD_ERRORS.course;
  return errs;
}

function TrainingForm() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, amount:0.15 });

  const [fields,    setFields]    = useState(INITIAL_FORM);
  const [errors,    setErrors]    = useState({});
  const [touched,   setTouched]   = useState({});
  const [status,    setStatus]    = useState("idle");
  const [focusedId, setFocusedId] = useState(null);
  const navigate = useNavigate();

  // Listen for prefill events from the Enrol buttons
  useEffect(() => {
    const handler = (e) => {
      setFields(prev => ({ ...prev, course: e.detail }));
      setErrors(prev => { const copy = { ...prev }; delete copy.course; return copy; });
    };
    window.addEventListener("evs:prefill-course", handler);
    return () => window.removeEventListener("evs:prefill-course", handler);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const errs = validate({ ...fields, [name]: value });
      setErrors(prev => ({ ...prev, [name]: errs[name] || undefined }));
    }
  }, [fields, touched]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const errs = validate(fields);
    setErrors(prev => ({ ...prev, [name]: errs[name] || undefined }));
    setFocusedId(null);
  }, [fields]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const allTouched = Object.keys(INITIAL_FORM).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);
    const errs = validate(fields);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const first = Object.keys(errs)[0];
      document.getElementById(`tf-${first}`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method:  "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body:    JSON.stringify({
          name:           fields.name,
          email:          fields.email,
          phone:          fields.phone || "Not provided",
          courseInterest: fields.course,
          message:        fields.message || "No additional message",
          _subject:       `Training Enquiry - ${fields.course || "General"} - EVS Healthcare`,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setFields(INITIAL_FORM);
        setTouched({});
        setErrors({});
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }, [fields]);

  const handleApplyNow = () => {
    scrollToForm();
  };

  const inputBorder = (name) => {
    if (errors[name])        return `1.5px solid #ef4444`;
    if (focusedId === name)  return `1.5px solid ${T.gold}`;
    return `1px solid ${T.line}`;
  };

  const inputShadow = (name) => {
    if (errors[name])       return "0 0 0 3px rgba(239,68,68,0.1)";
    if (focusedId === name) return "0 0 0 3px rgba(196,151,42,0.12)";
    return "none";
  };

  return (
    <motion.section
      ref={ref}
      id="training-enquiry-form"
      aria-label="Training enquiry form"
      variants={fadeUp(0)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="tf-section"
    >
      <div className="tf-blob tf-blob-tl" aria-hidden="true" />
      <div className="tf-blob tf-blob-br" aria-hidden="true" />

      <div className="tf-container">
        <div className="tf-left">
          <SectionEyebrow label="Get In Touch" />

          <h2 className="tf-heading">
            Start Your{" "}
            <span style={{ color:T.gold }}>Training Journey</span>
          </h2>

          <p className="tf-sub">
            Fill in the form and one of our training coordinators will be in touch
            within one business day to discuss your requirements.
          </p>

          <div className="tf-info-list" role="list">
            {[
              { icon:<CheckCircle size={16} style={{ color:T.gold, flexShrink:0 }} />, heading:"Accredited Programmes", body:"All courses are fully accredited and recognised across the NHS and private sector." },
              { icon:<Users       size={16} style={{ color:T.gold, flexShrink:0 }} />, heading:"Flexible Scheduling",   body:"Classroom and online options available to fit around your shifts and commitments." },
              { icon:<Star        size={16} style={{ color:T.gold, flexShrink:0 }} />, heading:"Expert Instructors",    body:"Delivered by experienced healthcare professionals with real clinical backgrounds." },
            ].map((item, i) => (
              <div key={i} className="tf-info-item" role="listitem">
                {item.icon}
                <div>
                  <p className="tf-info-heading">{item.heading}</p>
                  <p className="tf-info-body">{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="tf-direct">
            <span className="tf-direct-label">Prefer to call?</span>
            <a href="tel:+447466999218" className="tf-direct-link">
              <Phone size={14} aria-hidden="true" />
              07466999218
            </a>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleApplyNow}
            style={{
              marginTop: 20,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 24px",
              borderRadius: "50px",
              background: "linear-gradient(135deg, #C4972A, #8B6914)",
              color: "#fff",
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              width: "fit-content",
              boxShadow: "0 4px 16px rgba(196,151,42,0.32)",
            }}
          >
            Apply Now
            <ArrowRight size={14} />
          </motion.button>
        </div>

        <div className="tf-right">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity:0, scale:0.92 }}
                animate={{ opacity:1, scale:1 }}
                exit={{ opacity:0, scale:0.92 }}
                transition={{ duration:0.45, ease:EASE.smooth }}
                className="tf-success"
                role="status"
                aria-live="polite"
              >
                <motion.div
                  initial={{ scale:0 }}
                  animate={{ scale:1 }}
                  transition={{ delay:0.15, type:"spring", stiffness:260, damping:20 }}
                  className="tf-success-icon"
                >
                  <CheckCircle size={36} strokeWidth={1.6} style={{ color:T.gold }} />
                </motion.div>
                <h3 className="tf-success-title">Enquiry Received!</h3>
                <p className="tf-success-body">
                  Thank you for your interest. A member of our training team will contact you
                  within one business day to discuss next steps.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="tf-success-reset"
                >
                  Submit another enquiry
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity:0 }}
                animate={{ opacity:1 }}
                exit={{ opacity:0 }}
                transition={{ duration:0.3 }}
                onSubmit={handleSubmit}
                noValidate
                className="tf-form"
                aria-label="Training enquiry"
              >
                <p className="tf-form-intro">
                  Select a course above or choose from the dropdown below, then tell us a little about yourself.
                </p>

                {status === "error" && (
                  <div className="tf-error-banner" role="alert">
                    Something went wrong. Please try again or call us directly.
                  </div>
                )}

                <div className="tf-row">
                  <div className="tf-field">
                    <label htmlFor="tf-name" className="tf-label">
                      Full Name <span aria-hidden="true" style={{ color:"#ef4444" }}>*</span>
                    </label>
                    <div className="tf-input-wrap"
                      style={{ border:inputBorder("name"), boxShadow:inputShadow("name") }}>
                      <User size={15} aria-hidden="true" className="tf-input-icon" />
                      <input
                        id="tf-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Jane Smith"
                        value={fields.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={() => setFocusedId("name")}
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "tf-name-err" : undefined}
                        className="tf-input"
                        disabled={status === "submitting"}
                      />
                    </div>
                    {errors.name && (
                      <span id="tf-name-err" className="tf-field-err" role="alert">{errors.name}</span>
                    )}
                  </div>

                  <div className="tf-field">
                    <label htmlFor="tf-email" className="tf-label">
                      Email Address <span aria-hidden="true" style={{ color:"#ef4444" }}>*</span>
                    </label>
                    <div className="tf-input-wrap"
                      style={{ border:inputBorder("email"), boxShadow:inputShadow("email") }}>
                      <Mail size={15} aria-hidden="true" className="tf-input-icon" />
                      <input
                        id="tf-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="jane@example.com"
                        value={fields.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={() => setFocusedId("email")}
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "tf-email-err" : undefined}
                        className="tf-input"
                        disabled={status === "submitting"}
                      />
                    </div>
                    {errors.email && (
                      <span id="tf-email-err" className="tf-field-err" role="alert">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className="tf-row">
                  <div className="tf-field">
                    <label htmlFor="tf-phone" className="tf-label">
                      Phone Number                      <span className="tf-optional">optional</span>
                    </label>
                    <div className="tf-input-wrap"
                      style={{ border:inputBorder("phone"), boxShadow:inputShadow("phone") }}>
                      <Phone size={15} aria-hidden="true" className="tf-input-icon" />
                      <input
                        id="tf-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="07700 900000"
                        value={fields.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={() => setFocusedId("phone")}
                        aria-invalid={false}
                        className="tf-input"
                        disabled={status === "submitting"}
                      />
                    </div>
                  </div>

                  <div className="tf-field">
                    <label htmlFor="tf-course" className="tf-label">
                      Course of Interest <span aria-hidden="true" style={{ color:"#ef4444" }}>*</span>
                    </label>
                    <div className="tf-input-wrap tf-select-wrap"
                      style={{ border:inputBorder("course"), boxShadow:inputShadow("course") }}>
                      <BookOpen size={15} aria-hidden="true" className="tf-input-icon" />
                      <select
                        id="tf-course"
                        name="course"
                        value={fields.course}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={() => setFocusedId("course")}
                        aria-required="true"
                        aria-invalid={!!errors.course}
                        aria-describedby={errors.course ? "tf-course-err" : undefined}
                        className="tf-select"
                        disabled={status === "submitting"}
                      >
                        <option value="">Select a course…</option>
                        {TRAINING_CATEGORIES.map(cat => (
                          <optgroup key={cat.id} label={cat.title}>
                            {cat.courses.map(c => (
                              <option key={c.id} value={c.title}>{c.title}</option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>
                    {errors.course && (
                      <span id="tf-course-err" className="tf-field-err" role="alert">{errors.course}</span>
                    )}
                  </div>
                </div>

                <div className="tf-field">
                  <label htmlFor="tf-message" className="tf-label">
                    Additional Information
                    <span className="tf-optional">optional</span>
                  </label>
                  <div className="tf-textarea-wrap"
                    style={{ border:inputBorder("message"), boxShadow:inputShadow("message") }}>
                    <MessageSquare size={15} aria-hidden="true" className="tf-input-icon tf-textarea-icon" />
                    <textarea
                      id="tf-message"
                      name="message"
                      placeholder="Tell us about your experience level, preferred schedule, or any specific requirements…"
                      value={fields.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={() => setFocusedId("message")}
                      rows={4}
                      className="tf-textarea"
                      disabled={status === "submitting"}
                    />
                  </div>
                </div>

                <p className="tf-privacy">
                  Your information is kept confidential and used only to respond to your enquiry.
                  We never share your details with third parties.
                </p>

                <motion.button
                  type="submit"
                  whileHover={status !== "submitting" ? { scale:1.02, boxShadow:"0 10px 28px rgba(196,151,42,0.42)" } : {}}
                  whileTap={status !== "submitting" ? { scale:0.98 } : {}}
                  disabled={status === "submitting"}
                  className="tf-submit"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={16} aria-hidden="true" className="tf-spinner" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={16} aria-hidden="true" />
                      Send Enquiry
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function Training() {
  const [search,    setSearch]    = useState("");
  const [filterCat, setFilterCat] = useState("All");

  const categories = ["All", ...TRAINING_CATEGORIES.map(c => c.title)];

  const displayed = TRAINING_CATEGORIES
    .map(cat => ({
      ...cat,
      courses: cat.courses.filter(course =>
        search.trim() === "" ||
        course.title.toLowerCase().includes(search.trim().toLowerCase())
      ),
    }))
    .filter(cat =>
      cat.courses.length > 0 &&
      (filterCat === "All" || cat.title === filterCat)
    );

  const totalShown = displayed.reduce((n, c) => n + c.courses.length, 0);

  return (
    <>
      <style>{`
        /* ── RESET ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration:0.01ms !important; transition-duration:0.01ms !important; }
        }

        /* ── PAGE SHELL ── */
        .tp-page {
          padding: clamp(80px,12vh,120px) clamp(16px,5vw,80px) clamp(64px,8vw,96px);
          background: #f8fafc; min-height: 100vh;
        }
        .tp-container { max-width: 1200px; margin: 0 auto; }

        /* ── BANNER ── */
        .tb-banner {
          position: relative; border-radius: 24px; overflow: hidden;
          margin-bottom: 36px;
          box-shadow: 0 20px 40px -12px rgba(15,29,61,0.16);
        }
        .tb-banner-bg { position: relative; width: 100%; height: 288px; overflow: hidden; }
        .tb-banner-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.6s ease; will-change: transform;
        }
        .tb-banner:hover .tb-banner-img { transform: scale(1.04); }
        .tb-banner-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg,rgba(15,29,61,0.92) 0%,rgba(15,29,61,0.64) 100%);
        }
        .tb-banner-content {
          position: absolute; inset: 0;
          display: flex; flex-direction: column; justify-content: center;
          padding: 40px 52px; color: #fff;
        }
        .tb-banner-icon {
          width: 52px; height: 52px; border-radius: 16px; flex-shrink: 0;
          background: rgba(196,151,42,0.18); border: 1px solid rgba(196,151,42,0.3);
          display: flex; align-items: center; justify-content: center;
          color: #C4972A; margin-bottom: 16px;
        }
        .tb-banner-title {
          font-family: 'Inter',sans-serif;
          font-size: clamp(1.8rem,3.5vw,2.8rem);
          font-weight: 800; letter-spacing: -0.02em; line-height: 1.2; margin-bottom: 10px;
        }
        .tb-banner-highlight {
          background: linear-gradient(135deg,#C4972A,#f0c060,#e8b84a);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .tb-banner-subtitle {
          font-family: 'Inter',sans-serif;
          font-size: clamp(13px,1.2vw,15px); color: rgba(255,255,255,0.85);
          max-width: 540px; line-height: 1.65; margin-bottom: 22px;
        }
        .tb-banner-stats { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
        .tb-stat { display: flex; align-items: baseline; gap: 6px; }
        .tb-stat-num {
          font-family: 'Inter',sans-serif; font-size: clamp(20px,2vw,26px); font-weight: 800; color: #C4972A;
        }
        .tb-stat-lbl {
          font-family: 'Inter',sans-serif; font-size: clamp(10px,0.9vw,12px);
          color: rgba(255,255,255,0.7); font-weight: 500;
        }
        .tb-divider { width: 1px; height: 26px; background: rgba(255,255,255,0.18); }

        /* ── TOOLBAR ── */
        .tb-toolbar {
          display: flex; flex-wrap: wrap; gap: 12px; align-items: center;
          background: #fff; padding: 12px 16px; border-radius: 16px;
          box-shadow: 0 1px 3px rgba(15,29,61,0.05), 0 0 0 1px rgba(0,0,0,0.05);
          margin-bottom: 20px; position: sticky; top: 12px; z-index: 20;
        }
        .tb-search {
          flex: 1; min-width: 190px; display: flex; align-items: center; gap: 10px;
          background: #f8fafc; border-radius: 10px; padding: 0 14px;
          color: #94a3b8; border: 1px solid rgba(0,0,0,0.05); transition: border-color 0.2s;
        }
        .tb-search:focus-within { border-color: rgba(196,151,42,0.4); }
        .tb-search input {
          flex: 1; padding: 10px 0; border: none; background: transparent;
          font-family: 'Inter',sans-serif; font-size: 14px; color: #0f1d3d; outline: none;
        }
        .tb-search input::placeholder { color: #94a3b8; }
        .tb-search-clear {
          background: none; border: none; cursor: pointer;
          color: #94a3b8; padding: 4px; display: flex; border-radius: 6px;
          transition: background 0.15s, color 0.15s;
        }
        .tb-search-clear:hover { color: #0f1d3d; background: rgba(0,0,0,0.05); }
        .tb-search-clear:focus-visible { outline: 2px solid #C4972A; outline-offset: 2px; }
        .tb-select-wrap {
          display: flex; align-items: center; gap: 8px;
          background: #f8fafc; border-radius: 10px; padding: 0 14px;
          color: #94a3b8; border: 1px solid rgba(0,0,0,0.05);
        }
        .tb-select-wrap select {
          padding: 10px 4px; border: none; background: transparent;
          font-family: 'Inter',sans-serif; font-size: 13px; color: #0f1d3d;
          outline: none; cursor: pointer;
        }
        .tb-select-wrap select:focus-visible { outline: 2px solid #C4972A; outline-offset: 2px; border-radius: 4px; }
        .tb-count { font-family: 'Inter',sans-serif; font-size: 13px; color: #64748b; margin-bottom: 18px; }

        /* ── CATEGORY ACCORDION ── */
        .tb-categories { display: flex; flex-direction: column; gap: 14px; }
        .cat-block {
          background: #fff; border-radius: 20px;
          border: 1px solid rgba(0,0,0,0.06); overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .cat-header {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          padding: 20px 24px; cursor: pointer;
          transition: background 0.2s ease;
          text-align: left; border: none; border-bottom: 1px solid transparent;
          background: transparent; font-family: inherit;
        }
        .cat-header:hover { background: rgba(196,151,42,0.04) !important; }
        .cat-header:focus-visible { outline: 2px solid #C4972A; outline-offset: -2px; border-radius: 19px 19px 0 0; }
        .cat-header-left { display: flex; align-items: center; gap: 16px; flex: 1; min-width: 0; }
        .cat-icon {
          width: 46px; height: 46px; border-radius: 13px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .cat-title {
          display: block; font-family: 'Inter',sans-serif; font-size: 17px; font-weight: 700;
          color: #0f1d3d; margin-bottom: 3px;
        }
        .cat-desc { display: block; font-family: 'Inter',sans-serif; font-size: 12.5px; color: #64748b; line-height: 1.5; }
        .cat-header-right { display: flex; align-items: center; gap: 12px; flex-shrink: 0; padding-left: 16px; }
        .cat-count {
          font-family: 'Inter',sans-serif; font-size: 11px; font-weight: 600; color: #94a3b8;
          background: rgba(0,0,0,0.04); padding: 3px 10px; border-radius: 20px; white-space: nowrap;
        }
        .cat-panel { padding: 0 24px 24px; }
        .cat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding-top: 16px; }

        /* ── COURSE CARD ── */
        .cc-card {
          background: #fff; border-radius: 14px;
          transition: box-shadow 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
        }
        .cc-card-inner { display: flex; align-items: center; padding: 14px 14px 14px 0; gap: 0; }
        .cc-bar { width: 4px; height: 36px; border-radius: 0 2px 2px 0; flex-shrink: 0; margin-right: 14px; }
        .cc-content { flex: 1; min-width: 0; }
        .cc-title {
          font-family: 'Inter',sans-serif; font-size: 12.5px; font-weight: 600;
          color: #0f1d3d; margin-bottom: 4px; line-height: 1.4;
        }
        .cc-meta { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .cc-meta-item {
          display: flex; align-items: center; gap: 4px;
          font-family: 'Inter',sans-serif; font-size: 11px; color: #64748b;
        }
        .cc-enrol {
          flex-shrink: 0; display: inline-flex; align-items: center; gap: 5px;
          padding: 5px 13px; border-radius: 20px; border: none;
          font-family: 'Inter',sans-serif; font-size: 11px; font-weight: 700;
          color: #fff; cursor: pointer;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          white-space: nowrap; margin-right: 4px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        .cc-enrol:hover { opacity: 0.88; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
        .cc-enrol:focus-visible { outline: 2px solid #C4972A; outline-offset: 2px; }
        .cc-enrol:active { transform: scale(0.97); }

        /* ── PARTNERS ── */
        .tp-block {
          margin-top: 48px; padding: 36px 32px;
          background: #fff; border-radius: 20px;
          border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          text-align: center;
        }
        .tp-header { margin-bottom: 24px; }
        .tp-title { font-family: 'Inter',sans-serif; font-size: 20px; font-weight: 700; color: #0f1d3d; margin-bottom: 8px; }
        .tp-sub {
          font-family: 'Inter',sans-serif; font-size: 13.5px; color: #64748b;
          max-width: 580px; margin: 0 auto; line-height: 1.65;
        }
        .tp-pills { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-bottom: 14px; }
        .tp-pill {
          padding: 9px 22px; border-radius: 40px;
          font-family: 'Inter',sans-serif; font-size: 12.5px; font-weight: 600;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .tp-pill:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
        .tp-footer { font-family: 'Inter',sans-serif; font-size: 12px; color: #94a3b8; }

        /* ── CTA STRIP ── */
        .cta-strip {
          margin-top: 48px; border-radius: 24px;
          background: linear-gradient(135deg,#0a1628 0%,#0f1d3d 55%,#1a2a50 100%);
          position: relative; overflow: hidden;
        }
        .cta-glow {
          position: absolute; inset: 0;
          background: radial-gradient(circle at 70% 30%,rgba(196,151,42,0.1),transparent 60%);
          pointer-events: none;
        }
        .cta-inner {
          position: relative; z-index: 2;
          padding: clamp(40px,5vw,60px) clamp(28px,5vw,60px);
          display: flex; flex-direction: column; align-items: center; text-align: center;
        }
        .cta-icon {
          width: 52px; height: 52px; border-radius: 50%;
          background: rgba(196,151,42,0.14); border: 1.5px solid rgba(196,151,42,0.3);
          display: flex; align-items: center; justify-content: center; margin-bottom: 18px;
        }
        .cta-heading {
          font-family: 'Inter',sans-serif; font-size: clamp(1.8rem,3vw,2.4rem);
          font-weight: 800; color: #fff; margin-bottom: 12px; letter-spacing: -0.02em; line-height: 1.2;
        }
        .cta-sub {
          font-family: 'Inter',sans-serif; font-size: 14px;
          color: rgba(255,255,255,0.78); max-width: 500px; line-height: 1.7; margin-bottom: 30px;
        }
        .cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 28px; }
        .cta-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 32px; border-radius: 50px;
          background: linear-gradient(135deg,#C4972A,#8B6914);
          color: #0f1d3d; font-family: 'Inter',sans-serif; font-weight: 700; font-size: 14px;
          border: none; cursor: pointer; letter-spacing: 0.02em;
          box-shadow: 0 4px 16px rgba(196,151,42,0.32); transition: box-shadow 0.2s;
        }
        .cta-btn-primary:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
        .cta-btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 50px;
          background: rgba(255,255,255,0.08); backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.18); color: #fff;
          font-family: 'Inter',sans-serif; font-weight: 600; font-size: 14px;
          cursor: pointer; letter-spacing: 0.02em; transition: background 0.2s, transform 0.15s;
        }
        .cta-btn-secondary:hover { background: rgba(255,255,255,0.14); }
        .cta-btn-secondary:focus-visible { outline: 2px solid #C4972A; outline-offset: 2px; }
        .cta-trust {
          display: flex; align-items: center; gap: 24px; flex-wrap: wrap; justify-content: center;
          padding-top: 22px; border-top: 1px solid rgba(255,255,255,0.1);
        }
        .cta-trust-item {
          display: flex; align-items: center; gap: 7px;
          font-family: 'Inter',sans-serif; font-size: 12.5px; color: rgba(255,255,255,0.72);
        }

        /* ── TRAINING FORM SECTION ── */
        .tf-section {
          margin-top: 64px;
          background: #fff;
          border-radius: 28px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 4px 24px rgba(15,29,61,0.07);
          position: relative;
          overflow: hidden;
          scroll-margin-top: 24px;
        }
        .tf-blob {
          position: absolute; border-radius: 50%; pointer-events: none; z-index: 0;
          width: clamp(200px,28vw,380px); height: clamp(200px,28vw,380px);
        }
        .tf-blob-tl { top:-15%; left:-8%; background: radial-gradient(circle,rgba(196,151,42,0.06),transparent 70%); }
        .tf-blob-br { bottom:-15%; right:-8%; background: radial-gradient(circle,rgba(196,151,42,0.04),transparent 70%); }
        .tf-container {
          position: relative; z-index: 1;
          display: grid; grid-template-columns: 1fr 1.4fr; gap: 0;
        }

        /* Left info panel */
        .tf-left {
          padding: clamp(32px,5vw,64px) clamp(20px,4vw,52px);
          background: linear-gradient(160deg,#0a1628 0%,#0f1d3d 60%,#162344 100%);
          border-radius: 28px 0 0 28px;
          display: flex; flex-direction: column;
          color: #fff;
        }
        .tf-heading {
          font-family: 'Inter',sans-serif; font-size: clamp(1.4rem,3vw,2.2rem);
          font-weight: 800; letter-spacing: -0.02em; line-height: 1.22;
          color: #fff; margin-bottom: 14px;
        }
        .tf-sub {
          font-family: 'Inter',sans-serif; font-size: clamp(13px, 1.2vw, 14px);
          color: rgba(255,255,255,0.76); line-height: 1.68; margin-bottom: clamp(20px, 3vw, 32px);
          word-wrap: break-word;
          overflow-wrap: break-word;
          max-width: 100%;
        }
        .tf-info-list { 
          display: flex; flex-direction: column; gap: clamp(14px, 2vw, 20px); 
          margin-bottom: clamp(24px, 3vw, 36px); 
          width: 100%;
        }
        .tf-info-item { 
          display: flex; align-items: flex-start; gap: clamp(10px, 1.5vw, 12px); 
          width: 100%;
        }
        .tf-info-heading {
          font-family: 'Inter',sans-serif; font-size: clamp(13px, 1.2vw, 13.5px); 
          font-weight: 700;
          color: #fff; margin-bottom: 3px;
        }
        .tf-info-body {
          font-family: 'Inter',sans-serif; font-size: clamp(11.5px, 1.1vw, 12.5px);
          color: rgba(255,255,255,0.62); line-height: 1.58;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        .tf-direct {
          margin-top: auto; padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
        }
        .tf-direct-label {
          font-family: 'Inter',sans-serif; font-size: clamp(11px, 1vw, 12px);
          color: rgba(255,255,255,0.5);
        }
        .tf-direct-link {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'Inter',sans-serif; font-size: clamp(12px, 1.2vw, 13.5px); 
          font-weight: 600;
          color: #C4972A; text-decoration: none;
          transition: color 0.2s;
        }
        .tf-direct-link:hover { color: #f0c060; }
        .tf-direct-link:focus-visible { outline: 2px solid #C4972A; outline-offset: 2px; border-radius: 4px; }

        /* Right form panel */
        .tf-right {
          padding: clamp(24px,5vw,56px) clamp(16px,4vw,52px);
          display: flex; flex-direction: column;
        }
        .tf-form { display: flex; flex-direction: column; gap: clamp(14px, 2vw, 20px); }
        .tf-form-intro {
          font-family: 'Inter',sans-serif; font-size: clamp(12px, 1.1vw, 13px); 
          color: #64748b;
          line-height: 1.6; padding: clamp(10px, 1.5vw, 12px) clamp(12px, 1.5vw, 14px);
          background: rgba(196,151,42,0.06); border-left: 3px solid #C4972A;
          border-radius: 0 8px 8px 0;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        .tf-error-banner {
          background: #fef2f2; border: 1px solid #fecaca; color: #dc2626;
          border-radius: 10px; padding: clamp(10px, 1.5vw, 12px) clamp(12px, 1.5vw, 16px);
          font-family: 'Inter',sans-serif; font-size: clamp(12px, 1.1vw, 13px); 
          font-weight: 500;
        }
        .tf-row { 
          display: grid; 
          grid-template-columns: 1fr 1fr; 
          gap: clamp(12px, 2vw, 16px); 
        }
        .tf-field { 
          display: flex; 
          flex-direction: column; 
          gap: 6px; 
          min-width: 0;
        }
        .tf-label {
          font-family: 'Inter',sans-serif; 
          font-size: clamp(11.5px, 1.1vw, 12.5px); 
          font-weight: 600;
          color: #0f1d3d; 
          display: flex; 
          align-items: center; 
          gap: 6px;
          flex-wrap: wrap;
          word-break: break-word;
        }
        .tf-optional {
          font-family: 'Inter',sans-serif; font-size: clamp(9px, 0.9vw, 10px); 
          font-weight: 400;
          color: #94a3b8; background: rgba(0,0,0,0.04);
          padding: 1px 7px; border-radius: 20px;
          white-space: nowrap;
        }
        .tf-input-wrap {
          display: flex; align-items: center; gap: clamp(8px, 1vw, 10px);
          background: #f8fafc; border-radius: clamp(10px, 1.2vw, 12px); 
          padding: 0 clamp(10px, 1.2vw, 14px);
          transition: border 0.2s, box-shadow 0.2s;
          min-width: 0;
          width: 100%;
        }
        .tf-input-icon { 
          color: #94a3b8; 
          flex-shrink: 0; 
          min-width: 15px;
        }
        .tf-input {
          flex: 1; 
          padding: clamp(10px, 1.2vw, 11px) 0; 
          border: none; 
          background: transparent;
          font-family: 'Inter',sans-serif; 
          font-size: clamp(13px, 1.1vw, 14px); 
          color: #0f1d3d; 
          outline: none;
          min-width: 0;
          width: 100%;
        }
        .tf-input::placeholder { color: #94a3b8; }
        .tf-input:disabled { opacity: 0.6; cursor: not-allowed; }

        /* Select inside input wrap */
        .tf-select-wrap { 
          cursor: pointer; 
          width: 100%;
        }
        .tf-select {
          flex: 1; 
          padding: clamp(10px, 1.2vw, 11px) 0; 
          border: none; 
          background: transparent;
          font-family: 'Inter',sans-serif; 
          font-size: clamp(13px, 1.1vw, 14px); 
          color: #0f1d3d; 
          outline: none;
          cursor: pointer; 
          min-width: 0;
          width: 100%;
          appearance: none; 
          -webkit-appearance: none;
        }
        .tf-select:disabled { opacity: 0.6; cursor: not-allowed; }
        .tf-select:invalid, .tf-select option[value=""] { color: #94a3b8; }
        .tf-select option { color: #0f1d3d; }

        /* Textarea */
        .tf-textarea-wrap {
          display: flex; align-items: flex-start; gap: clamp(8px, 1vw, 10px);
          background: #f8fafc; border-radius: clamp(10px, 1.2vw, 12px); 
          padding: clamp(10px, 1.2vw, 12px) clamp(10px, 1.2vw, 14px);
          transition: border 0.2s, box-shadow 0.2s;
          width: 100%;
        }
        .tf-textarea-icon { 
          margin-top: 2px; 
          flex-shrink: 0;
          min-width: 15px;
        }
        .tf-textarea {
          flex: 1; 
          border: none; 
          background: transparent; 
          resize: vertical;
          font-family: 'Inter',sans-serif; 
          font-size: clamp(13px, 1.1vw, 14px); 
          color: #0f1d3d;
          outline: none; 
          line-height: 1.6; 
          min-height: clamp(80px, 10vh, 100px);
          width: 100%;
        }
        .tf-textarea::placeholder { color: #94a3b8; }
        .tf-textarea:disabled { opacity: 0.6; cursor: not-allowed; }

        .tf-field-err {
          font-family: 'Inter',sans-serif; 
          font-size: clamp(10.5px, 1vw, 11.5px); 
          font-weight: 500;
          color: #ef4444; 
          display: flex; 
          align-items: center; 
          gap: 4px;
          word-wrap: break-word;
        }
        .tf-privacy {
          font-family: 'Inter',sans-serif; 
          font-size: clamp(10.5px, 1vw, 11.5px); 
          color: #94a3b8;
          line-height: 1.55; 
          text-align: center;
          word-wrap: break-word;
          padding: 0 4px;
        }

        /* Submit button */
        .tf-submit {
          display: inline-flex; 
          align-items: center; 
          justify-content: center; 
          gap: 8px;
          padding: clamp(13px, 1.5vw, 14px) clamp(28px, 4vw, 36px); 
          border-radius: 50px; 
          border: none; 
          cursor: pointer;
          background: linear-gradient(135deg,#C4972A,#8B6914);
          color: #0f1d3d; 
          font-family: 'Inter',sans-serif; 
          font-weight: 700; 
          font-size: clamp(13px, 1.2vw, 15px);
          letter-spacing: 0.02em;
          box-shadow: 0 4px 16px rgba(196,151,42,0.3);
          transition: box-shadow 0.2s, opacity 0.2s;
          align-self: stretch;
          min-height: clamp(48px, 6vh, 54px);
          width: 100%;
        }
        .tf-submit:disabled { opacity: 0.65; cursor: not-allowed; }
        .tf-submit:focus-visible { outline: 2px solid #0f1d3d; outline-offset: 2px; }
        @keyframes tf-spin { to { transform: rotate(360deg); } }
        .tf-spinner { animation: tf-spin 0.8s linear infinite; }

        /* Success state */
        .tf-success {
          display: flex; flex-direction: column; align-items: center; text-align: center;
          justify-content: center; padding: clamp(32px, 5vw, 40px) clamp(20px, 4vw, 24px); 
          flex: 1;
          gap: 14px;
        }
        .tf-success-icon {
          width: clamp(60px, 8vw, 72px); height: clamp(60px, 8vw, 72px); 
          border-radius: 50%;
          background: rgba(196,151,42,0.1); border: 2px solid rgba(196,151,42,0.2);
          display: flex; align-items: center; justify-content: center;
        }
        .tf-success-title {
          font-family: 'Inter',sans-serif; font-size: clamp(18px, 2.5vw, 22px); 
          font-weight: 800;
          color: #0f1d3d; letter-spacing: -0.01em;
        }
        .tf-success-body {
          font-family: 'Inter',sans-serif; font-size: clamp(12px, 1.1vw, 14px); 
          color: #64748b;
          line-height: 1.68; max-width: 360px;
          word-wrap: break-word;
        }
        .tf-success-reset {
          margin-top: 8px; background: none; border: 1px solid rgba(196,151,42,0.3);
          color: #C4972A; border-radius: 40px; padding: clamp(6px, 0.8vw, 8px) clamp(18px, 2vw, 22px);
          font-family: 'Inter',sans-serif; font-size: clamp(12px, 1.1vw, 13px); 
          font-weight: 600;
          cursor: pointer; transition: background 0.2s, color 0.2s;
        }
        .tf-success-reset:hover { background: #C4972A; color: #fff; }
        .tf-success-reset:focus-visible { outline: 2px solid #C4972A; outline-offset: 2px; }

        /* ── EMPTY STATE ── */
        .tb-empty {
          text-align: center; padding: 72px 20px;
          background: #fff; border-radius: 20px;
          border: 1px solid rgba(0,0,0,0.06); color: #94a3b8;
        }
        .tb-empty h3 { font-family:'Inter',sans-serif; font-size:18px; color:#0f1d3d; margin:14px 0 6px; }
        .tb-empty p  { font-family:'Inter',sans-serif; font-size:13px; }

        /* ── OPTIMIZED RESPONSIVE FOR MOBILE ── */
        @media (max-width: 960px) {
          .tf-container { grid-template-columns: 1fr; }
          .tf-left { border-radius: 28px 28px 0 0; }
          .tf-direct { padding-top: 20px; }
          .tf-left .apply-now-btn { align-self: center; width: 100%; justify-content: center; }
          
          .tb-banner-bg { height: 240px; }
          .tb-banner-content { padding: 28px 32px; }
          .tb-banner-title { font-size: clamp(1.6rem, 3vw, 2.2rem); }
          .tb-banner-icon { width: 44px; height: 44px; }
          .tb-banner-stats { gap: 14px; }
          .tb-stat-num { font-size: clamp(18px, 1.8vw, 22px); }
        }

        @media (max-width: 900px) {
          .cat-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 768px) {
          .tb-banner-bg { height: 300px; }
          .tb-banner-content { padding: 24px 20px; }
          .tb-banner-icon { width: 38px; height: 38px; }
          .tb-banner-title { font-size: clamp(1.4rem, 4vw, 1.8rem); }
          .tb-banner-subtitle { font-size: clamp(12px, 1.5vw, 13px); margin-bottom: 14px; }
          .tb-banner-stats { gap: 10px; }
          .tb-stat-num { font-size: clamp(16px, 2.5vw, 20px); }
          .tb-stat-lbl { font-size: clamp(9px, 1.2vw, 10px); }
          
          .tb-toolbar { 
            position: static; 
            padding: 10px 12px; 
            flex-direction: column;
            align-items: stretch;
          }
          .tb-search { min-width: unset; }
          .tb-select-wrap { justify-content: center; }
          
          .cat-desc { display: none; }
          .cat-header { padding: 14px 16px; }
          .cat-icon { width: 38px; height: 38px; }
          .cat-title { font-size: 15px; }
          .cat-count { font-size: 10px; padding: 2px 8px; }
          .cat-panel { padding: 0 16px 16px; }
          
          .tp-block { padding: 24px 16px; margin-top: 32px; }
          .tp-title { font-size: 17px; }
          .tp-pills { gap: 6px; }
          .tp-pill { padding: 6px 14px; font-size: 11px; }
          
          .cta-trust { gap: 14px; }
          .cta-inner { padding: clamp(30px, 4vw, 40px) clamp(20px, 3vw, 28px); }
          .cta-heading { font-size: clamp(1.4rem, 3vw, 1.8rem); }
          .cta-sub { font-size: 13px; margin-bottom: 20px; }
          .cta-btns { flex-direction: column; align-items: center; }
          .cta-btn-primary, .cta-btn-secondary { width: 100%; justify-content: center; }
          .cta-trust-item { font-size: 11px; }
          
          .tf-row { grid-template-columns: 1fr; }
          .tf-left { padding: clamp(24px, 4vw, 40px) clamp(16px, 3vw, 28px); }
          .tf-right { padding: clamp(20px, 3vw, 32px) clamp(14px, 2.5vw, 24px); }
          .tf-info-item { flex-direction: row; }
          .tf-section { border-radius: 20px; margin-top: 40px; }
          .tf-heading { font-size: clamp(1.3rem, 4vw, 1.6rem); }
          .tf-sub { font-size: clamp(12px, 2.5vw, 13px); }
          .tf-info-body { font-size: clamp(11px, 2.2vw, 12px); }
          .tf-form-intro { font-size: clamp(11px, 2.2vw, 12px); padding: 8px 12px; }
        }

        @media (max-width: 600px) {
          .tb-banner-bg { height: 260px; }
          .tb-banner-title { font-size: clamp(1.2rem, 4.5vw, 1.5rem); }
          .tb-banner-subtitle { font-size: clamp(11px, 2vw, 12px); }
          .tb-banner-stats { gap: 8px; }
          .tb-stat-num { font-size: clamp(14px, 3vw, 18px); }
          .tb-stat-lbl { font-size: clamp(8px, 1.5vw, 9px); }
          
          .tb-toolbar { padding: 8px 10px; gap: 8px; }
          .tb-search input { font-size: 13px; padding: 8px 0; }
          .tb-select-wrap select { font-size: 12px; padding: 8px 4px; }
          
          .cat-header { padding: 12px 12px; gap: 8px; }
          .cat-header-left { gap: 10px; }
          .cat-icon { width: 34px; height: 34px; }
          .cat-title { font-size: 13px; }
          .cat-count { font-size: 9px; padding: 2px 6px; }
          .cat-panel { padding: 0 12px 12px; }
          .cat-grid { gap: 6px; padding-top: 10px; }
          
          .cc-card-inner { padding: 10px 10px 10px 0; }
          .cc-bar { width: 3px; height: 28px; margin-right: 10px; }
          .cc-title { font-size: 11px; }
          .cc-meta-item { font-size: 10px; gap: 3px; }
          .cc-enrol { padding: 4px 10px; font-size: 10px; gap: 3px; }
          .cc-enrol svg { width: 9px; height: 9px; }
          
          .tp-block { padding: 20px 12px; }
          .tp-title { font-size: 15px; }
          .tp-sub { font-size: 12px; }
          .tp-pill { padding: 5px 12px; font-size: 10px; }
          
          .cta-inner { padding: clamp(24px, 4vw, 32px) clamp(16px, 3vw, 20px); }
          .cta-heading { font-size: clamp(1.2rem, 3.5vw, 1.5rem); }
          .cta-sub { font-size: 12px; }
          .cta-btn-primary, .cta-btn-secondary { font-size: 13px; padding: 11px 20px; }
          
          .tf-section { margin-top: 32px; border-radius: 16px; }
          .tf-left { padding: clamp(20px, 3vw, 28px) clamp(14px, 2vw, 20px); }
          .tf-right { padding: 16px 12px; }
          .tf-submit { width: 100%; font-size: clamp(12px, 2.8vw, 13px); padding: 12px 20px; min-height: 44px; }
          .tf-label { font-size: clamp(11px, 2.5vw, 12px); }
          .tf-input { font-size: clamp(12px, 2.8vw, 13px); }
          .tf-select { font-size: clamp(12px, 2.8vw, 13px); }
          .tf-textarea { font-size: clamp(12px, 2.8vw, 13px); }
          .tf-info-item { flex-direction: row; align-items: flex-start; gap: 8px; }
          .tf-info-item svg { min-width: 16px; }
          .tf-info-body { font-size: clamp(10.5px, 2.5vw, 11.5px); }
          .tf-privacy { font-size: clamp(10px, 2.2vw, 11px); }
          .tf-success-title { font-size: clamp(16px, 4vw, 18px); }
          .tf-success-body { font-size: clamp(11px, 2.5vw, 12px); }
          .tf-field-err { font-size: clamp(10px, 2.2vw, 11px); }
        }

        @media (max-width: 480px) {
          .tb-banner-bg { height: 220px; }
          .tb-banner-content { padding: 18px 16px; }
          .tb-banner-icon { width: 32px; height: 32px; }
          .tb-banner-icon svg { width: 18px; height: 18px; }
          .tb-banner-title { font-size: clamp(1rem, 4vw, 1.3rem); margin-bottom: 4px; }
          .tb-banner-subtitle { font-size: clamp(10px, 2.2vw, 11px); margin-bottom: 10px; line-height: 1.5; }
          .tb-banner-stats { gap: 6px; }
          .tb-stat { gap: 3px; }
          .tb-stat-num { font-size: clamp(12px, 3vw, 16px); }
          .tb-stat-lbl { font-size: clamp(7px, 1.5vw, 8px); }
          .tb-divider { height: 16px; }
          
          .tb-toolbar { 
            padding: 6px 8px; 
            border-radius: 12px;
            gap: 6px;
          }
          .tb-search { 
            padding: 0 10px; 
            border-radius: 8px;
            min-width: unset;
          }
          .tb-search input { 
            font-size: 12px; 
            padding: 6px 0; 
          }
          .tb-search svg { width: 14px; height: 14px; }
          .tb-select-wrap { 
            padding: 0 10px; 
            border-radius: 8px;
          }
          .tb-select-wrap select { 
            font-size: 11px; 
            padding: 6px 4px; 
          }
          .tb-select-wrap svg { width: 12px; height: 12px; }
          .tb-count { font-size: 11px; margin-bottom: 12px; }
          
          .cat-block { border-radius: 14px; }
          .cat-header { padding: 10px 10px; }
          .cat-header-left { gap: 8px; }
          .cat-icon { width: 30px; height: 30px; border-radius: 10px; }
          .cat-icon svg { width: 16px; height: 16px; }
          .cat-title { font-size: 12px; }
          .cat-count { font-size: 8px; padding: 2px 6px; }
          .cat-header-right { gap: 6px; padding-left: 8px; }
          .cat-header-right svg { width: 14px; height: 14px; }
          .cat-panel { padding: 0 8px 10px; }
          .cat-grid { gap: 4px; padding-top: 8px; }
          
          .cc-card { border-radius: 10px; }
          .cc-card-inner { padding: 8px 8px 8px 0; }
          .cc-bar { width: 3px; height: 24px; margin-right: 8px; }
          .cc-title { font-size: 10px; margin-bottom: 2px; }
          .cc-meta { gap: 6px; }
          .cc-meta-item { font-size: 9px; gap: 2px; }
          .cc-meta-item svg { width: 9px; height: 9px; }
          .cc-enrol { padding: 3px 8px; font-size: 9px; gap: 2px; }
          .cc-enrol svg { width: 8px; height: 8px; }
          
          .tp-block { padding: 16px 10px; border-radius: 14px; margin-top: 24px; }
          .tp-title { font-size: 14px; margin-bottom: 4px; }
          .tp-sub { font-size: 11px; }
          .tp-pills { gap: 4px; }
          .tp-pill { padding: 4px 10px; font-size: 9px; border-radius: 30px; }
          .tp-footer { font-size: 10px; }
          
          .cta-strip { border-radius: 16px; margin-top: 32px; }
          .cta-inner { padding: clamp(20px, 3vw, 28px) clamp(14px, 2vw, 18px); }
          .cta-icon { width: 40px; height: 40px; margin-bottom: 12px; }
          .cta-icon svg { width: 18px; height: 18px; }
          .cta-heading { font-size: clamp(1rem, 3vw, 1.3rem); margin-bottom: 8px; }
          .cta-sub { font-size: 11px; margin-bottom: 16px; }
          .cta-btns { gap: 8px; }
          .cta-btn-primary, .cta-btn-secondary { font-size: 12px; padding: 10px 16px; }
          .cta-trust { gap: 10px; padding-top: 14px; }
          .cta-trust-item { font-size: 10px; gap: 4px; }
          .cta-trust-item svg { width: 11px; height: 11px; }
          
          .tf-section { margin-top: 24px; border-radius: 14px; }
          .tf-left { padding: clamp(16px, 2vw, 24px) clamp(12px, 1.5vw, 16px); }
          .tf-heading { font-size: clamp(1.1rem, 3.5vw, 1.3rem); margin-bottom: 8px; }
          .tf-sub { font-size: clamp(11px, 2.2vw, 12px); margin-bottom: 16px; line-height: 1.5; }
          .tf-info-list { gap: 10px; margin-bottom: 16px; }
          .tf-info-item { gap: 6px; }
          .tf-info-item svg { width: 14px; height: 14px; min-width: 14px; }
          .tf-info-heading { font-size: clamp(11px, 2.2vw, 12px); }
          .tf-info-body { font-size: clamp(10px, 2vw, 11px); }
          .tf-direct { padding-top: 14px; gap: 8px; }
          .tf-direct-label { font-size: 10px; }
          .tf-direct-link { font-size: clamp(11px, 2.5vw, 12px); gap: 4px; }
          .tf-direct-link svg { width: 12px; height: 12px; }
          
          .tf-right { padding: 14px 10px; }
          .tf-form { gap: 12px; }
          .tf-form-intro { font-size: clamp(10px, 2vw, 11px); padding: 6px 10px; }
          .tf-row { gap: 10px; }
          .tf-field { gap: 4px; }
          .tf-label { font-size: clamp(10px, 2.2vw, 11px); gap: 4px; }
          .tf-optional { font-size: 8px; padding: 1px 5px; }
          .tf-input-wrap { border-radius: 8px; padding: 0 8px; gap: 6px; }
          .tf-input-icon { width: 12px; height: 12px; min-width: 12px; }
          .tf-input { font-size: clamp(11px, 2.5vw, 12px); padding: 8px 0; }
          .tf-select { font-size: clamp(11px, 2.5vw, 12px); padding: 8px 0; }
          .tf-textarea-wrap { border-radius: 8px; padding: 8px 10px; gap: 6px; }
          .tf-textarea { font-size: clamp(11px, 2.5vw, 12px); min-height: 60px; }
          .tf-textarea-icon { width: 12px; height: 12px; min-width: 12px; }
          .tf-privacy { font-size: clamp(9px, 2vw, 10px); margin: 0; }
          .tf-submit { font-size: clamp(11px, 2.5vw, 12px); padding: 10px 16px; min-height: 40px; border-radius: 40px; gap: 6px; }
          .tf-submit svg { width: 14px; height: 14px; }
          .tf-success { padding: clamp(20px, 3vw, 28px) clamp(14px, 2vw, 18px); gap: 10px; }
          .tf-success-icon { width: 48px; height: 48px; }
          .tf-success-icon svg { width: 24px; height: 24px; }
          .tf-success-title { font-size: clamp(14px, 3.5vw, 16px); }
          .tf-success-body { font-size: clamp(11px, 2.2vw, 12px); }
          .tf-success-reset { font-size: clamp(11px, 2.2vw, 12px); padding: 6px 16px; }
        }
      `}</style>

      <section className="tp-page" aria-label="Training and development">
        <div className="tp-container">

          {/* ── Banner ── */}
          <TrainingBanner />

          {/* ── Toolbar ── */}
          <div className="tb-toolbar" role="search" aria-label="Filter training courses">
            <motion.div
              initial={{ opacity:0, y:14 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.4, delay:0.08, ease:EASE.smooth }}
              style={{ display:"contents" }}
            >
              <div className="tb-search">
                <Search size={16} aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Search training courses…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  maxLength={80}
                  aria-label="Search training courses"
                />
                {search && (
                  <button type="button" onClick={() => setSearch("")} className="tb-search-clear" aria-label="Clear search">
                    <X size={15} />
                  </button>
                )}
              </div>

              <div className="tb-select-wrap">
                <Filter size={14} aria-hidden="true" />
                <select value={filterCat} onChange={e => setFilterCat(e.target.value)} aria-label="Filter by category">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </motion.div>
          </div>

          {/* ── Course count ── */}
          <p className="tb-count" aria-live="polite">
            Showing <strong>{totalShown}</strong>{" "}
            {totalShown === 1 ? "course" : "courses"}
            {filterCat !== "All" && ` in ${filterCat}`}
          </p>

          {/* ── Categories ── */}
          <div className="tb-categories">
            {displayed.length > 0 ? (
              displayed.map((cat, idx) => (
                <TrainingCategory key={cat.id} category={cat} index={idx} />
              ))
            ) : (
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="tb-empty" role="status">
                <Search size={40} aria-hidden="true" />
                <h3>No training courses found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </motion.div>
            )}
          </div>

          {/* ── Partners ── */}
          <TrainingPartners />

          {/* ── CTA Strip ── */}
          <TrainingCTA />

          {/* ── Enquiry Form ── */}
          <TrainingForm />

        </div>
      </section>
    </>
  );
}