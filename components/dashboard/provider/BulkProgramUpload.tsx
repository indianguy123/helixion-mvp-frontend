'use client';

import { useState, useRef } from 'react';
import FileDropzone from '@/components/shared/FileDropzone';
import AppModal from '@/components/ui/app-modal';
import { Button } from '@/components/ui/button';
import { providerService, BulkUploadResult } from '@/services/provider.service';
import { t } from '@/lib/i18n';
import { toast } from 'sonner';

import { SAMPLE_CSV_HEADER, SAMPLE_CSV_ROW } from '@/constants/bulkProgram';
import { parseCsvPreview } from '@/utils/csv';
import { downloadSampleCsv } from '@/utils/csvDownload';
import BulkProgramPreview from './BulkProgramPreview';
import BulkUploadResults from './BulkUploadResults';

export default function BulkProgramUpload() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [uploadResult, setUploadResult] = useState<BulkUploadResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelected = async (file: File) => {
    if (!file.name.endsWith('.csv')) {
      toast.error(t('bulkProgram.errorInvalidFile'));
      return;
    }

    setIsProcessing(true);
    setSelectedFile(file);
    setUploadResult(null);

    try {
      const text = await file.text();
      const parsedData = parseCsvPreview(text, 5);
      
      if (parsedData.length === 0) {
        toast.error(t('bulkProgram.errorEmptyFile'));
        setIsProcessing(false);
        return;
      }

      setPreviewData(parsedData);
    } catch (err) {
      toast.error(t('bulkProgram.errorParseFailed'));
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePublish = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    try {
      const response = await providerService.bulkUploadPrograms(selectedFile);
      const result = response.data;
      setUploadResult(result);
      setShowSuccessModal(true);
    } catch (error: any) {
      toast.error(error.response?.data?.message || t('bulkProgram.errorUploadFailed'));
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewData([]);
    setUploadResult(null);
    setShowSuccessModal(false);
  };

  const handleDownloadSample = () => {
    downloadSampleCsv(SAMPLE_CSV_HEADER, SAMPLE_CSV_ROW);
  };

  // Build modal stats and description from upload result
  const modalStats = uploadResult
    ? [
        { label: t('bulkProgram.programsCreated', { count: uploadResult.insertedCount }), variant: 'green' as const },
        ...(uploadResult.failedCount > 0
          ? [{ label: t('bulkProgram.rowsFailed', { count: uploadResult.failedCount }), variant: 'orange' as const }]
          : []),
      ]
    : [];

  const modalDescription = uploadResult
    ? uploadResult.failedCount > 0
      ? t('bulkProgram.partialSuccessDescription', {
          inserted: uploadResult.insertedCount,
          failed: uploadResult.failedCount,
        })
      : t('bulkProgram.successDescription', { count: uploadResult.insertedCount })
    : '';

  return (
    <div className="w-full flex flex-col text-white font-sans">

      {/* Success Modal */}
      <AppModal
        isOpen={showSuccessModal}
        type="success"
        title={t('bulkProgram.successTitle')}
        description={modalDescription}
        stats={modalStats}
        doneLabel={t('button.done')}
        onDone={handleReset}
      />

      {/* Top Page Title with Try sample CSV at top-right */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-semibold mb-1 text-slate-100">
            {t('bulkProgram.pageTitle')}
          </h1>
          <p className="text-[10px] text-white/40 tracking-wider font-semibold uppercase">
            {t('bulkProgram.breadcrumb')}
          </p>
        </div>
        <Button variant="link" onClick={handleDownloadSample}>
          {t('bulkProgram.trySample')}
        </Button>
      </div>

      {/* Main Upload Section */}
      <div className="flex flex-col gap-5">
        <div>
          <h2 className="text-lg font-medium mb-0.5 text-slate-200">
            {t('bulkProgram.sectionTitle')}
          </h2>
          <p className="text-xs text-white/50">
            {t('bulkProgram.sectionDescription')}
          </p>
        </div>

        {/* Upload Results */}
        {uploadResult && (
          <BulkUploadResults uploadResult={uploadResult} onReset={handleReset} />
        )}

        {/* Preview Table */}
        {!uploadResult && selectedFile && previewData.length > 0 && (
          <div className="w-full bg-[#111827] rounded-xl border border-white/5 p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-md font-semibold text-slate-200">
                {t('bulkProgram.preview', { fileName: selectedFile.name })}
              </h3>
              <div className="flex gap-3">
                <Button variant="ghost" onClick={handleReset} disabled={isUploading}>
                  {t('bulkProgram.cancelButton')}
                </Button>
                <Button variant="default" onClick={handlePublish} disabled={isUploading}>
                  {isUploading ? t('bulkProgram.publishing') : t('bulkProgram.publishButton')}
                </Button>
              </div>
            </div>

            <BulkProgramPreview previewData={previewData} />
          </div>
        )}

        {/* Dropzone (initial state) */}
        {!uploadResult && !selectedFile && (
          <div className="w-full bg-[#111827] rounded-xl border border-white/5 px-6 py-10 shadow-lg">
            <FileDropzone
              accept=".csv"
              onFileSelected={handleFileSelected}
              isProcessing={isProcessing}
              fileInputRef={fileInputRef}
              label={
                <span className="font-medium text-slate-200">
                  {t('bulkProgram.dropLabel')}
                </span>
              }
              hint={t('bulkProgram.expectedColumns')}
            />

            {/* Footer Hint */}
            <p className="text-[11px] text-white/30 mt-5 text-center px-2">
              {t('bulkProgram.footerHint')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
