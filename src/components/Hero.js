import { useEffect, useState } from 'react'
import ProductImage from './ProductImage'

export default function Hero({ products, onOpen }) {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setI(n => (n + 1) % products.length), 3000)
    return () => clearInterval(t)
  }, [paused, products.length])

  const cur = products[i]
  return (
    <section id="home" className="hero">
      <div className="hero-text">
        <h1>Time, worn well.</h1>
        <p>Twelve watches from four makers. Pick one that fits your wrist and your week.</p>
        <a href="#shop" className="btn">Browse watches</a>
      </div>
      <div className="slider" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="slides">
          {products.map((p, idx) => (
            <div key={p.id} className={`slide ${idx === i ? 'active' : ''}`} onClick={() => onOpen(p)}>
              <ProductImage p={p} />
            </div>
          ))}
          <div className="slide-caption" key={cur.id}>
            <strong>{cur.name}</strong>
            <span>${cur.price}</span>
          </div>
        </div>
        <div className="thumbs">
          {products.map((p, idx) => (
            <button key={p.id} className={`dot ${idx === i ? 'on' : ''}`}
              onClick={() => setI(idx)} aria-label={`Show ${p.name}`} />
          ))}
        </div>
      </div>
    </section>
  )
}