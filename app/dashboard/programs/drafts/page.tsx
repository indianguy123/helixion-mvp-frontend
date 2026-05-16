import DraftProgramsList from '@/components/dashboard/provider/DraftProgramsList';
import en from '@/message/en.json';

export const metadata = {
  title: en.draftPrograms.pageTitleFull,
  description: en.draftPrograms.pageDescription,
};

export default function DraftsPage() {
  return (
    <div className="w-full pt-4 pb-12">
      <DraftProgramsList />
    </div>
  );
}
