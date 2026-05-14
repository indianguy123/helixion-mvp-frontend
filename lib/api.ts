import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api") : "/api",
  withCredentials: true, 
});
 

api.interceptors.response.use(
  (res) => res,
  (error) => {
    return Promise.reject(error); 
  }
);

