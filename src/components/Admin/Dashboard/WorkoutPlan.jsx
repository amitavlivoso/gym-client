import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserRoll } from "../../../services/axiosClient";
// import your service function here
// import { getAllWorkoutPlans } from "../../../services/Service";

const dummyPlans = [
  {
    id: 1,
    title: "Beginner Full Body",
    level: "Beginner",
    duration: "4 weeks",
    workoutsPerWeek: 3,
  },
  {
    id: 2,
    title: "Intermediate Strength",
    level: "Intermediate",
    duration: "6 weeks",
    workoutsPerWeek: 4,
  },
  {
    id: 3,
    title: "Advanced Fat Loss",
    level: "Advanced",
    duration: "8 weeks",
    workoutsPerWeek: 5,
  },
];

const WorkoutPlansPage = () => {
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Replace this with API call
    // getAllWorkoutPlans().then((res) => setPlans(res.data)).catch(console.error);
    setPlans(dummyPlans);
  }, []);

  const filteredPlans = plans.filter((plan) =>
    plan.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Workout Plans</h2>
          {getUserRoll() !== "Admin" ? (
            <></>
          ) : (
            <>
              <button
                onClick={() => navigate("/admin/dashboard/add-workoutplan")}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                + Add Plan
              </button>
            </>
          )}
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
                {getUserRoll() !== "Admin" ? (
                  <></>
                ) : (
                  <>
                    <th className="px-4 py-3">Actions</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredPlans.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No plans found.
                  </td>
                </tr>
              ) : (
                filteredPlans.map((plan, index) => (
                  <tr key={plan.id} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{plan.title}</td>
                    <td className="px-4 py-2">{plan.level}</td>
                    <td className="px-4 py-2">{plan.duration}</td>
                    <td className="px-4 py-2">{plan.workoutsPerWeek}</td>
                    {getUserRoll() !== "Admin" ? (
                      <></>
                    ) : (
                      <>
                        <td className="px-4 py-2 space-x-2">
                          <button className="text-indigo-600 font-semibold hover:underline">
                            Edit
                          </button>
                          <button className="text-red-500 font-semibold hover:underline">
                            Delete
                          </button>
                        </td>
                      </>
                    )}
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

export default WorkoutPlansPage;
