import { Pencil, Send, Trash2 } from 'lucide-react';
import { t } from '@/lib/i18n';
import type { DraftProgram } from '@/types';

interface Props {
  program: DraftProgram;
  onEdit: (id: string) => void;
  onPublish: (program: DraftProgram) => void;
  onDelete: (program: DraftProgram) => void;
}

export default function DraftActions({ program, onEdit, onPublish, onDelete }: Props) {
  return (
    <div className="flex items-center gap-2">
      <button
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-white/80 bg-white/[0.06] border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors"
        onClick={() => onEdit(program._id)}
        id={`edit-draft-${program._id}`}
      >
        <Pencil size={14} />{t('draftPrograms.editButton')}
      </button>
      <button
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-white/80 bg-white/[0.06] border border-white/10 hover:bg-blue-500/15 hover:border-blue-500/30 hover:text-blue-300 transition-colors"
        onClick={() => onPublish(program)}
        id={`publish-draft-${program._id}`}
      >
        <Send size={14} />{t('draftPrograms.publishButton')}
      </button>
      <button
        className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
        onClick={() => onDelete(program)}
        id={`delete-draft-${program._id}`}
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
