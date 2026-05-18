'use client';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const particlesRef = useRef(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    let timer;
    const spawn = () => {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.bottom = '0';
      const dur = 4 + Math.random() * 6;
      p.style.animationDuration = dur + 's';
      p.style.animationDelay = Math.random() * 2 + 's';
      container.appendChild(p);
      setTimeout(() => p.remove(), (dur + 2) * 1000);
    };
    timer = setInterval(spawn, 400);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero">
      <div className="hero-grid-bg" />
      <div className="hero-glow" />
      <div className="hero-glow2" />
      <div className="particles" ref={particlesRef} />
      <div className="hero-content">
        <div className="hero-tag">Available for work</div>
        <h1 className="hero-title">
          Dev Jangid
          <span className="line2">Frontend Dev.</span>
        </h1>
        <p className="hero-subtitle">JavaScript &amp; React Enthusiast</p>
        <p className="hero-desc">
          Building modern, performant web experiences with clean code and interactive UI. Based in Maharashtra, India — turning ideas into pixels.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn-primary" onClick={(e) => { e.preventDefault(); scrollTo('projects'); }}>
            View Projects
          </a>
          <a href="#contact" className="btn-secondary" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>
            Contact Me
          </a>
        </div>
      </div>
      <div className="hero-socials">
        <a href="https://github.com/jangiddev2003" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/devjangid10" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
      <div className="scroll-indicator">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
