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

export function editUser(payLoad) {}
export function deleteUser(id) {
  return client.delete(`/User/delete-record/${id}`);
}
