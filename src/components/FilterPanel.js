import { brands, categories } from '../data'

export default function FilterPanel({ open, f, setF, reset }) {
  const set = (k, v) => setF({ ...f, [k]: v })
  return (
    <div className={`filter-panel ${open ? 'open' : ''}`}>
      <div className="filter-inner">
        <label>Category
          <select value={f.category} onChange={e => set('category', e.target.value)}>
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label>Brand
          <select value={f.brand} onChange={e => set('brand', e.target.value)}>
            {brands.map(b => <option key={b}>{b}</option>)}
          </select>
        </label>
        <label>Max price: ${f.maxPrice}
          <input type="range" min="100" max="1500" step="50" value={f.maxPrice}
            onChange={e => set('maxPrice', Number(e.target.value))} />
        </label>
        <label>Sort by
          <select value={f.sort} onChange={e => set('sort', e.target.value)}>
            <option value="default">Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </label>
        <label className="check">
  <input type="checkbox" checked={f.saved} onChange={e => set('saved', e.target.checked)} />
  Saved watches only
</label>
        <button className="btn ghost" onClick={reset}>Reset filters</button>
      </div>
    </div>
  )
}