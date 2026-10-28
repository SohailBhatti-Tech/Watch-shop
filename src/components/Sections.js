import { useState } from 'react'

export function Announcement() {
  return <div className="announce">Free shipping on orders over $200 · 2-year warranty on every watch</div>
}

export function Categories({ products, onPick }) {
  const cats = [
    ['Sport', 'Water-resistant and built to move'],
    ['Dress', 'Slim cases for formal wear'],
    ['Classic', 'Automatic and heritage designs'],
    ['Smart', 'Tracking, alerts and long battery life'],
  ]
  return (
    <section className="section">
      <h2>Shop by style</h2>
      <div className="cat-grid">
        {cats.map(([name, text]) => (
          <button key={name} className={`cat cat-${name}`} onClick={() => onPick(name)}>
            <strong>{name}</strong>
            <span>{text}</span>
            <small>{products.filter(p => p.category === name).length} watches</small>
          </button>
        ))}
      </div>
    </section>
  )
}

export function Features() {
  const items = [
    ['Free shipping', 'On all orders over $200'],
    ['2-year warranty', 'Covers every watch we sell'],
    ['30-day returns', 'Send it back if it does not fit'],
    ['Secure payment', 'Your card details stay protected'],
  ]
  return (
    <section className="features">
      {items.map(([t, d]) => <div key={t}><strong>{t}</strong><p className="muted">{d}</p></div>)}
    </section>
  )
}

export function Testimonials() {
  const list = [
    ['The Heritage Automatic looks even better in person. Delivery took two days.', 'Ahmed R.'],
    ['I returned my first pick and the refund arrived within a week. Easy process.', 'Sara K.'],
    ['Good prices and the Marine Diver has been fine in the pool and the sea.', 'Bilal H.'],
  ]
  return (
    <section className="section">
      <h2>What customers say</h2>
      <div className="review-grid">
        {list.map(([q, n]) => <blockquote key={n}><p>“{q}”</p><footer>{n}</footer></blockquote>)}
      </div>
    </section>
  )
}

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  return (
    <section className="newsletter">
      <h2>Get new arrivals first</h2>
      {done
        ? <p className="success">Thanks. We will email you when new watches arrive.</p>
        : <div className="news-row">
            <input type="email" placeholder="Your email address" value={email}
              onChange={e => setEmail(e.target.value)} aria-label="Email address" />
            <button className="btn" onClick={() => email.includes('@') && setDone(true)}>Subscribe</button>
          </div>}
    </section>
  )
}