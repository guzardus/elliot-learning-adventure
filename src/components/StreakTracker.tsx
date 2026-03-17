// ============================================
// STREAK TRACKER COMPONENT
// ============================================

import React from 'react';
import { useStreak } from '../hooks/useGamification';

interface StreakTrackerProps {
  compact?: boolean;
  className?: string;
}

export function StreakTracker({ compact = false, className = '' }: StreakTrackerProps) {
  const { current, longest, multiplier } = useStreak();

  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-2xl"></span>
        <span className="text-sm font-bold text-orange-600">
          {current} day{current !== 1 && 's'}
        </span>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 shadow-md ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-4xl"></div>
          <div>
            <div className="text-2xl font-bold text-orange-700">
              {current} Day Streak!
            </div>
            <div className="text-sm text-orange-600">
              Longest: {longest} days
            </div>
          </div>
        </div>
        
        {multiplier > 1 && (
          <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            {multiplier}x XP
          </div>
        )}
      </div>
      
      {/* Streak Visualizer */}
      <div className="mt-4">
        <div className="flex gap-1">
          {Array.from({ length: 7 }).map((_, i) => {
            const dayFilled = i < (current % 7 || 7);
            return (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full transition-all ${
                  dayFilled 
                    ? 'bg-gradient-to-r from-orange-400 to-red-400' 
                    : 'bg-gray-200'
                }`}
              />
            );
          })}
        </div>        
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>Keep it up!</span>
          <span>7 days = 1.5x XP</span>
        </div>
      </div>
    </div>
  );
}
