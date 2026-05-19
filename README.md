# ⬡ CampusCircle

> **Verified. Anonymous. Connected.**  
> A high-fidelity mobile prototype social networking app for Indian college communities.

---

## 🚀 Quick Start (Local)

### Prerequisites
- Node.js 16+ installed → [nodejs.org](https://nodejs.org)
- npm (comes with Node.js)

### Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start
```

Opens at **http://localhost:3000** in your browser.

---

## 🌐 Deploy to Vercel (Recommended — Free)

### Option A: CLI (fastest)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Inside the project folder
vercel

# Follow prompts → your app is live in ~60 seconds!
```

### Option B: GitHub + Vercel Dashboard

1. Push this folder to a GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "Initial commit – CampusCircle"
   git remote add origin https://github.com/YOUR_USERNAME/campuscircle.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo
3. Leave all settings as default → click **Deploy**
4. Your app gets a live URL like `campuscircle.vercel.app` ✅

---

## 🌐 Deploy to Netlify (Free)

### Option A: Drag & Drop (zero setup)

```bash
# Build the production bundle first
npm run build
```
Then drag the generated `build/` folder to **[app.netlify.com/drop](https://app.netlify.com/drop)**.  
Done — live URL in seconds.

### Option B: CLI

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=build
```

### Option C: GitHub + Netlify Dashboard

1. Push to GitHub (same steps as Vercel Option B above)
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import from Git**
3. Build command: `npm run build`  
   Publish directory: `build`
4. Click **Deploy site** ✅

---

## 🌐 Deploy to GitHub Pages (Free)

```bash
# Install gh-pages package
npm install --save-dev gh-pages

# Add to package.json scripts (already included if you use the modified version):
# "predeploy": "npm run build",
# "deploy": "gh-pages -d build"

# Add homepage to package.json:
# "homepage": "https://YOUR_USERNAME.github.io/campuscircle"

# Deploy
npm run deploy
```

---

## 📁 Project Structure

```
campuscircle/
├── public/
│   └── index.html          # HTML shell
├── src/
│   ├── App.jsx             # Main app – all 15 screens
│   └── index.js            # React entry point
├── package.json            # Dependencies & scripts
├── vercel.json             # Vercel config (SPA routing)
├── netlify.toml            # Netlify config (SPA routing)
├── .gitignore
└── README.md
```

---

## 📱 Screens Included

| # | Screen | Description |
|---|--------|-------------|
| 1 | Splash | Animated logo, particles, CTA |
| 2 | Login | College email + domain detection |
| 3 | OTP | 6-box verification with animation |
| 4 | Onboarding | Year, branch, interest chips |
| 5 | Home Feed | Posts, votes, tabs, notifications |
| 6 | Create Post | Categories, polls, image upload UI |
| 7 | Comments | Nested threads, reactions |
| 8 | Community | College stats, tabs, pinned posts |
| 9 | Search | Trending tags, recent, filters |
| 10 | Messages | Chat list + real-time chat UI |
| 11 | Notifications | Grouped by type, unread dots |
| 12 | Profile | Karma, streaks, badges |
| 13 | Marketplace | Buy/sell grid, categories |
| 14 | Events Board | Hackathons, fests, workshops |
| 15 | Admin Panel | Reports, flags, AI moderation |

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary Neon | `#39FF88` |
| Sky Blue | `#87CEFA` |
| Mint | `#B8FFD6` |
| Background | `#0B0F1A → #111827` |
| Card | `#161B26` |
| Font | Space Grotesk + Rajdhani |

---

## 🔧 Customization

- **Change college name**: Search `IIT Bombay` in `App.jsx` and replace with your college
- **Add real posts**: Replace `MOCK_POSTS` array in `App.jsx` with API data
- **Add backend**: Connect to Firebase / Supabase / your own Node.js API
- **Change colors**: Edit the `COLORS` object at the top of `App.jsx`

---

## 🛠 Tech Stack

- **React 18** – UI framework
- **CSS-in-JS** – styles injected via `<style>` tag (no extra CSS files needed)
- **Google Fonts** – Space Grotesk + Rajdhani (loaded via `@import`)
- **No other dependencies** – zero UI libraries, pure React

---

## 📄 License

MIT — free to use, modify, and deploy.

---

Built with ⬡ for Indian college students.
