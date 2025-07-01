import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserRoll } from "../../../services/axiosClient";
import {
  deleteWorkoutPlan,
  getAllWorkoutPlans,
} from "../../../services/Service";

const IndividualWorkoutPlansPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location?.state?.id || "";

  const [plans, setPlans] = useState([]);
  const [search, setSearch] = useState("");

  // For Delete Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const handleEdit = (id) => {
    navigate("/admin/dashboard/add-workoutplan", {
      state: { planId: id },
    });
  };

  const handleDeleteClick = (id) => {
    setSelectedPlanId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteWorkoutPlan(selectedPlanId)
      .then((res) => {
        setPlans(plans.filter((plan) => plan.id !== selectedPlanId));
        setShowDeleteModal(false);
      })
      .catch((err) => {
        console.log(err);
        setShowDeleteModal(false);
      });
  };

  const cancelDelete = () => {
    setSelectedPlanId(null);
    setShowDeleteModal(false);
  };

  useEffect(() => {
    const payLoad = {
      data: { filter: "", userId },
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
                {getUserRoll() === "Admin" || getUserRoll() === "Trainer" ? (
                  <th className="px-4 py-3">Actions</th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {filteredPlans.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-500">
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
                    {getUserRoll() === "Admin" ||
                    getUserRoll() === "Trainer" ? (
                      <td className="px-4 py-2 space-x-2">
                        <button
                          onClick={() => handleEdit(plan.id)}
                          className="text-indigo-600 font-semibold hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(plan.id)}
                          className="text-red-500 font-semibold hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    ) : null}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete this workout plan?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualWorkoutPlansPage;
