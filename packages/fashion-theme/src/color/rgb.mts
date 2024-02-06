import { ZColor } from './color.mjs';

/**
 * Constructs a color from a red-green-blue model.
 *
 * @param r -
 *        The total amount of red to add [0-255].
 * @param g -
 *        The total amount of green to add [0-255].
 * @param b -
 *        The total amount of blue to add [0-255].
 * @param a -
 *        The alpha channel [0 - 1].  Defaults to 1 (no opacity).
 *
 * @returns
 *        A css value that can render the color.
 *
 */
export function rgb(r: number, g: number, b: number, a = 1): ZColor {
  r = Math.floor(Math.min(255, Math.max(0, r)));
  g = Math.floor(Math.min(255, Math.max(0, g)));
  b = Math.floor(Math.min(255, Math.max(0, b)));
  a = Math.min(1, Math.max(0, a));
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/**
 * Transparent color.
 *
 * @returns
 *        The output from rgb(0, 0, 0, 0);
 */
export const transparent = rgb.bind(null, 0, 0, 0, 0);

/**
 * Black.
 *
 * @returns
 *        The output from rgb(0, 0, 0, 1);
 */
export const black = rgb.bind(null, 0, 0, 0, 1);

/**
 * White.
 *
 * @returns
 *        The output from rgb(255, 255, 255, 1);
 */
export const white = rgb.bind(null, 255, 255, 255, 1);
