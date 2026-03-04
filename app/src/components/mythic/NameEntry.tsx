import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGameState } from '@/hooks/useGameState';

interface NameEntryProps {
  onComplete: () => void;
}

export function NameEntry({ onComplete }: NameEntryProps) {
  const { setName } = useGameState();
  const [name, setNameInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError('Please enter a name with at least 2 characters');
      return;
    }
    setName(name.trim());
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
      }}
    >
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-30 rounded-full" />
            <Sparkles className="w-20 h-20 text-yellow-400 relative z-10 mx-auto" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-bold text-white mb-4"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Mythic Academy
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-blue-200 mb-8 text-lg"
        >
          Welcome, young hero. What is your name?
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <Input
            type="text"
            placeholder="Enter your name..."
            value={name}
            onChange={(e) => {
              setNameInput(e.target.value);
              setError('');
            }}
            className="text-center text-lg py-6 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            maxLength={20}
          />
          
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm"
            >
              {error}
            </motion.p>
          )}

          <Button
            type="submit"
            className="w-full py-6 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl"
          >
            Begin Your Journey
          </Button>
        </motion.form>
      </div>
    </motion.div>
  );
}