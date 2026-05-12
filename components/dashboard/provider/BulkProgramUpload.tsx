'use client';

import { useState, useRef } from 'react';
import FileDropzone from '@/components/shared/FileDropzone';
import DataTable from '@/components/shared/data-table';
import { Button } from '@/components/ui/button';
import { providerService, BulkUploadError } from '@/services/provider.service';
import { toast } from 'sonner';

const EXPECTED_COLUMNS = [
  'title', 'startDate', 'endDate', 'venue', 'isResidential', 'stayType',
  'singleOccupancyFee', 'twinSharingFee', 'nonResidentialFee',
  'brochureUrl', 'minParticipants', 'maxParticipants', 'status',
];

const SAMPLE_CSV_HEADER = EXPECTED_COLUMNS.join(',');
const SAMPLE_CSV_ROW = 'Leadership Workshop,2026-06-01,2026-06-03,Mumbai,true,single,15000,12000,8000,,10,50,draft';

export default function BulkProgramUpload() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [uploadResult, setUploadResult] = useState<{
    insertedCount: number;
    failedCount: number;
    errors: BulkUploadError[];
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelected = async (file: File) => {
    if (!file.name.endsWith('.csv')) {
      toast.error('Please upload a valid CSV file.');
      return;
    }

    setIsProcessing(true);
    setSelectedFile(file);
    setUploadResult(null);

    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim() !== '');
      if (lines.length < 2) {
        toast.error('CSV file appears to be empty or invalid.');
        setIsProcessing(false);
        return;
      }

      const headers = lines[0].split(',').map(h => h.trim());
      const parsedData = lines.slice(1, 6).map(line => {
        const values = line.split(',');
        const obj: any = {};
        headers.forEach((header, index) => {
          obj[header] = values[index]?.trim() || '';
        });
        return obj;
      });

      setPreviewData(parsedData);
    } catch (err) {
      toast.error('Failed to parse CSV preview.');
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

      if (result.failedCount > 0) {
        toast.warning(`${result.insertedCount} programs created, ${result.failedCount} rows had errors.`);
      } else {
        toast.success(`${result.insertedCount} programs created successfully!`);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to upload programs. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewData([]);
    setUploadResult(null);
  };

  const handleDownloadSample = () => {
    const csvContent = `${SAMPLE_CSV_HEADER}\n${SAMPLE_CSV_ROW}`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_programs.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const previewColumns = previewData.length > 0
    ? Object.keys(previewData[0]).map(key => ({
        header: key,
        render: (row: any) => <span className="text-sm">{row[key]}</span>
      }))
    : [];

  const errorColumns = [
    { header: 'Row', render: (err: BulkUploadError) => <span className="text-sm font-medium">{err.row}</span> },
    {
      header: 'Issues',
      render: (err: BulkUploadError) => (
        <ul className="list-disc list-inside text-sm">
          {err.errors.map((e, i) => (
            <li key={i} className="text-red-400">
              <span className="font-medium text-white/70">{e.path}</span>: {e.message}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div className="w-full flex flex-col text-white font-sans">

      {/* Top Page Title with Try sample CSV at top-right */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-semibold mb-1 text-slate-100">Bulk Upload Programs</h1>
          <p className="text-[10px] text-white/40 tracking-wider font-semibold uppercase">
            PROGRAMS - BATCH PUBLISH
          </p>
        </div>
        <Button variant="link" onClick={handleDownloadSample}>
          Try sample CSV
        </Button>
      </div>

      {/* Main Upload Section */}
      <div className="flex flex-col gap-5">
        <div>
          <h2 className="text-lg font-medium mb-0.5 text-slate-200">Bulk upload programs</h2>
          <p className="text-xs text-white/50">
            Upload a CSV to create many programs at once. Preview before publishing.
          </p>
        </div>

        {/* Upload Results */}
        {uploadResult && (
          <div className="w-full bg-[#111827] rounded-xl border border-white/5 p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-md font-semibold text-slate-200">Upload Results</h3>
              <Button variant="ghost" onClick={handleReset}>
                Upload Another
              </Button>
            </div>

            <div className="flex gap-6 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="text-sm text-white/70">
                  {uploadResult.insertedCount} programs created
                </span>
              </div>
              {uploadResult.failedCount > 0 && (
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="text-sm text-white/70">
                    {uploadResult.failedCount} rows failed
                  </span>
                </div>
              )}
            </div>

            {uploadResult.errors.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-red-400 mb-2">Row-level errors</h4>
                <DataTable data={uploadResult.errors} columns={errorColumns} />
              </div>
            )}
          </div>
        )}

        {/* Preview Table */}
        {!uploadResult && selectedFile && previewData.length > 0 && (
          <div className="w-full bg-[#111827] rounded-xl border border-white/5 p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-md font-semibold text-slate-200">
                Preview: {selectedFile.name} (Showing top 5 rows)
              </h3>
              <div className="flex gap-3">
                <Button variant="ghost" onClick={handleReset} disabled={isUploading}>
                  Cancel
                </Button>
                <Button variant="default" onClick={handlePublish} disabled={isUploading}>
                  {isUploading ? 'Publishing...' : 'Publish Programs'}
                </Button>
              </div>
            </div>

            <DataTable data={previewData} columns={previewColumns} />
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
                  Drop your CSV here, or click to browse
                </span>
              }
              hint={`Expected columns: ${EXPECTED_COLUMNS.join(', ')}`}
            />

            {/* Footer Hint */}
            <p className="text-[11px] text-white/30 mt-5 text-center px-2">
              Max 500 rows per file - Duplicates will be flagged in preview
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
