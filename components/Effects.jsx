'use client';
import { useEffect } from 'react';

/**
 * ============================================
 * EFFECTS COMPONENT
 * ============================================
 * This component handles all interactive effects and animations:
 * - Scroll progress tracking
 * - Parallax effects on hero section
 * - Section depth parallax
 * - Scroll reveal animations
 * - 3D tilt effects on cards
 * - Magnetic button effects
 * - Ripple click animations
 * - Navigation bar shrink on scroll
 * - Custom cursor effects
 * 
 * All effects are applied using vanilla JavaScript listeners
 * ============================================
 */

export default function Effects() {
  useEffect(() => {
    // ============================================
    // 1. SCROLL PROGRESS BAR
    // ============================================
    // Tracks scroll position and updates progress bar width
    const bar = document.getElementById('scroll-bar');

    const onScroll = () => {
      // Calculate scroll percentage (0-100)
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      if (bar) bar.style.width = Math.min(pct, 100) + '%';

      // ============================================
      // 2. HERO PARALLAX EFFECT
      // ============================================
      // Creates depth effect by moving hero elements at different speeds
      const y = window.scrollY;
      const heroGrid  = document.querySelector('.hero-grid-bg');
      const heroGlow  = document.querySelector('.hero-glow');
      const heroGlow2 = document.querySelector('.hero-glow2');
      
      // Apply different parallax speeds to each element
      if (heroGrid)  heroGrid.style.transform  = `translateY(${y * 0.35}px)`;  // Grid moves fastest (0.35x)
      if (heroGlow)  heroGlow.style.transform  = `translateY(${y * 0.2}px)`;   // First glow (0.2x)
      if (heroGlow2) heroGlow2.style.transform = `translateY(${y * 0.15}px)`; // Second glow (0.15x)

      // ============================================
      // 3. SECTION DEPTH PARALLAX
      // ============================================
      // Each section moves slightly based on scroll, creating depth
      document.querySelectorAll('section').forEach((sec, i) => {
        // Get section position relative to viewport center
        const r   = sec.getBoundingClientRect();
        const mid = r.top + r.height / 2 - window.innerHeight / 2;
        
        // Alternate parallax speed between sections for visual variation
        const spd = i % 2 === 0 ? 0.025 : 0.018;
        sec.style.transform = `translateY(${mid * spd}px)`;
      });
    };
    
    // Attach scroll listener with passive flag for better performance
    window.addEventListener('scroll', onScroll, { passive: true });

    // ============================================
    // 4. SCROLL REVEAL ANIMATIONS
    // ============================================
    // Elements with .reveal class animate in when scrolled into view
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        // When element becomes visible in viewport
        if (entry.isIntersecting) {
          // Stagger animation - each element delays by 80ms
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          // Stop observing this element after it's revealed
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 }); // Trigger when 10% of element is visible
    
    // Start observing all reveal elements
    reveals.forEach(el => observer.observe(el));

    // ============================================
    // 5. 3D TILT EFFECT
    // ============================================
    // Cards tilt towards mouse position with perspective effect
    const attachTilt = (selector) => {
      document.querySelectorAll(selector).forEach(el => {
        const mm = (e) => {
          // Get element position
          const r  = el.getBoundingClientRect();
          
          // Calculate normalized mouse distance (-1 to 1)
          const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
          const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
          
          // Apply 3D rotation based on mouse position
          el.style.transform     = `perspective(700px) rotateX(${dy * -8}deg) rotateY(${dx * 8}deg) scale3d(1.02,1.02,1.02)`;
          
          // Dynamic shadow that responds to tilt direction
          el.style.boxShadow     = `0 ${8 + dy * 6}px ${28 + Math.abs(dy) * 14}px rgba(0,0,0,.45), 0 0 20px rgba(89,106,161,.08)`;
          
          // Radial gradient highlight follows mouse
          el.style.backgroundImage = `radial-gradient(circle at ${(dx+1)/2*100}% ${(dy+1)/2*100}%, rgba(89,106,161,0.07) 0%, transparent 65%)`;
        };
        
        // Reset styles when mouse leaves element
        const ml = () => { 
          el.style.transform = ''; 
          el.style.boxShadow = ''; 
          el.style.backgroundImage = ''; 
        };
        
        // Attach event listeners
        el.addEventListener('mousemove', mm);
        el.addEventListener('mouseleave', ml);
      });
    };
    
    // Apply 3D tilt to cards
    attachTilt('.project-card');
    attachTilt('.skill-category');
    attachTilt('.stat-card');

    // ============================================
    // 6. MAGNETIC BUTTON EFFECT
    // ============================================
    // Buttons follow cursor when hovered (magnetic effect)
    const attachMagnetic = (selector) => {
      document.querySelectorAll(selector).forEach(el => {
        const mm = (e) => {
          // Get button position
          const r  = el.getBoundingClientRect();
          
          // Calculate movement towards cursor (limited by 0.28 multiplier)
          const dx = (e.clientX - (r.left + r.width  / 2)) * 0.28;
          const dy = (e.clientY - (r.top  + r.height / 2)) * 0.28;
          
          // Move button towards cursor
          el.style.transform = `translate(${dx}px, ${dy}px)`;
        };
        
        // Reset position when mouse leaves
        const ml = () => { el.style.transform = ''; };
        
        // Attach event listeners
        el.addEventListener('mousemove', mm);
        el.addEventListener('mouseleave', ml);
      });
    };
    
    // Apply magnetic effect to all interactive buttons
    attachMagnetic('.btn-primary, .btn-secondary, .nav-cta, .form-btn');

    // ============================================
    // 7. RIPPLE CLICK EFFECT
    // ============================================
    // Material Design ripple animation on button click
    document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta, .form-btn, .proj-link').forEach(el => {
      el.addEventListener('click', (e) => {
        // Get button dimensions
        const r    = el.getBoundingClientRect();
        const size = Math.max(r.width, r.height);
        
        // Create ripple element
        const rip  = document.createElement('span');
        rip.className = 'ripple';
        
        // Position ripple at click point
        rip.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
        
        // Add ripple to button
        el.appendChild(rip);
        
        // Remove ripple after animation completes (600ms)
        setTimeout(() => rip.remove(), 600);
      });
    });

    // ============================================
    // 8. NAVIGATION BAR SHRINK ON SCROLL
    // ============================================
    // Navbar padding reduces when user scrolls down
    const nav = document.querySelector('nav');
    const navScroll = () => {
      if (nav) {
        // Reduce padding after scrolling 50px
        nav.style.padding = window.scrollY > 50 ? '0.8rem 4rem' : '1.2rem 4rem';
      }
    };
    window.addEventListener('scroll', navScroll, { passive: true });

    // ============================================
    // CLEANUP FUNCTION
    // ============================================
    // Remove all event listeners when component unmounts
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', navScroll);
      observer.disconnect();
    };
  }, []);

  // This component renders nothing (only handles side effects)
  return null;
}
