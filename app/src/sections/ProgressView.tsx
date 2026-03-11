import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Target, TrendingUp, Clock, Star, BookOpen, Calculator } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';

interface ProgressViewProps {
  onBack: () => void;
}

export function ProgressView({ onBack }: ProgressViewProps) {
  const { state, getAccuracy, getLevelTitle } = useGameState();
  const { player, progress } = state;

  const overallAccuracy = getAccuracy();

  const skillCategories = [
    {
      title: 'Math Skills',
      icon: Calculator,
      color: 'soft-coral',
      skills: [
        { name: 'Addition', key: 'math.addition', icon: '➕' },
        { name: 'Subtraction', key: 'math.subtraction', icon: '➖' },
        { name: 'Multiplication', key: 'math.multiplication', icon: '✖️' },
        { name: 'Division', key: 'math.division', icon: '➗' },
        { name: 'Word Problems', key: 'math.wordProblems', icon: '📖' },
        { name: 'Measurement', key: 'math.measurement', icon: '📏' },
        { name: 'Geometry', key: 'math.geometry', icon: '🔷' },
      ]
    },
    {
      title: 'English Skills',
      icon: BookOpen,
      color: 'sage-green',
      skills: [
        { name: 'Spelling', key: 'english.spelling', icon: '✏️' },
        { name: 'Grammar', key: 'english.grammar', icon: '📝' },
        { name: 'Punctuation', key: 'english.punctuation', icon: '❓' },
        { name: 'Writing', key: 'english.writing', icon: '📄' },
        { name: 'Reading', key: 'english.reading', icon: '📚' },
      ]
    }
  ];

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gradient-to-br from-cream via-white to-cream">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-6">
        <div className="flex items-center gap-4">
          <motion.button
            onClick={onBack}
            className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-6 h-6 text-charcoal" />
          </motion.button>
          <h1 className="text-3xl font-bold text-charcoal">Your Progress</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard 
            icon={<Trophy className="w-6 h-6 text-warm-yellow" />}
            value={player.level}
            label={`Level (${getLevelTitle(player.level)})`}
            color="bg-warm-yellow/20"
          />
          <StatCard 
            icon={<Target className="w-6 h-6 text-soft-coral" />}
            value={`${overallAccuracy}%`}
            label="Right answers"
            color="bg-soft-coral/20"
          />
          <StatCard 
            icon={<TrendingUp className="w-6 h-6 text-sage-green" />}
            value={progress.totalQuestionsAnswered}
            label="Questions done"
            color="bg-sage-green/20"
          />
          <StatCard 
            icon={<Clock className="w-6 h-6 text-sky-blue" />}
            value={`${Math.floor(progress.timeSpentMinutes / 60)}h ${progress.timeSpentMinutes % 60}m`}
            label="Time"
            color="bg-sky-blue/20"
          />
        </div>

        {/* XP Progress */}
        <div className="watercolour-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-charcoal flex items-center gap-2">
              <Star className="w-5 h-5 text-warm-yellow" />
              XP
            </h3>
            <span className="text-sm text-warm-gray">
              {player.xp} / {player.xpToNextLevel} XP
            </span>
          </div>
          <div className="progress-bar h-4">
            <motion.div 
              className="progress-fill h-4"
              initial={{ width: 0 }}
              animate={{ width: `${(player.xp / player.xpToNextLevel) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-sm text-warm-gray mt-2 text-center">
            {player.xpToNextLevel - player.xp} XP to level {player.level + 1}
          </p>
        </div>

        {/* Skills Breakdown */}
        {skillCategories.map((category) => (
          <div key={category.title} className="watercolour-card p-6">
            <h3 className="text-lg font-bold text-charcoal mb-4 flex items-center gap-2">
              <category.icon className={`w-5 h-5 text-${category.color}`} />
              {category.title}
            </h3>
            <div className="space-y-4">
              {category.skills.map((skill) => {
                const accuracy = getAccuracy(skill.key);
                const [cat, subSkill] = skill.key.split('.') as ['math' | 'english', string];
                const categoryData = progress[cat];
                const skillData = categoryData?.[subSkill as keyof typeof categoryData] as { 
                  questionsAnswered: number;
                } | undefined;
                
                return (
                  <div key={skill.key} className="flex items-center gap-4">
                    <span className="text-2xl">{skill.icon}</span>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-charcoal">{skill.name}</span>
                        <span className="text-sm text-warm-gray">
                          {skillData?.questionsAnswered || 0} done
                        </span>
                      </div>
                      <div className="progress-bar h-2">
                        <div 
                          className="progress-fill h-2"
                          style={{ 
                            width: `${accuracy}%`,
                            background: accuracy >= 80 ? 'var(--sage-green)' : 
                                       accuracy >= 50 ? 'var(--warm-yellow)' : 'var(--soft-coral)'
                          }}
                        />
                      </div>
                    </div>
                    <span className={`text-sm font-bold ${
                      accuracy >= 80 ? 'text-sage-green' : 
                      accuracy >= 50 ? 'text-warm-yellow' : 'text-soft-coral'
                    }`}>
                      {accuracy}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Badges */}
        <div className="watercolour-card p-6">
          <h3 className="text-lg font-bold text-charcoal mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-warm-yellow" />
            Badges
          </h3>
          {player.badges.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {player.badges.map((badge) => (
                <motion.div 
                  key={badge.id}
                  className="bg-gradient-to-br from-warm-yellow/20 to-soft-coral/20 rounded-xl p-4 text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <p className="font-bold text-charcoal text-sm">{badge.name}</p>
                  <p className="text-xs text-warm-gray">{badge.description}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-warm-gray text-center py-8">
              Play games to earn badges! 🏆
            </p>
          )}
        </div>

        {/* Streak Info */}
        <div className="watercolour-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🔥</div>
              <div>
                <h3 className="text-lg font-bold text-charcoal">Days in a row</h3>
                <p className="text-warm-gray">
                  Now: {player.streak.current} • Best: {player.streak.longest}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-warm-gray">Freezes</p>
              <p className="text-xl font-bold text-sage-green">{player.streak.freezesRemaining}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ 
  icon, 
  value, 
  label, 
  color 
}: { 
  icon: React.ReactNode; 
  value: string | number; 
  label: string;
  color: string;
}) {
  return (
    <div className={`${color} rounded-2xl p-4 text-center`}>
      <div className="flex justify-center mb-2">{icon}</div>
      <p className="text-2xl font-bold text-charcoal">{value}</p>
      <p className="text-xs text-warm-gray">{label}</p>
    </div>
  );
}
