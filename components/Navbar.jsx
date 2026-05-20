/**
 * ============================================
 * NAVBAR COMPONENT
 * ============================================
 * Navigation bar with:
 * - Logo (smooth scroll to hero)
 * - Navigation links (About, Skills, Projects, etc)
 * - Hire Me CTA button
 * - Smooth scroll navigation
 * - Shrinks on scroll (via Effects.jsx)
 * ============================================
 */

'use client';

export default function Navbar() {
  // ============================================
  // SMOOTH SCROLL HELPER
  // ============================================
  // Scrolls to section by ID with smooth animation
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // ============================================
    // NAVBAR STRUCTURE
    // ============================================
    <nav>
      {/* Logo/brand - links to hero section */}
      <a href="#hero" className="nav-logo" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
        Dev<span>.</span>
      </a>
      {/* Navigation links list */}
      <ul className="nav-links">
        {/* Map section IDs to navigation links */}
        {['about', 'skills', 'projects', 'education', 'contact'].map((id) => (
          <li key={id}>
            <a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          </li>
        ))}
      </ul>
      {/* Call-to-action button - opens hire modal */}
      <button className="nav-cta" onClick={() => window.dispatchEvent(new Event('open-hire-modal'))}>
        Hire Me
      </button>
    </nav>
  );
}
