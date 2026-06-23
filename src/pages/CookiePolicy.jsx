import { motion } from "framer-motion";
import { Cookie, Settings, Shield } from "lucide-react";

export default function CookiePolicy() {
  return (
    <main className="legal-page">
      <div className="legal-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="legal-header">
          <div className="legal-icon"><Cookie size={32} strokeWidth={1.5} /></div>
          <h1 className="legal-title">Cookie Policy</h1>
          <p className="legal-date">Last updated: June 2026</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="legal-content">
          <section className="legal-section">
            <h2><Settings size={20} /> What Are Cookies?</h2>
            <p>Cookies are small text files placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.</p>
          </section>
          <section className="legal-section">
            <h2>Types of Cookies We Use</h2>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for the website to function properly (session management, security)</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site (Google Analytics)</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (with your consent)</li>
            </ul>
          </section>
          <section className="legal-section">
            <h2><Shield size={20} /> Managing Cookies</h2>
            <p>You can control and delete cookies through your browser settings. You can also opt-out of non-essential cookies through our cookie consent banner.</p>
          </section>
          <section className="legal-section">
            <h2>Third-Party Cookies</h2>
            <p>We use third-party services that may set cookies:</p>
            <ul>
              <li>Google Analytics (analytics)</li>
              <li>Formspree (form submissions)</li>
            </ul>
          </section>
          <section className="legal-section">
            <h2>Contact</h2>
            <div className="legal-contact">
              <p>Email: admin_1@evshealthcare.co.uk</p>
            </div>
          </section>
        </motion.div>
      </div>
      <style>{`
        .legal-page { padding: clamp(80px, 12vh, 120px) clamp(16px, 5vw, 80px); background: #f8fafc; min-height: 100vh; }
        .legal-container { max-width: 860px; margin: 0 auto; background: #fff; border-radius: 24px; padding: clamp(30px, 5vw, 60px); box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06); }
        .legal-header { text-align: center; margin-bottom: 48px; padding-bottom: 32px; border-bottom: 1px solid rgba(0,0,0,0.08); }
        .legal-icon { width: 72px; height: 72px; border-radius: 50%; background: rgba(196,151,42,0.1); display: flex; align-items: center; justify-content: center; color: #C4972A; margin: 0 auto 16px; }
        .legal-title { font-family: 'Playfair Display', Georgia, serif; font-size: clamp(1.8rem, 3vw, 2.4rem); font-weight: 700; color: #0f1d3d; margin-bottom: 8px; }
        .legal-date { font-family: 'Inter', sans-serif; font-size: 13px; color: #94a3b8; }
        .legal-content { font-family: 'Inter', sans-serif; color: #334155; line-height: 1.8; }
        .legal-section { margin-bottom: 36px; }
        .legal-section h2 { font-size: 1.2rem; font-weight: 700; color: #0f1d3d; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; }
        .legal-section h2 svg { color: #C4972A; }
        .legal-section p { margin-bottom: 12px; font-size: 14px; }
        .legal-section ul { margin: 8px 0 16px 20px; }
        .legal-section li { margin-bottom: 6px; font-size: 14px; }
        .legal-contact { background: #f8fafc; padding: 20px; border-radius: 12px; margin: 16px 0; }
        @media (max-width: 640px) { .legal-container { padding: 24px 20px; } }
      `}</style>
    </main>
  );
}