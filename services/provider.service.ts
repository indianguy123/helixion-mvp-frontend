import { api } from '@/lib/api';

export interface BulkUploadError {
  row: number;
  errors: { path: string; message: string }[];
}

export interface BulkUploadResponse {
  success: boolean;
  message: string;
  data: {
    insertedCount: number;
    failedCount: number;
    errors: BulkUploadError[];
  };
}

export const providerService = {
  bulkUploadPrograms: async (file: File): Promise<BulkUploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post<BulkUploadResponse>(
      '/training-provider/programs/bulk',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },
};
