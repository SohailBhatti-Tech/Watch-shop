import ProductImage from './ProductImage'

export default function ProductCard({ p, index, onOpen, onAdd, saved, onWish }) {
  return (
    <article className="card" style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}>
      <div className="card-top">
        <button className="card-img" onClick={() => onOpen(p)} aria-label={`View ${p.name}`}>
          <ProductImage p={p} />
        </button>
        <button className={`heart ${saved ? 'on' : ''}`} onClick={() => onWish(p.id)}
          aria-label={saved ? 'Remove from saved' : 'Save watch'}>{saved ? '♥' : '♡'}</button>
      </div>
      <div className="card-body">
        <p className="muted">{p.brand} · {p.category}</p>
        <h3>{p.name}</h3>
        <p className="muted">★ {p.rating}</p>
        <div className="card-row">
          <strong>${p.price}</strong>
          <button className="btn small" onClick={() => onAdd(p)}>Add to cart</button>
        </div>
      </div>
    </article>
  )
}