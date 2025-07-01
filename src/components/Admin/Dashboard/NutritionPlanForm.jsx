import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  createNutritionsPlans,
  updateNutritionPlan,
  getNutritionPlanById,
} from "../../../services/Service";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NutritionPlanForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location?.state?.userId || "";
  const planId = location?.state?.planId || "";

  const [initialValues, setInitialValues] = useState({
    name: "",
    goal: "",
    duration: "",
    mealsPerDay: 3,
    fromDate: "",
    toDate: "",
    eating: "Vegetarian",
    protein: "Moderate",
    whichProtein: "",
  });

  const [loading, setLoading] = useState(!!planId);

  useEffect(() => {
    if (planId) {
      // Fetch existing plan details
      getNutritionPlanById(planId)
        .then((res) => {
          const data = res?.data?.data;
          setInitialValues({
            name: data.name || "",
            goal: data.goal || "",
            duration: data.duration || "",
            mealsPerDay: data.mealsPerDay || 3,
            fromDate: data.fromDate || "",
            toDate: data.toDate || "",
            eating: data.eating || "Vegetarian",
            protein: data.protein || "Moderate",
            whichProtein: data.whichProtein || "",
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to load nutrition plan data.");
          navigate(-1);
        });
    }
  }, [planId, navigate]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Plan name is required")
      .min(3, "Minimum 3 characters"),
    goal: Yup.string().required("Goal is required"),
    duration: Yup.string().required("Duration is required"),
    mealsPerDay: Yup.number()
      .min(1, "Must be at least 1")
      .required("Meals per day is required"),
    fromDate: Yup.date().required("From Date is required"),
    toDate: Yup.date()
      .required("To Date is required")
      .min(Yup.ref("fromDate"), "To Date cannot be before From Date"),
    eating: Yup.string()
      .oneOf(["Vegetarian", "Non-Vegetarian", "Vegan"])
      .required("Eating preference is required"),
    protein: Yup.string()
      .oneOf(["Low", "Moderate", "High"])
      .required("Protein level is required"),
    whichProtein: Yup.string().nullable(),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const payLoad = {
      userId,
      ...values,
    };

    if (planId) {
      // Update existing plan
      updateNutritionPlan(planId, payLoad)
        .then((res) => {
          toast.success(res?.data?.msg || "Plan updated successfully");
          navigate(-1);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to update plan");
        })
        .finally(() => {
          setSubmitting(false);
        });
    } else {
      // Create new plan
      createNutritionsPlans(payLoad)
        .then((res) => {
          toast.success(res?.data?.msg || "Plan created successfully");
          navigate(-1);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to create plan");
        })
        .finally(() => {
          setSubmitting(false);
          resetForm();
        });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading plan data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-xl border">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          {planId ? "Edit Nutrition Plan" : "Add Nutrition Plan"}
        </h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Plan Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plan Name
                </label>
                <Field
                  type="text"
                  name="name"
                  placeholder="e.g., Muscle Gain Plan"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Goal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Goal
                </label>
                <Field
                  type="text"
                  name="goal"
                  placeholder="e.g., Gain Muscle, Lose Weight"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="goal"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <Field
                  type="text"
                  name="duration"
                  placeholder="e.g., 4 weeks"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="duration"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Meals Per Day */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meals Per Day
                </label>
                <Field
                  type="number"
                  name="mealsPerDay"
                  min={1}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="mealsPerDay"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* From Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From Date
                </label>
                <Field
                  type="date"
                  name="fromDate"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="fromDate"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* To Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To Date
                </label>
                <Field
                  type="date"
                  name="toDate"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="toDate"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Eating Preference */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Eating Preference
                </label>
                <Field
                  as="select"
                  name="eating"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                </Field>
                <ErrorMessage
                  name="eating"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Protein Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Protein Level
                </label>
                <Field
                  as="select"
                  name="protein"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
                </Field>
                <ErrorMessage
                  name="protein"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Which Protein */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Which Protein
                </label>
                <Field
                  type="text"
                  name="whichProtein"
                  placeholder="e.g., Whey, Soy, Pea, Casein"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="whichProtein"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : planId
                    ? "Update Plan"
                    : "Add Plan"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NutritionPlanForm;
