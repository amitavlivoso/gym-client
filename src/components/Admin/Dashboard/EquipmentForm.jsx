import React, { useState } from "react";

const EquipmentForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    type: "Strength",
    quantity: 1,
    condition: "Good",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="min-h-screen bg-gray-0 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-xl border">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Add New Equipment
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Equipment Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Equipment Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g., Treadmill, Dumbbell"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>Strength</option>
              <option>Cardio</option>
              <option>Flexibility</option>
              <option>Other</option>
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              min={1}
              value={form.quantity}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Condition */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Condition
            </label>
            <select
              name="condition"
              value={form.condition}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>Good</option>
              <option>Maintenance</option>
              <option>Damaged</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              Add Equipment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EquipmentForm;
