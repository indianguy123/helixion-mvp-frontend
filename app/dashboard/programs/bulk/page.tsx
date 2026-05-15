import BulkProgramUpload from '@/components/dashboard/provider/BulkProgramUpload';
import messages from '@/message/en.json';

export const metadata = {
  title: messages.bulkProgram.pageTitleFull,
  description: messages.bulkProgram.pageDescription,
};

export default function BulkUploadPage() {
  return (
    <div className="w-full pt-4 pb-12">
      <BulkProgramUpload />
    </div>
  );
}
