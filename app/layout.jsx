/**
 * ============================================
 * ROOT LAYOUT
 * ============================================
 * Main layout file for entire Next.js app:
 * - Imports global CSS styles
 * - Sets metadata for SEO and social sharing
 * - Loads Google Fonts (Syne, DM Mono, Outfit)
 * - Wraps all pages with HTML structure
 * ============================================
 */

import '../styles/globals.css';

// ============================================
// METADATA CONFIGURATION
// ============================================
// SEO and social media metadata for the website
export const metadata = {
  title: 'Dev Jangid — Frontend Developer',
  description: 'Frontend developer and BCA student building modern, performant web experiences with clean code and interactive UI. Based in Maharashtra, India.',
  keywords: 'Dev Jangid, frontend developer, React, Next.js, JavaScript, portfolio, Maharashtra',
  icons: {
    icon: '/portfolio-logo.ico',
  },
  openGraph: {
    title: 'Dev Jangid — Frontend Developer',
    description: 'Building modern, performant web experiences with clean code and interactive UI.',
    type: 'website',
  },
};

// ============================================
// ROOT LAYOUT COMPONENT
// ============================================
// Main layout that wraps all pages
export default function RootLayout({ children }) {
  return (
    // HTML root element with English language
    <html lang="en">
      {/* Head section */}
      <head>
        {/* ============================================ */}
        {/* FONT PRECONNECTIONS */}
        {/* ============================================ */}
        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* ============================================ */}
        {/* GOOGLE FONTS IMPORT */}
        {/* ============================================ */}
        {/* Import custom fonts used throughout portfolio */}
        {/* Syne: Display font for headings */}
        {/* DM Mono: Monospace font for code/technical text */}
        {/* Outfit: Body font for readable content */}
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      
      {/* Body element wraps all page content */}
      <body>{children}</body>
    </html>
  );
}
