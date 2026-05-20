/**
 * ============================================
 * ABOUT COMPONENT
 * ============================================
 * Introduction section displaying:
 * - Personal bio and developer background
 * - Contact information
 * - Statistics/metrics (from lib/data.js)
 * - Links to email, phone, GitHub, LinkedIn
 * ============================================
 */

import { stats } from '../lib/data';

export default function About() {
  return (
    // Main section for "About Me" content
    <section id="about">
      {/* ============================================ */}
      {/* SECTION HEADER */}
      {/* ============================================ */}
      {/* Header with section number, title, and decorative line */}
      <div className="section-header reveal">
        <span className="section-num">01.</span>
        <h2 className="section-title">About Me</h2>
        <div className="section-line" />
      </div>
      {/* ============================================ */}
      {/* ABOUT CONTENT GRID */}
      {/* ============================================ */}
      {/* Two-column layout: text on left, stats on right */}
      <div className="about-grid">
        {/* LEFT COLUMN: Bio text and contact info */}
        <div className="about-text reveal">
          <p>Hey! I&apos;m <strong>Dev Jangid</strong>, a passionate frontend developer and BCA student at K. P. B. Hinduja College of Commerce, Mumbai.</p>
          <p>I focus on building <strong>modern, responsive web applications</strong> with clean UI and interactive user experiences. I love working with React and exploring the world of 3D web development and animation.</p>
          <p>When I&apos;m not coding, I&apos;m exploring <strong>AI tools</strong>, creative coding, and pushing the limits of what&apos;s possible in the browser.</p>
          {/* Contact information row group */}
          <div className="about-info">
            {/* Map through contact items: email, phone, location, github, linkedin */}
            {[
              { label: 'Email', val: <a href="mailto:jangiddev2003@gmail.com">jangiddev2003@gmail.com</a> },
              { label: 'Phone', val: '6377853569' },
              { label: 'Location', val: 'Maharashtra, India' },
              { label: 'GitHub', val: <a href="https://github.com/jangiddev2003" target="_blank" rel="noreferrer">github.com/jangiddev2003</a> },
              { label: 'LinkedIn', val: <a href="https://linkedin.com/in/devjangid10" target="_blank" rel="noreferrer">linkedin.com/in/devjangid10</a> },
            ].map(({ label, val }) => (
              <div key={label} className="info-row">
                <span className="info-label">{label}</span>
                <span className="info-val">{val}</span>
              </div>
            ))}
          </div>
        </div>
        {/* RIGHT COLUMN: Statistics cards */}
        <div className="about-stats reveal">
          {/* Display stat cards from data (e.g., experience, projects count) */}
          {stats.map(({ num, label }) => (
            <div key={label} className="stat-card">
              <div className="stat-num">{num}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
