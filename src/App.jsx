import About from "./components/About";
import ContactForm from "./components/ContactForm";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Pricing from "./components/Pricing";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";

function App() {
  return (
    <div className="overflow-x-hidden bg-orange-50 text-emerald-950
    antialiased">
      <Navbar/>
      <Hero/>
      <About/>
      <Services/>
      <Projects/>
      <Pricing/>
      <Team/>
      <Testimonials/>
      <Faq/>
      <ContactForm/>
      <Footer/>
    </div>
  );
}

export default App;
