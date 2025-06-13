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
