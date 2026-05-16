/**
 * Parses a basic CSV text into an array of objects.
 * Uses the first row as headers.
 * 
 * @param text The raw CSV text
 * @param maxRows Maximum number of data rows to parse
 * @returns Array of parsed objects
 */
export function parseCsvPreview(text: string, maxRows: number = 5): any[] {
  const lines = text.split('\n').filter(line => line.trim() !== '');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1, maxRows + 1).map(line => {
    const values = line.split(',');
    const obj: any = {};
    headers.forEach((header, index) => {
      obj[header] = values[index]?.trim() || '';
    });
    return obj;
  });
}
