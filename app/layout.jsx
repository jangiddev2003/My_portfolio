import '../styles/globals.css';

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
