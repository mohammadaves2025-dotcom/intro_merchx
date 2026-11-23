<div align="center">

# MERCHX — CORPORATE PLATFORM
### *Wear Your Identity.*

**The Turnkey University Merchandise & 3D Fashion-Tech Ecosystem**

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL_3D-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Serverless-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-Proprietary-00644E?style=for-the-badge)](LICENSE)

[Live JMI Storefront](https://merch-x-jmi.vercel.app/) • [Architecture](#-architecture--design-system) • [3D Engine](#-threejs-3d-customizer-engine) • [Data Schemas](#-data-driven-content-guide) • [Deployment](#-deployment-guide)

</div>

---

## 📌 Executive Overview

**MerchX** is a student-led university merchandise and fashion-tech venture bridging collegiate pride with premium apparel engineering. 

This platform serves as the **official corporate B2B presence** for institutional administrators, collegiate athletic departments, student unions, campus societies, incubators, and investors. It stands distinct from individual consumer storefronts by providing:

* **End-to-End Turnkey Capabilities:** From creative identity extraction and collection design to ethical manufacturing coordination, quality inspection, and campus distribution.
* **Proprietary 3D Fashion-Tech:** Interactive WebGL 3D customization studio allowing campus stakeholders to co-create garments, preview authentic arched lettering, and simulate physical drape.
* **Zero Inventory Financial Risk:** Managed pre-order campaign models and batch manufacturing eliminate deadstock risks for university departments.
* **Institutional Integrity:** Clear separation between independent venture initiatives and official university endorsements.

---

## 🎨 Architecture & Design System

The corporate website is crafted with an athletic, structured visual rhythm inspired by premier institutional sportswear brands, rendered in MerchX’s signature **Kelly/Forest Green & Athletic Charcoal** identity.

### Brand Palette (Tailwind CSS v4 Tokens)

| Token | Hex Value | Role & Usage |
| :--- | :---: | :--- |
| `--color-green-primary` | `#00644E` | **Signature MerchX Kelly/Forest Green:** Primary CTA buttons, active accents, focus rings |
| `--color-green-dark` | `#004636` | **Deep Forest:** Button hover states, dark text on cream |
| `--color-charcoal` | `#1B1B1B` | **Athletic Charcoal:** Dark section bands (Hero, Services, Portfolio, Footer) |
| `--color-ivory` | `#FAF7F0` | **Warm Ivory:** Editorial story bands, alternating section rhythm |
| `--color-cream` | `#F2EDE0` | **Soft Cream:** Secondary container fills, chip badges, image placeholders |
| `--color-beige` | `#E4DAC4` | **Structural Beige:** 1px borders, subtle dividers |
| `--color-grey` | `#6B6F6C` | **Muted Grey:** Secondary body copy, metadata timestamps |
| `--color-white` | `#FFFFFF` | **Pure White:** Standard backgrounds, high-contrast typography |

### Typography Hierarchy
* **Headlines:** `Barlow Condensed` (700 Bold / 800 Extra-Bold / 900 Black, Uppercase). Loaded via Google Fonts with `display=swap`.
* **Body & UI:** `Inter` (400 Regular / 500 Medium / 600 Semi-Bold). Engineered for legibility and metric rhythm.

---

## 📱 Mobile-First Responsive Engineering

Engineered by senior front-end standards to deliver a 60fps native-app-like experience across all device viewports:

```
┌─────────────────┬──────────────────────┬───────────────────────────────────────────┐
│ Viewport Target │ Breakpoint Window    │ Responsive Layout Optimizations           │
├─────────────────┼──────────────────────┼───────────────────────────────────────────┤
│ Compact Mobile  │ 320px – 420px        │ • Full-width CTA buttons (w-full)         │
│                 │ (iPhone SE, Galaxy)  │ • 44px minimum touch targets              │
│                 │                      │ • Body scroll-lock on drawer open         │
│                 │                      │ • 2-finger scroll over 3D canvas          │
│                 │                      │ • Fluid typography (clamp) & tight line   │
├─────────────────┼──────────────────────┼───────────────────────────────────────────┤
│ Tablet / Fold   │ 768px – 1023px       │ • 2-column service & product grids        │
│                 │ (iPad, Tablets)      │ • Adaptive 2x2 lookbook gallery           │
├─────────────────┼──────────────────────┼───────────────────────────────────────────┤
│ Desktop / Wide  │ 1024px – 1440px+     │ • 12-column parametric 3D studio view     │
│                 │ (Laptops, 4K)        │ • Sticky utility bar & full nav menu      │
│                 │                      │ • Hover lift elevation & cursor physics   │
└─────────────────┴──────────────────────┴───────────────────────────────────────────┘
```

* **Zero Horizontal Jitter:** All containers, footers, and large uppercase headers implement strict `overflow-x-hidden` and `break-words`.
* **Touch-Optimized OrbitControls:** Single-touch drag orbits the 3D model; standard page scroll is preserved via two-finger touch gestures.
* **Accessible Navigation Drawer:** Modal backdrop with backdrop-blur, keyboard ESC dismissal, and automatic closing on route changes.

---

## 👕 Three.js 3D Customizer Engine

The flagship **Technology & Innovation** section features an interactive real-time 3D Apparel Studio (`src/components/sections/ThreeCustomizerMockup.jsx`):

```
                                 ┌─────────────────────────────┐
                                 │   Interactive 3D Studio     │
                                 │      (Three.js + WebGL)     │
                                 └──────────────┬──────────────┘
                                                │
                 ┌──────────────────────────────┴──────────────────────────────┐
                 ▼                                                             ▼
     ┌───────────────────────┐                                     ┌───────────────────────┐
     │   True 3D Meshes      │                                     │  Parametric Shaders   │
     │  (GLTFLoader .glb)    │                                     │   & Decal Texture     │
     ├───────────────────────┤                                     ├───────────────────────┤
     │ • 380 GSM Hoodie      │                                     │ • Real-time Swatches  │
     │ • 240 GSM Tee         │                                     │ • Arched Typography   │
     │ • Normal & Occlusion  │                                     │ • Specular Sheen      │
     └───────────────────────┘                                     └───────────────────────┘
```

* **Real GLB Garment Assets:**
  * `public/models/hoodie.glb` — Heavyweight 380 GSM collegiate pullover streetwear hoodie with authentic fabric drape and hood curvature.
  * `public/models/shirt_baked.glb` — Athletic collegiate tee with baked ambient occlusion.
* **Dynamic Arched Typography:** Mathematically calculates character rotation along an arc trajectory directly onto an offscreen canvas texture, providing authentic collegiate lettering (e.g. `JAMIA`, `STANFORD`, `IIT DELHI`) with outline strokes in real time.
* **Studio Lighting Rig:** 4-point directional lighting (Key light with soft shadow map, soft fill, colored rim light, and contact ground disc).

---

## 🗂️ Project Directory Structure

```
merchx-corporate/
├── api/
│   └── contact.js                # Vercel Serverless Function (Resend API)
├── public/
│   ├── favicon.svg               # MerchX MX monogram mark
│   ├── models/                   # 3D GLTF/GLB garment assets
│   │   ├── hoodie.glb            # 3D Heavyweight Pullover Hoodie (19.8 MB)
│   │   └── shirt_baked.glb       # 3D Athletic Tee (1.05 MB)
│   ├── products/                 # Static high-res product photos
│   ├── robots.txt                # Search engine crawler instructions
│   └── sitemap.xml               # Standard XML index for all 8 routes
├── src/
│   ├── assets/
│   │   ├── logo.jpg              # Official MerchX logo
│   │   └── products/             # Authentic Jamia hoodie product mockups
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Footer.jsx        # Charcoal multi-column footer with live links
│   │   │   ├── Navbar.jsx        # Sticky navigation with mobile touch drawer
│   │   │   └── UtilityBar.jsx    # Top institutional announcement bar
│   │   ├── sections/
│   │   │   ├── ContactForm.jsx   # Partnership form with validation & honeypot
│   │   │   ├── PageHero.jsx      # Reusable inner-page hero banner
│   │   │   ├── PillarCard.jsx    # 3 core brand pillars
│   │   │   ├── ProjectCard.jsx   # Case study card with mandatory disclaimer
│   │   │   ├── Seo.jsx           # React Helmet Async meta and Open Graph tags
│   │   │   ├── ServiceCard.jsx   # 5 turnkey core service cards
│   │   │   ├── StepTile.jsx      # Numbered 01-06 process tile
│   │   │   ├── TeamCard.jsx      # Leadership profile card (auto-hidden if empty)
│   │   │   ├── ThreeCustomizerMockup.jsx # Interactive 3D garment customizer
│   │   │   └── Timeline.jsx      # Responsive 6-step roadmap timeline
│   │   └── ui/
│   │       ├── Card.jsx          # Blocky card with green accent bar
│   │       ├── Container.jsx     # Centered responsive content boundary
│   │       ├── CTAButton.jsx     # Athletic rectangular action buttons
│   │       ├── ImagePlaceholder.jsx # Fallback graphic containers with captions
│   │       ├── Reveal.jsx        # Reduced-motion aware scroll animation
│   │       ├── ScrollToTop.jsx   # Instant scroll reset on route changes
│   │       └── Section.jsx       # Section container with alternating color bands
│   ├── data/                     # Single Source of Truth content files
│   │   ├── products.js           # 6 category showcase (no prices/no checkout)
│   │   ├── projects.js           # University case studies & live storefront links
│   │   ├── roadmap.js            # 5-phase strategic expansion roadmap
│   │   ├── services.js           # 5 core capabilities & bullet deliverables
│   │   ├── site.js               # Metadata, navigation links, and socials
│   │   ├── steps.js              # 6-step collaborative operational process
│   │   └── team.js               # Founder profiles (empty array auto-hides)
│   ├── hooks/
│   │   └── useReveal.js          # IntersectionObserver hook
│   ├── pages/                    # Route-level components
│   │   ├── About.jsx             # Origin story, principles & team
│   │   ├── Home.jsx              # All 12 homepage sections in sequential order
│   │   ├── HowItWorks.jsx        # 6-step collaborative process deep-dive
│   │   ├── NotFound.jsx          # 404 page
│   │   ├── OurWork.jsx           # Case studies & Jamia initiative
│   │   ├── Partner.jsx           # Partnership enquiry hub
│   │   ├── Privacy.jsx           # Privacy policy
│   │   ├── Technology.jsx        # 3D apparel studio & tech roadmap
│   │   ├── Terms.jsx             # Terms of service
│   │   └── Vision.jsx            # 5-phase strategic vision
│   ├── App.jsx                   # Lazy-loaded router with suspense fallbacks
│   ├── index.css                 # Tailwind v4 @theme design tokens
│   └── main.jsx                  # Entry point with HelmetProvider
├── .env.example                  # Environment variable reference
├── .npmrc                        # React 19 legacy peer dependencies configuration
├── package.json
├── vercel.json                   # SPA routing rewrites configuration
└── vite.config.js                # Vite 6 config with `@` path alias
```

---

## 🛠️ Data-Driven Content Guide

All site copy, navigation items, portfolio pieces, and product categories reside in `src/data/`. **You never need to edit JSX components to update text or links:**

### 1. Brand & Contact Information (`src/data/site.js`)
```javascript
export const siteConfig = {
  name: 'MerchX',
  tagline: 'Wear Your Identity.',
  url: 'https://merchx.in',
  storeUrl: 'https://merch-x-jmi.vercel.app/', // Live JMI Storefront
  email: 'partnerships@merchx.in',
  phone: '+91 00000 00000',
  address: 'New Delhi, India',
  socials: {
    instagram: 'https://instagram.com/YOUR_HANDLE',
    linkedin: 'https://linkedin.com/company/YOUR_HANDLE'
  }
};
```

### 2. University Case Studies (`src/data/projects.js`)
To add a new university collaboration, simply append to the `projects` array:
```javascript
{
  id: 'iit-delhi',
  client: 'IIT Delhi',
  title: 'Varsity Tech Collection',
  category: 'University Merchandise',
  description: 'Complete departmental apparel launch...',
  disclaimer: 'An independent MerchX initiative for the community.',
  tags: ['University', 'Apparel', 'E-Commerce'],
  images: [image1, image2],
  link: 'https://store-url.vercel.app/'
}
```

### 3. Founding Team (`src/data/team.js`)
*Per Hard Content Rule 7:* The team section **automatically hides itself** if the array is empty. When ready to display leadership, uncomment and populate:
```javascript
export const team = [
  {
    id: 'founder-1',
    name: 'Founder Name',
    role: 'Founder & CEO',
    bio: 'Passionate about collegiate fashion-tech...',
    photo: null,
    linkedin: 'https://linkedin.com/in/profile'
  }
];
```

---

## ⚡ Getting Started

### Prerequisites
* Node.js 18.0 or higher
* npm 9.0 or higher

### Local Development Setup
```bash
# 1. Clone repository and navigate to corporate directory
cd merchx-corporate

# 2. Install dependencies (respects React 19 legacy peer deps)
npm install

# 3. Start local Vite development server
npm run dev
```
The server will boot at **`http://localhost:5173/`**.

### Production Build
```bash
npm run build
```
Generates minified, code-split production bundles in `dist/`.

---

## 🚀 Deployment Guide (Vercel)

The project includes pre-configured `vercel.json` SPA rewrites and serverless function routing:

1. Push this repository to GitHub or GitLab.
2. In the **Vercel Dashboard**, click **Add New Project**.
3. Set the **Root Directory** to `MerchX_JMI-main/merchx-corporate` (or `merchx-corporate`).
4. Configure Environment Variables in the Vercel project settings:
   ```env
   RESEND_API_KEY=re_your_api_key_here
   CONTACT_TO_EMAIL=partnerships@yourdomain.com
   ```
5. Click **Deploy**. Vercel will build the SPA and route all API calls to `/api/contact`.

> **Note on Email Graceful Degradation:** If `RESEND_API_KEY` is not supplied, the contact form automatically detects this and notifies the user to email directly, ensuring **no false success messages** are ever displayed.

---

## ⚖️ Legal & Brand Integrity Rules

1. **Independent Venture:** MerchX operates independently. Case studies for university communities carry the explicit disclaimer: *"An independent MerchX initiative for the community."*
2. **Concept Labeling:** The 3D customizer is a Phase 3 technology vision and is captioned with: *"Concept — Coming Soon · Our Vision"*.
3. **B2B Showcase Scope:** The corporate platform does not conduct consumer retail transactions, checkout, or cart functionality. Direct purchasing takes place exclusively on dedicated institutional storefronts (such as [merch-x-jmi.vercel.app](https://merch-x-jmi.vercel.app/)).

---

<div align="center">
  <sub>Designed & Developed for MerchX • Wear Your Identity.</sub>
</div>
