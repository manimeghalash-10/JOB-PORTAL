import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Register() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
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

  // HANDLE REGISTER
  const handleRegister = async (e) => {

    e.preventDefault()

    const { name, email, password } = formData

    // VALIDATION
    if (!name || !email || !password) {
      setError('Please fill all fields')
      return
    }

    try {

      const response = await fetch(
        'http://localhost:8082/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role: 'USER',
          }),
        }
      )

      // SUCCESS
      if (response.ok) {

        alert('Registered Successfully')

        // CLEAR FORM
        setFormData({
          name: '',
          email: '',
          password: '',
        })

        // REDIRECT
        navigate('/login')

      } else {

        setError('Email already exists')

      }

    } catch (error) {

      console.log(error)

      setError('Connection Failed')

    }

  }

  return (

    <div>

      {/* NAVBAR */}
      <Navbar />

      <div style={styles.page}>

        <div style={styles.card}>

          <h1 style={styles.title}>
            Create Account
          </h1>

          <p style={styles.subtitle}>
            Register to continue
          </p>

          <form
            onSubmit={handleRegister}
            style={styles.form}
          >

            {/* NAME */}
            <div style={styles.inputGroup}>

              <label style={styles.label}>
                Full Name
              </label>

              <input
                type='text'
                placeholder='Enter your full name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
              />

            </div>

            {/* EMAIL */}
            <div style={styles.inputGroup}>

              <label style={styles.label}>
                Email Address
              </label>

              <input
                type='email'
                placeholder='Enter your email'
                name='email'
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
                placeholder='Enter your password'
                name='password'
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
              Register
            </button>

          </form>

          {/* LOGIN LINK */}
          <p style={styles.loginText}>

            Already have an account?

            <Link
              to='/login'
              style={styles.loginLink}
            >
              Login
            </Link>

          </p>

        </div>

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
  },

  title: {
    textAlign: 'center',
    fontSize: '32px',
    marginBottom: '10px',
    color: '#111827',
  },

  subtitle: {
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: '30px',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
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

  loginText: {
    textAlign: 'center',
    marginTop: '25px',
    color: '#6b7280',
  },

  loginLink: {
    marginLeft: '6px',
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: '600',
  },

}

export default Register