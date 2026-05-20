/**
 * ============================================
 * PROJECTS COMPONENT
 * ============================================
 * Displays portfolio projects in a carousel:
 * - Project cards with thumbnails
 * - Project number, category, title, description
 * - Links to live demos
 * - Rotating gradient thumbnails
 * - 3D tilt hover effects
 * - Infinite scroll carousel
 * ============================================
 */

"use client";

import { projects } from '../lib/data';

// ============================================
// ARROW ICON COMPONENT
// ============================================
// SVG icon for project links
const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M3 8h8.17L8.59 5.41 10 4l5 5-5 5-1.41-1.41L11.17 9H3z" />
  </svg>
);

// ============================================
// THUMBNAIL GRADIENT COLORS
// ============================================
// Color pairs for project card backgrounds (cycles through)
const thumbGradients = [
  ['#00e5ff', '#006b8d'],
  ['#7cfc9a', '#0b7a55'],
  ['#ffb86b', '#9f4a1a'],
  ['#ffd166', '#b56d00'],
];

export default function Projects() {
  // Duplicate projects array for infinite carousel effect
  const loopingProjects = [...projects, ...projects];

  return (
    // ============================================
    // PROJECTS SECTION
    // ============================================
    <section id="projects">
      {/* ============================================ */}
      {/* SECTION HEADER */}
      {/* ============================================ */}
      <div className="section-header reveal">
        {/* Section number */}
        <span className="section-num">03.</span>
        <h2 className="section-title">Projects</h2>
        <div className="section-line" />
      </div>
      {/* ============================================ */}
      {/* PROJECTS CAROUSEL */}
      {/* ============================================ */}
      {/* Marquee/carousel container with looping projects */}
      <div className="projects-marquee">
        {/* Scrolling track with project cards */}
        <div className="projects-track">
          {/* Map and render each project card */}
          {loopingProjects.map(({ num, icon, category, title, desc, demo }, index) => {
            // Generate unique key for each card
            const cardKey = `${title}-${index}`;
            // Cycle through gradient colors for thumbnails
            const [thumbFrom, thumbTo] = thumbGradients[index % thumbGradients.length];

            return (
              {/* Project card with 3D tilt effect */}
              <article
                key={cardKey}
                className="project-card reveal"
                style={{ '--thumb-from': thumbFrom, '--thumb-to': thumbTo }}
              >
                {/* Thumbnail section with gradient and icon */}
                <div className="project-thumb">
                  {/* Category badge */}
                  <span className="project-chip">{category}</span>
                  {/* Icon/emoji in thumbnail */}
                  <span className="project-thumb-mark" aria-hidden="true">{icon}</span>
                </div>
                {/* Project details section */}
                <div className="project-body">
                  {/* Project number */}
                  <div className="project-num">{num}</div>
                  {/* Project title, description, and arrow */}
                  <div className="project-content-row">
                    <div>
                      {/* Project title */}
                      <h3 className="project-title">{title}</h3>
                      {/* Project description */}
                      <p className="project-desc">{desc}</p>
                    </div>
                    {/* Arrow icon (decorative) */}
                    <span className="project-arrow" aria-hidden="true">
                      <ArrowIcon />
                    </span>
                  </div>
                  {/* Link to live demo */}
                  <a href={demo} target="_blank" rel="noreferrer" className="project-link">
                    View live demo
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
