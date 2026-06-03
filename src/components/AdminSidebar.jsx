import { Link } from 'react-router-dom'

function AdminSidebar() {
  return (
    <div className='admin-sidebar'>
      <h2>Admin Panel</h2>

      <Link to='/admin'>Dashboard</Link>
      <Link to='/admin/jobs'>Manage Jobs</Link>
      <Link to='/admin/users'>Manage Users</Link>
    </div>
  )
}

export default AdminSidebar