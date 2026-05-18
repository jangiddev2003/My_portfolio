'use client';
import { useEffect } from 'react';

export default function Effects() {
  useEffect(() => {
    const bar = document.getElementById('scroll-bar');

    // Scroll progress
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      if (bar) bar.style.width = Math.min(pct, 100) + '%';

      // Hero parallax
      const y = window.scrollY;
      const heroGrid  = document.querySelector('.hero-grid-bg');
      const heroGlow  = document.querySelector('.hero-glow');
      const heroGlow2 = document.querySelector('.hero-glow2');
      if (heroGrid)  heroGrid.style.transform  = `translateY(${y * 0.35}px)`;
      if (heroGlow)  heroGlow.style.transform  = `translateY(${y * 0.2}px)`;
      if (heroGlow2) heroGlow2.style.transform = `translateY(${y * 0.15}px)`;

      // Section depth
      document.querySelectorAll('section').forEach((sec, i) => {
        const r   = sec.getBoundingClientRect();
        const mid = r.top + r.height / 2 - window.innerHeight / 2;
        const spd = i % 2 === 0 ? 0.025 : 0.018;
        sec.style.transform = `translateY(${mid * spd}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));

    // 3D tilt
    const attachTilt = (selector) => {
      document.querySelectorAll(selector).forEach(el => {
        const mm = (e) => {
          const r  = el.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
          const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
          el.style.transform     = `perspective(700px) rotateX(${dy * -8}deg) rotateY(${dx * 8}deg) scale3d(1.02,1.02,1.02)`;
          el.style.boxShadow     = `0 ${8 + dy * 6}px ${28 + Math.abs(dy) * 14}px rgba(0,0,0,.45), 0 0 20px rgba(0,229,255,.08)`;
          el.style.backgroundImage = `radial-gradient(circle at ${(dx+1)/2*100}% ${(dy+1)/2*100}%, rgba(0,229,255,0.07) 0%, transparent 65%)`;
        };
        const ml = () => { el.style.transform = ''; el.style.boxShadow = ''; el.style.backgroundImage = ''; };
        el.addEventListener('mousemove', mm);
        el.addEventListener('mouseleave', ml);
      });
    };
    attachTilt('.project-card');
    attachTilt('.skill-category');
    attachTilt('.stat-card');

    // Magnetic buttons
    const attachMagnetic = (selector) => {
      document.querySelectorAll(selector).forEach(el => {
        const mm = (e) => {
          const r  = el.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width  / 2)) * 0.28;
          const dy = (e.clientY - (r.top  + r.height / 2)) * 0.28;
          el.style.transform = `translate(${dx}px, ${dy}px)`;
        };
        const ml = () => { el.style.transform = ''; };
        el.addEventListener('mousemove', mm);
        el.addEventListener('mouseleave', ml);
      });
    };
    attachMagnetic('.btn-primary, .btn-secondary, .nav-cta, .form-btn');

    // Ripple
    document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta, .form-btn, .proj-link').forEach(el => {
      el.addEventListener('click', (e) => {
        const r    = el.getBoundingClientRect();
        const size = Math.max(r.width, r.height);
        const rip  = document.createElement('span');
        rip.className = 'ripple';
        rip.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
        el.appendChild(rip);
        setTimeout(() => rip.remove(), 600);
      });
    });

    // Nav shrink
    const nav = document.querySelector('nav');
    const navScroll = () => {
      if (nav) nav.style.padding = window.scrollY > 50 ? '0.8rem 4rem' : '1.2rem 4rem';
    };
    window.addEventListener('scroll', navScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', navScroll);
      observer.disconnect();
    };
  }, []);

  return null;
}
