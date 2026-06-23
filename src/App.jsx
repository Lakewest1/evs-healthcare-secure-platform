import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Component, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import CookieConsent from "./components/CookieConsent";
import Home from "./pages/Home";
import Apply from "./pages/Apply";
import Jobs from "./pages/Jobs";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Training from "./pages/Training";
import Employers from "./pages/Employers";

// Legal Pages
import PrivacyPolicy from "./pages/PrivacyPolicy";
import GDPRCompliance from "./pages/GDPRCompliance";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import Accessibility from "./pages/Accessibility";

// Quick Links Pages
import FAQ from "./components/home/FAQ";
import Testimonials from "./components/home/Testimonials";

// ─────────────────────────────────────────────────────────────────────────────
// ScrollToTop Component — Automatically scrolls to top on route change
// ─────────────────────────────────────────────────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

// SECURITY NOTES (App.jsx has a thin surface, but a few things belong here
// as context for whoever maintains this file next):
//
// 1. HTTP security headers (Content-Security-Policy, X-Frame-Options,
//    Referrer-Policy, Strict-Transport-Security) CANNOT be set from React —
//    they're response headers, so they belong in your hosting config
//    (Vercel/Netlify headers file, Nginx config, or a CDN rule). Routing
//    correctly here does nothing for clickjacking or CSP if those headers
//    aren't set at the server layer. Worth adding once this is deployed.
//
// 2. FloatingWhatsApp isn't included in this review — its source wasn't
//    provided. If/when it's touched: a common bug in "click to chat" widgets
//    is building the wa.me link or prefilled message from `window.location`
//    or other user-controlled input without encoding it, which can let an
//    attacker craft a URL that prefills a message on the visitor's behalf.
//    Worth a quick check next time that file is open.
//
// 3. Routes here are fully static (no `:id`-style dynamic segments reading
//    directly into a fetch or redirect), so there's no open-redirect or
//    route-injection risk in this file as written.

class RouteErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // In production, send this to your error-tracking service instead of
    // (or in addition to) the console — left as console.error here since no
    // tracking provider was specified.
    // eslint-disable-next-line no-console
    console.error("Route render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "80px 20px", textAlign: "center", fontFamily: "'Inter', sans-serif" }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#0f1d3d", marginBottom: 8 }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: 14, color: "#64748b" }}>
            Please refresh the page. If the problem continues, contact us via WhatsApp or email.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <Router>
      <div style={{ fontFamily: "'Inter', sans-serif" }}>
        <ScrollToTop />
        <CookieConsent />
        <Navbar />
        <main>
          <RouteErrorBoundary>
            <Routes>
              {/* Main Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/apply" element={<Apply />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/training" element={<Training />} />
              <Route path="/employers" element={<Employers />} />
              
              {/* Legal & Compliance Pages */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/gdpr-compliance" element={<GDPRCompliance />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/accessibility" element={<Accessibility />} />
              
              {/* Quick Links Pages */}
              <Route path="/faq" element={<FAQ />} />
              <Route path="/testimonials" element={<Testimonials />} />
              
              {/* 404 Catch-All Route (Optional but recommended) */}
              <Route path="*" element={
                <div style={{ 
                  padding: "120px 20px", 
                  textAlign: "center", 
                  fontFamily: "'Inter', sans-serif",
                  minHeight: "60vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#f8fafc"
                }}>
                  <h1 style={{ 
                    fontSize: "clamp(3rem, 8vw, 6rem)", 
                    fontWeight: 900, 
                    color: "#C4972A",
                    marginBottom: 8,
                    lineHeight: 1
                  }}>
                    404
                  </h1>
                  <h2 style={{ 
                    fontSize: "clamp(1.2rem, 2vw, 1.5rem)", 
                    fontWeight: 700, 
                    color: "#0f1d3d",
                    marginBottom: 12
                  }}>
                    Page Not Found
                  </h2>
                  <p style={{ 
                    fontSize: 14, 
                    color: "#64748b",
                    maxWidth: 400,
                    marginBottom: 24,
                    lineHeight: 1.6
                  }}>
                    The page you're looking for doesn't exist or has been moved.
                  </p>
                  <a 
                    href="/"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "14px 32px",
                      borderRadius: "50px",
                      background: "linear-gradient(135deg, #C4972A, #8B6914)",
                      color: "#fff",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      fontWeight: 700,
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                      boxShadow: "0 2px 8px rgba(196,151,42,0.25)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 4px 16px rgba(196,151,42,0.4)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "0 2px 8px rgba(196,151,42,0.25)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    Back to Home
                  </a>
                </div>
              } />
            </Routes>
          </RouteErrorBoundary>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </Router>
  );
}