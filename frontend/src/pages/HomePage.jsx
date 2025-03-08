import About from "../components/About";
import Hero from "../components/Hero";
import HomeMenu from "../components/HomeMenu";
import ContactUs from "../components/ContactUs";
import TestimonialSection from "../components/Testimony";

const HomePage = () => {
  return (
    <section className="max-w-5xl mx-auto p-4 ">
      <Hero />
      <HomeMenu />
      <About />
      <TestimonialSection />
      <ContactUs />
    </section>
  );
};

export default HomePage;
