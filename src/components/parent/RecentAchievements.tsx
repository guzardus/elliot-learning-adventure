import { Badge } from '@/data/badges'
import { BADGE_ICONS } from '@/components/BadgeIcons'
import { format } from 'date-fns'

interface RecentAchievementsProps {
  badges: Badge[]
}

export function RecentAchievements({ badges }: RecentAchievementsProps) {
  // Sort by most recent (mock timestamp for now)
  const recentBadges = [...badges].reverse().slice(0, 5)

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Recent Achievements</h3>
        <span className="text-sm text-gray-500">{recentBadges.length} recent</span>
      </div>

      <div className="space-y-3">
        {recentBadges.length > 0 ? (
          recentBadges.map((badge, index) => {
            const IconComponent = BADGE_ICONS[badge.id]
            return (
              <div
                key={badge.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-10 h-10">
                  {IconComponent ? <IconComponent size={40} /> : <span className="text-2xl">🏆</span>}
                </div>
                
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{badge.name}</p>
                  <p className="text-sm text-gray-500">{badge.description}</p>
                </div>
                
                <span className="text-xs text-gray-400">
                  {format(new Date(), 'MMM d')} {/* Mock date */}
                </span>
              </div>
            )
          })
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No badges earned yet!</p>
            <p className="text-sm">Elliot will unlock badges as they play.</p>
          </div>
        )}
      </div>
    </div>
  )
}
