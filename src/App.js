import { useMemo, useState, useEffect, useRef } from 'react'
import Login from './components/Login'
import { products } from './data'
import Navbar from './components/Navbar'
import FilterPanel from './components/FilterPanel'
import Hero from './components/Hero'
import ProductCard from './components/ProductCard'
import ProductModal from './components/ProductModal'
import CartDrawer from './components/CartDrawer'
import Footer from './components/Footer'
import { Announcement, Categories, Features, Testimonials, Newsletter } from './components/Sections'

const defaults = { category: 'All', brand: 'All', maxPrice: 1500, sort: 'default', saved: false }

    function Shop({user,onLogout}) {
  const [search, setSearch] = useState('')
  const [f, setF] = useState(defaults)
  const [filterOpen, setFilterOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [wish, setWish] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [ordered, setOrdered] = useState(false)
  const [toast, setToast] = useState('')
  const [showTop, setShowTop] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    try { setCart(JSON.parse(localStorage.getItem('cart')) || []) } catch { /* ignore */ }
    try { setWish(JSON.parse(localStorage.getItem('wish')) || []) } catch { /* ignore */ }
    const onScroll = () => {
      const y = window.scrollY
      setShowTop(y > 600)
      setHidden(y > lastY.current && y > 80)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    try { localStorage.setItem('cart', JSON.stringify(cart)) } catch { /* ignore */ }
  }, [cart])
  useEffect(() => {
    try { localStorage.setItem('wish', JSON.stringify(wish)) } catch { /* ignore */ }
  }, [wish])
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 1800)
    return () => clearTimeout(t)
  }, [toast])

  const shown = useMemo(() => {
    let list = products.filter(p =>
      (f.category === 'All' || p.category === f.category) &&
      (f.brand === 'All' || p.brand === f.brand) &&
      (!f.saved || wish.includes(p.id)) &&
      p.price <= f.maxPrice &&
      (p.name + p.brand).toLowerCase().includes(search.toLowerCase()))
    if (f.sort === 'low') list = [...list].sort((a, b) => a.price - b.price)
    if (f.sort === 'high') list = [...list].sort((a, b) => b.price - a.price)
    if (f.sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
    return list
  }, [search, f, wish])

  const add = p => {
    setOrdered(false)
    setCart(c => c.find(i => i.id === p.id)
      ? c.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i)
      : [...c, { ...p, qty: 1 }])
    setToast(`${p.name} added to cart`)
  }
  const change = (id, d) => setCart(c => c.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i))
  const remove = id => setCart(c => c.filter(i => i.id !== id))
  const checkout = () => { setCart([]); setOrdered(true) }
  const toggleWish = id => setWish(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id])
  const pickCategory = c => {
    setF({ ...defaults, category: c })
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
  }
  const count = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <>
      <Announcement />
      <div className={`top ${hidden && !filterOpen ? 'hide' : ''}`}>
        <Navbar search={search} setSearch={setSearch} filterOpen={filterOpen} setFilterOpen={setFilterOpen}
          cartCount={count} openCart={() => setCartOpen(true)} user={user} onLogout={onLogout} />
        <FilterPanel open={filterOpen} f={f} setF={setF} reset={() => setF(defaults)} />
      </div>

      <Hero products={products} onOpen={setSelected} />
      <Features />
      <Categories products={products} onPick={pickCategory} />

      <main id="shop" className="shop">
        <h2>All watches <span className="muted">({shown.length})</span></h2>
        {shown.length === 0
          ? <p className="muted">No watches match. Try clearing the search or filters.</p>
          : <div className="grid">{shown.map((p, i) =>
              <ProductCard key={p.id} p={p} index={i} onOpen={setSelected} onAdd={add}
                saved={wish.includes(p.id)} onWish={toggleWish} />)}</div>}
      </main>

      <Testimonials />
      <Newsletter />
      <Footer />
      <ProductModal p={selected} onClose={() => setSelected(null)} onAdd={add} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={cart}
        change={change} remove={remove} checkout={checkout} ordered={ordered} />
      <div className={`toast ${toast ? 'show' : ''}`}>{toast}</div>
      <button className={`to-top ${showTop ? 'show' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top">↑</button>
    </>
  )
}
export default function App() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')) } catch { return null }
  })
  const [welcome, setWelcome] = useState(false)

  useEffect(() => {
    if (!welcome) return
    const t = setTimeout(() => setWelcome(false), 2500)
    return () => clearTimeout(t)
  }, [welcome])

  const login = u => {
    try { localStorage.setItem('user', JSON.stringify(u)) } catch { /* ignore */ }
    setUser(u)
    setWelcome(true)
  }
  const logout = () => {
    try { localStorage.removeItem('user') } catch { /* ignore */ }
    setUser(null)
    setWelcome(false)
  }

  if (!user) return <Login onLogin={login} />
  if (welcome) {
    return (
      <div className="welcome">
        <h1>Welcome, {user.name}</h1>
        <p>Taking you to the shop...</p>
      </div>
    )
  }
  return <Shop user={user} onLogout={logout} />
}