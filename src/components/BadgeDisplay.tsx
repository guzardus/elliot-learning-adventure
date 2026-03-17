// ============================================
// BADGE DISPLAY COMPONENT - Updated for SVG Icons
// ============================================

import React, { useState } from 'react';
import { useGamificationContext } from './GamificationProvider';
import { Badge } from '@/data/badges';
import { BADGE_ICONS, DefaultBadgeIcon } from './BadgeIcons';

interface BadgeDisplayProps {
  compact?: boolean;
  className?: string;
}

function getRarityColor(rarity: Badge['rarity']): string {
  switch (rarity) {
    case 'common': return 'from-gray-400 to-gray-500';
    case 'rare': return 'from-blue-400 to-blue-500';
    case 'epic': return 'from-purple-400 to-purple-500';
    case 'legendary': return 'from-amber-400 to-orange-500';
    default: return 'from-gray-400 to-gray-500';
  }
}

function getRarityBorder(rarity: Badge['rarity']): string {
  switch (rarity) {
    case 'common': return 'border-gray-300';
    case 'rare': return 'border-blue-300';
    case 'epic': return 'border-purple-300';
    case 'legendary': return 'border-amber-400';
    default: return 'border-gray-300';
  }
}

function BadgeIconComponent({ badge, size = 48 }: { badge: Badge; size?: number }) {
  const IconComponent = BADGE_ICONS[badge.id] || DefaultBadgeIcon;
  return <IconComponent size={size} />;
}

function BadgeCard({ badge, unlocked }: { badge: Badge; unlocked: boolean }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div 
      className={`relative group cursor-pointer transition-all duration-300 ${
        unlocked ? 'opacity-100' : 'opacity-50 grayscale'
      }`}
      onClick={() => setShowDetails(!showDetails)}
    >
      <div className={`
        p-4 rounded-xl border-2 ${getRarityBorder(badge.rarity)}
        ${unlocked ? 'bg-white shadow-md' : 'bg-gray-100'}
        transition-all hover:scale-105
      `}>
        <div className="mb-2 text-center">
          <BadgeIconComponent badge={badge} size={48} />
        </div>
        
        <h4 className={`font-bold text-center text-sm ${
          unlocked ? 'text-gray-800' : 'text-gray-500'
        }`}>
          {badge.name}
        </h4>
        
        <div className={`
          absolute inset-x-0 -bottom-2 mx-auto w-max px-2 py-1 rounded text-xs font-bold
          bg-gradient-to-r ${getRarityColor(badge.rarity)} text-white
          opacity-0 group-hover:opacity-100 transition-opacity
        `}>
          {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
        </div>
      </div>

      {/* Tooltip */}
      {showDetails && (
        <div className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-gray-800 text-white text-sm rounded-lg shadow-xl">
          <p className="font-bold mb-1">{badge.name}</p>
          <p className="text-gray-300 text-xs mb-2">{badge.description}</p>
          <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold bg-gradient-to-r ${getRarityColor(badge.rarity)}`}>
            {badge.rarity.toUpperCase()}
          </span>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45">
          </div>
        </div>
      )}
    </div>
  );
}

export function BadgeDisplay({ compact = false, className = '' }: BadgeDisplayProps) {
  const actions = useGamificationContext();
  const [activeTab, setActiveTab] = useState<'all' | 'unlocked' | 'locked'>('all');
  
  const unlockedBadges = actions.getUnlockedBadges();
  const lockedBadges = actions.getLockedBadges();
  
  const displayBadges = activeTab === 'unlocked' 
    ? unlockedBadges 
    : activeTab === 'locked' 
    ? lockedBadges 
    : [...unlockedBadges, ...lockedBadges];

  if (compact) {
    return (
      <div className={`bg-white rounded-lg p-3 shadow-md ${className}`}>
        <div className="flex items-center justify-between">
          <span className="font-bold text-gray-700">Badges</span>
          <span className="text-sm font-bold text-amber-600">
            {unlockedBadges.length} / {displayBadges.length}
          </span>
        </div>
        <div className="flex gap-1 mt-2">
          {unlockedBadges.slice(0, 5).map(badge => (
            <div key={badge.id} className="w-8 h-8">
              <BadgeIconComponent badge={badge} size={32} />
            </div>
          ))}
          {unlockedBadges.length > 5 && (
            <span className="text-gray-400 text-sm">+{unlockedBadges.length - 5}</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-5 shadow-md ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏆</span>
          <h3 className="text-lg font-bold text-gray-800">Badge Collection</h3>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-600">
            {unlockedBadges.length}
          </span>
          <span className="text-gray-400">/</span>
          <span className="text-sm text-gray-400">{displayBadges.length}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {(['all', 'unlocked', 'locked'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab 
                ? 'bg-amber-500 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {displayBadges.map(badge => (
          <BadgeCard 
            key={badge.id} 
            badge={badge}
            unlocked={unlockedBadges.some(b => b.id === badge.id)}
          />
        ))}
      </div>

      {unlockedBadges.length === 0 && activeTab !== 'locked' && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-lg mb-2">🎯</div>
          <p>Start playing to unlock your first badge!</p>
        </div>
      )}
    </div>
  );
}
