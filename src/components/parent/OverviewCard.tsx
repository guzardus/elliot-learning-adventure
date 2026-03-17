interface OverviewCardProps {
  title: string
  value: string
  subtitle: string
  icon: string
  color: 'amber' | 'orange' | 'blue' | 'green' | 'purple'
}

const colorMap = {
  amber: 'from-amber-400 to-amber-500',
  orange: 'from-orange-400 to-orange-500',
  blue: 'from-blue-400 to-blue-500',
  green: 'from-green-400 to-green-500',
  purple: 'from-purple-400 to-purple-500',
}

export function OverviewCard({ title, value, subtitle, icon, color }: OverviewCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </div>
        
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorMap[color]} flex items-center justify-center text-2xl`}>
          {icon}
        </div>
      </div>
    </div>
  )
}
