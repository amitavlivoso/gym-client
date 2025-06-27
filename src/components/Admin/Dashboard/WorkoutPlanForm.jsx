import React, { useState } from "react";

const WorkoutPlanForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    title: "",
    level: "Beginner",
    duration: "",
    workoutsPerWeek: 3,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form); // Send form data to parent or API
  };

  return (
    <div className="min-h-screen bg-gray-0 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-xl border">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Create Workout Plan
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Plan Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g., Beginner Full Body"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Difficulty Level
            </label>
            <select
              name="level"
              value={form.level}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
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

          {/* Workouts Per Week */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Workouts Per Week
            </label>
            <input
              type="number"
              name="workoutsPerWeek"
              min={1}
              value={form.workoutsPerWeek}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              Submit Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkoutPlanForm;
