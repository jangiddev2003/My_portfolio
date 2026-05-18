'use client';

export default function Navbar() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav>
      <a href="#hero" className="nav-logo" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
        Dev<span>.</span>
      </a>
      <ul className="nav-links">
        {['about', 'skills', 'projects', 'education', 'contact'].map((id) => (
          <li key={id}>
            <a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          </li>
        ))}
      </ul>
      <button className="nav-cta" onClick={() => window.dispatchEvent(new Event('open-hire-modal'))}>
        Hire Me
      </button>
    </nav>
  );
}
