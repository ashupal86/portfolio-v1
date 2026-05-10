import { config } from "@keystatic/core";

// ── Import modular section schemas ─────────────────────────────────────────
// Each section has its own schema file in src/schemas/sections/
import { siteConfigSchema } from "./src/schemas/sections/siteConfig";
import { heroSchema } from "./src/schemas/sections/hero";
import { aboutSchema } from "./src/schemas/sections/about";
import { contactSchema } from "./src/schemas/sections/contact";
import { projectsSchema } from "./src/schemas/sections/projects";
import { postsSchema } from "./src/schemas/sections/posts";

// Helper: detect production vs local
const isDev = process.env.NODE_ENV === "development";

export default config({
  // ──────────────────────────────────────────────
  // STORAGE: local in dev, GitHub-backed in prod
  // ──────────────────────────────────────────────
  storage: isDev
    ? { kind: "local" }
    : {
      kind: "github",
      repo: {
        owner: process.env.NEXT_PUBLIC_GITHUB_OWNER ?? "ashupal86",
        name: process.env.NEXT_PUBLIC_GITHUB_REPO ?? "portfolio-redesing",
      },
    },

  // ──────────────────────────────────────────────
  // UI BRANDING
  // ──────────────────────────────────────────────
  ui: {
    brand: { name: "Ashu Portfolio CMS" },
  },

  // ──────────────────────────────────────────────
  // SINGLETONS — one editable document per section
  // ──────────────────────────────────────────────
  singletons: {
    siteConfig: siteConfigSchema,
    hero: heroSchema,
    about: aboutSchema,
    contact: contactSchema,
  },

  // ──────────────────────────────────────────────
  // COLLECTIONS — repeatable content items
  // ──────────────────────────────────────────────
  collections: {
    projects: projectsSchema,
    posts: postsSchema,
  },
});
