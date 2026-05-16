import { API } from '@/constants/api';
import { api } from '@/lib/api';


export interface BatchCreatePayload {
  email: string;
  role: string;
  action: string;
}

export interface BatchCreateResponse {
  createdCount: number;
  updatedCount: number;
  skippedCount: number;
  skippedEmails: string[];
}

export const userService = {
  searchUsers: async (query: string = '', limit: number = 10) => {
    const response = await api.get(`${API.ADMIN.USERS_SEARCH}?q=${encodeURIComponent(query)}&limit=${limit}`);
    return response.data;
  },

  deactivateUser: async (id: string) => {
    const response = await api.patch(API.ADMIN.DEACTIVATE_USER(id));
    return response.data;
  },

  batchCreateUsers: async (users: BatchCreatePayload[]): Promise<BatchCreateResponse> => {
    const response = await api.post(API.ADMIN.BATCH_CREATE, { users });
    return response.data?.data;
  },
};
