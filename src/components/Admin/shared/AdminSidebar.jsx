import React, { useState } from "react";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  DirectionsRun as RunIcon,
  FitnessCenter as FitnessCenterIcon,
  Restaurant as RestaurantIcon,
  Payment as PaymentIcon,
  PersonAdd as PersonAddIcon,
  AccountBalance as AccountBalanceIcon,
  SupervisorAccount as SupervisorAccountIcon,
  Leaderboard as LeaderboardIcon,
  ManageAccounts as ManageAccountsIcon,
  RoomService as RoomServiceIcon,
  ChevronRight as ChevronRightIcon,
  Menu as MenuIcon,
  Phone as PhoneIcon,
  CheckCircle as ActiveMemberIcon, // For Active Members
  Cancel as InactiveMemberIcon, // For Inactive Members
  EventAvailable as AttendanceIcon, // For Attendance
} from "@mui/icons-material";
import { Link, useLocation, useParams } from "react-router-dom";
import { getUserName, getUserRoll } from "../../../services/axiosClient";
import "../../assets/css/main.min.css";
import logo from "../../assets/images/livosologo.png";
import "./adminsidebar.css";

const AdminSidebar = ({ handleDrawerToggle }) => {
  const { role } = useParams();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState({});

  const isActive = (path) => location.pathname === path;

  const toggleExpand = (text) => {
    setExpandedItems((prev) => ({
      ...prev,
      [text]: !prev[text],
    }));
  };

  const getInitials = () => {
    const name = getUserName() || "User";
    const parts = name.split(" ");
    let initials = parts[0].charAt(0).toUpperCase();
    if (parts.length > 1) {
      initials += parts[parts.length - 1].charAt(0).toUpperCase();
    }
    return initials;
  };

  const navItems =
    getUserRoll() === "Admin" || getUserRoll() === "Receptionist"
      ? [
          {
            text: "Dashboard",
            icon: <DashboardIcon />,
            to: `/${role}/dashboard`,
          },
          {
            text: "Payments",
            icon: <PaymentIcon />,
            to: "/admin/dashboard/payment",
          },
          {
            text: "Member",
            icon: <PeopleIcon />,
            subItems: [
              {
                text: "Add Member",
                icon: <PersonAddIcon />,
                to: `/${role}/dashboard/add-member`,
              },
              {
                text: "All Members",
                icon: <PeopleIcon />,
                to: `/${role}/dashboard/member-table`,
              },
              {
                text: "Active Members",
                icon: <ActiveMemberIcon />,
                to: `/${role}/dashboard/active-member`,
              },
              {
                text: "Inactive Members",
                icon: <InactiveMemberIcon />,
                to: `/${role}/dashboard/inactive-member`,
              },
              {
                text: "Attendance",
                icon: <AttendanceIcon />,
                to: `/${role}/dashboard/attendance`,
              },
            ],
          },
          {
            text: "Trainer",
            icon: <RunIcon />,
            subItems: [
              {
                text: "Add Trainer",
                icon: <RunIcon />,
                to: `/${role}/dashboard/add-trainer`,
              },
              {
                text: "Trainers",
                icon: <RunIcon />,
                to: `/${role}/dashboard/trainer-table`,
              },
            ],
          },
          {
            text: "Staff",
            icon: <SupervisorAccountIcon />,
            subItems: [
              {
                text: "Add Accountant",
                icon: <AccountBalanceIcon />,
                to: `/${role}/dashboard/add-accountant`,
              },
              {
                text: "Add HR Manager",
                icon: <SupervisorAccountIcon />,
                to: `/${role}/dashboard/add-hr`,
              },
              {
                text: "Add Lead",
                icon: <LeaderboardIcon />,
                to: `/${role}/dashboard/add-lead`,
              },
              {
                text: "Add Manager",
                icon: <ManageAccountsIcon />,
                to: `/${role}/dashboard/add-manager`,
              },
              {
                text: "Add Receptionist",
                icon: <RoomServiceIcon />,
                to: `/${role}/dashboard/add-receptionist`,
              },
            ],
          },
          {
            text: "Workout Plans",
            icon: <FitnessCenterIcon />,
            to: `/${role}/workouts`,
          },
          {
            text: "Nutrition Plans",
            icon: <RestaurantIcon />,
            to: `/${role}/nutrition`,
          },
          {
            text: "Equipment",
            icon: <FitnessCenterIcon />,
            to: `/${role}/equipment`,
          },
        ]
      : [
          {
            text: "Dashboard",
            icon: <DashboardIcon />,
            to: `/${role}/dashboard`,
          },
          ...(getUserRoll() === "Member"
            ? [
                {
                  text: "Payments",
                  icon: <PaymentIcon />,
                  to: "/member/dashboard/member-pay-history",
                },
              ]
            : [
                {
                  text: "Payments",
                  icon: <PaymentIcon />,
                  to: "/admin/payments",
                },
                {
                  text: "Workout Plans",
                  icon: <FitnessCenterIcon />,
                  to: `/${role}/workouts`,
                },
              ]),
          ...(getUserRoll() !== "Member"
            ? [
                {
                  text: "Member",
                  icon: <PeopleIcon />,
                  subItems: [
                    {
                      text: "Add Member",
                      icon: <PersonAddIcon />,
                      to: `/${role}/dashboard/add-member`,
                    },
                    {
                      text: "Members",
                      icon: <PeopleIcon />,
                      to: `/${role}/members`,
                    },
                  ],
                },
              ]
            : []),
        ];

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <nav
        id="sidebar"
        className="sidebar-wrapper"
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <div className="brand-container d-flex align-items-center justify-content-between">
          <div className="app-brand ms-3">
            <Link to="/">
              <img src={logo} className="logo" alt="Gym Management System" />
            </Link>
          </div>

          <button
            type="button"
            className="pin-sidebar me-3"
            onClick={handleDrawerToggle}
            aria-label="Toggle sidebar"
          >
            <MenuIcon />
          </button>
        </div>

        <div className="sidebar-profile">
          <div
            className="initials-avatar rounded-circle border border-primary border-3 d-flex align-items-center justify-content-center"
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#0d6efd",
              color: "white",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            {getInitials()}
          </div>
          <h6 className="mb-1 profile-name text-nowrap text-truncate text-primary">
            {getUserName()}
          </h6>
          <small className="profile-name text-nowrap text-truncate">
            {getUserRoll()}
          </small>
        </div>

        <div
          className="sidebarMenuScroll"
          style={{ flex: 1, overflowY: "auto" }}
        >
          <ul className="sidebar-menu">
            {navItems.map((item, index) => (
              <li
                key={index}
                className={`${isActive(item.to) ? "active current-page" : ""} ${
                  item.subItems ? "treeview" : ""
                } ${
                  item.subItems && expandedItems[item.text] ? "expanded" : ""
                }`}
              >
                {item.subItems ? (
                  <>
                    <div
                      className="menu-item-wrapper"
                      onClick={() => toggleExpand(item.text)}
                    >
                      <span className="menu-item-content">
                        {item.icon &&
                          React.cloneElement(item.icon, { className: "me-2" })}
                        <span className="menu-text">{item.text}</span>
                        <ChevronRightIcon
                          className={`treeview-indicator ${
                            expandedItems[item.text] ? "rotated" : ""
                          }`}
                        />
                      </span>
                    </div>
                    <ul
                      className="treeview-menu"
                      style={{
                        display: expandedItems[item.text] ? "block" : "none",
                      }}
                    >
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subItem.to}
                            className={isActive(subItem.to) ? "active" : ""}
                          >
                            {subItem.icon &&
                              React.cloneElement(subItem.icon, {
                                className: "me-2",
                              })}
                            <span className="menu-text">{subItem.text}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link to={item.to} className="menu-item-wrapper">
                    <span className="menu-item-content">
                      {item.icon &&
                        React.cloneElement(item.icon, { className: "me-2" })}
                      <span className="menu-text">{item.text}</span>
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar-contact d-flex align-items-start">
          <PhoneIcon className="me-2 mt-1" />
          <div>
            <p className="fw-light mb-1 text-nowrap text-truncate">
              Emergency Contact
            </p>
            <h5 className="m-0 lh-1 text-nowrap text-truncate">0987654321</h5>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;
