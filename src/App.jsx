import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Home from "./pages/Home";
import Apply from "./pages/Apply";
import Jobs from "./pages/Jobs";
import Contact from "./pages/Contact"; // ← Import Contact page

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
        <Navbar />
        <main>
          <RouteErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/apply" element={<Apply />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/contact" element={<Contact />} /> {/* ← Add Contact route */}
              {/* Add other routes here */}
            </Routes>
          </RouteErrorBoundary>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </Router>
  );
}