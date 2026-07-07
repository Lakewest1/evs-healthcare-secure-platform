import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useParams, Link, Navigate } from "react-router-dom";
import { MapPin, ArrowRight, ShieldCheck, Clock, Award } from "lucide-react";
import { cityData } from "../data/cityData";

const stats = [
  { value: "500+", label: "Healthcare Workers Placed", sub: "Across NHS & private sector" },
  { value: "150+", label: "Partner Care Homes", sub: "UK-wide trusted network" },
  { value: "98%", label: "Client Satisfaction Rate", sub: "Verified post-placement survey" },
  { value: "24/7", label: "Support Available", sub: "Always here when you need us" },
];

const LocationPage = () => {
  const { citySlug } = useParams();
  const data = Object.values(cityData).find((c) => c.slug === citySlug || c.city.toLowerCase().replace(/\s+/g, "-") === citySlug);

  if (!data) return <Navigate to="/404" replace />;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    "name": `EVS Healthcare - ${data.city}`,
    "description": data.metaDescription,
    "areaServed": data.city,
    "url": `https://www.evshealthcare.co.uk/${data.slug}`,
  };

  return (
    <div className="location-page">
      <Helmet>
        <title>{data.metaTitle}</title>
        <meta name="description" content={data.metaDescription} />
        <link rel="canonical" href={`https://www.evshealthcare.co.uk/${data.slug}`} />
        <meta property="og:title" content={data.metaTitle} />
        <meta property="og:description" content={data.metaDescription} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <section className="bg-gradient-to-r from-navy-900 to-navy-700 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Healthcare Recruitment Agency <span className="text-gold-400">{data.city}</span>
          </motion.h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">{data.intro}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/jobs" className="bg-gold-500 text-navy-900 px-8 py-3 rounded-full font-semibold hover:bg-gold-400 transition inline-flex items-center gap-2">
              View Jobs <ArrowRight size={18} />
            </Link>
            <Link to="/apply" className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-navy-900 transition">
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <span className="text-3xl font-bold text-gold-500">{s.value}</span>
              <p className="text-gray-600">{s.label}</p>
              <p className="text-gray-400 text-xs">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Healthcare Staffing in {data.city}</h2>
          {data.localContext.map((para, i) => (
            <p key={i} className="text-gray-600 leading-relaxed mb-4">{para}</p>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Roles We Recruit For in {data.city}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.roleFocus.map((role, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-gold-500">
                <MapPin size={16} className="text-gold-500 mb-2" />
                <h3 className="font-bold">{role}</h3>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 mt-6">Typical pay: {data.payBand}</p>
        </div>
      </section>

      <section className="py-16 bg-navy-900 text-white px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Healthcare Career in {data.city}?</h2>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Link to="/apply" className="bg-gold-500 text-navy-900 px-8 py-3 rounded-full font-semibold hover:bg-gold-400 transition">Apply Now</Link>
            <Link to="/contact" className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-navy-900 transition">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationPage;