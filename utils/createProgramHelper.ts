import { PROGRAM_SAVED_STATUS, StayType } from "@/types";

interface FormData {
  programTitle: string;
  startDate: string;
  endDate: string;
  venue: string;
  stayTypes: StayType[];
  brochureFile: File | null;
  minParticipants: string;
  maxParticipants: string;
}

export const buildPayload = (
  form: FormData,
  status: PROGRAM_SAVED_STATUS
) => {
  const residential = form.stayTypes.find(
    (s) => s.id === "residential"
  );

  const nonResidential = form.stayTypes.find(
    (s) => s.id === "non-residential"
  );

  return {
    title: form.programTitle,
    startDate: form.startDate,
    endDate: form.endDate,
    venue: form.venue,

    singleOccupancyFee: residential?.options.find(
      (o) => o.id === "single-sharing"
    )?.price
      ? Number(
          residential.options.find(
            (o) => o.id === "single-sharing"
          )?.price
        )
      : undefined,

    twinSharingFee: residential?.options.find(
      (o) => o.id === "twin-sharing"
    )?.price
      ? Number(
          residential.options.find(
            (o) => o.id === "twin-sharing"
          )?.price
        )
      : undefined,

    nonResidentialFee: nonResidential?.options.find(
      (o) => o.id === "non-residential-fee"
    )?.price
      ? Number(
          nonResidential.options.find(
            (o) => o.id === "non-residential-fee"
          )?.price
        )
      : undefined,

    brochure: form.brochureFile,

    minParticipants: form.minParticipants
      ? Number(form.minParticipants)
      : undefined,

    maxParticipants: form.maxParticipants
      ? Number(form.maxParticipants)
      : undefined,

    status,
  };
};