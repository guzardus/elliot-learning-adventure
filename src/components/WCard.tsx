'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface WCardProps {
  children: ReactNode
  variant?: 'default' | 'world' | 'achievement' | 'activity'
  worldColor?: 'math' | 'rainforest' | 'galaxy'
  className?: string
  onClick?: () => void
}

export default function WCard({
  children,
  variant = 'default',
  worldColor = 'math',
  className = '',
  onClick,
}: WCardProps) {
  const worldGradients = {
    math: 'linear-gradient(135deg, rgba(123, 104, 238, 0.15) 0%, rgba(147, 112, 219, 0.08) 100%)',
    rainforest: 'linear-gradient(135deg, rgba(46, 139, 87, 0.15) 0%, rgba(143, 188, 143, 0.08) 100%)',
    galaxy: 'linear-gradient(135deg, rgba(25, 25, 112, 0.2) 0%, rgba(147, 112, 219, 0.1) 100%)',
  }

  const variantBorders = {
    default: 'border-ink-grey/10',
    world: `border-${worldColor === 'math' ? 'mountain-purple' : worldColor === 'rainforest' ? 'jade-green' : 'midnight-indigo'}/20`,
    achievement: 'border-gold-accent/30',
    activity: 'border-tropical-teal/20',
  }

  return (
    <motion.div
      onClick={onClick}
      className={`
        relative p-6 
        bg-watercolor-white/95
        ${variantBorders[variant]}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      style={{
        clipPath: 'polygon(0% 5%, 3% 0%, 97% 2%, 100% 8%, 98% 95%, 95% 100%, 5% 98%, 2% 92%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.05)',
      }}
      whileHover={onClick ? {
        y: -2,
        boxShadow: '0 8px 30px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.08)',
      } : {}}
      transition={{ duration: 0.3 }}
    >
      {/* Paper texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15 rounded-sm"
        style={{
          backgroundImage: 'url(/textures/paper-cold-press.svg)',
          mixBlendMode: 'multiply',
        }}
      />

      {/* Watercolor wash overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: worldGradients[worldColor],
          clipPath: 'polygon(0% 5%, 3% 0%, 97% 2%, 100% 8%, 98% 95%, 95% 100%, 5% 98%, 2% 92%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}
