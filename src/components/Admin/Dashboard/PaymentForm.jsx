import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createPayment, getAllPaymentForUser } from "../../../services/Service";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentForm = () => {
  const location = useLocation();
  const userId = location?.state?.userId || "";
  const today = new Date().toISOString().split("T")[0];

  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Fetch available plans on mount
  useEffect(() => {
    const payLoad = {
      data: { filter: "" },
      page: 0,
      pageSize: 50,
      order: [["createdAt", "ASC"]],
    };
    getAllPaymentForUser(payLoad).then((res) => {
      setPlans(res?.data?.data?.rows || []);
    });
  }, []);

  // Helper to calculate expiresAt
  const calculateExpiresAt = (paidAt, periodInMonths) => {
    if (!paidAt || !periodInMonths) return "";
    const date = new Date(paidAt);
    date.setMonth(date.getMonth() + Number(periodInMonths));
    return date.toISOString().split("T")[0];
  };

  // Formik setup
  const formik = useFormik({
    initialValues: {
      planName: "",
      amount: "",
      status: "PAID",
      method: "",
      paidAt: today,
      expiresAt: "",
    },
    validationSchema: Yup.object({
      planName: Yup.string().required("Plan name is required"),
      amount: Yup.number()
        .min(1, "Amount must be greater than 0")
        .required("Amount is required"),
      method: Yup.string().required("Payment method is required"),
      paidAt: Yup.date().required("Paid At is required"),
    }),
    onSubmit: (values) => {
      const payLoad = {
        userId,
        ...values,
      };
      createPayment(payLoad)
        .then((res) => {
          console.log(res);
          toast.success(res?.data?.msg);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  // Handle plan change
  const handlePlanChange = (e) => {
    const planId = Number(e.target.value);
    const plan = plans.find((p) => p.id === planId);

    if (plan) {
      const expiresAt = calculateExpiresAt(formik.values.paidAt, plan.period);
      setSelectedPlan(plan);
      formik.setFieldValue("planName", plan.name);
      formik.setFieldValue("amount", plan.price);
      formik.setFieldValue("expiresAt", expiresAt);
    } else {
      setSelectedPlan(null);
      formik.setFieldValue("planName", "");
      formik.setFieldValue("amount", "");
      formik.setFieldValue("expiresAt", "");
    }
  };

  // Handle paidAt change → update expiresAt
  const handlePaidAtChange = (e) => {
    formik.handleChange(e);
    const newPaidAt = e.target.value;
    if (selectedPlan) {
      const expiresAt = calculateExpiresAt(newPaidAt, selectedPlan.period);
      formik.setFieldValue("expiresAt", expiresAt);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6 border-b pb-2">
        💳 Add Payment
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Plan Name Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Plan Name <span className="text-red-500">*</span>
            </label>
            <select
              name="planName"
              value={selectedPlan?.id || ""}
              onChange={handlePlanChange}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 ${
                formik.errors.planName && formik.touched.planName
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <option value="">Select a plan</option>
              {plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name} - ₹{plan.price} ({plan.period} month
                  {plan.period > 1 ? "s" : ""})
                </option>
              ))}
            </select>
            {formik.errors.planName && formik.touched.planName && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.planName}
              </p>
            )}
          </div>

          {/* Amount - Disabled Input */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Amount (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="amount"
              value={formik.values.amount}
              readOnly
              className="w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed border-gray-300"
            />
            {formik.errors.amount && formik.touched.amount && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.amount}
              </p>
            )}
          </div>
        </div>

        {/* Status & Method */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 border-gray-300"
            >
              <option value="PAID">PAID</option>
              <option value="PENDING">PENDING</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Method <span className="text-red-500">*</span>
            </label>
            <select
              name="method"
              value={formik.values.method}
              onChange={formik.handleChange}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 ${
                formik.errors.method && formik.touched.method
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <option value="">Select Method</option>
              <option value="CASH">CASH</option>
              <option value="CARD">CARD</option>
              <option value="UPI">UPI</option>
              <option value="ONLINE">ONLINE</option>
            </select>
            {formik.errors.method && formik.touched.method && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.method}
              </p>
            )}
          </div>
        </div>

        {/* Paid At & Expires At */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Paid At</label>
            <input
              type="date"
              name="paidAt"
              value={formik.values.paidAt}
              onChange={handlePaidAtChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 border-gray-300"
            />
            {formik.errors.paidAt && formik.touched.paidAt && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.paidAt}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Expires At</label>
            <input
              type="date"
              name="expiresAt"
              value={formik.values.expiresAt}
              readOnly
              className="w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed border-gray-300"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold px-4 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            💰 Submit Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
