// components/Navbar.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { useNavigate, useLocation } from "react-router-dom";
import EVSLogo from "../EVSLogo";
import { Menu, X, Phone, Mail } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// EVS HEALTHCARE SOLUTIONS LTD — Production Navbar
//
// Mobile fixes applied:
//   • Z-index hierarchy: page content (0–99) → overlay (200) → drawer (300)
//     → navbar (400). Nothing can pierce the overlay or sit above the drawer.
//   • Scroll-lock: uses scrollY save/restore instead of position:fixed to
//     prevent iOS layout jump.
//   • GSAP tilt disabled on mobile — never runs on touch devices.
//   • GSAP logo float/dot: instances stored in refs and killed on unmount.
//   • Heavy CSS animations (glow pulse, shine sweep) stripped on mobile via
//     @media (hover: none) — runs only on pointer devices.
//   • Drawer spring: damping raised, stiffness lowered → no overshoot on
//     budget Android; translateX only, no extra transforms.
//   • Drawer backdrop-filter: none on mobile (reduced to simple rgba bg).
//   • Drawer slide: CSS transform, not Framer spring, for buttery 60fps.
//   • Mobile text color: dynamically set based on page (white on home/about, dark on others)
//   • Z-index fix: drawer now sits above navbar (z-index: 500)
// ─────────────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["About", "Jobs", "Training", "Employers", "Contact"];

// ─────────────────────────────────────────────────────────────────────────────
// Z-INDEX SCALE (nothing outside this file should exceed these)
// ─────────────────────────────────────────────────────────────────────────────
const Z = {
  navbar:  400,
  overlay: 200,
  drawer:  500, // ← INCREASED: drawer now sits ABOVE navbar
};

// ─────────────────────────────────────────────────────────────────────────────
// SSR-safe mobile hook
// ─────────────────────────────────────────────────────────────────────────────
function useIsMobile(bp = 768) {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${bp - 1}px)`);
    setMobile(mq.matches);
    const h = (e) => setMobile(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, [bp]);
  return mobile;
}

// ─────────────────────────────────────────────────────────────────────────────
// CSS — consolidated, no per-component injections
// Mobile heavy animations stripped via @media (hover: none)
// ─────────────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700;14..32,800;14..32,900&display=swap');

  /* ── Wrapper ── */
  .evs-navbar-wrapper {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: ${Z.navbar};
    perspective: 1400px;
  }

  .evs-navbar-inner {
    transform-style: preserve-3d;
    will-change: transform;
    transition: background 0.4s ease, box-shadow 0.4s ease,
                border-radius 0.4s ease, border-bottom 0.4s ease;
  }

  /* Gold glow line — desktop only */
  @media (hover: hover) {
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
  }

  /* ── Desktop nav link ── */
  .evs-link {
    position: relative;
    font-family: 'Inter', sans-serif;
    font-size: 14px; font-weight: 500;
    letter-spacing: 0.01em;
    background: none; border: none; cursor: pointer;
    padding: 8px 4px;
    white-space: nowrap; flex-shrink: 0;
    transform-style: preserve-3d;
    transition: color 0.25s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .evs-link .link-bar {
    position: absolute; bottom: -2px; left: 50%;
    transform: translateX(-50%);
    width: 0; height: 2px; border-radius: 999px;
    background: linear-gradient(90deg, transparent, #C4972A, transparent);
    transition: width 0.3s cubic-bezier(0.34,1.56,0.64,1);
    pointer-events: none;
  }
  .evs-link:hover .link-bar,
  .evs-link[data-active="true"] .link-bar { width: calc(100% - 8px); }

  .navbar-transparent .evs-link         { color: rgba(255,255,255,0.85); }
  .navbar-transparent .evs-link:hover,
  .navbar-transparent .evs-link[data-active="true"] { color: #C4972A; font-weight: 600; }

  .navbar-scrolled .evs-link            { color: rgba(15,29,61,0.65); }
  .navbar-scrolled .evs-link:hover,
  .navbar-scrolled .evs-link[data-active="true"] { color: #C4972A; font-weight: 600; }

  .navbar-white-text .evs-link          { color: rgba(255,255,255,0.85); }
  .navbar-white-text .evs-link:hover,
  .navbar-white-text .evs-link[data-active="true"] { color: #C4972A; font-weight: 600; }

  .navbar-dark-text .evs-link           { color: rgba(15,29,61,0.7); }
  .navbar-dark-text .evs-link:hover,
  .navbar-dark-text .evs-link[data-active="true"] { color: #C4972A; font-weight: 600; }

  /* ── MOBILE: Dynamic text color based on page ── */
  .navbar-mobile-white .evs-link        { color: rgba(255,255,255,0.85) !important; }
  .navbar-mobile-white .evs-link:hover,
  .navbar-mobile-white .evs-link[data-active="true"] { color: #C4972A !important; font-weight: 600; }

  .navbar-mobile-dark .evs-link         { color: rgba(15,29,61,0.85) !important; }
  .navbar-mobile-dark .evs-link:hover,
  .navbar-mobile-dark .evs-link[data-active="true"] { color: #C4972A !important; font-weight: 600; }

  @media (max-width: 1100px) { .evs-link { font-size: 13px; } }
  @media (max-width: 900px)  { .evs-link { font-size: 12px; } }

  /* ── Hire Staff button ── */
  .evs-hire-staff {
    font-family: 'Inter', sans-serif;
    font-size: 13px; font-weight: 600; letter-spacing: 0.02em;
    background: transparent; border-radius: 8px; padding: 8px 18px;
    cursor: pointer; white-space: nowrap; flex-shrink: 0;
    transition: all 0.25s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .navbar-transparent .evs-hire-staff   { color: #fff; border: 1px solid rgba(255,255,255,0.4); }
  .navbar-transparent .evs-hire-staff:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.7); transform: translateY(-2px); }
  .navbar-scrolled .evs-hire-staff      { color: #0f1d3d; border: 1px solid rgba(15,29,61,0.2); }
  .navbar-scrolled .evs-hire-staff:hover { background: rgba(15,29,61,0.05); border-color: #C4972A; transform: translateY(-2px); }
  .navbar-white-text .evs-hire-staff    { color: #fff; border: 1px solid rgba(255,255,255,0.4); }
  .navbar-white-text .evs-hire-staff:hover { background: rgba(255,255,255,0.1); transform: translateY(-2px); }
  .navbar-dark-text .evs-hire-staff     { color: #0f1d3d; border: 1px solid rgba(15,29,61,0.2); }
  .navbar-dark-text .evs-hire-staff:hover { background: rgba(196,151,42,0.06); border-color: #C4972A; transform: translateY(-2px); }

  /* ── MOBILE: Dynamic Hire Staff button colors ── */
  .navbar-mobile-white .evs-hire-staff  { color: #ffffff !important; border: 1px solid rgba(255,255,255,0.3) !important; }
  .navbar-mobile-white .evs-hire-staff:hover { background: rgba(255,255,255,0.1) !important; border-color: rgba(255,255,255,0.5) !important; }
  .navbar-mobile-dark .evs-hire-staff   { color: #0f1d3d !important; border: 1px solid rgba(15,29,61,0.2) !important; }
  .navbar-mobile-dark .evs-hire-staff:hover { background: rgba(196,151,42,0.06) !important; border-color: #C4972A !important; }

  /* ── 3D Apply Now — desktop pointer-only ── */
  .evs-apply-wrap { perspective: 600px; display: inline-flex; }

  .evs-apply {
    position: relative;
    font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 700;
    letter-spacing: 0.03em; color: #ffffff; border: none;
    border-radius: 8px; padding: 9px 24px; cursor: pointer;
    white-space: nowrap; flex-shrink: 0;
    transform-style: preserve-3d; user-select: none;
    -webkit-tap-highlight-color: transparent;
    background: linear-gradient(135deg, #f0c060 0%, #C4972A 45%, #8B6914 100%);
    box-shadow:
      0 0 0 1px rgba(196,151,42,0.65),
      0 4px 0 #8B6914,
      0 7px 0 #6A4500,
      0 9px 0 rgba(0,0,0,0.40),
      0 9px 22px rgba(196,151,42,0.30);
    transition: transform 0.18s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.18s ease;
  }

  /* Glow + shine — pointer devices only (desktop) */
  @media (hover: hover) {
    .evs-apply { animation: evsApplyGlow 3s ease-in-out infinite; }

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
          0 0 42px rgba(196,151,42,0.18);
      }
    }

    .evs-apply .apply-shine {
      position: absolute; top: 0; left: -115%; width: 75%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent);
      border-radius: 8px; pointer-events: none;
      animation: evsApplyShine 2.8s ease-in-out infinite;
    }
    @keyframes evsApplyShine {
      0%  { left: -115%; }
      55% { left: 120%;  }
      100%{ left: 120%;  }
    }

    .evs-apply:hover:not(:active) {
      animation: none;
      transform: translateY(-4px) rotateX(-5deg);
      box-shadow:
        0 0 0 1px rgba(196,151,42,0.8),
        0 8px 0 #8B6914, 0 12px 0 #6A4500,
        0 14px 0 rgba(0,0,0,0.40),
        0 14px 36px rgba(196,151,42,0.50);
    }
  }

  .evs-apply::before {
    content: '';
    position: absolute; inset: 0; border-radius: 8px;
    background: linear-gradient(180deg, rgba(255,255,255,0.45) 0%, transparent 55%);
    pointer-events: none;
  }
  .evs-apply:active {
    animation: none;
    transform: translateY(5px) rotateX(7deg);
    box-shadow:
      0 0 0 1px rgba(196,151,42,0.55),
      0 1px 0 #8B6914, 0 2px 0 #6A4500,
      0 3px 0 rgba(0,0,0,0.35),
      0 3px 14px rgba(196,151,42,0.20);
  }
  .evs-apply .apply-text { position: relative; z-index: 1; }
  .evs-apply .apply-icon {
    display: inline-block; margin-left: 6px; position: relative; z-index: 1;
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  @media (hover: hover) {
    .evs-apply:hover .apply-icon { transform: translateX(4px) rotate(-35deg); }
  }

  /* ── Mobile hamburger ── */
  .evs-mob {
    display: none; align-items: center; justify-content: center;
    width: 44px; height: 44px;
    background: transparent; border: none; cursor: pointer;
    flex-shrink: 0; z-index: ${Z.navbar + 1};
    transition: background 0.2s ease;
    -webkit-tap-highlight-color: transparent;
    border-radius: 10px;
  }
  .evs-mob:hover { background: rgba(196,151,42,0.08); }
  .navbar-transparent .evs-mob,
  .navbar-white-text  .evs-mob { color: #ffffff; }
  .navbar-transparent .evs-mob:hover,
  .navbar-white-text  .evs-mob:hover { background: rgba(255,255,255,0.1); }
  .navbar-dark-text  .evs-mob,
  .navbar-mobile-white .evs-mob { color: #ffffff !important; }
  .navbar-mobile-white .evs-mob:hover { background: rgba(255,255,255,0.1) !important; }
  .navbar-mobile-dark .evs-mob { color: #0f1d3d !important; }
  .navbar-mobile-dark .evs-mob:hover { background: rgba(196,151,42,0.08) !important; }

  /* ── Overlay
     z-index: ${Z.overlay} — sits ABOVE page content, BELOW drawer.
     The navbar (z:${Z.navbar}) is above the overlay so the logo stays
     visible, but the drawer (z:${Z.drawer}) is also above navbar. ── */
  .evs-overlay {
    position: fixed; inset: 0;
    background: rgba(5,10,22,0.55);
    /* No backdrop-filter here — expensive on mobile, unnecessary */
    z-index: ${Z.overlay};
    pointer-events: auto;
    touch-action: none; /* prevent scroll-through on iOS */
  }

  /* ── Mobile drawer
     Sits at z:${Z.drawer} — above overlay AND above navbar.
     Uses translateX for hardware-composited slide (GPU only, no layout).
     NO backdrop-filter on mobile — replaced with solid rgba background.
  ── */
  .evs-drawer {
    position: fixed;
    top: 0; right: 0; bottom: 0;
    width: min(88vw, 340px);
    z-index: ${Z.drawer};
    display: flex; flex-direction: column;
    overflow-y: auto; overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    /* Solid bg — no blur cost on mobile */
    background: rgba(10,22,40,0.97);
    border-left: 1px solid rgba(196,151,42,0.18);
    box-shadow: -6px 0 24px rgba(0,0,0,0.28);
    pointer-events: auto;
    /* Hardware-composited properties only */
    will-change: transform;
    overscroll-behavior: contain;
  }
  .evs-drawer::-webkit-scrollbar { width: 3px; }
  .evs-drawer::-webkit-scrollbar-thumb { background: #C4972A; border-radius: 999px; }

  /* ── Drawer nav links ── */
  .evs-dlk {
    display: flex; align-items: center; justify-content: space-between;
    width: 100%; font-family: 'Inter', sans-serif;
    font-size: 16px; font-weight: 500; letter-spacing: 0.01em;
    color: rgba(255,255,255,0.75); background: transparent; border: none;
    border-radius: 10px; padding: 14px 16px; cursor: pointer;
    text-align: left; min-height: 52px;
    transition: color 0.18s ease, background 0.18s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .evs-dlk:hover                { color: #fff; background: rgba(255,255,255,0.08); }
  .evs-dlk[data-active="true"]  { color: #C4972A; background: rgba(196,151,42,0.12); font-weight: 600; }
  .evs-dlk:focus-visible        { outline: 2px solid #C4972A; outline-offset: -2px; border-radius: 10px; }

  .evs-dlk-arrow {
    font-size: 18px; line-height: 1;
    color: rgba(196,151,42,0.4); flex-shrink: 0;
    transition: transform 0.18s ease, color 0.18s ease;
  }
  .evs-dlk:hover .evs-dlk-arrow,
  .evs-dlk[data-active="true"] .evs-dlk-arrow { transform: translateX(4px); color: #C4972A; }

  /* ── Mobile CTA buttons ── */
  .evs-mobile-hire {
    width: 100%; padding: 14px 24px; font-size: 15px; font-weight: 700;
    border-radius: 12px; background: rgba(255,255,255,0.06);
    color: #C4972A; border: 1px solid rgba(196,151,42,0.3);
    cursor: pointer; font-family: 'Inter', sans-serif;
    transition: background 0.2s, border-color 0.2s;
    -webkit-tap-highlight-color: transparent;
  }
  .evs-mobile-hire:hover  { background: rgba(196,151,42,0.14); border-color: #C4972A; }
  .evs-mobile-hire:active { transform: scale(0.98); }

  .evs-mobile-apply {
    width: 100%; padding: 15px 24px; font-size: 15px; font-weight: 700;
    border: none; border-radius: 12px; cursor: pointer; color: #ffffff;
    background: linear-gradient(135deg, #f0c060, #C4972A 45%, #8B6914);
    font-family: 'Inter', sans-serif;
    /* Simplified shadow — no heavy 3D stack on mobile */
    box-shadow: 0 4px 14px rgba(196,151,42,0.35);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    position: relative; overflow: hidden;
    -webkit-tap-highlight-color: transparent;
  }
  .evs-mobile-apply::before {
    content: '';
    position: absolute; inset: 0; border-radius: 12px;
    background: linear-gradient(180deg, rgba(255,255,255,0.35), transparent 55%);
    pointer-events: none;
  }
  .evs-mobile-apply:active { transform: scale(0.97); box-shadow: 0 2px 8px rgba(196,151,42,0.2); }

  /* ── Responsive show/hide ── */
  @media (max-width: 767px)  { .evs-dsk { display: none !important; } .evs-mob { display: flex !important; } }
  @media (min-width: 768px)  { .evs-mob { display: none !important; } }

  /* ── Focus visible ── */
  .evs-link:focus-visible,
  .evs-apply:focus-visible,
  .evs-hire-staff:focus-visible,
  .evs-mob:focus-visible {
    outline: 2px solid #C4972A;
    outline-offset: 3px;
    border-radius: 4px;
  }

  /* ── Reduced motion — kill everything ── */
  @media (prefers-reduced-motion: reduce) {
    .evs-apply,
    .evs-apply .apply-shine { animation: none !important; }
    .evs-link, .evs-apply, .evs-hire-staff,
    .evs-dlk, .evs-mob, .evs-navbar-inner { transition: none !important; }
  }
`;

// ── Framer Motion variants ─────────────────────────────────────────────────
// Drawer: translateX only — no 3D, no scale, no opacity. GPU compositor only.
// spring stiffness/damping tuned for 60fps on budget Android.
const drawerV = {
  hidden: {
    x: "100%",
    transition: { type: "spring", damping: 36, stiffness: 280, restDelta: 0.5 },
  },
  visible: {
    x: 0,
    transition: {
      type: "spring", damping: 30, stiffness: 220, restDelta: 0.5,
      staggerChildren: 0.035, delayChildren: 0.04,
    },
  },
  exit: {
    x: "100%",
    transition: { type: "spring", damping: 38, stiffness: 300, restDelta: 0.5 },
  },
};

// Items: only opacity + x (no y, no scale — reduces layout thrash)
const itemV = {
  hidden:  { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.22, ease: [0.22,1,0.36,1] } },
};

const overlayV = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.18 } },
  exit:    { opacity: 0, transition: { duration: 0.15 } },
};

// ─────────────────────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [activeLink,  setActiveLink]  = useState("");
  const isMobile    = useIsMobile();
  const shouldReduce = useReducedMotion();

  const closeRef  = useRef(null);
  const navbarRef = useRef(null);
  const logoRef   = useRef(null);
  const logoDotRef = useRef(null);

  // Stored GSAP instances so we can kill them specifically
  const gsapFloat = useRef(null);
  const gsapDot   = useRef(null);
  const gsapTl    = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // ── GSAP entrance — desktop only, respects reducedMotion ────────────────
  useEffect(() => {
    if (shouldReduce || !navbarRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    gsapTl.current = tl;

    tl.fromTo(
      navbarRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, clearProps: "all" }
    );

    const links = navbarRef.current.querySelectorAll(".evs-link");
    if (links.length) {
      tl.fromTo(
        links,
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, clearProps: "all" },
        "-=0.4"
      );
    }

    const ctaBtns = navbarRef.current.querySelectorAll(".evs-hire-staff, .evs-apply-wrap");
    if (ctaBtns.length) {
      tl.fromTo(
        ctaBtns,
        { y: -12, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.45, stagger: 0.08,
          ease: "back.out(1.6)", clearProps: "all" },
        "-=0.3"
      );
    }

    // Logo float — only on desktop
    if (!isMobile && logoRef.current) {
      gsapFloat.current = gsap.to(logoRef.current, {
        y: -4, repeat: -1, yoyo: true, duration: 2.2, ease: "sine.inOut",
      });
    }

    if (!isMobile && logoDotRef.current) {
      gsapDot.current = gsap.to(logoDotRef.current, {
        scale: 1.9, repeat: -1, yoyo: true, duration: 1.1, ease: "power2.inOut",
      });
    }

    return () => {
      tl.kill();
      gsapFloat.current?.kill();
      gsapDot.current?.kill();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally runs once on mount

  // Kill logo float when switching to mobile (resize)
  useEffect(() => {
    if (isMobile) {
      gsapFloat.current?.kill();
      gsapDot.current?.kill();
      if (logoRef.current) gsap.set(logoRef.current, { y: 0 });
      if (logoDotRef.current) gsap.set(logoDotRef.current, { scale: 1 });
    }
  }, [isMobile]);

  // ── GSAP 3D tilt — desktop pointer devices only ──────────────────────────
  useEffect(() => {
    if (isMobile || shouldReduce) return;
    const nb = navbarRef.current;
    if (!nb) return;

    const onMove = (e) => {
      const r = nb.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      gsap.to(nb, {
        rotationY: x * 2.5, rotationX: -y * 1.5,
        duration: 0.7, ease: "power2.out", transformPerspective: 1400,
      });
    };
    const onLeave = () =>
      gsap.to(nb, { rotationY: 0, rotationX: 0, duration: 0.6, ease: "power2.out" });

    nb.addEventListener("mousemove", onMove,  { passive: true });
    nb.addEventListener("mouseleave", onLeave, { passive: true });
    return () => {
      nb.removeEventListener("mousemove", onMove);
      nb.removeEventListener("mouseleave", onLeave);
      gsap.to(nb, { rotationY: 0, rotationX: 0, duration: 0 });
    };
  }, [isMobile, shouldReduce]);

  // ── Scroll detection ─────────────────────────────────────────────────────
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // ── Active link tracking ─────────────────────────────────────────────────
  useEffect(() => {
    const path = location.pathname;
    const routeMap = {
      "/about":     "About",
      "/jobs":      "Jobs",
      "/training":  "Training",
      "/employers": "Employers",
      "/contact":   "Contact",
    };
    if (routeMap[path]) {
      setActiveLink(routeMap[path]);
      return;
    }

    // Home page: highlight by scroll position
    const onScrollHighlight = () => {
      const pos = window.scrollY + 100;
      const sections = [
        { id: "about",        link: "About"     },
        { id: "jobs",         link: "Jobs"      },
        { id: "training",     link: "Training"  },
        { id: "for-employers",link: "Employers" },
        { id: "contact",      link: "Contact"   },
      ];
      for (const { id, link } of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (pos >= top && pos < top + el.offsetHeight) {
            setActiveLink(link);
            return;
          }
        }
      }
      setActiveLink("");
    };

    window.addEventListener("scroll", onScrollHighlight, { passive: true });
    onScrollHighlight();
    return () => window.removeEventListener("scroll", onScrollHighlight);
  }, [location]);

  // ── Scroll-lock (iOS-safe: save/restore scrollY, no position:fixed) ──────
  const savedScrollY = useRef(0);

  useEffect(() => {
    if (menuOpen) {
      savedScrollY.current = window.scrollY;
      // Prevent body scroll without position:fixed jump
      document.body.style.overflow    = "hidden";
      document.body.style.height      = "100%";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow    = "";
      document.body.style.height      = "";
      document.documentElement.style.overflow = "";
      // Don't restore scrollY — page doesn't move so no restore needed
    }
    return () => {
      document.body.style.overflow    = "";
      document.body.style.height      = "";
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  // Focus close button on drawer open
  useEffect(() => {
    if (menuOpen) setTimeout(() => closeRef.current?.focus(), 60);
  }, [menuOpen]);

  // Escape closes drawer
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape" && menuOpen) setMenuOpen(false); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [menuOpen]);

  // ── Navigation ───────────────────────────────────────────────────────────
  const goTo = useCallback((section) => {
    const routes = {
      About: "/about", Jobs: "/jobs", Training: "/training",
      Employers: "/employers", Contact: "/contact",
    };
    setActiveLink(section);
    setMenuOpen(false);
    if (routes[section]) {
      navigate(routes[section]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [navigate]);

  const goToApply = useCallback(() => {
    setMenuOpen(false);
    navigate("/jobs");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [navigate]);

  const goToEmployers = useCallback(() => {
    setMenuOpen(false);
    navigate("/employers");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [navigate]);

  const goHome = useCallback(() => {
    setMenuOpen(false);
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  }, [navigate, location.pathname]);

  // ── Computed state ───────────────────────────────────────────────────────
  const isHome         = location.pathname === "/";
  const isAbout        = location.pathname === "/about";
  const isWhiteText    = isHome || isAbout;
  const isTransparent  = isHome && !scrolled && !isMobile;

  // ── MOBILE: Two separate classes for white vs dark text ──
  let navbarClass = "navbar-dark-text"; // desktop default
  if (isMobile) {
    navbarClass = isWhiteText ? "navbar-mobile-white" : "navbar-mobile-dark";
  } else if (isTransparent) {
    navbarClass = "navbar-transparent";
  } else if (isWhiteText) {
    navbarClass = "navbar-white-text";
  } else {
    navbarClass = "navbar-dark-text";
  }

  // ── MOBILE: Background color based on page ──
  const navBg = isMobile
    ? isWhiteText 
      ? "rgba(10,22,40,0.95)"  // Dark background for white text pages (Home, About)
      : "rgba(255,255,255,0.96)" // Light background for dark text pages
    : isTransparent
      ? "transparent"
      : isWhiteText
        ? "rgba(10,22,40,0.95)"
        : "rgba(255,255,255,0.96)";

  const navBorder = isMobile
    ? isWhiteText
      ? "1px solid rgba(196,151,42,0.15)"  // Gold border for dark background
      : "1px solid rgba(0,0,0,0.07)"        // Light border for light background
    : isTransparent
      ? "none"
      : isWhiteText
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid rgba(0,0,0,0.06)";

  const navBlur   = (!isMobile && !isTransparent) ? "blur(18px)" : "none";
  const navShadow = isTransparent ? "none" : isMobile
    ? isWhiteText
      ? "0 2px 12px rgba(0,0,0,0.3)"     // Darker shadow for dark background
      : "0 2px 12px rgba(0,0,0,0.06)"     // Lighter shadow for light background
    : "0 4px 24px rgba(0,0,0,0.09)";

  // ── DYNAMIC TEXT COLOR ON MOBILE ──
  const textColor = isMobile
    ? (isWhiteText ? "#ffffff" : "#0f1d3d")
    : (isWhiteText ? "#ffffff" : "#0f1d3d");

  const ltdColor = isMobile
    ? (isWhiteText ? "rgba(255,255,255,0.5)" : "rgba(15,29,61,0.5)")
    : (isWhiteText ? "rgba(255,255,255,0.6)" : "rgba(15,29,61,0.5)");

  const isLinkActive = (link) => {
    const routeMap = { About: "/about", Jobs: "/jobs", Training: "/training", Employers: "/employers", Contact: "/contact" };
    return routeMap[link] ? location.pathname === routeMap[link] : activeLink === link;
  };

  return (
    <>
      <style>{CSS}</style>

      <div className="evs-navbar-wrapper" style={{ zIndex: Z.navbar }}>
        <nav
          ref={navbarRef}
          className={`evs-navbar-inner ${navbarClass} ${isTransparent ? "glow-active" : ""}`}
          role="navigation"
          aria-label="Main navigation"
          style={{
            width: "100%",
            background:      navBg,
            backdropFilter:  navBlur,
            WebkitBackdropFilter: navBlur,
            borderBottom:    navBorder,
            boxShadow:       navShadow,
            borderRadius:    isTransparent ? "0 0 20px 20px" : "0",
            transition:      "all 0.35s ease",
          }}
        >
          <div
            style={{
              maxWidth: 1400, margin: "0 auto",
              padding: isMobile
                ? "12px 20px"
                : isTransparent ? "16px 28px" : "12px 28px",
              display: "flex", alignItems: "center",
              justifyContent: "space-between",
              gap: "clamp(16px, 2vw, 32px)",
              transition: "padding 0.3s ease",
              position: "relative", zIndex: 2,
            }}
          >
            {/* ── Logo ── */}
            <button
              onClick={goHome}
              aria-label="EVS Healthcare Solutions — return to home"
              style={{
                display: "flex", alignItems: "center",
                gap: "clamp(10px, 1.4vw, 16px)",
                background: "none", border: "none", cursor: "pointer",
                padding: 0, flexShrink: 0,
              }}
            >
              <div ref={logoRef} style={{ transformStyle: "preserve-3d" }}>
                <EVSLogo size={isMobile ? 38 : isTransparent ? 48 : 42} />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(4px,0.6vw,6px)", lineHeight: 1.1, flexWrap: "nowrap" }}>
                  <span style={{
                    fontFamily: "'Inter', sans-serif", fontWeight: 900,
                    fontSize: isMobile ? "16px" : "clamp(16px,1.6vw,20px)",
                    color: textColor, letterSpacing: "0.03em", transition: "color 0.3s ease", whiteSpace: "nowrap",
                  }}>EVS</span>
                  <span style={{
                    fontFamily: "'Inter', sans-serif", fontWeight: 800,
                    fontSize: isMobile ? "11px" : "clamp(12px,1.2vw,16px)",
                    color: textColor, letterSpacing: "0.06em", transition: "color 0.3s ease", whiteSpace: "nowrap",
                  }}>HEALTHCARE SOLUTIONS</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: isMobile ? "7px" : "clamp(8px,0.8vw,10px)",
                    fontWeight: 800, color: ltdColor, letterSpacing: "0.18em",
                    textTransform: "uppercase", transition: "color 0.3s ease", whiteSpace: "nowrap",
                  }}>Ltd</span>

                  {/* Dot — only animated on desktop via GSAP */}
                  <span
                    ref={logoDotRef}
                    style={{ width: 3, height: 3, borderRadius: "50%", background: "#C4972A", display: "inline-block", flexShrink: 0 }}
                  />

                  <span style={{
                    fontFamily: "'Inter', sans-serif", fontStyle: "italic",
                    fontSize: isMobile ? "7px" : "clamp(8px,0.7vw,10px)",
                    color: "#C4972A", fontWeight: 500, letterSpacing: "0.01em", whiteSpace: "nowrap",
                  }}>We care in time.</span>
                </div>
              </div>
            </button>

            {/* ── Desktop nav links ── */}
            <div
              className="evs-dsk"
              style={{ display: "flex", alignItems: "center", gap: "clamp(20px,2.5vw,36px)", flex: 1, justifyContent: "center" }}
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

            {/* ── Desktop CTAs ── */}
            <div className="evs-dsk" style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button className="evs-hire-staff" onClick={goToEmployers}>
                Hire Staff
              </button>
              <div className="evs-apply-wrap">
                <button className="evs-apply" onClick={goToApply}>
                  <span className="apply-shine" aria-hidden="true" />
                  <span className="apply-text">Apply Now</span>
                  <span className="apply-icon" aria-hidden="true">→</span>
                </button>
              </div>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              className="evs-mob"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="evs-drawer"
              aria-haspopup="dialog"
              style={{ color: isMobile ? (isWhiteText ? "#ffffff" : "#0f1d3d") : textColor }}
            >
              <motion.div
                animate={{ rotate: menuOpen ? 90 : 0 }}
                transition={{ duration: shouldReduce ? 0 : 0.22, ease: [0.22,1,0.36,1] }}
              >
                {menuOpen
                  ? <X     size={22} strokeWidth={1.8} aria-hidden="true" />
                  : <Menu  size={22} strokeWidth={1.8} aria-hidden="true" />
                }
              </motion.div>
            </button>
          </div>
        </nav>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────
          MOBILE DRAWER + OVERLAY
          Both rendered in a portal-like div at body level, outside the
          navbar wrapper, so their z-index stack is clean and independent.
          Drawer now sits at z-index: ${Z.drawer} (500) which is ABOVE navbar.
      ───────────────────────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {menuOpen && (
          <>
            {/* Overlay — blocks page interaction but not drawer */}
            <motion.div
              className="evs-overlay"
              variants={overlayV}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
              style={{ zIndex: Z.overlay }}
            />

            {/* Drawer — now sits above navbar with z-index: 500 */}
            <motion.aside
              id="evs-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              variants={drawerV}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="evs-drawer"
              style={{ zIndex: Z.drawer }}
            >
              {/* Drawer header with close button */}
              <motion.div
                variants={itemV}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "22px 20px 18px",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                  flexShrink: 0,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <EVSLogo size={38} />
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 5, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: 14, color: "#fff", letterSpacing: "0.05em" }}>EVS</span>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: 10, color: "#fff", letterSpacing: "0.06em" }}>HEALTHCARE SOLUTIONS</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 3 }}>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 8, fontWeight: 800, color: "rgba(255,255,255,0.4)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Ltd</span>
                      <span style={{ width: 2.5, height: 2.5, borderRadius: "50%", background: "#C4972A", display: "inline-block" }} />
                      <span style={{ fontFamily: "'Inter',sans-serif", fontStyle: "italic", fontSize: 8, color: "#C4972A", fontWeight: 500 }}>We care in time.</span>
                    </div>
                  </div>
                </div>

                <button
                  ref={closeRef}
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close navigation menu"
                  style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    cursor: "pointer", color: "rgba(255,255,255,0.7)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, flexShrink: 0,
                    transition: "background 0.2s",
                  }}
                >
                  ✕
                </button>
              </motion.div>

              {/* Drawer links */}
              <nav
                aria-label="Mobile navigation"
                style={{ flex: 1, padding: "14px 12px", display: "flex", flexDirection: "column", gap: 3 }}
              >
                {NAV_LINKS.map((link) => (
                  <motion.div key={link} variants={itemV}>
                    <button
                      className="evs-dlk"
                      data-active={isLinkActive(link)}
                      onClick={() => goTo(link)}
                    >
                      {link}
                      <span className="evs-dlk-arrow" aria-hidden="true">›</span>
                    </button>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer footer */}
              <motion.div
                variants={itemV}
                style={{
                  padding: "14px 20px 28px",
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                  display: "flex", flexDirection: "column", gap: 10,
                  flexShrink: 0,
                }}
              >
                <button className="evs-mobile-hire" onClick={goToEmployers}>
                  Hire Staff
                </button>

                <button className="evs-mobile-apply" onClick={goToApply}>
                  <span style={{ position: "relative", zIndex: 1, fontWeight: 700 }}>
                    Apply Now →
                  </span>
                </button>

                {/* Contact */}
                <div style={{ textAlign: "center", marginTop: 8 }}>
                  <p style={{
                    fontFamily: "'Inter',sans-serif", fontSize: 9, fontWeight: 500,
                    color: "rgba(255,255,255,0.3)", marginBottom: 8,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                  }}>
                    24 / 7 Support
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <a
                      href="tel:01772493994"
                      style={{
                        fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 600,
                        color: "#C4972A", textDecoration: "none",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                      }}
                    >
                      <Phone size={12} aria-hidden="true" /> 01772 493 994
                    </a>
                    <a
                      href="mailto:admin_1@evshealthcare.co.uk"
                      style={{
                        fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 500,
                        color: "rgba(255,255,255,0.5)", textDecoration: "none",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                      }}
                    >
                      <Mail size={11} aria-hidden="true" /> admin_1@evshealthcare.co.uk
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