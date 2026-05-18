import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import HireModal from '../components/HireModal';
import Cursor from '../components/Cursor';
import Effects from '../components/Effects';

export default function Home() {
  return (
    <>
      <Cursor />
      <div id="scroll-bar" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
      <HireModal />
      <Effects />
    </>
  );
}
