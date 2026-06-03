import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import ProgressBar from '../components/ProgressBar'
import './Profile.css'

import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaBriefcase,
  FaLinkedin,
  FaPhoneAlt,
  FaGithub,
  FaGlobe,
  FaUserEdit,
  FaDownload,
  FaSave,
  FaTrash,
  FaCamera,
} from 'react-icons/fa'

function Profile() {

  // PROFILE STATE
  const [profile, setProfile] = useState({
    name: 'Fintan Cabrera',
    role: 'Frontend Developer',
    location: 'Bangalore, India',
    email: 'fintan.dev@email.com',
    phone: '+91 9876543210',
    about:
      'Passionate Frontend Developer with experience in React.js, JavaScript, UI/UX design, and responsive web applications.',
    skills: 'React, JavaScript, CSS, HTML, Node.js',
    image: '',
  })

  // EDIT MODE
  const [isEditing, setIsEditing] = useState(false)

  // RESUME
  const [resume, setResume] = useState(null)

  // LOAD DATA
  useEffect(() => {

    const savedProfile =
      JSON.parse(localStorage.getItem('profile'))

    const savedResume =
      JSON.parse(localStorage.getItem('resume'))

    if (savedProfile) {
      setProfile(savedProfile)
    }

    if (savedResume) {
      setResume(savedResume)
    }

  }, [])

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    })

  }

  // SAVE PROFILE
  const handleSave = () => {

    localStorage.setItem(
      'profile',
      JSON.stringify(profile)
    )

    alert('Profile Updated Successfully')

    setIsEditing(false)

  }

  // PROFILE IMAGE UPLOAD
  const handleImageUpload = (e) => {

    const file = e.target.files[0]

    if (!file) return

    const reader = new FileReader()

    reader.onloadend = () => {

      const updatedProfile = {
        ...profile,
        image: reader.result,
      }

      setProfile(updatedProfile)

      localStorage.setItem(
        'profile',
        JSON.stringify(updatedProfile)
      )

    }

    reader.readAsDataURL(file)

  }

  // UPLOAD RESUME
  const handleResumeUpload = (e) => {

    const file = e.target.files[0]

    if (file) {

      const resumeData = {
        name: file.name,
      }

      setResume(resumeData)

      localStorage.setItem(
        'resume',
        JSON.stringify(resumeData)
      )

      alert('Resume Uploaded Successfully')

    }

  }

  // REMOVE RESUME
  const removeResume = () => {

    setResume(null)

    localStorage.removeItem('resume')

    alert('Resume Removed')

  }

  // PROFILE COMPLETION
  const fields = Object.values(profile)

  const completedFields =
    fields.filter((field) => field !== '').length

  const completion =
    Math.round((completedFields / fields.length) * 100)

  return (

    <div className='profile-wrapper'>

      <Navbar />

      <div className='profile-page'>

        <div className='profile-card'>

          {/* BANNER */}
          <div className='profile-banner'></div>

          {/* IMAGE */}
          <div className='profile-image-container'>

            <img
              src={
                profile.image
                  ? profile.image
                  : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
              }
              alt='profile'
              className='profile-img'
            />

            <label
              htmlFor='profileImage'
              className='camera-icon'
            >
              <FaCamera />
            </label>

            <input
              type='file'
              id='profileImage'
              hidden
              accept='image/*'
              onChange={handleImageUpload}
            />

          </div>

          {/* CONTENT */}
          <div className='profile-content'>

            {/* NAME */}
            {isEditing ? (

              <input
                type='text'
                name='name'
                value={profile.name}
                onChange={handleChange}
                className='edit-input'
              />

            ) : (

              <h2>{profile.name}</h2>

            )}

            {/* ROLE */}
            <p className='job-role'>

              <FaBriefcase />

              {isEditing ? (

                <input
                  type='text'
                  name='role'
                  value={profile.role}
                  onChange={handleChange}
                  className='edit-input'
                />

              ) : (

                profile.role

              )}

            </p>

            {/* LOCATION */}
            <p className='profile-location'>

              <FaMapMarkerAlt />

              {isEditing ? (

                <input
                  type='text'
                  name='location'
                  value={profile.location}
                  onChange={handleChange}
                  className='edit-input'
                />

              ) : (

                profile.location

              )}

            </p>

            {/* EMAIL */}
            <p className='profile-email'>

              <FaEnvelope />

              {isEditing ? (

                <input
                  type='email'
                  name='email'
                  value={profile.email}
                  onChange={handleChange}
                  className='edit-input'
                />

              ) : (

                profile.email

              )}

            </p>

            {/* PHONE */}
            <p className='profile-email'>

              <FaPhoneAlt />

              {isEditing ? (

                <input
                  type='text'
                  name='phone'
                  value={profile.phone}
                  onChange={handleChange}
                  className='edit-input'
                />

              ) : (

                profile.phone

              )}

            </p>

            {/* ABOUT */}
            <div className='about-section'>

              <h3>About Me</h3>

              {isEditing ? (

                <textarea
                  name='about'
                  value={profile.about}
                  onChange={handleChange}
                  className='edit-textarea'
                />

              ) : (

                <p>{profile.about}</p>

              )}

            </div>

            {/* SKILLS */}
            <div className='skills-section'>

              {profile.skills
                .split(',')
                .map((skill, index) => (

                  <span key={index}>
                    {skill.trim()}
                  </span>

                ))}

            </div>

            {/* PROGRESS */}
            <div className='progress-section'>

              <div className='progress-header'>

                <h3>Profile Completion</h3>

                <span>{completion}%</span>

              </div>

              <ProgressBar completed={completion} />

            </div>

            {/* RESUME */}
            <div className='resume-box'>

              <h3>Upload Resume</h3>

              <input
                type='file'
                id='resumeUpload'
                hidden
                onChange={handleResumeUpload}
              />

              {!resume ? (

                <label
                  htmlFor='resumeUpload'
                  className='upload-btn'
                >
                  Upload Resume
                </label>

              ) : (

                <div className='uploaded-file'>

                  <p>
                    ✅ {resume.name}
                  </p>

                  <div className='resume-actions'>

                    <button className='download-btn'>

                      <FaDownload />

                      Uploaded

                    </button>

                    <button
                      className='remove-btn'
                      onClick={removeResume}
                    >

                      <FaTrash />

                      Remove

                    </button>

                  </div>

                </div>

              )}

            </div>

            {/* SOCIAL ICONS */}
            <div className='social-links'>

              <a href='#'>
                <FaLinkedin />
              </a>

              <a href='#'>
                <FaGithub />
              </a>

              <a href='#'>
                <FaGlobe />
              </a>

            </div>

            {/* BUTTONS */}
            <div className='profile-actions'>

              {!isEditing ? (

                <button
                  className='edit-btn'
                  onClick={() =>
                    setIsEditing(true)
                  }
                >

                  <FaUserEdit />

                  Edit Profile

                </button>

              ) : (

                <button
                  className='save-btn'
                  onClick={handleSave}
                >

                  <FaSave />

                  Save Profile

                </button>

              )}

              <button className='linkedin-btn'>

                <FaLinkedin />

                LinkedIn

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  )
}

export default Profile