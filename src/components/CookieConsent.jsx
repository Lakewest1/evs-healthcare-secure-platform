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
      {/* Main Cookie Banner */}
      <AnimatePresence>
        {showBanner && !showPreferences && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            style={{
              position: "fixed",
              bottom: 24,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 9999,
              width: "calc(100% - 48px)",
              maxWidth: 640,
              background: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(20px)",
              borderRadius: 20,
              boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
              border: "1px solid rgba(196,151,42,0.15)",
              padding: "clamp(20px, 4vw, 28px)",
            }}
            role="dialog"
            aria-labelledby="cookie-title"
            aria-describedby="cookie-description"
          >
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              {/* Cookie Icon */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "rgba(196,151,42,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#C4972A",
                  flexShrink: 0,
                }}
              >
                <Cookie size={22} strokeWidth={1.5} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <h3
                  id="cookie-title"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#0f1d3d",
                    marginBottom: 6,
                  }}
                >
                  We Value Your Privacy
                </h3>
                <p
                  id="cookie-description"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: "#64748b",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  We use cookies to enhance your browsing experience, analyze site traffic, 
                  and personalize content. By clicking "Accept All", you consent to our use 
                  of all cookies. You can manage your preferences or learn more in our{" "}
                  <a
                    href="/cookie-policy"
                    style={{
                      color: "#C4972A",
                      textDecoration: "underline",
                      fontWeight: 600,
                    }}
                  >
                    Cookie Policy
                  </a>
                  .
                </p>

                {/* Buttons */}
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                    marginTop: 18,
                  }}
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={acceptAll}
                    style={{
                      padding: "11px 24px",
                      borderRadius: 50,
                      background: "linear-gradient(135deg, #C4972A, #8B6914)",
                      color: "#fff",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      fontWeight: 700,
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(196,151,42,0.25)",
                    }}
                  >
                    Accept All
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={acceptEssential}
                    style={{
                      padding: "11px 24px",
                      borderRadius: 50,
                      background: "#f1f5f9",
                      color: "#475569",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      fontWeight: 600,
                      border: "1px solid #e2e8f0",
                      cursor: "pointer",
                    }}
                  >
                    Essential Only
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={openPreferences}
                    style={{
                      padding: "11px 24px",
                      borderRadius: 50,
                      background: "transparent",
                      color: "#C4972A",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      fontWeight: 600,
                      border: "1.5px solid #C4972A",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Settings size={14} />
                    Customize
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Panel */}
      <AnimatePresence>
        {showPreferences && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 10000,
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(4px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
            }}
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
              style={{
                width: "100%",
                maxWidth: 500,
                maxHeight: "90vh",
                overflow: "auto",
                background: "#fff",
                borderRadius: 24,
                padding: "clamp(24px, 5vw, 32px)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 24,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: "rgba(196,151,42,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#C4972A",
                    }}
                  >
                    <Settings size={20} strokeWidth={1.5} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 17,
                      fontWeight: 700,
                      color: "#0f1d3d",
                      margin: 0,
                    }}
                  >
                    Cookie Preferences
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setShowPreferences(false);
                    if (!localStorage.getItem(COOKIE_CONSENT_KEY)) {
                      setShowBanner(true);
                    }
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#94a3b8",
                    padding: 4,
                    borderRadius: 8,
                  }}
                  aria-label="Close preferences"
                >
                  <X size={20} />
                </button>
              </div>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: "#64748b",
                  lineHeight: 1.6,
                  marginBottom: 24,
                }}
              >
                Choose which cookies you want to allow. Essential cookies are always 
                enabled as they are required for the website to function properly.
              </p>

              {/* Cookie Options */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                {/* Essential */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    padding: 16,
                    borderRadius: 14,
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: "rgba(22,163,74,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#16a34a",
                      flexShrink: 0,
                    }}
                  >
                    <Shield size={18} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700, color: "#0f1d3d" }}>
                        Essential
                      </span>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 11,
                          fontWeight: 600,
                          color: "#16a34a",
                          background: "rgba(22,163,74,0.1)",
                          padding: "4px 10px",
                          borderRadius: 20,
                        }}
                      >
                        Always On
                      </span>
                    </div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#94a3b8", margin: "4px 0 0", lineHeight: 1.5 }}>
                      Required for the website to function. Includes session management, security, 
                      and form submissions.
                    </p>
                  </div>
                </div>

                {/* Analytics */}
                <CookieOption
                  icon={<Cookie size={18} />}
                  title="Analytics"
                  description="Help us understand how visitors interact with our site so we can improve your experience."
                  enabled={preferences.analytics}
                  onToggle={() => togglePreference("analytics")}
                />

                {/* Marketing */}
                <CookieOption
                  icon={<Cookie size={18} />}
                  title="Marketing"
                  description="Used to deliver relevant advertisements and measure campaign effectiveness."
                  enabled={preferences.marketing}
                  onToggle={() => togglePreference("marketing")}
                />

                {/* Preferences */}
                <CookieOption
                  icon={<Cookie size={18} />}
                  title="Preferences"
                  description="Remember your settings, such as language or region, to personalize your experience."
                  enabled={preferences.preferences}
                  onToggle={() => togglePreference("preferences")}
                />
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={savePreferences}
                  style={{
                    flex: 1,
                    padding: "12px 24px",
                    borderRadius: 50,
                    background: "linear-gradient(135deg, #C4972A, #8B6914)",
                    color: "#fff",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(196,151,42,0.25)",
                  }}
                >
                  Save Preferences
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={acceptAll}
                  style={{
                    padding: "12px 24px",
                    borderRadius: 50,
                    background: "#f1f5f9",
                    color: "#475569",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    border: "1px solid #e2e8f0",
                    cursor: "pointer",
                  }}
                >
                  Accept All
                </motion.button>
              </div>

              {/* Cookie Policy Link */}
              <p style={{ textAlign: "center", marginTop: 16, marginBottom: 0 }}>
                <a
                  href="/cookie-policy"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    color: "#C4972A",
                    textDecoration: "underline",
                  }}
                >
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

// ─────────────────────────────────────────────────────────────────────────────
// Cookie Option Sub-Component
// ─────────────────────────────────────────────────────────────────────────────
function CookieOption({ icon, title, description, enabled, onToggle }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
        padding: 16,
        borderRadius: 14,
        background: "#fff",
        border: `1.5px solid ${enabled ? "rgba(196,151,42,0.3)" : "#e2e8f0"}`,
        transition: "all 0.2s ease",
        cursor: "pointer",
      }}
      onClick={onToggle}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: enabled ? "rgba(196,151,42,0.1)" : "#f1f5f9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: enabled ? "#C4972A" : "#94a3b8",
          flexShrink: 0,
          transition: "all 0.2s ease",
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: "#0f1d3d" }}>
            {title}
          </span>
          {/* Toggle Switch */}
          <div
            style={{
              width: 40,
              height: 22,
              borderRadius: 11,
              background: enabled ? "#C4972A" : "#cbd5e1",
              position: "relative",
              transition: "background 0.2s ease",
              flexShrink: 0,
              marginLeft: 12,
            }}
          >
            <motion.div
              animate={{ x: enabled ? 18 : 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "#fff",
                position: "absolute",
                top: 2,
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            />
          </div>
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#94a3b8", margin: "4px 0 0", lineHeight: 1.5 }}>
          {description}
        </p>
      </div>
    </div>
  );
}