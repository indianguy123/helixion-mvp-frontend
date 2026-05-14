'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Send, Trash2 } from 'lucide-react';
import { useDraftPrograms } from '@/hooks/useDraftPrograms';
import { useDraftActions } from '@/hooks/useDraftActions';
import { t } from '@/lib/i18n';
import Badge from '@/components/ui/badge';
import SearchInput from '@/components/ui/search-input';
import AppModal from '@/components/ui/app-modal';
import { Spinner } from '@/components/ui/spinner';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import type { DraftProgram } from '@/types';

export default function DraftProgramsList() {
  const router = useRouter();
  const { drafts, total, page, isLoading, search, setSearch, setPage, refresh } = useDraftPrograms();
  const { publishDraft, deleteDraft, isPublishing, isDeleting } = useDraftActions();

  const [publishTarget, setPublishTarget] = useState<DraftProgram | null>(null);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DraftProgram | null>(null);

  const perPage = 10;
  const start = total === 0 ? 0 : (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);

  const handleEdit = (id: string) => router.push(`/dashboard/programs/drafts/${id}`);

  const handlePublishConfirm = async () => {
    if (!publishTarget) return;
    setPublishError(null);
    const result = await publishDraft(publishTarget._id);
    if (result.success) { 
      setPublishTarget(null); 
      refresh(); 
    } else {
      setPublishError(result.error || t('draftPrograms.errorPublishDefault'));
    }
  };

  const handlePublishCancel = () => {
    setPublishTarget(null);
    setPublishError(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    const ok = await deleteDraft(deleteTarget._id);
    if (ok) { setDeleteTarget(null); refresh(); }
  };

  const fmtDate = (d?: string) => (d ? new Date(d).toISOString().split('T')[0] : '—');

  const fmtFee = (p: DraftProgram) => {
    const parts = [];
    if (p.singleOccupancyFee) parts.push(t('draftPrograms.feeSingle', { fee: p.singleOccupancyFee.toLocaleString('en-IN') }));
    if (p.twinSharingFee) parts.push(t('draftPrograms.feeTwin', { fee: p.twinSharingFee.toLocaleString('en-IN') }));
    if (p.nonResidentialFee) parts.push(t('draftPrograms.feeNonRes', { fee: p.nonResidentialFee.toLocaleString('en-IN') }));
    
    if (parts.length === 0) return <span className="text-sm font-medium text-white/80">—</span>;
    
    return (
      <div className="flex flex-col gap-1">
        {parts.map((part, i) => (
          <span key={i} className="text-[11px] font-medium text-white/80 bg-white/5 px-2 py-0.5 rounded w-max">
            {part}
          </span>
        ))}
      </div>
    );
  };

  const fmtUpdated = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="w-full flex flex-col text-white font-sans">
      {/* Publish Modal */}
      <AppModal isOpen={!!publishTarget} type="confirm"
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
        loading={isPublishing}
        onCancel={handlePublishCancel} onConfirm={handlePublishConfirm} />

      {/* Delete Modal */}
      <AppModal isOpen={!!deleteTarget} type="confirm"
        title={t('draftPrograms.deleteModalTitle')}
        description={t('draftPrograms.deleteModalDescription')}
        cancelLabel={t('draftPrograms.deleteModalCancel')}
        confirmLabel={t('draftPrograms.deleteModalConfirm')}
        loading={isDeleting}
        onCancel={() => setDeleteTarget(null)} onConfirm={handleDeleteConfirm} />

      {/* Page Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-semibold mb-1 text-slate-100">{t('draftPrograms.pageTitle')}</h1>
          <p className="text-[10px] text-white/40 tracking-wider font-semibold uppercase">{t('draftPrograms.breadcrumb')}</p>
        </div>
      </div>

      {/* Section Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-100 mb-0.5">{t('draftPrograms.sectionTitle')}</h2>
          <p className="text-xs text-white/45">{t('draftPrograms.sectionDescription')}</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchInput value={search} onChange={setSearch} placeholder={t('draftPrograms.searchPlaceholder')} />
          <button
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-colors whitespace-nowrap"
            onClick={() => router.push('/dashboard/programs/create')} id="new-program-button">
            {t('draftPrograms.newProgramButton')}
          </button>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center items-center py-16"><Spinner size="lg" /></div>
      ) : drafts.length === 0 ? (
        <div className="bg-[#111827] border border-white/[0.06] rounded-xl">
          <div className="text-center py-12 text-white/40 text-sm">{t('draftPrograms.noResults')}</div>
        </div>
      ) : (
        <div className="bg-[#111827] border border-white/[0.06] rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('draftPrograms.columnProgramTitle')}</TableHead>
                <TableHead>{t('draftPrograms.columnStartDate')}</TableHead>
                <TableHead>{t('draftPrograms.columnEndDate')}</TableHead>
                <TableHead>{t('draftPrograms.columnVenue')}</TableHead>
                <TableHead>{t('draftPrograms.columnFee')}</TableHead>
                <TableHead>{t('draftPrograms.columnStatus')}</TableHead>
                <TableHead>{t('draftPrograms.columnActions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drafts.map((p) => (
                <TableRow key={p._id}>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium text-slate-200">{p.title}</span>
                      <span className="text-[11px] text-white/35">{t('draftPrograms.lastUpdated')} {fmtUpdated(p.updatedAt)}</span>
                    </div>
                  </TableCell>
                  <TableCell><span className="text-sm text-white/70">{fmtDate(p.startDate)}</span></TableCell>
                  <TableCell><span className="text-sm text-white/70">{fmtDate(p.endDate)}</span></TableCell>
                  <TableCell><span className="text-sm text-white/70">{p.venue || '—'}</span></TableCell>
                  <TableCell>{fmtFee(p)}</TableCell>
                  <TableCell><Badge status="draft">{t('draftPrograms.statusDraft')}</Badge></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-white/80 bg-white/[0.06] border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors"
                        onClick={() => handleEdit(p._id)} id={`edit-draft-${p._id}`}>
                        <Pencil size={14} />{t('draftPrograms.editButton')}
                      </button>
                      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-white/80 bg-white/[0.06] border border-white/10 hover:bg-blue-500/15 hover:border-blue-500/30 hover:text-blue-300 transition-colors"
                        onClick={() => setPublishTarget(p)} id={`publish-draft-${p._id}`}>
                        <Send size={14} />{t('draftPrograms.publishButton')}
                      </button>
                      <button className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
                        onClick={() => setDeleteTarget(p)} id={`delete-draft-${p._id}`}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination Footer */}
          <div className="flex justify-end items-center gap-6 px-4 py-3 border-t border-white/[0.06] text-xs text-white/40">
            <span>{t('draftPrograms.rowsPerPage', { perPage })}</span>
            <span>{t('draftPrograms.paginationInfo', { start, end, total })}</span>
          </div>
        </div>
      )}
    </div>
  );
}
