'use client'

import { useGamificationContext } from '@/components/GamificationProvider'
import { ParentNav } from '@/components/parent/ParentNav'
import { OverviewCard } from '@/components/parent/OverviewCard'
import { WeeklyProgressChart } from '@/components/parent/WeeklyProgressChart'
import { RecentAchievements } from '@/components/parent/RecentAchievements'
import { LearningInsightCard } from '@/components/parent/LearningInsightCard'
import Link from 'next/link'

export default function ParentDashboard() {
  const { player, getUnlockedBadges } = useGamificationContext()
  const unlockedBadges = getUnlockedBadges()

  // Calculate total activities
  const totalActivities = 
    player.worldProgress.math.activitiesCompleted +
    player.worldProgress.reading.activitiesCompleted +
    player.worldProgress.grammar.activitiesCompleted

  // Calculate accuracy
  const accuracy = player.stats.totalQuestionsAnswered > 0
    ? Math.round((player.stats.totalCorrectAnswers / player.stats.totalQuestionsAnswered) * 100)
    : 0

  // Format time
  const hoursPlayed = Math.floor(player.stats.totalTimePlayed / 60)
  const minutesPlayed = player.stats.totalTimePlayed % 60

  return (
    <div className="min-h-screen bg-gray-50">
      <ParentNav />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Elliot's Learning Journey
          </h2>
          <p className="text-gray-600">
            Last active: {player.streak.lastLogin 
              ? new Date(player.streak.lastLogin).toLocaleDateString('en-AU', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })
              : 'Never'
            }
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <OverviewCard
            title="Current Level"
            value={player.level.toString()}
            subtitle={`${player.xp.toLocaleString()} XP earned`}
            icon="⭐"
            color="amber"
          />
          
          <OverviewCard
            title="Day Streak"
            value={player.streak.current.toString()}
            subtitle={`Best: ${player.streak.longest} days`}
            icon="🔥"
            color="orange"
          />
          
          <OverviewCard
            title="Time Played"
            value={`${hoursPlayed}h ${minutesPlayed}m`}
            subtitle={`${player.stats.sessionsCompleted} sessions`}
            icon="⏱️"
            color="blue"
          />
          
          <OverviewCard
            title="Accuracy"
            value={`${accuracy}%`}
            subtitle={`${player.stats.totalCorrectAnswers} / ${player.stats.totalQuestionsAnswered} correct`}
            icon="🎯"
            color="green"
          />
        </div>

        {/* Progress Chart */}
        <div className="mb-8">
          <WeeklyProgressChart />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecentAchievements badges={unlockedBadges.slice(-5)} />
          <LearningInsightCard player={player} />
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/parent/progress"
            className="px-6 py-3 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors"
          >
            View Full Progress →
          </Link>
          
          <Link
            href="/parent/badges"
            className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            View All Badges
          </Link>
        </div>
      </main>
    </div>
  )
}
