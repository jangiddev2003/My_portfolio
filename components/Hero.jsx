'use client';
import { useEffect, useRef } from 'react';

/**
 * ============================================
 * HERO COMPONENT
 * ============================================
 * Landing section with:
 * - Animated particle background
 * - Hero title and description
 * - Call-to-action buttons
 * - Social media links
 * - Scroll indicator with glitter effects
 * - Parallax effects (handled by Effects.jsx)
 * ============================================
 */

export default function Hero() {
  // Reference to particle container for dynamic particle generation
  const particlesRef = useRef(null);

  // ============================================
  // PARTICLE ANIMATION SETUP
  // ============================================
  useEffect(() => {
    const container = particlesRef.current;
    // Exit if container not found
    if (!container) return;
    
    let timer;
    
    // ============================================
    // PARTICLE SPAWN FUNCTION
    // ============================================
    const spawn = () => {
      // Create new particle element
      const p = document.createElement('div');
      p.className = 'particle';
      
      // Random horizontal position (0-100%)
      p.style.left = Math.random() * 100 + '%';
      
      // Start from bottom of container
      p.style.bottom = '0';
      
      // Random duration between 4-10 seconds
      const dur = 4 + Math.random() * 6;
      p.style.animationDuration = dur + 's';
      
      // Random delay for staggered effect (0-2 seconds)
      p.style.animationDelay = Math.random() * 2 + 's';
      
      // Add particle to container
      container.appendChild(p);
      
      // Remove particle after animation completes
      setTimeout(() => p.remove(), (dur + 2) * 1000);
    };
    
    // Spawn new particle every 400ms
    timer = setInterval(spawn, 400);
    
    // Cleanup: stop spawning particles when component unmounts
    return () => clearInterval(timer);
  }, []);

  // ============================================
  // SMOOTH SCROLL HELPER
  // ============================================
  // Scrolls to section by ID with smooth animation
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    // ============================================
    // HERO SECTION
    // ============================================
    <section id="hero">
      {/* ============================================ */}
      {/* BACKGROUND ELEMENTS */}
      {/* ============================================ */}
      
      {/* Animated grid background (parallax 0.35x) */}
      <div className="hero-grid-bg" />
      
      {/* First glow effect (parallax 0.2x) */}
      <div className="hero-glow" />
      
      {/* Second glow effect (parallax 0.15x) */}
      <div className="hero-glow2" />
      
      {/* Container for animated particles */}
      <div className="particles" ref={particlesRef} />

      {/* ============================================ */}
      {/* MAIN CONTENT */}
      {/* ============================================ */}
      <div className="hero-content">
        {/* Availability badge */}
        <div className="hero-tag">Available for work</div>
        
        {/* Main hero title - split across multiple lines */}
        <h1 className="hero-title">
          Dev Jangid
          <span className="line2">Frontend Dev.</span>
        </h1>
        
        {/* Subtitle/tagline */}
        <p className="hero-subtitle">JavaScript &amp; React Enthusiast</p>
        
        {/* Descriptive text about the developer */}
        <p className="hero-desc">
          Building modern, performant web experiences with clean code and interactive UI. Based in Maharashtra, India — turning ideas into pixels.
        </p>
        
        {/* ============================================ */}
        {/* CALL-TO-ACTION BUTTONS */}
        {/* ============================================ */}
        <div className="hero-actions">
          {/* Primary button: View Projects - scrolls to projects section */}
          <a 
            href="#projects" 
            className="btn-primary" 
            onClick={(e) => { e.preventDefault(); scrollTo('projects'); }}
          >
            View Projects
          </a>
          
          {/* Secondary button: Contact Me - scrolls to contact section */}
          <a 
            href="#contact" 
            className="btn-secondary" 
            onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* ============================================ */}
      {/* SOCIAL MEDIA LINKS */}
      {/* ============================================ */}
      <div className="hero-socials">
        {/* GitHub profile link - opens in new tab */}
        <a href="https://github.com/jangiddev2003" target="_blank" rel="noreferrer">GitHub</a>
        
        {/* LinkedIn profile link - opens in new tab */}
        <a href="https://linkedin.com/in/devjangid10" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>

      {/* ============================================ */}
      {/* SCROLL INDICATOR */}
      {/* ============================================ */}
      {/* Animated indicator at bottom showing user to scroll */}
      <div className="scroll-indicator">
        {/* Glowing line with glitter particles and animation */}
        <div className="scroll-line" />
        
        {/* "Scroll" text label */}
        <span>Scroll</span>
      </div>
    </section>
  );
}
