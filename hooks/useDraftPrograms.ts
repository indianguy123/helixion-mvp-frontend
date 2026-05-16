'use client';

import { useState, useEffect, useCallback } from 'react';
import { providerService } from '@/services/provider.service';
import type { DraftProgram } from '@/types';
import { t } from '@/lib/i18n';
import { toast } from 'sonner';

interface UseDraftProgramsReturn {
  drafts: DraftProgram[];
  total: number;
  totalPages: number;
  page: number;
  isLoading: boolean;
  search: string;
  setSearch: (value: string) => void;
  setPage: (page: number) => void;
  refresh: () => void;
}

const PAGE_SIZE = 10;

export function useDraftPrograms(): UseDraftProgramsReturn {
  const [drafts, setDrafts] = useState<DraftProgram[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchDrafts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await providerService.getDraftPrograms({
        page,
        limit: PAGE_SIZE,
        search: search || undefined,
      });
      setDrafts(data.programs);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch {
      toast.error(t('draftPrograms.errorLoadDrafts'));
    } finally {
      setIsLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchDrafts();
  }, [fetchDrafts]);

  // Reset to page 1 when search changes
  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  return {
    drafts,
    total,
    totalPages,
    page,
    isLoading,
    search,
    setSearch: handleSearchChange,
    setPage,
    refresh: fetchDrafts,
  };
}
