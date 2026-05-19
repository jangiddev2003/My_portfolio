"use client";

import { useEffect, useState } from 'react';

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

const statConfig = [
  { value: 29, label: 'skills total' },
  { value: 6, label: 'categories' },
  { value: 2, label: 'yrs building' },
];

export default function Skills() {
  const [counts, setCounts] = useState(statConfig.map(() => 0));

  useEffect(() => {
    const durationMs = 1200;
    const tickMs = 24;
    const totalTicks = Math.ceil(durationMs / tickMs);

    const timers = statConfig.map((stat, statIndex) => {
      let tick = 0;

      return setInterval(() => {
        tick += 1;
        const progress = Math.min(1, tick / totalTicks);
        const nextValue = Math.round(stat.value * progress);

        setCounts((prev) => {
          const updated = [...prev];
          updated[statIndex] = nextValue;
          return updated;
        });

        if (progress >= 1) {
          clearInterval(timers[statIndex]);
        }
      }, tickMs);
    });

    return () => timers.forEach((timer) => clearInterval(timer));
  }, []);

  return (
    <section id="skills" className="skills-matrix-section">
      <div className="skills-orb skills-orb-cyan" aria-hidden="true" />
      <div className="skills-orb skills-orb-purple" aria-hidden="true" />

      <div className="skills-heading reveal visible">
        <p className="skills-kicker">[ SKILL MATRIX ]</p>
        <h2 className="skills-title">My <span>Tech</span> Stack</h2>
      </div>

      <div className="skills-matrix-grid">
        {skillCategories.map(({ title, accent, tags }) => (
          <article key={title} className="skills-category reveal visible" style={{ '--accent': accent }}>
            <h3 className="skills-category-title">{title}</h3>
            <div className="skills-pills" role="list" aria-label={title}>
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

      <div className="skills-stats-bar" aria-label="Skills stats">
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
