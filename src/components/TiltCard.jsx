import { useRef, useState } from 'react'

export default function TiltCard({ children, className = '', intensity = 8 }) {
  const cardRef = useRef(null)
  const [transform, setTransform] = useState('')

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    const rotateX = -y * intensity
    const rotateY = x * intensity
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`)
  }

  const handleMouseLeave = () => {
    setTransform('perspective(800px) rotateX(0) rotateY(0) translateZ(0)')
  }

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}
