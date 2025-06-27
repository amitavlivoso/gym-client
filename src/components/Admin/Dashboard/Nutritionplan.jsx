import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserRoll } from "../../../services/axiosClient";

const dummyNutritionPlans = [
  {
    id: 1,
    name: "Weight Loss Plan",
    goal: "Lose Weight",
    duration: "4 weeks",
    mealsPerDay: 3,
  },
  {
    id: 2,
    name: "Muscle Gain Plan",
    goal: "Gain Muscle",
    duration: "6 weeks",
    mealsPerDay: 5,
  },
];

const NutritionPlansPage = () => {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Replace with API call
    setPlans(dummyNutritionPlans);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Nutrition Plans</h2>
          {getUserRoll() !== "Admin" ? (
            <></>
          ) : (
            <>
              <button
                onClick={() => navigate("/admin/dashboard/add-nutrition")}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                + Add Nutrition Plan
              </button>
            </>
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
              {plans.map((plan, index) => (
                <tr key={plan.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{plan.name}</td>
                  <td className="px-4 py-2">{plan.goal}</td>
                  <td className="px-4 py-2">{plan.duration}</td>
                  <td className="px-4 py-2">{plan.mealsPerDay}</td>
                  {getUserRoll() !== "Admin" ? (
                    <></>
                  ) : (
                    <>
                      <td className="px-4 py-2 space-x-2">
                        <button className="text-blue-600 hover:underline">
                          Edit
                        </button>
                        <button className="text-red-600 hover:underline">
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NutritionPlansPage;
