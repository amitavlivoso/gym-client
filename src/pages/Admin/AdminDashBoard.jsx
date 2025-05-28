import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import PaymentStatus from "../../components/Admin/Dashboard/Statistics";
import MemberTable from "../../components/Admin/Dashboard/MemberTable";
import TrainerTable from "../../components/Admin/Dashboard/TrainerTable";
import ManagerTable from "../../components/Admin/Dashboard/ManagerTable";
import LeadTable from "../../components/Admin/Dashboard/LeadTable";
import AcountantTable from "../../components/Admin/Dashboard/Accountant";
import RecepionistTable from "../../components/Admin/Dashboard/Receptionist";
import HRManagerTable from "../../components/Admin/Dashboard/HrManager";

const mockUsers = [
  { id: 1, name: "Alice", email: "alice@example.com", group: "Gold" },
  { id: 2, name: "Bob", email: "bob@example.com", group: "Silver" },
];

const mockPayments = [
  { amount: 500, date: "2025-05-20" },
  { amount: 700, date: "2025-05-25" },
  { amount: 1200, date: "2025-05-05" },
  { amount: 900, date: "2025-04-29" },
];

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    setUsers(mockUsers);
    setPayments(mockPayments);
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <PaymentStatus />
        <MemberTable />
        <TrainerTable />
        <ManagerTable />
        <LeadTable />
        <AcountantTable />
        <RecepionistTable />
        <HRManagerTable />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
