'use client';
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener('mousemove', onMove);

    const animate = () => {
      dot.style.left  = mx + 'px';
      dot.style.top   = my + 'px';
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const hoverSel = 'a, button, .project-card, .skill-category, .stat-card, .contact-item, .proj-link, input, textarea';
    const onOver = (e) => { if (e.target.closest(hoverSel)) document.body.classList.add('cur-hover'); };
    const onOut  = (e) => { if (e.target.closest(hoverSel)) document.body.classList.remove('cur-hover'); };
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout',  onOut);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout',  onOut);
    };
  }, []);

  return (
    <>
      <div id="cur-dot"  ref={dotRef}  />
      <div id="cur-ring" ref={ringRef} />
    </>
  );
}
