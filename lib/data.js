/**
 * ============================================
 * DATA CONFIGURATION FILE
 * ============================================
 * Central repository for portfolio data:
 * - Skills and categories
 * - Projects and case studies
 * - Statistics/metrics
 * - Contact information
 * 
 * Used by components to render dynamic content
 * ============================================
 */

// ============================================
// SKILLS DATA
// ============================================
// Organized by category with individual skill tags
export const skills = [
  {
    title: 'Core Web',
    tags: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Responsive Design', 'SEO Basics'],
  },
  {
    title: 'Frameworks & Libraries',
    tags: ['React.js', 'Next.js', 'Redux', 'Tailwind CSS', 'Bootstrap', 'Framer Motion'],
  },
  {
    title: '3D & Animation',
    tags: ['Three.js', 'CSS Animations', 'Framer Motion', 'UI Micro-interactions'],
  },
  {
    title: 'AI & Automation',
    tags: ['Claude Code', 'Cursor AI', 'Lovable AI', 'Prompt Engineering', 'AI Workflow Automation'],
  },
  {
    title: 'Tools & Design',
    tags: ['Git & GitHub', 'Figma', 'REST API', 'Vercel', 'VS Code'],
  },
  {
    title: 'Productivity',
    tags: ['Excel', 'Microsoft Word', 'Google Docs'],
  },
];

// ============================================
// PROJECTS DATA
// ============================================
// Portfolio projects with details and live links
export const projects = [
  {
    num: 'Project 01',
    icon: '🧙',
    category: 'Immersive Web',
    title: 'diagonalley-shop',
    desc: 'A Harry Potter-themed wizard website with animated floating elements, 3D broomstick model, flying car scene, and a magical video background.',
    tech: ['Three.js', 'CSS Animations', 'JavaScript', 'HTML'],
    demo: 'https://diagonalley-shop.vercel.app',
  },
  {
    num: 'Project 02',
    icon: '👟',
    category: 'E-commerce UI',
    title: 'SNEAKX',
    desc: 'A modern sneaker showcase web app with clean responsive UI, smooth animations, component-based architecture, and dynamic product displays inspired by real e-commerce platforms.',
    tech: ['React.js', 'CSS', 'Responsive Design'],
    demo: 'https://sneakx-seven.vercel.app',
  },
  {
    num: 'Project 03',
    icon: '🧮',
    category: 'Utility App',
    title: 'HiPER-Calculator',
    desc: 'A futuristic calculator with glassmorphism UI, space-themed animated background, multiple visual modes (Neon, Space), and micro-interactions for polished UX.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Glassmorphism'],
    demo: 'https://hiper-calculator.vercel.app',
  },
  {
    num: 'Project 04',
    icon: '✅',
    category: 'Productivity',
    title: 'Taskify',
    desc: 'A React-based To-Do app with full task management (add, edit, delete, complete), responsive UI, component-based architecture, and smooth interactions.',
    tech: ['React.js', 'CSS', 'Component Architecture'],
    demo: 'https://taskify.jangiddev2003.workers.dev/',
  },
];

// ============================================
// STATISTICS
// ============================================
// Key metrics displayed in About section
export const stats = [
  { num: '4+', label: 'Projects Shipped' },
  { num: '20+', label: 'Skills Mastered' },
  { num: '2+', label: 'Years Coding' },
  { num: '∞', label: 'Ideas to Build' },
];

// ============================================
// CONTACT INFORMATION
// ============================================
// Links and details for Contact section
export const contactLinks = [
  { icon: '✉️', label: 'Email', value: 'jangiddev2003@gmail.com', href: 'mailto:jangiddev2003@gmail.com' },
  { icon: '📞', label: 'Phone', value: '6377853569', href: 'tel:6377853569' },
  { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/devjangid10', href: 'https://linkedin.com/in/devjangid10' },
  { icon: '🐙', label: 'GitHub', value: 'github.com/jangiddev2003', href: 'https://github.com/jangiddev2003' },
];
