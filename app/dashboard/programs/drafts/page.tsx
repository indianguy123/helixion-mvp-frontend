import DraftProgramsList from '@/components/dashboard/provider/DraftProgramsList';

export const metadata = {
  title: 'Draft Programs | Helixion Training Provider',
  description: 'View and manage your unpublished draft training programs.',
};

export default function DraftsPage() {
  return (
    <div className="w-full pt-4 pb-12">
      <DraftProgramsList />
    </div>
  );
}
