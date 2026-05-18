import { skills } from '../lib/data';

export default function Skills() {
  return (
    <section id="skills">
      <div className="section-header reveal">
        <span className="section-num">02.</span>
        <h2 className="section-title">Skills</h2>
        <div className="section-line" />
      </div>
      <div className="skills-grid">
        {skills.map(({ title, tags }) => (
          <div key={title} className="skill-category reveal">
            <div className="skill-cat-title">{title}</div>
            <div className="skill-tags">
              {tags.map((tag) => (
                <span key={tag} className="skill-tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
