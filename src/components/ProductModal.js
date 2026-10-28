import ProductImage from './ProductImage'

export default function ProductModal({ p, onClose, onAdd }) {
  if (!p) return null
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Close">×</button>
        <div className="modal-img"><ProductImage p={p} /></div>
        <div className="modal-info">
          <p className="muted">{p.brand} · {p.category}</p>
          <h2>{p.name}</h2>
          <p>{p.desc}</p>
          <p className="muted">Rating ★ {p.rating}</p>
          <p className="price">${p.price}</p>
          <button className="btn" onClick={() => { onAdd(p); onClose() }}>Add to cart</button>
        </div>
      </div>
    </div>
  )
}