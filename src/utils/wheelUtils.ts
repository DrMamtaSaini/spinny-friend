
// Array of colors to be used for wheel segments - matching exactly the reference image colors
const SEGMENT_COLORS = [
  '#8B5CF6', // purple
  '#FFEB3B', // yellow
  '#9C27B0', // deep purple
  '#FF4081', // pink
  '#FF9800', // orange
  '#00BCD4', // cyan
  '#4CAF50', // green
  '#2196F3', // blue
  '#E91E63', // deep pink
  '#CDDC39', // lime
  '#9C27B0', // deep purple
  '#03A9F4', // light blue
  '#8BC34A', // light green
  '#FFC107', // amber
  '#FF5722', // deep orange
];

/**
 * Returns a color for a wheel segment based on its index
 * @param index The index of the segment
 * @returns A color string
 */
export const getSegmentColor = (index: number): string => {
  return SEGMENT_COLORS[index % SEGMENT_COLORS.length];
};

/**
 * Generates an array of numbers in a specified range
 * @param start The starting number (inclusive)
 * @param end The ending number (inclusive)
 * @returns Array of numbers in the range
 */
export const generateNumberRange = (start: number, end: number): string[] => {
  // Ensure we don't exceed the limit of 100 entries
  start = Math.max(0, Math.min(99, start));
  end = Math.max(0, Math.min(99, end));
  
  if (end < start) {
    [start, end] = [end, start]; // Swap if end is less than start
  }
  
  // Limit to 100 entries
  if (end - start + 1 > 100) {
    end = start + 99; // Limit to 100 entries
  }
  
  const range: string[] = [];
  for (let i = start; i <= end; i++) {
    range.push(i.toString());
  }
  return range;
};

/**
 * Checks if an entry is valid (not empty after trimming)
 * @param entry The entry to validate
 * @returns True if the entry is valid, false otherwise
 */
export const isValidEntry = (entry: string): boolean => {
  return entry.trim() !== '';
};

/**
 * Gets the default roulette numbers (0-36)
 * @returns Array of numbers from 0 to 36 as strings
 */
export const getDefaultRouletteNumbers = (): string[] => {
  return generateNumberRange(0, 36);
};

/**
 * Parses entries from a text input
 * @param text Text containing entries separated by newlines
 * @returns Array of valid entries
 */
export const parseEntriesFromText = (text: string): string[] => {
  const entries = text
    .split('\n')
    .map(entry => entry.trim())
    .filter(isValidEntry);
  
  // Limit to 100 entries
  return entries.slice(0, 100);
};

/**
 * Validates the number of entries to ensure it doesn't exceed the limit
 * @param entries Array of entries to validate
 * @returns Array limited to 100 entries
 */
export const validateEntriesLimit = (entries: string[]): string[] => {
  return entries.slice(0, 100);
};
