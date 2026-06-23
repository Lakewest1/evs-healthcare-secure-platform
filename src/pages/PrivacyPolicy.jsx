import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, Mail } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function PrivacyPolicy() {
  return (
    <main className="legal-page">
      <div className="legal-container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
          className="legal-header"
        >
          <div className="legal-icon">
            <Shield size={32} strokeWidth={1.5} />
          </div>
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-date">Last updated: June 2026</p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.2 }}
          className="legal-content"
        >
          <section className="legal-section">
            <h2><Lock size={20} /> 1. Introduction</h2>
            <p>
              EVS Healthcare Solutions Limited ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
              visit our website or use our services.
            </p>
            <p>
              We are registered with the Information Commissioner's Office (ICO) and comply with the UK General 
              Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
            </p>
          </section>

          <section className="legal-section">
            <h2><Eye size={20} /> 2. Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>We may collect the following types of personal information:</p>
            <ul>
              <li><strong>Identity Data:</strong> Full name, date of birth, nationality, passport/ID details</li>
              <li><strong>Contact Data:</strong> Email address, phone number, postal address</li>
              <li><strong>Professional Data:</strong> CV, qualifications, work history, DBS certificates, references</li>
              <li><strong>Compliance Data:</strong> Right to work documents, training certificates, immunisation records</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information, cookies</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent, interactions with our platform</li>
            </ul>
            
            <h3>Sensitive Personal Data</h3>
            <p>
              With your explicit consent, we may process sensitive data including health information, 
              criminal records checks (DBS), and diversity monitoring data. This is processed strictly 
              for compliance and equal opportunities monitoring.
            </p>
          </section>

          <section className="legal-section">
            <h2><FileText size={20} /> 3. How We Use Your Information</h2>
            <p>We use your personal data for the following purposes:</p>
            <ul>
              <li>To match you with suitable healthcare job opportunities</li>
              <li>To verify your identity, qualifications, and right to work</li>
              <li>To process your application and maintain your candidate profile</li>
              <li>To communicate with you about job opportunities and assignments</li>
              <li>To comply with legal and regulatory obligations (NHS, CQC, HMRC)</li>
              <li>To improve our website and services through analytics</li>
              <li>To send marketing communications (with your consent)</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. Legal Basis for Processing</h2>
            <p>We process your data under the following lawful bases:</p>
            <ul>
              <li><strong>Contract:</strong> To fulfil our obligations when placing you in employment</li>
              <li><strong>Legal Obligation:</strong> To comply with employment law, tax regulations, and healthcare standards</li>
              <li><strong>Legitimate Interest:</strong> To improve our services and prevent fraud</li>
              <li><strong>Consent:</strong> For marketing communications and processing sensitive data</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>5. Data Sharing</h2>
            <p>We may share your data with:</p>
            <ul>
              <li><strong>Healthcare Employers:</strong> NHS Trusts, private hospitals, care homes (for placement purposes)</li>
              <li><strong>Regulatory Bodies:</strong> CQC, NMC, HCPC, HMRC (as legally required)</li>
              <li><strong>Service Providers:</strong> DBS checking services, occupational health providers, training providers</li>
              <li><strong>IT Providers:</strong> Cloud storage, CRM systems, email services</li>
            </ul>
            <p>We do not sell your personal data to third parties.</p>
          </section>

          <section className="legal-section">
            <h2>6. Data Retention</h2>
            <p>
              We retain your personal data for as long as necessary to fulfil the purposes outlined in this policy,
              or as required by law. Typically:
            </p>
            <ul>
              <li>Candidate records: 6 years after last assignment (HMRC requirement)</li>
              <li>Compliance documents: Duration of employment + 6 years</li>
              <li>Marketing consent: Until withdrawn</li>
              <li>Website analytics: 26 months</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>7. Your Rights</h2>
            <p>Under UK GDPR, you have the following rights:</p>
            <ul>
              <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
              <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
              <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
              <li><strong>Right to Data Portability:</strong> Receive your data in a machine-readable format</li>
              <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
              <li><strong>Rights re Automated Decisions:</strong> Not be subject to automated decision-making</li>
            </ul>
            <p>To exercise any of these rights, contact us at <a href="mailto:admin_1@evshealthcare.co.uk">admin_1@evshealthcare.co.uk</a>.</p>
          </section>

          <section className="legal-section">
            <h2>8. Cookies</h2>
            <p>
              Our website uses cookies to enhance your browsing experience. For detailed information,
              please see our <a href="/cookie-policy">Cookie Policy</a>.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Data Security</h2>
            <p>
              We implement appropriate technical and organisational measures to protect your personal data,
              including encryption, access controls, secure servers, and regular security audits.
            </p>
          </section>

          <section className="legal-section">
            <h2><Mail size={20} /> 10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or wish to exercise your rights, please contact:</p>
            <div className="legal-contact">
              <p><strong>Data Protection Officer</strong></p>
              <p>EVS Healthcare Solutions Limited</p>
              <p>Email: admin_1@evshealthcare.co.uk</p>
              <p>Phone: 07466999218</p>
            </div>
            <p>You also have the right to lodge a complaint with the <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">Information Commissioner's Office (ICO)</a>.</p>
          </section>
        </motion.div>
      </div>

      <style>{`
        .legal-page {
          padding: clamp(80px, 12vh, 120px) clamp(16px, 5vw, 80px);
          background: #f8fafc;
          min-height: 100vh;
        }
        .legal-container {
          max-width: 860px;
          margin: 0 auto;
          background: #fff;
          border-radius: 24px;
          padding: clamp(30px, 5vw, 60px);
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06);
        }
        .legal-header {
          text-align: center;
          margin-bottom: 48px;
          padding-bottom: 32px;
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }
        .legal-icon {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: rgba(196,151,42,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C4972A;
          margin: 0 auto 16px;
        }
        .legal-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.8rem, 3vw, 2.4rem);
          font-weight: 700;
          color: #0f1d3d;
          margin-bottom: 8px;
        }
        .legal-date {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          color: #94a3b8;
        }
        .legal-content {
          font-family: 'Inter', sans-serif;
          color: #334155;
          line-height: 1.8;
        }
        .legal-section {
          margin-bottom: 36px;
        }
        .legal-section h2 {
          font-size: 1.2rem;
          font-weight: 700;
          color: #0f1d3d;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .legal-section h2 svg {
          color: #C4972A;
        }
        .legal-section h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #334155;
          margin: 16px 0 8px;
        }
        .legal-section p {
          margin-bottom: 12px;
          font-size: 14px;
        }
        .legal-section ul {
          margin: 8px 0 16px 20px;
        }
        .legal-section li {
          margin-bottom: 6px;
          font-size: 14px;
        }
        .legal-section a {
          color: #C4972A;
          text-decoration: underline;
        }
        .legal-section a:hover {
          color: #8B6914;
        }
        .legal-contact {
          background: #f8fafc;
          padding: 20px;
          border-radius: 12px;
          margin: 16px 0;
        }
        .legal-contact p {
          margin-bottom: 4px;
        }
        @media (max-width: 640px) {
          .legal-container { padding: 24px 20px; }
        }
      `}</style>
    </main>
  );
}