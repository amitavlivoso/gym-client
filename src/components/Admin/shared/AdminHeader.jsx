// import React from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Badge,
//   Avatar,
//   useMediaQuery,
//   useTheme,
//   Menu,
//   MenuItem,
//   Box,
//   Tooltip,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import color from "../../shared/Color";
// import { getUserRoll, logout } from "../../../services/axiosClient";

// const AdminHeader = ({ handleDrawerToggle, drawerWidth }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);

//   const handleAvatarClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         width: { sm: `calc(100% - ${drawerWidth}px)` },
//         ml: { sm: `${drawerWidth}px` },
//         backgroundColor: theme.palette.background.paper,
//         color: theme.palette.text.primary,
//         borderBottom: `1px solid ${theme.palette.divider}`,
//         boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
//         zIndex: theme.zIndex.drawer + 1,
//       }}
//     >
//       <Toolbar>
//         {isMobile && (
//           <IconButton
//             edge="start"
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//         )}

//         <Typography
//           variant="h6"
//           noWrap
//           component="div"
//           color={color.firstColor}
//           sx={{ flexGrow: 1, fontWeight: 600 }}
//         >
//           {getUserRoll()} Dashboard
//         </Typography>

//         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//           <Tooltip title="Notifications">
//             <IconButton color="inherit">
//               <Badge badgeContent={4} color="error">
//                 <NotificationsIcon />
//               </Badge>
//             </IconButton>
//           </Tooltip>

//           <Tooltip title="Account settings">
//             <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
//               <Avatar sx={{ bgcolor: color.firstColor }}>
//                 <AccountCircle />
//               </Avatar>
//             </IconButton>
//           </Tooltip>

//           <Menu
//             anchorEl={anchorEl}
//             open={open}
//             onClose={handleClose}
//             onClick={handleClose}
//             PaperProps={{
//               elevation: 4,
//               sx: {
//                 mt: 1.5,
//                 minWidth: 160,
//                 borderRadius: 2,
//                 boxShadow: theme.shadows[3],
//               },
//             }}
//             transformOrigin={{ horizontal: "right", vertical: "top" }}
//             anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//           >
//             <MenuItem>Profile</MenuItem>
//             <MenuItem>Settings</MenuItem>
//             <MenuItem onClick={() => logout()}>Logout</MenuItem>
//           </Menu>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default AdminHeader;

import { useState, useEffect } from "react";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Star as StarIcon,
  Checklist as ChecklistIcon,
  Notifications as NotificationsIcon,
  Warning as WarningIcon,
  Message as MessageIcon,
  Home as HomeIcon,
  CalendarToday as CalendarIcon,
  MedicalServices as MedicalServicesIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  Circle as CircleIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import logo from "../../assets/images/livosologo.png";
import { getUserName, getUserRoll, logout } from "../../../services/axiosClient";
import { Link } from "react-router-dom";
import DateRangeSelector from "./DateRangeSelector";
import { getAllPayment, getUser } from "../../../services/Service";

const AdminHeader = () => {
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

  return (
    <div className="app-con">
      <div className="app-header d-flex align-items-center">
        {/* Brand container sm starts */}
        <div className="brand-container-sm d-xl-none d-flex align-items-center">
          {/* App brand starts */}
          <div className="app-brand">
            <a href="index.html">
              <img
                src={logo}
                className="logo"
                alt="Dental Care Admin Template"
              />
            </a>
          </div>
          {/* App brand ends */}

          {/* Toggle sidebar starts */}
          <button type="button" className="toggle-sidebar">
            <MenuIcon />
          </button>
          {/* Toggle sidebar ends */}
        </div>
        {/* Brand container sm ends */}

        {/* Search container starts */}
        <div className="search-container d-xl-block d-none">
          <input
            type="text"
            className="form-control"
            id="searchId"
            placeholder="Search"
          />
        </div>
        {/* Search container ends */}

        {/* App header actions starts */}
        <div className="header-actions">
          {/* Header actions starts */}
          <div className="d-lg-flex d-none gap-2">
            {/* Select country dropdown starts */}
            {/* <div className="dropdown">
              <a
                className="dropdown-toggle header-icon"
                href="#!"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="assets/images/flags/1x1/fr.svg"
                  className="header-country-flag"
                  alt="Bootstrap Dashboards"
                />
              </a>
              <div className="dropdown-menu dropdown-menu-end dropdown-mini">
                <div className="country-container">
                  <a href="index.html" className="py-2">
                    <img
                      src="assets/images/flags/1x1/us.svg"
                      alt="Admin Panel"
                    />
                  </a>
                  <a href="index.html" className="py-2">
                    <img
                      src="assets/images/flags/1x1/in.svg"
                      alt="Admin Panels"
                    />
                  </a>
                  <a href="index.html" className="py-2">
                    <img
                      src="assets/images/flags/1x1/br.svg"
                      alt="Admin Dashboards"
                    />
                  </a>
                  <a href="index.html" className="py-2">
                    <img
                      src="assets/images/flags/1x1/tr.svg"
                      alt="Admin Templatess"
                    />
                  </a>
                  <a href="index.html" className="py-2">
                    <img
                      src="assets/images/flags/1x1/gb.svg"
                      alt="Google Admin"
                    />
                  </a>
                </div>
              </div>
            </div> */}
            {/* Select country dropdown ends */}

            {/* Notifications dropdown starts */}
            <div className="dropdown">
              <a
                className="dropdown-toggle header-icon"
                href="#!"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <ChecklistIcon />
                <span className="count-label warning"></span>
              </a>
              <div className="dropdown-menu dropdown-menu-end dropdown-300">
                <h5 className="fw-semibold px-3 py-2 text-primary">Activity</h5>

                {/* Scroll starts */}
                <div className="scroll300">
                  {/* Activity List Starts */}
                  <div className="p-3">
                    <ul className="p-0 activity-list2">
                      <li className="activity-item pb-3 mb-3">
                        <a href="#!">
                          <h5 className="fw-regular">
                            <CircleIcon className="text-danger me-1" />
                            Invoices.
                          </h5>
                          <div className="ps-3 ms-2 border-start">
                            <div className="d-flex align-items-center mb-2">
                              <div className="flex-shrink-0">
                                <img
                                  src="assets/images/products/1.jpg"
                                  className="img-3x rounded-1"
                                  alt="Dentist Admin Templates"
                                />
                              </div>
                              <div className="flex-grow-1 ms-3">
                                23 invoices have been paid to the Clove Labs.
                              </div>
                            </div>
                            <p className="m-0 small">10:20AM Today</p>
                          </div>
                        </a>
                      </li>
                      <li className="activity-item pb-3 mb-3">
                        <a href="#!">
                          <h5 className="fw-regular">
                            <CircleIcon className="text-info me-1" />
                            Purchased.
                          </h5>
                          <div className="ps-3 ms-2 border-start">
                            <div className="d-flex align-items-center mb-2">
                              <div className="flex-shrink-0">
                                <img
                                  src="assets/images/products/2.jpg"
                                  className="img-3x rounded-1"
                                  alt="Dentist Admin Templates"
                                />
                              </div>
                              <div className="flex-grow-1 ms-3">
                                28 new surgical equipments have been purchased.
                              </div>
                            </div>
                            <p className="m-0 small">04:30PM Today</p>
                          </div>
                        </a>
                      </li>
                      <li className="activity-item pb-3 mb-3">
                        <a href="#!">
                          <h5 className="fw-regular">
                            <CircleIcon className="text-success me-1" />
                            Appointed.
                          </h5>
                          <div className="ps-3 ms-2 border-start">
                            <div className="d-flex align-items-center mb-2">
                              <div className="flex-shrink-0">
                                <img
                                  src="assets/images/products/8.jpg"
                                  className="img-3x rounded-1"
                                  alt="Dentist Admin Templates"
                                />
                              </div>
                              <div className="flex-grow-1 ms-3">
                                36 new doctors and 28 staff members appointed.
                              </div>
                            </div>
                            <p className="m-0 small">06:50PM Today</p>
                          </div>
                        </a>
                      </li>
                      <li className="activity-item">
                        <a href="#!">
                          <h5 className="fw-regular">
                            <CircleIcon className="text-warning me-1" />
                            Requested
                          </h5>
                          <div className="ps-3 ms-2 border-start">
                            <div className="d-flex align-items-center mb-2">
                              <div className="flex-shrink-0">
                                <img
                                  src="assets/images/products/9.jpg"
                                  className="img-3x rounded-1"
                                  alt="Dentist Admin Templates"
                                />
                              </div>
                              <div className="flex-grow-1 ms-3">
                                Requested for 6 new vehicles for medical
                                emergency. .
                              </div>
                            </div>
                            <p className="m-0 small">08:30PM Today</p>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* Activity List Ends */}
                </div>
                {/* Scroll ends */}

                {/* View all button starts */}
                <div className="d-grid m-3">
                  <a href="javascript:void(0)" className="btn btn-primary">
                    View all
                  </a>
                </div>
                {/* View all button ends */}
              </div>
            </div>
            {/* Notifications dropdown ends */}
          </div>
          {/* Header actions ends */}

          {/* Header user settings starts */}
          <div className="dropdown ms-3">
            <a
              id="userSettings"
              className="dropdown-toggle d-flex align-items-center"
              href="#!"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="avatar-box">
                <div
                  className="initials-avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center border border-3 border-white"
                  style={{ width: "40px", height: "40px" }}
                >
                  {getUserName() ? getUserName().charAt(0).toUpperCase() : "U"}
                </div>
                <span className="status busy"></span>
              </div>
            </a>
            <div className="dropdown-menu dropdown-menu-end dropdown-300 shadow-lg">
              <div className="d-flex align-items-center justify-content-between p-3">
                <div>
                  <span className="small">Welcome</span>
                  <h6 className="m-0">{getUserName() || "User"}</h6>
                </div>
                {
                  getUserRoll()==="Admin"?(<>
                   <div className="d-flex flex-column text-end">
                  <h5 className="fw-bold lh-1 m-0">{totalPayments}</h5>
                  <div className="text-primary small">Earning Earnings</div>
                </div>
                  </>):(<></>)
                }
               
              </div>
              <div className="mx-3 my-2 d-grid">
                <button onClick={() => logout()} className="btn btn-primary">
                  Logout
                </button>
              </div>
            </div>
          </div>
          {/* Header user settings ends */}
        </div>
      </div>
      {/* App header actions ends */}

      <div className="app-hero-header d-flex align-items-center">
        {/* Breadcrumb starts */}
        <ol className="breadcrumb">
          {/* <li className="breadcrumb-item">  */}
          <Link href="/">
            <HomeIcon />
          </Link>
          {/* </li> */}
          <li className="breadcrumb-item text-primary" aria-current="page">
            {window.location.pathname.split("/").filter(Boolean).join(" / ")}
          </li>
        </ol>
        {/* Breadcrumb ends */}

        {/* Sales stats starts */}
        {/* <div className="ms-auto d-lg-flex d-none flex-row">
          <div className="input-group">
            <span className="input-group-text bg-primary-lighten">
              <CalendarIcon className="text-primary" />
            </span>
            <input
              type="text"
              id="abc"
              className="form-control custom-daterange"
            />
          </div>
        </div> */}
        <DateRangeSelector />
        {/* Sales stats ends */}
      </div>
    </div>
  );
};

export default AdminHeader;
