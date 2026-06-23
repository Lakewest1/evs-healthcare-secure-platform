import { motion } from "framer-motion";
import { Accessibility as AccessibilityIcon, Eye, Keyboard, Volume2, MousePointer, CheckCircle } from "lucide-react";

export default function Accessibility() {
  return (
    <main className="legal-page">
      <div className="legal-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="legal-header">
          <div className="legal-icon"><AccessibilityIcon size={32} strokeWidth={1.5} /></div>
          <h1 className="legal-title">Accessibility Statement</h1>
          <p className="legal-date">Last updated: June 2026</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="legal-content">
          <section className="legal-section">
            <h2><CheckCircle size={20} /> Our Commitment</h2>
            <p>EVS Healthcare Solutions is committed to ensuring digital accessibility for all users, including those with disabilities. We strive to comply with WCAG 2.1 Level AA standards.</p>
          </section>
          <section className="legal-section">
            <h2><Eye size={20} /> Visual Accessibility</h2>
            <ul>
              <li>High contrast colour schemes</li>
              <li>Resizable text without loss of functionality</li>
              <li>Alternative text for all images</li>
              <li>Clear visual hierarchy and focus indicators</li>
            </ul>
          </section>
          <section className="legal-section">
            <h2><Keyboard size={20} /> Keyboard Navigation</h2>
            <p>Our website is fully navigable using keyboard controls:</p>
            <ul>
              <li>Tab to move between interactive elements</li>
              <li>Enter/Space to activate buttons and links</li>
              <li>Escape to close modals and popups</li>
              <li>Arrow keys for navigation within components</li>
            </ul>
          </section>
          <section className="legal-section">
            <h2><Volume2 size={20} /> Screen Reader Support</h2>
            <ul>
              <li>ARIA labels and landmarks throughout</li>
              <li>Semantic HTML structure</li>
              <li>Descriptive link text</li>
              <li>Proper heading hierarchy</li>
            </ul>
          </section>
          <section className="legal-section">
            <h2><MousePointer size={20} /> Motor Accessibility</h2>
            <ul>
              <li>Large clickable areas for buttons and links</li>
              <li>No time-limited interactions</li>
              <li>Reduced motion support for users with motion sensitivity</li>
            </ul>
          </section>
          <section className="legal-section">
            <h2>Feedback</h2>
            <p>If you encounter any accessibility barriers, please contact us:</p>
            <div className="legal-contact">
              <p>Email: admin_1@evshealthcare.co.uk</p>
              <p>Phone: 07466999218</p>
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