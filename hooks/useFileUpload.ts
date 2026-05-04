'use client';

import { useState, useCallback, useRef } from 'react';
import { t } from '@/lib/i18n';

interface FileUploadConfig {
  /** Accepted file extensions, e.g. ['.csv'] */
  accept: string[];
  /** Maximum file size in bytes */
  maxSizeBytes: number;
  /** Maximum rows allowed (checked after parsing) */
  maxRows: number;
}

interface FileUploadResult<T> {
  data: T[];
  rowCount: number;
  fileName: string;
  fileSize: string;
}

interface UseFileUploadReturn<T> {
  /** Process a File object through validation and parsing */
  processFile: (file: File) => Promise<void>;
  /** Whether a file is currently being processed */
  isProcessing: boolean;
  /** Current error message, if any */
  error: string | null;
  /** Clear the current error */
  clearError: () => void;
  /** Ref for hidden file input */
  fileInputRef: React.RefObject<HTMLInputElement>;
}

/**
 * Custom hook for file upload handling.
 * Encapsulates: file type validation, size validation, row limit checks,
 * processing state, and error state.
 */
export function useFileUpload<T>(
  config: FileUploadConfig,
  parser: (text: string) => T[],
  formatSize: (bytes: number) => string,
  onSuccess: (result: FileUploadResult<T>) => void
): UseFileUploadReturn<T> {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const clearError = useCallback(() => setError(null), []);

  const processFile = useCallback(async (file: File) => {
    setError(null);
    setIsProcessing(true);

    try {
      // Validate file type
      const hasValidExtension = config.accept.some((ext) =>
        file.name.toLowerCase().endsWith(ext)
      );
      if (!hasValidExtension) {
        throw new Error(t('bulkImport.upload.errorInvalidType'));
      }

      // Validate file size
      if (file.size > config.maxSizeBytes) {
        throw new Error(t('bulkImport.upload.errorFileSize'));
      }

      // Parse file content
      const text = await file.text();
      const data = parser(text);

      if (data.length === 0) {
        throw new Error(t('bulkImport.upload.errorNoData'));
      }

      if (data.length > config.maxRows) {
        throw new Error(
          t('bulkImport.upload.errorMaxRows', { count: data.length })
        );
      }

      const rowCount = text.trim().split(/\r?\n/).length;

      onSuccess({
        data,
        rowCount,
        fileName: file.name,
        fileSize: formatSize(file.size),
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : t('bulkImport.upload.errorGeneric')
      );
    } finally {
      setIsProcessing(false);
    }
  }, [config, parser, formatSize, onSuccess]);

  return { processFile, isProcessing, error, clearError, fileInputRef };
}
