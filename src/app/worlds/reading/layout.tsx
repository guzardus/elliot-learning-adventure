import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reading Rainforest - Elliot\'s Learning Adventure',
  description: 'Explore the jungle, discover stories, and build your reading skills!',
}

export default function ReadingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
