import { client } from "./axiosClient";

export function Register(payLoad) {
  return client.post("/auth/signup", payLoad);
}

export function Signin(payLoad) {
  return client.post("/auth/signin", payLoad);
}

export function getAllUser(payLoad) {
  return client.post("/User/search-record", payLoad);
}

export function editUser(id, payLoad) {
  return client.patch(`/User/update-record/${id}`, payLoad);
}
export function deleteUser(id) {
  return client.delete(`/User/delete-record/${id}`);
}
export function getUser(id) {
  return client.get(`/User/get-one-record/${id}`);
}

export function addCheckIn(payLoad) {
  return client.post("/Attendance/create", payLoad);
}

export function getAllCheckIn(payLoad) {
  return client.post("/Attendance/search-record", payLoad);
}

export function updateCheckOut(payLoad, id) {
  return client.patch(`/Attendance/update-record/${id}`, payLoad);
}

export function getMemberWithAttendance(body) {
  return client.post(`/Attendance/get-all-record-with-belongs-to`, body);
}

export function addPayment(payLoad) {
  return client.post("/Payment/create", payLoad);
}

export function getAllPayment(payLoad) {
  return client.post("/Payment/search-record", payLoad);
}

export function getPayment(userId) {
  return client.get("/Payment/search-one-record/", { params: { userId } });
}
export function updatePayment(id, payLoad) {
  return client.get(`/Payment/update-record/${id}`, payLoad);
}

export function createOrder(payload) {
  return client.post(`/pay/orders`, payload);
}

export function verifyPayment(payload) {
  return client.post(`/pay/verify`, payload);
}

export function createPayment(payLoad) {
  return client.post("/Payment/create", payLoad);
}

export function getProfile() {
  return client.get("/auth/profile");
}
export function editProfile(payLoad) {
  return client.patch("/auth/update-profile", payLoad);
}

export function createBankDetails(payLoad) {
  return client.post("/BankDetails/create", payLoad);
}

export function updateBankDetails(id, payLoad) {
  return client.patch(`/BankDetails/update-record/${id}`, payLoad);
}

export function getBankDetailsByUserId(userId) {
  return client.get("/BankDetails/search-one-record/", { params: { userId } });
}

export function createPaymentAdmin(payLoad) {
  return client.post("/UserPayment/create/", payLoad);
}

export function getAllPaymentForUser(payLoad) {
  return client.post("/UserPayment/search-record/", payLoad);
}

export function getPaymentForUserByAdmin(id) {
  return client.get(`UserPayment/get-one-record/${id}`);
}
export function updatePaymentAdmin(id, payLoad) {
  return client.patch(`/UserPayment/update-record/${id}`, payLoad);
}
export function deletePaymentAdmin(id) {
  return client.delete(`/UserPayment/delete-record/${id}`);
}

export function createPaymentSuperAdmin(payLoad) {
  return client.post("/AdminPayment/create/", payLoad);
}

export function getAllPaymentForAdmin(payLoad) {
  return client.post("/AdminPayment/search-record/", payLoad);
}

export function getPaymentForAdminBySuperAdmin(id) {
  return client.get(`/AdminPayment/get-one-record/${id}`);
}
export function updatePaymentSuperAdmin(id, payLoad) {
  return client.patch(`/AdminPayment/update-record/${id}`, payLoad);
}
export function deletePaymentSuperAdmin(id) {
  return client.delete(`/AdminPayment/delete-record/${id}`);
}

export function getAllWorkoutPlans(payLoad) {
  return client.post("/Workout/search-record", payLoad);
}

export function createWorkOutPlan(payLoad) {
  return client.post("/Workout/create", payLoad);
}

export function getWorkoutPlanById(id) {
  return client.get(`/Workout/get-one-record/${id}`);
}
export function updateWorkoutPlan(id, payLoad) {
  return client.patch(`/Workout/update-record/${id}`, payLoad);
}
export function deleteWorkoutPlan(id) {
  return client.delete(`/Workout/delete-record/${id}`);
}

export function getAllNutritionsPlans(payLoad) {
  return client.post("/Nurition/search-record", payLoad);
}

export function createNutritionsPlans(payLoad) {
  return client.post("/Nurition/create", payLoad);
}

export function getNutritionPlanById(id) {
  return client.get(`/Nurition/get-one-record/${id}`);
}
export function updateNutritionPlan(id, payLoad) {
  return client.patch(`/Nurition/update-record/${id}`, payLoad);
}
export function deleteNutritionPlan(id) {
  return client.delete(`/Nurition/delete-record/${id}`);
}

export function getAllEquipments(payLoad) {
  return client.post("/Equipment/search-record", payLoad);
}

export function createEquipments(payLoad) {
  return client.post("/Equipment/create", payLoad);
}

export function getEquipmentsById(id) {
  return client.get(`/Equipment/get-one-record/${id}`);
}
export function updateEquipments(id, payLoad) {
  return client.patch(`/Equipment/update-record/${id}`, payLoad);
}
export function deleteEquipments(id) {
  return client.delete(`/Equipment/delete-record/${id}`);
}

export function forgotPassword(payLoad) {
  return client.patch("/auth/forgot-password", payLoad);
}

export function resetPassword(payLoad) {
  return client.patch("/auth/reset-password", payLoad);
}
