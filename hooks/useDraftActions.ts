'use client';

import { useState } from 'react';
import { providerService, UpdateDraftPayload } from '@/services/provider.service';
import type { DraftProgram } from '@/types';
import { t } from '@/lib/i18n';
import { toast } from 'sonner';

interface UseDraftActionsReturn {
  isPublishing: boolean;
  isDeleting: boolean;
  isSaving: boolean;
  isLoadingDraft: boolean;
  draft: DraftProgram | null;
  fetchDraft: (id: string) => Promise<void>;
  saveDraft: (id: string, data: UpdateDraftPayload, brochureFile?: File) => Promise<boolean>;
  publishDraft: (id: string) => Promise<{ success: boolean; error?: string }>;
  deleteDraft: (id: string) => Promise<boolean>;
}

export function useDraftActions(): UseDraftActionsReturn {
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingDraft, setIsLoadingDraft] = useState(false);
  const [draft, setDraft] = useState<DraftProgram | null>(null);

  const fetchDraft = async (id: string) => {
    setIsLoadingDraft(true);
    try {
      const data = await providerService.getDraftById(id);
      setDraft(data);
    } catch {
      toast.error(t('draftPrograms.errorLoadDraft'));
    } finally {
      setIsLoadingDraft(false);
    }
  };

  const saveDraft = async (
    id: string,
    data: UpdateDraftPayload,
    brochureFile?: File
  ): Promise<boolean> => {
    setIsSaving(true);
    try {
      const updated = await providerService.updateDraft(id, data, brochureFile);
      setDraft(updated);
      toast.success(t('draftPrograms.successSaved'));
      return true;
    } catch {
      toast.error(t('draftPrograms.errorSaveDraft'));
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const publishDraft = async (id: string): Promise<{ success: boolean; error?: string }> => {
    setIsPublishing(true);
    try {
      await providerService.publishDraft(id);
      toast.success(t('draftPrograms.successPublished'));
      return { success: true };
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || t('draftPrograms.errorPublish');
      return { success: false, error: errorMsg };
    } finally {
      setIsPublishing(false);
    }
  };

  const deleteDraft = async (id: string): Promise<boolean> => {
    setIsDeleting(true);
    try {
      await providerService.deleteDraft(id);
      toast.success(t('draftPrograms.successDeleted'));
      return true;
    } catch {
      toast.error(t('draftPrograms.errorDelete'));
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isPublishing,
    isDeleting,
    isSaving,
    isLoadingDraft,
    draft,
    fetchDraft,
    saveDraft,
    publishDraft,
    deleteDraft,
  };
}
