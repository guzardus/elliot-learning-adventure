'use client'

import { ParentNav } from '@/components/parent/ParentNav'
import { useGamificationContext } from '@/components/GamificationProvider'
import { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'

// Mock data generator
function generateProgressData() {
  const data = []
  let totalXP = 0
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    
    const dailyXP = Math.floor(Math.random() * 150) + 20
    totalXP += dailyXP
    
    data.push({
      date: date.toLocaleDateString('en-AU', { month: 'short', day: 'numeric' }),
      totalXP,
      mathXP: Math.floor(dailyXP * 0.4),
      readingXP: Math.floor(dailyXP * 0.35),
      grammarXP: Math.floor(dailyXP * 0.25),
    })
  }
  
  return data
}

const TIME_RANGES = [
  { label: '7 Days', value: 7 },
  { label: '30 Days', value: 30 },
  { label: 'All Time', value: 90 },
]

export default function ProgressPage() {
  const { player } = useGamificationContext()
  const [timeRange, setTimeRange] = useState(30)
  const progressData = generateProgressData()
  
  // Subject breakdown data
  const subjectData = [
    { name: 'Math', value: player.worldProgress.math.xp, color: '#8B7AA8' },
    { name: 'Reading', value: player.worldProgress.reading.xp, color: '#4A7C59' },
    { name: 'Grammar', value: player.worldProgress.grammar.xp, color: '#4169E1' },
  ].filter(s => s.value > 0)
  
  // Stats
  const totalActivities = 
    player.worldProgress.math.activitiesCompleted +
    player.worldProgress.reading.activitiesCompleted +
    player.worldProgress.grammar.activitiesCompleted
    
  const totalQuestions = player.stats.totalQuestionsAnswered
  const accuracy = totalQuestions > 0 
    ? Math.round((player.stats.totalCorrectAnswers / totalQuestions) * 100) 
    : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <ParentNav />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Detailed Progress</h2>
          <p className="text-gray-600">Track Elliot's learning journey over time</p>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 mb-6">
          {TIME_RANGES.map((range) => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                timeRange === range.value
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total XP', value: player.xp.toLocaleString() },
            { label: 'Activities', value: totalActivities },
            { label: 'Questions', value: totalQuestions },
            { label: 'Accuracy', value: `${accuracy}%` },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Progress Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-6">XP Progression</h3>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData.slice(-timeRange)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date"
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="totalXP" 
                  name="Total XP" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="mathXP" 
                  name="Math" 
                  stroke="#8B7AA8" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="readingXP" 
                  name="Reading" 
                  stroke="#4A7C59" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="grammarXP" 
                  name="Grammar" 
                  stroke="#4169E1" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Subject Breakdown</h3>
            
            {subjectData.length > 0 ? (
              <>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={subjectData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {subjectData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 space-y-2">
                  {subjectData.map((subject) => (
                    <div key={subject.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: subject.color }}
                        />
                        <span className="text-gray-700">{subject.name}</span>
                      </div>
                      <span className="font-medium">{subject.value.toLocaleString()} XP</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                No data yet. Elliot needs to start playing!
              </div>
            )}
          </div>

          {/* Activity Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Activity Summary</h3>
            
            <div className="space-y-4">
              {[
                { 
                  subject: 'Math Mountains', 
                  activities: player.worldProgress.math.activitiesCompleted,
                  perfect: player.worldProgress.math.perfectSessions,
                  color: 'bg-purple-500'
                },
                { 
                  subject: 'Reading Rainforest', 
                  activities: player.worldProgress.reading.activitiesCompleted,
                  perfect: player.worldProgress.reading.perfectSessions,
                  color: 'bg-green-500'
                },
                { 
                  subject: 'Grammar Galaxy', 
                  activities: player.worldProgress.grammar.activitiesCompleted,
                  perfect: player.worldProgress.grammar.perfectSessions,
                  color: 'bg-blue-500'
                },
              ].map((item) => (
                <div key={item.subject} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="font-medium text-gray-800">{item.subject}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Activities</p>
                      <p className="font-medium">{item.activities}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Perfect Sessions</p>
                      <p className="font-medium">{item.perfect}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
