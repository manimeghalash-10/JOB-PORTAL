import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Login() {

  const navigate = useNavigate()

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })

  }

  // HANDLE LOGIN
  const handleSubmit = async (e) => {

    e.preventDefault()

    const { email, password } = loginData

    // VALIDATION
    if (!email || !password) {

      setError('Please fill all fields')
      return

    }

    try {

      const response = await fetch(
        'http://localhost:8082/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      )

      const data = await response.text()

      // SUCCESS
      if (data === 'Login Successful') {

        // SAVE CURRENT USER
        localStorage.setItem(
          'currentUser',
          JSON.stringify(loginData)
        )

        alert('Login Successful')

        // NAVIGATE TO APPLY PAGE
        navigate('/apply/1')

      } else {

        setError(data)

      }

    } catch (error) {

      setError('Connection Failed')

    }

  }

  return (

    <div>

      <Navbar />

      <div style={styles.page}>

        <form
          style={styles.card}
          onSubmit={handleSubmit}
        >

          <h2 style={styles.title}>
            Login
          </h2>

          <p style={styles.subtitle}>
            Login to continue
          </p>

          {/* EMAIL */}
          <div style={styles.inputGroup}>

            <label style={styles.label}>
              Email Address
            </label>

            <input
              type='email'
              placeholder='Enter your email'
              name='email'
              value={loginData.email}
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
              placeholder='Enter your password'
              name='password'
              value={loginData.password}
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

          {/* REGISTER LINK */}
          <p style={styles.registerText}>

            Don't have an account?

            <Link
              to='/register'
              style={styles.registerLink}
            >
              Register
            </Link>

          </p>

        </form>

      </div>

    </div>

  )
}

const styles = {

  page: {
    minHeight: '90vh',
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
    marginBottom: '5px',
  },

  subtitle: {
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: '10px',
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
    fontSize: '14px',
    margin: 0,
    textAlign: 'center',
  },

  registerText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: '10px',
  },

  registerLink: {
    marginLeft: '6px',
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: '600',
  },

}

export default Login