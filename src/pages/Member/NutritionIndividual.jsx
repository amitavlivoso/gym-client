import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserRoll, getUserId } from "../../services/axiosClient";
import {
  getAllNutritionsPlans,
  deleteNutritionPlan,
  updateNutritionPlan,
} from "../../services/Service";

const NutritionIndividualPlansPage = () => {
  const location = useLocation();
  const userId = location?.state?.id || "";

  const [plans, setPlans] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [loadingIds, setLoadingIds] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
  }, [userId]);

  const fetchPlans = () => {
    const payLoad = {
      data: { filter: "", userId: getUserId() },
      page: 0,
      pageSize: 50,
      order: [["createdAt", "ASC"]],
    };
    getAllNutritionsPlans(payLoad).then((res) => {
      setPlans(res?.data?.data?.rows || []);
    });
  };

  const handleEdit = (id) => {
    navigate("/admin/dashboard/add-nutrition", {
      state: { planId: id },
    });
  };

  const handleDeleteClick = (id) => {
    setSelectedPlanId(id);
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setSelectedPlanId(null);
    setShowDeleteModal(false);
  };

  const confirmDelete = async () => {
    if (selectedPlanId) {
      await deleteNutritionPlan(selectedPlanId);
      setShowDeleteModal(false);
      setSelectedPlanId(null);
      fetchPlans();
    }
  };

  const handleComplete = async (plan) => {
    const today = new Date().toISOString().split("T")[0];
    setLoadingIds((prev) => new Set(prev).add(plan.id));
    try {
      await updateNutritionPlan(plan.id, {
        toDate: today,
        isCompleted: true,
      });
      setPlans((prev) =>
        prev.map((p) =>
          p.id === plan.id ? { ...p, toDate: today, isCompleted: true } : p
        )
      );
    } catch (error) {
      console.error("Error updating nutrition plan:", error);
      alert("Failed to mark as completed.");
    } finally {
      setLoadingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(plan.id);
        return newSet;
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-8xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Nutrition Plans</h2>
          {(getUserRoll() === "Admin" || getUserRoll() === "Trainer") && (
            <button
              onClick={() =>
                navigate("/admin/dashboard/add-nutrition", {
                  state: { userId },
                })
              }
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              + Add Nutrition Plan
            </button>
          )}
        </div>

        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Goal</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Meals/Day</th>
                <th className="px-4 py-3">From Date</th>
                <th className="px-4 py-3">To Date</th>
                <th className="px-4 py-3">Eating</th>
                <th className="px-4 py-3">Protein</th>
                <th className="px-4 py-3">Which Protein</th>
                {(getUserRoll() === "Admin" || getUserRoll() === "Trainer") && (
                  <th className="px-4 py-3">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {plans.length === 0 ? (
                <tr>
                  <td colSpan="11" className="text-center py-6 text-gray-500">
                    No nutrition plans found.
                  </td>
                </tr>
              ) : (
                plans.map((plan, index) => {
                  const isCompleted = plan.toDate && plan.toDate.trim() !== "";
                  const isLoading = loadingIds.has(plan.id);

                  return (
                    <tr key={plan.id} className="border-b hover:bg-gray-100">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{plan.name}</td>
                      <td className="px-4 py-2">{plan.goal}</td>
                      <td className="px-4 py-2">{plan.duration}</td>
                      <td className="px-4 py-2">{plan.mealsPerDay}</td>
                      <td className="px-4 py-2">{plan.fromDate || "-"}</td>
                      <td className="px-4 py-2">{plan.toDate || "-"}</td>
                      <td className="px-4 py-2">{plan.eating}</td>
                      <td className="px-4 py-2">{plan.protein}</td>
                      <td className="px-4 py-2">{plan.whichProtein}</td>
                      {(getUserRoll() === "Admin" ||
                        getUserRoll() === "Trainer") && (
                        <td className="px-4 py-2 flex flex-col space-y-2">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(plan.id)}
                              className="text-blue-600 hover:underline"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteClick(plan.id)}
                              className="text-red-600 hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                          {isCompleted ? (
                            <span className="text-green-600 font-semibold">
                              Completed
                            </span>
                          ) : (
                            <button
                              onClick={() => handleComplete(plan)}
                              disabled={isLoading}
                              className={`px-3 py-1 rounded ${
                                isLoading
                                  ? "bg-gray-400 text-white"
                                  : "bg-green-500 text-white hover:bg-green-600"
                              }`}
                            >
                              {isLoading ? "Completing..." : "Complete"}
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete this nutrition plan?
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

export default NutritionIndividualPlansPage;
