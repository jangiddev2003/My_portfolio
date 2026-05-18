'use client';
import { useEffect, useRef, useState } from 'react';

export default function HireModal() {
  const [open, setOpen]       = useState(false);
  const [success, setSuccess] = useState(false);
  const nameRef  = useRef(null);
  const emailRef = useRef(null);
  const msgRef   = useRef(null);

  useEffect(() => {
    const handler = () => { setOpen(true); setSuccess(false); };
    window.addEventListener('open-hire-modal', handler);
    return () => window.removeEventListener('open-hire-modal', handler);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    if (open) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onKey);
    } else {
      document.body.style.overflow = '';
    }
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const send = async () => {
    const name  = nameRef.current?.value.trim();
    const email = emailRef.current?.value.trim();
    const msg   = msgRef.current?.value.trim();
    if (!name || !email || !msg) { alert('Please fill in all fields.'); return; }

    try {
      const emailjs = (await import('@emailjs/browser')).default;
      emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');
      await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        from_name:  name,
        from_email: email,
        message:    msg,
        to_email:   'jangiddev2003@gmail.com',
      });
      setSuccess(true);
      setTimeout(() => setOpen(false), 2500);
    } catch {
      alert('Failed to send. Please try emailing directly.');
    }
  };

  const mailto = () => {
    const name = nameRef.current?.value.trim() || '';
    const msg  = msgRef.current?.value.trim()  || '';
    window.location.href = `mailto:jangiddev2003@gmail.com?subject=${encodeURIComponent('Hiring Inquiry')}&body=${encodeURIComponent(msg + (name ? '\n\nFrom: ' + name : ''))}`;
  };

  if (!open) return null;

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
      }}
    >
      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--border2)', borderRadius: 8,
        width: '100%', maxWidth: 480, padding: '2rem', position: 'relative',
        boxShadow: '0 0 60px rgba(0,229,255,0.12)',
      }}>
        <button
          onClick={() => setOpen(false)}
          style={{
            position: 'absolute', top: '1rem', right: '1rem',
            background: 'none', border: 'none', color: 'var(--text2)',
            fontSize: '1.4rem', lineHeight: 1,
          }}
        >×</button>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--cyan)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          // Let&apos;s work together
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text)' }}>
          Hire Me
        </h2>

        {success ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>✅</div>
            <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--cyan)', fontSize: '0.95rem' }}>
              Message sent successfully
            </p>
          </div>
        ) : (
          <>
            {[
              { id: 'hm-name',  label: 'Name',    type: 'text',  ref: nameRef,  placeholder: 'Your name' },
              { id: 'hm-email', label: 'Email',   type: 'email', ref: emailRef, placeholder: 'your@email.com' },
            ].map(({ id, label, type, ref, placeholder }) => (
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

            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="hm-msg" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text2)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Message
              </label>
              <textarea
                id="hm-msg" ref={msgRef} rows={4}
                defaultValue="Hi Dev, I came across your portfolio and would like to discuss an opportunity."
                style={{ width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 4, padding: '0.65rem 0.85rem', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--cyan2)')}
                onBlur={(e)  => (e.target.style.borderColor = 'var(--border)')}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button onClick={send} className="btn-primary" style={{ flex: 1 }}>
                Send Message
              </button>
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
