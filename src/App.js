import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Member/Home";
import Layout from "./components/shared/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/Member/UserDashBoard";
import AdminDashboard from "./pages/Admin/AdminDashBoard";
import RoleLayout from "./components/shared/RoleLayout";
import { ToastContainer } from "react-toastify";
import AddMemberDynamic from "./components/shared/AddMemberDynamic";
import AddMember from "./pages/Admin/Member/AddMember";
import Dashboard from "./pages/Dashboard";
import PaymentHistoryTable from "./pages/Member/PaymentHistoryTable";

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

        <Route path="/:role/dashboard" element={<RoleLayout />}>
          <Route index element={<Dashboard />} />
          <Route
            path="/:role/dashboard/add-member"
            element={<AddMember role="Member" />}
          />
          <Route
            path="/:role/dashboard/add-trainer"
            element={<AddMember role="Trainer" />}
          />
          <Route
            path="/:role/dashboard/add-accountant"
            element={<AddMember role="Accountant" />}
          />
          <Route
            path="/:role/dashboard/add-hr"
            element={<AddMember role="HR Manager" />}
          />
          <Route
            path="/:role/dashboard/add-lead"
            element={<AddMember role="Lead" />}
          />
          <Route
            path="/:role/dashboard/add-manager"
            element={<AddMember role="Manager" />}
          />
          <Route
            path="/:role/dashboard/add-receptionist"
            element={<AddMember role="Receptionist" />}
          />
          <Route path="member-pay-history" element={<PaymentHistoryTable />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
