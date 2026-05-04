import { RegistrationRowProps } from '@/types/admin';
import { CheckCircle2, XCircle } from 'lucide-react';

/**
 * Individual registration row with approve/deny actions
 */
export default function RegistrationRow({
  name,
  email,
  date,
  icon,
  iconBg
}: RegistrationRowProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-borderCard last:border-b-0">
      <div className="flex items-center gap-4 flex-1">
        <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center text-lg`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="text-white text-sm font-medium">{name}</div>
          <div className="text-textSidebarMuted text-xs mt-0.5">{email}</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-textSidebarMuted text-xs">{date}</div>
         <CheckCircle2
          size={18}
          className="text-accentGreen cursor-pointer hover:scale-110 transition-transform"
           aria-label="Approve"
        />
        <XCircle
          size={18}
          className="text-accentRed cursor-pointer hover:scale-110 transition-transform"
           aria-label="Deny"
        />
      </div>
    </div>
  );
}
