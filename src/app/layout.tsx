import type { Metadata } from 'next'
import './globals.css'
import SVGFilters from '@/components/SVGFilters'
import { GamificationProvider } from '@/components/GamificationProvider'

export const metadata: Metadata = {
  title: "Elliot's Learning Adventure",
  description: 'An interactive, gamified learning platform for Grade 3-5 advancement',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <GamificationProvider>
          <SVGFilters />
          {children}
        </GamificationProvider>
      </body>
    </html>
  )
}
