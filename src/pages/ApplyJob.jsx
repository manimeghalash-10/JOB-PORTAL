import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function ApplyJob() {

  const { id } = useParams()

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
  })

  const [resume, setResume] = useState(null)

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

  }

  // HANDLE RESUME UPLOAD
  const handleResumeUpload = (e) => {

    const file = e.target.files[0]

    if (file) {
      setResume(file)
    }

  }

  // REMOVE RESUME
  const removeResume = () => {
    setResume(null)
  }

  // HANDLE APPLY
  const handleApply = (e) => {

    e.preventDefault()

    // VALIDATION
    if (
      !formData.fullName ||
      !formData.email
    ) {

      alert('Please fill all fields')
      return

    }

    if (!resume) {

      alert('Please upload your resume')
      return

    }

    // GET OLD APPLICATIONS
    const applications =
      JSON.parse(
        localStorage.getItem('applications')
      ) || []

    // NEW APPLICATION
    const newApplication = {

      id: Date.now(),

      name: formData.fullName,

      email: formData.email,

      job: `Job ID ${id}`,

      status: 'Pending',

      resumeName: resume.name,

      appliedAt:
        new Date().toLocaleString(),

    }

    // SAVE APPLICATION
    applications.push(newApplication)

    localStorage.setItem(
      'applications',
      JSON.stringify(applications)
    )

    // SUCCESS
    alert(
      `Application Submitted Successfully for Job ID ${id}`
    )

    // CLEAR FORM
    setFormData({
      fullName: '',
      email: '',
    })

    setResume(null)

    // NAVIGATE
    navigate('/profile')

  }

  return (

    <div
      style={{
        background: '#f5f7fb',
        minHeight: '100vh',
      }}
    >

      <Navbar />

      <div style={styles.container}>

        <div style={styles.card}>

          {/* HEADER */}
          <div style={styles.header}>

            <h1 style={styles.title}>
              Apply for Job
            </h1>

            <p style={styles.subtitle}>
              Complete your application
              for Job #{id}
            </p>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleApply}
            style={styles.form}
          >

            {/* FULL NAME */}
            <div style={styles.inputGroup}>

              <label style={styles.label}>
                Full Name
              </label>

              <input
                type='text'
                name='fullName'
                placeholder='Enter your full name'
                value={formData.fullName}
                onChange={handleChange}
                required
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
                name='email'
                placeholder='Enter your email address'
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
              />

            </div>

            {/* RESUME */}
            <div style={styles.inputGroup}>

              <label style={styles.label}>
                Upload Resume
              </label>

              {!resume ? (

                <label style={styles.uploadBox}>

                  <input
                    type='file'
                    accept='.pdf,.doc,.docx'
                    onChange={handleResumeUpload}
                    style={{
                      display: 'none',
                    }}
                  />

                  <div>

                    <p style={styles.uploadText}>
                      Click to Upload Resume
                    </p>

                    <p style={styles.uploadSubText}>
                      PDF, DOC, DOCX Supported
                    </p>

                  </div>

                </label>

              ) : (

                <div style={styles.uploadedFile}>

                  <div>

                    <p style={styles.fileName}>
                      ✅ {resume.name}
                    </p>

                    <p style={styles.fileSize}>
                      {(
                        resume.size / 1024
                      ).toFixed(2)}{' '}
                      KB
                    </p>

                  </div>

                  <button
                    type='button'
                    onClick={removeResume}
                    style={styles.removeBtn}
                  >
                    Remove
                  </button>

                </div>

              )}

            </div>

            {/* SUBMIT BUTTON */}
            <button
              type='submit'
              style={styles.submitBtn}
            >
              Submit Application
            </button>

          </form>

        </div>

      </div>

    </div>

  )
}

const styles = {

  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '50px 20px',
  },

  card: {
    width: '100%',
    maxWidth: '550px',
    background: '#fff',
    borderRadius: '18px',
    padding: '40px',
    boxShadow:
      '0 10px 30px rgba(0,0,0,0.08)',
  },

  header: {
    textAlign: 'center',
    marginBottom: '35px',
  },

  title: {
    fontSize: '32px',
    color: '#111827',
    marginBottom: '10px',
  },

  subtitle: {
    color: '#6b7280',
    fontSize: '15px',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '22px',
  },

  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },

  label: {
    marginBottom: '8px',
    fontWeight: '600',
    color: '#374151',
    fontSize: '15px',
  },

  input: {
    width: '100%',
    padding: '14px',
    borderRadius: '10px',
    border: '1px solid #d1d5db',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
  },

  uploadBox: {
    border: '2px dashed #2563eb',
    borderRadius: '14px',
    padding: '35px 20px',
    textAlign: 'center',
    cursor: 'pointer',
    background: '#eff6ff',
  },

  uploadText: {
    margin: 0,
    fontSize: '18px',
    fontWeight: '600',
    color: '#2563eb',
  },

  uploadSubText: {
    marginTop: '8px',
    color: '#6b7280',
    fontSize: '14px',
  },

  uploadedFile: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#f9fafb',
    border: '1px solid #d1d5db',
    borderRadius: '12px',
    padding: '16px',
  },

  fileName: {
    margin: 0,
    fontWeight: '600',
    color: '#111827',
  },

  fileSize: {
    margin: '5px 0 0',
    fontSize: '13px',
    color: '#6b7280',
  },

  removeBtn: {
    padding: '8px 14px',
    background: '#ef4444',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
  },

  submitBtn: {
    marginTop: '10px',
    padding: '15px',
    border: 'none',
    borderRadius: '12px',
    background: '#2563eb',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },

}

export default ApplyJob