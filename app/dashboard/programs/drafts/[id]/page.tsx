import EditDraftProgram from '@/components/dashboard/provider/EditDraftProgram';
import en from '@/message/en.json';

export const metadata = {
  title: en.draftPrograms.editPageTitleFull,
  description: en.draftPrograms.editPageDescription,
};

interface EditDraftPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditDraftPage({ params }: EditDraftPageProps) {
  const { id } = await params;

  return (
    <div className="w-full pt-4 pb-12">
      <EditDraftProgram programId={id} />
    </div>
  );
}
