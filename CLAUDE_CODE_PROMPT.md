# Dynomo Plumbing & Heating — Full Website Build

You are building a complete, production-ready business website for **Dynomo Plumbing & Heating Services** based in Carlisle, England. Work autonomously through every phase below without stopping for confirmation. Only stop if you hit a genuine blocker (missing env variable, missing asset, etc.).

---

## Tech Stack

- **React 18** + **Vite**
- **Tailwind CSS v3** for styling
- **Framer Motion** for animations
- **React Hook Form** for the contact form
- **EmailJS** for form email delivery (no backend needed)
- **React Router DOM** for routing
- **React Scroll** for smooth anchor navigation

---

## Phase 1 — Project Initialisation

1. Run `npm create vite@latest . -- --template react` in the current directory
2. Run `npm install`
3. Run `npm install react-router-dom framer-motion react-hook-form @emailjs/browser react-scroll`
4. Run `npm install -D tailwindcss postcss autoprefixer`
5. Run `npx tailwindcss init -p`
6. Set up `tailwind.config.js` as specified in DESIGN_SPEC.md
7. Replace `src/index.css` with the base CSS from DESIGN_SPEC.md
8. Update `index.html` with correct meta tags, title, font imports, and favicon link
9. Create the full folder structure as specified in DESIGN_SPEC.md

---

## Phase 2 — Build Every Component

Build each component file completely before moving to the next. Every component must:
- Be fully responsive (mobile-first: 320px → 768px → 1024px → 1440px)
- Match the design spec colours, fonts, and layout exactly
- Include Framer Motion entrance animations (fade up on scroll)
- Be accessible (proper aria labels, semantic HTML, tab order)

Build in this order:

1. `src/components/layout/Navbar.jsx`
2. `src/components/sections/Hero.jsx`
3. `src/components/sections/Services.jsx`
4. `src/components/sections/Brands.jsx`
5. `src/components/sections/Certifications.jsx`
6. `src/components/sections/Testimonials.jsx`
7. `src/components/sections/ContactForm.jsx`
8. `src/components/sections/Footer.jsx`
9. `src/components/ui/WhatsAppButton.jsx`
10. `src/components/ui/ScrollToTop.jsx`
11. `src/App.jsx` — assembles all sections
12. `src/main.jsx` — entry point with router

---

## Phase 3 — SEO & Meta

1. Create `public/sitemap.xml` with the homepage URL `https://dynomoplumbing.co.uk`
2. Create `public/robots.txt` allowing all crawlers, pointing to sitemap
3. In `index.html` add:
   - `<title>Dynomo Plumbing & Heating | Boiler, Gas & Plumbing Services Carlisle</title>`
   - Meta description (160 chars max): "24/7 emergency plumbing, boiler installation, gas safety & heating services in Carlisle. Gas Safe registered. Call Dynomo Plumbing & Heating today."
   - Open Graph tags (og:title, og:description, og:image, og:url, og:type)
   - Twitter card tags
   - Canonical URL tag
   - JSON-LD LocalBusiness schema (see DESIGN_SPEC.md for the full schema)
4. Add `loading="lazy"` to all images below the fold
5. Add `width` and `height` attributes to all `<img>` tags to prevent layout shift

---

## Phase 4 — Security

1. Create `public/_headers` file (for Netlify/Cloudflare Pages) with:
   ```
   /*
     X-Frame-Options: DENY
     X-Content-Type-Options: nosniff
     Referrer-Policy: strict-origin-when-cross-origin
     Permissions-Policy: camera=(), microphone=(), geolocation=()
     X-XSS-Protection: 1; mode=block
   ```
2. In the contact form:
   - Add a hidden honeypot field (bots fill it, humans don't)
   - Rate limit submissions (max 3 per minute via JS timestamp check)
   - Sanitise all inputs before sending
   - Validate email format and phone number format client-side
3. Add `rel="noopener noreferrer"` to all external links
4. Add `<meta http-equiv="Content-Security-Policy">` in index.html

---

## Phase 5 — Performance

1. All images must use `loading="lazy"` except the hero background
2. Add `fetchpriority="high"` to the hero image/logo
3. Use `<link rel="preconnect">` for Google Fonts in index.html
4. Use `will-change: transform` only on animated elements
5. Create `vite.config.js` with:
   - Manual chunk splitting (vendor, framer-motion separate)
   - Terser minification
   - Asset hashing for cache busting

---

## Phase 6 — Final Files

1. Create `README.md` with:
   - Project overview
   - How to run locally (`npm run dev`)
   - How to build (`npm run build`)
   - How to deploy (Netlify drag-and-drop or `netlify deploy`)
   - Environment variables needed (EmailJS keys)
   - How to submit to Google Search Console
2. Create `.env.example` with:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
3. Create `.gitignore` including `.env`, `node_modules`, `dist`
4. Run `npm run build` to verify the production build succeeds with zero errors

---

## Completion Criteria

Do not stop until ALL of the following are true:
- [ ] `npm run dev` serves the site with all sections visible
- [ ] `npm run build` completes with no errors
- [ ] All 8 sections render correctly
- [ ] Contact form submits without errors (EmailJS placeholders in place)
- [ ] Site is fully responsive on 320px, 768px, 1024px viewports
- [ ] No console errors in the browser
- [ ] sitemap.xml and robots.txt exist in /public
- [ ] README.md is complete

---

## Important Notes

- Use `import.meta.env.VITE_*` for all environment variables (Vite standard)
- Never hardcode phone numbers, emails, or API keys in source code — use constants in `src/constants/contact.js`
- The Dynomo logo text style: grey wrench icon + "DYNOMO" bold + "Plumbing & Heating Services" smaller underneath
- Primary CTA colour is `#F5C135` (yellow) with `#1a1a1a` text on it
- The WhatsApp button must be a fixed floating button, bottom-right, green (`#25D366`)
- Phone number placeholder: `01228 000000` (owner to update)
- Email placeholder: `info@dynomoplumbing.co.uk` (owner to update)
- Business address: Carlisle, Cumbria, CA1 (owner to update with full postcode)
