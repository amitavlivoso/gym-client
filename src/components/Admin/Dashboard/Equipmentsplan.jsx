import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserRoll } from "../../../services/axiosClient";

const dummyEquipments = [
  {
    id: 1,
    name: "Dumbbells",
    type: "Strength",
    quantity: 20,
    condition: "Good",
  },
  {
    id: 2,
    name: "Treadmill",
    type: "Cardio",
    quantity: 5,
    condition: "Maintenance",
  },
];

const EquipmentPlansPage = () => {
  const [equipments, setEquipments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Replace with API call
    setEquipments(dummyEquipments);
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Equipment Plans</h2>
          {getUserRoll() !== "Admin" ? (
            <></>
          ) : (
            <>
              <button
                onClick={() => navigate("/admin/dashboard/add-equipment")}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                + Add Equipment
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
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Condition</th>
                {getUserRoll() === "Admin" ? (
                  <>
                    <th className="px-4 py-3">Actions</th>
                  </>
                ) : (
                  <></>
                )}
              </tr>
            </thead>
            <tbody>
              {equipments.map((item, index) => (
                <tr key={item.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.type}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">{item.condition}</td>
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

export default EquipmentPlansPage;
