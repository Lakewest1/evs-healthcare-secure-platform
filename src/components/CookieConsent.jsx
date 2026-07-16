import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Shield, Settings, X, CheckCircle } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Cookie Consent Banner — UK GDPR Compliant
// ─────────────────────────────────────────────────────────────────────────────

const COOKIE_CONSENT_KEY = "evs-cookie-consent";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always enabled - required for site functionality
    analytics: false,
    marketing: false,
    preferences: false,
  });

  // Check if user has already made a choice
  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // No choice made yet — show banner after a short delay
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      try {
        const savedPreferences = JSON.parse(consent);
        setPreferences(savedPreferences);
      } catch (e) {
        // Invalid stored data, show banner
        setShowBanner(true);
      }
    }
  }, []);

  // Accept all cookies
  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    setPreferences(allAccepted);
    saveConsent(allAccepted);
    setShowBanner(false);
    setShowPreferences(false);
    applyConsent(allAccepted);
  };

  // Accept only essential cookies
  const acceptEssential = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    setPreferences(essentialOnly);
    saveConsent(essentialOnly);
    setShowBanner(false);
    setShowPreferences(false);
    applyConsent(essentialOnly);
  };

  // Save custom preferences
  const savePreferences = () => {
    saveConsent(preferences);
    setShowBanner(false);
    setShowPreferences(false);
    applyConsent(preferences);
  };

  // Save to localStorage
  const saveConsent = (prefs) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      ...prefs,
      timestamp: new Date().toISOString(),
    }));
  };

  // Apply consent (load/block scripts based on preferences)
  const applyConsent = (prefs) => {
    // Analytics — Google Analytics example
    if (prefs.analytics) {
      enableAnalytics();
    } else {
      disableAnalytics();
    }

    // Marketing — Facebook Pixel, Google Ads, etc.
    if (prefs.marketing) {
      enableMarketing();
    } else {
      disableMarketing();
    }

    // Preferences — Theme, language, etc.
    if (prefs.preferences) {
      enablePreferenceCookies();
    }

    // Dispatch custom event for other components to react
    window.dispatchEvent(new CustomEvent("cookieConsentUpdated", { 
      detail: prefs 
    }));
  };

  const enableAnalytics = () => {
    // Google Analytics gtag example
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
    console.log("Analytics cookies enabled");
  };

  const disableAnalytics = () => {
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
      });
    }
    console.log("Analytics cookies disabled");
  };

  const enableMarketing = () => {
    console.log("Marketing cookies enabled");
  };

  const disableMarketing = () => {
    console.log("Marketing cookies disabled");
  };

  const enablePreferenceCookies = () => {
    console.log("Preference cookies enabled");
  };

  // Open preferences panel
  const openPreferences = () => {
    setShowPreferences(true);
  };

  // Toggle individual preference
  const togglePreference = (key) => {
    if (key === "essential") return; // Cannot toggle essential
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Reset consent (for testing or if user wants to change)
  const resetConsent = () => {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    setShowBanner(true);
    setShowPreferences(false);
  };

  return (
    <>
      {/* ─── MAIN COOKIE BANNER ─── */}
      <AnimatePresence>
        {showBanner && !showPreferences && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="cookie-banner"
            role="dialog"
            aria-labelledby="cookie-title"
            aria-describedby="cookie-description"
          >
            <div className="cookie-banner-inner">
              {/* Cookie Icon */}
              <div className="cookie-icon-wrapper">
                <Cookie size={20} strokeWidth={1.5} />
              </div>

              <div className="cookie-content">
                <h3 id="cookie-title" className="cookie-title">
                  We Value Your Privacy
                </h3>
                <p id="cookie-description" className="cookie-description">
                  We use cookies to enhance your browsing experience, analyze site traffic, 
                  and personalize content. By clicking "Accept All", you consent to our use 
                  of all cookies. You can manage your preferences or learn more in our{" "}
                  <a href="/cookie-policy" className="cookie-link">
                    Cookie Policy
                  </a>
                  .
                </p>

                {/* Buttons */}
                <div className="cookie-buttons">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={acceptAll}
                    className="cookie-btn cookie-btn-primary"
                  >
                    Accept All
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={acceptEssential}
                    className="cookie-btn cookie-btn-secondary"
                  >
                    Essential Only
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={openPreferences}
                    className="cookie-btn cookie-btn-outline"
                  >
                    <Settings size={13} />
                    Customize
                  </motion.button>
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="cookie-overlay"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowPreferences(false);
                if (!localStorage.getItem(COOKIE_CONSENT_KEY)) {
                  setShowBanner(true);
                }
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="cookie-panel"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="cookie-panel-header">
                <div className="cookie-panel-title-wrap">
                  <div className="cookie-panel-icon">
                    <Settings size={18} strokeWidth={1.5} />
                  </div>
                  <h3 className="cookie-panel-title">Cookie Preferences</h3>
                </div>
                <button
                  onClick={() => {
                    setShowPreferences(false);
                    if (!localStorage.getItem(COOKIE_CONSENT_KEY)) {
                      setShowBanner(true);
                    }
                  }}
                  className="cookie-close-btn"
                  aria-label="Close preferences"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="cookie-panel-sub">
                Choose which cookies you want to allow. Essential cookies are always 
                enabled as they are required for the website to function properly.
              </p>

              {/* Cookie Options */}
              <div className="cookie-options">
                {/* Essential */}
                <div className="cookie-option cookie-option-essential">
                  <div className="cookie-option-icon essential">
                    <Shield size={16} />
                  </div>
                  <div className="cookie-option-content">
                    <div className="cookie-option-header">
                      <span className="cookie-option-title">Essential</span>
                      <span className="cookie-badge">Always On</span>
                    </div>
                    <p className="cookie-option-desc">
                      Required for the website to function. Includes session management, security, 
                      and form submissions.
                    </p>
                  </div>
                </div>

                {/* Analytics */}
                <CookieOption
                  icon={<Cookie size={16} />}
                  title="Analytics"
                  description="Help us understand how visitors interact with our site so we can improve your experience."
                  enabled={preferences.analytics}
                  onToggle={() => togglePreference("analytics")}
                />

                {/* Marketing */}
                <CookieOption
                  icon={<Cookie size={16} />}
                  title="Marketing"
                  description="Used to deliver relevant advertisements and measure campaign effectiveness."
                  enabled={preferences.marketing}
                  onToggle={() => togglePreference("marketing")}
                />

                {/* Preferences */}
                <CookieOption
                  icon={<Cookie size={16} />}
                  title="Preferences"
                  description="Remember your settings, such as language or region, to personalize your experience."
                  enabled={preferences.preferences}
                  onToggle={() => togglePreference("preferences")}
                />
              </div>

              {/* Action Buttons */}
              <div className="cookie-panel-actions">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={savePreferences}
                  className="cookie-panel-btn cookie-panel-btn-primary"
                >
                  Save Preferences
                </motion.button>

                <div className="cookie-panel-btn-group">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={acceptAll}
                    className="cookie-panel-btn cookie-panel-btn-secondary"
                  >
                    Accept All
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={acceptEssential}
                    className="cookie-panel-btn cookie-panel-btn-secondary"
                  >
                    Essential Only
                  </motion.button>
                </div>
              </div>

              {/* Cookie Policy Link */}
              <p className="cookie-panel-footer">
                <a href="/cookie-policy" className="cookie-link">
                  Learn more in our Cookie Policy
                </a>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* ─── COOKIE BANNER ─── */
        .cookie-banner {
          position: fixed;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          width: calc(100% - 24px);
          max-width: 640px;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
          border: 1px solid rgba(196,151,42,0.15);
          padding: clamp(16px, 4vw, 28px);
        }

        .cookie-banner-inner {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }

        .cookie-icon-wrapper {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: rgba(196,151,42,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C4972A;
          flex-shrink: 0;
          align-self: center;
        }

        .cookie-content {
          flex: 1;
          min-width: 0;
        }

        .cookie-title {
          font-family: 'Inter', sans-serif;
          font-size: clamp(14px, 2.5vw, 15px);
          font-weight: 700;
          color: #0f1d3d;
          margin: 0 0 4px 0;
          text-align: left;
        }

        .cookie-description {
          font-family: 'Inter', sans-serif;
          font-size: clamp(12px, 2vw, 13px);
          color: #64748b;
          line-height: 1.6;
          margin: 0;
          text-align: left;
        }

        .cookie-link {
          color: #C4972A;
          text-decoration: underline;
          font-weight: 600;
        }

        .cookie-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 16px;
        }

        .cookie-btn {
          padding: 10px 18px;
          border-radius: 50px;
          font-family: 'Inter', sans-serif;
          font-size: clamp(11px, 1.5vw, 13px);
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
          transition: all 0.2s ease;
        }

        .cookie-btn-primary {
          background: linear-gradient(135deg, #C4972A, #8B6914);
          color: #fff;
          box-shadow: 0 2px 8px rgba(196,151,42,0.25);
        }

        .cookie-btn-primary:hover {
          box-shadow: 0 4px 16px rgba(196,151,42,0.4);
          transform: translateY(-1px);
        }

        .cookie-btn-secondary {
          background: #f1f5f9;
          color: #475569;
          border: 1px solid #e2e8f0;
        }

        .cookie-btn-secondary:hover {
          background: #e2e8f0;
        }

        .cookie-btn-outline {
          background: transparent;
          color: #C4972A;
          border: 1.5px solid #C4972A;
        }

        .cookie-btn-outline:hover {
          background: rgba(196,151,42,0.08);
        }

        /* ─── PREFERENCES OVERLAY ─── */
        .cookie-overlay {
          position: fixed;
          inset: 0;
          z-index: 10000;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }

        .cookie-panel {
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          background: #fff;
          border-radius: 24px;
          padding: clamp(20px, 4vw, 32px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
          margin: 0 8px;
        }

        .cookie-panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 8px;
        }

        .cookie-panel-title-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .cookie-panel-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(196,151,42,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C4972A;
          flex-shrink: 0;
        }

        .cookie-panel-title {
          font-family: 'Inter', sans-serif;
          font-size: clamp(16px, 3vw, 17px);
          font-weight: 700;
          color: #0f1d3d;
          margin: 0;
        }

        .cookie-close-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #94a3b8;
          padding: 4px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .cookie-close-btn:hover {
          background: #f1f5f9;
          color: #475569;
        }

        .cookie-panel-sub {
          font-family: 'Inter', sans-serif;
          font-size: clamp(12px, 2vw, 13px);
          color: #64748b;
          line-height: 1.6;
          margin: 0 0 20px 0;
          text-align: left;
        }

        .cookie-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }

        /* ─── COOKIE OPTION ─── */
        .cookie-option {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: clamp(12px, 2vw, 16px);
          border-radius: 14px;
          background: #fff;
          border: 1.5px solid #e2e8f0;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .cookie-option-essential {
          background: #f8fafc;
          border-color: #e2e8f0;
          cursor: default;
        }

        .cookie-option-icon {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .cookie-option-icon.essential {
          background: rgba(22,163,74,0.1);
          color: #16a34a;
        }

        .cookie-option-content {
          flex: 1;
          min-width: 0;
        }

        .cookie-option-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 4px;
        }

        .cookie-option-title {
          font-family: 'Inter', sans-serif;
          font-size: clamp(13px, 2vw, 14px);
          font-weight: 600;
          color: #0f1d3d;
        }

        .cookie-badge {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 600;
          color: #16a34a;
          background: rgba(22,163,74,0.1);
          padding: 3px 10px;
          border-radius: 20px;
          white-space: nowrap;
        }

        .cookie-option-desc {
          font-family: 'Inter', sans-serif;
          font-size: clamp(11px, 1.5vw, 12px);
          color: #94a3b8;
          margin: 4px 0 0 0;
          line-height: 1.5;
        }

        .cookie-toggle {
          width: 36px;
          height: 20px;
          border-radius: 10px;
          background: #cbd5e1;
          position: relative;
          flex-shrink: 0;
          transition: background 0.2s ease;
          cursor: pointer;
        }

        .cookie-toggle.active {
          background: #C4972A;
        }

        .cookie-toggle-knob {
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

        .cookie-toggle.active .cookie-toggle-knob {
          transform: translateX(16px);
        }

        /* ─── PANEL ACTIONS ─── */
        .cookie-panel-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .cookie-panel-btn {
          padding: 12px 24px;
          border-radius: 50px;
          font-family: 'Inter', sans-serif;
          font-size: clamp(12px, 1.5vw, 13px);
          font-weight: 700;
          border: none;
          cursor: pointer;
          width: 100%;
          text-align: center;
          transition: all 0.2s ease;
        }

        .cookie-panel-btn-primary {
          background: linear-gradient(135deg, #C4972A, #8B6914);
          color: #fff;
          box-shadow: 0 2px 8px rgba(196,151,42,0.25);
        }

        .cookie-panel-btn-primary:hover {
          box-shadow: 0 4px 16px rgba(196,151,42,0.4);
          transform: translateY(-1px);
        }

        .cookie-panel-btn-secondary {
          background: #f1f5f9;
          color: #475569;
          border: 1px solid #e2e8f0;
        }

        .cookie-panel-btn-secondary:hover {
          background: #e2e8f0;
        }

        .cookie-panel-btn-group {
          display: flex;
          gap: 8px;
          width: 100%;
        }

        .cookie-panel-btn-group .cookie-panel-btn {
          flex: 1;
        }

        .cookie-panel-footer {
          text-align: center;
          margin: 16px 0 0 0;
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 600px) {
          .cookie-banner {
            bottom: 8px;
            padding: 16px;
            border-radius: 16px;
          }

          .cookie-banner-inner {
            flex-direction: column;
            gap: 10px;
            align-items: stretch;
          }

          .cookie-icon-wrapper {
            align-self: center;
            width: 36px;
            height: 36px;
          }

          .cookie-title {
            text-align: center;
          }

          .cookie-description {
            text-align: center;
            font-size: 12px;
          }

          .cookie-buttons {
            flex-direction: column;
          }

          .cookie-btn {
            width: 100%;
            padding: 12px;
            font-size: 13px;
          }

          .cookie-overlay {
            padding: 8px;
          }

          .cookie-panel {
            padding: 16px;
            margin: 0;
            border-radius: 16px;
            max-height: 95vh;
          }

          .cookie-panel-header {
            margin-bottom: 16px;
          }

          .cookie-panel-sub {
            font-size: 12px;
            margin-bottom: 16px;
          }

          .cookie-option {
            padding: 12px;
            gap: 10px;
          }

          .cookie-option-icon {
            width: 28px;
            height: 28px;
          }

          .cookie-option-icon svg {
            width: 14px;
            height: 14px;
          }

          .cookie-panel-btn-group {
            flex-direction: column;
          }

          .cookie-panel-btn {
            padding: 14px;
            font-size: 13px;
          }

          .cookie-panel-footer {
            margin-top: 12px;
          }
        }

        @media (max-width: 400px) {
          .cookie-banner {
            padding: 12px;
            border-radius: 12px;
            bottom: 4px;
          }

          .cookie-title {
            font-size: 13px;
          }

          .cookie-description {
            font-size: 11px;
          }

          .cookie-btn {
            padding: 10px;
            font-size: 12px;
            min-width: 60px;
          }

          .cookie-panel {
            padding: 12px;
            border-radius: 12px;
          }

          .cookie-panel-title {
            font-size: 14px;
          }

          .cookie-option {
            padding: 10px;
            gap: 8px;
          }

          .cookie-option-title {
            font-size: 12px;
          }

          .cookie-option-desc {
            font-size: 10px;
          }

          .cookie-toggle {
            width: 30px;
            height: 18px;
          }

          .cookie-toggle-knob {
            width: 14px;
            height: 14px;
            top: 2px;
            left: 2px;
          }

          .cookie-toggle.active .cookie-toggle-knob {
            transform: translateX(12px);
          }

          .cookie-panel-btn {
            padding: 10px;
            font-size: 12px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cookie-banner,
          .cookie-overlay,
          .cookie-panel,
          .cookie-btn,
          .cookie-panel-btn,
          .cookie-toggle,
          .cookie-toggle-knob {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Cookie Option Sub-Component
// ─────────────────────────────────────────────────────────────────────────────
function CookieOption({ icon, title, description, enabled, onToggle }) {
  return (
    <div
      className={`cookie-option ${enabled ? 'active' : ''}`}
      onClick={onToggle}
    >
      <div className={`cookie-option-icon ${enabled ? 'active' : ''}`}>
        {icon}
      </div>
      <div className="cookie-option-content">
        <div className="cookie-option-header">
          <span className="cookie-option-title">{title}</span>
          <div className={`cookie-toggle ${enabled ? 'active' : ''}`}>
            <div className="cookie-toggle-knob" />
          </div>
        </div>
        <p className="cookie-option-desc">{description}</p>
      </div>
    </div>
  );
}