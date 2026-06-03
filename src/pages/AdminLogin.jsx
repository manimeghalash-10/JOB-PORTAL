import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function AdminLogin() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

  }

  // HANDLE ADMIN LOGIN
  const handleLogin = (e) => {

    e.preventDefault()

    // ADMIN CREDENTIALS
    if (
      formData.email === 'admin@gmail.com' &&
      formData.password === 'admin123'
    ) {

      // SAVE ADMIN LOGIN
      localStorage.setItem('adminLoggedIn', 'true')

      alert('Admin Login Successful')

      // REDIRECT TO ADMIN DASHBOARD
      navigate('/admin')

    } else {

      setError('Invalid Admin Credentials')

    }

  }

  return (

    <div>

      {/* NAVBAR */}
      <nav style={styles.navbar}>

        <h2 style={styles.logo}>
          JobPortal
        </h2>

        <div style={styles.navLinks}>

          <Link to='/' style={styles.link}>
            Home
          </Link>

          <Link to='/login' style={styles.link}>
            User Login
          </Link>

          <Link to='/register' style={styles.link}>
            Register
          </Link>

        </div>

      </nav>

      {/* LOGIN PAGE */}
      <div style={styles.page}>

        <form
          style={styles.card}
          onSubmit={handleLogin}
        >

          <h1 style={styles.title}>
            Admin Login
          </h1>

          <p style={styles.subtitle}>
            Login as administrator
          </p>

          {/* EMAIL */}
          <div style={styles.inputGroup}>

            <label style={styles.label}>
              Email Address
            </label>

            <input
              type='email'
              name='email'
              placeholder='Enter admin email'
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />

          </div>

          {/* PASSWORD */}
          <div style={styles.inputGroup}>

            <label style={styles.label}>
              Password
            </label>

            <input
              type='password'
              name='password'
              placeholder='Enter admin password'
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />

          </div>

          {/* ERROR */}
          {error && (
            <p style={styles.error}>
              {error}
            </p>
          )}

          {/* BUTTON */}
          <button
            type='submit'
            style={styles.button}
          >
            Login
          </button>

        </form>

      </div>

    </div>
  )
}

const styles = {

  /* NAVBAR */
  navbar: {
    width: '100%',
    height: '70px',
    background: '#111827',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 40px',
    boxSizing: 'border-box',
  },

  logo: {
    color: '#fff',
    fontSize: '28px',
    fontWeight: '700',
    margin: 0,
  },

  navLinks: {
    display: 'flex',
    gap: '25px',
  },

  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
  },

  /* PAGE */
  page: {
    minHeight: 'calc(100vh - 70px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f3f6fb',
    padding: '20px',
  },

  card: {
    width: '100%',
    maxWidth: '420px',
    background: '#fff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  title: {
    textAlign: 'center',
    fontSize: '32px',
    color: '#111827',
    margin: 0,
  },

  subtitle: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: '-10px',
  },

  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },

  label: {
    marginBottom: '8px',
    fontWeight: '600',
    color: '#374151',
  },

  input: {
    padding: '14px',
    borderRadius: '10px',
    border: '1px solid #d1d5db',
    fontSize: '15px',
    outline: 'none',
  },

  button: {
    padding: '14px',
    border: 'none',
    borderRadius: '10px',
    background: '#2563eb',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },

  error: {
    color: 'red',
    textAlign: 'center',
    margin: 0,
  },

}

export default AdminLogin