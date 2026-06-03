import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
import './Admin.css'

function AdminDashboard() {

  const navigate = useNavigate()

  const [jobs, setJobs] = useState([])
  const [users, setUsers] = useState([])
  const [applications, setApplications] =
    useState([])
  const [companies, setCompanies] =
    useState([])

  // LOAD DATA
  useEffect(() => {

    // CHECK ADMIN LOGIN
    const adminLoggedIn =
      localStorage.getItem('adminLoggedIn')

    if (!adminLoggedIn) {

      navigate('/admin-login')
      return

    }

    const storedJobs =
      JSON.parse(
        localStorage.getItem('jobs')
      ) || []

    const storedUsers =
      JSON.parse(
        localStorage.getItem('users')
      ) || []

    const storedApplications =
      JSON.parse(
        localStorage.getItem('applications')
      ) || []

    const storedCompanies =
      JSON.parse(
        localStorage.getItem('companies')
      ) || []

    setJobs(storedJobs)
    setUsers(storedUsers)
    setApplications(storedApplications)
    setCompanies(storedCompanies)

  }, [navigate])

  // UPDATE STATUS
  const updateStatus = (
    index,
    newStatus
  ) => {

    const updatedApplications =
      [...applications]

    updatedApplications[index].status =
      newStatus

    setApplications(updatedApplications)

    localStorage.setItem(
      'applications',
      JSON.stringify(updatedApplications)
    )

  }

  // DELETE APPLICATION
  const deleteApplication = (index) => {

    const updatedApplications =
      applications.filter(
        (_, i) => i !== index
      )

    setApplications(updatedApplications)

    localStorage.setItem(
      'applications',
      JSON.stringify(updatedApplications)
    )

  }

  // ADMIN LOGOUT
  const handleLogout = () => {

    localStorage.removeItem(
      'adminLoggedIn'
    )

    alert('Admin Logged Out')

    navigate('/admin-login')

  }

  return (

    <div className='admin-layout'>

      <AdminSidebar />

      <div className='admin-content'>

        {/* TOP BAR */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >

          <h1>
            Admin Dashboard
          </h1>

          <button
            onClick={handleLogout}
            style={{
              padding: '10px 18px',
              background: '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            Logout
          </button>

        </div>

        {/* STATISTICS */}
        <div className='stats-grid'>

          <div className='stat-card'>
            <h2>{jobs.length}</h2>
            <p>Total Jobs</p>
          </div>

          <div className='stat-card'>
            <h2>{users.length}</h2>
            <p>Total Users</p>
          </div>

          <div className='stat-card'>
            <h2>{applications.length}</h2>
            <p>Total Applications</p>
          </div>

          <div className='stat-card'>
            <h2>{companies.length}</h2>
            <p>Total Companies</p>
          </div>

          <div className='stat-card'>
            <h2>15</h2>
            <p>Active Recruiters</p>
          </div>

          <div className='stat-card'>
            <h2>8</h2>
            <p>Jobs Posted Today</p>
          </div>

          <div className='stat-card'>
            <h2>5</h2>
            <p>New Users Today</p>
          </div>

          <div className='stat-card'>
            <h2>Admin</h2>
            <p>Full Control Access</p>
          </div>

        </div>

        {/* USER ACTIVITY */}
        <div className='dashboard-section'>

          <h2>
            Recent User Activity
          </h2>

          <table>

            <thead>

              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Last Active</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {users.length > 0 ? (

                users.map((user, index) => (

                  <tr key={index}>

                    <td>{user.name}</td>

                    <td>{user.email}</td>

                    <td>Today</td>

                    <td>
                      <span className='active-status'>
                        Active
                      </span>
                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td colSpan='4'>
                    No Users Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* APPLICATION TRACKING */}
        <div className='dashboard-section'>

          <h2>
            Application Tracking
          </h2>

          <table>

            <thead>

              <tr>
                <th>Applicant</th>
                <th>Email</th>
                <th>Job</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {applications.length > 0 ? (

                applications.map(
                  (app, index) => (

                    <tr key={index}>

                      <td>
                        {app.name || 'N/A'}
                      </td>

                      <td>
                        {app.email || 'N/A'}
                      </td>

                      <td>
                        {app.job || 'N/A'}
                      </td>

                      <td>

                        <select
                          value={
                            app.status ||
                            'Pending'
                          }
                          onChange={(e) =>
                            updateStatus(
                              index,
                              e.target.value
                            )
                          }
                          className='status-select'
                        >

                          <option value='Pending'>
                            Pending
                          </option>

                          <option value='Reviewed'>
                            Reviewed
                          </option>

                          <option value='Accepted'>
                            Accepted
                          </option>

                          <option value='Rejected'>
                            Rejected
                          </option>

                        </select>

                      </td>

                      <td>

                        <button
                          className='delete-btn'
                          onClick={() =>
                            deleteApplication(
                              index
                            )
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td colSpan='5'>
                    No Applications Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  )
}

export default AdminDashboard