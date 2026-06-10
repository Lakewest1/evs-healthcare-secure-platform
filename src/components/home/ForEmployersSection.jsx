import React, { useState, useEffect, useRef } from 'react';
import {
  Building2,
  ShieldCheck,
  ClipboardCheck,
  Clock,
  Users,
  TrendingUp,
  Star,
  ArrowRight,
  Phone,
  Mail,
  CheckCircle2,
  Calendar,
  HeartHandshake,
  Award,
  Stethoscope,
  UserCheck,
  FileCheck,
  Sparkles,
  ChevronRight,
  Zap,
  Target,
  Briefcase,
  Headphones
} from 'lucide-react';

/**
 * For Employers Section - Professional Healthcare Staffing
 * Clean, conversion-optimized layout with EVS brand colors (#0f1d3d navy, #C4972A gold)
 * Features: Hero section, trust badges grid, benefit cards, stats, services grid, CTA panel
 */
const ForEmployersSection = ({ 
  onRequestStaff, 
  onBookConsultation,
  scrollTargetId = 'for-employers-page' 
}) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Stats data
  const stats = [
    { value: 500, suffix: '+', label: 'Healthcare Professionals', icon: Users },
    { value: 150, suffix: '+', label: 'Partner Organisations', icon: Building2 },
    { value: 98, suffix: '%', label: 'Satisfaction Rate', icon: Star },
    { value: 48, suffix: 'hr', label: 'Avg. Fulfilment Time', icon: Clock }
  ];

  // Benefit cards data
  const employerBenefits = [
    {
      icon: UserCheck,
      title: "Qualified Professionals",
      description: "Access a pool of pre-vetted nurses, carers, and support staff ready to work.",
      color: "#3b82f6"
    },
    {
      icon: ShieldCheck,
      title: "Full Compliance",
      description: "Enhanced DBS checks, right-to-work verification, and mandatory training completed.",
      color: "#10b981"
    },
    {
      icon: HeartHandshake,
      title: "Flexible Staffing",
      description: "Temporary, contract, or permanent placements tailored to your needs.",
      color: "#8b5cf6"
    },
    {
      icon: Headphones,
      title: "24/7 Account Support",
      description: "Dedicated account manager available whenever you need assistance.",
      color: "#f59e0b"
    }
  ];

  // Services grid data
  const employerServices = [
    { icon: Stethoscope, label: "Temporary Staffing", description: "Fill immediate gaps" },
    { icon: UserCheck, label: "Permanent Recruitment", description: "Long-term placements" },
    { icon: Users, label: "Care Home Staffing", description: "Residential & nursing" },
    { icon: Building2, label: "Supported Living", description: "Community support" },
    { icon: ClipboardCheck, label: "Nursing Staff", description: "RGN, RMN, RNLD" },
    { icon: HeartHandshake, label: "Healthcare Assistants", description: "HCA & support workers" }
  ];

  // Trust badges data - organized in 2 rows for better visual hierarchy
  const trustBadgesRow1 = [
    { icon: ShieldCheck, text: "CQC Aligned" },
    { icon: FileCheck, text: "GDPR Compliant" },
    { icon: UserCheck, text: "DBS Verified" },
    { icon: Clock, text: "24/7 Support" }
  ];

  const trustBadgesRow2 = [
    { icon: ShieldCheck, text: "DBS Checked" },
    { icon: Zap, text: "48hr Placement" },
    { icon: Headphones, text: "24/7 Support" },
    { icon: Building2, text: "150+ Partners" },
    { icon: CheckCircle2, text: "Full Compliance" },
    { icon: ShieldCheck, text: "CQC Aligned" }
  ];

  // Quick trust indicators for hero section
  const quickTrustIndicators = [
    { icon: CheckCircle2, text: 'DBS Checked' },
    { icon: Clock, text: '48hr Placement' },
    { icon: ShieldCheck, text: '24/7 Support' },
    { icon: FileCheck, text: 'Full Compliance' }
  ];

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Animate stats when visible
  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        const duration = 1500;
        const steps = 40;
        const increment = stat.value / steps;
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            setAnimatedStats(prev => {
              const newStats = [...prev];
              newStats[index] = stat.value;
              return newStats;
            });
            clearInterval(timer);
          } else {
            setAnimatedStats(prev => {
              const newStats = [...prev];
              newStats[index] = Math.floor(current);
              return newStats;
            });
          }
        }, duration / steps);
        
        return () => clearInterval(timer);
      });
    }
  }, [isVisible]);

  const handleRequestStaff = () => {
    if (onRequestStaff) onRequestStaff();
    else {
      const el = document.getElementById(scrollTargetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookConsultation = () => {
    if (onBookConsultation) onBookConsultation();
    else handleRequestStaff();
  };

  const handleCallNow = () => {
    window.location.href = 'tel:01772493994';
  };

  return (
    <section 
      ref={sectionRef}
      id="for-employers" 
      className="py-16 md:py-24 lg:py-32"
      style={{ background: '#ffffff' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================ */}
        {/* SECTION 1: HERO - HEADLINE & PRIMARY CTAS */}
        {/* ============================================================ */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6">
            <Building2 size={14} style={{ color: '#C4972A' }} />
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#7A5C10' }}>
              For Employers — Healthcare Staffing Solutions
            </span>
          </div>
          
          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 tracking-tight" style={{ color: '#0f1d3d' }}>
            Need Qualified{' '}
            <span className="relative inline-block">
              <span style={{ color: '#C4972A' }}>Healthcare Staff?</span>
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8" style={{ color: '#4a5568' }}>
            We supply vetted nurses, carers, support workers, and healthcare professionals 
            to care homes, NHS trusts, and private providers across North-West England.
          </p>
          
          {/* Primary CTA buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <button 
              onClick={handleRequestStaff}
              className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-3.5 rounded-xl font-bold transition-all hover:opacity-90"
              style={{ background: '#C4972A', color: '#0f1d3d' }}
            >
              <Building2 size={18} />
              Request Staff
              <ArrowRight size={16} />
            </button>
            
            <button 
              onClick={handleBookConsultation}
              className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-3.5 rounded-xl font-semibold transition-all hover:bg-gray-50"
              style={{ background: '#ffffff', color: '#0f1d3d', border: '1px solid #e2e8f0' }}
            >
              <Calendar size={18} style={{ color: '#C4972A' }} />
              Book Consultation
            </button>
          </div>
          
          {/* Quick trust indicators - GRID LAYOUT */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {quickTrustIndicators.map((item, idx) => (
              <div key={idx} className="flex items-center justify-center gap-1.5 text-sm py-1.5 px-2 rounded-lg" style={{ color: '#4a5568', background: '#f8fafc' }}>
                <item.icon size={14} style={{ color: '#C4972A' }} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* SECTION 2: TRUST BADGES GRID - ROW 1 */}
        {/* ============================================================ */}
        <div className={`mb-8 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#64748b' }}>
              Trusted & Accredited
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {trustBadgesRow1.map((item, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg transition-all hover:shadow-sm"
                style={{ background: '#f8fafc', border: '1px solid #eef2f6' }}
              >
                <item.icon size={14} style={{ color: '#C4972A' }} />
                <span className="text-xs font-medium whitespace-nowrap" style={{ color: '#334155' }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* SECTION 2B: TRUST BADGES GRID - ROW 2 (EXPANDED) */}
        {/* ============================================================ */}
        <div className={`mb-12 md:mb-16 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {trustBadgesRow2.map((item, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-center gap-2 py-2.5 px-2 rounded-lg transition-all hover:shadow-sm"
                style={{ background: '#f8fafc', border: '1px solid #eef2f6' }}
              >
                <item.icon size={12} style={{ color: '#C4972A' }} />
                <span className="text-xs font-medium whitespace-nowrap" style={{ color: '#334155' }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* SECTION 3: BENEFITS CARDS - WHY CHOOSE EVS */}
        {/* ============================================================ */}
        <div className={`mb-16 md:mb-20 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: '#0f1d3d' }}>
              Why Employers Choose{' '}
              <span style={{ color: '#C4972A' }}>EVS</span>
            </h2>
            <p className="text-base" style={{ color: '#64748b' }}>
              Reliable staffing solutions built on trust, compliance, and quality care
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {employerBenefits.map((benefit, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl p-6 transition-all duration-300 cursor-pointer"
                style={{
                  boxShadow: hoveredCard === index 
                    ? '0 12px 24px -8px rgba(15,29,61,0.12)' 
                    : '0 1px 2px rgba(0,0,0,0.05)',
                  border: hoveredCard === index 
                    ? `1px solid ${benefit.color}20` 
                    : '1px solid #eef2f6',
                  transform: hoveredCard === index ? 'translateY(-3px)' : 'translateY(0)'
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Icon */}
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-105"
                  style={{ background: `${benefit.color}10` }}
                >
                  <benefit.icon size={22} style={{ color: benefit.color }} strokeWidth={1.5} />
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-bold mb-2" style={{ color: '#0f1d3d' }}>
                  {benefit.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* SECTION 4: STATISTICS - SOCIAL PROOF METRICS */}
        {/* ============================================================ */}
        <div className={`mb-16 md:mb-20 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={index}
                  className="text-center p-4 md:p-5 rounded-xl"
                  style={{ background: '#f8fafc', border: '1px solid #eef2f6' }}
                >
                  <div className="w-10 h-10 mx-auto rounded-lg flex items-center justify-center mb-3" style={{ background: 'rgba(196,151,42,0.08)' }}>
                    <IconComponent size={18} style={{ color: '#C4972A' }} strokeWidth={1.5} />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold mb-1" style={{ color: '#0f1d3d' }}>
                    {animatedStats[index]}{stat.suffix}
                  </div>
                  <div className="text-xs md:text-sm" style={{ color: '#64748b' }}>
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* SECTION 5: SERVICES GRID - WHAT WE OFFER */}
        {/* ============================================================ */}
        <div className={`mb-16 md:mb-20 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold mb-2" style={{ color: '#0f1d3d' }}>
              Our{' '}
              <span style={{ color: '#C4972A' }}>Staffing Solutions</span>
            </h3>
            <p className="text-sm" style={{ color: '#64748b' }}>
              Comprehensive recruitment for every healthcare setting
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {employerServices.map((service, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white"
                style={{ background: '#f8fafc', border: '1px solid #eef2f6' }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(196,151,42,0.08)' }}>
                  <service.icon size={18} style={{ color: '#C4972A' }} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm" style={{ color: '#0f1d3d' }}>{service.label}</div>
                  <div className="text-xs" style={{ color: '#94a3b8' }}>{service.description}</div>
                </div>
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#C4972A' }} />
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* SECTION 6: FINAL CTA PANEL - CONVERSION */}
        {/* ============================================================ */}
        <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative rounded-2xl overflow-hidden" style={{ background: '#0f1d3d' }}>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: '#C4972A', filter: 'blur(60px)' }} />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10" style={{ background: '#C4972A', filter: 'blur(60px)' }} />
            
            <div className="relative px-6 py-12 md:px-12 md:py-16 text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ background: 'rgba(196,151,42,0.12)' }}>
                <Sparkles size={14} style={{ color: '#C4972A' }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#C4972A' }}>
                  Urgent Staffing Needs
                </span>
              </div>
              
              {/* Headline */}
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                Need Staff Within{' '}
                <span style={{ color: '#C4972A' }}>48 Hours?</span>
              </h3>
              
              {/* Description */}
              <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-sm md:text-base">
                Speak with our recruitment team today. We'll match you with qualified 
                healthcare professionals ready to start immediately.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
                <button 
                  onClick={handleRequestStaff}
                  className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 rounded-xl font-bold transition-all hover:opacity-90"
                  style={{ background: '#C4972A', color: '#0f1d3d' }}
                >
                  <Building2 size={18} />
                  Request Staff
                  <ArrowRight size={16} />
                </button>
                
                <button 
                  onClick={handleCallNow}
                  className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 rounded-xl font-semibold transition-all hover:bg-white/10"
                  style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  <Phone size={18} />
                  Call 01772 493994
                </button>
              </div>
              
              {/* Trust footer */}
              <p className="text-xs text-gray-400">
                Trusted by 150+ healthcare providers across North-West England
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SECTION 7: FOOTER CONTACT INFO */}
        {/* ============================================================ */}
        <div className={`mt-12 pt-8 border-t border-gray-100 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-center">
            <a 
              href="mailto:employers@evshealthcare.co.uk" 
              className="flex items-center gap-2 text-sm transition-colors hover:opacity-70"
              style={{ color: '#64748b' }}
            >
              <Mail size={14} style={{ color: '#C4972A' }} />
              <span>employers@evshealthcare.co.uk</span>
            </a>
            <button 
              onClick={handleCallNow}
              className="flex items-center gap-2 text-sm transition-colors hover:opacity-70"
              style={{ color: '#64748b' }}
            >
              <Phone size={14} style={{ color: '#C4972A' }} />
              <span>01772 493994</span>
            </button>
            <div className="flex items-center gap-2 text-sm" style={{ color: '#64748b' }}>
              <Building2 size={14} style={{ color: '#C4972A' }} />
              <span>1a John William Street, Preston, PR1 4XE</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ForEmployersSection;