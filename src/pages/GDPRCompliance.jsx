import { motion } from "framer-motion";
import { Shield, CheckCircle, Lock, Database, UserCheck, FileText, AlertTriangle } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function GDPRCompliance() {
  return (
    <main className="legal-page">
      <div className="legal-container">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.6 }} className="legal-header">
          <div className="legal-icon">
            <Shield size={32} strokeWidth={1.5} />
          </div>
          <h1 className="legal-title">GDPR Compliance</h1>
          <p className="legal-date">Last updated: June 2026</p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.6, delay: 0.2 }} className="legal-content">
          <section className="legal-section">
            <h2><CheckCircle size={20} /> Our Commitment</h2>
            <p>
              EVS Healthcare Solutions Limited is fully committed to compliance with the UK General Data Protection Regulation 
              (UK GDPR) and the Data Protection Act 2018. We process all personal data lawfully, fairly, and transparently.
            </p>
          </section>

          <section className="legal-section">
            <h2><Database size={20} /> Data Processing Principles</h2>
            <p>We adhere to the seven core principles of GDPR:</p>
            <ul>
              <li><strong>Lawfulness, Fairness & Transparency:</strong> We process data on valid legal bases and inform individuals about processing</li>
              <li><strong>Purpose Limitation:</strong> Data is collected for specified, explicit, and legitimate purposes</li>
              <li><strong>Data Minimisation:</strong> We only collect data that is adequate, relevant, and limited to what is necessary</li>
              <li><strong>Accuracy:</strong> We keep personal data accurate and up to date</li>
              <li><strong>Storage Limitation:</strong> Data is kept no longer than necessary</li>
              <li><strong>Integrity & Confidentiality:</strong> We ensure appropriate security of personal data</li>
              <li><strong>Accountability:</strong> We can demonstrate compliance with all principles</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2><Lock size={20} /> Security Measures</h2>
            <ul>
              <li>SSL/TLS encryption for all data transfers</li>
              <li>Data encrypted at rest using AES-256 encryption</li>
              <li>Multi-factor authentication for all staff accessing personal data</li>
              <li>Regular security audits and penetration testing</li>
              <li>Strict access controls based on role and necessity</li>
              <li>Staff training on data protection and GDPR compliance</li>
              <li>Data breach response plan in place</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2><UserCheck size={20} /> Data Subject Rights</h2>
            <p>We have processes in place to handle:</p>
            <ul>
              <li>Subject Access Requests (SARs) - responded to within 30 days</li>
              <li>Data rectification requests</li>
              <li>Data erasure requests ("right to be forgotten")</li>
              <li>Data portability requests</li>
              <li>Processing restriction requests</li>
              <li>Objections to processing</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2><FileText size={20} /> Documentation</h2>
            <p>We maintain:</p>
            <ul>
              <li>Records of Processing Activities (ROPA)</li>
              <li>Data Protection Impact Assessments (DPIAs)</li>
              <li>Data Processing Agreements with all third-party processors</li>
              <li>Data Breach Register</li>
              <li>Consent Management Records</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2><AlertTriangle size={20} /> Data Breach Procedure</h2>
            <p>
              In the event of a personal data breach, we will notify the ICO within 72 hours where required,
              and inform affected individuals without undue delay if the breach poses a high risk to their 
              rights and freedoms.
            </p>
          </section>

          <section className="legal-section">
            <h2>Contact Our DPO</h2>
            <div className="legal-contact">
              <p><strong>Data Protection Officer</strong></p>
              <p>EVS Healthcare Solutions Limited</p>
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
        .legal-contact p { margin-bottom: 4px; }
        @media (max-width: 640px) { .legal-container { padding: 24px 20px; } }
      `}</style>
    </main>
  );
}