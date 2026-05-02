# Dynomo Website — Design Specification

This file is the single source of truth for all design decisions.
Claude Code must refer to this when building every component.

---

## Brand Colours

```js
// tailwind.config.js — full config
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        yellow:   "#F5C135",   // Primary CTA, buttons, accents
        dark:     "#1a1a1a",   // Hero bg, footer bg, dark sections
        charcoal: "#2d2d2d",   // Secondary dark backgrounds
        offwhite: "#f5f5f5",   // Light section backgrounds
        muted:    "#6b7280",   // Body text secondary
        green:    "#25D366",   // WhatsApp button only
      },
      fontFamily: {
        heading: ["'Barlow Condensed'", "sans-serif"],  // All headings, uppercase
        body:    ["'DM Sans'", "sans-serif"],            // All body text
      },
      borderRadius: {
        pill: "9999px",   // CTA buttons
      },
    },
  },
  plugins: [],
}
```

---

## Base CSS (`src/index.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'DM Sans', sans-serif;
    color: #1a1a1a;
    background: #fff;
    -webkit-font-smoothing: antialiased;
  }
  h1, h2, h3, h4 {
    font-family: 'Barlow Condensed', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }
}

@layer components {
  .btn-primary {
    @apply bg-yellow text-dark font-body font-semibold px-8 py-3 rounded-pill 
           hover:brightness-105 transition-all duration-200 uppercase tracking-wide text-sm;
  }
  .btn-outline {
    @apply border-2 border-white text-white font-body font-semibold px-8 py-3 rounded-pill 
           hover:bg-white hover:text-dark transition-all duration-200 uppercase tracking-wide text-sm;
  }
  .section-heading {
    @apply font-heading text-4xl md:text-5xl uppercase font-bold;
  }
  .service-card {
    @apply bg-white border border-gray-100 rounded-xl overflow-hidden 
           hover:shadow-lg hover:-translate-y-1 transition-all duration-300;
  }
}
```

---

## Font Import (paste into `index.html` `<head>`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet">
```

---

## Folder Structure

```
src/
├── components/
│   ├── layout/
│   │   └── Navbar.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── Services.jsx
│   │   ├── Brands.jsx
│   │   ├── Certifications.jsx
│   │   ├── Testimonials.jsx
│   │   ├── ContactForm.jsx
│   │   └── Footer.jsx
│   └── ui/
│       ├── WhatsAppButton.jsx
│       └── ScrollToTop.jsx
├── constants/
│   └── contact.js          ← phone, email, address, social links
├── hooks/
│   └── useScrollAnimation.js
├── assets/
│   ├── logo.png            ← Dynomo logo (owner provides)
│   └── brands.png          ← boiler brands image (provided)
├── App.jsx
├── main.jsx
└── index.css
```

---

## `src/constants/contact.js`

```js
export const CONTACT = {
  phone:    "01228 000000",
  phoneHref: "tel:01228000000",
  whatsapp: "https://wa.me/447700000000",
  email:    "info@dynomoplumbing.co.uk",
  address:  "Carlisle, Cumbria",
  area:     "Carlisle & surrounding areas",
}
```

---

## Section-by-Section Design

---

### 1. Navbar

**Layout:** Fixed top. Full width. Height 72px on desktop, 60px mobile.

**Left:** Dynomo logo (image if available, else text: "DYNOMO" in Barlow Condensed bold, with "Plumbing & Heating Services" in DM Sans 12px beneath).

**Centre (desktop only):** Nav links — BOILER · GAS · PLUMBING · HEATING. DM Sans 14px, uppercase, letter-spacing wide. Link anchors to each section.

**Right:** "ENQUIRE NOW" button — `bg-yellow text-dark rounded-pill px-6 py-2 text-sm font-semibold`.

**Mobile:** Hamburger menu icon (three lines). When tapped, a full-width dropdown reveals the nav links stacked vertically + ENQUIRE NOW button. Smooth height animation with Framer Motion.

**Scroll behaviour:** On scroll past 80px, background transitions from transparent to `bg-white shadow-md`. Transition duration 300ms.

**Background:** Transparent initially → white on scroll.

---

### 2. Hero

**Layout:** Full viewport height (`min-h-screen`). Dark background `#1a1a1a`. Background image: a moody boiler/heating photo overlaid with `bg-dark/70` (70% dark overlay). Content centred vertically and horizontally.

**Content (centre of screen):**
- Dynomo logo (white version) at top — 140px wide
- Heading: `24/7 EMERGENCY SERVICES` — Barlow Condensed 72px desktop / 48px mobile, white, bold
- Subheading: `Professional Plumbing, Gas & Heating in Carlisle` — DM Sans 18px, `text-gray-300`
- CTA Button: `GET HELP NOW` — `btn-primary` class, large pill, 56px height

**Animation:** Logo fades in first (0ms delay), heading slides up (200ms), subheading slides up (400ms), button slides up (600ms). All Framer Motion `initial={{ opacity: 0, y: 30 }}` → `animate={{ opacity: 1, y: 0 }}`.

**Bottom of hero:** A subtle downward chevron icon animated with a slow bounce, colour `text-yellow`.

---

### 3. Services

**Layout:** White background. Section padding `py-20`. Max width `max-w-7xl mx-auto px-4`.

**Header:**
- Overline: `OUR SERVICES` — DM Sans 13px, `text-yellow`, uppercase, tracking-widest
- Heading: `EVERYTHING YOUR HOME NEEDS` — section-heading class
- Centred. Margin bottom 56px.

**Grid:** 3 columns desktop (`grid-cols-3`), 2 columns tablet (`md:grid-cols-2`), 1 column mobile. Gap 24px.

**6 Service Cards** — each `service-card` class:

| # | Image description | Title | Body | CTA |
|---|---|---|---|---|
| 1 | Baxi boiler mounted on wall | BOILER INSTALL & REPAIR | Professional boiler installation and servicing, ensuring your home stays warm, efficient, and safe all year round | GET BOILER HELP |
| 2 | Blue gas flame on hob | LANDLORD GAS SAFETY CHECK/CP12 | Gas safety checks you can trust – helping homeowners and landlords keep their properties and appliances safe and working as they should | GET GAS HELP |
| 3 | Chrome U-bend plumbing pipe | 24/7 EMERGENCY PLUMBING | Plumbing problems big or small, we're here to help. Whether it's a burst pipe or a simple repair, our team is available 24/7 | GET PLUMBING HELP |
| 4 | Radiator close-up | CENTRAL HEATING INSTALLATION | Looking to install new radiators or upgrade your existing ones? Our expert heating engineers will take care of everything | GET HEATING HELP |
| 5 | Hand adjusting Nest thermostat | NEST & HIVE THERMOSTAT | We provide expert thermostat installations, set up to suit your home and lifestyle | GET HEATING HELP |
| 6 | Underfloor heating manifold | UNDERFLOOR HEATING INSTALLATION | Upgrade your comfort with reliable underfloor heating installation, designed to keep your home cosy all year round | GET HEATING HELP |

**Card structure:**
```
[Image — h-48 object-cover w-full]
[Padding 24px]
  [Title — Barlow Condensed 20px uppercase bold]
  [Body — DM Sans 14px text-muted mt-2 leading-relaxed]
  [Button — btn-primary mt-4 w-full text-center text-sm]
```

Use Unsplash source URLs for placeholder images (no API key needed):
- Boiler: `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600`
- Gas: `https://images.unsplash.com/photo-1616587226960-4a03badbe8bf?w=600`
- Plumbing: `https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600`
- Radiator: `https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600`
- Thermostat: `https://images.unsplash.com/photo-1545259742-d6f23eb7d58a?w=600`
- Underfloor: `https://images.unsplash.com/photo-1599619585752-c3edb42a414c?w=600`

---

### 4. Brands

**Layout:** White background. `py-16`. Full width.

**Header:** `WE WORK WITH ALL MAJOR BRANDS` — centred, section-heading, margin bottom 40px.

**Content:** Use the provided brand image (`src/assets/brands.png`) — display it centred, `max-w-4xl mx-auto`. Add `loading="lazy"` and descriptive alt text.

**Below image:** A subtle grey divider line.

---

### 5. Certifications

**Layout:** `bg-offwhite py-16`.

**Header:** `FULLY CERTIFIED & ACCREDITED` — centred, section-heading.

**Carousel:** Display 4 certification logos in a row on desktop, 2 on tablet, scroll on mobile:
- Vaillant Advance Installer
- City & Guilds
- Baxi Approved Installer
- Gas Safe Register

Use placeholder SVG badges with the name text if image assets aren't available.

**Navigation arrows:** Left/right arrow buttons styled with `border border-yellow text-yellow rounded-full w-10 h-10`. State managed with React useState for active index.

---

### 6. Testimonials

**Layout:** White background. `py-20`.

**Header:**
- Heading: `JOIN THE THOUSANDS WHO ALREADY TRUST US` — section-heading, centred

**3 Review Cards** side by side (desktop), stacked (mobile):

Each card:
- Background: `bg-offwhite rounded-xl p-6`
- 5 green stars (★★★★★) in `text-green-500`
- Review title in bold 16px
- Review excerpt 14px `text-muted`
- Reviewer name + date in 13px `text-muted` at bottom

Use these placeholder reviews:
1. "New gas boiler installation" — "Engineer arrived exactly on time, professional and tidy. Couldn't be happier with the service." — Sarah M., Carlisle
2. "Emergency call out" — "Called at 11pm with no heating. Engineer arrived within the hour. Absolute lifesaver." — James T., Carlisle
3. "Boiler replacement" — "The installation was carried out efficiently, on time, and the engineer explained everything clearly." — Donald W., Carlisle

**Trustpilot badge:** Below cards, centred — a Trustpilot-style widget placeholder: green star icon + "Excellent" + 5 stars + "Based on our reviews".

---

### 7. Contact Form

**Layout:** Split 50/50. Left side: dark photo background (`bg-dark` overlay 70%) with white heading and subtext. Right side: `bg-yellow` with the form.

**Left side content:**
- Heading: `GET IN TOUCH` — Barlow Condensed 48px white uppercase
- Body: "Get in touch for reliable boiler repairs, services, and installations. We're here to help with all your needs." — DM Sans 16px `text-gray-200`
- Below: Phone number with phone icon in large white text
- WhatsApp link styled as green pill button

**Right side form (on yellow background):**

All inputs use: `bg-yellow-200/40 border-none rounded-full px-5 py-3 w-full text-dark placeholder-dark/50 focus:outline-none focus:ring-2 focus:ring-dark/20`

Fields:
- First name + Last name (side by side on desktop, stacked mobile)
- Email address (full width)
- Phone number (full width)
- "What service do you need?" — `<select>` dropdown with options: Boiler Install, Boiler Repair, Gas Safety Check, Emergency Plumbing, Central Heating, Thermostat Installation, Underfloor Heating, Other
- "Where did you hear about us?" — `<select>` with: Google, Facebook, Instagram, Referral, Checkatrade, Other

**Hidden honeypot field:**
```jsx
<input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
```

**Submit button:** `bg-white text-yellow font-semibold rounded-pill px-10 py-3 hover:bg-dark hover:text-white transition-all`

**Validation:** All fields required. Email must match regex. Phone must be UK format. Show red error messages below invalid fields.

**On success:** Show a green success banner: "Thank you! We'll be in touch within 24 hours."

---

### 8. Footer

**Layout:** `bg-dark text-white`. Two rows.

**Row 1 — CTA bar:** Centred. `py-12`. Two buttons side by side:
- `CALL NOW` — `btn-primary` (yellow pill)
- `WHATSAPP` — `bg-green text-white rounded-pill px-8 py-3` (green pill)

**Row 2 — Links:** `py-8 border-t border-white/10`. Three columns on desktop, stacked mobile:
- Column 1: Dynomo logo + tagline "Plumbing & Heating Services, Carlisle"
- Column 2: Nav links (BOILER, GAS, PLUMBING, HEATING) in `text-gray-400 hover:text-yellow`
- Column 3: Contact info (phone, email, Gas Safe badge mention)

**Bottom bar:** `border-t border-white/10 py-4 text-center text-gray-500 text-sm`
"© 2025 Dynomo Plumbing & Heating Services. All rights reserved. | Gas Safe Registered"

---

### 9. WhatsApp Floating Button

**Position:** Fixed, bottom-right. `bottom-6 right-6 z-50`.

**Style:** Circle 56px, `bg-green-500 text-white shadow-lg hover:scale-110 transition-transform rounded-full flex items-center justify-center`.

**Icon:** WhatsApp SVG icon (white, 28px).

**On hover:** Show tooltip "Chat on WhatsApp" to the left of the button.

**Link:** Opens `wa.me/` link from `CONTACT.whatsapp` in new tab.

---

### 10. Scroll To Top Button

**Appears when:** User has scrolled more than 400px.

**Style:** Same size as WhatsApp button but above it (`bottom-24 right-6`). `bg-yellow text-dark`. Arrow up icon.

---

## Animation System

Use Framer Motion `useInView` hook for scroll-triggered animations.

**Standard entrance animation:**
```jsx
const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
}
```

**Stagger children (for grids):**
```jsx
const container = {
  animate: { transition: { staggerChildren: 0.1 } }
}
```

Apply to: section headings, service cards, testimonial cards, certification logos.
Do NOT animate the navbar or footer (they don't need it).

---

## Responsiveness Rules

| Breakpoint | Width | Key changes |
|---|---|---|
| Mobile | < 768px | Single column, 16px side padding, 48px font headings, hamburger nav |
| Tablet | 768px–1024px | 2-column grids, 56px font headings |
| Desktop | > 1024px | 3-column service grid, full navbar, 72px font headings |
| Wide | > 1440px | `max-w-7xl mx-auto` caps content width |

---

## JSON-LD LocalBusiness Schema

Paste inside a `<script type="application/ld+json">` tag in `index.html`:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Dynomo Plumbing & Heating Services",
  "description": "24/7 emergency plumbing, boiler installation, gas safety checks and central heating services in Carlisle, Cumbria.",
  "url": "https://dynomoplumbing.co.uk",
  "telephone": "01228000000",
  "email": "info@dynomoplumbing.co.uk",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Carlisle",
    "addressRegion": "Cumbria",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "54.8951",
    "longitude": "-2.9382"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  },
  "priceRange": "££",
  "areaServed": [
    "Carlisle", "Penrith", "Brampton", "Wigton", "Longtown", "Cumbria"
  ],
  "hasCredential": "Gas Safe Registered",
  "serviceType": [
    "Boiler Installation",
    "Boiler Repair",
    "Gas Safety Check",
    "Emergency Plumbing",
    "Central Heating Installation",
    "Underfloor Heating",
    "Thermostat Installation"
  ]
}
```

---

## EmailJS Setup (for README)

1. Create account at emailjs.com (free tier: 200 emails/month)
2. Add Email Service (Gmail recommended)
3. Create Email Template — use these variables:
   - `{{from_first}}` `{{from_last}}` `{{from_email}}` `{{from_phone}}`
   - `{{service_needed}}` `{{heard_from}}` `{{to_email}}`
4. Copy Service ID, Template ID, Public Key into `.env`:
   ```
   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
   ```

---

## Post-Build Deployment Checklist

1. Run `npm run build` — verify `/dist` folder created
2. Create account at **Railway.app** or **Render.com**
3. Connect GitHub repo
4. Set build command: `npm run build`
5. Set publish directory: `dist`
6. Add environment variables from `.env`
7. Deploy — get live URL

**Google Search Console:**
1. Go to search.google.com/search-console
2. Add property → enter live URL
3. Verify ownership via HTML tag method (add `<meta name="google-site-verification">` to index.html)
4. Go to Sitemaps → submit `https://yourdomain.co.uk/sitemap.xml`
5. Request indexing on the URL inspection tool

**Google Analytics 4:**
1. Go to analytics.google.com
2. Create property → Web
3. Copy the G- measurement ID
4. Add to index.html: `<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX">`

**Google Business Profile:**
1. Go to business.google.com
2. Add business → "Dynomo Plumbing & Heating Services"
3. Category: "Plumber" + "Heating Contractor"
4. Add Carlisle address, phone, website URL
5. Verify by postcard or phone
