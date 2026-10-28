export default function Navbar({ search, setSearch, filterOpen, setFilterOpen, cartCount, openCart }) {
  return (
    <header className="navbar">
      <a href="#home" className="logo">MS WATCHES</a>
      <nav className="links">
        <a href="#home">Home</a>
        <a href="#shop">Shop</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
      <input className="search" type="search" placeholder="Search watches or brands"
        value={search} onChange={e => setSearch(e.target.value)} aria-label="Search watches" />
      <button className={`btn ghost ${filterOpen ? 'active' : ''}`} onClick={() => setFilterOpen(!filterOpen)}>Filter</button>
      <button className="btn cart-btn" onClick={openCart}>
        Cart <span key={cartCount} className="badge">{cartCount}</span>
      </button>
    </header>
  )
}