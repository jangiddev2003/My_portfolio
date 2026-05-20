/**
 * ============================================
 * HOME PAGE / MAIN PAGE
* ============================================
 * Main page component that renders entire portfolio:
 * - All major sections and components
 * - Imports all section components
 * - Manages overall page structure
 * - Includes custom cursor and effects
 * - Includes hire modal and scroll tracking
 * ============================================
 */

// ============================================
// IMPORTS
// ============================================
// Import all page section components
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

// ============================================
// HOME COMPONENT
// ============================================
// Main page that assembles all portfolio sections
export default function Home() {
  return (
    <>
      {/* ============================================ */}
      {/* CUSTOM CURSOR */}
      {/* ============================================ */}
      {/* Animated custom cursor with dot and ring */}
      <Cursor />
      
      {/* ============================================ */}
      {/* SCROLL PROGRESS BAR */}
      {/* ============================================ */}
      {/* Filled horizontal bar at top that tracks scroll position */}
      <div id="scroll-bar" />
      
      {/* ============================================ */}
      {/* NAVIGATION BAR */}
      {/* ============================================ */}
      {/* Sticky navigation with links and Hire CTA */}
      <Navbar />
      
      {/* ============================================ */}
      {/* MAIN CONTENT */}
      {/* ============================================ */}
      {/* Container for all portfolio sections */}
      <main>
        {/* Hero section - main landing area */}
        <Hero />
        {/* About section - bio and contact info */}
        <About />
        {/* Skills section - technical skills matrix */}
        <Skills />
        {/* Projects section - portfolio showcase */}
        <Projects />
        {/* Education section - school/degree info */}
        <Education />
        {/* Contact section - contact form and links */}
        <Contact />
      </main>
      
      {/* ============================================ */}
      {/* FOOTER */}
      {/* ============================================ */}
      {/* Footer with copyright and attribution */}
      <Footer />
      
      {/* ============================================ */}
      {/* HIRE MODAL */}
      {/* ============================================ */}
      {/* Modal dialog for hiring inquiries (shown on Hire Me button click) */}
      <HireModal />
      
      {/* ============================================ */}
      {/* EFFECTS & INTERACTIONS */}
      {/* ============================================ */}
      {/* Component that handles all scroll effects, animations, and interactions */}
      <Effects />
    </>
  );
}
