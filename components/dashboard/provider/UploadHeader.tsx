'use client';

import { Button } from '@/components/ui/button';
import PageHeader from '@/components/ui/pageHeader';
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
      <PageHeader
        title={t('bulkProgram.pageTitle')}
        description={t('bulkProgram.breadcrumb')}
      />
      <Button variant="link" onClick={onDownloadSample}>
        {t('bulkProgram.trySample')}
      </Button>
    </div>
  );
}
