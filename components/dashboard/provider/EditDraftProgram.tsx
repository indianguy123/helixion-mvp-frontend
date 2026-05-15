'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Paperclip, Save, Send } from 'lucide-react';
import { useDraftActions } from '@/hooks/useDraftActions';
import { t } from '@/lib/i18n';
import Badge from '@/components/ui/badge';
import AppModal from '@/components/ui/app-modal';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import InputField from '@/components/ui/input';
import type { UpdateDraftPayload } from '@/services/provider.service';

interface EditDraftProgramProps {
  programId: string;
}

export default function EditDraftProgram({ programId }: EditDraftProgramProps) {
  const router = useRouter();
  const { draft, isLoadingDraft, isSaving, isPublishing, fetchDraft, saveDraft, publishDraft } = useDraftActions();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);

  // ── Form state ─────────────────────────────────────────────────────
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [venue, setVenue] = useState('');
  const [isResidential, setIsResidential] = useState(false);
  const [singleOccupancyFee, setSingleOccupancyFee] = useState('');
  const [twinSharingFee, setTwinSharingFee] = useState('');
  const [isNonResidential, setIsNonResidential] = useState(false);
  const [nonResidentialFee, setNonResidentialFee] = useState('');
  const [brochureFile, setBrochureFile] = useState<File | null>(null);
  const [brochureFilename, setBrochureFilename] = useState('');

  useEffect(() => { fetchDraft(programId); }, [programId]);

  useEffect(() => {
    if (!draft) return;
    setTitle(draft.title || '');
    setStartDate(draft.startDate ? draft.startDate.split('T')[0] : '');
    setEndDate(draft.endDate ? draft.endDate.split('T')[0] : '');
    setVenue(draft.venue || '');
    const hasRes = (draft.singleOccupancyFee && draft.singleOccupancyFee > 0) || (draft.twinSharingFee && draft.twinSharingFee > 0);
    setIsResidential(!!hasRes);
    setSingleOccupancyFee(draft.singleOccupancyFee ? String(draft.singleOccupancyFee) : '');
    setTwinSharingFee(draft.twinSharingFee ? String(draft.twinSharingFee) : '');
    const hasNonRes = draft.nonResidentialFee && draft.nonResidentialFee > 0;
    setIsNonResidential(!!hasNonRes);
    setNonResidentialFee(draft.nonResidentialFee ? String(draft.nonResidentialFee) : '');
    if (draft.brochureUrl) {
      const parts = draft.brochureUrl.split('/');
      setBrochureFilename(parts[parts.length - 1] || 'brochure.pdf');
    }
  }, [draft]);

  const buildPayload = (): UpdateDraftPayload => ({
    title,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
    venue: venue || undefined,
    singleOccupancyFee: isResidential && singleOccupancyFee ? Number(singleOccupancyFee) : undefined,
    twinSharingFee: isResidential && twinSharingFee ? Number(twinSharingFee) : undefined,
    nonResidentialFee: isNonResidential && nonResidentialFee ? Number(nonResidentialFee) : undefined,
  });

  const handleSaveDraft = async () => {
    const saved = await saveDraft(programId, buildPayload(), brochureFile || undefined);
    if (saved) {
      router.push('/dashboard/programs/drafts');
    }
  };

  const handlePublishConfirm = async () => {
    setPublishError(null);
    const saved = await saveDraft(programId, buildPayload(), brochureFile || undefined);
    if (!saved) return;
    const result = await publishDraft(programId);
    if (result.success) { 
      setShowPublishModal(false); 
      router.push('/dashboard/programs/drafts'); 
    } else {
      setPublishError(result.error || t('draftPrograms.errorPublishDefault'));
    }
  };

  const handlePublishCancel = () => {
    setShowPublishModal(false);
    setPublishError(null);
  };

  const handleBrochureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setBrochureFile(file); setBrochureFilename(file.name); }
  };

  const handleBack = () => router.push('/dashboard/programs/drafts');

  const fmtUpdated = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' });

  const shortId = (id: string) => `DR-${id.slice(-4).toUpperCase()}`;


  if (isLoadingDraft) {
    return <div className="flex justify-center items-center py-16"><Spinner size="lg" /></div>;
  }

  if (!draft) return null;

  return (
    <div className="w-full flex flex-col text-white font-sans">
      {/* Publish Modal */}
      <AppModal isOpen={showPublishModal} type="confirm"
        title={t('draftPrograms.publishModalTitle')}
        description={
          <div className="flex flex-col gap-2">
            <span>{t('draftPrograms.publishModalDescription')}</span>
            {publishError && (
              <span className="text-red-400 font-medium text-xs mt-1 p-2 bg-red-500/10 rounded border border-red-500/20">
                {publishError}
              </span>
            )}
          </div>
        }
        cancelLabel={t('draftPrograms.publishModalDisagree')}
        confirmLabel={t('draftPrograms.publishModalConfirm')}
        loading={isPublishing || isSaving}
        onCancel={handlePublishCancel} onConfirm={handlePublishConfirm} />

      {/* Hidden file input */}
      <input type="file" ref={fileInputRef} onChange={handleBrochureChange} accept=".pdf" className="hidden" />

      {/* Back Link */}
      <Button variant="ghost" onClick={handleBack} className="mb-4 self-start" id="back-to-drafts">
        <ArrowLeft size={16} className="mr-1.5" />
        {t('draftPrograms.backToDrafts')}
      </Button>

      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-100 mb-1">{t('draftPrograms.editPageTitle')}</h1>
          <p className="text-sm text-white/40">
            {t('draftPrograms.editDraftId', { id: shortId(draft._id) })} · {t('draftPrograms.editLastUpdated', { date: fmtUpdated(draft.updatedAt) })}
          </p>
        </div>
        <Badge status="draft">{t('draftPrograms.statusDraft')}</Badge>
      </div>

      {/* Form Card */}
      <div className="border border-white/[0.08] rounded-xl p-8 mb-6">
        <h3 className="text-base font-semibold text-slate-200 mb-1">{t('draftPrograms.programDetails')}</h3>
        <p className="text-xs text-white/35 mb-6">{t('draftPrograms.fieldsRequired')}</p>

        {/* Program Title */}
        <div className="grid grid-cols-[180px_1fr] items-start py-5 border-t border-white/[0.06] gap-4">
          <label className="text-sm font-medium text-white/70 pt-2">
            {t('draftPrograms.labelProgramTitle')}<span className="text-red-400 ml-1">*</span>
          </label>
          <InputField value={title} onChange={(e) => setTitle(e.target.value)} id="edit-program-title" />
        </div>

        {/* Program Dates */}
        <div className="grid grid-cols-[180px_1fr] items-start py-5 border-t border-white/[0.06] gap-4">
          <label className="text-sm font-medium text-white/70 pt-2">
            {t('draftPrograms.labelProgramDates')}<span className="text-red-400 ml-1">*</span>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] text-white/35 font-medium">{t('draftPrograms.labelStartDate')}</span>
              <InputField type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} id="edit-start-date" />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] text-white/35 font-medium">{t('draftPrograms.labelEndDate')}</span>
              <InputField type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} id="edit-end-date" />
            </div>
          </div>
        </div>

        {/* Venue */}
        <div className="grid grid-cols-[180px_1fr] items-start py-5 border-t border-white/[0.06] gap-4">
          <label className="text-sm font-medium text-white/70 pt-2">
            {t('draftPrograms.labelVenue')}<span className="text-red-400 ml-1">*</span>
          </label>
          <InputField value={venue} onChange={(e) => setVenue(e.target.value)} id="edit-venue" />
        </div>

        {/* Stay Type & Fees */}
        <div className="grid grid-cols-[180px_1fr] items-start py-5 border-t border-white/[0.06] gap-4">
          <label className="text-sm font-medium text-white/70 pt-2">{t('draftPrograms.labelStayTypeFees')}</label>
          <div>
            {/* Residential */}
            <div className={`border rounded-xl p-4 mb-3 transition-colors ${isResidential ? 'border-blue-500/30' : 'border-white/10'}`}>
              <div className="flex items-center gap-2 mb-3">
                <input type="checkbox" checked={isResidential} onChange={(e) => setIsResidential(e.target.checked)}
                  className="w-[18px] h-[18px] accent-blue-500 cursor-pointer" id="residential-checkbox" />
                <label htmlFor="residential-checkbox" className="text-sm font-medium text-slate-200 cursor-pointer">
                  {t('draftPrograms.labelResidential')}
                </label>
              </div>
              {isResidential && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-white/40">{t('draftPrograms.labelSingleOccupancyFee')}</span>
                    <InputField type="number" value={singleOccupancyFee} onChange={(e) => setSingleOccupancyFee(e.target.value)} id="single-occupancy-fee" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-white/40">{t('draftPrograms.labelTwinSharingFee')}</span>
                    <InputField type="number" value={twinSharingFee} onChange={(e) => setTwinSharingFee(e.target.value)} id="twin-sharing-fee" />
                  </div>
                </div>
              )}
            </div>

            {/* Non-Residential */}
            <div className={`border rounded-xl p-4 mb-3 transition-colors ${isNonResidential ? 'border-blue-500/30' : 'border-white/10'}`}>
              <div className="flex items-center gap-2 mb-3">
                <input type="checkbox" checked={isNonResidential} onChange={(e) => setIsNonResidential(e.target.checked)}
                  className="w-[18px] h-[18px] accent-blue-500 cursor-pointer" id="non-residential-checkbox" />
                <label htmlFor="non-residential-checkbox" className="text-sm font-medium text-slate-200 cursor-pointer">
                  {t('draftPrograms.labelNonResidential')}
                </label>
              </div>
              {isNonResidential && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-white/40">{t('draftPrograms.labelProgramFee')}</span>
                    <InputField type="number" value={nonResidentialFee} onChange={(e) => setNonResidentialFee(e.target.value)} id="non-residential-fee" />
                  </div>
                </div>
              )}
            </div>
            <p className="text-xs text-white/35 mt-1">{t('draftPrograms.stayTypeHint')}</p>
          </div>
        </div>

        {/* Attach Brochure */}
        <div className="grid grid-cols-[180px_1fr] items-start py-5 border-t border-white/[0.06] gap-4">
          <label className="text-sm font-medium text-white/70 pt-2">
            {t('draftPrograms.labelAttachBrochure')}<span className="text-red-400 ml-1">*</span>
          </label>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <Button variant="outline" onClick={() => fileInputRef.current?.click()} id="browse-brochure">
                <Paperclip size={14} className="mr-1.5" />{t('draftPrograms.browseButton')}
              </Button>
              {brochureFilename && <span className="text-sm text-white/60">{brochureFilename}</span>}
            </div>
            <p className="text-[11px] text-white/30 mt-1">{t('draftPrograms.brochureHint')}</p>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end items-center pt-2">
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleSaveDraft} disabled={isSaving || isPublishing} id="save-draft-button">
            <Save size={14} className="mr-1.5" />{isSaving ? t('draftPrograms.saving') : t('draftPrograms.saveDraftButton')}
          </Button>
          <Button variant="default" onClick={() => setShowPublishModal(true)} disabled={isSaving || isPublishing} id="publish-program-button">
            <Send size={14} className="mr-1.5" />{t('draftPrograms.publishProgramButton')}
          </Button>
        </div>
      </div>
    </div>
  );
}
