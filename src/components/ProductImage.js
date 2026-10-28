import { useState } from 'react'
import WatchImage from './WatchImage'

export default function ProductImage({ p, live }) {
  const [failed, setFailed] = useState(false)
  if (!p.img || failed) {
    return <WatchImage dial={p.dial} strap={p.strap} metal={p.metal} live={live} />
  }
  return <img className="photo" src={p.img} alt={p.name} loading="lazy" onError={() => setFailed(true)} />
}