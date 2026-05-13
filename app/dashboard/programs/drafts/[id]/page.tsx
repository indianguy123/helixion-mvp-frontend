import EditDraftProgram from '@/components/dashboard/provider/EditDraftProgram';

export const metadata = {
  title: 'Edit Draft Program | Helixion Training Provider',
  description: 'Edit and update your draft training program details.',
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
