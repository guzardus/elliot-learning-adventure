'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/parent', label: 'Overview', icon: '📊' },
  { href: '/parent/progress', label: 'Progress', icon: '📈' },
  { href: '/parent/badges', label: 'Badges', icon: '🏆' },
  { href: '/parent/insights', label: 'Insights', icon: '💡' },
]

export function ParentNav() {
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👨‍👩‍👧‍👦</span>
            <h1 className="text-xl font-bold text-gray-800">Parent Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-amber-100 text-amber-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-1">{item.icon}</span>
                  {item.label}
                </Link>
              )
            })}
          </div>
          
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Back to Game →
          </Link>
        </div>
      </div>
    </nav>
  )
}
