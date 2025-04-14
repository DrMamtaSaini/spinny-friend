
// Array of colors to be used for wheel segments
const SEGMENT_COLORS = [
  '#ea384c', // red
  '#000000e6', // black
  '#66bb6a', // green
  '#1EAEDB', // blue
  '#8B5CF6', // purple
  '#F97316', // orange
  '#D946EF', // pink
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
  return text
    .split('\n')
    .map(entry => entry.trim())
    .filter(isValidEntry);
};
