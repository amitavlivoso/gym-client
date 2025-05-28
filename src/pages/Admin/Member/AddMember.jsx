import { Formik, Form } from "formik";
import InputField from "../../../components/Fields/InputField";
import PrimaryButton from "../../../components/Fields/PrimaryButton";
import { membervalidationSchema } from "../../../components/shared/Schema";
import { TextField, MenuItem } from "@mui/material";
import { Register } from "../../../services/Service";

const AddMember = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    role: "Member",
    status: "ACTIVE",
    email: "",
    phoneNumber: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={membervalidationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const payLoad = {
          ...values,
          password: "123456",
        };
        console.log("Payload:", payLoad);
        Register(payLoad)
          .then((res) => {
            console.log("Registered:", res);
            resetForm();
          })
          .catch((err) => {
            console.error("Registration Error:", err);
          })
          .finally(() => setSubmitting(false));
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        touched,
        errors,
        isSubmitting,
      }) => (
        <Form className="grid gap-6 max-w-2xl mx-auto p-8 shadow-xl rounded-xl bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Add New Member
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="First Name"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.firstName}
              touched={touched.firstName}
            />
            <InputField
              label="Last Name"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.lastName}
              touched={touched.lastName}
            />
            <InputField
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
            />
            <InputField
              label="Phone Number"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.phoneNumber}
              touched={touched.phoneNumber}
            />
            <InputField
              label="Role"
              name="role"
              value={values.role}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.role}
              touched={touched.role}
            />
            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              value={values.status}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.status && errors.status)}
              helperText={touched.status && errors.status ? errors.status : ""}
              margin="normal"
              sx={{
                input: { color: "black" },
                label: { color: "#666" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ccc",
                  },
                  "&:hover fieldset": {
                    borderColor: "#999",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FFD700",
                  },
                },
              }}
            >
              <MenuItem value="ACTIVE">Active</MenuItem>
              <MenuItem value="INACTIVE">Inactive</MenuItem>
            </TextField>
          </div>

          <PrimaryButton type="submit" disabled={isSubmitting}>
            Create Member
          </PrimaryButton>
        </Form>
      )}
    </Formik>
  );
};

export default AddMember;
