import { useMemo } from 'react'
import './StarsBackground.css'

const STAR_COUNT = 140
const STAR_SIZES = [1, 1.5, 2, 2.5]

function StarsBackground() {
  const stars = useMemo(() => {
    return Array.from({ length: STAR_COUNT }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: STAR_SIZES[Math.floor(Math.random() * STAR_SIZES.length)],
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2,
    }))
  }, [])

  return (
    <div className="stars-background" aria-hidden="true">
      {stars.map((star) => (
        <span
          key={star.id}
          className="star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
      <div className="shooting-star" />
      <div className="shooting-star shooting-star-2" />
    </div>
  )
}

export default StarsBackground
