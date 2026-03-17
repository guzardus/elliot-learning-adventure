export default function SVGFilters() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="absolute w-0 h-0">
      <defs>
        {/* Watercolor Bleed Filter */}
        <filter id="watercolor-bleed" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.04" 
            numOctaves="4" 
            result="noise"
          />
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="noise" 
            scale="6" 
            xChannelSelector="R" 
            yChannelSelector="G"
          />
          <feGaussianBlur stdDeviation="0.8" result="blur" />
          <feComposite in="blur" in2="SourceGraphic" operator="over" />
        </filter>

        {/* Paper Texture Filter */}
        <filter id="paper-texture">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.8" 
            numOctaves="3" 
            result="noise"
          />
          <feDiffuseLighting 
            in="noise" 
            lighting-color="#FFF" 
            surfaceScale="1"
          >
            <feDistantLight azimuth="45" elevation="60" />
          </feDiffuseLighting>
          <feComposite operator="in" in2="SourceGraphic" />
        </filter>

        {/* Ink Bloom Filter */}
        <filter id="ink-bloom">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feColorMatrix 
            in="blur" 
            type="matrix" 
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 18 -7" 
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>

        {/* Gold Gradient for coins/accents */}
        <linearGradient id="gold-wash" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 215, 0, 0.9)" />
          <stop offset="50%" stopColor="rgba(218, 165, 32, 0.7)" />
          <stop offset="100%" stopColor="rgba(184, 134, 11, 0.5)" />
        </linearGradient>

        {/* Purple Gradient for Math Mountains */}
        <linearGradient id="purple-wash" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(123, 104, 238, 0.8)" />
          <stop offset="50%" stopColor="rgba(147, 112, 219, 0.6)" />
          <stop offset="100%" stopColor="rgba(123, 104, 238, 0.4)" />
        </linearGradient>

        {/* Green Gradient for Reading Rainforest */}
        <linearGradient id="green-wash" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(46, 139, 87, 0.8)" />
          <stop offset="50%" stopColor="rgba(143, 188, 143, 0.6)" />
          <stop offset="100%" stopColor="rgba(32, 178, 170, 0.4)" />
        </linearGradient>

        {/* Indigo Gradient for Grammar Galaxy */}
        <linearGradient id="indigo-wash" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(25, 25, 112, 0.9)" />
          <stop offset="50%" stopColor="rgba(147, 112, 219, 0.6)" />
          <stop offset="100%" stopColor="rgba(0, 128, 128, 0.4)" />
        </linearGradient>
      </defs>
    </svg>
  )
}
