import React, { useState } from "react";

const NutritionPlanForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    goal: "",
    duration: "",
    mealsPerDay: 3,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="min-h-screen bg-gray-0 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-xl border">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Add Nutrition Plan
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Plan Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Plan Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g., Muscle Gain Plan"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Goal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Goal
            </label>
            <input
              type="text"
              name="goal"
              value={form.goal}
              onChange={handleChange}
              placeholder="e.g., Gain Muscle, Lose Weight"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              placeholder="e.g., 4 weeks"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Meals Per Day */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meals Per Day
            </label>
            <input
              type="number"
              name="mealsPerDay"
              min={1}
              value={form.mealsPerDay}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              Add Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NutritionPlanForm;
