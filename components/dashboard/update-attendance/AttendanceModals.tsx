import React from "react";
import AppModal from "@/components/ui/app-modal";

interface AttendanceModalsProps {
  confirmModalOpen: boolean;
  successModalOpen: boolean;
  saving: boolean;
  error: string | null;
  programTitle: string;
  participantCount: number;
  onConfirmSave: () => void;
  onCancelConfirm: () => void;
  onDoneSuccess: () => void;
  t: any;
}

export function AttendanceModals({
  confirmModalOpen,
  successModalOpen,
  saving,
  error,
  programTitle,
  participantCount,
  onConfirmSave,
  onCancelConfirm,
  onDoneSuccess,
  t,
}: AttendanceModalsProps) {
  return (
    <>
      <AppModal
        isOpen={confirmModalOpen}
        type="confirm"
        title={t.confirmModalTitle}
        description={t.confirmModalDesc
          .replace("{program}", programTitle)
          .replace("{count}", participantCount.toString())}
        confirmLabel={t.confirmAgree}
        cancelLabel={t.confirmDisagree}
        onConfirm={onConfirmSave}
        onCancel={onCancelConfirm}
        loading={saving}
        error={error}
      />

      <AppModal
        isOpen={successModalOpen}
        type="success"
        title={t.successModalTitle}
        description={t.successModalDesc.replace("{program}", programTitle)}
        doneLabel={t.successOkay}
        onDone={onDoneSuccess}
      />
    </>
  );
}
