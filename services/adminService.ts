import { API } from "@/constants/api";
import { api } from "@/lib/api";

//using reset password- all user list
export const getUsersAPI = async (params: {
  page: number;
  limit: number;
  q?: string;
}) => {
  return await api.get(API.ADMIN.USERS, {
    params,
  });
};

//using to approve and assign role of pending user list in admin
export const getPendingUserAPI = async () => {
  return await api.get(API.ADMIN.REGISTRATION)
}