import BulkProgramUpload from '@/components/dashboard/provider/BulkProgramUpload';
import en from '@/message/en.json';

export const metadata = {
  title: en.bulkProgram.pageTitleFull,
  description: en.bulkProgram.pageDescription,
};

export default function BulkUploadPage() {
  return (
    <div className="w-full pt-4 pb-12">
      <BulkProgramUpload />
    </div>
  );
}
