import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Member/Home";
import Layout from "./components/shared/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/Member/UserDashBoard";
import AdminDashboard from "./pages/Admin/AdminDashBoard";
import AdminLayout from "./components/Admin/shared/AdminLayout";
import AddMember from "./pages/Admin/Member/AddMember";

function App() {
  return (
    <Router>
      <Routes>
        {/* Regular User Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Signup />} />
          <Route path="user-dashboard" element={<UserDashboard />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin-dashboard/" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="add-member" element={<AddMember />} />

          {/* Example: <Route path="users" element={<AdminUsers />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
