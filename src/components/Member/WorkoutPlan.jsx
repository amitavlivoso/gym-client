import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserRoll } from "../../services/axiosClient";
import { getAllWorkoutPlans } from "../../services/Service";
import { getUserId } from "../../services/axiosClient";

const WorkoutPlans = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location?.state?.id || "";

  const [plans, setPlans] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const payLoad = {
      data: { filter: "", userId: getUserId() },
      page: 0,
      pageSize: 50,
      order: [["createdAt", "ASC"]],
    };
    getAllWorkoutPlans(payLoad).then((res) => {
      setPlans(res?.data?.data?.rows || []);
    });
  }, [userId]);

  const filteredPlans = plans.filter((plan) =>
    plan.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Workout Plans</h2>
          {getUserRoll() === "Admin" || getUserRoll() === "Trainer" ? (
            <button
              onClick={() =>
                navigate("/admin/dashboard/add-workoutplan", {
                  state: { id: userId },
                })
              }
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              + Add Plan
            </button>
          ) : null}
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search plans..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full table-auto text-left">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Level</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Workouts/Week</th>
                <th className="px-4 py-3">From Date</th>
                <th className="px-4 py-3">To Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    No plans found.
                  </td>
                </tr>
              ) : (
                filteredPlans.map((plan, index) => (
                  <tr key={plan.id} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{plan.title}</td>
                    <td className="px-4 py-2">{plan.level}</td>
                    <td className="px-4 py-2">{plan.duration} Weeks</td>
                    <td className="px-4 py-2">{plan.workoutsPerWeek} hr</td>
                    <td className="px-4 py-2">{plan.fromDate || "-"}</td>
                    <td className="px-4 py-2">{plan.toDate || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlans;
