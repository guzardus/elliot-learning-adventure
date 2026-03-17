'use client'

import { useState } from 'react'
import { ParentNav } from '@/components/parent/ParentNav'
import { useGamificationContext } from '@/components/GamificationProvider'
import { Badge, BADGE_DEFINITIONS, getBadgesByCategory } from '@/data/badges'
import { BADGE_ICONS, DefaultBadgeIcon } from '@/components/BadgeIcons'
import { format } from 'date-fns'

type TabType = 'all' | 'math' | 'reading' | 'grammar' | 'streak' | 'general'

const TABS: { id: TabType; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'unlocked', label: 'Unlocked' },
  { id: 'locked', label: 'Locked' },
]

const CATEGORIES: { id: Badge['category']; label: string; color: string }[] = [
  { id: 'math', label: 'Math', color: 'bg-purple-100 text-purple-700' },
  { id: 'reading', label: 'Reading', color: 'bg-green-100 text-green-700' },
  { id: 'grammar', label: 'Grammar', color: 'bg-blue-100 text-blue-700' },
  { id: 'streak', label: 'Streak', color: 'bg-orange-100 text-orange-700' },
  { id: 'general', label: 'General', color: 'bg-gray-100 text-gray-700' },
]

function getRarityStyle(rarity: Badge['rarity']) {
  switch (rarity) {
    case 'common':
      return 'from-gray-300 to-gray-400'
    case 'rare':
      return 'from-blue-300 to-blue-400'
    case 'epic':
      return 'from-purple-300 to-purple-400'
    case 'legendary':
      return 'from-amber-300 to-amber-400'
    default:
      return 'from-gray-300 to-gray-400'
  }
}

export default function BadgesPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'unlocked' | 'locked'>('all')
  const [selectedCategory, setSelectedCategory] = useState<Badge['category'] | 'all'>('all')
  
  const { player, getUnlockedBadges, getLockedBadges } = useGamificationContext()
  const unlockedBadges = getUnlockedBadges()
  const lockedBadges = getLockedBadges()
  
  // Filter badges based on tab and category
  let displayBadges: Badge[] = []
  
  if (activeTab === 'unlocked') {
    displayBadges = unlockedBadges
  } else if (activeTab === 'locked') {
    displayBadges = lockedBadges
  } else {
    displayBadges = BADGE_DEFINITIONS
  }
  
  if (selectedCategory !== 'all') {
    displayBadges = displayBadges.filter(b => b.category === selectedCategory)
  }
  
  const isUnlocked = (badgeId: string) => unlockedBadges.some(b => b.id === badgeId)

  return (
    <div className="min-h-screen bg-gray-50">
      <ParentNav />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Badge Collection</h2>
              <p className="text-gray-600">
                {unlockedBadges.length} of {BADGE_DEFINITIONS.length} badges earned
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-amber-600">
                {Math.round((unlockedBadges.length / BADGE_DEFINITIONS.length) * 100)}%
              </div>
              <p className="text-sm text-gray-500">Complete</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all"
              style={{ width: `${(unlockedBadges.length / BADGE_DEFINITIONS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex gap-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="h-6 w-px bg-gray-300" />
          
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                selectedCategory === 'all'
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Categories
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  selectedCategory === cat.id
                    ? cat.color
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Badge Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {displayBadges.map((badge) => {
            const unlocked = isUnlocked(badge.id)
            const IconComponent = BADGE_ICONS[badge.id] || DefaultBadgeIcon
            
            return (
              <div
                key={badge.id}
                className={`group relative bg-white rounded-xl p-4 border-2 transition-all ${
                  unlocked 
                    ? 'border-gray-200 shadow-sm hover:shadow-md' 
                    : 'border-gray-100 opacity-60 grayscale'
                }`}
              >
                {/* Badge Icon */}
                <div className="flex justify-center mb-3">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getRarityStyle(badge.rarity)} p-0.5`}>
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <IconComponent size={40} />
                    </div>
                  </div>
                </div>
                
                {/* Badge Info */}
                <div className="text-center">
                  <h3 className={`font-bold text-sm mb-1 ${unlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                    {badge.name}
                  </h3>
                  
                  <p className="text-xs text-gray-500 mb-2">{badge.description}</p>
                  
                  <div className="flex items-center justify-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      CATEGORIES.find(c => c.id === badge.category)?.color
                    }`}>
                      {CATEGORIES.find(c => c.id === badge.category)?.label}
                    </span>
                    
                    <span className="text-xs text-gray-400 capitalize">{badge.rarity}</span>
                  </div>
                </div>
                
                {/* Unlocked Date (mock) */}
                {unlocked && (
                  <div className="mt-3 pt-3 border-t border-gray-100 text-center">
                    <p className="text-xs text-gray-400">
                      Unlocked {format(new Date(), 'MMM d, yyyy')}
                    </p>
                  </div>
                )}
                
                {/* Hover Tooltip */}
                <div className="absolute inset-0 bg-gray-800 text-white p-4 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  <p className="font-bold mb-1">{badge.name}</p>
                  <p className="text-sm text-gray-300 mb-2">{badge.description}</p>
                  <p className="text-xs">
                    {unlocked ? '✓ Unlocked' : '🔒 Locked - Keep playing to earn!'}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {displayBadges.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 mb-2">No badges found</p>
            <p className="text-gray-400">Try changing your filters</p>
          </div>
        )}
      </main>
    </div>
  )
}
