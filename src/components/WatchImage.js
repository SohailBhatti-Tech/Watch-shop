import { useEffect, useState } from 'react'

export default function WatchImage({ dial, strap, metal, live = false }) {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    if (!live) return
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [live])

  const s = live ? now.getSeconds() : 30
  const m = live ? now.getMinutes() + s / 60 : 10
  const h = live ? (now.getHours() % 12) + m / 60 : 10 + 10 / 60
  const hand = (deg, len, w) => (
    <line x1="100" y1="120" x2="100" y2={120 - len} stroke={metal} strokeWidth={w}
      strokeLinecap="round" style={{ transform: `rotate(${deg}deg)`, transformOrigin: '100px 120px', transition: live ? 'transform .3s' : 'none' }} />
  )
  return (
    <svg viewBox="0 0 200 240" className="watch-svg" role="img" aria-label="Watch">
      <rect x="72" y="0" width="56" height="240" rx="16" fill={strap} />
      <circle cx="100" cy="120" r="64" fill={metal} />
      <circle cx="100" cy="120" r="55" fill={dial} />
      {[...Array(12)].map((_, i) => {
        const a = (i * 30 * Math.PI) / 180
        return <line key={i} x1={100 + 46 * Math.sin(a)} y1={120 - 46 * Math.cos(a)}
          x2={100 + 51 * Math.sin(a)} y2={120 - 51 * Math.cos(a)} stroke={metal} strokeWidth="2" />
      })}
      {hand(h * 30, 28, 4)}
      {hand(m * 6, 40, 3)}
      {hand(s * 6, 44, 1.2)}
      <circle cx="100" cy="120" r="4" fill={metal} />
    </svg>
  )
}