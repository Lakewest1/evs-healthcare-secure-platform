// components/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { useNavigate, useLocation } from "react-router-dom";
import EVSLogo from "../EVSLogo";
import { Menu, X, Phone, Mail } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// EVS HEALTHCARE SOLUTIONS LTD — Ultra-Premium Navbar
// 3D Apply Now button · GSAP entrance · mouse-tilt
// White text on Home & About | Navy text on other pages
// ─────────────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  "About",
  "Jobs",
  "Training",
  "Employers",
  "Contact",
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700;14..32,800;14..32,900&display=swap');

  /* ── WRAPPER ── */
  .evs-navbar-wrapper {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1001;
    perspective: 1400px;
  }

  .evs-navbar-inner {
    transform-style: preserve-3d;
    transition: background 0.4s ease, box-shadow 0.4s ease,
                border-radius 0.4s ease;
    will-change: transform;
  }

  /* bottom glow line on transparent state */
  .evs-navbar-inner.glow-active::after {
    content: '';
    position: absolute;
    bottom: 0; left: 6%; right: 6%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(196,151,42,0.25) 30%,
      rgba(196,151,42,0.5) 50%,
      rgba(196,151,42,0.25) 70%,
      transparent
    );
    pointer-events: none;
  }

  /* ── DESKTOP NAV LINK ── */
  .evs-link {
    position: relative;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.01em;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px 4px;
    white-space: nowrap;
    flex-shrink: 0;
    transform-style: preserve-3d;
    transition: color 0.3s ease, background 0.3s ease;
    -webkit-tap-highlight-color: transparent;
  }

  .evs-link .link-bar {
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    border-radius: 999px;
    background: linear-gradient(90deg, transparent, #C4972A, transparent);
    transition: width 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    pointer-events: none;
  }
  .evs-link:hover .link-bar,
  .evs-link[data-active="true"] .link-bar {
    width: calc(100% - 8px);
  }

  /* transparent (hero/home) */
  .navbar-transparent .evs-link         { color: rgba(255,255,255,0.85); }
  .navbar-transparent .evs-link:hover,
  .navbar-transparent .evs-link[data-active="true"] { color: #C4972A; font-weight: 600; }

  /* scrolled (glass) */
  .navbar-scrolled .evs-link            { color: rgba(15,29,61,0.65); }
  .navbar-scrolled .evs-link:hover,
  .navbar-scrolled .evs-link[data-active="true"]   { color: #C4972A; font-weight: 600; }

  /* white text pages (About) */
  .navbar-white-text .evs-link          { color: rgba(255,255,255,0.85); }
  .navbar-white-text .evs-link:hover,
  .navbar-white-text .evs-link[data-active="true"] { color: #C4972A; font-weight: 600; }

  /* dark text pages (Jobs, Training, Employers, Contact) */
  .navbar-dark-text .evs-link           { color: rgba(15,29,61,0.7); }
  .navbar-dark-text .evs-link:hover,
  .navbar-dark-text .evs-link[data-active="true"] { color: #C4972A; font-weight: 600; }

  /* mobile navbar always white */
  .navbar-mobile .evs-link              { color: rgba(15,29,61,0.7); }

  @media (max-width: 1100px) { .evs-link { font-size: 13px; } }
  @media (max-width:  900px) { .evs-link { font-size: 12px; } }

  /* ── HIRE STAFF BUTTON (outline) ── */
  .evs-hire-staff {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.02em;
    background: transparent;
    border-radius: 8px;
    padding: 8px 18px;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
    -webkit-tap-highlight-color: transparent;
    position: relative;
    overflow: hidden;
  }
  .navbar-transparent .evs-hire-staff {
    color: #ffffff;
    border: 1px solid rgba(255,255,255,0.4);
  }
  .navbar-transparent .evs-hire-staff:hover {
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.7);
    transform: translateY(-2px);
  }
  .navbar-scrolled .evs-hire-staff {
    color: #0f1d3d;
    border: 1px solid rgba(15,29,61,0.2);
  }
  .navbar-scrolled .evs-hire-staff:hover {
    background: rgba(15,29,61,0.05);
    border-color: #C4972A;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(15,29,61,0.08);
  }
  .navbar-white-text .evs-hire-staff {
    color: #ffffff;
    border: 1px solid rgba(255,255,255,0.4);
  }
  .navbar-white-text .evs-hire-staff:hover {
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.7);
    transform: translateY(-2px);
  }
  .navbar-dark-text .evs-hire-staff {
    color: #0f1d3d;
    border: 1px solid rgba(15,29,61,0.2);
  }
  .navbar-dark-text .evs-hire-staff:hover {
    background: rgba(196,151,42,0.06);
    border-color: #C4972A;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(196,151,42,0.15);
  }
  .navbar-mobile .evs-hire-staff {
    color: #0f1d3d;
    border: 1px solid rgba(15,29,61,0.2);
  }

  /* ═══════════════════════════════════════════════
     3-D  APPLY NOW  BUTTON — White Text
     Physical depth via layered box-shadows
  ═══════════════════════════════════════════════ */
  .evs-apply-wrap {
    perspective: 600px;
    display: inline-flex;
  }

  .evs-apply {
    position: relative;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.03em;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    padding: 9px 24px;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    transform-style: preserve-3d;
    user-select: none;
    -webkit-tap-highlight-color: transparent;

    /* Face gradient */
    background: linear-gradient(135deg, #f0c060 0%, #C4972A 45%, #8B6914 100%);

    /* 3-D depth stack */
    box-shadow:
      0 0 0 1px rgba(196,151,42,0.65),
      0 4px 0   #8B6914,
      0 7px 0   #6A4500,
      0 9px 0   rgba(0,0,0,0.40),
      0 9px 22px rgba(196,151,42,0.30);

    transition:
      transform  0.18s cubic-bezier(0.34,1.56,0.64,1),
      box-shadow 0.18s ease;

    /* Idle glow pulse */
    animation: evsApplyGlow 3s ease-in-out infinite;
  }

  @keyframes evsApplyGlow {
    0%, 100% {
      box-shadow:
        0 0 0 1px rgba(196,151,42,0.65),
        0 4px 0 #8B6914,
        0 7px 0 #6A4500,
        0 9px 0 rgba(0,0,0,0.40),
        0 9px 22px rgba(196,151,42,0.30);
    }
    50% {
      box-shadow:
        0 0 0 1px rgba(196,151,42,0.9),
        0 4px 0 #8B6914,
        0 7px 0 #6A4500,
        0 9px 0 rgba(0,0,0,0.40),
        0 9px 34px rgba(196,151,42,0.55),
        0 0  42px rgba(196,151,42,0.18);
    }
  }

  /* Top-face highlight bevel */
  .evs-apply::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 8px;
    background: linear-gradient(180deg, rgba(255,255,255,0.45) 0%, transparent 55%);
    pointer-events: none;
  }

  /* Shine sweep */
  .evs-apply .apply-shine {
    position: absolute;
    top: 0; left: -115%;
    width: 75%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent);
    border-radius: 8px;
    animation: evsApplyShine 2.8s ease-in-out infinite;
    pointer-events: none;
  }
  @keyframes evsApplyShine {
    0%   { left: -115%; }
    55%  { left: 120%;  }
    100% { left: 120%;  }
  }

  /* Hover — lift up, deepen shadow */
  .evs-apply:hover:not(:active) {
    animation: none;
    transform: translateY(-4px) rotateX(-5deg);
    box-shadow:
      0 0 0 1px rgba(196,151,42,0.8),
      0 8px 0  #8B6914,
      0 12px 0 #6A4500,
      0 14px 0 rgba(0,0,0,0.40),
      0 14px 36px rgba(196,151,42,0.50);
  }

  /* Press — snap down */
  .evs-apply:active {
    animation: none;
    transform: translateY(5px) rotateX(7deg);
    box-shadow:
      0 0 0 1px rgba(196,151,42,0.55),
      0 1px 0 #8B6914,
      0 2px 0 #6A4500,
      0 3px 0 rgba(0,0,0,0.35),
      0 3px 14px rgba(196,151,42,0.20);
  }

  .evs-apply .apply-text { position: relative; z-index: 1; }
  .evs-apply .apply-icon {
    display: inline-block;
    margin-left: 6px;
    position: relative;
    z-index: 1;
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  .evs-apply:hover .apply-icon {
    transform: translateX(4px) rotate(-35deg);
  }

  /* ── MOBILE — hamburger ── */
  .evs-mob {
    display: none;
    align-items: center;
    justify-content: center;
    width: 44px; height: 44px;
    background: transparent;
    border: none;
    cursor: pointer;
    color: #0f1d3d;
    flex-shrink: 0;
    z-index: 1002;
    transition: background 0.3s ease;
  }
  .evs-mob:hover { background: rgba(196,151,42,0.06); border-radius: 10px; }

  /* ── OVERLAY ── */
  .evs-overlay {
    position: fixed;
    inset: 0;
    background: rgba(5,10,22,0.6);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 999;
    pointer-events: auto;
  }

  /* ── MOBILE DRAWER ── */
  .evs-drawer {
    position: fixed;
    top: 0; right: 0; bottom: 0;
    width: min(88vw, 340px);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    background: rgba(10,22,40,0.98);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-left: 1px solid rgba(196,151,42,0.15);
    box-shadow: -8px 0 32px rgba(0,0,0,0.3);
    pointer-events: auto;
  }
  .evs-drawer::-webkit-scrollbar { width: 3px; }
  .evs-drawer::-webkit-scrollbar-thumb {
    background: #C4972A;
    border-radius: 999px;
  }

  /* mobile drawer link */
  .evs-dlk {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.01em;
    color: rgba(255,255,255,0.75);
    background: transparent;
    border: none;
    border-radius: 10px;
    padding: 14px 16px;
    cursor: pointer;
    text-align: left;
    min-height: 52px;
    transition: color 0.18s ease, background 0.18s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .evs-dlk:hover                { color: #fff; background: rgba(255,255,255,0.08); }
  .evs-dlk[data-active="true"]  { color: #C4972A; background: rgba(196,151,42,0.12); font-weight: 600; }

  .evs-dlk-arrow {
    font-size: 18px;
    line-height: 1;
    color: rgba(196,151,42,0.4);
    flex-shrink: 0;
    transition: transform 0.18s ease, color 0.18s ease;
  }
  .evs-dlk:hover .evs-dlk-arrow,
  .evs-dlk[data-active="true"] .evs-dlk-arrow {
    transform: translateX(4px);
    color: #C4972A;
  }

  /* mobile Hire Staff */
  .evs-mobile-hire {
    width: 100%;
    padding: 14px 24px;
    font-size: 15px;
    font-weight: 700;
    border-radius: 12px;
    background: rgba(255,255,255,0.08);
    color: #C4972A;
    border: 1px solid rgba(196,151,42,0.3);
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'Inter', sans-serif;
  }
  .evs-mobile-hire:hover {
    background: rgba(196,151,42,0.15);
    border-color: #C4972A;
  }

  /* mobile 3-D Apply Now */
  .evs-mobile-apply {
    width: 100%;
    padding: 15px 24px;
    font-size: 15px;
    font-weight: 700;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    color: #ffffff;
    background: linear-gradient(135deg, #f0c060, #C4972A 45%, #8B6914);
    position: relative;
    overflow: hidden;
    box-shadow:
      0 4px 0 #8B6914,
      0 6px 0 #6A4500,
      0 8px 0 rgba(0,0,0,0.35),
      0 8px 18px rgba(196,151,42,0.30);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    font-family: 'Inter', sans-serif;
  }
  .evs-mobile-apply::before {
    content: '';
    position: absolute; inset: 0;
    border-radius: 12px;
    background: linear-gradient(180deg, rgba(255,255,255,0.45), transparent 55%);
  }
  .evs-mobile-apply:hover {
    transform: translateY(-2px);
    box-shadow:
      0 6px 0 #8B6914,
      0 9px 0 #6A4500,
      0 11px 0 rgba(0,0,0,0.35),
      0 12px 26px rgba(196,151,42,0.42);
  }
  .evs-mobile-apply:active {
    transform: translateY(4px);
    box-shadow:
      0 1px 0 #8B6914,
      0 2px 0 #6A4500,
      0 4px 12px rgba(196,151,42,0.20);
  }

  /* ── MOBILE HAMBURGER WHITE (for transparent/white-text pages) ── */
  .navbar-transparent .evs-mob,
  .navbar-white-text .evs-mob {
    color: #ffffff;
  }
  .navbar-transparent .evs-mob:hover,
  .navbar-white-text .evs-mob:hover {
    background: rgba(255,255,255,0.1);
    border-radius: 10px;
  }

  /* ── RESPONSIVE BREAKPOINTS ── */
  @media (max-width: 767px) {
    .evs-dsk { display: none !important; }
    .evs-mob { display: flex !important; }
  }
  @media (min-width: 768px) {
    .evs-mob { display: none !important; }
  }

  /* ── FOCUS VISIBLE ── */
  .evs-link:focus-visible,
  .evs-apply:focus-visible,
  .evs-hire-staff:focus-visible,
  .evs-mob:focus-visible {
    outline: 2px solid #C4972A;
    outline-offset: 3px;
    border-radius: 4px;
  }

  /* ── REDUCED MOTION ── */
  @media (prefers-reduced-motion: reduce) {
    .evs-apply,
    .evs-apply .apply-shine { animation: none !important; }
    .evs-link,
    .evs-apply,
    .evs-hire-staff,
    .evs-dlk { transition: none !important; }
  }
`;

// ── Framer Motion variants ─────────────────────────────────────────────────
const drawerV = {
  hidden:  { x: "100%", transition: { type: "spring", damping: 28, stiffness: 260 } },
  visible: {
    x: 0,
    transition: { type: "spring", damping: 24, stiffness: 210, staggerChildren: 0.045, delayChildren: 0.06 },
  },
  exit: { x: "100%", transition: { type: "spring", damping: 32, stiffness: 300 } },
};
const itemV = {
  hidden:  { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.30, ease: [0.22,1,0.36,1] } },
};
const overlayV = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22 } },
  exit:    { opacity: 0, transition: { duration: 0.18 } },
};

// ─────────────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const closeRef = useRef(null);
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const logoDotRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // ── GSAP entrance + logo animations ──────────────────────────────────────
  useEffect(() => {
    if (!navbarRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      navbarRef.current,
      { y: -90, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, clearProps: "all" }
    );

    const links = navbarRef.current.querySelectorAll(".evs-link");
    if (links.length) {
      tl.fromTo(
        links,
        { y: -18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, clearProps: "all" },
        "-=0.45"
      );
    }

    const ctaBtns = navbarRef.current.querySelectorAll(
      ".evs-hire-staff, .evs-apply-wrap"
    );
    if (ctaBtns.length) {
      tl.fromTo(
        ctaBtns,
        { y: -14, opacity: 0, scale: 0.88 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.09,
          ease: "back.out(1.9)", clearProps: "all" },
        "-=0.35"
      );
    }

    // Logo icon gentle float
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        y: -4, repeat: -1, yoyo: true,
        duration: 2.2, ease: "sine.inOut",
      });
    }

    // Logo dot pulse
    if (logoDotRef.current) {
      gsap.to(logoDotRef.current, {
        scale: 1.9, repeat: -1, yoyo: true,
        duration: 1.1, ease: "power2.inOut",
      });
    }

    return () => { tl.kill(); };
  }, []);

  // ── GSAP 3D mouse-tilt (desktop only) ────────────────────────────────────
  useEffect(() => {
    if (isMobile) return;
    const nb = navbarRef.current;
    if (!nb) return;

    const onMove = (e) => {
      const r = nb.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      gsap.to(nb, {
        rotationY: x * 2.5,
        rotationX: -y * 1.5,
        duration: 0.7,
        ease: "power2.out",
        transformPerspective: 1400,
      });
    };

    const onLeave = () => {
      gsap.to(nb, {
        rotationY: 0, rotationX: 0,
        duration: 0.6, ease: "power2.out",
      });
    };

    nb.addEventListener("mousemove", onMove);
    nb.addEventListener("mouseleave", onLeave);
    return () => {
      nb.removeEventListener("mousemove", onMove);
      nb.removeEventListener("mouseleave", onLeave);
    };
  }, [isMobile]);

  // ── Mobile detection ─────────────────────────────────────────────────────
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ── Scroll detection ────────────────────────────────────────────────────
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // ── Update active link based on current route ───────────────────────────
  useEffect(() => {
    const path = location.pathname;
    if (path === "/about") setActiveLink("About");
    else if (path === "/jobs") setActiveLink("Jobs");
    else if (path === "/contact") setActiveLink("Contact");
    else if (path === "/training") setActiveLink("Training");
    else if (path === "/employers") setActiveLink("Employers");
    else {
      const handleScrollHighlight = () => {
        const scrollPosition = window.scrollY + 100;
        const sections = ["about", "jobs", "training", "for-employers", "contact"];
        const sectionMap = {
          "about": "About",
          "jobs": "Jobs",
          "training": "Training",
          "for-employers": "Employers",
          "contact": "Contact"
        };
        
        let found = false;
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const offsetTop = element.offsetTop;
            const offsetBottom = offsetTop + element.offsetHeight;
            if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
              setActiveLink(sectionMap[section] || "");
              found = true;
              break;
            }
          }
        }
        if (!found) setActiveLink("");
      };
      
      window.addEventListener("scroll", handleScrollHighlight);
      handleScrollHighlight();
      return () => window.removeEventListener("scroll", handleScrollHighlight);
    }
  }, [location]);

  // ── Body scroll-lock when drawer open ────────────────────────────────────
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow  = "hidden";
      document.body.style.position  = "fixed";
      document.body.style.width     = "100%";
    } else {
      document.body.style.overflow  = "";
      document.body.style.position  = "";
      document.body.style.width     = "";
    }
    return () => {
      document.body.style.overflow  = "";
      document.body.style.position  = "";
      document.body.style.width     = "";
    };
  }, [menuOpen]);

  // Focus close button when drawer opens
  useEffect(() => {
    if (menuOpen) setTimeout(() => closeRef.current?.focus(), 80);
  }, [menuOpen]);

  // Escape key closes drawer
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape" && menuOpen) setMenuOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [menuOpen]);

  // ── Navigation Handlers ──
  const goTo = (section) => {
    setActiveLink(section);
    setMenuOpen(false);

    const pageRoutes = {
      "About": "/about",
      "Jobs": "/jobs",
      "Training": "/training",
      "Employers": "/employers",
      "Contact": "/contact",
    };

    if (pageRoutes[section]) {
      navigate(pageRoutes[section]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToApply = () => {
    setActiveLink("Jobs");
    setMenuOpen(false);
    navigate("/jobs");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToEmployers = () => {
    setActiveLink("Employers");
    setMenuOpen(false);
    navigate("/employers");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => {
    setActiveLink("");
    setMenuOpen(false);
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  // ── Determine which pages get white text ──────────────────────────────────
  const isHomePage = location.pathname === "/";
  const isAboutPage = location.pathname === "/about";
  const isWhiteTextPage = isHomePage || isAboutPage;

  // ── Computed styles ───────────────────────────────────────────────────────
  const navbarClass = isMobile
    ? "navbar-mobile"
    : isWhiteTextPage
      ? (isHomePage && !scrolled ? "navbar-transparent" : "navbar-white-text")
      : "navbar-dark-text";

  const navBg = isMobile
    ? "#ffffff"
    : (isHomePage && !scrolled) 
      ? "transparent" 
      : isWhiteTextPage 
        ? "rgba(10,22,40,0.95)" 
        : "#ffffff";

  const navBorder = isMobile
    ? "1px solid rgba(0,0,0,0.08)"
    : (isHomePage && !scrolled)
      ? "none"
      : isWhiteTextPage
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid rgba(0,0,0,0.06)";

  const navBlur = isMobile ? "none" : (isHomePage && !scrolled) ? "none" : "blur(18px)";

  const getTextColor = () => {
    if (isMobile) return "#0f1d3d";
    if (isWhiteTextPage) return "#ffffff";
    return "#0f1d3d";
  };

  const getLtdColor = () => {
    if (isMobile) return "rgba(15,29,61,0.5)";
    if (isWhiteTextPage) return "rgba(255,255,255,0.65)";
    return "rgba(15,29,61,0.5)";
  };

  const isLinkActive = (link) => {
    if (link === "About") return location.pathname === "/about";
    if (link === "Jobs") return location.pathname === "/jobs";
    if (link === "Contact") return location.pathname === "/contact";
    if (link === "Training") return location.pathname === "/training";
    if (link === "Employers") return location.pathname === "/employers";
    return activeLink === link;
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{CSS}</style>

      <div className="evs-navbar-wrapper">
        <nav
          ref={navbarRef}
          className={`evs-navbar-inner ${navbarClass} ${isHomePage && !scrolled && !isMobile ? "glow-active" : ""}`}
          role="navigation"
          aria-label="Main navigation"
          style={{
            position: "relative",
            width: "100%",
            background: navBg,
            backdropFilter: navBlur,
            WebkitBackdropFilter: navBlur,
            borderBottom: navBorder,
            boxShadow: (isHomePage && !scrolled) ? "none" : "0 4px 32px rgba(0,0,0,0.10)",
            borderRadius: (isHomePage && !scrolled) ? "0 0 20px 20px" : "0",
            transition: "all 0.4s ease",
          }}
        >
          <div
            style={{
              maxWidth: 1400,
              margin: "0 auto",
              padding: isMobile ? "12px 20px" : (isHomePage && !scrolled) ? "16px 28px" : "12px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "clamp(16px, 2vw, 32px)",
              transition: "padding 0.3s ease",
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* ── LOGO ── */}
            <button
              onClick={goHome}
              aria-label="EVS Healthcare Solutions — return to home"
              style={{
                display: "flex", alignItems: "center",
                gap: "clamp(10px, 1.4vw, 16px)",
                background: "none", border: "none",
                cursor: "pointer", padding: 0, flexShrink: 0,
              }}
            >
              <div ref={logoRef} style={{ transformStyle: "preserve-3d" }}>
                <EVSLogo size={isMobile ? 38 : (isHomePage && !scrolled) ? 48 : 42} />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(4px,0.6vw,6px)", lineHeight: 1.1, flexWrap: "nowrap" }}>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 900,
                    fontSize: isMobile ? "16px" : "clamp(16px,1.6vw,20px)",
                    color: getTextColor(),
                    letterSpacing: "0.03em",
                    transition: "color 0.3s ease",
                    whiteSpace: "nowrap",
                  }}>
                    EVS
                  </span>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: isMobile ? "11px" : "clamp(12px,1.2vw,16px)",
                    color: getTextColor(),
                    letterSpacing: "0.06em",
                    transition: "color 0.3s ease",
                    whiteSpace: "nowrap",
                  }}>
                    HEALTHCARE SOLUTIONS
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: isMobile ? "7px" : "clamp(8px,0.8vw,10px)",
                    fontWeight: 800,
                    color: getLtdColor(),
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    transition: "color 0.3s ease",
                    whiteSpace: "nowrap",
                  }}>
                    Ltd
                  </span>
                  <motion.span
                    ref={logoDotRef}
                    style={{
                      width: 3, height: 3,
                      borderRadius: "50%",
                      background: "#C4972A",
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontStyle: "italic",
                    fontSize: isMobile ? "7px" : "clamp(8px,0.7vw,10px)",
                    color: "#C4972A",
                    fontWeight: 500,
                    letterSpacing: "0.01em",
                    whiteSpace: "nowrap",
                  }}>
                    We care in time.
                  </span>
                </div>
              </div>
            </button>

            {/* ── DESKTOP NAV LINKS ── */}
            <div
              className="evs-dsk"
              style={{
                display: "flex", alignItems: "center",
                gap: "clamp(20px, 2.5vw, 36px)",
                flex: 1, justifyContent: "center",
              }}
            >
              {NAV_LINKS.map((link) => (
                <button
                  key={link}
                  className="evs-link"
                  data-active={isLinkActive(link)}
                  onClick={() => goTo(link)}
                >
                  {link}
                  <span className="link-bar" />
                </button>
              ))}
            </div>

            {/* ── DESKTOP CTAs ── */}
            <div className="evs-dsk" style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button className="evs-hire-staff" onClick={goToEmployers}>
                Hire Staff
              </button>

              {/* ══ 3-D APPLY NOW BUTTON ══ */}
              <div className="evs-apply-wrap">
                <button className="evs-apply" onClick={goToApply}>
                  <span className="apply-shine" aria-hidden="true" />
                  <span className="apply-text">Apply Now</span>
                  <span className="apply-icon" aria-hidden="true">→</span>
                </button>
              </div>
            </div>

            {/* ── MOBILE HAMBURGER ── */}
            <button
              className="evs-mob"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="evs-drawer"
            >
              <motion.div animate={{ rotate: menuOpen ? 90 : 0 }} transition={{ duration: 0.3 }}>
                {menuOpen ? <X size={22} strokeWidth={1.8} /> : <Menu size={22} strokeWidth={1.8} />}
              </motion.div>
            </button>
          </div>
        </nav>
      </div>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence mode="wait">
        {menuOpen && (
          <>
            <motion.div
              className="evs-overlay"
              variants={overlayV}
              initial="hidden" animate="visible" exit="exit"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            <motion.aside
              id="evs-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              variants={drawerV}
              initial="hidden" animate="visible" exit="exit"
              className="evs-drawer"
            >
              {/* Drawer header */}
              <motion.div
                variants={itemV}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "24px 20px 20px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <EVSLogo size={40} />
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 5, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: 14, color: "#fff", letterSpacing: "0.05em" }}>EVS</span>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: 10, color: "#fff", letterSpacing: "0.06em" }}>HEALTHCARE SOLUTIONS</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 3 }}>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 8, fontWeight: 800, color: "rgba(255,255,255,0.45)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Ltd</span>
                      <span style={{ width: 2.5, height: 2.5, borderRadius: "50%", background: "#C4972A", display: "inline-block" }} />
                      <span style={{ fontFamily: "'Inter',sans-serif", fontStyle: "italic", fontSize: 8, color: "#C4972A", fontWeight: 500 }}>We care in time.</span>
                    </div>
                  </div>
                </div>

                <button
                  ref={closeRef}
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    cursor: "pointer", color: "rgba(255,255,255,0.6)",
                    fontSize: 16, display: "flex",
                    alignItems: "center", justifyContent: "center",
                    transition: "background 0.2s ease",
                  }}
                >
                  ✕
                </button>
              </motion.div>

              {/* Drawer nav */}
              <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
                {NAV_LINKS.map((link) => (
                  <motion.div key={link} variants={itemV}>
                    <button
                      className="evs-dlk"
                      data-active={isLinkActive(link)}
                      onClick={() => goTo(link)}
                    >
                      {link}
                      <span className="evs-dlk-arrow">›</span>
                    </button>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer footer CTAs */}
              <motion.div
                variants={itemV}
                style={{
                  padding: "16px 20px 28px",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  display: "flex", flexDirection: "column", gap: 10,
                }}
              >
                <button className="evs-mobile-hire" onClick={goToEmployers}>
                  Hire Staff
                </button>

                {/* 3-D Apply Now — mobile */}
                <button className="evs-mobile-apply" onClick={goToApply}>
                  <span style={{ position: "relative", zIndex: 1, fontWeight: 700 }}>
                    Apply Now →
                  </span>
                </button>

                {/* Contact info */}
                <div style={{ textAlign: "center", marginTop: 10 }}>
                  <p style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: 9, fontWeight: 500,
                    color: "rgba(255,255,255,0.32)",
                    marginBottom: 8,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}>
                    24 / 7 Support
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    <a
                      href="tel:01772493994"
                      style={{
                        fontFamily: "'Inter',sans-serif",
                        fontSize: 14, fontWeight: 600,
                        color: "#C4972A", textDecoration: "none",
                        display: "flex", alignItems: "center",
                        justifyContent: "center", gap: 6,
                      }}
                    >
                      <Phone size={12} /> 01772 493 994
                    </a>
                    <a
                      href="mailto:admin_1@evshealthcare.co.uk"
                      style={{
                        fontFamily: "'Inter',sans-serif",
                        fontSize: 12, fontWeight: 500,
                        color: "rgba(255,255,255,0.55)",
                        textDecoration: "none",
                        display: "flex", alignItems: "center",
                        justifyContent: "center", gap: 6,
                      }}
                    >
                      <Mail size={11} /> admin_1@evshealthcare.co.uk
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}