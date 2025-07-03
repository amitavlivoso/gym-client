import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/Service";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setIsLoading(true);
      await forgotPassword({ email });
      toast.success("OTP sent to your email. Check your inbox!");
      navigate("/reset-password", { state: { email } });
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
          Forgot Password
        </h2>
        <p className="text-gray-600 text-center mb-4">
          Enter your email to receive the OTP
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[#566fe2] font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full border-2 border-[#566fe2] rounded-md px-4 py-2 outline-none"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#566fe2] text-white py-2 rounded-md font-semibold hover:bg-opacity-90 transition duration-300"
          >
            {isLoading ? "Sending..." : "Send OTP"}
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

export default ForgotPassword;
