# Elliot's Learning Adventure - Prototype

A Next.js prototype implementing the "No Generic Boxes" design philosophy with custom watercolor UI components.

## 🎨 Design Philosophy

**Zero emojis. Zero generic boxes. Every pixel painted.**

- Organic button shapes with feathered edges
- Deckled paper cards (no rectangles)
- Hand-painted SVG icons (no emojis)
- Watercolor wash backgrounds
- Custom typography (Amatic SC, Caveat, Patrick Hand, Nunito)

## 🏗️ Project Structure

```
elliot-adventure/
├── src/
│   ├── app/
│   │   ├── globals.css        # Global styles + Google Fonts
│   │   ├── layout.tsx         # Root layout with SVG filters
│   │   └── page.tsx           # Main dashboard page
│   └── components/
│       ├── SVGFilters.tsx     # SVG filters for watercolor effects
│       ├── WButton.tsx        # Organic watercolor buttons
│       ├── WCard.tsx          # Deckled paper cards
│       └── WIcon.tsx          # Custom SVG icon library (20+ icons)
├── public/
│   ├── textures/              # Paper texture assets
│   └── worlds/                # World background images
├── tailwind.config.ts         # Custom colors, fonts, animations
└── package.json
```

## 🎯 Components Built

### W-System Components

1. **WButton** - Organic shaped buttons with watercolor gradients
   - Variants: primary, secondary, ghost, icon
   - Sizes: sm, md, lg
   - Hover/tap animations with Framer Motion

2. **WCard** - Deckled edge cards with paper texture
   - Variants: default, world, achievement, activity
   - World-specific color washes
   - Soft diffuse shadows

3. **WIcon** - 20+ custom SVG icons (zero emojis)
   - IconCoin, IconStar, IconCompass
   - IconHeart, IconHome, IconMedal
   - IconCheck, IconClose, IconPlay
   - IconArrowLeft, IconArrowRight
   - IconTimer, IconHint, IconSound
   - IconLock, IconUnlock

4. **SVGFilters** - Real-time watercolor effects
   - watercolor-bleed filter
   - paper-texture filter
   - ink-bloom filter
   - Gradient definitions

## 🎨 Visual Features

### Typography
- **Amatic SC** - World titles, decorative headers
- **Caveat** - Button text, section headers
- **Patrick Hand** - Card titles, labels
- **Nunito** - Body text, readable content
- **Indie Flower** - Special quotes (available)

### Color System
- Math Mountains: Purple/Blue palette
- Reading Rainforest: Green palette
- Grammar Galaxy: Indigo/Purple palette
- Universal: Paper cream, ink black

### Animations
- gentle-bob: Floating world islands
- wash-sweep: Page transitions
- ink-bloom: Button interactions
- glow-pulse: Selection states

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📦 Dependencies

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Zustand (state management - ready)

## 🎮 Current Features

- World selector with 3 worlds (Math, Reading, Grammar)
- Dynamic background that changes with selected world
- Stats dashboard with custom icons
- Welcome card with call-to-action
- Responsive design
- No emojis anywhere - all custom icons

## 🛣️ Next Steps

1. Add texture images to /public/textures/
2. Create world-specific pages
3. Build activity components
4. Implement progress tracking
5. Add gamification elements

## 📝 Notes

- All icons are custom SVG - no emojis used
- All buttons have organic shapes - no rectangles
- All cards have deckled edges - no straight borders
- All fonts are loaded from Google Fonts - no system fonts
- Paper texture overlay on entire page

Built with love by Elara ✨
