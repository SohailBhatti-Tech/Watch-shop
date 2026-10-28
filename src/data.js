 const raw = [
  { id: 1, name: 'Marine Diver 300', brand: 'Aquor', category: 'Sport', price: 420, rating: 4.7, dial: '#0f3d5e', strap: '#1b1b1b', metal: '#c9ced3', desc: '300m water resistance, rotating bezel and luminous markers.' },
  { id: 2, name: 'Heritage Automatic', brand: 'Valen', category: 'Classic', price: 890, rating: 4.9, dial: '#f1ece0', strap: '#6b4226', metal: '#b08d4a', desc: 'Self-winding movement with a sapphire crystal and leather strap.' },
  { id: 3, name: 'Slate Chronograph', brand: 'Aquor', category: 'Sport', price: 560, rating: 4.5, dial: '#2c3138', strap: '#2c3138', metal: '#9aa3ad', desc: 'Three sub-dials, stainless steel bracelet, tachymeter scale.' },
  { id: 4, name: 'Court Dress 38', brand: 'Valen', category: 'Dress', price: 650, rating: 4.6, dial: '#ffffff', strap: '#111111', metal: '#d4b56a', desc: 'Ultra-thin 7mm case with a slim gold-tone finish.' },
  { id: 5, name: 'Pilot Field Watch', brand: 'Norra', category: 'Classic', price: 340, rating: 4.4, dial: '#1c2a1f', strap: '#5a5a3c', metal: '#a8a89a', desc: 'Clear numerals, canvas strap and 100m water resistance.' },
  { id: 6, name: 'Orbit Smart S2', brand: 'Norra', category: 'Smart', price: 280, rating: 4.3, dial: '#0b0b0b', strap: '#3b3b3b', metal: '#555a60', desc: 'Heart-rate tracking, 7-day battery and notifications.' },
  { id: 7, name: 'Rose Quartz 32', brand: 'Lumen', category: 'Dress', price: 230, rating: 4.5, dial: '#f3dfe0', strap: '#c88e8e', metal: '#d8a98a', desc: 'Compact 32mm case with a soft rose-gold finish.' },
  { id: 8, name: 'Tidal Dual Time', brand: 'Lumen', category: 'Sport', price: 480, rating: 4.6, dial: '#13576b', strap: '#e2762a', metal: '#cfd5da', desc: 'Two time zones with a bold orange rubber strap.' },
  { id: 9, name: 'Regent Moonphase', brand: 'Valen', category: 'Classic', price: 1450, rating: 5.0, dial: '#162447', strap: '#2a1d14', metal: '#c7a65a', desc: 'Hand-finished moonphase complication, limited run.' },
  { id: 10, name: 'Pulse Fit Band', brand: 'Norra', category: 'Smart', price: 150, rating: 4.1, dial: '#111827', strap: '#7c3aed', metal: '#6b7280', desc: 'Lightweight fitness tracker with sleep monitoring.' },
  { id: 11, name: 'Mono Minimal', brand: 'Lumen', category: 'Dress', price: 190, rating: 4.4, dial: '#e8e8e8', strap: '#1f1f1f', metal: '#8d8d8d', desc: 'Clean dial, no date, mesh strap.' },
  { id: 12, name: 'Summit Titanium', brand: 'Aquor', category: 'Sport', price: 990, rating: 4.8, dial: '#3a3f2f', strap: '#4a4f3a', metal: '#b9bcc0', desc: 'Grade-5 titanium case, scratch-proof sapphire crystal.' },
]
export const products = raw.map(p => ({ ...p, img: `${process.env.PUBLIC_URL}/images/watch${p.id}.jpg.jpg` }))
export const brands = ['All', ...new Set(raw.map(p => p.brand))]
export const categories = ['All', ...new Set(raw.map(p => p.category))]