'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { useGamificationContext } from '@/components/GamificationProvider'
import { format, subDays, startOfWeek, addDays } from 'date-fns'

// Generate mock data for the past 7 days
// In production, this would come from daily snapshots in localStorage
function generateWeeklyData() {
  const data = []
  const today = new Date()
  
  for (let i = 6; i >= 0; i--) {
    const date = subDays(today, i)
    const dayName = format(date, 'EEE') // Mon, Tue, etc.
    
    // Mock data - in real app, this would come from stored daily snapshots
    data.push({
      day: dayName,
      xp: Math.floor(Math.random() * 200) + 50,
      questions: Math.floor(Math.random() * 20) + 5,
      date: format(date, 'yyyy-MM-dd'),
    })
  }
  
  return data
}

export function WeeklyProgressChart() {
  const { player } = useGamificationContext()
  const data = generateWeeklyData()
  
  // Override with actual today's data if available
  if (data.length > 0) {
    data[data.length - 1].xp = player.worldProgress.math.xp + 
                               player.worldProgress.reading.xp + 
                               player.worldProgress.grammar.xp
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800">This Week's Progress</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-amber-500"></div>
            <span className="text-gray-600">XP Earned</span>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm">
                      <p className="font-medium">{label}</p>
                      <p>{payload[0].value} XP</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="xp" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === data.length - 1 ? '#f59e0b' : '#d1d5db'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        Total this week: {data.reduce((sum, d) => sum + d.xp, 0).toLocaleString()} XP
      </div>
    </div>
  )
}
