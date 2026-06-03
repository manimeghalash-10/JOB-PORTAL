import { useEffect, useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import './Admin.css'

function AdminJobs() {
  const [jobs, setJobs] = useState([])

  const [formData, setFormData] = useState({
    company: '',
    position: '',
    type: '',
    location: '',
    salary: '',
    experience: '',
    skills: '',
    deadline: '',
    mode: '',
    status: '',
  })

  useEffect(() => {
    const storedJobs =
      JSON.parse(localStorage.getItem('jobs')) || []

    setJobs(storedJobs)
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const addJob = () => {
    const updatedJobs = [...jobs, formData]

    setJobs(updatedJobs)

    localStorage.setItem(
      'jobs',
      JSON.stringify(updatedJobs)
    )

    setFormData({
      company: '',
      position: '',
      type: '',
      location: '',
      salary: '',
      experience: '',
      skills: '',
      deadline: '',
      mode: '',
      status: '',
    })
  }

  const deleteJob = (index) => {
    const updatedJobs = jobs.filter(
      (_, i) => i !== index
    )

    setJobs(updatedJobs)

    localStorage.setItem(
      'jobs',
      JSON.stringify(updatedJobs)
    )
  }

  return (
    <div className='admin-layout'>
      <AdminSidebar />

      <div className='admin-content'>
        <h1>Manage Jobs</h1>

        <div className='job-form'>

          <input
            type='text'
            placeholder='Company'
            name='company'
            value={formData.company}
            onChange={handleChange}
          />

          <input
            type='text'
            placeholder='Position'
            name='position'
            value={formData.position}
            onChange={handleChange}
          />

          <input
            type='text'
            placeholder='Job Type'
            name='type'
            value={formData.type}
            onChange={handleChange}
          />

          <input
            type='text'
            placeholder='Location'
            name='location'
            value={formData.location}
            onChange={handleChange}
          />

          <input
            type='text'
            placeholder='Salary'
            name='salary'
            value={formData.salary}
            onChange={handleChange}
          />

          <input
            type='text'
            placeholder='Experience'
            name='experience'
            value={formData.experience}
            onChange={handleChange}
          />

          <input
            type='text'
            placeholder='Skills Required'
            name='skills'
            value={formData.skills}
            onChange={handleChange}
          />

          <input
            type='date'
            name='deadline'
            value={formData.deadline}
            onChange={handleChange}
          />

          <select
            name='mode'
            value={formData.mode}
            onChange={handleChange}
          >
            <option value=''>Select Mode</option>
            <option>Remote</option>
            <option>Hybrid</option>
            <option>Onsite</option>
          </select>

          <select
            name='status'
            value={formData.status}
            onChange={handleChange}
          >
            <option value=''>Job Status</option>
            <option>Active</option>
          
          </select>

          <button
            className='add-job-btn'
            onClick={addJob}
          >
            Add Job
          </button>

        </div>

        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Experience</th>
              <th>Mode</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job, index) => (
              <tr key={index}>
                <td>{job.company}</td>
                <td>{job.position}</td>
                <td>{job.salary}</td>
                <td>{job.experience}</td>
                <td>{job.mode}</td>
                <td>{job.status}</td>

                <td>
                  <button
                    className='delete-btn'
                    onClick={() =>
                      deleteJob(index)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default AdminJobs