// ============================================
// ACHIEVEMENT TOAST COMPONENT
// ============================================

import React, { useState, useEffect, useCallback } from 'react';
import { Badge } from '@/data/badges';

export interface Toast {
  id: string;
  type: 'levelup' | 'badge' | 'challenge' | 'streak';
  title: string;
  message: string;
  xp?: number;
  badge?: Badge;
  streak?: number;
}

interface SingleToastProps {
  toast: Toast;
  onClose: () => void;
}

function SingleToast({ toast, onClose }: SingleToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (toast.type) {
      case 'levelup': return '';
      case 'badge': return '';
      case 'challenge': return '';
      case 'streak': return '';
      default: return '!';
    }
  };

  const getBgColor = () => {
    switch (toast.type) {
      case 'levelup': return 'from-amber-400 to-orange-500';
      case 'badge': return 'from-purple-400 to-pink-500';
      case 'challenge': return 'from-green-400 to-emerald-500';
      case 'streak': return 'from-red-400 to-orange-500';
      default: return 'from-blue-400 to-purple-500';
    }
  };

  return (
    <div 
      className={`transition-all duration-300 transform ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className={`
        bg-gradient-to-r ${getBgColor()} text-white rounded-xl p-4 shadow-2xl
        min-w-[300px] max-w-[400px]
      `}>
        <div className="flex items-start gap-3">
          <div className="text-4xl">{getIcon()}</div>
          
          <div className="flex-1">
            <h4 className="font-bold text-lg">{toast.title}</h4>
            <p className="text-white/90 text-sm mt-1">{toast.message}</p>
            {toast.xp && (
              <div className="mt-2 inline-flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm font-bold">
                <span>+{toast.xp} XP</span>
              </div>
            )}
            {toast.badge && (
              <div className="mt-2 flex items-center gap-2 bg-white/20 px-3 py-2 rounded-lg">
                <span className="text-2xl">{toast.badge.icon}</span>
                <span className="font-medium">{toast.badge.name}</span>
              </div>
            )}
            {toast.streak && (
              <div className="mt-2 text-2xl">
                {''.repeat(Math.min(toast.streak, 5))}
              </div>
            )}
          </div>
          
          <button 
            onClick={() => {
              setVisible(false);
              setTimeout(onClose, 300);
            }}
            className="text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// HOOK FOR MANAGING TOASTS
// ============================================

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(7);
    setToasts(prev => [...prev, { ...toast, id }]);
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showLevelUp = useCallback((level: number, totalXP: number) => {
    return addToast({
      type: 'levelup',
      title: 'Level Up!',
      message: `Congratulations! You reached Level ${level}!`,
      xp: totalXP,
    });
  }, [addToast]);

  const showBadgeUnlock = useCallback((badge: Badge) => {
    return addToast({
      type: 'badge',
      title: 'Badge Unlocked!',
      message: `You earned the ${badge.name} badge!`,
      badge,
    });
  }, [addToast]);

  const showChallengeComplete = useCallback((challengeName: string, xpReward: number) => {
    return addToast({
      type: 'challenge',
      title: 'Challenge Complete!',
      message: `You completed: ${challengeName}`,
      xp: xpReward,
    });
  }, [addToast]);

  const showStreakMilestone = useCallback((streak: number) => {
    return addToast({
      type: 'streak',
      title: 'Streak Milestone!',
      message: `Amazing! You've kept your ${streak}-day streak alive!`,
      streak,
    });
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    showLevelUp,
    showBadgeUnlock,
    showChallengeComplete,
    showStreakMilestone,
  };
}

// ============================================
// TOAST CONTAINER COMPONENT
// ============================================

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
      {toasts.map((toast, index) => (
        <div 
          key={toast.id}
          style={{ 
            transform: `translateY(${index * 10}px)`,
            zIndex: toasts.length - index 
          }}
          className="transition-all duration-300"
        >
          <SingleToast toast={toast} onClose={() => onRemove(toast.id)} />
        </div>
      ))}
    </div>
  );
}

export { SingleToast };
