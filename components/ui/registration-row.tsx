'use client';

import { CheckCircle2, XCircle } from 'lucide-react';
import AppModal from '@/components/ui/app-modal';
import { Role } from '@/types/role';
import { ROLES } from '@/constants/role';
import { useApproveUser } from '@/hooks/useApproveUser';
import { AppAlert } from '../shared/app-alert';
import { t } from '@/lib/i18n';

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

      <div className="rounded-xl bg-white/5 border border-white/8 px-4 py-3">
        <p className="text-sm font-medium text-white">{name}</p>
        <p className="text-xs text-white/40 mt-0.5">{email}</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-white">
          {t('admin.approveUser.assignRole')}
        </label>

        <select
          aria-label='role'
          value={role}
          onChange={(e) => onRoleChange(e.target.value as Role)}
          className="w-full rounded-xl bg-transparent border border-blue-500/60 text-white text-sm px-4 py-2.5 outline-none cursor-pointer appearance-none"
        >
          <option value="" disabled hidden>
            {t('admin.approveUser.selectRole')}
          </option>

          {ROLES.map((r) => (
            <option key={r} value={r} className="bg-[#1a1b25] text-white">
              {r}
            </option>
          ))}
        </select>

        <p className="text-xs text-white/40">
          {t('admin.approveUser.roleHelp')}
        </p>
      </div>
    </div>
  );
}

export default function RegistrationRow({
  Id,
  name,
  email,
  date,
  icon,
  iconBg,
  refetch,
}: any) {

  const {
    isOpen,
    successOpen,
    role,
    loading,
    error,
    setRole,
    openModal,
    closeModal,
    approveUser,
    closeSuccess,
  } = useApproveUser({
    userId: Id,
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <>
      {/* ROW */}
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
            onClick={openModal}
          />

          <XCircle
            size={18}
            className="text-accentRed cursor-pointer hover:scale-110 transition-transform"
          />
        </div>
      </div>

      {/* CONFIRM MODAL */}
      <AppModal
        isOpen={isOpen}
        type="confirm"
        title={t('admin.approveUser.title')}
        description={
          <>
            <ApproveModalContent
              name={name}
              email={email}
              role={role}
              onRoleChange={setRole}
            />

            {error && (
              <div className="mt-3">
                <AppAlert variant="destructive" description={error} />
              </div>
            )}
          </>
        }
        confirmLabel={t('button.confirm')}
        cancelLabel={t('button.cancel')}
        loading={loading}
        onConfirm={approveUser}
        onCancel={closeModal}
      />

      {/* SUCCESS MODAL */}
      <AppModal
        isOpen={successOpen}
        type="success"
        title={t('admin.approveUser.successTitle')}
        description={t('admin.approveUser.successDescription')}
        doneLabel={t('button.done')}
        stats={[
          {
            label: t('admin.approveUser.roleAssigned'),
            variant: 'green',
          },
          {
            label: role,
            variant: 'blue',
          },
        ]}
        onDone={closeSuccess}
      />
    </>
  );
}