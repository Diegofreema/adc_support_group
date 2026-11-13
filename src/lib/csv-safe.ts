/**
 * Spreadsheet apps run a cell that starts with = + - @ (or a tab / carriage
 * return) as a formula. Exports carry names and text people typed themselves,
 * so such cells get a leading apostrophe, which shows the text as written.
 * Plain numbers (phones, amounts) are left alone.
 */
const FORMULA_START = /^[=+\-@\t\r]/
const PLAIN_NUMBER = /^[+-]?[\d\s.,]+$/

export function neutraliseFormula(text: string): string {
  return FORMULA_START.test(text) && !PLAIN_NUMBER.test(text) ? `'${text}` : text
}
