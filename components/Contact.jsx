/**
 * ============================================
 * CONTACT COMPONENT
 * ============================================
 * Contact section with:
 * - Contact information (email, phone, etc)
 * - Contact form with name, email, message
 * - Form submission via mailto
 * - Contact links from lib/data
 * ============================================
 */

'use client';
import { useRef } from 'react';
import { contactLinks } from '../lib/data';

export default function Contact() {
  // Form input references for accessing values
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const msgRef = useRef(null);

  // ============================================
  // FORM SUBMISSION HANDLER
  // ============================================
  const handleSubmit = () => {
    // Get form values and trim whitespace
    const name  = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const msg   = msgRef.current.value.trim();
    
    // Validate all fields are filled
    if (!name || !email || !msg) { alert('Please fill in all fields.'); return; }
    // Create mailto link with form data
    const mailto = `mailto:jangiddev2003@gmail.com?subject=${encodeURIComponent('Portfolio Contact from ' + name)}&body=${encodeURIComponent(msg + '\n\nFrom: ' + name + '\nEmail: ' + email)}`;
    // Open default email client
    window.location.href = mailto;
  };

  return (
    // ============================================
    // CONTACT SECTION
    // ============================================
    <section id="contact">
      {/* Section header */}
      <div className="section-header reveal">
        <span className="section-num">05.</span>
        <h2 className="section-title">Get In Touch</h2>
        <div className="section-line" />
      </div>
      {/* ============================================ */}
      {/* CONTACT GRID LAYOUT */}
      {/* ============================================ */}
      <div className="contact-grid">
        {/* LEFT COLUMN: Contact info and links */}
        <div>
          {/* Introductory text */}
          <div className="contact-text">
            <p>I&apos;m currently open to new opportunities. Whether you have a project in mind, want to collaborate, or just want to say hi — my inbox is always open!</p>
          </div>
          {/* Contact information items */}
          <div className="contact-items">
            {/* Map contact links from data */}
            {contactLinks.map(({ icon, label, value, href }) => (
              <a key={label} href={href} className="contact-item" target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                <div className="contact-item-icon">{icon}</div>
                <div>
                  <div className="contact-item-label">{label}</div>
                  <div className="contact-item-value">{value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
        {/* RIGHT COLUMN: Contact form */}
        <div className="contact-form reveal">
          {/* Name input field */}
          <div className="form-group">
            <label htmlFor="cf-name">Your Name</label>
            <input type="text" id="cf-name" ref={nameRef} placeholder="John Doe" />
          </div>
          {/* Email input field */}
          <div className="form-group">
            <label htmlFor="cf-email">Email Address</label>
            <input type="email" id="cf-email" ref={emailRef} placeholder="john@example.com" />
          </div>
          {/* Message textarea */}
          <div className="form-group">
            <label htmlFor="cf-msg">Message</label>
            <textarea id="cf-msg" ref={msgRef} placeholder="Hey Dev, I'd love to work with you on..." />
          </div>
          {/* Submit button */}
          <button className="form-btn" onClick={handleSubmit}>Send Message →</button>
        </div>
      </div>
    </section>
  );
}
