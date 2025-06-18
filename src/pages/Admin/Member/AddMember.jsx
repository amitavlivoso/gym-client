import { Formik, Form, useFormikContext } from "formik";
import { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Paper,
  Typography,
  Button,
  Box,
  InputAdornment,
  Avatar,
  CircularProgress,
  useTheme,
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Payment as PaymentIcon,
  MonetizationOn as MonetizationOnIcon,
} from "@mui/icons-material";
import {
  addPayment,
  Register,
  getUser,
  editUser,
  getPayment,
  updatePayment,
} from "../../../services/Service";
import { membervalidationSchema } from "../../../components/shared/Schema";
import { toast } from "react-toastify";
import color from "../../../components/shared/Color";
import { useLocation } from "react-router-dom";

const planOptions = [
  { label: "3 Months", value: "3month", price: 3000 },
  { label: "6 Months", value: "6month", price: 5500 },
  { label: "9 Months", value: "9month", price: 8000 },
  { label: "12 Months", value: "12month", price: 10000 },
];

const roleOptions = [
  "Accountant",
  "Trainer",
  "HR Manager",
  "Manager",
  "Lead",
  "Receptionist",
  "Member",
];
const statusOptions = ["ACTIVE", "INACTIVE"];
const paymentModeOptions = ["Cash", "Card", "UPI"];

const AutoUpdatePaymentAmount = () => {
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    const selectedPlan = planOptions.find(
      (plan) => plan.value === values.planName
    );
    if (selectedPlan) {
      setFieldValue("paymentAmount", selectedPlan.price);
    }
  }, [values.planName, setFieldValue]);

  return null;
};

const AddMember = ({ role }) => {
  const theme = useTheme();
  const location = useLocation();
  const userId = location?.state?.id;
  const isEdit = Boolean(userId);

  const [formState, setFormState] = useState({
    fullName: "",
    joinDate: "",
    role: role,
    status: "ACTIVE",
    email: "",
    phoneNumber: "",
    planName: "",
    paymentAmount: "",
    paymentMode: "",
  });

  useEffect(() => {
    if (isEdit) {
      getUser(userId).then((res) => {
        const data = res?.data?.data;
        if (data) {
          setFormState({
            fullName: `${data.firstName} ${data.lastName}`,
            joinDate: data.joinDate?.split("T")[0] || "",
            role: data.role || role,
            status: data.status,
            email: data.email,
            phoneNumber: data.phoneNumber,
            planName: data.planName || "",
            paymentAmount: data.paymentAmount || "",
            paymentMode: data.paymentMode || "",
          });
        }
      });
    }
  }, [isEdit, userId, role]);

  const initialValues = {
    fullName: formState.fullName,
    joinDate: formState.joinDate,
    role: formState.role,
    status: formState.status,
    email: formState.email,
    phoneNumber: formState.phoneNumber,
    planName: formState.planName,
    paymentAmount: formState.paymentAmount,
    paymentMode: formState.paymentMode,
  };

  return (
    <Box
      sx={{
        minHeight: "30vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        mb:3
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 900,
          margin: "20px auto",
          padding: { xs: 2, sm: 4 },
          borderRadius: 4,
          backgroundColor: "#ffffff",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Avatar
            sx={{
              bgcolor: color.firstColor,
              width: 60,
              height: 60,
              margin: "0 auto 16px",
            }}
          >
            <PersonIcon fontSize="large" />
          </Avatar>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            fontWeight={700}
            color={color.firstColor}
          >
            {isEdit ? `Edit ${role}` : `Add New ${role}`}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {isEdit
              ? "Update the details below to edit the user"
              : "Fill in the details below to add a new team member"}
          </Typography>
        </Box>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={membervalidationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const [firstName, ...rest] = values.fullName.trim().split(" ");
            const lastName = rest.join(" ");

            const payload = {
              firstName,
              lastName,
              email: values.email,
              phoneNumber: values.phoneNumber,
              joinDate: values.joinDate,
              role: values.role,
              status: values.status,
              password: "123456",
            };

            try {
              const res = isEdit
                ? await editUser(userId, payload)
                : await Register(payload);
              const id = userId || res?.data?.data?.id || res?.data?.user?.id;

              toast.success(
                res?.data?.msg ||
                  (isEdit ? "User Updated Successfully" : "User Registered")
              );

              if (!isEdit && values.role === "Member" && id) {
                const paymentPayload = {
                  userId: id,
                  planName: values.planName,
                  amount: values.paymentAmount,
                  method: values.paymentMode,
                };

                try {
                  const paymentRes = await getPayment(id);
                  const existingPayment = paymentRes?.data?.data;

                  if (existingPayment?.id) {
                    await updatePayment(existingPayment.id, paymentPayload);
                  } else {
                    await addPayment(paymentPayload);
                  }
                } catch (paymentError) {
                  console.error("❌ Payment Error:", paymentError);
                }
              }

              resetForm();
            } catch (err) {
              console.error("Error:", err);
              toast.error("Something went wrong. Please try again.");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            touched,
            errors,
            isSubmitting,
            isValid,
            dirty,
          }) => (
            <Form>
              <AutoUpdatePaymentAmount />

              <Box sx={{ mb: 3 }}>
                <TextField
                  label="Full Name"
                  name="fullName"
                  fullWidth
                  variant="outlined"
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.fullName && Boolean(errors.fullName)}
                  helperText={touched.fullName && errors.fullName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 3,
                  mb: 3,
                }}
              >
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Phone Number"
                  name="phoneNumber"
                  fullWidth
                  variant="outlined"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 3,
                  mb: 3,
                }}
              >
                <TextField
                  select
                  fullWidth
                  label="Role"
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {roleOptions.map((r) => (
                    <MenuItem key={r} value={r}>
                      {r}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  fullWidth
                  label="Status"
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="Join Date"
                  name="joinDate"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={values.joinDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Box>

              {values.role === "Member" && !isEdit && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 3,
                    mb: 3,
                  }}
                >
                  <TextField
                    select
                    label="Plan Name"
                    name="planName"
                    fullWidth
                    variant="outlined"
                    value={values.planName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PaymentIcon />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {planOptions.map((plan) => (
                      <MenuItem key={plan.value} value={plan.value}>
                        {plan.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    label="Payment Amount (₹)"
                    name="paymentAmount"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={values.paymentAmount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MonetizationOnIcon />
                        </InputAdornment>
                      ),
                      readOnly: true,
                    }}
                  />

                  <TextField
                    select
                    label="Payment Mode"
                    name="paymentMode"
                    fullWidth
                    value={values.paymentMode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {paymentModeOptions.map((mode) => (
                      <MenuItem key={mode} value={mode}>
                        {mode}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              )}

              <Box
                mt={5}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  onClick={() => window.history.back()}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="large"
                  disabled={isSubmitting || !isValid || !dirty}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : isEdit ? (
                    `Update ${role}`
                  ) : (
                    `Create ${role}`
                  )}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default AddMember;
