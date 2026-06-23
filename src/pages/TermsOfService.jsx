import { motion } from "framer-motion";
import { FileText, AlertCircle, Scale, Shield } from "lucide-react";

export default function TermsOfService() {
  return (
    <main className="legal-page">
      <div className="legal-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="legal-header">
          <div className="legal-icon"><FileText size={32} strokeWidth={1.5} /></div>
          <h1 className="legal-title">Terms of Service</h1>
          <p className="legal-date">Last updated: June 2026</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="legal-content">
          <section className="legal-section">
            <h2><Scale size={20} /> 1. Agreement to Terms</h2>
            <p>By accessing and using the EVS Healthcare Solutions website and services, you agree to be bound by these Terms of Service.</p>
          </section>
          <section className="legal-section">
            <h2>2. Services Description</h2>
            <p>EVS Healthcare Solutions Limited provides healthcare recruitment and staffing services, connecting healthcare professionals with employers across the UK.</p>
          </section>
          <section className="legal-section">
            <h2><AlertCircle size={20} /> 3. User Responsibilities</h2>
            <ul>
              <li>Provide accurate and truthful information</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not misuse or attempt to compromise our systems</li>
            </ul>
          </section>
          <section className="legal-section">
            <h2><Shield size={20} /> 4. Limitation of Liability</h2>
            <p>EVS Healthcare Solutions Limited shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>
          </section>
          <section className="legal-section">
            <h2>5. Intellectual Property</h2>
            <p>All content, branding, and materials on this website are the property of EVS Healthcare Solutions Limited and protected by intellectual property laws.</p>
          </section>
          <section className="legal-section">
            <h2>6. Termination</h2>
            <p>We reserve the right to terminate or suspend access to our services for any breach of these terms.</p>
          </section>
          <section className="legal-section">
            <h2>7. Governing Law</h2>
            <p>These terms are governed by the laws of England and Wales.</p>
          </section>
          <section className="legal-section">
            <h2>8. Contact</h2>
            <div className="legal-contact">
              <p><strong>EVS Healthcare Solutions Limited</strong></p>
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