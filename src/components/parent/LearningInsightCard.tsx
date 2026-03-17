import { PlayerState } from '@/utils/gamificationTypes'

interface LearningInsightCardProps {
  player: PlayerState
}

function generateInsights(player: PlayerState): { type: 'strength' | 'improvement' | 'recommendation'; text: string }[] {
  const insights: { type: 'strength' | 'improvement' | 'recommendation'; text: string }[] = []
  
  const { worldProgress, stats, level } = player
  
  // Calculate subject performance
  const mathXP = worldProgress.math.xp
  const readingXP = worldProgress.reading.xp
  const grammarXP = worldProgress.grammar.xp
  
  // Find strongest subject
  const maxXP = Math.max(mathXP, readingXP, grammarXP)
  if (maxXP > 0) {
    if (maxXP === mathXP) {
      insights.push({ type: 'strength', text: 'Elliot is excelling in Math Mountains! Keep up the great work with numbers.' })
    } else if (maxXP === readingXP) {
      insights.push({ type: 'strength', text: 'Reading Rainforest is Elliot\'s strongest area. They have a natural talent for language!' })
    } else {
      insights.push({ type: 'strength', text: 'Grammar Galaxy is where Elliot shines. Excellent grasp of language rules!' })
    }
  }
  
  // Accuracy insight
  const accuracy = stats.totalQuestionsAnswered > 0 
    ? (stats.totalCorrectAnswers / stats.totalQuestionsAnswered) * 100 
    : 0
    
  if (accuracy >= 80) {
    insights.push({ type: 'strength', text: `Outstanding ${Math.round(accuracy)}% accuracy! Elliot is taking time to think through answers.` })
  } else if (accuracy < 60 && stats.totalQuestionsAnswered > 20) {
    insights.push({ type: 'improvement', text: 'Consider encouraging Elliot to slow down and use hints when stuck. Accuracy will improve with practice!' })
  }
  
  // Streak insight
  if (player.streak.current >= 7) {
    insights.push({ type: 'strength', text: `Amazing ${player.streak.current}-day streak! Consistency is key to learning.` })
  } else if (player.streak.current === 0 && player.streak.longest > 3) {
    insights.push({ type: 'recommendation', text: 'Elliot broke their streak. Encourage them to play today to start a new one!' })
  }
  
  // Level milestone
  if (level >= 10) {
    insights.push({ type: 'strength', text: `Level ${level} reached! Elliot is becoming a true learning champion.` })
  }
  
  // Recommendation based on lowest XP
  if (mathXP < readingXP && mathXP < grammarXP && mathXP < 500) {
    insights.push({ type: 'recommendation', text: 'Try encouraging some Math Mountains time. A little extra practice with numbers would help balance skills.' })
  } else if (readingXP < mathXP && readingXP < grammarXP && readingXP < 500) {
    insights.push({ type: 'recommendation', text: 'Reading Rainforest could use some attention. Try the Story Vines activity!' })
  } else if (grammarXP < mathXP && grammarXP < readingXP && grammarXP < 500) {
    insights.push({ type: 'recommendation', text: 'Grammar Galaxy is Elliot\'s least explored world. The Comet Chase activity is a great starting point!' })
  }
  
  // Activity completion
  const totalActivities = worldProgress.math.activitiesCompleted + worldProgress.reading.activitiesCompleted + worldProgress.grammar.activitiesCompleted
  if (totalActivities > 10) {
    insights.push({ type: 'strength', text: `${totalActivities} activities completed! Elliot is building strong learning habits.` })
  }
  
  // Default if no insights
  if (insights.length === 0) {
    insights.push({ type: 'recommendation', text: 'Elliot is just getting started! Regular play sessions will help build skills across all subjects.' })
  }
  
  return insights.slice(0, 3) // Return top 3 insights
}

const typeStyles = {
  strength: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: '💪',
    title: 'Strength',
  },
  improvement: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: '📈',
    title: 'Growth Area',
  },
  recommendation: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: '💡',
    title: 'Recommendation',
  },
}

export function LearningInsightCard({ player }: LearningInsightCardProps) {
  const insights = generateInsights(player)
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">💡</span>
        <h3 className="text-lg font-bold text-gray-800">Learning Insights</h3>
      </div>

      <div className="space-y-3">
        {insights.map((insight, index) => {
          const style = typeStyles[insight.type]
          return (
            <div
              key={index}
              className={`p-4 rounded-lg border ${style.bg} ${style.border}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl">{style.icon}</span>
                <div>
                  <p className="font-medium text-gray-800 mb-1">{style.title}</p>
                  <p className="text-gray-600 text-sm">{insight.text}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
