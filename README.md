# Sakthinarayanan R — Senior PHP (Laravel) Developer Portfolio

An interactive, 3D-inspired developer portfolio and engineering showcase designed exclusively for **Sakthinarayanan R**, highlighting 3.7 years of enterprise experience architecting scalable web applications, high-throughput backend services, Redis queues, and MySQL schema optimization.

---

## 🌟 Key Features & Architectural Highlights

1. **3D-Inspired Visuals & Parallax Physics**:
   - Interactive 3D tilt architecture card in the Hero section responding to mouse trajectory.
   - Interactive 2D/3D Canvas with network nodes symbolizing API gateways, Redis workers, and database clusters.
   - Dynamic custom cursor with trailing velocity aura and interactive hover expansion (disabled on touch devices).

2. **Laravel Artisan Sandbox & Interactive Terminal**:
   - Live interactive terminal emulator simulating real Laravel Artisan commands (`php artisan route:list`, `php artisan queue:work`, `php artisan test`, `php artisan about`).
   - Integrated with backend Express endpoint `/api/artisan/execute` with client-side fallback.

3. **High-Throughput Architecture Pipeline**:
   - An interactive 5-stage system design diagram explaining request ingestion, PSR-12 Laravel core processing, Redis background queues, MySQL composite indexing, and PHPUnit TDD verification.

4. **Synthesized Web Audio API Sound System**:
   - Zero external audio file dependencies — all micro-interactions (hover clicks, tab chirps, modal triggers, submission fanfare) are synthesized mathematically using standard browser `AudioContext`.
   - Dedicated navbar mute/unmute button with `localStorage` state persistence.

5. **Accessibility & Reduced Motion**:
   - Automatically detects the user's `prefers-reduced-motion` operating system setting.
   - Includes a manual toggle button in the navbar to pause particle animations and 3D card tilt.

6. **Key Projects & Deep-Dive Modals**:
   - **Markets Group** (CMS & Business Analytics Portal)
   - **RC Prime** (B2B E-Commerce & Rapid Order Management)
   - **Adcoops** (Retail & Vendor API Integration System)
   - **Do Part Time** (On-Demand Recruitment Platform)
   - **Al Yousuf Group** (Multi-Category E-Commerce Platform)

7. **Production Express Backend**:
   - `/api/contact`: Rate-limited contact inquiry processor with input sanitization, JSON persistence, and reference ticket generation.
   - `/api/resume/download`: Secure resume download tracking with stream headers.
   - `/api/artisan/execute`: Execution pipeline for simulated Artisan commands.
   - `/api/health` & `/api/stats`: Service health, uptime, and metrics summary.

---

## 📁 Project Architecture & File Structure

```
portfolio/
├── client/                               # Frontend (React 19 + Vite 8 + Tailwind CSS v4)
│   ├── public/
│   │   └── Sakthinarayanan_R_Resume.pdf  # Downloadable resume PDF
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx                # Glassmorphic header with sound & motion controls
│   │   │   ├── CustomCursor.jsx          # Interactive mouse follower & hover aura
│   │   │   ├── BackgroundCanvas.jsx      # Interactive 3D network node constellation
│   │   │   ├── Hero.jsx                  # 3D tilt architecture card, metrics & CTAs
│   │   │   ├── About.jsx                 # 4 engineering pillars & career trajectory
│   │   │   ├── Skills.jsx                # Filterable tech stack matrix & AI workflow
│   │   │   ├── Experience.jsx            # usis Technologies & Eminent Technology timeline
│   │   │   ├── Projects.jsx              # Filterable enterprise project showcase
│   │   │   ├── ProjectModal.jsx          # Deep architectural breakdown modal
│   │   │   ├── ArchitectureShowcase.jsx  # 5-stage high-throughput pipeline diagram
│   │   │   ├── TerminalPlayground.jsx    # Interactive Laravel Artisan CLI sandbox
│   │   │   ├── EducationEngagements.jsx  # B.Sc CS degree & PSGR keynote speaker history
│   │   │   ├── Contact.jsx               # Backend-integrated form with copy triggers
│   │   │   ├── Footer.jsx                # Social links, credits & back-to-top
│   │   │   └── ResumeModal.jsx           # Printable CV previewer & download trigger
│   │   ├── data/
│   │   │   └── portfolioData.js          # Single source of truth (from resume)
│   │   ├── hooks/
│   │   │   └── useReducedMotion.js       # Accessibility motion detection & toggle
│   │   ├── utils/
│   │   │   └── audio.js                  # Synthesized Web Audio API sound FX
│   │   ├── App.jsx                       # Main application layout & scroll spy
│   │   ├── index.css                     # Tailwind CSS v4 + glassmorphism themes
│   │   └── main.jsx                      # React 19 entrypoint
│   ├── index.html                        # SEO meta tags, OpenGraph & Google Fonts
│   ├── package.json
│   └── vite.config.js                    # Vite configuration with API proxy
│
├── server/                               # Backend (Node.js + Express)
│   ├── data/
│   │   ├── contacts.json                 # Inbound contact inquiries
│   │   └── analytics.json                # API hit and resume download telemetry
│   ├── public/
│   │   └── Sakthinarayanan_R_Resume.pdf  # Official resume file served via API
│   ├── generate_resume.cjs               # Script to generate PDF resume
│   ├── package.json
│   └── server.js                         # Express API service & static dist fallback
│
├── package.json                          # Root runner scripts
└── README.md                             # Documentation & setup guide
```

---

## 🚀 Installation & Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher (Tested on Node v22.20.0)
- **npm**: v9.0.0 or higher

### 1. Install Dependencies
Run the installation command in both folders:

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install

# Return to root
cd ..
```

---

## 💻 Development Commands

### Start Both Frontend and Backend Concurrently
From the root directory:
```bash
npm run dev
```

Or run them in separate terminal tabs:
```bash
# Terminal 1: Run Express API Server (runs on http://localhost:5000)
npm run server

# Terminal 2: Run Vite Frontend (runs on http://localhost:3000)
npm run client
```

Open your browser at:
`http://localhost:3000`

---

## 📦 Production Build & Deployment

### 1. Build the Frontend
From the root directory:
```bash
npm run build
```
This compiles optimized production assets into `client/dist/`.

### 2. Start the Production Server
```bash
npm run start
```
The Express server on `http://localhost:5000` will automatically serve the compiled frontend from `client/dist` alongside all `/api/*` endpoints!

---

## 🎨 Replacing Assets & Personalizing

1. **Resume PDF**:
   - Replace `client/public/Sakthinarayanan_R_Resume.pdf` and `server/public/Sakthinarayanan_R_Resume.pdf` with your custom PDF file. Keep the same filename or update the route in `server/server.js`.
2. **Social Links (GitHub & LinkedIn)**:
   - Edit `client/src/data/portfolioData.js`:
     ```javascript
     socials: {
       email: "mailto:sakthinarayanan.ra@gmail.com",
       phone: "tel:+919345679757",
       github: "https://github.com/your-username",
       linkedin: "https://linkedin.com/in/your-profile"
     }
     ```
3. **Sound Effects Customization**:
   - All sound effects in `client/src/utils/audio.js` use the standard Web Audio API. Frequencies, waveform types (`sine`, `triangle`, `sawtooth`), and volume gains can be tuned without requiring any audio assets.
4. **Artisan CLI Simulation**:
   - To add new custom commands to the Artisan playground, add new command keys and output strings in `server/server.js` under `commandResponses` and `presetCommands` in `client/src/components/TerminalPlayground.jsx`.
