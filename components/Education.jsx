/**
 * ============================================
 * EDUCATION COMPONENT
 * ============================================
 * Displays education information:
 * - School name
 * - Degree/program
 * - Duration/dates
 * ============================================
 */

export default function Education() {
  return (
    // ============================================
    // EDUCATION SECTION
    // ============================================
    <section id="education">
      {/* Section header */}
      <div className="section-header reveal">
        <span className="section-num">04.</span>
        <h2 className="section-title">Education</h2>
        <div className="section-line" />
      </div>
      {/* ============================================ */}
      {/* EDUCATION CARD */}
      {/* ============================================ */}
      <div className="edu-card reveal">
        {/* School icon emoji */}
        <div className="edu-icon">🎓</div>
        {/* Education details */}
        <div>
          {/* School/college name */}
          <div className="edu-school">K. P. B. Hinduja College of Commerce, Mumbai</div>
          {/* Degree program */}
          <div className="edu-degree">Bachelor of Computer Application (BCA)</div>
          {/* Study period/duration */}
          <div className="edu-period">Sept 2023 — Present</div>
        </div>
      </div>
    </section>
  );
}
