# Uday Kumar — Cinematic 3D Developer Portfolio

A personal 3D developer portfolio and interactive showcase built for **Uday Kumar** (Developer & Creative Technologist). Built with React, TypeScript, Three.js, React Three Fiber, Drei, GSAP, and Tailwind CSS.

---

## 🌟 Highlights & Features

- **Real Studio Portrait Integration**: Features Uday Kumar's authentic high-resolution studio photograph in an editorial frame with ambient electric-blue rim lighting and responsive cropping.
- **Cinematic 3D Hero Scene**: Interactive Three.js focal core powered by `@react-three/fiber` and `@react-three/drei` with real-time pointer parallax, floating animations, orbiting cybernetic rings, and particle starfield. Includes an automatic WebGL detection fallback.
- **Authentic Engineering Projects**:
  - **PersonaX — AI Digital Twin Platform**: Full-stack Spring Boot, React, Vector DB for RAG, real-time Server-Sent Events (SSE) token streaming, dynamic persona modeling, and AI guardrails.
  - **BSDS — Business Semantic Data System**: Business semantic data layer unifying fragmented relational data with autonomous AI agent natural language querying and knowledge graphs.
  - **Snack City POS — Commercial Billing System**: Fast-food point-of-sale system built with FastAPI, SQLite, React, and local ESC/POS thermal receipt printing server.
  - **AI Resume Shortlister**: Batch resume parsing and candidate skill scoring engine with NLP similarity ranking.
- **Interactive Project Modals**: Deep dive modal displaying high-resolution infographics, architectural diagrams, system specifications, and repository links.
- **Categorized Technical Skills**: 6 verified categories covering Programming Languages, Frontend & Creative Tech, Backend & Systems, Databases & Storage, AI Architectures, and DevOps Tools.
- **Verified Education & Milestones**: Bachelor of Technology (B.Tech) in Computer Science & Engineering from Vaagdevi Institute of Technology and Science (Proddatur), capstone research milestones, and commercial software deployments.
- **Functional Contact Dispatch**: Working interactive mailto composer pre-filling topic and details to `uddeykoamer1611@gmail.com`, plus a one-click clipboard copy utility.
- **Curriculum Vitae Preview Modal**: Complete printable and downloadable résumé modal.
- **Accessible & Responsive**: Tested across mobile (360px–390px), tablet (768px), laptop (1024px), and desktop (1440px+) viewports. Respects `prefers-reduced-motion`.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Core Framework** | React 18, TypeScript, Vite |
| **3D & Graphics** | Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`) |
| **Animations** | GSAP, ScrollTrigger |
| **Styling & UI** | Tailwind CSS (custom dark cinematic theme), Lucide React |
| **Asset Pipeline** | Optimized WebP/PNG assets in `public/assets/` |

---

## 📁 Project Architecture

```
uddeykoamer portfolio/
├── public/
│   ├── assets/
│   │   ├── uday-kumar-profile.png     # Authentic studio profile photo
│   │   ├── uday-kumar-profile.jpg     # High-res profile fallback
│   │   └── projects/
│   │       ├── personax_infographic.png # Full PersonaX architecture infographic
│   │       ├── bsds_semantic_bi.png     # BSDS Semantic BI System screenshot
│   │       ├── bsds_architecture.png    # BSDS System Architecture diagram
│   │       ├── snack_city_pos.jpg       # Snack City menu & POS preview
│   │       └── snack_city_logo.png      # Snack City brand logo
├── src/
│   ├── components/
│   │   ├── Navbar.tsx                 # Responsive glassmorphic navigation bar
│   │   ├── Hero.tsx                   # Fullscreen opening with 3D canvas
│   │   ├── ThreeHeroScene.tsx         # Interactive Three.js R3F focal object
│   │   ├── About.tsx                  # Editorial portrait presentation & bio
│   │   ├── Projects.tsx               # Filterable selected projects grid
│   │   ├── ProjectModal.tsx           # Architecture deep dive & diagrams
│   │   ├── Skills.tsx                 # Categorized technical competencies
│   │   ├── EducationExperience.tsx    # Academic foundation & timeline
│   │   ├── Contact.tsx                # Mailto dispatch & social channels
│   │   ├── ResumeModal.tsx            # Printable Curriculum Vitae preview
│   │   └── Footer.tsx                 # Editorial minimal footer
│   ├── data/
│   │   └── portfolioData.ts           # Central configuration file for all data
│   ├── index.css                      # Design system tokens, utilities & fonts
│   ├── App.tsx                        # Main application orchestrator
│   └── main.tsx                       # React application entry point
├── tailwind.config.js                 # Custom dark palette & electric-blue glow
├── tsconfig.json                      # TypeScript configuration
├── package.json                       # Dependencies and build scripts
└── vite.config.ts                     # Vite bundler configuration
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher recommended; verified with v24)
- npm (v9 or higher; verified with v11)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/udaykumar1611/uday-kumar-portfolio.git

# Navigate into the project directory
cd "uddeykoamer portfolio"

# Install dependencies
npm install
```

### 3. Development Server
```bash
npm run dev
```
Open [http://127.0.0.1:5173/](http://127.0.0.1:5173/) in your web browser.

### 4. Production Build
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## ⚙️ Customization & Editing

All portfolio details are centralized in a single configuration file:
`src/data/portfolioData.ts`

- **Update Profile Info**: Change `PORTFOLIO_DATA.profile` (name, title, bio, email, social URLs).
- **Add / Edit Projects**: Modify or append to `PORTFOLIO_DATA.projects` (title, images, tech stack, key features, GitHub and live URLs).
- **Update Skills**: Edit `PORTFOLIO_DATA.skills` with new categories or technologies.
- **Update Education & Milestones**: Adjust `PORTFOLIO_DATA.education` or `PORTFOLIO_DATA.milestones`.
- **Change Profile Photo**: Place a new image in `public/assets/` and update `PORTFOLIO_DATA.profile.photo`.

---

## 🚢 Deployment Guide

### Deploying to Vercel (Recommended)
1. Push your code to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: cinematic 3D portfolio for Uday Kumar"
   git remote add origin https://github.com/udaykumar1611/portfolio.git
   git branch -M main
   git push -u origin main
   ```
2. Import the repository into [Vercel](https://vercel.com).
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Click **Deploy**.

### Deploying to Netlify
1. Connect your repository in [Netlify](https://netlify.com).
2. Set Build Command: `npm run build`.
3. Set Publish directory: `dist`.
4. Deploy site.

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
