'use client';

import { useState, useEffect } from 'react';
import { FormattedRegistration } from '@/types/admin';
import { transformRegistrationData } from '@/utils/adminHelpers';
import { NETWORK_ERRORS } from '@/constants/errors';
import { getPendingUserAPI } from '@/services/adminService';

interface UseRegistrationsReturn {
  registrations: FormattedRegistration[];
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook for fetching and managing registration data
 * Implements proper error handling with user-friendly messages
 */
export const useRegistrations = (): UseRegistrationsReturn => {
  const [registrations, setRegistrations] = useState<FormattedRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await getPendingUserAPI()
        const formattedData = transformRegistrationData(response.data.data);
        setRegistrations(formattedData);
        setError(null);
      } catch {
        setError(NETWORK_ERRORS.CONNECTION_FAILED);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);


  return { registrations, loading, error };
};
