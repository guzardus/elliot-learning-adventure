'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface WInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  type?: 'text' | 'number' | 'email'
  disabled?: boolean
  className?: string
}

export default function WInput({
  value,
  onChange,
  placeholder,
  label,
  type = 'text',
  disabled = false,
  className = '',
}: WInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {label && (
        <label className="block font-patrick text-lg text-ink-grey mb-2">
          {label}
        </label>
      )}

      {/* Input container */}
      <motion.div
        className="relative"
        animate={{
          scale: isFocused ? 1.01 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Paper background */}
        <div 
          className="absolute inset-0 rounded-sm"
          style={{
            background: `
              url(/textures/paper-cold-press.svg),
              rgba(255, 250, 250, 0.95)
            `,
            backgroundBlendMode: 'multiply',
          }}
        />

        {/* Watercolor wash on focus */}
        <motion.div
          className="absolute inset-0 rounded-sm pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(123, 104, 238, 0.1) 0%, transparent 100%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isFocused ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Input field */}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          placeholder={placeholder}
          className={`
            relative w-full px-4 py-3
            font-patrick text-xl text-ink-black
            bg-transparent
            border-0 border-b-2
            focus:outline-none
            disabled:opacity-50 disabled:cursor-not-allowed
            placeholder:text-ink-grey/40 placeholder:italic
          `}
          style={{
            borderImage: isFocused 
              ? 'linear-gradient(90deg, transparent 0%, rgba(123, 104, 238, 0.8) 20%, rgba(123, 104, 238, 0.8) 80%, transparent 100%) 1'
              : 'linear-gradient(90deg, transparent 0%, rgba(47, 79, 79, 0.4) 20%, rgba(47, 79, 79, 0.4) 80%, transparent 100%) 1',
            borderImageSlice: 1,
          }}
        />

        {/* Animated underline on focus */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-mountain-purple to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: isFocused ? 1 : 0,
            opacity: isFocused ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{ originX: 0.5 }}
        />
      </motion.div>
    </div>
  )
}
