import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Member/Home";
import Layout from "./components/shared/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/Member/UserDashBoard";
import AdminDashboard from "./pages/Admin/AdminDashBoard";
import RoleLayout from "./components/shared/RoleLayout";
import { ToastContainer } from "react-toastify";
import AddMember from "./pages/Admin/Member/AddMember";
import Dashboard from "./pages/Dashboard";
import PaymentHistoryTable from "./pages/Member/PaymentHistoryTable";
import MemberDetails from "./components/Admin/MemberDetails";
import PaymentPage from "./components/Admin/Dashboard/Payment";
import JoinUsForm from "./pages/Member/JoinUs";
import PaymentCardPage from "./pages/Member/paymentCard";
import MemberTable from "./components/Admin/Dashboard/MemberTable";
import TrainerTable from "./components/Admin/Dashboard/TrainerTable";
import AboutUs from "./components/Member/AboutUs";
import ContactUs from "./components/Member/ContactUs";
import ActiveMember from "./components/Admin/Dashboard/ActiveMember";
import InActiveMember from "./components/Admin/Dashboard/InActiveMember";
import AttendancePage from "./components/Admin/Dashboard/Attendnance";
import WorkoutPlansPage from "./components/Admin/Dashboard/WorkoutPlan";
import NutritionPlansPage from "./components/Admin/Dashboard/Nutritionplan";
import EquipmentPlansPage from "./components/Admin/Dashboard/Equipmentsplan";
import WorkoutPlanForm from "./components/Admin/Dashboard/WorkoutPlanForm";
import EquipmentForm from "./components/Admin/Dashboard/EquipmentForm";
import NutritionPlanForm from "./components/Admin/Dashboard/NutritionPlanForm";
import AcountantTable from "./components/Admin/Dashboard/Accountant";
import HRManagerTable from "./components/Admin/Dashboard/HrManager";
import LeadTable from "./components/Admin/Dashboard/LeadTable";
import ManagerTable from "./components/Admin/Dashboard/ManagerTable";
import RecepionistTable from "./components/Admin/Dashboard/Receptionist";
import Profile from "./components/Admin/Dashboard/Profile";
import AdminTable from "./components/SuperAdmin/AdminTable";
import AddAdmin from "./components/SuperAdmin/AddAdmin";
import ActiveAdminTable from "./components/SuperAdmin/ActiveAdmin";
import InActiveAdminTable from "./components/SuperAdmin/InActiveAdmin";
import CreatePaymentForUser from "./pages/Admin/PaymentCreatepage";
import PaymentTableForUser from "./pages/Admin/PaymentTableForUser";
import PaymentTableForAdmin from "./pages/SuperAdmin/PaymentTableForAdmin";
import CreatePaymentForAdmin from "./pages/SuperAdmin/PaymentCreatepage";
import IndividualWorkoutPlansPage from "./components/Member/DashBoard/IndividualWorkoutplan";
import WorkoutPlans from "./components/Member/WorkoutPlan";
import IndividualNutritionPlansPage from "./pages/Admin/Member/IndividualNutrition";
import NutritionIndividualPlansPage from "./pages/Member/NutritionIndividual";
import AssignTrainer from "./components/Admin/Dashboard/AssignTrainer";
import TrainerMemberTable from "./components/Trainer/MemberTable";
import PayForUser from "./components/Admin/Dashboard/payForUser";
import PaymentForm from "./components/Admin/Dashboard/PaymentForm";

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
          <Route path="join" element={<JoinUsForm />} />
          <Route path="paymentpage" element={<PaymentCardPage />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<ContactUs />} />
        </Route>

        <Route path="/:role/dashboard" element={<RoleLayout />}>
          <Route index element={<Dashboard />} />
          <Route
            path="/:role/dashboard/add-member"
            element={<AddMember role="Member" />}
          />
          <Route path="/:role/dashboard/add-admin" element={<AddAdmin />} />
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
          <Route path="payment" element={<PaymentPage />} />
          <Route path="member/:id" element={<MemberDetails />} />
          <Route path="member-table" element={<MemberTable />} />
          <Route path="trainer-member-table" element={<TrainerMemberTable />} />
          <Route path="trainer-table" element={<TrainerTable />} />
          <Route path="accountant-table" element={<AcountantTable />} />
          <Route path="hr-table" element={<HRManagerTable />} />
          <Route path="lead-table" element={<LeadTable />} />
          <Route path="manager-table" element={<ManagerTable />} />
          <Route path="admin-table" element={<AdminTable />} />
          <Route path="assign-trainer" element={<AssignTrainer />} />
          <Route path="active-admin" element={<ActiveAdminTable />} />
          <Route path="inactive-admin" element={<InActiveAdminTable />} />
          <Route path="receptionist-table" element={<RecepionistTable />} />
          <Route path="active-member" element={<ActiveMember />} />
          <Route path="inactive-member" element={<InActiveMember />} />
          <Route path="attendnance" element={<AttendancePage />} />
          <Route path="workoutplan" element={<WorkoutPlansPage />} />
          <Route
            path="member-workoutplan"
            element={<IndividualWorkoutPlansPage />}
          />
          <Route
            path="member-nutritionplan"
            element={<IndividualNutritionPlansPage />}
          />
          <Route
            path="individual-member-workoutplan"
            element={<WorkoutPlans />}
          />
          <Route
            path="individual-member-nutritionplan"
            element={<NutritionIndividualPlansPage />}
          />
          <Route path="nutrition" element={<NutritionPlansPage />} />
          <Route path="pay-for-user" element={<PayForUser />} />
          <Route path="paymet-form" element={<PaymentForm />} />
          <Route path="equipment" element={<EquipmentPlansPage />} />
          <Route path="add-workoutplan" element={<WorkoutPlanForm />} />
          <Route path="add-equipment" element={<EquipmentForm />} />
          <Route path="add-nutrition" element={<NutritionPlanForm />} />
          <Route path="profile" element={<Profile />} />
          <Route
            path="payment-create-for-user"
            element={<CreatePaymentForUser />}
          />
          <Route
            path="all-payment-create-for-user"
            element={<PaymentTableForUser />}
          />
          <Route
            path="payment-create-for-admin"
            element={<CreatePaymentForAdmin />}
          />
          <Route
            path="all-payment-create-for-admin"
            element={<PaymentTableForAdmin />}
          />
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
