'use client';

import { Button } from '@/components/ui/button';
import { t } from '@/lib/i18n';

interface UploadHeaderProps {
  onDownloadSample: () => void;
}

/**
 * Page header for the Bulk Program Upload screen.
 * Renders the title, breadcrumb, and "Try sample CSV" action.
 */
export default function UploadHeader({ onDownloadSample }: UploadHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-2xl font-semibold mb-1 text-slate-100">
          {t('bulkProgram.pageTitle')}
        </h1>
        <p className="text-[10px] text-white/40 tracking-wider font-semibold uppercase">
          {t('bulkProgram.breadcrumb')}
        </p>
      </div>
      <Button variant="link" onClick={onDownloadSample}>
        {t('bulkProgram.trySample')}
      </Button>
    </div>
  );
}
