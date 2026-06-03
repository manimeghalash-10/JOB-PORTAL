import { Link } from 'react-router-dom'
import './JobCard.css'
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaClock,
  FaBuilding,
} from 'react-icons/fa'

function JobCard({ job }) {
  return (
    <div className='job-card'>

      {/* HEADER */}
      <div className='job-header'>

        <div className='company-logo'>
          {job.company?.charAt(0)}
        </div>

        <div className='job-header-info'>
          <h2 className='job-title'>
            {job.title}
          </h2>

          <p className='company-name'>
            <FaBuilding className='job-icon' />
            {job.company}
          </p>
        </div>

        <span className='job-badge'>
          {job.type}
        </span>

      </div>

      {/* DETAILS */}
      <div className='job-details'>

        <div className='detail-item'>
          <FaMapMarkerAlt className='job-icon' />

          <span>{job.location}</span>
        </div>

        {job.salary && (
          <div className='detail-item'>
            <FaMoneyBillWave className='job-icon' />

            <span>₹ {job.salary}</span>
          </div>
        )}

        {job.experience && (
          <div className='detail-item'>
            <FaBriefcase className='job-icon' />

            <span>{job.experience}</span>
          </div>
        )}

        {job.mode && (
          <div className='detail-item'>
            <FaClock className='job-icon' />

            <span>{job.mode}</span>
          </div>
        )}

      </div>

      {/* SKILLS */}
      {job.skills && (
        <div className='skills-container'>
          {job.skills
            .split(',')
            .map((skill, index) => (
              <span
                key={index}
                className='skill-chip'
              >
                {skill.trim()}
              </span>
            ))}
        </div>
      )}

      {/* FOOTER */}
      <div className='job-footer'>

        <div className='posted-time'>
          Posted Recently
        </div>

        <Link
          to={`/apply/${job.id}`}
          className='apply-link'
        >
          <button className='apply-btn'>
            Apply Now
          </button>
        </Link>

      </div>

    </div>
  )
}

export default JobCard