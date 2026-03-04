import { useGameState } from '@/hooks/useGameState';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Flame, 
  Star, 
  Coins, 
  BookOpen, 
  Calculator,
  Skull,
  Backpack,
  Swords,
  Zap
} from 'lucide-react';

interface DashboardProps {
  onSelectLand: (land: 'math' | 'english') => void;
  onBossBattle: () => void;
  onViewInventory: () => void;
}

export function Dashboard({ onSelectLand, onBossBattle, onViewInventory }: DashboardProps) {
  const { state, getLevelTitle, getCompanionStats } = useGameState();
  const { player, companions, weekly } = state;

  const xpProgress = (player.xp / player.xpToNextLevel) * 100;
  const selectedCompanions = companions.filter(c => player.selectedCompanions.includes(c.id));

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
              {/* Player Avatar */}
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-4xl shadow-lg border-4 border-white/20"
                >
                  👤
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
                    <span>XP to Next Level</span>
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
                  icon={<Coins className="w-5 h-5 text-yellow-400" />}
                  value={player.goldCoins}
                  label="Gold"
                />
                <StatBadge 
                  icon={<Star className="w-5 h-5 text-purple-400" />}
                  value={player.sparkleStars}
                  label="Stars"
                />
              </div>
            </div>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Companions */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                  Your Companions
                </h2>
                <span className="text-white/60 text-sm">{selectedCompanions.length}/3</span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {selectedCompanions.map((companion, index) => {
                  const stats = getCompanionStats(companion.id);
                  return (
                    <motion.div
                      key={companion.id}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="bg-white/5 rounded-xl p-4 text-center border border-white/10"
                    >
                      <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-purple-500/50 to-blue-500/50 rounded-full flex items-center justify-center text-3xl">
                        {companion.type === 'dragon' && '🐉'}
                        {companion.type === 'phoenix' && '🦅'}
                        {companion.type === 'unicorn' && '🦄'}
                        {companion.type === 'griffin' && '🦁'}
                        {companion.type === 'direwolf' && '🐺'}
                      </div>
                      <p className="text-white font-medium mb-2">{companion.name}</p>
                      
                      <div className="flex justify-center gap-2 text-xs">
                        <span className="text-orange-400 flex items-center gap-1">
                          <Swords className="w-3 h-3" />{stats.power}
                        </span>
                        <span className="text-blue-400 flex items-center gap-1">
                          <Zap className="w-3 h-3" />{stats.speed}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
                
                {selectedCompanions.length < 3 && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white/5 rounded-xl p-4 text-center border border-dashed border-white/20 flex items-center justify-center"
                  >
                    <p className="text-white/40 text-sm">Empty Slot</p>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Learning Lands */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <LandCard
                title="Math Realm"
                description="Master numbers and equations"
                icon={<Calculator className="w-8 h-8" />}
                gradient="from-red-500 to-orange-500"
                onClick={() => onSelectLand('math')}
              />
              
              <LandCard
                title="English Kingdom"
                description="Conquer words and grammar"
                icon={<BookOpen className="w-8 h-8" />}
                gradient="from-blue-500 to-cyan-500"
                onClick={() => onSelectLand('english')}
              />
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
                      Weekly Boss
                    </h3>
                    <p className="text-white/60">
                      {weekly.bossDefeated 
                        ? 'Boss defeated this week!' 
                        : `Boss Health: ${weekly.bossHealthRemaining}/100`}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onBossBattle}
                  disabled={weekly.bossDefeated}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl flex items-center gap-2"
                >
                  <Skull className="w-5 h-5" />
                  {weekly.bossDefeated ? 'Defeated!' : 'Challenge'}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Inventory Button */}
            <motion.button
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={onViewInventory}
              className="w-full bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 text-left hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center"
                >
                  <Backpack className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Inventory</h3>
                  <p className="text-white/60 text-sm">{state.inventory.length} items</p>
                </div>
              </div>
            </motion.button>

            {/* Weekly Progress */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <h3 className="font-bold text-white mb-4">Week {weekly.weekNumber} Progress</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Sessions</span>
                  <span className="text-white">{weekly.sessionsCompleted}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Loot Earned</span>
                  <span className="text-white">{weekly.lootEarned.length}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Boss Status</span>
                  <span className={weekly.bossDefeated ? 'text-green-400' : 'text-red-400'}>
                    {weekly.bossDefeated ? 'Defeated ✓' : 'Active'}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white">Badges</h3>
                <Trophy className="w-5 h-5 text-yellow-400" />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {player.badges.length === 0 ? (
                  <p className="text-white/40 text-sm">No badges yet. Complete challenges to earn them!</p>
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

interface LandCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  onClick: () => void;
}

function LandCard({ title, description, icon, gradient, onClick }: LandCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full p-6 rounded-2xl bg-gradient-to-br ${gradient} text-left relative overflow-hidden group`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform" />
      
      <div className="relative z-10">
        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-white mb-4">
          {icon}
        </div>
        
        <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Georgia, serif' }}>
          {title}
        </h3>
        
        <p className="text-white/80 text-sm">
          {description}
        </p>
      </div>
    </motion.button>
  );
}