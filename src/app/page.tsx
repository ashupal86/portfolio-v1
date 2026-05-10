import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import BlogSection from '@/components/sections/BlogSection';
import ContactSection from '@/components/sections/ContactSection';
import { getProjects, getHero, getAbout, getSiteConfig, getPosts } from '@/lib/keystatic';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const cfg = await getSiteConfig();
    if (cfg) return { title: cfg.title, description: cfg.description ?? undefined };
  } catch { /* fallback */ }
  return {
    title: 'Ashish Pal — Full-Stack Developer & DevOps Engineer',
    description: 'Portfolio of Ashish Pal — Full-Stack Developer, DevOps Engineer & UI Architect.',
  };
}

export default async function HomePage() {
  // ── Fetch all CMS data in parallel ─────────────────────────────────────────
  const [hero, about, projectsData, postsData, siteConfig] = await Promise.allSettled([
    getHero(),
    getAbout(),
    getProjects(),
    getPosts(),
    getSiteConfig(),
  ]);

  // ── Hero ───────────────────────────────────────────────────────────────────
  const heroEntry   = hero.status === 'fulfilled' ? hero.value : null;
  const heroRoles   = (heroEntry?.roles?.length)    ? [...heroEntry.roles]    : undefined;
  const heroTaglines = (heroEntry?.taglines?.length) ? [...heroEntry.taglines] : undefined;

  // ── About data ─────────────────────────────────────────────────────────────
  const aboutData = (about.status === 'fulfilled' && about.value)
    ? {
        experience: about.value.experience?.map(e => ({
          role: e.role,
          company: e.company,
          date: e.period,
          description: e.description,
        })) ?? [],
        skills: about.value.skills?.map(s => ({
          category: s.category,
          items: [...s.items],
        })) ?? [],
        education: about.value.education?.map(e => ({
          degree: e.degree,
          institution: e.institution,
          location: e.location,
          status: e.status,
          cgpa: e.cgpa,
        })) ?? [],
        certifications: about.value.certifications?.map(c => ({
          title: c.title,
          issuer: c.issuer,
          year: c.year,
        })) ?? [],
        currentlyLearning: about.value.currentlyLearning ? [...about.value.currentlyLearning] : [],
        coreStrengths: about.value.coreStrengths ? [...about.value.coreStrengths] : [],
        funFact: about.value.funFact ?? '',
      }
    : null;

  // ── Projects ───────────────────────────────────────────────────────────────
  let projects: { slug: string; title: string; description: string; category: string; image: string | undefined }[] = [];
  if (projectsData.status === 'fulfilled' && projectsData.value.length > 0) {
    projects = projectsData.value.map(p => ({
      slug:        p.slug,
      title:       p.entry.title,
      description: p.entry.description,
      category:    p.entry.techStack?.join(' · ') || 'Project',
      image:       (p.entry.coverImage as string | null) || undefined,
    }));
  }

  // ── Blog posts ─────────────────────────────────────────────────────────────
  let posts: { slug: string; title: string; date: string; readTime: string; excerpt: string }[] = [];
  if (postsData.status === 'fulfilled' && postsData.value.length > 0) {
    posts = postsData.value.map(p => ({
      slug:     p.slug,
      title:    p.entry.title,
      date:     p.entry.publishedDate ?? '',
      readTime: `${(p.entry as unknown as { readTimeMinutes?: number }).readTimeMinutes ?? Math.ceil((p.entry.excerpt?.split(' ').length ?? 100) / 200)} MIN`,
      excerpt:  p.entry.excerpt ?? '',
    }));
  }

  // ── Site config ────────────────────────────────────────────────────────────
  const cfg = siteConfig.status === 'fulfilled' ? siteConfig.value : null;

  return (
    <>
      <HeroSection 
        roles={heroRoles} 
        taglines={heroTaglines} 
        name={cfg?.name || 'ASHU'}
        formalIntro={cfg?.title || 'ASHISH PAL'}
      />
      <AboutSection data={aboutData} />
      <ProjectsSection projects={projects} />
      <BlogSection posts={posts} />
      <ContactSection
        siteConfig={{
          email:       cfg?.email       ?? 'palbro86@gmail.com',
          githubUrl:   cfg?.githubUrl   ?? 'https://github.com/ashupal86',
          linkedinUrl: cfg?.linkedinUrl ?? 'https://linkedin.com/in/ashupal86',
        }}
      />
    </>
  );
}
