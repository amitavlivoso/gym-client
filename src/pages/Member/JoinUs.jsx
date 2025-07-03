import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Register } from "../../services/Service";

// Material UI icons
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import LockIcon from "@mui/icons-material/Lock";

const genderOptions = ["Male", "Female", "Other"];

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  gender: Yup.string().required("Gender is required"),
  dob: Yup.string().required("Date of birth is required"),
  address: Yup.string().required("Address is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const JoinUsForm = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dob: "",
    address: "",
    password: "",
    confirmPassword: "",
    role: "Member",
    joinDate: new Date().toISOString().split("T")[0],
  };

  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const { confirmPassword, ...submitValues } = values;
    try {
      const res = await Register(submitValues);

      if (res.data.status_code === "CREATED") {
        toast.success(res?.data?.msg || "You have joined successfully!");
        navigate("/paymentpage", { state: { userId: res?.data?.data?.id } });
      }
      resetForm();
    } catch (err) {
      toast.error("Failed to submit. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center px-4 py-12 sm:py-20 bg-gray-50">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-lg p-6 sm:p-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Join Our Gym
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <Form className="space-y-4">
              {/* First and Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <div className="relative">
                    <PersonIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="h-12 text-base pl-10 w-full rounded-md border border-gray-300 focus:ring-[#ff6f59] focus:border-[#ff6f59]"
                    />
                  </div>
                  {touched.firstName && errors.firstName && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="h-12 text-base w-full rounded-md border border-gray-300 focus:ring-[#ff6f59] focus:border-[#ff6f59]"
                  />
                  {touched.lastName && errors.lastName && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <EmailIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="h-12 text-base pl-10 w-full rounded-md border border-gray-300 focus:ring-[#ff6f59] focus:border-[#ff6f59]"
                  />
                </div>
                {touched.email && errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <PhoneIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="h-12 text-base pl-10 w-full rounded-md border border-gray-300 focus:ring-[#ff6f59] focus:border-[#ff6f59]"
                  />
                </div>
                {touched.phoneNumber && errors.phoneNumber && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Gender and DOB */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="h-12 text-base w-full rounded-md border border-gray-300 focus:ring-[#ff6f59] focus:border-[#ff6f59]"
                  >
                    <option value="">Select</option>
                    {genderOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {touched.gender && errors.gender && (
                    <p className="text-xs text-red-500 mt-1">{errors.gender}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <EventIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      name="dob"
                      value={values.dob}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="h-12 text-base pl-10 w-full rounded-md border border-gray-300 focus:ring-[#ff6f59] focus:border-[#ff6f59]"
                    />
                  </div>
                  {touched.dob && errors.dob && (
                    <p className="text-xs text-red-500 mt-1">{errors.dob}</p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <div className="relative">
                  <LocationOnIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                  <textarea
                    name="address"
                    rows={3}
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="h-24 text-base pl-10 w-full rounded-md border border-gray-300 focus:ring-[#ff6f59] focus:border-[#ff6f59]"
                  />
                </div>
                {touched.address && errors.address && (
                  <p className="text-xs text-red-500 mt-1">{errors.address}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <LockIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="h-12 text-base pl-10 w-full rounded-md border border-gray-300 focus:ring-[#ff6f59] focus:border-[#ff6f59]"
                  />
                </div>
                {touched.password && errors.password && (
                  <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <LockIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="h-12 text-base pl-10 w-full rounded-md border border-gray-300 focus:ring-[#ff6f59] focus:border-[#ff6f59]"
                  />
                </div>
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 w-full py-3 px-4 rounded-md bg-[#ff6f59] text-white font-medium hover:bg-[#ff543e] transition"
              >
                Join Now
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default JoinUsForm;
