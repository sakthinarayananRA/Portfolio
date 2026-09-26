# 🚀 Full-Stack Deployment Guide: Sakthinarayanan R Portfolio

This portfolio is architected as a **unified full-stack application**:
- **Frontend:** React 19 + Vite + Tailwind CSS + Framer Motion (compiled to `client/dist/`)
- **Backend:** Express.js REST API service listening on `process.env.PORT || 5000`
- **Unified Delivery:** Express serves both the production Single Page Application (SPA) and all `/api/*` REST endpoints on the same domain with **zero CORS issues**.

---

## 📦 Step 1: Push Code to GitHub

Your local git repository is already initialized and cleanly committed. To link it to your GitHub account:

1. Create a new repository on GitHub (e.g., `portfolio` or `developer-portfolio`).
2. Run the following commands in your terminal:

```bash
# Rename branch to main
git branch -M main

# Link your remote repository (replace with your GitHub repo URL)
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git

# Push code
git push -u origin main
```

---

## 🌐 Method 1: Deploy on Render (Recommended • Free Tier)

Render provides free hosting for unified Node.js full-stack web services.

### Option A: Using the Included `render.yaml` Blueprint (Automated)
1. Go to [dashboard.render.com](https://dashboard.render.com/).
2. Click **New +** ➡️ **Blueprint**.
3. Select your GitHub repository.
4. Render will automatically read `render.yaml` and configure the service.
5. Click **Apply**. Your portfolio will build and deploy automatically!

### Option B: Manual Web Service Setup
1. In Render, click **New +** ➡️ **Web Service**.
2. Connect your GitHub repository.
3. Configure the following settings:
   - **Name:** `sakthinarayanan-portfolio`
   - **Region:** Any (e.g., Singapore or Frankfurt)
   - **Branch:** `main`
   - **Root Directory:** *(leave blank)*
   - **Runtime:** `Node`
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`
4. Under **Environment Variables**, ensure:
   - `NODE_ENV` = `production`
5. Click **Create Web Service**.

> **Note on Render Free Tier:** Render spins down free web services after 15 minutes of inactivity. The first request after spin-down may take ~30 seconds to wake up, after which it operates at full speed.

---

## 🚂 Method 2: Deploy on Railway (Instant Git Deployment)

Railway provides high-speed containerized deployment with zero cold starts.

1. Go to [railway.app](https://railway.app/).
2. Click **New Project** ➡️ **Deploy from GitHub repo**.
3. Select your repository.
4. Railway will automatically detect `railway.json` and `Procfile`.
5. Under **Settings** ➡️ **Networking**, click **Generate Domain** to get your public live URL (e.g., `sakthinarayanan-portfolio.up.railway.app`).

---

## 🔒 Custom Domain & SSL Setup

Once deployed on either Render or Railway:
1. Go to **Settings** ➡️ **Custom Domains**.
2. Enter your custom domain (e.g., `sakthinarayanan.dev` or `sakthi.tech`).
3. Add the `CNAME` or `A` records provided by Render/Railway into your domain DNS provider (GoDaddy, Namecheap, Cloudflare, etc.).
4. Free SSL/TLS certificates will be automatically provisioned and renewed.

---

## 🛠️ Verification & Health Check

Once your site is live, verify that all endpoints are operational:
- **Home UI:** `https://your-portfolio-domain.com/`
- **Health Check:** `https://your-portfolio-domain.com/api/health`
- **Canonical Portfolio Data:** `https://your-portfolio-domain.com/api/portfolio`
- **Live Terminal Stats:** `https://your-portfolio-domain.com/api/portfolio/terminal-stats`
- **Contact Inquiries:** `https://your-portfolio-domain.com/api/contact`
