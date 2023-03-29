import { ZColor } from './color';

/**
 * Constructs a color from the hue-saturation-light model.
 *
 * @param h -
 *        The total hue [0-360].
 * @param s -
 *        The color saturation [0-100].
 * @param l -
 *        The luminosity [0-100].
 * @param a -
 *        The alpha channel [0 - 1].  Defaults to 1 (no opacity).
 *
 * @returns
 *        A css value that can render the color.
 */
export function hsl(h: number, s: number, l: number, a = 1): ZColor {
  s = Math.min(100, Math.max(0, s));
  l = Math.min(100, Math.max(0, l));
  a = Math.min(1, Math.max(0, a));
  return `hsla(${h}, ${s}%, ${l}%, ${a})`;
}
