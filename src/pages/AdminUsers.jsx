import { useEffect, useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import './Admin.css'

function AdminUsers() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const storedUsers =
      JSON.parse(localStorage.getItem('users')) || []

    setUsers(storedUsers)
  }, [])

  const deleteUser = (index) => {
    const updatedUsers = users.filter(
      (_, i) => i !== index
    )

    setUsers(updatedUsers)

    localStorage.setItem(
      'users',
      JSON.stringify(updatedUsers)
    )
  }

  return (
    <div className='admin-layout'>
      <AdminSidebar />

      <div className='admin-content'>
        <h1>Manage Users</h1>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Last Active</th>
              <th>Email Verification</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>Today</td>
                <td>Verified</td>
                <td>Active</td>

                <td>
                  <button
                    className='delete-btn'
                    onClick={() =>
                      deleteUser(index)
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

export default AdminUsers