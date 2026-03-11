import { useGameState } from '@/hooks/useGameState';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Flame, 
  Star, 
  Backpack,
  Skull,
  Gem,
  Sparkles,
  BookOpen,
  Plus,
  Minus,
  X,
  Divide,
  FileText,
  Ruler,
  Shapes,
  SpellCheck,
  Quote,
  BookMarked
} from 'lucide-react';
import type { ActivityType } from '@/types';

interface AdventureHubProps {
  onSelectActivity: (activity: ActivityType) => void;
  onBossBattle: () => void;
  onViewCollection: () => void;
}

const modules: { id: ActivityType; name: string; description: string; icon: React.ReactNode; color: string }[] = [
  // Math Modules
  { 
    id: 'math-addition', 
    name: 'Addition Adventure', 
    description: 'Master the art of summoning numbers',
    icon: <Plus className="w-6 h-6" />,
    color: 'from-red-500 to-orange-500'
  },
  { 
    id: 'math-subtraction', 
    name: 'Subtraction Quest', 
    description: 'Learn to diminish and take away',
    icon: <Minus className="w-6 h-6" />,
    color: 'from-orange-500 to-amber-500'
  },
  { 
    id: 'math-multiplication', 
    name: 'Multiplication Trials', 
    description: 'Multiply your magical power',
    icon: <X className="w-6 h-6" />,
    color: 'from-yellow-500 to-lime-500'
  },
  { 
    id: 'math-division', 
    name: 'Division Dungeon', 
    description: 'Split and conquer with precision',
    icon: <Divide className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-500'
  },
  { 
    id: 'math-wordProblems', 
    name: 'Riddle Realms', 
    description: 'Solve magical word mysteries',
    icon: <FileText className="w-6 h-6" />,
    color: 'from-teal-500 to-cyan-500'
  },
  { 
    id: 'math-measurement', 
    name: 'Measurement Mines', 
    description: 'Measure the magical world',
    icon: <Ruler className="w-6 h-6" />,
    color: 'from-cyan-500 to-sky-500'
  },
  { 
    id: 'math-geometry', 
    name: 'Geometry Gardens', 
    description: 'Shape your magical abilities',
    icon: <Shapes className="w-6 h-6" />,
    color: 'from-blue-500 to-indigo-500'
  },
  // English Modules
  { 
    id: 'english-spelling', 
    name: 'Spelling Sanctum', 
    description: 'Enchant words with perfect spelling',
    icon: <SpellCheck className="w-6 h-6" />,
    color: 'from-indigo-500 to-purple-500'
  },
  { 
    id: 'english-grammar', 
    name: 'Grammar Grove', 
    description: 'Master the rules of magical language',
    icon: <BookMarked className="w-6 h-6" />,
    color: 'from-purple-500 to-fuchsia-500'
  },
  { 
    id: 'english-punctuation', 
    name: 'Punctuation Peaks', 
    description: 'Command the power of magical marks',
    icon: <Quote className="w-6 h-6" />,
    color: 'from-fuchsia-500 to-pink-500'
  },
  { 
    id: 'english-reading', 
    name: 'Reading Realms', 
    description: 'Decode ancient magical texts',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'from-pink-500 to-rose-500'
  },
];

export function AdventureHub({ onSelectActivity, onBossBattle, onViewCollection }: AdventureHubProps) {
  const { state, getLevelTitle, canCraftSuperItem, getLootCount } = useGameState();
  const { player, weekly, superItems, moduleProgress } = state;

  const xpProgress = (player.xp / player.xpToNextLevel) * 100;
  const completedModules = Object.values(moduleProgress).filter(m => m.completed).length;
  const totalModules = Object.keys(moduleProgress).length;

  return (
    <div className="min-h-screen p-4 md:p-6"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6"
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Wizard Avatar */}
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-4xl shadow-lg border-4 border-white/20"
                >
                  🧙‍♂️
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-sm font-bold shadow-lg border-2 border-white/20"
                >
                  {player.level}
                </div>
              </motion.div>

              {/* Player Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                  {player.name}
                </h1>
                <p className="text-blue-200 mb-3">
                  {getLevelTitle(player.level)} • Level {player.level}
                </p>
                
                {/* XP Bar */}
                <div className="w-full max-w-xs mx-auto md:mx-0">
                  <div className="flex justify-between text-xs text-white/60 mb-1">
                    <span>XP to next level</span>
                    <span>{player.xp}/{player.xpToNextLevel}</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${xpProgress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-4">
                <StatBadge 
                  icon={<Flame className="w-5 h-5 text-orange-400" />}
                  value={player.streak.current}
                  label="Streak"
                />
                <StatBadge 
                  icon={<Gem className="w-5 h-5 text-cyan-400" />}
                  value={getLootCount()}
                  label="Loot"
                />
                <StatBadge 
                  icon={<Sparkles className="w-5 h-5 text-purple-400" />}
                  value={superItems.length}
                  label="Crafted"
                />
              </div>
            </div>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Module Grid */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Overview */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                  Your Adventures
                </h2>
                <span className="text-white/60 text-sm">
                  {completedModules}/{totalModules} Complete
                </span>
              </div>
              
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedModules / totalModules) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>

            {/* Module Grid */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {modules.map((module, index) => {
                const progress = moduleProgress[module.id];
                const isCompleted = progress?.completed;
                const isInProgress = progress && progress.questionsAnswered > 0 && !progress.completed;
                
                return (
                  <motion.button
                    key={module.id}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectActivity(module.id)}
                    className={`relative p-5 rounded-2xl text-left transition-all border ${
                      isCompleted 
                        ? 'bg-green-500/20 border-green-500/30' 
                        : isInProgress
                        ? 'bg-yellow-500/20 border-yellow-500/30'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center text-white mb-3`}>
                      {module.icon}
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                      {module.name}
                    </h3>
                    
                    <p className="text-white/60 text-sm mb-3">
                      {module.description}
                    </p>

                    <div className="flex items-center justify-between">
                      {isCompleted ? (
                        <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                          <Trophy className="w-4 h-4" /> Complete
                        </span>
                      ) : isInProgress ? (
                        <span className="text-yellow-400 text-sm font-medium">
                          {progress.questionsAnswered}/10
                        </span>
                      ) : (
                        <span className="text-white/40 text-sm">10 Questions</span>
                      )}
                      
                      {isCompleted && (
                        <span className="text-2xl">✨</span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Weekly Boss */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-red-900/50 to-orange-900/50 rounded-2xl p-6 border border-red-500/30"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center text-3xl"
                  >
                    🐉
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                      Weekly Boss Battle
                    </h3>
                    <p className="text-white/60">
                      {weekly.bossDefeated 
                        ? 'Boss Defeated!' 
                        : `Boss Health: ${weekly.bossHealthRemaining}/100`}
                    </p>
                    <p className="text-white/40 text-xs mt-1">
                      15 challenging questions • Unlocks weekly
                    </p>
                  </div>
                </div>

                <button
                  onClick={onBossBattle}
                  disabled={weekly.bossDefeated}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl flex items-center gap-2"
                >
                  <Skull className="w-5 h-5" />
                  {weekly.bossDefeated ? 'Defeated' : 'Battle!'}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Loot Box Status */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`rounded-2xl p-6 border ${
                canCraftSuperItem() 
                  ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/50' 
                  : 'bg-white/5 border-white/10'
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  canCraftSuperItem() 
                    ? 'bg-gradient-to-br from-yellow-500 to-orange-500' 
                    : 'bg-white/10'
                }`}>
                  <Backpack className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Your Loot</h3>
                  <p className="text-white/60 text-sm">{getLootCount()} items collected</p>
                </div>
              </div>

              {/* Crafting Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/60">Crafting Progress</span>
                  <span className="text-white">{Math.min(getLootCount(), 10)}/10</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full ${canCraftSuperItem() ? 'bg-yellow-500' : 'bg-blue-500'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((getLootCount() / 10) * 100, 100)}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {canCraftSuperItem() && (
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="text-center p-3 bg-yellow-500/20 rounded-xl border border-yellow-500/30"
                >
                  <p className="text-yellow-400 font-medium text-sm">
                    ✨ Ready to craft a Super Item!
                  </p>
                  <p className="text-white/60 text-xs mt-1">
                    Open your loot box to craft
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Collection Button */}
            <motion.button
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={onViewCollection}
              className="w-full bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 text-left hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center"
                >
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Your Collection</h3>
                  <p className="text-white/60 text-sm">{superItems.length} super items crafted</p>
                </div>
              </div>
            </motion.button>

            {/* Weekly Progress */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <h3 className="font-bold text-white mb-4">This Week</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Adventures</span>
                  <span className="text-white">{weekly.sessionsCompleted}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Loot Earned</span>
                  <span className="text-white">{weekly.lootEarned.length}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Boss Status</span>
                  <span className={weekly.bossDefeated ? 'text-green-400' : 'text-red-400'}>
                    {weekly.bossDefeated ? 'Defeated!' : 'Waiting'}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white">Badges</h3>
                <Trophy className="w-5 h-5 text-yellow-400" />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {player.badges.length === 0 ? (
                  <p className="text-white/40 text-sm">Complete adventures to earn badges!</p>
                ) : (
                  player.badges.map((badge) => (
                    <div
                      key={badge.id}
                      className="w-10 h-10 bg-gradient-to-br from-yellow-500/50 to-orange-500/50 rounded-lg flex items-center justify-center text-lg"
                      title={badge.name}
                    >
                      {badge.icon}
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBadge({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <div className="flex flex-col items-center bg-white/5 rounded-xl px-4 py-2 border border-white/10">
      {icon}
      <span className="text-lg font-bold text-white mt-1">{value}</span>
      <span className="text-xs text-white/60">{label}</span>
    </div>
  );
}