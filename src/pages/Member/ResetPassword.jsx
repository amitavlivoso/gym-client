import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../services/Service";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const prefilledEmail = location?.state?.email || "";

  const [email, setEmail] = useState(prefilledEmail);
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !token || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      await resetPassword({ email, token, password });
      toast.success("Password reset successful! Please log in.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.msg || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-[#566fe2] mb-6 text-center">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[#566fe2] font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full border-2 border-[#566fe2] rounded-md px-4 py-2 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[#566fe2] font-medium mb-1">
              OTP Code
            </label>
            <input
              type="text"
              className="w-full border-2 border-[#566fe2] rounded-md px-4 py-2 outline-none"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[#566fe2] font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              className="w-full border-2 border-[#566fe2] rounded-md px-4 py-2 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[#566fe2] font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full border-2 border-[#566fe2] rounded-md px-4 py-2 outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#566fe2] text-white py-2 rounded-md font-semibold hover:bg-opacity-90 transition duration-300"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-4">
          Remembered your password?{" "}
          <a href="/login" className="text-[#566fe2] hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </section>
  );
};

export default ResetPassword;
