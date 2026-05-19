"use client";

import { projects } from '../lib/data';

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M3 8h8.17L8.59 5.41 10 4l5 5-5 5-1.41-1.41L11.17 9H3z" />
  </svg>
);

const thumbGradients = [
  ['#00e5ff', '#006b8d'],
  ['#7cfc9a', '#0b7a55'],
  ['#ffb86b', '#9f4a1a'],
  ['#ffd166', '#b56d00'],
];

export default function Projects() {
  const loopingProjects = [...projects, ...projects];

  return (
    <section id="projects">
      <div className="section-header reveal">
        <span className="section-num">03.</span>
        <h2 className="section-title">Projects</h2>
        <div className="section-line" />
      </div>
      <div className="projects-marquee">
        <div className="projects-track">
          {loopingProjects.map(({ num, icon, category, title, desc, demo }, index) => {
            const cardKey = `${title}-${index}`;
            const [thumbFrom, thumbTo] = thumbGradients[index % thumbGradients.length];

            return (
              <article
                key={cardKey}
                className="project-card reveal"
                style={{ '--thumb-from': thumbFrom, '--thumb-to': thumbTo }}
              >
                <div className="project-thumb">
                  <span className="project-chip">{category}</span>
                  <span className="project-thumb-mark" aria-hidden="true">{icon}</span>
                </div>
                <div className="project-body">
                  <div className="project-num">{num}</div>
                  <div className="project-content-row">
                    <div>
                      <h3 className="project-title">{title}</h3>
                      <p className="project-desc">{desc}</p>
                    </div>
                    <span className="project-arrow" aria-hidden="true">
                      <ArrowIcon />
                    </span>
                  </div>
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
