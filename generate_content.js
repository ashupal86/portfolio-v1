const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'content');
const projectsDir = path.join(contentDir, 'projects');

if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir, { recursive: true });
}

// Write Site Config
const siteConfig = `name: ASHISH PAL
title: ASHISH PAL — Backend-Focused Developer | DevOps Exposure
tagline: Backend API development, Docker containerization, and Linux-first workflows.
description: >-
  Self-taught developer with 3+ years of hands-on learning. Strong in Python
  backend development (FastAPI, Flask), containerization with Docker, and
  Linux-based workflows. Final-year B.Tech (CSE) student at NIET with practical
  DevOps internship experience.
email: palbro86@gmail.com
githubUrl: https://github.com/ashupal86
linkedinUrl: https://linkedin.com/in/ashish-pal-5725a6257
twitterUrl: ""
resumeUrl: /resume.pdf
navLinks:
  - label: WORK
    href: '#projects'
  - label: JOURNAL
    href: /blog
  - label: STASH
    href: /stash
  - label: ABOUT
    href: '#about'
  - label: CONTACT
    href: '#contact'
footerText: © 2026 ASHU. ALL RIGHTS RESERVED.
`;
fs.writeFileSync(path.join(contentDir, 'site-config.yaml'), siteConfig);

// Write Hero
const hero = `name: ASHISH PAL
headline: Full-Stack Developer & DevOps Engineer
roles:
  - Backend-Focused Developer
  - DevOps Exposure
  - FastAPI & Flask
taglines:
  - Building Backend APIs
  - Docker-based Containerization
  - Linux-first Workflow
  - CI/CD & Cloud Basics
`;
fs.writeFileSync(path.join(contentDir, 'hero.yaml'), hero);

// Write About
const about = `heading: Experience & Skills
bio:
  discriminant: document
  value:
    - type: paragraph
      children:
        - text: >-
            Self-taught developer with 3+ years of hands-on learning. Strong in Python backend development (FastAPI, Flask), containerization with Docker, and Linux-based workflows. Final-year B.Tech (CSE) student at NIET with practical DevOps internship experience.
profileImage: /pfp.png
experience:
  - company: Springer Capital
    role: DevOps Intern
    period: Sep 2025 – 1 Jan 2026
    description: >-
      Worked under supervision on DevOps and deployment workflows, focusing on containerization, CI/CD assistance, and cloud exposure. Containerized applications using Docker and Docker Compose, assisted in GitHub Actions CI/CD pipelines, and gained hands-on exposure to AWS and Azure.
    location: Remote | Part Time
  - company: Ekume Club, NIET
    role: Technical Head
    period: 2024 – 2025
    description: >-
      Leading technical initiatives, mentoring students, and managing technical execution for college-level events and workshops. Organized coding competitions and conducted hands-on workshops on Docker and web deployment.
    location: Greater Noida, UP
skills:
  - category: Languages
    items:
      - Python
      - Java
      - JavaScript
      - HTML / CSS
      - SQL
  - category: Frameworks
    items:
      - FastAPI
      - Flask
      - React
  - category: DevOps
    items:
      - Docker
      - Docker Compose
      - GitHub Actions
      - Terraform
  - category: Cloud & Tools
    items:
      - AWS
      - Google Cloud
      - Azure
      - Vercel
      - Git
      - Linux
awards:
  - title: Web Showdown Winner
    description: NIET
    year: "2024"
  - title: Web Wizard Winner
    description: NIET
    year: "2024"
  - title: BharatXR Recognition
    description: BharatXR
    year: "2024"
education:
  - degree: B.Tech in Computer Science Engineering
    institution: Noida Institute of Engineering and Technology (NIET)
    location: Greater Noida, Uttar Pradesh
    status: Final Year (Pursuing)
    cgpa: 6.5 / 10
certifications:
  - title: Python (Basic)
    issuer: HackerRank
    year: "2024"
  - title: Java (Basic)
    issuer: HackerRank
    year: "2024"
  - title: Google Cloud Computing Foundations
    issuer: Google Cloud
    year: "2024"
currentlyLearning:
  - Advanced Docker
  - FastAPI Best Practices
  - Microservices Architecture
  - CI/CD Pipelines
  - AWS DevOps Concepts
coreStrengths:
  - Backend API development using FastAPI & Flask
  - Docker-based containerization and local dev environments
  - Linux-first development workflow
  - Practical DevOps exposure (CI/CD, cloud basics)
  - Building real-world projects for small business use cases
`;
fs.writeFileSync(path.join(contentDir, 'about.yaml'), about);

// Projects
const projects = [
  {
    id: 'graminstore',
    title: 'GraminStore',
    description: 'A comprehensive quick commerce and merchant management platform designed for modern retail.',
    technologies: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'Redis', 'JWT', 'WebSockets'],
    featured: true,
    order: 1,
    githubUrl: 'https://github.com/ashupal86',
    content: 'A comprehensive quick commerce and merchant management platform featuring a full-stack architecture with a robust FastAPI backend and a responsive React 18 frontend. Includes a native-like PWA for mobile users, internationalization support via i18next, and a sophisticated merchant dashboard for real-time management. Performance is optimized using Redis for caching and PostgreSQL for reliable data storage.'
  },
  {
    id: 'safe-query-ai',
    title: 'Safe Query AI',
    description: 'AI-powered assistant that translates natural language queries into secure SQL commands.',
    technologies: ['FastAPI', 'PostgreSQL', 'React', 'Node.js', 'AI Safety Agents', 'Python'],
    featured: true,
    order: 2,
    githubUrl: 'https://github.com/ashupal86',
    content: 'An AI-powered assistant that translates natural language queries into secure SQL commands. It features integrated security layers that validate every generated query against database schemas and user permissions, ensuring that non-technical users can interact with complex data without compromising safety or integrity.'
  },
  {
    id: 'bot-web',
    title: 'bot-web',
    description: 'Automated deployment framework specifically designed for Docker-based environments.',
    technologies: ['Python', 'Docker', 'Shell Scripting', 'Container Management'],
    featured: true,
    order: 3,
    githubUrl: 'https://github.com/ashupal86/bot-web',
    content: 'An automated deployment framework specifically designed for Docker-based environments. It simplifies the orchestration of containerized applications by providing a streamlined workflow for managing, deploying, and monitoring containers. Ideal for developers looking to automate repetitive DevOps tasks and ensure consistent deployment environments.'
  },
  {
    id: 'facta-ai',
    title: 'Facta-AI',
    description: 'AI-driven fact-checking tool designed to verify claims using automated AI models.',
    technologies: ['TypeScript', 'AI Models', 'Web Scraping', 'React'],
    featured: true,
    order: 4,
    githubUrl: 'https://github.com/ashupal86',
    content: 'An innovative AI-driven fact-checking tool built with TypeScript. It verifies claims and information using automated AI models, providing a layer of trust and verification for digital content in the age of misinformation.'
  },
  {
    id: 'omari',
    title: 'Omari',
    description: 'CLI-based post-installation setup automator for Linux distributions.',
    technologies: ['Bash', 'Python', 'Linux Automation'],
    featured: false,
    order: 5,
    githubUrl: 'https://github.com/ashupal86/omari',
    content: 'A CLI-based post-installation setup automator for Linux distributions. It streamlines the installation of essential applications and system configurations immediately after a fresh OS install, making the "hop" to a new distro seamless and efficient.'
  },
  {
    id: 'aicoamic',
    title: 'AiCoamic',
    description: 'AI-powered comic generator creating visual stories from text descriptions.',
    technologies: ['Python', 'Generative AI', 'Stable Diffusion', 'React'],
    featured: false,
    order: 6,
    githubUrl: 'https://github.com/ashupal86',
    content: 'An innovative AI-powered comic generator that uses machine learning models to create visual stories from text descriptions. It democratizes comic creation by allowing anyone to visualize their narratives without needing artistic skills.'
  },
  {
    id: 'notes-api',
    title: 'Notes-api',
    description: 'Lightweight and efficient RESTful API for note-taking and synchronization.',
    technologies: ['Flask', 'Flask-Session', 'SQLite', 'Jinja2', 'RESTful API'],
    featured: false,
    order: 7,
    githubUrl: 'https://github.com/ashupal86/Notes-api',
    content: 'A lightweight and efficient RESTful API for note-taking and synchronization. It provides a clean interface for CRUD operations, user-specific data isolation through session management, and a focus on backend simplicity. Serves as a high-performance template for modular backend services.'
  }
];

projects.forEach(p => {
  const yaml = `title: ${p.title}
description: >-
  ${p.description}
longDescription:
  discriminant: document
  value:
    - type: paragraph
      children:
        - text: >-
            ${p.content}
coverImage: null
techStack:
${p.technologies.map(t => `  - ${t}`).join('\n')}
githubUrl: ${p.githubUrl}
liveUrl: ""
featured: ${p.featured}
status: completed
order: ${p.order}
`;
  fs.writeFileSync(path.join(projectsDir, `${p.id}.yaml`), yaml);
});

console.log('Successfully generated all enriched projects and site content.');
