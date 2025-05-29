import * as Yup from "yup";

const loginValidation = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const membervalidationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),

  role: Yup.string().required("Role is required"),
  status: Yup.string().required("Status is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
});

export { loginValidation, membervalidationSchema };
