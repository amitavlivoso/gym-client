// import React, { useEffect, useState } from "react";
// import { Box, Typography } from "@mui/material";
// import PaymentStatus from "../../components/Admin/Dashboard/Statistics";
// import MemberTable from "../../components/Admin/Dashboard/MemberTable";
// import TrainerTable from "../../components/Admin/Dashboard/TrainerTable";
// import ManagerTable from "../../components/Admin/Dashboard/ManagerTable";
// import LeadTable from "../../components/Admin/Dashboard/LeadTable";
// import AcountantTable from "../../components/Admin/Dashboard/Accountant";
// import RecepionistTable from "../../components/Admin/Dashboard/Receptionist";
// import HRManagerTable from "../../components/Admin/Dashboard/HrManager";
// import { getUserRoll } from "../../services/axiosClient";

// const mockUsers = [
//   { id: 1, name: "Alice", email: "alice@example.com", group: "Gold" },
//   { id: 2, name: "Bob", email: "bob@example.com", group: "Silver" },
// ];

// const mockPayments = [
//   { amount: 500, date: "2025-05-20" },
//   { amount: 700, date: "2025-05-25" },
//   { amount: 1200, date: "2025-05-05" },
//   { amount: 900, date: "2025-04-29" },
// ];

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [payments, setPayments] = useState([]);

//   useEffect(() => {
//     setUsers(mockUsers);
//     setPayments(mockPayments);
//   }, []);

//   return (
//     <Box sx={{ display: "flex" }}>
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <Typography variant="h4" gutterBottom>
//           {getUserRoll()}Dashboard
//         </Typography>
//         {/* <PaymentStatus /> */}
//         {getUserRoll() === "Admin" || getUserRoll() === "Receptionist" ? (
//           <>
//             <MemberTable />
//             <TrainerTable />
//             <ManagerTable />
//             <LeadTable />
//             <AcountantTable />
//             <RecepionistTable />
//             <HRManagerTable />
//           </>
//         ) : (
//           <></>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default AdminDashboard;

import { useState, useEffect } from "react";

import {
  LineChart,
  Line,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  ComposedChart,
  Area,
} from "recharts";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import { getAllPayment, getAllUser, getUser } from "../../services/Service";
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate, useParams } from "react-router-dom";
import { getUserName } from "../../services/axiosClient";

const AdminDashboard = () => {
  const [members, setMembers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2025");
  const [memberTrendData, setMemberTrendData] = useState([]);
  const [leadTrendData, setLeadTrendData] = useState([]);
  const [memberMonthlyChange, setMemberMonthlyChange] = useState(0);
  const [leadMonthlyChange, setLeadMonthlyChange] = useState(0);
  const [payments, setPayments] = useState([]);
  const [totalPayments, setTotalPayments] = useState(0);
  const [paymentTrendData, setPaymentTrendData] = useState([]);
  const [paymentMonthlyChange, setPaymentMonthlyChange] = useState({
    amount: 0,
    percentage: 0,
  });
  const [trainers, setTrainers] = useState([]);
  const [gymMembers, setGymMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const payload = {
        data: { filter: "" },
        page: 0,
        pageSize: 50,
        order: [["createdAt", "DESC"]],
      };
      try {
        const res = await getAllPayment(payload);
        const paymentRows = res?.data?.data?.rows || [];

        const paymentsWithNames = await Promise.all(
          paymentRows.map(async (payment) => {
            try {
              const userRes = await getUser(payment.userId);
              const user = userRes?.data?.data;
              const fullName = `${user?.firstName || ""} ${
                user?.lastName || ""
              }`.trim();
              return {
                ...payment,
                name: fullName,
              };
            } catch (err) {
              return { ...payment, name: "Unknown User" };
            }
          })
        );

        setPayments(paymentsWithNames);

        // Process payment data for the selected year
        const monthlyPayments = processPaymentData(
          paymentsWithNames,
          selectedYear
        );
        setPaymentTrendData(monthlyPayments);

        calculatePaymentGrowth(monthlyPayments);
      } catch (err) {
        console.error("Failed to fetch payments", err);
      }
    };

    fetchData();
  }, [selectedYear]); // Add selectedYear as dependency

  // Function to process payment data into monthly format
  const processPaymentData = (payments, year) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Initialize monthly data with all months
    const monthlyData = months.map((month) => ({
      name: month,
      amount: 0,
      count: 0,
    }));

    // Aggregate payments by month and year
    payments.forEach((payment) => {
      if (payment.paidAt || payment.createdAt) {
        const date = new Date(payment.paidAt || payment.createdAt);
        const paymentYear = date.getFullYear();

        if (paymentYear.toString() === year) {
          const monthIndex = date.getMonth();
          monthlyData[monthIndex].amount += payment.amount;
          monthlyData[monthIndex].count += 1;
        }
      }
    });

    return monthlyData;
  };
  // Function to calculate monthly payment growth
  const calculatePaymentGrowth = (monthlyPayments) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    // Current month data
    const currentMonthData = monthlyPayments[currentMonth];
    const currentMonthAmount = currentMonthData?.amount || 0;

    // Previous month data (handle year transition)
    let prevMonthIndex = currentMonth - 1;
    let prevYear = currentYear;
    if (prevMonthIndex < 0) {
      prevMonthIndex = 11;
      prevYear = prevYear - 1;
    }

    const prevMonthData = monthlyPayments[prevMonthIndex];
    const prevMonthAmount = prevMonthData?.amount || 0;

    // Calculate changes
    const amountChange = currentMonthAmount - prevMonthAmount;
    const percentageChange =
      prevMonthAmount > 0
        ? Math.round((amountChange / prevMonthAmount) * 100)
        : currentMonthAmount > 0
        ? 100
        : 0;

    setPaymentMonthlyChange({
      amount: amountChange,
      percentage: percentageChange,
    });

    // Update total payments
    const total = monthlyPayments.reduce((sum, month) => sum + month.amount, 0);
    setTotalPayments(total);
  };

  useEffect(() => {
    // Fetch members
    const memberPayload = {
      data: { filter: "", role: "Member" },
      page: 0,
      pageSize: 50,
      order: [["createdAt", "ASC"]],
    };

    // Fetch leads
    const leadPayload = {
      data: { filter: "", role: "Lead" },
      page: 0,
      pageSize: 50,
      order: [["createdAt", "ASC"]],
    };

    const trainerPayload = {
      data: { filter: "", role: "Trainer" },
      page: 0,
      pageSize: 50,
      order: [["createdAt", "ASC"]],
    };
    Promise.all([
      getAllUser(memberPayload),
      getAllUser(leadPayload),
      getAllUser(trainerPayload),
    ])
      .then(([memberRes, leadRes, trainerRes]) => {
        // Process members
        const membersData = memberRes?.data?.data?.rows || [];
        setMembers(membersData);
        setGymMembers(membersData);
        const monthlyMembers = processMemberData(membersData, "Member");
        setMemberTrendData(monthlyMembers);

        // Process leads
        const leadsData = leadRes?.data?.data?.rows || [];
        setLeads(leadsData);
        const monthlyLeads = processMemberData(leadsData, "Lead");
        setLeadTrendData(monthlyLeads);

        const trainerData = trainerRes?.data?.data?.rows || [];
        console.log(trainerData);
        setTrainers(trainerData);

        // Calculate monthly changes
        const currentMonth = new Date().getMonth();

        // For members
        const currentMonthMemberCount =
          monthlyMembers[currentMonth]?.members || 0;
        const prevMonthMemberCount =
          monthlyMembers[currentMonth - 1]?.members || 0;
        setMemberMonthlyChange(currentMonthMemberCount - prevMonthMemberCount);

        // For leads
        const currentMonthLeadCount = monthlyLeads[currentMonth]?.leads || 0;
        const prevMonthLeadCount = monthlyLeads[currentMonth - 1]?.leads || 0;
        setLeadMonthlyChange(currentMonthLeadCount - prevMonthLeadCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const format = (date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  // Updated processing function to handle both members and leads
  const processMemberData = (data, type) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Initialize monthly data with all months and 0 count
    const monthlyData = months.map((month) => ({
      name: month,
      [type.toLowerCase()]: 0, // Will be "members" or "leads" based on type
    }));

    // Count data per month
    data.forEach((item) => {
      if (item.createdAt) {
        const date = new Date(item.createdAt);
        const monthIndex = date.getMonth(); // 0-11
        monthlyData[monthIndex][type.toLowerCase()] += 1;
      }
    });

    return monthlyData;
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    const filteredData = processPaymentData(payments, year);
    setPaymentTrendData(filteredData);
    calculatePaymentGrowth(filteredData);

    // Recalculate total payments for the selected year
    const total = filteredData.reduce((sum, month) => sum + month.amount, 0);
    setTotalPayments(total);
  };
  const currentYear = new Date().getFullYear();
  const startYear = 2025; // The earliest year you want to show

  // Generate array of years from startYear to currentYear
  const availableYears = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => (currentYear - index).toString()
  );

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "inactive":
        return "danger";
      case "warm":
        return "warning";
      case "active":
        return "success";
      default:
        return "secondary";
    }
  };
  const navigate = useNavigate();
  const { role } = useParams();

  const handleView = (member) => {
    navigate(`/${role}/dashboard/member/${member.id}`, {
      state: {
        name: member.firstName,
        email: member.email,
      },
    });
  };

  const handleEdit = (memberId) => {
    // Handle edit action
    console.log(`Edit member with ID: ${memberId}`);
    // You can navigate to an edit page or show an edit form
  };

  const handleDelete = () => {
    // Handle delete action
    console.log("Member deleted");
    // Implement your delete logic here
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <div>
      <div className="app-body">
        <div className="row gx-4">
          <div className="col-xxl-9 col-sm-12">
            <div className="row gx-4">
              <div className="col-lg-4 col-sm-6 col-12">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="p-2 border border-primary rounded-circle me-3">
                        <div className="icon-box md bg-primary-lighten rounded-5">
                          <Diversity3OutlinedIcon
                            color="primary"
                            fontSize="medium"
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <h2 className="lh-1">{members.length}</h2>
                        <p className="m-0">Members</p>
                      </div>
                    </div>
                    <div className="d-flex gap-2 flex-wrap align-items-center justify-content-between mt-2">
                      <div className="text-start">
                        <p className="mb-0 text-primary">
                          {memberMonthlyChange > 0 ? "+" : ""}
                          {memberMonthlyChange}
                        </p>
                        <span className="badge bg-primary-light text-primary small">
                          this month
                        </span>
                      </div>
                      <div style={{ width: 80, height: 40 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={memberTrendData}>
                            <Line
                              type="monotone"
                              dataKey="member"
                              stroke="#4e73df"
                              strokeWidth={2}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 col-12">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="p-2 border border-primary rounded-circle me-3">
                        <div className="icon-box md bg-primary-lighten rounded-5">
                          <CalendarMonthOutlinedIcon
                            color="primary"
                            fontSize="medium"
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <h2 className="lh-1">{leads.length}</h2>
                        <p className="m-0">Leads</p>
                      </div>
                    </div>
                    <div className="d-flex gap-2 flex-wrap align-items-center justify-content-between mt-2">
                      <div className="text-start">
                        <p className="mb-0 text-primary">
                          {leadMonthlyChange > 0 ? "+" : ""}
                          {leadMonthlyChange}
                        </p>
                        <span className="badge bg-primary-light text-primary small">
                          this month
                        </span>
                      </div>
                      <div style={{ width: 80, height: 40 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={leadTrendData}>
                            <Line
                              type="monotone"
                              dataKey="lead"
                              stroke="#4e73df"
                              strokeWidth={2}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-12 col-12">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="p-2 border border-primary rounded-circle me-3">
                        <div className="icon-box md bg-primary-lighten rounded-5">
                          <AttachMoneyOutlinedIcon
                            color="primary"
                            fontSize="medium"
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <h2 className="lh-1">Rs. {totalPayments}</h2>
                        <p className="m-0">Revenue</p>
                      </div>
                    </div>
                    <div className="d-flex gap-2 flex-wrap align-items-center justify-content-between mt-2">
                      <div className="text-start">
                        <p className="mb-0 text-primary">
                          {paymentMonthlyChange.percentage >= 0 ? "+" : ""}
                          {paymentMonthlyChange.percentage}%
                        </p>
                        <span className="badge bg-primary-light text-primary small">
                          this month
                        </span>
                      </div>
                      <div style={{ width: 80, height: 40 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={paymentTrendData}>
                            <Line
                              type="monotone"
                              dataKey="amount"
                              stroke="#4e73df"
                              strokeWidth={2}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row gx-4">
              <div className="col-sm-12">
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="card-title">Available Trainer</h5>
                  </div>
                  <div className="card-body pt-0">
                    <div className="row g-4">
                      {trainers.map((trainer) => (
                        <div
                          key={trainer.id}
                          className="col-xl-4 col-sm-6 col-12"
                        >
                          <a
                            href={trainer.profileLink}
                            className="d-flex align-items-center gap-3 appointment-card"
                          >
                            {/* Replace image with initials */}
                            <div className="img-3x rounded-5 d-flex align-items-center justify-content-center bg-primary text-white fw-bold">
                              {trainer.firstName
                                .split(" ")
                                .map((word) => word[0])
                                .join("")
                                .toUpperCase()}
                            </div>
                            <div className="d-flex gap-1 flex-column flex-fill">
                              <div className="fw-semibold">
                                {trainer.firstName + " " + trainer.lastName}
                              </div>
                              <div className="text-muted small">
                                {trainer.email}
                              </div>
                              <div className="small">
                                <i className="ri-star-fill text-primary me-1"></i>
                                {trainer.phoneNumber}
                              </div>
                            </div>
                            <i className="ri-arrow-right-s-line text-primary fs-1 opacity-25"></i>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12">
                <div className="card mb-4">
                  <div className="card-header pb-0 d-flex align-items-center justify-content-between">
                    <h5 className="card-title">Revenue</h5>
                    <div className="btn-group btn-group-sm" role="group">
                      {availableYears.map((year) => (
                        <button
                          key={year}
                          type="button"
                          className={`btn ${
                            selectedYear === year
                              ? "btn-primary"
                              : "btn-outline-primary"
                          }`}
                          onClick={() => handleYearChange(year)}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="card-body pt-0">
                    <div
                      className="overflow-hidden"
                      style={{ height: "300px" }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                          data={paymentTrendData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip
                            formatter={(value, name) => {
                              if (name === "Revenue")
                                return [`Rs. ${value}`, name];
                              return [value, name];
                            }}
                          />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="amount"
                            fill="#8884d8"
                            stroke="#8884d8"
                            name="Revenue"
                          />
                          <Bar
                            dataKey="count"
                            barSize={20}
                            fill="#413ea0"
                            name="Transactions"
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-sm-12">
            <div className="card mb-4">
              <div className="card-header pb-0">
                <h5 className="card-title">Calendar</h5>
              </div>
              <div className="card-body">
                {/* React Calendar Integration */}
                <div className="datepicker-bg d-flex justify-content-center align-items-center mb-3">
                  <ReactCalendar
                    className="border-0 w-100"
                    tileClassName={({ date, view }) =>
                      view === "month" &&
                      date.getDate() === new Date().getDate()
                        ? "bg-primary text-white rounded"
                        : null
                    }
                    tileContent={({ date, view }) => {
                      // Add markers for dates with events
                      const eventDates = [
                        "2024-06-15",
                        "2024-06-21",
                        "2024-06-29",
                      ];
                      if (
                        view === "month" &&
                        eventDates.includes(format(date, "yyyy-MM-dd"))
                      ) {
                        return <div className="event-dot"></div>;
                      }
                      return null;
                    }}
                  />
                </div>

                {/* Leads List (unchanged) */}
                {/* <div className="mb-4">
                  <div className="scroll300">
                    <div className="d-grid gap-2">
                      {leads.slice(0, 6).map((lead) => (
                        <a
                          key={lead.id}
                          href={`/lead-profile/${lead.id}`}
                          className="d-flex align-items-center gap-3 appointment-card"
                        >
                          <div className="img-3x rounded-5 d-flex align-items-center justify-content-center bg-primary text-white fw-bold">
                            {lead.firstName?.charAt(0).toUpperCase()}
                            {lead.lastName?.charAt(0).toUpperCase()}
                          </div>
                          <div className="d-flex flex-column flex-fill">
                            <div className="fw-semibold text-truncate">
                              {lead.firstName} {lead.lastName}
                            </div>
                            <div className="text-muted small">{lead.email}</div>
                          </div>
                          <span
                            className={`badge bg-${getStatusColor(
                              lead.status
                            )}`}
                          >
                            {lead.status || "New"}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div> */}

                {/* Upcoming Events */}
                <div className="upcoming-events mb-3">
                  <h6 className="mb-2">Upcoming Events</h6>
                  <div className="list-group">
                    {[
                      {
                        id: 1,
                        title: "Team Meeting",
                        date: "2024-06-15",
                        time: "10:30 AM",
                      },
                      {
                        id: 2,
                        title: "Client Review",
                        date: "2024-06-21",
                        time: "2:00 PM",
                      },
                      {
                        id: 3,
                        title: "Monthly Report",
                        date: "2024-06-29",
                        time: "All Day",
                      },
                    ].map((event) => (
                      <div
                        key={event.id}
                        className="list-group-item border-0 px-0 py-2"
                      >
                        <div className="d-flex align-items-center">
                          <div className="event-badge me-2">
                            {format(new Date(event.date), "dd")}
                          </div>
                          <div>
                            <div className="fw-semibold small">
                              {event.title}
                            </div>
                            <div className="text-muted extra-small">
                              {event.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Receptionist Section (unchanged) */}
                <div className="available-doc">
                  <a href="/trainers-profile">
                    <div className="d-flex align-items-center gap-3 text-white">
                      <div className="d-flex flex-column flex-fill">
                        <div className="fw-semibold">
                          Available Receptionist
                        </div>
                        <div className="small">Contact for follow-up</div>
                      </div>
                    </div>
                    <div className="timing mt-2 text-white small">
                      <span className="day">963852741</span>{" "}
                      <span className="today-date"></span>, 9AM - 5PM
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row gx-4">
          <div className="col-xxl-9 col-sm-12">
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title">Members</h5>
              </div>
              <div className="card-body pt-0">
                {/* Member Statistics Cards */}
                <div className="d-flex gap-4 flex-wrap">
                  <div className="stat-card">
                    <h6 className="mb-0">New Members</h6>
                    <div className="d-flex align-items-center gap-1">
                      <div className="fs-2 fw-semibold">
                        {
                          members.filter((m) => {
                            const joinDate = new Date(m.createdAt);
                            const currentDate = new Date();
                            return (
                              joinDate.getMonth() === currentDate.getMonth() &&
                              joinDate.getFullYear() ===
                                currentDate.getFullYear()
                            );
                          }).length
                        }
                      </div>
                      <div className="d-flex">
                        {/* <div>
                  {memberMonthlyChange > 0 ? '+' : ''}{memberMonthlyChange}
                </div> */}
                        <i className="ri-arrow-right-up-line text-success"></i>
                      </div>
                    </div>
                    <span className="badge bg-primary-subtle text-primary border border-primary small">
                      This Month
                    </span>
                  </div>

                  <div className="stat-card">
                    <h6 className="mb-0">Active Members</h6>
                    <div className="d-flex align-items-center gap-1">
                      <div className="fs-2 fw-semibold">
                        {members.filter((m) => m.status === "ACTIVE").length}
                      </div>
                      <div className="d-flex">
                        <div>
                          {Math.round(
                            (members.filter((m) => m.status === "ACTIVE")
                              .length /
                              members.length) *
                              100
                          )}
                          %
                        </div>
                        <i className="ri-arrow-right-up-line text-success"></i>
                      </div>
                    </div>
                    <span className="badge bg-primary-subtle text-primary border border-primary small">
                      Active
                    </span>
                  </div>

                  <div className="stat-card">
                    <h6 className="mb-0">Male Members</h6>
                    <div className="d-flex align-items-center gap-1">
                      <div className="fs-2 fw-semibold">
                        {members.filter((m) => m.gender === "Male").length}
                      </div>
                      <div className="d-flex">
                        <div>
                          {Math.round(
                            (members.filter((m) => m.gender === "Male").length /
                              members.length) *
                              100
                          )}
                          %
                        </div>
                        <i className="ri-arrow-right-up-line text-success"></i>
                      </div>
                    </div>
                    <span className="badge bg-primary-subtle text-primary border border-primary small">
                      Male
                    </span>
                  </div>

                  <div className="stat-card">
                    <h6 className="mb-0">Female Members</h6>
                    <div className="d-flex align-items-center gap-1">
                      <div className="fs-2 fw-semibold">
                        {members.filter((m) => m.gender === "Female").length}
                      </div>
                      <div className="d-flex">
                        <div>
                          {Math.round(
                            (members.filter((m) => m.gender === "Female")
                              .length /
                              members.length) *
                              100
                          )}
                          %
                        </div>
                        <i className="ri-arrow-right-up-line text-success"></i>
                      </div>
                    </div>
                    <span className="badge bg-primary-subtle text-primary border border-primary small">
                      Female
                    </span>
                  </div>
                </div>

                {/* Member Growth Chart */}
                <div
                  className="overflow-hidden"
                  style={{ height: "300px", marginTop: "20px" }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={memberTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [`${value} members`, "Count"]}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="member"
                        name="Members"
                        stroke="#4e73df"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Member Status Overview */}
          <div className="col-xxl-3 col-sm-12">
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title">Status Overview</h5>
              </div>
              <div className="card-body">
                <div className="overflow-hidden" style={{ height: "250px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: "Active",
                            value: members.filter((m) => m.status === "ACTIVE")
                              .length,
                          },
                          {
                            name: "Inactive",
                            value: members.filter((m) => m.status !== "ACTIVE")
                              .length,
                          },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        <Cell fill="#4e73df" />
                        <Cell fill="#e74a3b" />
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [`${value} members`, name]}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Status Breakdown */}
                <div className="mt-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="small">
                      <span className="badge bg-primary me-1"></span> Active
                      Members
                    </span>
                    <span className="small fw-semibold">
                      {members.filter((m) => m.status === "ACTIVE").length}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="small">
                      <span className="badge bg-danger me-1"></span> Inactive
                      Members
                    </span>
                    <span className="small fw-semibold">
                      {members.filter((m) => m.status !== "ACTIVE").length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="row gx-4">
          <div className="col-sm-12">
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title">Income By Department</h5>
              </div>
              <div className="card-body">
                <div className="overflow-hidden" style={{ height: "300px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {departmentData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="row gx-4">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Gym Members</h5>
              </div>
              <div className="card-body pt-0">
                <div className="table-responsive">
                  <table
                    id="hideSearchExample"
                    className="table m-0 align-middle"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Member Name</th>
                        <th>Email</th>
                        <th>Joining Date</th>
                        <th>Phone Number</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gymMembers.map((member) => (
                        <tr key={member.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="img-2x rounded-5 me-2 bg-primary text-white d-flex align-items-center justify-content-center fw-bold">
                                {member.id}
                              </div>
                            </div>
                          </td>
                          <td>{member.firstName + " " + member.lastName}</td>
                          <td>{member.email}</td>
                          <td>{member.joinDate}</td>
                          <td>{member.phoneNumber}</td>
                          <td>
                            <span>{member.status}</span>
                          </td>
                          <td>
                            <div className="d-inline-flex gap-1">
                              {/* View Button with MUI Tooltip */}

                              <button
                                type="button"
                                className="btn btn-hover btn-sm rounded-5"
                                onClick={() => handleView(member)}
                              >
                                <ViewIcon fontSize="small" />
                              </button>

                              {/* Edit Button with MUI Tooltip */}

                              <button
                                type="button"
                                className="btn btn-hover btn-sm rounded-5"
                                onClick={() => handleEdit(member.id)}
                              >
                                <EditIcon fontSize="small" />
                              </button>

                              {/* Delete Button with MUI Tooltip */}

                              <button
                                type="button"
                                className="btn btn-hover btn-sm rounded-5"
                                data-bs-toggle="modal"
                                data-bs-target="#delRow"
                              >
                                <DeleteIcon fontSize="small" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Delete confirmation modal with MUI icons */}
                <div
                  className="modal fade"
                  id="delRow"
                  tabIndex="-1"
                  aria-labelledby="delRowLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="delRowLabel">
                          Confirm Deletion
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        >
                          <CloseIcon fontSize="small" />
                        </button>
                      </div>
                      <div className="modal-body">
                        Are you sure you want to delete this member's details?
                      </div>
                      <div className="modal-footer">
                        <div className="d-flex justify-content-end gap-2">
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={handleDelete}
                            data-bs-dismiss="modal"
                            aria-label="Delete"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
