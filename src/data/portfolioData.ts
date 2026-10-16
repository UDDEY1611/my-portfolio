export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  image: string;
  secondaryImage?: string;
  technologies: string[];
  keyFeatures: string[];
  githubUrl?: string;
  isRepoConfigured: boolean;
  liveUrl?: string;
  featured: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; level: string }[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  department: string;
  period: string;
  location: string;
  details: string[];
}

export interface MilestoneItem {
  year: string;
  title: string;
  role: string;
  description: string;
  tags: string[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Uday Kumar",
    shortName: "Uday",
    wordmark: "UDAY KUMAR",
    title: "Developer & Creative Technologist",
    positioning: "Full-Stack Development • Applied AI Systems • Modern Web Experiences",
    headline: "I Build Digital Experiences.",
    subHeadline: "Developer. Creative Thinker. Problem Solver.",
    aboutHeading: "A Little About Me",
    bio: "I'm Uday Kumar, a developer interested in building useful, interactive, and visually engaging digital experiences. I enjoy turning ideas into working projects and exploring modern web technologies.",
    extendedBio: "Currently pursuing B.Tech in Computer Science & Engineering at Vaagdevi Institute of Technology and Science, Proddatur. My practical work centers on enterprise Java Spring Boot services, applied AI pipelines with RAG & vector retrieval, and interactive user interfaces using modern web technologies.",
    photo: "/assets/uday-kumar-profile.png",
    photoFallback: "/assets/uday-kumar-profile.jpg",
    email: "uddeykoamer1611@gmail.com",
    github: "https://github.com/udaykumar1611",
    linkedin: "https://www.linkedin.com/in/uday-kumar",
    location: "Andhra Pradesh, India",
    availability: "Available for internships, technical roles & creative engineering projects",
    resumeUrl: "#resume-modal",
  },

  // Grounded, factual profile indicators
  stats: [
    { label: "Degree Program", value: "B.Tech CSE" },
    { label: "Core Projects", value: "4 Systems" },
    { label: "Focus Domains", value: "Full Stack & AI" },
    { label: "Academic Institution", value: "VITS Proddatur" },
  ],

  projects: [
    {
      id: "personax",
      title: "PersonaX — AI Digital Twin Platform",
      subtitle: "Your Life + Your Data + AI = Your Digital Twin",
      category: "Full Stack & AI Systems",
      description: "An AI Digital Twin platform designed to mirror personal knowledge, professional background, and conversational voice. Architected with Spring Boot, React, Vector DB for RAG, real-time Server-Sent Events (SSE), and safety guardrails.",
      image: "/assets/projects/personax_infographic.png",
      technologies: ["Java", "Spring Boot", "React.js", "PostgreSQL", "RAG / Vector DB", "OpenAI / Gemini", "SSE & WebSockets", "Docker"],
      keyFeatures: [
        "Dual operational modes: Presentation Mode for recruiters and Companion Mode for personal learning",
        "Dynamic persona engine configuring tone, verbosity, formality, and humor levels",
        "RAG knowledge retrieval grounding conversations in user-provided documents",
        "Security guardrails protecting private credentials and preventing hallucination",
        "Real-time token streaming using Server-Sent Events (SSE) and reactive UI"
      ],
      githubUrl: "https://github.com/udaykumar1611/personax-ai-digital-twin",
      isRepoConfigured: true,
      liveUrl: undefined,
      featured: true,
    },
    {
      id: "bsds",
      title: "BSDS — Business Semantic Data System",
      subtitle: "Toward AI Agent-Assisted Analytics & Semantic Modeling",
      category: "Data Systems & AI Agents",
      description: "An institutional research & engineering project on semantic-centric data architecture presented at VITS. Unifies fragmented relational databases into a business semantic layer, using AI agents to assist non-technical stakeholders in natural-language data extraction.",
      image: "/assets/projects/bsds_semantic_bi.png",
      secondaryImage: "/assets/projects/bsds_architecture.png",
      technologies: ["Python", "Pandas", "SQL", "Knowledge Graphs", "LLM APIs", "FastAPI", "Semantic Modeling"],
      keyFeatures: [
        "Business Semantic Layer connecting Customers, Products, Orders, and Subscriptions",
        "AI agent natural language querying to simplify data retrieval",
        "Knowledge graph mapping eliminating redundant pipeline development",
        "Role-based exploratory vs production query workflows"
      ],
      githubUrl: "https://github.com/udaykumar1611/business-semantic-data-system",
      isRepoConfigured: true,
      liveUrl: undefined,
      featured: true,
    },
    {
      id: "snack-city-pos",
      title: "Snack City POS — Commercial Billing System",
      subtitle: "Fast-Food Point-of-Sale with ESC/POS Thermal Printing Server",
      category: "Full Stack & Commercial Software",
      description: "A practical point-of-sale and kitchen order ticketing application developed for fast-food operations ('Snack City'). Features fast touchscreen checkout, menu customization, local ESC/POS thermal receipt printing, and daily reconciliation.",
      image: "/assets/projects/snack_city_pos.jpg",
      secondaryImage: "/assets/projects/snack_city_logo.png",
      technologies: ["Python", "FastAPI", "SQLite / SQLAlchemy", "React Client", "ESC/POS Thermal Printing", "Tailwind CSS"],
      keyFeatures: [
        "Cashier order entry interface designed for quick customer turnover",
        "Direct thermal receipt and Kitchen Order Ticket (KOT) printing server",
        "Dynamic menu pricing, combo packs, and inventory availability toggle",
        "Daily sales reconciliation and database backup scripts"
      ],
      githubUrl: "https://github.com/udaykumar1611/snack-city-billing-system",
      isRepoConfigured: true,
      liveUrl: undefined,
      featured: true,
    },
    {
      id: "resume-shortlister",
      title: "AI Resume Shortlister & Talent Screener",
      subtitle: "Automated Resume Parsing & Skill Extraction Engine",
      category: "Machine Learning & NLP",
      description: "A talent screening tool that ingests resumes in bulk, extracts candidate competencies, and scores candidates against job requisitions using natural language processing and semantic similarity.",
      image: "/assets/projects/personax_infographic.png",
      technologies: ["Python", "Flask", "NLP / Spacy", "Scikit-Learn", "Pandas", "HTML5 / CSS3"],
      keyFeatures: [
        "Batch resume processing across PDF, DOCX, and text formats",
        "Automated keyword and competency extraction for technical skill sets",
        "Cosine similarity matching against job descriptions with CSV candidate rankings"
      ],
      githubUrl: "https://github.com/udaykumar1611/ai-resume-shortlister",
      isRepoConfigured: true,
      liveUrl: undefined,
      featured: false,
    }
  ] as Project[],

  // Honest, verified skills without exaggerated mastery claims
  skills: [
    {
      title: "Programming Languages",
      description: "Core languages used in coursework, backend systems, and projects",
      skills: [
        { name: "Java", level: "Proficient" },
        { name: "Python", level: "Proficient" },
        { name: "JavaScript (ES6+)", level: "Proficient" },
        { name: "TypeScript", level: "Working Knowledge" },
        { name: "SQL", level: "Proficient" },
        { name: "HTML5 & Modern CSS", level: "Proficient" }
      ]
    },
    {
      title: "Frontend & Creative Tech",
      description: "Responsive web interfaces, interactive components, and 3D graphics",
      skills: [
        { name: "React.js", level: "Proficient" },
        { name: "Tailwind CSS", level: "Proficient" },
        { name: "Three.js / WebGL", level: "Working Knowledge" },
        { name: "React Three Fiber & Drei", level: "Working Knowledge" },
        { name: "GSAP & ScrollTrigger", level: "Working Knowledge" },
        { name: "Vite", level: "Proficient" }
      ]
    },
    {
      title: "Backend & Systems",
      description: "Server architecture, RESTful services, and real-time streaming",
      skills: [
        { name: "Spring Boot", level: "Proficient" },
        { name: "FastAPI", level: "Proficient" },
        { name: "RESTful API Design", level: "Proficient" },
        { name: "WebSockets & SSE", level: "Practical Experience" },
        { name: "Node.js & Express", level: "Working Knowledge" },
        { name: "Flask", level: "Working Knowledge" }
      ]
    },
    {
      title: "Databases & Storage",
      description: "Relational modeling, schema migrations, and vector stores",
      skills: [
        { name: "PostgreSQL", level: "Proficient" },
        { name: "SQLite", level: "Proficient" },
        { name: "Vector Databases (RAG)", level: "Practical Experience" },
        { name: "Hibernate / JPA", level: "Working Knowledge" },
        { name: "SQLAlchemy", level: "Working Knowledge" }
      ]
    },
    {
      title: "AI & Modern Architectures",
      description: "Applied generative AI, RAG knowledge retrieval, and agent flows",
      skills: [
        { name: "RAG Architecture", level: "Practical Experience" },
        { name: "LLM APIs (OpenAI / Gemini)", level: "Proficient" },
        { name: "Prompt Engineering", level: "Proficient" },
        { name: "AI Agent Workflows", level: "Practical Experience" },
        { name: "Semantic Data Modeling", level: "Practical Experience" }
      ]
    },
    {
      title: "Developer Tools & DevOps",
      description: "Version control, build environments, and developer workflows",
      skills: [
        { name: "Git & GitHub", level: "Proficient" },
        { name: "Docker", level: "Working Knowledge" },
        { name: "Postman API Testing", level: "Proficient" },
        { name: "Maven", level: "Working Knowledge" },
        { name: "VS Code & Terminal", level: "Proficient" }
      ]
    }
  ] as SkillCategory[],

  education: [
    {
      institution: "Vaagdevi Institute of Technology and Science (VITS)",
      degree: "Bachelor of Technology (B.Tech)",
      department: "Computer Science and Engineering (CSE)",
      period: "2023 – Present",
      location: "Proddatur, Andhra Pradesh",
      details: [
        "Specializing in Computer Science & Engineering with core coursework in Data Structures, Database Systems, Object-Oriented Software Design, and Operating Systems.",
        "Author & Presenter of Capstone Review: Toward Data Systems That Are Business Semantic-Centric and AI Agents-Assisted (BSDS).",
        "Lead Developer on PersonaX AI Digital Twin research platform."
      ]
    }
  ] as EducationItem[],

  milestones: [
    {
      year: "2026",
      title: "PersonaX AI Digital Twin Platform",
      role: "System Architect & Lead Developer",
      description: "Engineered the end-to-end PersonaX architecture with Spring Boot, Vector DB, RAG retrieval, and real-time SSE streaming.",
      tags: ["Spring Boot", "RAG", "AI Agents", "React"]
    },
    {
      year: "2026",
      title: "BSDS Research Review & Prototype",
      role: "Lead Project Associate",
      description: "Presented the Business Semantic-Centric Data System at Vaagdevi Institute of Technology and Science, demonstrating AI agent query routing.",
      tags: ["Semantic Data", "Knowledge Graphs", "AI Analytics"]
    },
    {
      year: "2026",
      title: "Snack City Commercial POS",
      role: "Full-Stack Engineer",
      description: "Developed and deployed a commercial fast-food billing application with real-time receipt printing server and menu operations.",
      tags: ["FastAPI", "SQLite", "ESC/POS", "React"]
    }
  ] as MilestoneItem[]
};
