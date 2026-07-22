import CTA from "@/components/Cta";
import FAQs from "@/components/Faqs";
import Features from "@/components/Features";
import FinancialCalculator from "@/components/FinancialCalculator";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import Security from "@/components/Security";
import Providers from "@/components/ServiceProviders";
import Testimonials from "@/components/Testimonials";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="pt-20">
        <Hero />
        <Features />
        <HowItWorks />
        <Providers />
        <FinancialCalculator />
        <Security />
        <Testimonials />
        <FAQs />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
