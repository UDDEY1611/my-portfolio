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
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; level?: string; icon?: string }[];
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
    positioning: "Full-Stack Engineer • AI Agent Systems • Interactive 3D Web",
    headline: "I Build Digital Experiences.",
    subHeadline: "Developer. Creative Thinker. Problem Solver.",
    aboutHeading: "A Little About Me",
    bio: "I'm Uday Kumar, a developer interested in building useful, interactive, and visually engaging digital experiences. I enjoy turning ideas into working projects and exploring modern web technologies.",
    extendedBio: "Based in Andhra Pradesh, I focus on building robust software architectures—spanning enterprise Java Spring Boot backends, intelligent AI agent workflows with RAG, and immersive interactive web experiences using React, Three.js, and modern graphics pipelines.",
    photo: "/assets/uday-kumar-profile.png",
    photoFallback: "/assets/uday-kumar-profile.jpg",
    email: "uddeykoamer1611@gmail.com",
    github: "https://github.com/udaykumar1611",
    linkedin: "https://www.linkedin.com/in/uday-kumar",
    location: "Andhra Pradesh, India",
    availability: "Available for internships, full-time roles & innovative collaborations",
    resumeUrl: "#resume-modal",
  },

  stats: [
    { label: "Core Projects Built", value: "4+" },
    { label: "Tech Stack Mastery", value: "15+" },
    { label: "System Domains", value: "AI • POS • Web" },
    { label: "Dedication", value: "100%" },
  ],

  projects: [
    {
      id: "personax",
      title: "PersonaX — AI Digital Twin Platform",
      subtitle: "Your Life + Your Data + AI = Your Digital Twin",
      category: "Full Stack & AI Systems",
      description: "A comprehensive AI Digital Twin platform designed to mirror personal knowledge, professional accomplishments, and communication voice. Engineered with Spring Boot, React, Vector DB for RAG, real-time Server-Sent Events (SSE), and strict guardrails.",
      image: "/assets/projects/personax_infographic.png",
      technologies: ["Java", "Spring Boot", "React.js", "PostgreSQL", "RAG / Vector DB", "OpenAI / Gemini", "SSE & WebSockets", "Docker"],
      keyFeatures: [
        "Dual operational modes: Presentation Mode for recruiters and Companion Mode for personal mentoring",
        "Dynamic persona engine configuring tone, verbosity, formality, and humor levels",
        "RAG knowledge retrieval grounding conversations in verified user documents",
        "Strict security guardrails preventing hallucination and protecting private credentials",
        "Real-time token streaming using Server-Sent Events (SSE) and responsive UI"
      ],
      githubUrl: "https://github.com/udaykumar1611/personax-ai-digital-twin",
      liveUrl: undefined,
      featured: true,
    },
    {
      id: "bsds",
      title: "BSDS — Business Semantic Data System",
      subtitle: "Toward AI Agent-Assisted Business Analytics & Semantic Modeling",
      category: "Data Systems & AI Agents",
      description: "An institutional research & engineering project on semantic-centric data architecture. Unifies fragmented relational databases into a business semantic layer, using AI agents to assist non-technical stakeholders in natural-language data extraction.",
      image: "/assets/projects/bsds_semantic_bi.png",
      secondaryImage: "/assets/projects/bsds_architecture.png",
      technologies: ["Python", "Pandas", "SQL", "Knowledge Graphs", "LLM APIs", "FastAPI", "Semantic Modeling"],
      keyFeatures: [
        "Business Semantic Layer connecting Customers, Products, Orders, and Subscriptions",
        "Autonomous AI agent natural language querying to democratize analytics",
        "Knowledge graph mapping eliminating redundant pipeline development",
        "Exploratory vs production query workflows with built-in data governance"
      ],
      githubUrl: "https://github.com/udaykumar1611/business-semantic-data-system",
      liveUrl: undefined,
      featured: true,
    },
    {
      id: "snack-city-pos",
      title: "Snack City POS — Commercial Billing System",
      subtitle: "Fast-Food Point-of-Sale with ESC/POS Thermal Printing Server",
      category: "Full Stack & Commercial Software",
      description: "A real-world point-of-sale and kitchen order ticketing application deployed for fast-food operations ('Snack City'). Includes high-speed touchscreen checkout, menu customization, local ESC/POS thermal receipt printing, and daily reconciliation.",
      image: "/assets/projects/snack_city_pos.jpg",
      secondaryImage: "/assets/projects/snack_city_logo.png",
      technologies: ["Python", "FastAPI", "SQLite / SQLAlchemy", "React Client", "ESC/POS Thermal Printing", "Tailwind CSS"],
      keyFeatures: [
        "Lightning-fast cashier order entry optimized for busy peak hours",
        "Automated thermal receipt and Kitchen Order Ticket (KOT) printing daemon",
        "Dynamic menu pricing, combo packs, and inventory status management",
        "Automated daily sales tallying and scheduled database backups"
      ],
      githubUrl: "https://github.com/udaykumar1611/snack-city-billing-system",
      liveUrl: undefined,
      featured: true,
    },
    {
      id: "resume-shortlister",
      title: "AI Resume Shortlister & Talent Screener",
      subtitle: "Automated Resume Parsing & Skill Extraction Engine",
      category: "Machine Learning & NLP",
      description: "An intelligent talent screening tool that ingests resumes in bulk, extracts candidate competencies, and scores candidates against job requisitions using natural language processing and semantic similarity.",
      image: "/assets/projects/personax_infographic.png",
      technologies: ["Python", "Flask", "NLP / Spacy", "Scikit-Learn", "Pandas", "HTML5 / CSS3"],
      keyFeatures: [
        "Batch resume processing across PDF, DOCX, and text formats",
        "Automated competency and keyword extraction for technical skill sets",
        "Cosine similarity matching against job descriptions with CSV candidate rankings"
      ],
      githubUrl: "https://github.com/udaykumar1611/ai-resume-shortlister",
      liveUrl: undefined,
      featured: false,
    }
  ] as Project[],

  skills: [
    {
      title: "Programming Languages",
      description: "Core languages used for backend logic, algorithms, and applications",
      skills: [
        { name: "Java", level: "Advanced" },
        { name: "Python", level: "Advanced" },
        { name: "TypeScript", level: "Proficient" },
        { name: "JavaScript (ES6+)", level: "Advanced" },
        { name: "SQL", level: "Proficient" },
        { name: "HTML5 & Modern CSS", level: "Advanced" }
      ]
    },
    {
      title: "Frontend & Creative Tech",
      description: "Interactive visual experiences, responsive interfaces, and 3D graphics",
      skills: [
        { name: "React.js", level: "Advanced" },
        { name: "Three.js / WebGL", level: "Intermediate" },
        { name: "React Three Fiber & Drei", level: "Intermediate" },
        { name: "GSAP & ScrollTrigger", level: "Proficient" },
        { name: "Tailwind CSS", level: "Advanced" },
        { name: "Vite & Modern Tooling", level: "Advanced" }
      ]
    },
    {
      title: "Backend & Systems",
      description: "Server architecture, microservices, and real-time streaming",
      skills: [
        { name: "Spring Boot", level: "Advanced" },
        { name: "FastAPI", level: "Proficient" },
        { name: "Node.js & Express", level: "Proficient" },
        { name: "Flask", level: "Intermediate" },
        { name: "RESTful API Design", level: "Advanced" },
        { name: "WebSockets & SSE", level: "Proficient" }
      ]
    },
    {
      title: "Databases & Storage",
      description: "Relational data modeling, query optimization, and vector search",
      skills: [
        { name: "PostgreSQL", level: "Advanced" },
        { name: "SQLite", level: "Advanced" },
        { name: "Vector Databases (RAG)", level: "Intermediate" },
        { name: "Hibernate / JPA", level: "Proficient" },
        { name: "SQLAlchemy", level: "Proficient" }
      ]
    },
    {
      title: "AI & Modern Architectures",
      description: "Generative AI systems, agents, and semantic layers",
      skills: [
        { name: "RAG Architecture", level: "Proficient" },
        { name: "AI Agent Workflows", level: "Proficient" },
        { name: "LLM APIs (OpenAI / Gemini)", level: "Advanced" },
        { name: "Prompt Engineering", level: "Advanced" },
        { name: "Semantic Data Modeling", level: "Proficient" }
      ]
    },
    {
      title: "DevOps & Developer Tools",
      description: "Version control, containerization, and build pipelines",
      skills: [
        { name: "Git & GitHub", level: "Advanced" },
        { name: "Docker", level: "Intermediate" },
        { name: "Postman API Testing", level: "Advanced" },
        { name: "Maven & Build Tools", level: "Proficient" },
        { name: "Linux / Windows Dev", level: "Advanced" }
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
        "Specializing in Computer Science & Engineering with coursework in Data Structures, Database Systems, Object-Oriented Software Design, and AI.",
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
      description: "Designed and engineered the end-to-end PersonaX architecture with Spring Boot, Vector DB, RAG retrieval, and real-time SSE streaming.",
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
