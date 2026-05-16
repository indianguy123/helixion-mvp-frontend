export const EXPECTED_COLUMNS = [
  'title', 'startDate', 'endDate', 'venue', 'isResidential', 'stayType',
  'singleOccupancyFee', 'twinSharingFee', 'nonResidentialFee',
  'brochureUrl', 'minParticipants', 'maxParticipants', 'status',
];

export const SAMPLE_CSV_HEADER = EXPECTED_COLUMNS.join(',');
export const SAMPLE_CSV_ROW = 'Leadership Workshop,2026-06-01,2026-06-03,Mumbai,true,single,15000,12000,8000,,10,50,draft';
