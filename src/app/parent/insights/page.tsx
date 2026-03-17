'use client'

import { ParentNav } from '@/components/parent/ParentNav'
import { useGamificationContext } from '@/components/GamificationProvider'
import { format, subDays } from 'date-fns'

interface Insight {
  type: 'strength' | 'improvement' | 'pattern' | 'recommendation' | 'milestone'
  title: string
  description: string
  action?: string
}

function generateInsights(player: ReturnType<typeof useGamificationContext>['player']): Insight[] {
  const insights: Insight[] = []
  
  const { worldProgress, stats, level, streak } = player
  
  // XP Analysis
  const totalXP = worldProgress.math.xp + worldProgress.reading.xp + worldProgress.grammar.xp
  const mathRatio = totalXP > 0 ? (worldProgress.math.xp / totalXP) * 100 : 0
  const readingRatio = totalXP > 0 ? (worldProgress.reading.xp / totalXP) * 100 : 0
  const grammarRatio = totalXP > 0 ? (worldProgress.grammar.xp / totalXP) * 100 : 0
  
  // Subject Balance
  if (mathRatio > 50) {
    insights.push({
      type: 'strength',
      title: 'Math Whiz!',
      description: `Elliot is spending ${Math.round(mathRatio)}% of their time in Math Mountains. They have a strong affinity for numbers and problem-solving.`,
    })
  } else if (readingRatio > 50) {
    insights.push({
      type: 'strength',
      title: 'Reading Champion',
      description: `With ${Math.round(readingRatio)}% of time in Reading Rainforest, Elliot shows a natural love for language and stories.`,
    })
  } else if (grammarRatio > 50) {
    insights.push({
      type: 'strength',
      title: 'Grammar Guru',
      description: `Elliot is focusing ${Math.round(grammarRatio)}% on Grammar Galaxy. Excellent attention to detail!`,
    })
  }
  
  // Accuracy Analysis
  const accuracy = stats.totalQuestionsAnswered > 0 
    ? (stats.totalCorrectAnswers / stats.totalQuestionsAnswered) * 100 
    : 0
    
  if (accuracy >= 85) {
    insights.push({
      type: 'strength',
      title: 'Precision Player',
      description: `With ${Math.round(accuracy)}% accuracy, Elliot is taking their time and thinking through answers carefully. This shows excellent focus and patience.`,
    })
  } else if (accuracy < 60 && stats.totalQuestionsAnswered > 10) {
    insights.push({
      type: 'improvement',
      title: 'Building Accuracy',
      description: `Current accuracy is ${Math.round(accuracy)}%. This is normal when learning new concepts! Encourage Elliot to use hints and take their time.`,
      action: 'Remind Elliot that it\'s okay to use hints when stuck.',
    })
  }
  
  // Streak Analysis
  if (streak.current >= 14) {
    insights.push({
      type: 'strength',
      title: 'Consistency Champion',
      description: `A ${streak.current}-day streak is incredible! Elliot is building strong learning habits that will last a lifetime.`,
    })
  } else if (streak.current >= 7) {
    insights.push({
      type: 'strength',
      title: 'Week Warrior',
      description: `One week strong! A 7-day streak shows Elliot is making learning a daily habit.`,
    })
  } else if (streak.current === 0 && streak.longest >= 3) {
    insights.push({
      type: 'recommendation',
      title: 'Streak Opportunity',
      description: 'Elliot broke their previous streak. Encourage them to play today to start a new streak going!',
      action: 'Suggest playing one activity together today.',
    })
  }
  
  // Level Milestones
  if (level >= 20) {
    insights.push({
      type: 'milestone',
      title: 'Level 20 Master!',
      description: 'Reaching Level 20 puts Elliot in the top tier of learners. They\'ve earned over 20,000 XP!',
    })
  } else if (level >= 10) {
    insights.push({
      type: 'milestone',
      title: 'Double Digits!',
      description: 'Level 10 is a major milestone. Elliot has earned over 10,000 XP and is well on their way to mastery.',
    })
  } else if (level >= 5) {
    insights.push({
      type: 'milestone',
      title: 'Rising Star',
      description: `Level ${level} reached! Elliot is building momentum with every activity.`,
    })
  }
  
  // Activity Volume
  const totalActivities = worldProgress.math.activitiesCompleted + worldProgress.reading.activitiesCompleted + worldProgress.grammar.activitiesCompleted
  
  if (totalActivities >= 50) {
    insights.push({
      type: 'strength',
      title: 'Dedicated Learner',
      description: `${totalActivities} activities completed! Elliot is putting in serious effort across all subjects.`,
    })
  } else if (totalActivities >= 20) {
    insights.push({
      type: 'pattern',
      title: 'Building Momentum',
      description: `With ${totalActivities} activities under their belt, Elliot is developing a strong learning routine.`,
    })
  }
  
  // Subject Recommendation (find lowest)
  const subjects = [
    { name: 'Math Mountains', xp: worldProgress.math.xp, activities: worldProgress.math.activitiesCompleted },
    { name: 'Reading Rainforest', xp: worldProgress.reading.xp, activities: worldProgress.reading.activitiesCompleted },
    { name: 'Grammar Galaxy', xp: worldProgress.grammar.xp, activities: worldProgress.grammar.activitiesCompleted },
  ]
  
  const lowestSubject = subjects.reduce((prev, curr) => prev.xp < curr.xp ? prev : curr)
  
  if (lowestSubject.activities < 5 && totalActivities > 10) {
    insights.push({
      type: 'recommendation',
      title: `Explore ${lowestSubject.name}`,
      description: `${lowestSubject.name} has the lowest engagement. Try encouraging Elliot to try an activity there for balance.`,
      action: `Suggest trying ${lowestSubject.name.split(' ')[0]} together this week.`,
    })
  }
  
  // Perfect Sessions
  const totalPerfect = worldProgress.math.perfectSessions + worldProgress.reading.perfectSessions + worldProgress.grammar.perfectSessions
  if (totalPerfect >= 10) {
    insights.push({
      type: 'strength',
      title: 'Perfectionist',
      description: `${totalPerfect} perfect sessions! Elliot has an eye for detail and strives for excellence.`,
    })
  }
  
  // Time played
  const hoursPlayed = Math.floor(stats.totalTimePlayed / 60)
  if (hoursPlayed >= 10) {
    insights.push({
      type: 'pattern',
      title: 'Committed Student',
      description: `${hoursPlayed}+ hours of learning time invested. Elliot is building strong foundational knowledge.`,
    })
  }
  
  // Default insights if sparse data
  if (insights.length < 2) {
    insights.push({
      type: 'recommendation',
      title: 'Just Getting Started',
      description: 'Elliot is at the beginning of their learning journey. Regular short sessions (15-20 minutes) work best for building habits.',
      action: 'Aim for one activity per day to start.',
    })
  }
  
  return insights.slice(0, 6) // Return top 6 insights
}

const typeConfig = {
  strength: {
    icon: '💪',
    bg: 'bg-green-50',
    border: 'border-green-200',
    titleColor: 'text-green-800',
  },
  improvement: {
    icon: '📈',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    titleColor: 'text-amber-800',
  },
  pattern: {
    icon: '📊',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    titleColor: 'text-blue-800',
  },
  recommendation: {
    icon: '💡',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    titleColor: 'text-purple-800',
  },
  milestone: {
    icon: '🏆',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    titleColor: 'text-amber-800',
  },
}

export default function InsightsPage() {
  const { player } = useGamificationContext()
  const insights = generateInsights(player)
  
  // Count insights by type
  const insightCounts = insights.reduce((acc, insight) => {
    acc[insight.type] = (acc[insight.type] || 0) + 1
    return acc
  }, {} as Record<Insight['type'], number>)

  return (
    <div className="min-h-screen bg-gray-50">
      <ParentNav />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Learning Insights</h2>
          <p className="text-gray-600">AI-powered observations about Elliot's learning journey</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {Object.entries(insightCounts).map(([type, count]) => {
            const config = typeConfig[type as Insight['type']]
            return (
              <div 
                key={type}
                className={`${config.bg} ${config.border} border rounded-lg p-4 text-center`}
              >
                <span className="text-2xl">{config.icon}</span>
                <p className={`font-medium ${config.titleColor} mt-1`}>{type.charAt(0).toUpperCase() + type.slice(1)}s</p>
                <p className="text-2xl font-bold">{count}</p>
              </div>
            )
          })}
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.map((insight, index) => {
            const config = typeConfig[insight.type]
            return (
              <div
                key={index}
                className={`${config.bg} ${config.border} border-2 rounded-xl p-6`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{config.icon}</div>
                  
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold ${config.titleColor} mb-2`}>
                      {insight.title}
                    </h3>
                    
                    <p className="text-gray-700 mb-3">{insight.description}</p>
                    
                    {insight.action && (
                      <div className="bg-white/70 rounded-lg p-3 mt-3">
                        <p className="text-sm font-medium text-gray-800">💡 Suggested Action:</p>
                        <p className="text-sm text-gray-600">{insight.action}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Weekly Report Preview */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Weekly Report Preview</h3>
              <p className="text-gray-500">Week of {format(subDays(new Date(), 7), 'MMM d')} - {format(new Date(), 'MMM d, yyyy')}</p>
            </div>
            
            <button className="px-4 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors">
              Export PDF
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'XP Earned', value: `${Math.floor(Math.random() * 500 + 200)}` },
              { label: 'Activities', value: `${Math.floor(Math.random() * 10 + 3)}` },
              { label: 'Accuracy', value: `${Math.floor(Math.random() * 20 + 70)}%` },
              { label: 'Time', value: `${Math.floor(Math.random() * 3 + 1)}h ${Math.floor(Math.random() * 60)}m` },
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-xl font-bold text-gray-800">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
