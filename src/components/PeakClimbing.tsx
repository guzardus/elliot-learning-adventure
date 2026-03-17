'use client'

interface ActivityProps {
  onComplete: (score: number, xp: number) => void
  onExit: () => void
  difficulty: string
}

export default function PeakClimbing({ onComplete, onExit, difficulty }: ActivityProps) {
  return (
    <div className="p-8 text-center">
      <h2>Peak Climbing</h2>
      <p>Difficulty: {difficulty}</p>
      <button onClick={() => onComplete(8, 100)}>Complete Activity</button>
      <button onClick={onExit}>Exit</button>
    </div>
  )
}
