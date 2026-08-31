import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import TrustedMarquee from "@/components/marquee/TrustedMarquee";
import About from "@/components/about/About";
import WhyChooseUs from "@/components/why-choose-us/WhyChooseUs";
import Services from "@/components/services/Services";
import GalleryPreview from "@/components/gallery/GalleryPreview";
import Testimonials from "@/components/testimonials/Testimonials";
import Process from "@/components/process/Process";
import FAQ from "@/components/faq/FAQ";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <TrustedMarquee />
      <About />
      <WhyChooseUs />
      <Services />
      <GalleryPreview />
      <Testimonials />
      <Process />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
