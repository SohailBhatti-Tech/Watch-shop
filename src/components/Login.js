import { useState } from 'react'

const rules = [
  ['At least 8 characters', p => p.length >= 8],
  ['One uppercase letter', p => /[A-Z]/.test(p)],
  ['One lowercase letter', p => /[a-z]/.test(p)],
  ['One number', p => /\d/.test(p)],
  ['One special character (! @ # $ %)', p => /[^A-Za-z0-9]/.test(p)],
]

export default function Login({ onLogin }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [tried, setTried] = useState(false)

  const errors = {}
  if (name.trim().length < 3) errors.name = 'Name must be at least 3 characters.'
  else if (!/^[A-Za-z ]+$/.test(name.trim())) errors.name = 'Name can only have letters and spaces.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.'
  if (rules.some(([, test]) => !test(password))) errors.password = 'Password must meet every rule below.'

  const submit = e => {
    e.preventDefault()
    setTried(true)
    if (Object.keys(errors).length) return
    onLogin({ name: name.trim(), email })
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={submit} noValidate>
        <h1>MS Watches</h1>
        <p className="muted">Log in to browse and buy watches.</p>

        <label>Full name
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
          {tried && errors.name && <span className="err">{errors.name}</span>}
        </label>

        <label>Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
          {tried && errors.email && <span className="err">{errors.email}</span>}
        </label>

        <label>Password
          <div className="pw-row">
            <input type={show ? 'text' : 'password'} value={password}
              onChange={e => setPassword(e.target.value)} placeholder="Create a strong password" />
            <button type="button" className="btn ghost small" onClick={() => setShow(!show)}>
              {show ? 'Hide' : 'Show'}
            </button>
          </div>
          {tried && errors.password && <span className="err">{errors.password}</span>}
        </label>

        <ul className="rules">
          {rules.map(([text, test]) => (
            <li key={text} className={test(password) ? 'ok' : ''}>{test(password) ? '✓' : '○'} {text}</li>
          ))}
        </ul>

        <button className="btn full" type="submit">Log in</button>
      </form>
    </div>
  )
}