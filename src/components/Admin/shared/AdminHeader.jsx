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
import {
  getUserId,
  getUserName,
  getUserRoll,
  logout,
} from "../../../services/axiosClient";
import { Link } from "react-router-dom";
import DateRangeSelector from "./DateRangeSelector";
import {
  getAllPayment,
  getPayment,
  getProfile,
  getUser,
} from "../../../services/Service";

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
  const [remainingDays, setRemainingDays] = useState(null);

  if (getUserRoll() !== "Admin") {
    getPayment(getUserId()).then((res) => {
      console.log(res);
      const payment = res?.data?.data;
      if (payment?.expiresAt) {
        const today = new Date();
        const expiry = new Date(payment.expiresAt);

        // Remove time part for accurate days difference
        today.setHours(0, 0, 0, 0);
        expiry.setHours(0, 0, 0, 0);

        const diffInMs = expiry - today;
        const diffInDays = Math.max(
          0,
          Math.ceil(diffInMs / (1000 * 60 * 60 * 24))
        );

        console.log(`Days left: ${diffInDays}`);

        setRemainingDays(diffInDays);
      }
    });
  }

  const [user, setUser] = useState(null);
  const [trialDaysRemaining, setTrialDaysRemaining] = useState(null);

  useEffect(() => {
    getProfile()
      .then((res) => {
        console.log("Profile response:", res);

        if (res?.data?.data) {
          const userData = res.data.data;
          setUser(userData);

          if (userData.role === "Admin" && userData.trialStartDate) {
            const startDate = new Date(userData.trialStartDate);
            const now = new Date();

            // Calculate difference in days
            const diffInMs = now - startDate;
            const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

            const remaining = Math.max(0, 7 - diffInDays);
            setTrialDaysRemaining(remaining);
          } else {
            setTrialDaysRemaining(null);
          }
        }
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      });
  }, []);
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
                {getUserRoll() === "Admin" ? (
                  <>
                    <div className="d-flex flex-column text-end">
                      <h5 className="fw-bold lh-1 m-0">{totalPayments}</h5>
                      <div className="text-primary small">Earning Earnings</div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="mx-3 my-2 d-grid">
                <Link
                  to="profile"
                  className="btn btn-outline-primary mb-2 d-flex align-items-center justify-content-center gap-2"
                >
                  <AccountCircleIcon /> Profile
                </Link>
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
          <Link to="/">
            <HomeIcon />
          </Link>
          <li className="breadcrumb-item text-primary" aria-current="page">
            {window.location.pathname.split("/").filter(Boolean).join(" / ")}
          </li>
        </ol>
        {/* Breadcrumb ends */}

        {/* 7 Days to Renew Message */}
        <div className="ms-auto d-lg-flex d-none flex-row">
          {getUserRoll() !== "SuperAdmin" && (
            <div className="d-flex align-items-center border px-3 py-2 rounded bg-light text-dark">
              {(getUserRoll() === "Admin" || getUserRoll() === "Member") && (
                <>
                  <CalendarIcon className="text-primary me-2" />
                  <span className="fw-semibold">
                    {getUserRoll() === "Member"
                      ? `${remainingDays} Days to Renew`
                      : `${trialDaysRemaining} Days to Renew`}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
