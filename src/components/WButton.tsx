'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface WButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
  icon?: ReactNode
}

export default function WButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  icon,
}: WButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-lg',
    md: 'px-6 py-3 text-xl',
    lg: 'px-8 py-4 text-2xl',
  }

  const variantStyles = {
    primary: {
      background: 'linear-gradient(135deg, rgba(123, 104, 238, 0.7) 0%, rgba(147, 112, 219, 0.5) 100%)',
      hoverBg: 'linear-gradient(135deg, rgba(123, 104, 238, 0.85) 0%, rgba(147, 112, 219, 0.65) 100%)',
    },
    secondary: {
      background: 'linear-gradient(135deg, rgba(47, 79, 79, 0.6) 0%, rgba(128, 128, 128, 0.4) 100%)',
      hoverBg: 'linear-gradient(135deg, rgba(47, 79, 79, 0.75) 0%, rgba(128, 128, 128, 0.55) 100%)',
    },
    ghost: {
      background: 'transparent',
      hoverBg: 'rgba(123, 104, 238, 0.1)',
    },
    icon: {
      background: 'linear-gradient(135deg, rgba(218, 165, 32, 0.8) 0%, rgba(255, 215, 0, 0.6) 100%)',
      hoverBg: 'linear-gradient(135deg, rgba(218, 165, 32, 0.95) 0%, rgba(255, 215, 0, 0.75) 100%)',
    },
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative font-caveat font-semibold
        tracking-wider text-ink-black
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-2 focus:ring-mountain-purple/30
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${className}
      `}
      style={{
        clipPath: 'polygon(5% 0%, 95% 2%, 100% 50%, 94% 98%, 6% 100%, 0% 50%)',
        background: variantStyles[variant].background,
        filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.15))',
      }}
      whileHover={{
        scale: disabled ? 1 : 1.02,
        background: variantStyles[variant].hoverBg,
      }}
      whileTap={{
        scale: disabled ? 1 : 0.98,
        filter: 'drop-shadow(1px 2px 3px rgba(0,0,0,0.2))',
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Paper texture overlay */}
      <span 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'url(/textures/paper-grain.svg)',
          mixBlendMode: 'overlay',
        }}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </span>
    </motion.button>
  )
}
