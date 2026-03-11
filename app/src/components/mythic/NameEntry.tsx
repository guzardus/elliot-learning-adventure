import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGameState } from '@/hooks/useGameState';
import backgroundImageUrl from '../../../assets/backgrounds/1773037465.png';

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
      setError('Please type at least 2 letters.');
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
        backgroundImage: `linear-gradient(180deg, rgba(2, 6, 23, 0.75) 0%, rgba(2, 6, 23, 0.55) 45%, rgba(2, 6, 23, 0.8) 100%), url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
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
            <img
              src="./images/wizard.png"
              alt="Friendly wizard"
              className="relative z-10 mx-auto rounded-full object-contain"
              style={{ width: '200px', height: '200px' }}
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-bold text-white mb-4"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Learning Adventure
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-blue-200 mb-8 text-lg"
        >
          Hi! What is your name?
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
            placeholder="Type your name..."
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
            Start
          </Button>
        </motion.form>
      </div>
    </motion.div>
  );
}