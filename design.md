# Design Specification — Developer Portfolio
> Source: Stitch Project `12016468266221348612` — "Vibrant Funky Portfolio"  
> Theme Name: **Electric Scholar**

---

## 1. Brand Identity

**Personality:** *The Playful Expert* — authoritative in content, irreverent in presentation.  
**Aesthetic Direction:** **Neo-Brutalism × Glassmorphism** — the structural clarity of an academic journal injected with neon-soaked energy and tactile depth.  
**Design Goal:** Move away from the stiff academic norm toward a modern, developer-centric experience that bridges information density and experimental digital art.

---

## 2. Color Palette

### Primary Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#0051ae` | Key actions, hyperlinks, brand anchors |
| `primary-container` | `#0969DA` | Button fills, highlights |
| `secondary` | `#b60055` | **Neon Pink** — hover states, call-outs |
| `secondary-container` | `#e4006c` | Strong accent fills |
| `tertiary` | `#385f00` | "New" tags, success states |
| `tertiary-container` | `#497a00` | Lime accent fills |

### Surface & Background Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `background` | `#f7f9ff` | Page background (cool grey tint) |
| `surface` | `#f7f9ff` | Default surface |
| `surface-container-lowest` | `#ffffff` | Content cards (pure white) |
| `surface-container` | `#eaeef6` | Secondary surfaces |
| `on-surface` | `#171c22` | Primary text |
| `on-surface-variant` | `#424753` | Secondary text |
| `outline` | `#727785` | Borders, dividers |
| `outline-variant` | `#c2c6d6` | Subtle borders |

### Override / Accent Palette (Funky Layer)
| Name | Hex |
|------|-----|
| Electric Blue | `#0969DA` |
| Neon Pink | `#FF007A` |
| Lime Green | `#9DFF00` |
| Deep Charcoal | `#24292F` |

### Gradient Spec
- **Hero gradient:** `135deg` from `#0969DA` → `#FF007A`
- **Text gradient:** Same angle, applied as `background-clip: text` on hero headlines
- Thin "top-border" gradients on cards use this same linear transition

---

## 3. Typography

### Font Families
| Role | Family | Personality |
|------|---------|-------------|
| Headlines | **Epilogue** | Geometric, bold, expressive |
| Body | **Plus Jakarta Sans** | Friendly, highly readable |
| Labels / Code | **Space Grotesk** | Technical, futuristic mono-feel |

### Type Scale
| Style | Family | Size | Weight | Line Height | Letter Spacing |
|-------|--------|------|--------|-------------|----------------|
| `headline-xl` | Epilogue | 4.5rem | 800 | 1.1 | -0.04em |
| `headline-lg` | Epilogue | 2.5rem | 700 | 1.2 | -0.02em |
| `headline-md` | Epilogue | 1.75rem | 600 | 1.3 | — |
| `body-lg` | Plus Jakarta Sans | 1.125rem | 400 | 1.6 | — |
| `body-md` | Plus Jakarta Sans | 1rem | 400 | 1.6 | — |
| `detail-mono` | Space Grotesk | 0.875rem | 500 | 1.5 | 0.02em |
| `label-caps` | Space Grotesk | 0.75rem | 700 | 1 | — |

> **Hero Headline Effect:** Occasionally apply "Outline" style or `text-stroke` for funky emphasis in hero sections.

---

## 4. Layout & Spacing

| Token | Value |
|-------|-------|
| `container-max` | 1100px |
| `gutter` | 24px |
| `margin-mobile` | 16px |
| `section-gap` | 80px |
| `spacing-unit` | 4px (8px baseline grid) |

### Grid Philosophy
- **12-column fixed grid** with 1100px max container
- **Asymmetry:** Staggered grid alignments for project galleries; slightly offset decorative background patterns
- **Horizontal banding:** News → Publications → Projects sections separated by large whitespace

---

## 5. Elevation & Depth

| Layer | Treatment |
|-------|-----------|
| Page background | `#f7f9ff` tinted |
| Content cards | Pure `#ffffff` |
| Nav / Widgets | Glassmorphism — `backdrop-filter: blur(12px)` |
| Shadows | **Electric Shadows** — Primary/Secondary tinted at 10–15% opacity |
| High-importance borders | 1px solid `#24292F` — "sticker" look |

> **Electric Shadow Formula:** `box-shadow: 0 8px 32px rgba(9, 105, 218, 0.12)` (blue); or `rgba(255, 0, 122, 0.12)` (pink) for secondary elements.

---

## 6. Shape Language — "Friendly Geometric"

| Element | Radius |
|---------|--------|
| Cards & containers | `0.5rem` (8px) |
| Buttons & tags | `9999px` (fully pill-shaped) |
| Small chips | `0.5rem` |

> **Background patterns:** Subtle dots, crosses, or diagonal lines used sparingly within section headers for texture.

---

## 7. Component Specifications

### Navigation Bar
- **Style:** Glassmorphism (`backdrop-blur: 12px`, `bg: rgba(247,249,255,0.8)`)
- **Logo:** Gradient text using Electric Blue → Neon Pink
- **Links:** Space Grotesk `label-caps` style
- **Active indicator:** Neon Pink underline or border
- **Sticky:** Yes, with subtle shadow on scroll

### Hero Section
- **Layout:** Split — text left, avatar/photo right (or centered on mobile)
- **Headline:** Epilogue 800 weight, gradient text effect (`#0969DA` → `#FF007A`)
- **Subheadline:** Plus Jakarta Sans, `on-surface-variant` color
- **CTA Buttons:** Primary (Neon Blue), Secondary (Ghost border)
- **Background decoration:** Subtle geometric dot-grid or diagonal line pattern

### About Section
- **Avatar:** Rounded circle with Electric Shadow glow ring
- **Bio:** Plus Jakarta Sans body-lg
- **Social Links:** Icon pills with hover lift effect
- **Skills/Chips:** Pill-shaped, tinted brand colors at 10% opacity

### Projects Section
- **Card Layout:** 2–3 column grid
- **Cards:** White surface, 1px `outline-variant` border
- **Hover State:** Border → Primary color, Electric Shadow appears, slight scale(1.02)
- **Tech Stack Tags:** `detail-mono` font, Lime tinted pills
- **CTA:** Ghost button per card

### Blog Section
- **Layout:** List or 2-column grid
- **Entry:** Date in Lime Green `label-caps`, title in Epilogue `headline-md`, excerpt in body-md
- **Dividers:** 1px `outline-variant` at 50% opacity
- **CMS-Powered:** All content fetched from Headless CMS

### Contact Section
- **Form:** Clean 2px bordered inputs
- **Focus State:** Neon Electric Blue glow (`box-shadow: 0 0 0 3px rgba(9,105,218,0.25)`)
- **Submit Button:** Primary pill button with lift hover

### Footer
- **Style:** Dark surface (`inverse-surface: #2c3137`), light text
- **Content:** Navigation links, social icons, copyright

---

## 8. Micro-Animation & Interaction

| Interaction | Effect |
|-------------|--------|
| Page load | Fade-in + slight translateY(20px) → 0 per section |
| Card hover | `scale(1.02)` + Electric Shadow + border color change |
| Button hover | 4px offset shadow "Lift" effect |
| Nav scroll | Glassmorphism shadow intensifies |
| Skill chip hover | Background opacity increases to 20% |
| Blog entry hover | Left border appears in Neon Pink |

### Timing
- All transitions: `0.2s–0.3s ease`
- Page entry animations: `0.4s–0.6s ease-out` with stagger

---

## 9. Screens Extracted from Stitch

| Screen | Title | Dimensions |
|--------|-------|------------|
| Home | "Home \| BMW M Matte Portfolio Refined" | 2560×11106 |
| About | "About \| You R. Name" | 2560×3358 |
| About (Alt) | "About \| Matte Engineering Portfolio" | 2560×3136 |
| Projects | "Projects \| Matte Engineering Portfolio" | 2560×2048 |
| Blog | "Blog \| Matte Engineering Portfolio" | 2560×2504 |

### Stitch Screenshot References
- **Home:** `https://lh3.googleusercontent.com/aida/ADBb0ujtIKRHse...`
- **About:** `https://lh3.googleusercontent.com/aida/ADBb0ugVpTNHXu...`
- **Projects:** `https://lh3.googleusercontent.com/aida/ADBb0uiCfdRZme...`
- **Blog:** `https://lh3.googleusercontent.com/aida/ADBb0ujCdcnKu6...`

---

## 10. Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| `< 640px` | Single column, `margin-mobile: 16px`, hamburger nav |
| `640px–1024px` | 2-column grid where applicable |
| `> 1024px` | Full 12-col grid, max 1100px container |

---

## 11. Dark Mode (Future / Optional)
- `inverse-surface: #2c3137` as dark bg
- `inverse-on-surface: #edf1f9` as light text on dark
- Glassmorphism uses `rgba(44,49,55,0.8)` base
