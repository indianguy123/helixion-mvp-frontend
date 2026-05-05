'use client';

import { useState, useEffect, useCallback } from 'react';
import { FormattedRegistration } from '@/types/admin';
import { transformRegistrationData } from '@/utils/adminHelpers';
import { NETWORK_ERRORS } from '@/constants/errors';
import { getPendingUserAPI } from '@/services/adminService';

interface UseRegistrationsReturn {
  registrations: FormattedRegistration[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useRegistrations = (): UseRegistrationsReturn => {
  const [registrations, setRegistrations] = useState<FormattedRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);

    try {
      const response = await getPendingUserAPI();
      const formattedData = transformRegistrationData(response.data.data);

      setRegistrations(formattedData);
      setError(null);
    } catch {
      setError(NETWORK_ERRORS.CONNECTION_FAILED);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  return {
    registrations,
    loading,
    error,
    refetch: fetchRegistrations, 
  };
};