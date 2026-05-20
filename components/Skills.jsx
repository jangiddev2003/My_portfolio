/**
 * ============================================
 * SKILLS COMPONENT
 * ============================================
 * Displays technical skills organized by category:
 * - Core Web: HTML, CSS, JavaScript, TypeScript
 * - Frameworks: React, Next.js, Redux, Tailwind
 * - 3D & Animation: Three.js, Framer Motion
 * - AI & Automation: Claude, Cursor, Lovable
 * - Tools & Design: Git, Figma, REST API, Vercel
 * - Productivity: Excel, Word, Google Docs
 * 
 * Features:
 * - Animated skill counters
 * - Category grid with color accents
 * - Skill pills with staggered animations
 * - Statistics display
 * ============================================
 */

"use client";

import { useEffect, useState } from 'react';

// ============================================
// SKILL CATEGORIES CONFIGURATION
// ============================================
// Each category has title, accent color, and skill tags
const skillCategories = [
  {
    title: 'CORE WEB',
    accent: '#00e5ff',
    tags: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Responsive Design', 'SEO Basics'],
  },
  {
    title: 'FRAMEWORKS',
    accent: '#7F77DD',
    tags: ['React.js', 'Next.js', 'Redux', 'Tailwind CSS', 'Bootstrap', 'Framer Motion'],
  },
  {
    title: '3D & ANIMATION',
    accent: '#5DCAA5',
    tags: ['Three.js', 'CSS Animations', 'Framer Motion', 'UI Micro-interactions'],
  },
  {
    title: 'AI & AUTOMATION',
    accent: '#EF9F27',
    tags: ['Claude Code', 'Cursor AI', 'Lovable AI', 'Prompt Engineering', 'AI Workflow Automation'],
  },
  {
    title: 'TOOLS & DESIGN',
    accent: '#ED93B1',
    tags: ['Git & GitHub', 'Figma', 'REST API', 'Vercel', 'VS Code'],
  },
  {
    title: 'PRODUCTIVITY',
    accent: '#888780',
    tags: ['Excel', 'Microsoft Word', 'Google Docs'],
  },
];

// ============================================
// STATISTICS CONFIGURATION
// ============================================
// Counter values that animate on component load
const statConfig = [
  { value: 29, label: 'skills total' },
  { value: 6, label: 'categories' },
  { value: 2, label: 'yrs building' },
];

export default function Skills() {
  // State for animated counter values (starts at 0, counts up to target)
  const [counts, setCounts] = useState(statConfig.map(() => 0));

  // ============================================
  // ANIMATED COUNTERS EFFECT
  // ============================================
  // Animates number counters from 0 to target value over 1.2 seconds
  useEffect(() => {
    // Animation settings
    const durationMs = 1200; // Total animation time
    const tickMs = 24; // Update interval (24ms ≈ 60fps)
    const totalTicks = Math.ceil(durationMs / tickMs); // Total update cycles

    // Create interval timer for each stat
    const timers = statConfig.map((stat, statIndex) => {
      let tick = 0; // Current tick counter

      // Increment tick and update value each interval
      return setInterval(() => {
        tick += 1; // Increment tick
        // Calculate progress ratio (0 to 1)
        const progress = Math.min(1, tick / totalTicks);
        // Calculate current animated value (linear interpolation)
        const nextValue = Math.round(stat.value * progress);

        // Update state with new value
        setCounts((prev) => {
          const updated = [...prev];
          updated[statIndex] = nextValue;
          return updated;
        });

        // Stop animation when progress reaches 100%
        if (progress >= 1) {
          clearInterval(timers[statIndex]);
        }
      }, tickMs);
    });

    // Cleanup: stop all timers when component unmounts
    return () => timers.forEach((timer) => clearInterval(timer));
  }, []);

  return (
    // ============================================
    // SKILLS SECTION
    // ============================================
    <section id="skills" className="skills-matrix-section">
      {/* Decorative background orbs */}
      <div className="skills-orb skills-orb-cyan" aria-hidden="true" />
      <div className="skills-orb skills-orb-purple" aria-hidden="true" />

      {/* Section header with title */}
      <div className="skills-heading reveal visible">
        <p className="skills-kicker">[ SKILL MATRIX ]</p>
        <h2 className="skills-title">My <span>Tech</span> Stack</h2>
      </div>

      {/* ============================================ */}
      {/* SKILLS GRID */}
      {/* ============================================ */}
      {/* Grid of skill categories with animated pills */}
      <div className="skills-matrix-grid">
        {/* Map each category to a card */}
        {skillCategories.map(({ title, accent, tags }) => (
          <article key={title} className="skills-category reveal visible" style={{ '--accent': accent }}>
            {/* Category title */}
            <h3 className="skills-category-title">{title}</h3>
            {/* List of skill pills/tags */}
            <div className="skills-pills" role="list" aria-label={title}>
              {/* Map tags to individual pills with staggered animation delay */}
              {tags.map((tag, tagIndex) => (
                <span
                  key={tag}
                  role="listitem"
                  className="skills-pill"
                  style={{ '--delay': `${tagIndex * 40}ms` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* ============================================ */}
      {/* STATISTICS BAR */}
      {/* ============================================ */}
      {/* Display animated stat counters */}
      <div className="skills-stats-bar" aria-label="Skills stats">
        {/* Map stat config to display items with animated counts */}
        {statConfig.map((stat, index) => (
          <div key={stat.label} className="skills-stat-item">
            <div className="skills-stat-value">{counts[index]}</div>
            <div className="skills-stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
