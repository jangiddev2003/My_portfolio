/**
 * ============================================
 * CUSTOM CURSOR COMPONENT
 * ============================================
 * Creates custom animated cursor with:
 * - Dot element (follows cursor instantly)
 * - Ring element (follows cursor with smooth lag)
 * - Hover state changes size/style
 * - Smooth tracking animation
 * - Follows interactive elements
 * ============================================
 */

'use client';
import { useEffect, useRef } from 'react';

export default function Cursor() {
  // References to cursor elements
  const dotRef  = useRef(null); // Inner dot (instant)
  const ringRef = useRef(null); // Outer ring (smooth lag)

  // ============================================
  // CURSOR ANIMATION SETUP
  // ============================================
  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Mouse position tracking (current cursor location)
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    // Ring position (smoothly follows with lag)
    let rx = mx, ry = my;
    let raf; // RequestAnimationFrame ID for cleanup

    // ============================================
    // MOUSE MOVE LISTENER
    // ============================================
    // Update cursor position on mouse move
    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener('mousemove', onMove);

    // ============================================
    // ANIMATION LOOP
    // ============================================
    // Continuously update cursor positions
    const animate = () => {
      // Dot follows mouse instantly
      dot.style.left  = mx + 'px';
      dot.style.top   = my + 'px';
      
      // Ring follows with smooth easing (0.12 = lag factor)
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      raf = requestAnimationFrame(animate);
    };
    // Start animation loop
    raf = requestAnimationFrame(animate);

    // ============================================
    // HOVER STATE DETECTION
    // ============================================
    // Elements that trigger cursor hover state
    const hoverSel = 'a, button, .project-card, .skill-category, .stat-card, .contact-item, .proj-link, input, textarea';
    
    // Add hover class when over interactive element
    const onOver = (e) => { if (e.target.closest(hoverSel)) document.body.classList.add('cur-hover'); };
    
    // Remove hover class when leaving interactive element
    const onOut  = (e) => { if (e.target.closest(hoverSel)) document.body.classList.remove('cur-hover'); };
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout',  onOut);

    // ============================================
    // CLEANUP FUNCTION
    // ============================================
    // Remove all event listeners and stop animation
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout',  onOut);
    };
  }, []);

  return (
    // ============================================
    // CURSOR DOM ELEMENTS
    // ============================================
    <>
      {/* Inner dot element (instant cursor) */}
      <div id="cur-dot"  ref={dotRef}  />
      {/* Outer ring element (smooth follow) */}
      <div id="cur-ring" ref={ringRef} />
    </>
  );
}
