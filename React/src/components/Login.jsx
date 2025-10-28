import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.email === email && u.password === password)
    if (user) {
      localStorage.setItem('ticketapp_session', 'loggedin')
      toast.success('Login successful')
      navigate('/dashboard')
    } else {
      toast.error('Invalid credentials')
    }
  }

  return (
    <div>
    <div className="form-register container">
      <h2>Login</h2>
      <form className="form-entry" onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
    <footer>© 2025 Ticket App</footer>
    </div>
  )
}

export default Login