import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface CelebrationProps {
  message: string;
  onComplete: () => void;
}

export function Celebration({ message, onComplete }: CelebrationProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Generate random confetti pieces
  const confetti = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    color: ['#F4A698', '#8FB996', '#A8D5E5', '#F9E076', '#D4C5E8'][Math.floor(Math.random() * 5)],
  }));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {/* Confetti */}
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute w-3 h-3 rounded-full"
            style={{ 
              left: `${piece.x}%`,
              backgroundColor: piece.color,
            }}
            initial={{ y: -20, opacity: 1, rotate: 0 }}
            animate={{ 
              y: '100vh', 
              opacity: 0,
              rotate: 360 + Math.random() * 360,
            }}
            transition={{ 
              duration: 2 + Math.random(),
              delay: piece.delay,
              ease: 'linear'
            }}
          />
        ))}

        {/* Message */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
        >
          <motion.div
            className="bg-white rounded-3xl px-8 py-6 shadow-2xl"
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              repeat: 2,
              duration: 0.5
            }}
          >
            <p className="text-3xl font-bold text-soft-coral">{message}</p>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
