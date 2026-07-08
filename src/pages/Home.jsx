import { Helmet } from "react-helmet-async";
import Hero from "../components/home/Hero";
import TrustBadges from "../components/home/TrustBadges"
import Stats from "../components/home/Stats";
import WhyChooseUs from "../components/home/whyChooseUs";
import RecruitmentProcess from "../components/home/RecruitmentProcess";
import FeaturedJobs from "../components/home/FeaturedJobs";
import Testimonials from "../components/home/Testimonials";
import Partners from "../components/home/Partners";
import CTA from "../components/home/CTA";
import FAQ from "../components/home/FAQ";
import ContactStrip from "../components/home/ContactStrip";
import ForEmployersSection from '../components/home/ForEmployersSection';

export default function Home() {
  // ─── JSON-LD Schema: Organization ─────────────────────────────────────
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EVS Healthcare Solution Ltd",
    alternateName: "EVS Healthcare",
    legalName: "EVS Healthcare Solution Limited",
    description: "NHS-approved healthcare recruitment agency based in Preston, Lancashire. We place Registered Nurses, Mental Health Nurses, Healthcare Assistants, and Support Workers across North-West England and the UK.",
    url: "https://www.evshealthcare.co.uk",
    logo: "https://www.evshealthcare.co.uk/logo.svg",
    image: "https://www.evshealthcare.co.uk/og-image.jpg",
    telephone: "07466999218",
    email: "admin_1@evshealthcare.co.uk",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1a John William",
      addressLocality: "Preston",
      addressRegion: "Lancashire",
      postalCode: "PR1 4XE",
      addressCountry: "GB"
    },
    sameAs: [
      "https://www.linkedin.com/in/evs-healthcare-solutions-limited-b9100121a",
      "https://www.instagram.com/evsrecruitment",
      "https://www.tiktok.com/@evs.recruitment",
      "https://x.com/EvsSoulutions"
    ],
    foundingDate: "2018-03-21",
    identifier: "GB 11266899",
    areaServed: [
      { "@type": "City", name: "Preston" },
      { "@type": "City", name: "Manchester" },
      { "@type": "City", name: "Liverpool" },
      { "@type": "City", name: "London" },
      { "@type": "AdministrativeArea", name: "Lancashire" },
      { "@type": "Country", name: "United Kingdom" }
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: "07466999218",
      email: "admin_1@evshealthcare.co.uk",
      areaServed: "GB",
      availableLanguage: "en"
    }
  };

  // ─── JSON-LD Schema: Employment Agency ────────────────────────────────
  const employmentAgencySchema = {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    name: "EVS Healthcare Solution Ltd",
    alternateName: "EVS Healthcare Solutions",
    description: "NHS-approved healthcare recruitment agency specialising in Registered Nurses, Mental Health Nurses, Healthcare Assistants, and Support Workers across the UK.",
    url: "https://www.evshealthcare.co.uk",
    image: "https://www.evshealthcare.co.uk/og-image.jpg",
    telephone: "07466999218",
    email: "admin_1@evshealthcare.co.uk",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1a John William",
      addressLocality: "Preston",
      addressRegion: "Lancashire",
      postalCode: "PR1 4XE",
      addressCountry: "GB"
    },
    areaServed: ["Preston", "Manchester", "Liverpool", "London", "Lancashire", "United Kingdom"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Healthcare Recruitment Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Registered Nurse (RGN) Recruitment" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mental Health Nurse (RMN) Recruitment" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Healthcare Assistant Recruitment" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Support Worker Recruitment" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Temporary Healthcare Staffing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Permanent Healthcare Placement" } }
      ]
    }
  };

  // ─── JSON-LD Schema: Local Business ───────────────────────────────────
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "EVS Healthcare Solution Ltd",
    image: "https://www.evshealthcare.co.uk/logo.svg",
    description: "NHS-approved healthcare recruitment agency based in Preston, Lancashire specialising in nurse and healthcare worker placement.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1a John William",
      addressLocality: "Preston",
      addressRegion: "Lancashire",
      postalCode: "PR1 4XE",
      addressCountry: "GB"
    },
    telephone: "07466999218",
    email: "admin_1@evshealthcare.co.uk",
    url: "https://www.evshealthcare.co.uk",
    priceRange: "Enquire for pricing",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00"
    }
  };

  // ─── JSON-LD Schema: Aggregate Rating (from Testimonials) ──────────────
  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "47",
    reviewCount: "47",
    bestRating: "5",
    worstRating: "1"
  };

  return (
    <>
      {/* ─── SEO Meta Tags ──────────────────────────────────────────────── */}
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0f1d3d" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        
        <title>EVS Healthcare Solution Ltd | NHS-Approved Healthcare Recruitment Agency UK</title>
        <meta 
          name="description" 
          content="EVS Healthcare Solution Ltd (Company No. 11266899) is an NHS-approved healthcare recruitment agency based in Preston, Lancashire. We place Registered Nurses, Mental Health Nurses, Healthcare Assistants, and Support Workers across North-West England and the UK. 24/7 support available."
        />
        <meta name="keywords" content="EVS Healthcare Solution Ltd, healthcare recruitment agency, NHS-approved recruitment, nurse recruitment UK, healthcare assistant jobs, support worker jobs, RMN jobs, RGN jobs, Preston recruitment agency, Lancashire healthcare jobs, temporary nurses, permanent healthcare placement" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <meta name="language" content="English" />
        <meta name="author" content="EVS Healthcare Solution Ltd" />
        <meta name="publisher" content="EVS Healthcare Solution Ltd" />
        <meta name="copyright" content="© 2018-2026 EVS Healthcare Solution Ltd" />
        
        <link rel="canonical" href="https://www.evshealthcare.co.uk/" />
        <link rel="alternate" hrefLang="en-GB" href="https://www.evshealthcare.co.uk/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="EVS Healthcare Solution Ltd | NHS-Approved Healthcare Recruitment Agency UK" />
        <meta property="og:description" content="NHS-approved healthcare recruitment agency based in Preston, Lancashire. Placing nurses, carers, and support staff across the UK. Company No. 11266899." />
        <meta property="og:url" content="https://www.evshealthcare.co.uk/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="EVS Healthcare Solution Ltd" />
        <meta property="og:image" content="https://www.evshealthcare.co.uk/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="EVS Healthcare Solution Ltd - NHS-Approved Healthcare Recruitment" />
        <meta property="og:locale" content="en_GB" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="EVS Healthcare Solution Ltd | NHS-Approved Healthcare Recruitment" />
        <meta name="twitter:description" content="NHS-approved healthcare recruitment agency. Placing nurses, carers & support staff across the UK." />
        <meta name="twitter:image" content="https://www.evshealthcare.co.uk/og-image.jpg" />
        <meta name="twitter:image:alt" content="EVS Healthcare Solution Ltd logo" />
        <meta name="twitter:site" content="@EvsSoulutions" />
        <meta name="twitter:creator" content="@EvsSoulutions" />
        
        {/* Performance & Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://formspree.io" />
        <link rel="prefetch" href="https://www.evshealthcare.co.uk/jobs" />
        
        {/* Schema Markup */}
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(employmentAgencySchema)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(aggregateRatingSchema)}</script>
      </Helmet>

      {/* ─── Page Sections ──────────────────────────────────────────────── */}
      <Hero />
      <TrustBadges/>
      <Stats />
      <WhyChooseUs />
      <RecruitmentProcess />
      <FeaturedJobs />
      <Testimonials />
      <Partners />
      <CTA />
      <FAQ />
      <ContactStrip />
    </>
  );
}