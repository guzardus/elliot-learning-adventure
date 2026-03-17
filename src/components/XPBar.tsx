// ============================================
// XP BAR COMPONENT
// ============================================

import React from 'react';
import { useXPProgress } from '../hooks/useGamification';

interface XPBarProps {
  showLevel?: boolean;
  showXP?: boolean;
  compact?: boolean;
  className?: string;
}

export function XPBar({ 
  showLevel = true, 
  showXP = true, 
  compact = false,
  className = '' 
}: XPBarProps) {
  const { xp, level, xpForNextLevel, progress } = useXPProgress();

  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {showLevel && (
          <span className="text-sm font-bold text-amber-600">
            Lvl {level}
          </span>
        )}
        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl p-4 shadow-md ${className}`}>
      <div className="flex items-center justify-between mb-2">
        {showLevel && (
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-amber-600">Level {level}</span>
            <span className="text-2xl"></span>
          </div>
        )}
        {showXP && (
          <span className="text-sm text-gray-600">
            {xpForNextLevel} XP to next level
          </span>
        )}
      </div>
      
      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-white opacity-20 animate-pulse" />
        </div>
      </div>
      
      {showXP && (
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>{xp.toLocaleString()} XP</span>
          <span>{(xp + xpForNextLevel).toLocaleString()} XP</span>
        </div>
      )}
    </div>
  );
}
