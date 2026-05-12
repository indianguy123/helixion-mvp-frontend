import BulkProgramUpload from '@/components/dashboard/provider/BulkProgramUpload';

export const metadata = {
  title: 'Bulk Upload Programs | Helixion Training Provider',
  description: 'Upload a CSV to create many programs at once.',
};

export default function BulkUploadPage() {
  return (
    <div className="w-full pt-4 pb-12">
      <BulkProgramUpload />
    </div>
  );
}
