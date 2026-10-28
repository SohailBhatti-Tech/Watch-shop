import ProductImage from './ProductImage'

export default function CartDrawer({ open, onClose, items, change, remove, checkout, ordered }) {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0)
  return (
    <>
      <div className={`overlay drawer-bg ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`drawer ${open ? 'open' : ''}`}>
        <div className="drawer-head">
          <h2>Your cart</h2>
          <button className="close static" onClick={onClose} aria-label="Close cart">×</button>
        </div>
        {ordered && <p className="success">Order placed. Thank you for shopping with Hourly.</p>}
        {!items.length && !ordered && <p className="muted">Your cart is empty. Add a watch from the shop.</p>}
        <div className="drawer-list">
          {items.map(i => (
            <div className="cart-item" key={i.id}>
              <div className="thumb"><ProductImage p={i} /></div>
              <div className="cart-info">
                <strong>{i.name}</strong>
                <span className="muted">${i.price}</span>
                <div className="qty">
                  <button onClick={() => change(i.id, -1)}>−</button>
                  <span>{i.qty}</span>
                  <button onClick={() => change(i.id, 1)}>+</button>
                  <button className="link" onClick={() => remove(i.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="drawer-foot">
            <div className="card-row"><span>Total</span><strong>${total}</strong></div>
            <button className="btn full" onClick={checkout}>Place order</button>
          </div>
        )}
      </aside>
    </>
  )
}