# MerchX — Corporate Website

> **Official Tagline:** *Wear Your Identity.*  
> **Brand Identity:** University Merchandise, Apparel, E-commerce and Fashion Technology.

A modern, high-performance corporate website built for **MerchX** as an independent venture. Positioned as a B2B merchandise-solutions and fashion-tech platform for universities, student communities, sports clubs, and institutions across India.

---

## 1. Tech Stack

- **Framework:** React 19 + Vite 6
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`) with custom `@theme` brand tokens
- **Routing:** React Router v7 with route-level code splitting (`React.lazy` + `Suspense`)
- **3D & Graphics:** Three.js (interactive 3D garment customization studio with real-time fabric rendering and dynamic canvas decals)
- **Icons:** Lucide React
- **SEO & Meta:** React Helmet Async (per-page title, meta descriptions, Open Graph, Twitter cards, canonical tags, and XML sitemaps)
- **Email & API:** Vercel Serverless Function (`api/contact.js`) powered by Resend
- **Language:** Plain JavaScript (ESM / JSX)

---

## 2. Brand Palette & Typography

All colors are defined as Tailwind v4 tokens in `src/index.css`:

| Token | Hex | Role |
| :--- | :--- | :--- |
| `green-primary` | `#00644E` | Signature MerchX Kelly/Forest Green |
| `green-dark` | `#004636` | Deep green accent & button hover |
| `ivory` | `#FAF7F0` | Warm editorial background band |
| `cream` | `#F2EDE0` | Card borders, secondary containers |
| `beige` | `#E4DAC4` | Subtle borders, structural dividers |
| `charcoal` | `#1B1B1B` | Dominant text & dark section bands |
| `grey` | `#6B6F6C` | Muted secondary body copy |
| `white` | `#FFFFFF` | Primary backgrounds and high contrast |

### Typography
- **Headings:** `Barlow Condensed` (700 Bold / 800 Extra-Bold / 900 Black, uppercase)
- **Body:** `Inter` (400 Regular / 500 Medium / 600 Semi-Bold)
- Loaded via Google Fonts with `display=swap` in `index.html`.

---

## 3. Project Structure

```
merchx-corporate/
├── api/
│   └── contact.js                # Vercel Serverless Function (Resend API)
├── public/
│   ├── favicon.svg               # MerchX MX monogram icon
│   ├── robots.txt                # Search engine crawler directives
│   └── sitemap.xml               # Complete XML sitemap (8 main routes)
├── src/
│   ├── assets/
│   │   ├── logo.jpg              # Official MerchX logo
│   │   └── placeholder/          # Showcase project photography
│   ├── components/
│   │   ├── layout/
│   │   │   ├── UtilityBar.jsx    # Top thin announcement strip
│   │   │   ├── Navbar.jsx        # Sticky header + mobile drawer
│   │   │   └── Footer.jsx        # Charcoal multi-column footer
│   │   ├── sections/
│   │   │   ├── ContactForm.jsx   # Partnership form with validation
│   │   │   ├── PageHero.jsx      # Inner page hero banners
│   │   │   ├── PillarCard.jsx    # 3 core company pillars
│   │   │   ├── ProjectCard.jsx   # Portfolio card with Jamia disclaimer
│   │   │   ├── Seo.jsx           # Dynamic Helmet SEO tags
│   │   │   ├── ServiceCard.jsx   # 5 turnkey services
│   │   │   ├── StepTile.jsx      # Numbered step card
│   │   │   ├── TeamCard.jsx      # Leadership profile card
│   │   │   ├── ThreeCustomizerMockup.jsx # Three.js 3D garment customizer
│   │   │   └── Timeline.jsx      # Responsive process timeline
│   │   └── ui/
│   │       ├── Card.jsx          # Blocky card with green accent bar
│   │       ├── Container.jsx     # Centered content container
│   │       ├── CTAButton.jsx     # Primary & outline athletic buttons
│   │       ├── ImagePlaceholder.jsx # Fallback image block with captions
│   │       ├── Reveal.jsx        # IntersectionObserver scroll animation
│   │       ├── ScrollToTop.jsx   # Auto-scroll on route changes
│   │       └── Section.jsx       # Alternating section bands
│   ├── data/
│   │   ├── products.js           # 6 product categories (showcase only)
│   │   ├── projects.js           # University initiatives & portfolio
│   │   ├── roadmap.js            # 5-phase strategic roadmap
│   │   ├── services.js           # 5 core services & key capabilities
│   │   ├── site.js               # Metadata, navigation links, socials
│   │   ├── steps.js              # 6-step collaborative process
│   │   └── team.js               # Team data (auto-hides when empty)
│   ├── hooks/
│   │   └── useReveal.js          # Motion-preference aware reveal hook
│   ├── pages/
│   │   ├── About.jsx             # Origin story, principles, mission
│   │   ├── Home.jsx              # 12 complete sections
│   │   ├── HowItWorks.jsx        # 6-step deep dive & deliverables
│   │   ├── NotFound.jsx          # 404 error page
│   │   ├── OurWork.jsx           # Case studies & Jamia initiative
│   │   ├── Partner.jsx           # Partnership enquiry hub
│   │   ├── Privacy.jsx           # Privacy policy
│   │   ├── Technology.jsx        # 3D Fashion-Tech studio & roadmap
│   │   ├── Terms.jsx             # Terms of service
│   │   └── Vision.jsx            # 5-phase growth strategy
│   ├── App.jsx                   # Lazy-loaded routes & layout shell
│   ├── index.css                 # Tailwind v4 @theme tokens & classes
│   └── main.jsx                  # React 19 root with HelmetProvider
├── .env.example                  # Environment variable reference
├── .npmrc                        # Legacy peer deps flag for React 19
├── package.json
├── vercel.json                   # SPA routing rewrites
└── vite.config.js                # Vite 6 config with @ alias
```

---

## 4. Getting Started

### Installation
```bash
# Navigate to the corporate project folder
cd merchx-corporate

# Install dependencies
npm install
```

### Local Development
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Production Build
```bash
npm run build
```
Builds optimized production assets into `dist/`.

---

## 5. Editing Content (Data-Driven Architecture)

All site content is separated into clean, modular data files inside `src/data/`. You do not need to modify component code to update content:

1. **Brand Details & Socials (`src/data/site.js`):**
   - Update `email`, `phone`, `address`, and live `url`.
   - Add Instagram and LinkedIn URLs in `socials`.

2. **Team Members (`src/data/team.js`):**
   - The team section is hidden by default. Once the founders are ready to display their profiles, uncomment the schema template and populate names, roles, bios, and LinkedIn profiles.

3. **Services (`src/data/services.js`):**
   - Edit the 5 core capabilities and bullet items.

4. **Process Steps (`src/data/steps.js`):**
   - Adjust the 6-step operational cycle.

5. **Products Showcase (`src/data/products.js`):**
   - 6 display categories: T-Shirts, Pullover Hoodies, Crewneck Sweatshirts, Polo T-Shirts, Lifestyle Apparel, and Sportswear. *(No jackets, no pricing, no checkout).*

6. **Projects & Portfolio (`src/data/projects.js`):**
   - Add new university collaborations. Note: all Jamia projects must preserve the disclaimer: *"An independent MerchX initiative for the Jamia community."*

7. **Strategic Roadmap (`src/data/roadmap.js`):**
   - Manage the 5 phases from foundation to national creator infrastructure.

---

## 6. Three.js 3D Customizer Engine

The website features an interactive 3D Apparel Customization Engine (`src/components/sections/ThreeCustomizerMockup.jsx`) located in Section 8 of the Homepage and the `/technology` page.
- **True 3D GLTF / GLB Meshes:** Loads realistic 3D clothing assets via Three.js `GLTFLoader`:
  - `public/models/hoodie.glb` — Heavyweight 380 GSM Pullover Streetwear Hoodie.
  - `public/models/shirt_baked.glb` — Collegiate Athletic 240 GSM Tee.
- **OrbitControls & Studio Lighting:** Full 360° mouse drag orbit, scroll-wheel zoom, ACESFilmic tone-mapping, soft studio shadow plate, key light, fill light, and rim lighting.
- **Real-Time Fabric Recoloring:** Smoothly applies colorway shaders (Signature Forest Green, Heather Cream, Charcoal, Navy, Crimson) across all submeshes without destroying normal maps.
- **Live Arched Typography Decal:** Mathematically plots collegiate curved lettering across the chest in real time as the user types institution names and graduation years.
- **Captioned strictly with:** *"True 3D GLB Simulation · Concept — Coming Soon · Our Vision"*.

---

## 7. Contact Form & Email Setup (Resend)

The partnership form connects to `api/contact.js` (a Vercel Serverless Function).

### Environment Variables
Create a `.env` file (or set in Vercel project settings):
```bash
RESEND_API_KEY=re_your_api_key_here
CONTACT_TO_EMAIL=partnerships@yourdomain.com
```

### Fallback Handling
If environment variables are not yet configured, the form safely alerts the user:
> *"Messages aren't enabled yet, please email us directly at contact@..."*
It never displays a false positive success.

---

## 8. Deploying on Vercel

1. Push this repository to GitHub / GitLab.
2. In the Vercel Dashboard, select **Add New Project**.
3. Set the **Root Directory** to `MerchX_JMI-main/merchx-corporate` (or `merchx-corporate`).
4. Add the Environment Variables:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
5. Deploy! Vercel handles SPA client-side routing automatically via `vercel.json`.

---

## 9. Founder Checklist (TODOs Before Launch)

- [ ] Add founder profiles in `src/data/team.js`.
- [ ] Connect official social links (Instagram / LinkedIn) in `src/data/site.js`.
- [ ] Set live domain in `siteConfig.url` (`src/data/site.js`) and `public/robots.txt` / `public/sitemap.xml`.
- [ ] Obtain Resend API key and configure `RESEND_API_KEY` and `CONTACT_TO_EMAIL`.
- [ ] Replace any placeholder photos in `src/assets/placeholder/` with high-resolution photography.

