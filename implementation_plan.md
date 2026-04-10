# Implementation Plan - Pakistan-HIVSolutions

Building a premium, comprehensive HIV education, care access, and advocacy platform tailored for Pakistan. The site will be static (HTML/CSS/JS) and hosted on GitHub Pages.

## User Review Required

> [!IMPORTANT]
> **Data Volume**: The request specifies 30+ articles and 130+ FAQs. I will implement a JSON-driven architecture to manage this content efficiently. I will populate the system with core validated content and provide a structure for the full volume.
> **Emoji Policy**: I will strictly use SVG icons (Lucide/Heroicons style) and avoid all emojis to maintain a professional, shame-free aesthetic.
> **Visuals**: The `readme-banner.png` will be used as the majestic hero background.

## Proposed Changes

### Core UI & Design System

#### [NEW] [index.css](file:///c:/Users/HOME/Desktop/Pakistan-HIVSolutions/css/index.css)
- Implement a sophisticated CSS variable-based design system.
- Colors: Deep Midnight Navy (#0f172a), Crimson Accents (#dc2626), Slate Grays, and Gold highlights.
- Typography: System-ui/Inter/Outfit stack for a premium feel.
- Glassmorphism effects for cards and navigation.

#### [NEW] [icons.js](file:///c:/Users/HOME/Desktop/Pakistan-HIVSolutions/js/icons.js)
- A utility to inject SVG icons into the DOM, ensuring no emojis are used.

---

### Page Structure

#### [NEW] [index.html](file:///c:/Users/HOME/Desktop/Pakistan-HIVSolutions/index.html)
- **Hero Section**: `readme-banner.png` background with overlay and "Pakistan-HIVSolutions" branding.
- **Quick Links**: 4-6 high-impact cards (Education, Locator, FAQ, Advocacy).
- **"Just Diagnosed?" Panel**: Immediate guidance section with empathetic copy.
- **Featured Articles**: A dynamic carousel (pure JS).

#### [NEW] [education.html](file:///c:/Users/HOME/Desktop/Pakistan-HIVSolutions/pages/education.html)
- Category-based hub (10 categories: Basics, Testing, ART, Pregnancy, Youth, etc.).
- Search bar for quick article lookups.

#### [NEW] [locator.html](file:///c:/Users/HOME/Desktop/Pakistan-HIVSolutions/pages/locator.html)
- Filterable list/map interface for 50+ locations.
- Filters: Province (Punjab, Sindh, KPK, Balochistan, Islamabad), Service Type (Testing, ART, NGO).

#### [NEW] [faq.html](file:///c:/Users/HOME/Desktop/Pakistan-HIVSolutions/pages/faq.html)
- Accordion interface for 130+ questions.
- Real-time search/filter.

#### [NEW] [advocacy.html](file:///c:/Users/HOME/Desktop/Pakistan-HIVSolutions/pages/advocacy.html)
#### [NEW] [resources.html](file:///c:/Users/HOME/Desktop/Pakistan-HIVSolutions/pages/resources.html)

---

### Data Layers

#### [NEW] [faqs.json](file:///c:/Users/HOME/Desktop/Pakistan-HIVSolutions/data/faqs.json)
- Structured storage for the 130+ questions.

#### [NEW] [locations.json](file:///c:/Users/HOME/Desktop/Pakistan-HIVSolutions/data/locations.json)
- 50+ healthcare facilities in Pakistan with address, city, and services.

---

## Open Questions

> [!QUESTION]
> Do you have specific contact lists or article drafts you would like me to use, or should I generate these based on National AIDS Control Program (NACP) guidelines?
> Should the "Care Locator" include a map (requires API key like Google Maps/Leaflet) or a high-quality filterable list?

## Verification Plan

### Automated Tests
- Script to verify "Emoji-Free" codebase.
- JSON schema validation for FAQ and Locations.

### Manual Verification
- Visual audit of Hero section with `readme-banner.png`.
- Interactive test of FAQ search and Accordion.
- Mobile responsiveness check (Breakpoints: 320px, 768px, 1280px).
