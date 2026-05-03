'use client';

import { useCallback } from 'react';
import { AlertCircle } from 'lucide-react';
import { BulkUser } from '@/types/bulk-import';
import { parseCSV, formatFileSize } from '@/utils/csv-parser';
import { useFileUpload } from '@/hooks/useFileUpload';
import FileDropzone from '@/components/shared/FileDropzone';
import { t } from '@/lib/i18n';

interface StepUploadProps {
  onFileParsed: (users: BulkUser[], fileName: string, fileSize: string, rowCount: number) => void;
}

const FILE_UPLOAD_CONFIG = {
  accept: ['.csv'],
  maxSizeBytes: 5 * 1024 * 1024,
  maxRows: 50,
};

export default function StepUpload({ onFileParsed }: StepUploadProps) {
  const handleSuccess = useCallback(
    (result: { data: BulkUser[]; rowCount: number; fileName: string; fileSize: string }) => {
      onFileParsed(result.data, result.fileName, result.fileSize, result.rowCount);
    },
    [onFileParsed]
  );

  const { processFile, isProcessing, error, fileInputRef } = useFileUpload<BulkUser>(
    FILE_UPLOAD_CONFIG,
    parseCSV,
    formatFileSize,
    handleSuccess
  );

  const dropLabel = isProcessing
    ? t('bulkImport.upload.processing')
    : (
      <>
        Drop <span className="text-primary">.csv</span> file here or{' '}
        <span className="text-primary">click to browse</span>
      </>
    );

  return (
    <div>
      <FileDropzone
        accept=".csv"
        onFileSelected={processFile}
        isProcessing={isProcessing}
        label={dropLabel}
        hint={t('bulkImport.upload.hint')}
        fileInputRef={fileInputRef}
        inputId="bulk-import-file-input"
      />

      {error && (
        <div className="flex items-start gap-3 p-4 mt-3 rounded-lg bg-accentRed/10 border border-accentRed/20">
          <AlertCircle className="text-accentRed flex-shrink-0 mt-0.5" size={16} />
          <div>
            <p className="text-sm text-accentRed font-medium">{t('bulkImport.upload.errorTitle')}</p>
            <p className="text-xs text-accentRed/80 mt-0.5">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
