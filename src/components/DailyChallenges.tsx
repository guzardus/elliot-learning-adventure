// ============================================
// DAILY CHALLENGES COMPONENT
// ============================================

import React from 'react';
import { useDailyChallenges, useGamification } from '../hooks/useGamification';
import { DailyChallenge } from '../utils/gamificationTypes';

interface DailyChallengesProps {
  compact?: boolean;
  className?: string;
}

function getWorldIcon(world?: string): string {
  switch (world) {
    case 'math': return '🔢';
    case 'reading': return '📚';
    case 'grammar': return '🌌';
    default: return '';
  }
}

function ChallengeCard({ challenge, index }: { challenge: DailyChallenge; index: number }) {
  const progress = (challenge.current / challenge.target) * 100;
  
  return (
    <div 
      className={`p-4 rounded-xl border-2 transition-all ${
        challenge.completed 
          ? 'bg-green-50 border-green-300' 
          : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
          challenge.completed ? 'bg-green-500 text-white' : 'bg-gray-100'
        }`}>
          {challenge.completed ? '✓' : getWorldIcon(challenge.world)}
        </div>
        
        <div className="flex-1">
          <p className={`font-medium ${challenge.completed ? 'text-green-700 line-through' : 'text-gray-800'}`}>
            {challenge.description}
          </p>          
          
          <div className="mt-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{challenge.current} / {challenge.target}</span>
              <span className="font-bold text-amber-600">+{challenge.xpReward} XP</span>
            </div>            
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  challenge.completed 
                    ? 'bg-green-500' 
                    : 'bg-gradient-to-r from-amber-400 to-amber-500'
                }`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DailyChallenges({ compact = false, className = '' }: DailyChallengesProps) {
  const { challenges, completedCount, totalCount, allCompleted } = useDailyChallenges();

  if (compact) {
    return (
      <div className={`bg-white rounded-lg p-3 shadow-md ${className}`}>
        <div className="flex items-center justify-between">
          <span className="font-bold text-gray-700">Daily Challenges</span>
          <span className={`text-sm font-bold ${
            allCompleted ? 'text-green-600' : 'text-amber-600'
          }`}>
            {completedCount}/{totalCount}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-5 shadow-md ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl"></span>
          <h3 className="text-lg font-bold text-gray-800">Daily Challenges</h3>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`text-lg font-bold ${
            allCompleted ? 'text-green-600' : 'text-gray-600'
          }`}>
            {completedCount}/{totalCount}
          </span>
          {allCompleted && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              Complete!
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {challenges.map((challenge, index) => (
          <ChallengeCard 
            key={challenge.id} 
            challenge={challenge} 
            index={index}
          />
        ))}
      </div>

      {allCompleted && (
        <div className="mt-4 p-3 bg-green-100 rounded-lg text-center">
          <p className="text-green-700 font-bold">! All challenges complete! Come back tomorrow for more! !</p>
        </div>
      )}
    </div>
  );
}
