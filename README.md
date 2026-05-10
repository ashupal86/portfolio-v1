# ⚡ Developer Portfolio — Electric Scholar

A vibrant, Neo-Brutalism × Glassmorphism developer portfolio powered by **Next.js 14** (App Router) and **Keystatic CMS** for fully headless, Git-backed content management.

---

## 🎨 Design System

Fetched from [Stitch](https://stitch.withgoogle.com/projects/12016468266221348612).  
See [`design.md`](./design.md) for the complete specification.

| Attribute | Value |
|-----------|-------|
| Theme Name | Electric Scholar |
| Primary Color | Electric Blue `#0969DA` |
| Accent | Neon Pink `#FF007A` |
| Pop | Lime Green `#9DFF00` |
| Headlines | Epilogue (800) |
| Body | Plus Jakarta Sans |
| Labels/Code | Space Grotesk |

---

## 🚀 Tech Stack

| Layer | Package | Reason |
|-------|---------|--------|
| Framework | **Next.js 14** (App Router) | SSG/SSR, file-based routing, performance |
| Language | **TypeScript** | Type safety across the whole stack |
| Styling | **Vanilla CSS Modules** + CSS Variables | Design-token driven, no utility class bloat |
| Animation | **Framer Motion** | Production-grade micro-animations |
| Icons | **Lucide React** | Thick-stroke icons matching design spec |
| CMS | **Keystatic** | Free, Git-backed headless CMS with beautiful UI |
| Blog rendering | **next-mdx-remote** | MDX rendering from CMS markdown |
| Code highlighting | **Shiki** | Accurate syntax highlighting in blog posts |
| Fonts | **next/font** (Google Fonts) | Epilogue, Plus Jakarta Sans, Space Grotesk |
| SEO | **next-seo** | Meta tags, OG cards, schema.org |
| Form | **React Hook Form** + **Resend** | Contact form with email delivery |
| Analytics | **Vercel Analytics** | Privacy-friendly page analytics |

---

## 📁 Project Structure

```
portfolio-redesing/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (fonts, nav, footer)
│   │   ├── page.tsx            # Home page (Hero + About + Projects + Contact)
│   │   ├── about/page.tsx      # Full About page
│   │   ├── projects/page.tsx   # Projects listing
│   │   ├── blog/
│   │   │   ├── page.tsx        # Blog listing
│   │   │   └── [slug]/page.tsx # Individual blog post
│   │   ├── contact/page.tsx    # Contact page
│   │   └── keystatic/         # Keystatic CMS admin routes
│   ├── components/
│   │   ├── ui/                 # Atomic design system components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Chip.tsx
│   │   │   └── GlassNav.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── BlogSection.tsx
│   │   │   └── ContactSection.tsx
│   │   └── layout/
│   │       ├── Navbar.tsx
│   │       └── Footer.tsx
│   ├── styles/
│   │   ├── globals.css         # Design tokens + reset
│   │   └── components/         # CSS Modules per component
│   ├── content/                # Keystatic-managed content
│   │   ├── about/
│   │   ├── projects/
│   │   └── blog/
│   └── lib/
│       ├── keystatic.ts        # Keystatic config + reader
│       └── mdx.ts              # MDX rendering utilities
├── keystatic.config.ts         # CMS schema definition
├── next.config.ts
├── tsconfig.json
├── design.md
└── README.md
```

---

## 📝 Headless CMS — Keystatic

**Why Keystatic?**
- ✅ **Free** — no usage limits, no locked features
- ✅ **Git-backed** — content lives in your repo as Markdown/JSON files
- ✅ **Beautiful UI** — polished admin dashboard at `/keystatic`
- ✅ **No backend needed** — works with Next.js App Router out of the box
- ✅ **Full control** — edit any content: hero text, bio, projects, blog posts

### Editable Content via CMS

| Section | Content You Can Edit |
|---------|---------------------|
| **Site Config** | Name, title, SEO description, social links |
| **Hero** | Headline, subheadline, CTA button text/links, tagline |
| **About** | Bio paragraphs, skills list, resume link, profile photo |
| **Projects** | Title, description, tech stack, GitHub/live links, thumbnail |
| **Blog** | Posts (title, slug, date, cover image, MDX body, tags) |
| **Contact** | Section heading, email, form enabled/disabled |
| **Navigation** | Nav links, logo text |
| **Footer** | Social links, copyright text |

### Accessing the CMS
1. Run the dev server: `npm run dev`
2. Open `http://localhost:3000/keystatic`
3. Login with GitHub (or local auth in dev)
4. Edit anything — changes commit to your Git repo

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repo
git clone <your-repo-url>
cd portfolio-redesing

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.  
Open [http://localhost:3000/keystatic](http://localhost:3000/keystatic) to access the CMS.

### Build for Production

```bash
npm run build
npm run start
```

---

## 🎯 Pages

| Route | Page |
|-------|------|
| `/` | Home (Hero + Featured Projects + Blog Preview + Contact) |
| `/about` | Full About with skills and experience |
| `/projects` | All projects with filtering |
| `/blog` | Blog listing |
| `/blog/[slug]` | Individual post |
| `/contact` | Contact form |
| `/keystatic` | CMS admin panel |

---

## 🔧 Environment Variables

Create a `.env.local` file:

```env
# Required for Keystatic (GitHub mode in production)
KEYSTATIC_GITHUB_CLIENT_ID=
KEYSTATIC_GITHUB_CLIENT_SECRET=
KEYSTATIC_SECRET=

# Contact form (via Resend)
RESEND_API_KEY=

# Optional: Vercel Analytics
NEXT_PUBLIC_ANALYTICS=true
```

> In development, Keystatic runs in `local` mode — no GitHub credentials needed.

---

## 📦 Key NPM Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server (port 3000) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run type-check` | TypeScript type checking |
| `npm run lint` | ESLint |

---

## 🌐 Deployment

The easiest deployment is **Vercel** (zero-config Next.js):

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy — done!

---

## 📄 License

MIT — feel free to fork and customize.
