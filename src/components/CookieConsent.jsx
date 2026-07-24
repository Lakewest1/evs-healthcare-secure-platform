// src/components/common/CookieConsent.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS — Cookie Consent Banner · UK GDPR Compliant
// Fully responsive 320px→2560px · Centered · Scrollable on small devices
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Shield, Settings, X } from "lucide-react";

// ══════════════════════════════════════════════════════════════════════════
// Constants — Module scope
// ══════════════════════════════════════════════════════════════════════════
const COOKIE_CONSENT_KEY = "evs-cookie-consent";
const BANNER_DELAY_MS = 1500;

// ══════════════════════════════════════════════════════════════════════════
// Animation Variants — Module scope, stable references
// ══════════════════════════════════════════════════════════════════════════
const BANNER_VARIANTS = Object.freeze({
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    y: 30,
    opacity: 0,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
});

const OVERLAY_VARIANTS = Object.freeze({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
});

const PANEL_VARIANTS = Object.freeze({
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    scale: 0.95,
    opacity: 0,
    transition: { duration: 0.15 },
  },
});

// ══════════════════════════════════════════════════════════════════════════
// Default consent state
// ══════════════════════════════════════════════════════════════════════════
const DEFAULT_PREFERENCES = Object.freeze({
  essential: true,
  analytics: false,
  marketing: false,
  preferences: false,
});

// ══════════════════════════════════════════════════════════════════════════
// Cookie Option Sub-Component — Memoized
// ══════════════════════════════════════════════════════════════════════════
const CookieOption = memo(function CookieOption({
  icon,
  title,
  description,
  enabled,
  onToggle,
}) {
  return (
    <div
      className={`cc-option${enabled ? " cc-option--enabled" : ""}`}
      onClick={onToggle}
      role="checkbox"
      aria-checked={enabled}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      <div className={`cc-option-icon${enabled ? " cc-option-icon--active" : ""}`}>
        {icon}
      </div>
      <div className="cc-option-content">
        <div className="cc-option-header">
          <span className="cc-option-title">{title}</span>
          <div
            className={`cc-toggle${enabled ? " cc-toggle--active" : ""}`}
            aria-hidden="true"
          >
            <div className="cc-toggle-knob" />
          </div>
        </div>
        <p className="cc-option-desc">{description}</p>
      </div>
    </div>
  );
});
CookieOption.displayName = "CookieOption";

// ══════════════════════════════════════════════════════════════════════════
// Main Component
// ══════════════════════════════════════════════════════════════════════════
export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);
  const [hasExistingConsent, setHasExistingConsent] = useState(false);

  // ── Check for existing consent on mount ──────────────────────────────
  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), BANNER_DELAY_MS);
      return () => clearTimeout(timer);
    }

    try {
      const saved = JSON.parse(consent);
      if (saved && typeof saved.essential === "boolean") {
        setPreferences({
          essential: true,
          analytics: saved.analytics ?? false,
          marketing: saved.marketing ?? false,
          preferences: saved.preferences ?? false,
        });
        setHasExistingConsent(true);
        applyConsent(saved);
      } else {
        setShowBanner(true);
      }
    } catch {
      setShowBanner(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Save consent to localStorage ─────────────────────────────────────
  const saveConsent = useCallback((prefs) => {
    localStorage.setItem(
      COOKIE_CONSENT_KEY,
      JSON.stringify({
        ...prefs,
        timestamp: new Date().toISOString(),
      })
    );
    setHasExistingConsent(true);
  }, []);

  // ── Apply consent ────────────────────────────────────────────────────
  const applyConsent = useCallback((prefs) => {
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: prefs.analytics ? "granted" : "denied",
        ad_storage: prefs.marketing ? "granted" : "denied",
      });
    }

    window.dispatchEvent(
      new CustomEvent("cookieConsentUpdated", { detail: prefs })
    );
  }, []);

  // ── Accept all cookies ──────────────────────────────────────────────
  const acceptAll = useCallback(() => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    setPreferences(allAccepted);
    saveConsent(allAccepted);
    applyConsent(allAccepted);
    setShowBanner(false);
    setShowPreferences(false);
  }, [saveConsent, applyConsent]);

  // ── Accept only essential ────────────────────────────────────────────
  const acceptEssential = useCallback(() => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    setPreferences(essentialOnly);
    saveConsent(essentialOnly);
    applyConsent(essentialOnly);
    setShowBanner(false);
    setShowPreferences(false);
  }, [saveConsent, applyConsent]);

  // ── Save custom preferences ──────────────────────────────────────────
  const savePreferences = useCallback(() => {
    saveConsent(preferences);
    applyConsent(preferences);
    setShowBanner(false);
    setShowPreferences(false);
  }, [preferences, saveConsent, applyConsent]);

  // ── Toggle individual preference ─────────────────────────────────────
  const togglePreference = useCallback((key) => {
    if (key === "essential") return;
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  // ── Open/close preferences panel ─────────────────────────────────────
  const openPreferences = useCallback(() => setShowPreferences(true), []);

  const closePreferences = useCallback(() => {
    setShowPreferences(false);
    if (!hasExistingConsent) {
      setShowBanner(true);
    }
  }, [hasExistingConsent]);

  const handleOverlayClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) closePreferences();
    },
    [closePreferences]
  );

  return (
    <>
      <style>{CSS}</style>

      {/* ─── MAIN COOKIE BANNER ─── */}
      <AnimatePresence>
        {showBanner && !showPreferences && (
          <motion.div
            className="cc-banner"
            variants={BANNER_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-labelledby="cc-title"
            aria-describedby="cc-description"
          >
            <div className="cc-banner-inner">
              <div className="cc-icon-wrap" aria-hidden="true">
                <Cookie size={20} strokeWidth={1.5} />
              </div>

              <div className="cc-content">
                <h3 id="cc-title" className="cc-title">
                  We Value Your Privacy
                </h3>
                <p id="cc-description" className="cc-description">
                  We use cookies to enhance your browsing experience, analyze
                  site traffic, and personalize content. By clicking &ldquo;Accept
                  All&rdquo;, you consent to our use of all cookies. You can manage
                  your preferences in our{" "}
                  <a href="/cookie-policy" className="cc-link">
                    Cookie Policy
                  </a>
                  .
                </p>

                <div className="cc-buttons">
                  <button onClick={acceptAll} className="cc-btn cc-btn--primary">
                    Accept All
                  </button>
                  <button onClick={acceptEssential} className="cc-btn cc-btn--secondary">
                    Essential Only
                  </button>
                  <button onClick={openPreferences} className="cc-btn cc-btn--outline">
                    <Settings size={13} aria-hidden="true" />
                    Customize
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PREFERENCES PANEL ─── */}
      <AnimatePresence>
        {showPreferences && (
          <motion.div
            className="cc-overlay"
            variants={OVERLAY_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleOverlayClick}
          >
            <motion.div
              className="cc-panel"
              variants={PANEL_VARIANTS}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-labelledby="cc-panel-title"
            >
              {/* Header */}
              <div className="cc-panel-header">
                <div className="cc-panel-title-wrap">
                  <div className="cc-panel-icon" aria-hidden="true">
                    <Settings size={18} strokeWidth={1.5} />
                  </div>
                  <h3 id="cc-panel-title" className="cc-panel-title">
                    Cookie Preferences
                  </h3>
                </div>
                <button
                  onClick={closePreferences}
                  className="cc-close-btn"
                  aria-label="Close preferences"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              <p className="cc-panel-sub">
                Choose which cookies you want to allow. Essential cookies are
                always enabled as they are required for the website to function
                properly.
              </p>

              {/* Cookie Options */}
              <div className="cc-options">
                {/* Essential — Always On */}
                <div className="cc-option cc-option--essential">
                  <div className="cc-option-icon cc-option-icon--essential">
                    <Shield size={16} />
                  </div>
                  <div className="cc-option-content">
                    <div className="cc-option-header">
                      <span className="cc-option-title">Essential</span>
                      <span className="cc-badge">Always On</span>
                    </div>
                    <p className="cc-option-desc">
                      Required for the website to function. Includes session
                      management, security, and form submissions.
                    </p>
                  </div>
                </div>

                <CookieOption
                  icon={<Cookie size={16} />}
                  title="Analytics"
                  description="Help us understand how visitors interact with our site so we can improve your experience."
                  enabled={preferences.analytics}
                  onToggle={() => togglePreference("analytics")}
                />

                <CookieOption
                  icon={<Cookie size={16} />}
                  title="Marketing"
                  description="Used to deliver relevant advertisements and measure campaign effectiveness."
                  enabled={preferences.marketing}
                  onToggle={() => togglePreference("marketing")}
                />

                <CookieOption
                  icon={<Cookie size={16} />}
                  title="Preferences"
                  description="Remember your settings, such as language or region, to personalize your experience."
                  enabled={preferences.preferences}
                  onToggle={() => togglePreference("preferences")}
                />
              </div>

              {/* Action Buttons */}
              <div className="cc-panel-actions">
                <button
                  onClick={savePreferences}
                  className="cc-panel-btn cc-panel-btn--primary"
                >
                  Save Preferences
                </button>

                <div className="cc-panel-btn-group">
                  <button
                    onClick={acceptAll}
                    className="cc-panel-btn cc-panel-btn--secondary"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={acceptEssential}
                    className="cc-panel-btn cc-panel-btn--secondary"
                  >
                    Essential Only
                  </button>
                </div>
              </div>

              <p className="cc-panel-footer">
                <a href="/cookie-policy" className="cc-link">
                  Learn more in our Cookie Policy
                </a>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// Premium CSS — Fully responsive 320px→2560px
// ══════════════════════════════════════════════════════════════════════════
const CSS = `
  /* ═══════════════════════════════════════════════════════════════════════ */
  /* COOKIE BANNER — Bottom sheet, fully visible on all devices           */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .cc-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    background: rgba(255, 255, 255, 0.98);
    border-top: 1px solid rgba(196,151,42,0.15);
    box-shadow: 0 -4px 24px rgba(0,0,0,0.08);
    padding: clamp(14px, 2.5vw, 24px) clamp(14px, 3vw, 28px);
    max-height: 85vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  @supports (backdrop-filter: blur(20px)) {
    .cc-banner {
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }
  }

  .cc-banner-inner {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    max-width: 720px;
    margin: 0 auto;
  }

  .cc-icon-wrap {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: rgba(196,151,42,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #C4972A;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .cc-content {
    flex: 1;
    min-width: 0;
  }

  .cc-title {
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: clamp(13px, 1.8vw, 15px);
    font-weight: 700;
    color: #0f1d3d;
    margin: 0 0 3px 0;
    line-height: 1.3;
  }

  .cc-description {
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: clamp(11px, 1.3vw, 13px);
    color: #64748b;
    line-height: 1.55;
    margin: 0;
  }

  .cc-link {
    color: #C4972A;
    text-decoration: underline;
    font-weight: 600;
    white-space: nowrap;
  }

  .cc-link:hover {
    color: #8B6914;
  }

  .cc-buttons {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 12px;
  }

  .cc-btn {
    padding: 9px 16px;
    border-radius: 50px;
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: clamp(11px, 1.1vw, 12px);
    font-weight: 700;
    border: none;
    cursor: pointer;
    flex: 1 1 auto;
    min-width: 80px;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
    outline: none;
    min-height: 40px;
    white-space: nowrap;
  }

  .cc-btn:focus-visible {
    outline: 2px solid #C4972A;
    outline-offset: 2px;
  }

  .cc-btn--primary {
    background: linear-gradient(135deg, #C4972A, #8B6914);
    color: #fff;
    box-shadow: 0 2px 8px rgba(196,151,42,0.25);
  }

  .cc-btn--primary:hover {
    box-shadow: 0 4px 16px rgba(196,151,42,0.4);
    transform: translateY(-1px);
  }

  .cc-btn--secondary {
    background: #f1f5f9;
    color: #475569;
    border: 1px solid #e2e8f0;
  }

  .cc-btn--secondary:hover {
    background: #e2e8f0;
  }

  .cc-btn--outline {
    background: transparent;
    color: #C4972A;
    border: 1.5px solid #C4972A;
  }

  .cc-btn--outline:hover {
    background: rgba(196,151,42,0.08);
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* PREFERENCES OVERLAY — Scrollable modal                                */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .cc-overlay {
    position: fixed;
    inset: 0;
    z-index: 10000;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(8px, 2vw, 20px);
  }

  @supports (backdrop-filter: blur(4px)) {
    .cc-overlay {
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
    }
  }

  .cc-panel {
    width: 100%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background: #fff;
    border-radius: 20px;
    padding: clamp(16px, 3vw, 28px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  }

  .cc-panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    flex-wrap: wrap;
    gap: 8px;
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 1;
    padding-bottom: 8px;
  }

  .cc-panel-title-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .cc-panel-icon {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: rgba(196,151,42,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #C4972A;
    flex-shrink: 0;
  }

  .cc-panel-title {
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: clamp(15px, 2vw, 16px);
    font-weight: 700;
    color: #0f1d3d;
    margin: 0;
  }

  .cc-close-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: #94a3b8;
    padding: 6px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease, color 0.2s ease;
    flex-shrink: 0;
    min-width: 40px;
    min-height: 40px;
  }

  .cc-close-btn:hover {
    background: #f1f5f9;
    color: #475569;
  }

  .cc-panel-sub {
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: clamp(11px, 1.3vw, 13px);
    color: #64748b;
    line-height: 1.55;
    margin: 0 0 16px 0;
  }

  .cc-options {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* COOKIE OPTION CARD                                                     */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .cc-option {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: clamp(10px, 1.5vw, 14px);
    border-radius: 12px;
    background: #fff;
    border: 1.5px solid #e2e8f0;
    transition: border-color 0.2s ease, background 0.2s ease;
    cursor: pointer;
  }

  .cc-option--essential {
    background: #f8fafc;
    border-color: #e2e8f0;
    cursor: default;
  }

  .cc-option--enabled {
    border-color: rgba(196,151,42,0.3);
    background: rgba(196,151,42,0.02);
  }

  .cc-option-icon {
    width: 30px;
    height: 30px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #94a3b8;
    flex-shrink: 0;
    transition: background 0.2s ease, color 0.2s ease;
  }

  .cc-option-icon--essential {
    background: rgba(22,163,74,0.1);
    color: #16a34a;
  }

  .cc-option-icon--active {
    background: rgba(196,151,42,0.1);
    color: #C4972A;
  }

  .cc-option-content {
    flex: 1;
    min-width: 0;
  }

  .cc-option-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
  }

  .cc-option-title {
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: clamp(12px, 1.3vw, 13px);
    font-weight: 600;
    color: #0f1d3d;
  }

  .cc-badge {
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: 9px;
    font-weight: 600;
    color: #16a34a;
    background: rgba(22,163,74,0.1);
    padding: 2px 8px;
    border-radius: 20px;
    white-space: nowrap;
  }

  .cc-option-desc {
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: clamp(10px, 1.1vw, 11px);
    color: #94a3b8;
    margin: 3px 0 0 0;
    line-height: 1.45;
  }

  /* Toggle Switch */
  .cc-toggle {
    width: 34px;
    height: 20px;
    border-radius: 10px;
    background: #cbd5e1;
    position: relative;
    flex-shrink: 0;
    transition: background 0.2s ease;
    cursor: pointer;
  }

  .cc-toggle--active {
    background: #C4972A;
  }

  .cc-toggle-knob {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    position: absolute;
    top: 2px;
    left: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    transition: transform 0.2s ease;
  }

  .cc-toggle--active .cc-toggle-knob {
    transform: translateX(14px);
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* PANEL ACTIONS                                                          */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .cc-panel-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .cc-panel-btn {
    padding: 11px 20px;
    border-radius: 50px;
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: clamp(12px, 1.2vw, 13px);
    font-weight: 700;
    border: none;
    cursor: pointer;
    width: 100%;
    text-align: center;
    transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
    min-height: 44px;
  }

  .cc-panel-btn:focus-visible {
    outline: 2px solid #C4972A;
    outline-offset: 2px;
  }

  .cc-panel-btn--primary {
    background: linear-gradient(135deg, #C4972A, #8B6914);
    color: #fff;
    box-shadow: 0 2px 8px rgba(196,151,42,0.25);
  }

  .cc-panel-btn--primary:hover {
    box-shadow: 0 4px 16px rgba(196,151,42,0.4);
    transform: translateY(-1px);
  }

  .cc-panel-btn--secondary {
    background: #f1f5f9;
    color: #475569;
    border: 1px solid #e2e8f0;
  }

  .cc-panel-btn--secondary:hover {
    background: #e2e8f0;
  }

  .cc-panel-btn-group {
    display: flex;
    gap: 8px;
    width: 100%;
  }

  .cc-panel-btn-group .cc-panel-btn {
    flex: 1;
  }

  .cc-panel-footer {
    text-align: center;
    margin: 14px 0 0 0;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* RESPONSIVE                                                             */
  /* ═══════════════════════════════════════════════════════════════════════ */

  /* Tablet / Landscape phones */
  @media (min-width: 641px) {
    .cc-banner {
      bottom: clamp(12px, 2vh, 24px);
      left: 50%;
      right: auto;
      transform: translateX(-50%) translateZ(0);
      width: min(calc(100% - 32px), 680px);
      border-radius: 18px;
      border: 1px solid rgba(196,151,42,0.15);
      box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
      max-height: 80vh;
    }
  }

  /* Mobile — Full-width bottom sheet */
  @media (max-width: 640px) {
    .cc-banner-inner {
      flex-direction: column;
      gap: 8px;
      align-items: stretch;
    }

    .cc-icon-wrap {
      align-self: center;
      width: 34px;
      height: 34px;
    }

    .cc-title {
      text-align: center;
    }

    .cc-description {
      text-align: center;
      font-size: 11px;
    }

    .cc-buttons {
      flex-direction: column;
    }

    .cc-btn {
      width: 100%;
      padding: 11px;
      font-size: 12px;
    }

    .cc-panel {
      border-radius: 16px;
      padding: 14px;
      max-height: 92vh;
    }

    .cc-panel-header {
      padding-bottom: 6px;
    }

    .cc-panel-btn-group {
      flex-direction: column;
    }

    .cc-panel-btn {
      padding: 12px;
    }
  }

  /* Small phones */
  @media (max-width: 400px) {
    .cc-banner {
      padding: 10px 10px;
      max-height: 80vh;
    }

    .cc-title {
      font-size: 12px;
    }

    .cc-description {
      font-size: 10px;
      line-height: 1.45;
    }

    .cc-btn {
      padding: 9px;
      font-size: 11px;
      min-height: 38px;
    }

    .cc-panel {
      border-radius: 12px;
      padding: 10px;
    }

    .cc-panel-title {
      font-size: 14px;
    }

    .cc-option {
      padding: 8px;
      gap: 8px;
    }

    .cc-option-icon {
      width: 26px;
      height: 26px;
    }

    .cc-option-icon svg {
      width: 13px;
      height: 13px;
    }

    .cc-option-title {
      font-size: 11px;
    }

    .cc-option-desc {
      font-size: 9px;
    }

    .cc-toggle {
      width: 30px;
      height: 18px;
    }

    .cc-toggle-knob {
      width: 14px;
      height: 14px;
    }

    .cc-toggle--active .cc-toggle-knob {
      transform: translateX(12px);
    }

    .cc-panel-btn {
      padding: 10px;
      font-size: 11px;
      min-height: 40px;
    }
  }

  /* Extra small phones */
  @media (max-width: 340px) {
    .cc-banner {
      padding: 8px 8px;
    }

    .cc-buttons {
      gap: 5px;
      margin-top: 8px;
    }

    .cc-btn {
      padding: 8px;
      font-size: 10px;
      min-height: 36px;
    }

    .cc-panel {
      padding: 8px;
    }

    .cc-option {
      padding: 6px;
      gap: 6px;
    }

    .cc-panel-btn {
      padding: 9px;
      font-size: 10px;
      min-height: 38px;
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* REDUCED MOTION                                                         */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media (prefers-reduced-motion: reduce) {
    .cc-banner,
    .cc-overlay,
    .cc-panel,
    .cc-btn,
    .cc-panel-btn,
    .cc-toggle,
    .cc-toggle-knob,
    .cc-option {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;