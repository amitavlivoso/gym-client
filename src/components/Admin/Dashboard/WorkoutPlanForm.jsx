import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  createWorkOutPlan,
  getWorkoutPlanById,
  updateWorkoutPlan,
} from "../../../services/Service";
import { toast } from "react-toastify";

const WorkoutPlanForm = () => {
  const location = useLocation();
  const userId = location?.state?.id || "";
  const navigate = useNavigate();
  const id = location?.state?.planId || "";

  const [workoutplan, setWorkoutplan] = useState({});

  useEffect(() => {
    if (id) {
      getWorkoutPlanById(id)
        .then((res) => {
          setWorkoutplan(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  const initialValues = {
    title: workoutplan.title || "",
    level: workoutplan.level || "Beginner",
    duration: workoutplan.duration || "",
    workoutsPerWeek: workoutplan.workoutsPerWeek || 3,
    fromDate: workoutplan.fromDate || "",
    toDate: workoutplan.toDate || "",
  };

  // Yup Validation Schema
  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .min(3, "Title must be at least 3 characters"),
    level: Yup.string().required("Difficulty level is required"),
    duration: Yup.string().required("Duration is required"),
    workoutsPerWeek: Yup.number()
      .required("Required")
      .min(1, "Must be at least 1"),
    fromDate: Yup.date().required("From Date is required"),
    toDate: Yup.date()
      .required("To Date is required")
      .min(Yup.ref("fromDate"), "To Date cannot be before From Date"),
  });

  const handleSubmit = (values) => {
    const payLoad = {
      userId,
      ...values,
    };

    if (id) {
      updateWorkoutPlan(id, { ...values })
        .then((res) => {
          toast.success(res?.data?.msg);
          navigate(-1);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      createWorkOutPlan(payLoad)
        .then((res) => {
          toast.success(res?.data?.msg);
          navigate(-1);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-xl border">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          {id ? "Edit Workout Plan" : "Create Workout Plan"}
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plan Title
                </label>
                <Field
                  type="text"
                  name="title"
                  placeholder="e.g., Beginner Full Body"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty Level
                </label>
                <Field
                  as="select"
                  name="level"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </Field>
                <ErrorMessage
                  name="level"
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

              {/* Workouts Per Week */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Workouts Per Week
                </label>
                <Field
                  type="number"
                  name="workoutsPerWeek"
                  min={1}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="workoutsPerWeek"
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

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200"
                >
                  {isSubmitting ? "Submitting..." : "Submit Plan"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default WorkoutPlanForm;
