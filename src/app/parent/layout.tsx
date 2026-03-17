import type { Metadata } from 'next'
import '../globals.css'
import SVGFilters from '@/components/SVGFilters'
import { GamificationProvider } from '@/components/GamificationProvider'

export const metadata: Metadata = {
  title: "Elliot's Learning Adventure - Parent Dashboard",
  description: 'Track your child\'s learning progress and achievements',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-gray-50">
        <GamificationProvider>
          <SVGFilters />
          {children}
        </GamificationProvider>
      </body>
    </html>
  )
}
