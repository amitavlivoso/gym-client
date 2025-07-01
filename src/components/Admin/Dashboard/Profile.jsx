import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  getUserId,
  getUserName,
  getUserRoll,
} from "../../../services/axiosClient";

import {
  createBankDetails,
  editProfile,
  getBankDetailsByUserId,
  getUser,
  updateBankDetails,
} from "../../../services/Service";

const Profile = () => {
  const [hasBankDetails, setHasBankDetails] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dob: "",
    adharNumber: "",
    bankName: "",
    AccNo: "",
    IFSC: "",
  });

  useEffect(() => {
    getUser(getUserId())
      .then((res) => {
        console.log(res);

        const user = res?.data?.data || {};

        setFormData({
          name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
          email: user.email || "",
          phoneNumber: user.phoneNumber || "",
          gender: user.gender || "",
          dob: user.dob || "",
          adharNumber: user.adharNumber || "",
        });
      })
      .catch((err) => {
        console.error(err);
      });

    getBankDetailsByUserId(getUserId())
      .then((res) => {
        console.log("Bank Details:", res);

        const bank = res?.data?.data;
        if (bank) {
          setHasBankDetails(true);
          setFormData((prev) => ({
            ...prev,
            bankName: bank.bankName || "",
            AccNo: bank.AccNo || "",
            IFSC: bank.IFSC || "",
          }));
        }
      })
      .catch((err) => {
        console.log("Bank details not found:", err);
        setHasBankDetails(false);
      });

    // setFormData({
    //   name: `${fetchedUser.firstName} ${fetchedUser.lastName}`,

    //   bankName: fetchedUser.bankName,
    //   AccNo: fetchedUser.AccNo,
    //   IFSC: fetchedUser.IFSC,
    // });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Split name into first and last
    const [firstName, ...rest] = formData.name.trim().split(" ");
    const lastName = rest.join(" ") || "";

    const userpayload = {
      firstName,
      lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      gender: formData.gender,
      dob: formData.dob,
      adharNumber: formData.adharNumber,
    };

    console.log("Submitting Payload:", userpayload);

    const bankPayload = {
      userId: getUserId(),
      bankName: formData.bankName,
      AccNo: formData.AccNo,
      IFSC: formData.IFSC,
    };
    console.log(bankPayload);

    try {
      await editProfile(userpayload);

      if (hasBankDetails) {
        await updateBankDetails(getUserId(), bankPayload);
      } else {
        await createBankDetails(bankPayload);
      }
      // Your API call goes here
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Error updating profile. Please try again.");
      console.error("Error updating profile:", err);
    }
  };

  const getInitials = (name) => {
    if (!name) return "?";
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-tr from-gray-50 to-white p-4 md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel */}
        <motion.div
          className="md:w-1/3 bg-blue-50 p-8 flex flex-col items-center justify-center text-center"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="w-32 h-32 rounded-full bg-blue-500 text-white flex items-center justify-center text-5xl font-bold shadow-lg mb-4">
            {getInitials(getUserName())}
          </div>

          <h2 className="text-xl font-bold text-gray-800">{getUserName()}</h2>
          <p className="text-sm text-blue-600 font-medium">{getUserRoll()}</p>
        </motion.div>

        {/* Right Panel */}
        <motion.div
          className="md:w-2/3 p-8 md:p-12"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Update Profile
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputWithLabel
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />

              <InputWithLabel
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />

              <InputWithLabel
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />

              <InputWithLabel
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              />

              <InputWithLabel
                label="Date of Birth"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
              />

              <InputWithLabel
                label="Aadhar Number"
                name="adharNumber"
                value={formData.adharNumber}
                onChange={handleChange}
              />

              <InputWithLabel
                label="Bank Name"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
              />

              <InputWithLabel
                label="Account Number"
                name="AccNo"
                value={formData.AccNo}
                onChange={handleChange}
              />

              <InputWithLabel
                label="IFSC Code"
                name="IFSC"
                value={formData.IFSC}
                onChange={handleChange}
              />
            </div>

            <div className="text-right">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition"
              >
                Save Changes
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

// ✅ Input with label component
const InputWithLabel = ({ label, name, value, onChange, type = "text" }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white transition-all"
    />
  </div>
);

export default Profile;
