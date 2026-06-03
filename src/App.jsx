import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ApplyJob from "./pages/ApplyJob";
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from "./pages/AdminDashboard";
import AdminJobs from "./pages/AdminJobs";
import AdminUsers from "./pages/AdminUsers";

function App() {

  return (
    <div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/apply/:id' element={<ApplyJob />} />

        {/* Admin */}
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/admin/jobs' element={<AdminJobs />} />
        <Route path='/admin/users' element={<AdminUsers />} />
      </Routes>

    </div>
  );
}

export default App;