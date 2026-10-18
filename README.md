# 🌙 Pip’s Portfolio · Junior Dream Engineer
> *"I build the dreams you fall asleep inside."*

An interactive, story-driven portfolio website built for **Track 1 (Pip the Skull Baby)** of **Baby's First Website (haX.baby)**. Featuring custom Three.js visuals, Web Audio synthesized lullabies, classic Hindi bedtime rhymes, an atmospheric day/night sky cycle, and an interactive 3D dream laboratory.

---

## ✨ Key Features

- **🎬 Cinematic Edge-to-Edge Intro**: Edge-to-edge full-page prologue video with subtle atmospheric vignette, skip controls, and smooth dissolve transition into the nursery.
- **☀️/🌅/🌌 Celestial Sky Cycle Engine**: Live interactive lighting and background video cycling between Dawn, Twilight, and Midnight with custom star density and shooting star mechanics.
- **🎵 The Lullaby Lab**: A clockwork music box featuring 6 soothing tunes and classic Indian nursery rhymes:
  - 🪵 *Lakdi Ki Kathi* (लकड़ी की काठी)
  - 🦚 *Nani Teri Morni* (नानी तेरी मोरनी)
  - 🥔 *Aalu Kachalu* (आलू कचालू बेटा)
  - 🍅 *Aaha Tamatar* (आहा टमाटर बड़े मजेदार)
  - 🐘 *Ek Mota Hathi* (एक मोटा हाथी)
  - ✨ *Brahms Celestial 432Hz Synth Scales*
- **💡 Nocturnal Bedside Nightlight**: Interactive lantern with ambient candle flicker, darkness vignette dimmer, and celestial color hues.
- **🗺️ Radar Dream Delivery Routes**: Interactive canvas radar tracking live bedtime dream delivery flights across Somnia.
- **🧸 Block Playpen**: Physics-inspired letter block stacking mini-game.
- **📖 Illustrated Bedtime Storybook**: Interactive storybook reader with illustrated tales and page navigation.
- **🔮 The Dream Weaver Lab**: Interactive bedtime alchemy combining soothing dream ingredients into certified nightmare-proof dreams.
- **📱 100% Mobile & Touch Optimized**: Responsive layout with modern drawer navigation, touch-swipe gestures, and safe-area insets.

---

## 📁 Repository Structure

```
Pip/
├── public/                     # Static production assets
│   ├── assets/
│   │   ├── audio/              # Clean 432Hz nursery rhymes & melodies
│   │   ├── images/             # Studio character portraits & illustrations
│   │   └── videos/             # Atmosphere videos (Dawn.mp4, midnight.mp4, intro.mp4)
│   ├── favicon.svg             # Nursery star favicon
│   └── intro.mp4               # Full-screen opening video
├── src/                        # Modular application source code
│   ├── audio/                  # Web Audio API sound synthesis & track manager
│   ├── components/             # Reusable UI component views
│   │   ├── About.js            # Character dossier & story
│   │   ├── DreamWeaver.js      # Dream Lab interactive alchemy
│   │   ├── Footer.js           # Bedtime countdown & sleeping Pip card
│   │   ├── GrowthChart.js      # Nursery wall skills tracker
│   │   ├── Guestbook.js        # Pillow-talk guestbook
│   │   ├── Hero.js             # Hero headline, stats & avatar
│   │   ├── Intro.js            # Cinematic edge-to-edge intro overlay
│   │   ├── Marquee.js          # Playful animated ribbon
│   │   ├── Navbar.js           # Floating dock & mobile drawer menu
│   │   ├── Showcase.js         # Pip's 5 Inventions gallery & music player
│   │   └── WorldLore.js        # Somnia atlas & interactive landmarks
│   ├── data/                   # World lore & storyline datasets
│   ├── scripts/                # Controllers & interaction logic
│   │   ├── atmosphericEngine.js
│   │   ├── blocksGame.js
│   │   ├── deliveryMap.js
│   │   ├── dreamGenerator.js
│   │   ├── horizontalScroll.js
│   │   ├── introController.js
│   │   ├── skyCycleController.js
│   │   ├── statsCounter.js
│   │   └── storybookController.js
│   ├── styles/                 # Custom Tailwind CSS & theme tokens
│   ├── three/                  # Three.js 3D character & particle systems
│   └── main.js                 # Application entry point
├── docs/                       # Project specifications & design brief
│   └── Pip_Brief.md
├── prototypes/                 # Standalone legacy demo prototypes
│   ├── Pip_Portfolio.html
│   └── pip-3d-character.html
├── raw_media/                  # Original raw downloads & creator asset pack
│   ├── creator_pack/           # Original hackathon asset renders
│   ├── original_audio/         # Original YouTube audio files
│   └── original_videos/        # Original video files
├── index.html                  # HTML entry point
├── package.json                # Project dependencies & npm scripts
├── vite.config.js              # Vite bundler configuration
└── README.md                   # Project overview & documentation
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ recommended)
- npm (comes bundled with Node.js)

### Installation
```bash
# Clone or navigate to the repository
cd Pip

# Install dependencies
npm install
```

### Running Locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production
```bash
npm run build
```
The optimized production bundle will be created in the `dist/` directory.

---

## 🎨 Tech Stack
- **Bundler & Tooling**: [Vite](https://vitejs.dev/)
- **UI Framework & Components**: Modern Vanilla JavaScript component architecture
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS custom design tokens
- **3D Graphics**: [Three.js](https://threejs.org/)
- **Audio**: Web Audio API (real-time synthesizers) + HTML5 Audio (nursery rhymes)
- **Typography**: Google Fonts (*Fredoka* & *Outfit*)

---

## 🧸 License
Created with love for **Baby's First Website (haX.baby)**.
All creator pack assets are approved for hackathon usage.
