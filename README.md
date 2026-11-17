# PragyaaProp™ (प्रज्ञाप्रॉप)
### 100% Vastu-Certified Luxury Real Estate Platform

> **Live Production**: [https://pragyaaprop.vercel.app](https://pragyaaprop.vercel.app)  
> **Repository**: [https://github.com/Grimprogs/PrayagProgs](https://github.com/Grimprogs/PrayagProgs)  
> **Admin Portal**: [https://pragyaaprop.vercel.app/admin](https://pragyaaprop.vercel.app/admin)

---

## 🏛️ About PragyaaProp

**PragyaaProp** is India's premier architectural and Vedic real estate portal designed to bridge ancient Vastu Shastra principles with modern luxury residential living. Every listing undergoes an exhaustive 16-zone spatial energy audit, verified against true geographic North ($0.0^\circ$ calibration) and attested by CEPT civil architects, Vedic Jyotish Acharyas, and official RERA certifications.

---

## ✨ Key Features

1. **Vedic Hero Architecture & Skyscraper Centerpiece**:
   - Freestanding skyscraper centerpiece seamlessly integrated with warm `#fbf9f5` Vedic sand palette.
   - Dynamic floating spotlight card showcasing the top featured property with North Entrance and Jalnaya Water Alignment status.

2. **16-Zone Spatial Vastu Energy Audit**:
   - Superimposes ancient Mayamatam $22.5^\circ$ angular sectors over blueprints.
   - Evaluates Pancha Tattva Zones: Water (NE - Ishanya), Air (E - Surya / NW - Vayu), Fire (SE - Agni), Earth (SW - Nirriti), and unencumbered Brahmasthan.
   - 3 Harmony Tiers: *Inherently Aligned (9.0–10)*, *Functionally Balanced (6.5–8.9)*, *Remedy-Ready (5.0–6.4)*.

3. **Interactive Navigation & Megamenus**:
   - Rich hover megamenus for *Vastu Audit* (Pancha Tattva & Harmony tiers) and *How It Works* (4-Step Verification Workflow).
   - Strict stacking context hierarchy preventing layout clipping across all screen sizes.
   - Intelligent floating search bar with auto-detecting scroll awareness.

4. **Bidirectional City <-> State Auto-Linking Search**:
   - Selecting a city automatically updates and links its corresponding Indian state.
   - Selecting a state filters to its authentic municipal cities.

5. **Dynamic Admin Management Portal (`/admin`)**:
   - Real-time catalog management with instant localStorage synchronization.
   - Star toggle to mark any property as "Featured on Homepage".
   - Full CRUD: Add, edit, remove properties, and update 16-zone radar scores.

6. **Interactive Vastu Modals & Cryptographic PDF Ledger**:
   - Full-screen serialized 16-Zone Vastu Report with printable and downloadable PDF diagrams (`z-[9999]`).
   - Interactive Consultation modal with Vedic Astrology & Architectural guidance.
   - Demo Vastu Credits system with one-click top-up and instant unlock mechanisms.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (Turbopack, App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS
- **Icons**: Material Symbols Outlined, Font Awesome 6
- **Typography**: Playfair Display, Cinzel, Plus Jakarta Sans
- **Deployment**: Vercel Serverless Edge

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Grimprogs/PrayagProgs.git

# Navigate into project directory
cd PrayagProgs

# Install dependencies
npm install
```

### Running Locally

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
# Generate optimized production build
npm run build

# Start production server
npm run start
```

---

## 📂 Project Structure

```text
PrayagProgs/
├── src/
│   ├── app/
│   │   ├── page.tsx               # Homepage with Skyscraper centerpiece & Featured Grid
│   │   ├── layout.tsx             # Root layout with fonts, contexts & Toast
│   │   ├── admin/page.tsx         # Live Admin Portal with catalog manager & analytics
│   │   ├── about/page.tsx         # About Us & 4-Step Verification Guide
│   │   └── properties/
│   │       ├── page.tsx           # Catalog Explorer with multi-faceted filters
│   │       └── [slug]/            # Dynamic Property Detail page with 16-zone radar
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx         # Unified Global Header with hover megamenus
│   │   │   └── Footer.tsx         # Vedic styled footer with quick links & disclaimers
│   │   └── common/
│   │       ├── VastuReportPdfModal.tsx  # 16-Zone Chakra & serialized report
│   │       ├── VastuAuditModal.tsx      # Interactive 16-zone explorer
│   │       ├── ConsultationModal.tsx    # Expert booking popup
│   │       ├── ReportUnlockModal.tsx    # Credit unlock dialog
│   │       └── LoginModal.tsx           # Authentication modal
│   ├── context/
│   │   ├── PropertiesContext.tsx  # Dynamic catalog state with event dispatching
│   │   ├── CreditsContext.tsx     # Demo credit balance & unlock state
│   │   └── ToastContext.tsx       # Global toast notification alerts
│   ├── data/
│   │   ├── properties.ts          # Authentic Vastu verified property catalog
│   │   └── locations.ts           # Indian states, cities & verified localities
│   └── types/
│       └── index.ts               # Property, Radar, Zone & Review type definitions
├── public/
│   └── images/                    # Cutouts, facade photography & Vedic illustrations
├── docs/
│   └── stitch_designs/            # Original design wireframes & reference exports
└── package.json
```

---

## 📜 License

Private Repository © 2026 PragyaaProp Real Estate Technologies. All rights reserved.
