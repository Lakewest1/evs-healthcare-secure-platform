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


export default function Home() {
  return (
    <>
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
