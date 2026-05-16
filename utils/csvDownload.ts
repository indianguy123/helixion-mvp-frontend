/**
 * Triggers a browser download of a CSV file from header + row strings.
 */
export const downloadSampleCsv = (header: string, sampleRow: string, filename = 'sample_programs.csv') => {
  const csvContent = `${header}\n${sampleRow}`;
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
