/**
 * ============================================
 * HIRE MODAL COMPONENT
 * ============================================
 * Modal dialog for hiring inquiries:
 * - Triggered by "Hire Me" button in navbar
 * - Form with name, email, message fields
 * - Two submission options:
 *   1. Send via email API (/api/send-email)
 *   2. Open default email client (mailto)
 * - Success confirmation message
 * - Close on ESC key or backdrop click
 * ============================================
 */

'use client';
import { useEffect, useRef, useState } from 'react';

export default function HireModal() {
  // State for modal visibility and form state
  const [open, setOpen]       = useState(false); // Modal open/closed
  const [success, setSuccess] = useState(false); // Form submission success state
  
  // Form input references
  const nameRef  = useRef(null);
  const emailRef = useRef(null);
  const msgRef   = useRef(null);

  // ============================================
  // MODAL TRIGGER LISTENER
  // ============================================
  // Listen for custom event from navbar "Hire Me" button
  useEffect(() => {
    // Open modal and reset success state when event fires
    const handler = () => { setOpen(true); setSuccess(false); };
    window.addEventListener('open-hire-modal', handler);
    return () => window.removeEventListener('open-hire-modal', handler);
  }, []);

  // ============================================
  // KEYBOARD & SCROLL HANDLING
  // ============================================
  // Handle ESC key to close modal and manage body scroll
  useEffect(() => {
    // Listen for ESC key to close modal
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    if (open) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onKey);
    } else {
      // Restore scroll when modal closes
      document.body.style.overflow = '';
    }
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // ============================================
  // FORM SUBMISSION - EMAIL API
  // ============================================
  // Send form data via API endpoint
  const send = async () => {
    // Get form values
    const name  = nameRef.current?.value.trim();
    const email = emailRef.current?.value.trim();
    const msg   = msgRef.current?.value.trim();
    
    // Validate all fields are filled
    if (!name || !email || !msg) { alert('Please fill in all fields.'); return; }

    // Try sending via email API
    try {
      // Call email API endpoint
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message: msg }),
      });

      // Check if request was successful
      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      // Show success message and close modal after 2.5s
      setSuccess(true);
      setTimeout(() => setOpen(false), 2500);
    } catch {
      // Show error if API fails
      alert('Failed to send. Please try emailing directly.');
    }
  };

  // ============================================
  // FALLBACK - MAILTO LINK
  // ============================================
  // Open default email client as fallback
  const mailto = () => {
    // Get form values (empty string if undefined)
    const name = nameRef.current?.value.trim() || '';
    const msg  = msgRef.current?.value.trim()  || '';
    // Create mailto link and open email client
    window.location.href = `mailto:jangiddev2003@gmail.com?subject=${encodeURIComponent('Hiring Inquiry')}&body=${encodeURIComponent(msg + (name ? '\n\nFrom: ' + name : ''))}`;
  };

  // Don't render if modal is closed
  if (!open) return null;

  return (
    // ============================================
    // MODAL OVERLAY & CONTAINER
    // ============================================
    // Backdrop with blur - click outside to close
    <div
      // Close modal when clicking outside
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
      }}
    >
      {/* Modal card */}
      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--border2)', borderRadius: 8,
        width: '100%', maxWidth: 480, padding: '2rem', position: 'relative',
        boxShadow: '0 0 60px rgba(89,106,161,0.12)',
      }}>
        {/* Close button (top right) */}
        <button
          onClick={() => setOpen(false)}
          style={{
            position: 'absolute', top: '1rem', right: '1rem',
            background: 'none', border: 'none', color: 'var(--text2)',
            fontSize: '1.4rem', lineHeight: 1,
          }}
        >×</button>

        {/* Header label */}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--cyan)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          // Let&apos;s work together
        </div>
        {/* Modal title */}
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text)' }}>
          Hire Me
        </h2>

        {/* Show success message OR form */}
        {success ? (
          {/* SUCCESS MESSAGE */}
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            {/* Success icon */}
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>✅</div>
            {/* Success text */}
            <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--cyan)', fontSize: '0.95rem' }}>
              Message sent successfully
            </p>
          </div>
        ) : (
          {/* FORM SECTION */}
          <>
            {/* Form fields: Name and Email */}
            {[
              { id: 'hm-name',  label: 'Name',    type: 'text',  ref: nameRef,  placeholder: 'Your name' },
              { id: 'hm-email', label: 'Email',   type: 'email', ref: emailRef, placeholder: 'your@email.com' },
            ].map(({ id, label, type, ref, placeholder }) => (
              {/* Form field group */}
              <div key={id} style={{ marginBottom: '1rem' }}>
                <label htmlFor={id} style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text2)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  {label}
                </label>
                <input
                  id={id} type={type} ref={ref} placeholder={placeholder}
                  style={{ width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 4, padding: '0.65rem 0.85rem', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none' }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--cyan2)')}
                  onBlur={(e)  => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>
            ))}

            {/* Message field group */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="hm-msg" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text2)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Message
              </label>
              {/* Message textarea */}
              <textarea
                id="hm-msg" ref={msgRef} rows={4}
                defaultValue="Hi Dev, I came across your portfolio and would like to discuss an opportunity."
                style={{ width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 4, padding: '0.65rem 0.85rem', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--cyan2)')}
                onBlur={(e)  => (e.target.style.borderColor = 'var(--border)')}
              />
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {/* Primary: Send via API */}
              <button onClick={send} className="btn-primary" style={{ flex: 1 }}>
                Send Message
              </button>
              {/* Secondary: Fallback to email client */}
              <button onClick={mailto} className="btn-secondary" style={{ flex: 1 }}>
                Email Directly
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
