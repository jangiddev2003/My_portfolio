# Dev Jangid Portfolio — Next.js

## Setup

```bash
npm install
npm run dev
```

## EmailJS Setup
In `components/HireModal.jsx`, replace:
- `YOUR_EMAILJS_PUBLIC_KEY` → EmailJS Account → Public Key
- `YOUR_SERVICE_ID`         → EmailJS → Email Services
- `YOUR_TEMPLATE_ID`        → EmailJS → Email Templates

Template variables: `from_name`, `from_email`, `message`, `to_email`

## Deploy
```bash
npm run build
```
Deploy the output to Vercel, Netlify, or any Node.js host.

## Structure
```
app/
  layout.jsx       # Root layout + metadata
  page.jsx         # Page — assembles all components
components/
  Navbar.jsx
  Hero.jsx
  About.jsx
  Skills.jsx
  Projects.jsx
  Education.jsx
  Contact.jsx
  Footer.jsx
  HireModal.jsx    # Hire Me modal (EmailJS)
  Cursor.jsx       # Custom cursor with lag
  Effects.jsx      # Scroll, parallax, tilt, ripple, magnetic
lib/
  data.js          # All portfolio content
styles/
  globals.css      # All styles (no CSS modules needed)
```
