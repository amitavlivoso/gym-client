import { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  createPaymentAdmin,
  createPaymentSuperAdmin,
  getPaymentForAdminBySuperAdmin,
  getPaymentForUserByAdmin,
  updatePaymentAdmin,
  updatePaymentSuperAdmin,
} from "../../services/Service";
import { useLocation } from "react-router-dom";

const paymentSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required"),
  period: Yup.string().required("Period is required"),
  description: Yup.string(),
  features: Yup.array().of(Yup.string().required("Feature cannot be empty")),
  popular: Yup.boolean(),
});

const CreatePaymentForAdmin = () => {
  const location = useLocation();
  const id = location?.state?.id || null;

  const [initialValues, setInitialValues] = useState({
    name: "",
    price: "",
    period: "",
    description: "",
    features: [],
    popular: false,
  });

  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      // Fetch existing payment plan
      getPaymentForAdminBySuperAdmin(id)
        .then((res) => {
          const data = res?.data?.data;
          if (data) {
            setInitialValues({
              name: data.name || "",
              price: data.price || "",
              period: data.period || "",
              description: data.description || "",
              features: data.features || [],
              popular: data.popular || false,
            });
          }
        })
        .catch((err) => {
          toast.error("Failed to load payment plan details.");
          console.error(err);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (id) {
        await updatePaymentSuperAdmin(id, values);
        toast.success("Payment plan updated successfully!");
      } else {
        await createPaymentSuperAdmin(values);
        toast.success("Payment plan created successfully!");
        resetForm();
      }
    } catch (err) {
      toast.error("Error saving payment plan");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-lg font-medium text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-3xl mt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">
        {id ? "Edit Payment Plan" : "Create New Payment Plan"}
      </h2>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={paymentSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputWithLabel label="Name" name="name" />
              <InputWithLabel label="Price" name="price" type="number" />
              <InputWithLabel label="Period" name="period" />
              <InputWithLabel label="Description" name="description" />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Popular
              </label>
              <div className="flex items-center mt-1">
                <Field type="checkbox" name="popular" className="mr-2" />
                <span className="text-gray-700">Mark as Popular</span>
              </div>
              <Error name="popular" />
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Features
              </label>
              <FieldArray name="features">
                {({ push, remove }) => (
                  <div className="space-y-3">
                    {values.features &&
                      values.features.length > 0 &&
                      values.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Field
                            name={`features.${index}`}
                            className="flex-1 px-3 py-2 rounded border border-gray-300 focus:ring-blue-400"
                            placeholder={`Feature ${index + 1}`}
                          />
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    <button
                      type="button"
                      onClick={() => push("")}
                      className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Add Feature
                    </button>
                  </div>
                )}
              </FieldArray>
              <Error name="features" />
            </div>

            <div className="text-right">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition disabled:opacity-50"
              >
                {isSubmitting
                  ? id
                    ? "Updating..."
                    : "Creating..."
                  : id
                  ? "Update Payment Plan"
                  : "Create Payment Plan"}
              </motion.button>
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

// ✅ Input with label component
const InputWithLabel = ({ label, name, type = "text" }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <Field
      id={name}
      name={name}
      type={type}
      className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white transition-all"
    />
    <Error name={name} />
  </div>
);

// ✅ Error message component
const Error = ({ name }) => (
  <ErrorMessage
    name={name}
    component="div"
    className="text-red-500 text-sm mt-1"
  />
);

export default CreatePaymentForAdmin;
