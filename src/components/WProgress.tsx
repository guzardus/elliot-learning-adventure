'use client'

import { motion } from 'framer-motion'

interface WProgressProps {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  color?: 'math' | 'rainforest' | 'galaxy' | 'gold'
  showLabel?: boolean
  label?: string
  className?: string
}

export default function WProgress({
  value,
  max = 100,
  size = 'md',
  color = 'math',
  showLabel = false,
  label,
  className = '',
}: WProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  }

  const colorGradients = {
    math: 'from-mountain-purple/80 via-mountain-purple/60 to-misty-blue/40',
    rainforest: 'from-jade-green/80 via-jade-green/60 to-moss-wash/40',
    galaxy: 'from-nebula-purple/80 via-nebula-purple/60 to-cosmic-teal/40',
    gold: 'from-gold-accent/80 via-gold-accent/60 to-meteor-gold/40',
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {showLabel && (
        <div className="flex justify-between mb-2">
          <span className="font-patrick text-ink-grey">{label || 'Progress'}</span>
          <span className="font-caveat text-lg font-bold text-ink-black">
            {Math.round(percentage)}%
          </span>
        </div>
      )}

      {/* Progress track - pencil sketch style */}
      <div 
        className={`relative w-full ${sizeClasses[size]} rounded-full overflow-hidden`}
        style={{
          background: 'repeating-linear-gradient(90deg, rgba(47, 79, 79, 0.2) 0px, rgba(47, 79, 79, 0.2) 4px, transparent 4px, transparent 8px)',
        }}
      >
        {/* Fill - watercolor flow */}
        <motion.div
          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${colorGradients[color]}`}
          style={{
            filter: 'url(#watercolor-bleed)',
            borderRadius: '0 50% 50% 0',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ 
            duration: 1.2, 
            ease: [0.4, 0, 0.2, 1],
            delay: 0.2,
          }}
        />

        {/* Bloom effect at leading edge */}
        {percentage > 0 && percentage < 100 && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full"
            style={{
              left: `calc(${percentage}% - 12px)`,
              background: 'radial-gradient(circle, rgba(147, 112, 219, 0.5) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}

        {/* Occasional splatter (decorative) */}
        {percentage > 50 && (
          <motion.div
            className="absolute top-0 w-2 h-full"
            style={{
              left: `${percentage - 5}%`,
              background: 'linear-gradient(to right, transparent, rgba(123, 104, 238, 0.3), transparent)',
              filter: 'url(#watercolor-bleed)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          />
        )}
      </div>
    </div>
  )
}
