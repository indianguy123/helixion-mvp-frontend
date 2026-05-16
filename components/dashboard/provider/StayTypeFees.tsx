import InputField from '@/components/ui/input';
import { t } from '@/lib/i18n';

interface Props {
  isResidential: boolean;
  setIsResidential: (v: boolean) => void;
  singleOccupancyFee: string;
  setSingleOccupancyFee: (v: string) => void;
  twinSharingFee: string;
  setTwinSharingFee: (v: string) => void;
  isNonResidential: boolean;
  setIsNonResidential: (v: boolean) => void;
  nonResidentialFee: string;
  setNonResidentialFee: (v: string) => void;
}

export default function StayTypeFees({
  isResidential, setIsResidential,
  singleOccupancyFee, setSingleOccupancyFee,
  twinSharingFee, setTwinSharingFee,
  isNonResidential, setIsNonResidential,
  nonResidentialFee, setNonResidentialFee,
}: Props) {
  return (
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
  );
}
