'use client';

import { useState } from 'react';
import { RegistrationRowProps } from '@/types/admin';
import { CheckCircle2, XCircle } from 'lucide-react';
import AppModal from '@/components/ui/app-modal'; // adjust path as needed
import { Role } from '@/types/role';
import { ROLES } from '@/constants/role';




function ApproveModalContent({
  name,
  email,
  role,
  onRoleChange,
}: {
  name: string;
  email: string;
  role: Role | '';
  onRoleChange: (r: Role) => void;
}) {
  return (
    <div className="flex flex-col gap-4 mt-1">
      {/* Email card */}
      <div className="rounded-xl bg-white/5 border border-white/8 px-4 py-3">
        <p className="text-sm font-medium text-white">{name}</p>
        <p className="text-xs text-white/40 mt-0.5">{email}</p>
      </div>

      {/* Role selector */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-white">Assign Role</label>
        <select
          aria-label='role'
          value={role}
          onChange={(e) => onRoleChange(e.target.value as Role)}
          className="w-full rounded-xl bg-transparent border border-blue-500/60 text-white text-sm px-4 py-2.5 outline-none cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23ffffff80%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center]"
        >
          <option value="" disabled hidden>
            Select role
          </option>

          {ROLES.map((r) => (
            <option key={r} value={r} className="bg-[#1a1b25] text-white">
              {r}
            </option>
          ))}
        </select>
        <p className="text-xs text-white/40">Select the appropriate role for this user.</p>
      </div>
    </div>
  );
}

export default function RegistrationRow({
  name,
  email,
  date,
  icon,
  iconBg,
}: RegistrationRowProps) {
  const [approveOpen, setApproveOpen] = useState(false);
  const [role, setRole] = useState<Role | ''>('');
  const [loading, setLoading] = useState(false);

  const handleConfirmApprove = async () => {
    setLoading(true);
    try {
      // TODO: call your approve API here, e.g.:
      // await approveUser({ email, role });
      await new Promise((res) => setTimeout(res, 1200)); // simulated delay
      setApproveOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between py-4 border-b border-borderCard last:border-b-0">
        <div className="flex items-center gap-4 flex-1">
          <div className={`w-10 h-10 rounded-lg ${ iconBg } flex items-center justify-center text-lg`}>
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
            onClick={() => setApproveOpen(true)}
          />
          <XCircle
            size={18}
            className="text-accentRed cursor-pointer hover:scale-110 transition-transform"
            aria-label="Deny"
          />
        </div>
      </div>

      <AppModal
        isOpen={approveOpen}
        type="confirm"
        title="Approve User"
        description={
          <ApproveModalContent
            name={name}
            email={email}
            role={role}
            onRoleChange={setRole}
          />
        }
        confirmLabel="Confirm & Approve"
        cancelLabel="Cancel"
        loading={loading}
        onConfirm={handleConfirmApprove}
        onCancel={() => setApproveOpen(false)}
      />
    </>
  );
}