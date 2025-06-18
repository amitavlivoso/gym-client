import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import login from '../assets/image/login.png'

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useFormik } from "formik";
import { loginValidation } from "../components/shared/Schema";
import { Signin } from "../services/Service";
import { setCurrentAccessToken } from "../services/axiosClient";
import color from "../components/shared/Color";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const payLoad = {
          email: values.email,
          password: values.password,
        };
        Signin(payLoad)
          .then((res) => {
            const accessToken = res?.data?.data?.accessToken;
            const role = res?.data?.data?.role?.toLowerCase();
            setCurrentAccessToken(accessToken);
            if (role) {
              window.location.href = `/${role}/dashboard`;
            } else {
              console.error("Role is missing in response");
            }
          })
          .catch((err) => {
            console.error(err);
            toast.error("Login failed. Please check credentials.");
          });
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <section className="min-h-screen flex items-center justify-center bg-white m-20">
      <div className="flex flex-col md:flex-row w-full max-w-6xl shadow-lg rounded-2xl overflow-hidden">
        {/* Left Side */}
        <div className="md:w-1/2 bg-white p-10 relative flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-[#566fe2] mb-8">
            Sign-in
          </h2>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#566fe2] font-semibold mb-1">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border-2 border-[#566fe2] rounded-md px-4 py-2 outline-none"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[#566fe2] font-semibold mb-1">
                Password<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border-2 border-[#566fe2] rounded-md px-4 py-2 pr-10 outline-none"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center text-sm text-gray-600">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <Link
                to="/Forgot-Password"
                className="text-sm text-[#566fe2] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#566fe2] text-white py-2 rounded-md text-lg font-semibold hover:bg-opacity-90 transition duration-300"
            >
              {isLoading ? "Processing..." : "Login"}
            </button>
          </form>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2">
          <img
            src={login}
            alt="Gym"
            className="w-full h-full object-cover rounded-r-2xl p-8"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
