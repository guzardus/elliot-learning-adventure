import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Math Mountains Palette
        'mountain-purple': '#7B68EE',
        'misty-blue': '#B0C4DE',
        'dawn-pink': '#FFE4E1',
        'ink-grey': '#2F4F4F',
        'gold-accent': '#DAA520',
        
        // Reading Rainforest Palette
        'jade-green': '#2E8B57',
        'moss-wash': '#8FBC8F',
        'sunlight-gold': '#F0E68C',
        'earth-brown': '#8B4513',
        'tropical-teal': '#20B2AA',
        
        // Grammar Galaxy Palette
        'midnight-indigo': '#191970',
        'nebula-purple': '#9370DB',
        'starry-white': '#FFFAF0',
        'cosmic-teal': '#008080',
        'meteor-gold': '#FFD700',
        
        // Universal
        'paper-cream': '#F5F5DC',
        'ink-black': '#1A1A1A',
        'watercolor-white': '#FFFAFA',
      },
      fontFamily: {
        'amatic': ['Amatic SC', 'cursive'],
        'caveat': ['Caveat', 'cursive'],
        'patrick': ['Patrick Hand', 'cursive'],
        'nunito': ['Nunito', 'sans-serif'],
        'indie': ['Indie Flower', 'cursive'],
      },
      backgroundImage: {
        'paper-texture': "url('/textures/paper-cold-press.svg')",
        'watercolor-bleed': "url('/masks/watercolor-bleed.svg')",
        'world-math': "url('/images/backgrounds/bg-math-mountains.png')",
        'world-rainforest': "url('/images/backgrounds/bg-reading-rainforest.png')",
        'world-galaxy': "url('/images/backgrounds/bg-grammar-galaxy.png')",
      },
      boxShadow: {
        'watercolor': '2px 4px 12px rgba(0,0,0,0.1)',
        'watercolor-lg': '4px 8px 24px rgba(0,0,0,0.15)',
        'diffuse': '0 4px 20px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.05)',
      },
      clipPath: {
        'organic': 'polygon(5% 0%, 95% 2%, 100% 50%, 94% 98%, 6% 100%, 0% 50%)',
        'deckled': 'polygon(0% 5%, 3% 0%, 97% 2%, 100% 8%, 98% 95%, 95% 100%, 5% 98%, 2% 92%)',
      },
      animation: {
        'gentle-bob': 'gentle-bob 4s ease-in-out infinite',
        'wash-sweep': 'wash-sweep 0.8s ease-out forwards',
        'ink-bloom': 'ink-bloom 0.6s ease-out forwards',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'paint-flow': 'paint-flow 3s ease-in-out infinite',
        'splatter': 'splatter-radiate 0.8s ease-out forwards',
      },
      keyframes: {
        'gentle-bob': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'wash-sweep': {
          '0%': { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', filter: 'blur(4px)' },
          '50%': { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', filter: 'blur(2px)' },
          '100%': { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', filter: 'blur(0)' },
        },
        'ink-bloom': {
          '0%': { transform: 'scale(0)', opacity: '0.8' },
          '50%': { transform: 'scale(1.5)', opacity: '0.4' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'paint-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'splatter-radiate': {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(3)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
export default config
