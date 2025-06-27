import React, { useEffect, useState } from "react";
import { getAllCheckIn, getAllUser } from "../../../services/Service";

const AttendancePage = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  useEffect(() => {
    const payload = {
      data: { filter: "" },
      page: 0,
      pageSize: 100,
      order: [["createdAt", "DESC"]],
    };

    Promise.all([getAllCheckIn(payload), getAllUser(payload)])
      .then(([checkInRes, userRes]) => {
        console.log("✅ Check-in Response", checkInRes);
        console.log("✅ User Response", userRes);

        const checkInRows = checkInRes?.data?.data?.rows || [];
        const userRows = userRes?.data?.data?.rows || [];

        setAttendanceData(checkInRows);

        const map = {};
        userRows.forEach((user) => {
          map[user.id] = user;
        });
        setUserMap(map);
      })
      .catch((err) => {
        console.error("❌ Error loading data", err);
      });
  }, []);

  const filteredData = attendanceData.filter(
    (item) => item.date === selectedDate
  );

  const formatTime = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Daily Attendance</h2>

        {/* Date Filter */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-700 font-semibold">
            Total Present: {filteredData.length}
          </p>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full table-auto text-left">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Check-In</th>
                <th className="px-4 py-3">Check-Out</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No attendance records found.
                  </td>
                </tr>
              ) : (
                filteredData.map((entry, index) => {
                  const user = userMap[entry.userId];
                  return (
                    <tr
                      key={entry.id || index}
                      className="border-b hover:bg-gray-100"
                    >
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{user?.firstName +" " + user?.lastName || "Unknown"}</td>
                      <td className="px-4 py-2">{user?.role || "Unknown"}</td>
                      <td className="px-4 py-2">{entry.date}</td>
                      <td className="px-4 py-2">{formatTime(entry.checkInTime)}</td>
                      <td className="px-4 py-2">{formatTime(entry.checkOutTime)}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
