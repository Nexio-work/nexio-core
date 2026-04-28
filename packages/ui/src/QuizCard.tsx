import React from 'react'

interface QuizCardProps {
  question: string
  options: string[]
  correctIndex: number
  onAnswer?: (isCorrect: boolean) => void
}

export function QuizCard({ question, options, correctIndex, onAnswer }: QuizCardProps) {
  const [selected, setSelected] = React.useState<number | null>(null)
  const [answered, setAnswered] = React.useState(false)

  const handleClick = (index: number) => {
    if (answered) return
    setSelected(index)
    setAnswered(true)
    onAnswer?.(index === correctIndex)
  }

  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: 12,
      padding: 20,
      margin: '16px 0',
      background: '#f9fafb'
    }}>
      <h3 style={{ marginBottom: 16, fontSize: 16 }}>{question}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            disabled={answered}
            style={{
              padding: '12px 16px',
              border: `2px solid ${
                answered && i === correctIndex ? '#10b981' :
                answered && i === selected ? '#ef4444' :
                '#d1d5db'
              }`,
              borderRadius: 8,
              background: answered && i === correctIndex ? '#d1fae5' :
                         answered && i === selected ? '#fee2e2' : 'white',
              cursor: answered ? 'default' : 'pointer',
              textAlign: 'left',
              fontSize: 14
            }}
          >
            {opt}
          </button>
        ))}
      </div>
      {answered && (
        <p style={{ marginTop: 12, fontWeight: 'bold', color: selected === correctIndex ? '#10b981' : '#ef4444' }}>
          {selected === correctIndex ? '✅ Correct !' : '❌ Incorrect. La bonne réponse était : ' + options[correctIndex]}
        </p>
      )}
    </div>
  )
}
