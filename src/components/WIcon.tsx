'use client'

interface WIconProps {
  size?: number
  className?: string
}

// Gold Coin Icon - replaces 💰
export function IconCoin({ size = 24, className = '' }: WIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      className={className}
      fill="none"
    >
      <defs>
        <linearGradient id="coinGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#DAA520" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#B8860B" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {/* Irregular gold shape */}
      <path
        d="M16 2C24 2 30 8 29 16C28 24 22 30 16 30C8 30 2 24 3 16C4 8 10 2 16 2Z"
        fill="url(#coinGold)"
      />
      {/* Ink outline */}
      <path
        d="M16 6C20 6 24 10 24 16C24 22 20 26 16 26C10 26 6 22 6 16C6 10 10 6 16 6Z"
        fill="none"
        stroke="#8B4513"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
      {/* Decorative line */}
      <path
        d="M12 16H20"
        stroke="#8B4513"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  )
}

// Starburst Icon - replaces ⭐
export function IconStar({ size = 24, className = '' }: WIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      className={className}
      fill="none"
    >
      <defs>
        <linearGradient id="starGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#DAA520" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {/* Hand-painted star shape */}
      <path
        d="M16 2L19 12H29L21 18L24 28L16 22L8 28L11 18L3 12H13L16 2Z"
        fill="url(#starGold)"
        stroke="#DAA520"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Compass/Settings Icon - replaces ⚙️
export function IconCompass({ size = 24, className = '' }: WIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      className={className}
      fill="none"
    >
      {/* Outer ring */}
      <circle 
        cx="16" 
        cy="16" 
        r="12" 
        fill="none" 
        stroke="#2F4F4F" 
        strokeWidth="1"
        opacity="0.6"
      />
      {/* Inner decoration */}
      <circle 
        cx="16" 
        cy="16" 
        r="2" 
        fill="#DAA520"
      />
      {/* Compass needle */}
      <path
        d="M16 6L19 14H13L16 6Z"
        fill="#2F4F4F"
        opacity="0.8"
      />
      <path
        d="M16 26L13 18H19L16 26Z"
        fill="#8B4513"
        opacity="0.6"
      />
    </svg>
  )
}

// Heart Icon - replaces ❤️
export function IconHeart({ size = 24, className = '' }: WIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      className={className}
      fill="none"
    >
      <defs>
        <linearGradient id="heartRed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DC143C" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#B22222" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {/* Organic heart shape */}
      <path
        d="M16 28C16 28 4 20 4 12C4 6 8 2 14 2C16 2 16 4 16 4C16 4 16 2 18 2C24 2 28 6 28 12C28 20 16 28 16 28Z"
        fill="url(#heartRed)"
        stroke="#8B0000"
        strokeWidth="0.5"
      />
    </svg>
  )
}

// Arrow Left Icon - replaces ⬅️
export function IconArrowLeft({ size = 24, className = '' }: WIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      className={className}
      fill="none"
    >
      <path
        d="M28 16H6M6 16L14 8M6 16L14 24"
        stroke="#2F4F4F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Arrow Right Icon - replaces ➡️
export function IconArrowRight({ size = 24, className = '' }: WIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      className={className}
      fill="none"
    >
      <path
        d="M4 16H26M26 16L18 8M26 16L18 24"
        stroke="#2F4F4F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Checkmark Icon - replaces ✓
export function IconCheck({ size = 24, className = '' }: WIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      className={className}
      fill="none"
    >
      <path
        d="M6 16L13 23L26 9"
        stroke="#2E8B57"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Close/X Icon - replaces ✕
export function IconClose({ size = 24, className = '' }: WIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      className={className}
      fill="none"
    >
      <path
        d="M8 8L24 24M24 8L8 24"
        stroke="#2F4F4F"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Play Icon - replaces ▶️
export function IconPlay({ size = 24, className = '' }: WIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      className={className}
      fill="none"
    >
      <path
        d="M8 6L26 16L8 26V6Z"
        fill="rgba(46, 139, 87, 0.7)"
        stroke="#2E8B57"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Home Icon - replaces 🏠
export function IconHome({ size = 24, className = '' }: WIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      className={className}
      fill="none"
    >
      {/* Mountain cabin */}
      <path
        d="M16 4L4 14H8V26H14V18H18V26H24V14H28L16 4Z"
        fill="rgba(139, 69, 19, 0.5)"
        stroke="#8B4513"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Trophy/Achievement Medal - replaces 🏆
export function IconMedal({ size = 24, className = '' }: WIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      className={className}
      fill="none"
    >
      <defs>
        <linearGradient id="medalGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#DAA520" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      {/* Medal circle */}
      <circle 
        cx="16" 
        cy="14" 
        r="10" 
        fill="url(#medalGold)"
        stroke="#B8860B"
        strokeWidth="0.5"
      />
      {/* Star in center */}
      <path
        d="M16 8L17.5 12H22L18.5 15L20 19L16 16L12 19L13.5 15L10 12H14.5L16 8Z"
        fill="#B8860B"
        opacity="0.8"
      />
      {/* Ribbon */}
      <path
        d="M12 22L10 30L16 26L22 30L20 22"
        fill="#DC143C"
        opacity="0.7"
      />
    </svg>
  )
}

// Time/Timer Icon - replaces ⏱️
export function IconTimer({ size = 24, className = '' }: WIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      className={className}
      fill="none"
    >
      {/* Sundial base */}
      <ellipse 
        cx="16" 
        cy="26" 
        rx="10" 
        ry="3" 
        fill="rgba(139, 69, 19, 0.4)"
      />
      {/* Dial face */}
      <circle 
        cx="16" 
        cy="16" 
        r="8" 
        fill="none"
        stroke="#2F4F4F"
        strokeWidth="1"
        opacity="0.6"
      />
      {/* Gnomon (shadow caster) */}
      <line 
        x1="16" 
        y1="16" 
        x2="20" 
        y2="12"
        stroke="#2F4F4F"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Shadow */}
      <line 
        x1="16" 
        y1="16" 
        x2="22" 
        y2="20"
        stroke="#2F4F4F"
        strokeWidth="0.5"
        opacity="0.4"
      />
    </svg>
  )
}

// Hint/Lightbulb Icon - replaces 💡
export function IconHint({ size = 24, className = '' }: WIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      className={className}
      fill="none"
    >
      <defs>
        <linearGradient id="lanternGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFA500" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {/* Lantern body */}
      <path
        d="M10 12C10 8 12 4 16 4C20 4 22 8 22 12V20C22 24 20 26 16 26C12 26 10 24 10 20V12Z"
        fill="url(#lanternGlow)"
        stroke="#DAA520"
        strokeWidth="0.5"
      />
      {/* Light rays */}
      <line x1="16" y1="2" x2="16" y2="0" stroke="#FFD700" strokeWidth="1" opacity="0.6" />
      <line x1="8" y1="8" x2="6" y2="6" stroke="#FFD700" strokeWidth="1" opacity="0.6" />
      <line x1="24" y1="8" x2="26" y2="6" stroke="#FFD700" strokeWidth="1" opacity="0.6" />
    </svg>
  )
}

// Sound/Volume Icon
export function IconSound({ size = 24, className = '' }: WIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      className={className}
      fill="none"
    >
      {/* Speaker */}
      <path
        d="M6 12H10L18 6V26L10 20H6V12Z"
        fill="rgba(47, 79, 79, 0.4)"
        stroke="#2F4F4F"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Sound waves */}
      <path
        d="M22 10C24 12 24 20 22 22"
        stroke="#2F4F4F"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M26 8C29 12 29 20 26 24"
        stroke="#2F4F4F"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  )
}

// Lock Icon (for locked content)
export function IconLock({ size = 24, className = '' }: WIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      className={className}
      fill="none"
    >
      {/* Lock body */}
      <rect 
        x="6" 
        y="14" 
        width="20" 
        height="16" 
        rx="2"
        fill="rgba(128, 128, 128, 0.4)"
        stroke="#696969"
        strokeWidth="1"
      />
      {/* Lock shackle */}
      <path
        d="M10 14V10C10 6 12 4 16 4C20 4 22 6 22 10V14"
        fill="none"
        stroke="#696969"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Keyhole */}
      <circle cx="16" cy="20" r="2" fill="#696969" />
      <path d="M16 22V26" stroke="#696969" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// Unlock Icon
export function IconUnlock({ size = 24, className = '' }: WIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      className={className}
      fill="none"
    >
      {/* Lock body */}
      <rect 
        x="6" 
        y="14" 
        width="20" 
        height="16" 
        rx="2"
        fill="rgba(46, 139, 87, 0.3)"
        stroke="#2E8B57"
        strokeWidth="1"
      />
      {/* Lock shackle (open) */}
      <path
        d="M10 14V10C10 6 12 4 16 4C19 4 21 5 22 7"
        fill="none"
        stroke="#2E8B57"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Keyhole */}
      <circle cx="16" cy="20" r="2" fill="#2E8B57" />
      <path d="M16 22V26" stroke="#2E8B57" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// Rocket Icon
export function IconRocket({ size = 24, className = '' }: WIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
      <path d="M16 2L10 16H22L16 2Z" fill="#FFD700" stroke="#DAA520" strokeWidth="1.5" />
      <rect x="12" y="16" width="8" height="10" rx="2" fill="#9370DB" stroke="#7B68EE" strokeWidth="1.5" />
      <path d="M10 26L8 30H12L10 26Z" fill="#FF6347" />
      <path d="M22 26L24 30H20L22 26Z" fill="#FF6347" />
      <circle cx="16" cy="21" r="2" fill="#87CEEB" />
    </svg>
  )
}

// Planet Icon
export function IconPlanet({ size = 24, className = '' }: WIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
      <circle cx="16" cy="16" r="10" fill="#4169E1" stroke="#1E90FF" strokeWidth="1.5" />
      <ellipse cx="16" cy="16" rx="14" ry="4" fill="none" stroke="#87CEEB" strokeWidth="1.5" transform="rotate(-20 16 16)" />
      <circle cx="12" cy="14" r="2" fill="#90EE90" />
      <circle cx="20" cy="18" r="1.5" fill="#90EE90" />
    </svg>
  )
}

// Lightbulb Icon
export function IconLightbulb({ size = 24, className = '' }: WIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
      <path d="M16 2C10 2 6 6 6 12C6 17 10 21 11 23V27C11 28 12 29 13 29H19C20 29 21 28 21 27V23C22 21 26 17 26 12C26 6 22 2 16 2Z" fill="#FFD700" stroke="#DAA520" strokeWidth="1.5" />
      <rect x="12" y="29" width="8" height="2" rx="1" fill="#696969" />
      <line x1="10" y1="6" x2="12" y2="8" stroke="#FFF" strokeWidth="1" opacity="0.6" />
      <line x1="22" y1="6" x2="20" y2="8" stroke="#FFF" strokeWidth="1" opacity="0.6" />
    </svg>
  )
}

// Book Icon
export function IconBook({ size = 24, className = '' }: WIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
      <path d="M4 6C4 4 6 3 10 3C14 3 16 4 16 6V26C16 24 14 23 10 23C6 23 4 24 4 26V6Z" fill="#8B4513" stroke="#654321" strokeWidth="1.5" />
      <path d="M28 6C28 4 26 3 22 3C18 3 16 4 16 6V26C16 24 18 23 22 23C26 23 28 24 28 26V6Z" fill="#A0522D" stroke="#654321" strokeWidth="1.5" />
      <line x1="16" y1="6" x2="16" y2="26" stroke="#654321" strokeWidth="1.5" />
    </svg>
  )
}

// Leaf Icon
export function IconLeaf({ size = 24, className = '' }: WIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
      <path d="M16 2C8 2 2 10 2 18C2 24 6 28 12 30V28C8 26 6 22 6 18C6 12 10 6 16 6C22 6 26 12 26 18C26 22 24 26 20 28V30C26 28 30 24 30 18C30 10 24 2 16 2Z" fill="#228B22" stroke="#006400" strokeWidth="1.5" />
      <line x1="16" y1="6" x2="16" y2="30" stroke="#006400" strokeWidth="1" />
    </svg>
  )
}

// Tree Icon
export function IconTree({ size = 24, className = '' }: WIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
      <path d="M16 2L6 14H12V18H8L16 28L24 18H20V14H26L16 2Z" fill="#228B22" stroke="#006400" strokeWidth="1.5" />
      <rect x="14" y="26" width="4" height="4" fill="#8B4513" />
    </svg>
  )
}

// PlayerPlay Icon
export function IconPlayerPlay({ size = 24, className = '' }: WIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
      <circle cx="16" cy="16" r="14" fill="#4CAF50" stroke="#388E3C" strokeWidth="2" />
      <path d="M12 10L24 16L12 22V10Z" fill="white" />
    </svg>
  )
}

// Key Icon
export function IconKey({ size = 24, className = '' }: WIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
      <circle cx="10" cy="16" r="6" fill="#FFD700" stroke="#DAA520" strokeWidth="2" />
      <rect x="14" y="14" width="10" height="4" fill="#DAA520" />
      <rect x="22" y="14" width="4" height="6" fill="#DAA520" />
      <circle cx="10" cy="16" r="2" fill="#FFF" />
    </svg>
  )
}

// Trophy Icon - for achievements
export function IconTrophy({ size = 24, className = '' }: WIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
      <defs>
        <linearGradient id="trophyGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#DAA520" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      {/* Trophy cup */}
      <path
        d="M8 4H24V8C24 14 20 18 16 18C12 18 8 14 8 8V4Z"
        fill="url(#trophyGold)"
        stroke="#B8860B"
        strokeWidth="1"
      />
      {/* Handles */}
      <path
        d="M8 6C4 6 4 12 8 12"
        fill="none"
        stroke="#B8860B"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24 6C28 6 28 12 24 12"
        fill="none"
        stroke="#B8860B"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Base */}
      <rect x="12" y="18" width="8" height="4" fill="#DAA520" />
      <rect x="10" y="22" width="12" height="2" fill="#B8860B" />
    </svg>
  )
}

// Flame Icon - for streaks
export function IconFlame({ size = 24, className = '' }: WIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
      <defs>
        <linearGradient id="flameGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF4500" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#FF6347" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {/* Flame shape */}
      <path
        d="M16 30C10 30 6 24 6 18C6 12 10 8 12 4C12 8 14 10 16 10C18 10 20 8 20 4C22 8 26 12 26 18C26 24 22 30 16 30Z"
        fill="url(#flameGrad)"
        stroke="#FF4500"
        strokeWidth="0.5"
      />
      {/* Inner flame */}
      <path
        d="M16 26C12 26 10 22 10 18C10 14 12 12 14 10C14 12 15 14 16 14C17 14 18 12 18 10C20 12 22 14 22 18C22 22 20 26 16 26Z"
        fill="#FFD700"
        opacity="0.8"
      />
    </svg>
  )
}
