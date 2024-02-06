import { DataType } from 'csstype';

/**
 * Represents a supported color in CSS.
 */
export type ZColor = DataType.Color;

/**
 * Converts r, g, and b to a single numeric value.
 *
 * @param r -
 *        Red.
 * @param g -
 *        Green.
 * @param b -
 *        Blue
 *
 * @returns
 *        The rgb color represented as a number.
 */
export function fromRgb(r: number, g: number, b: number) {
  return b | (g << 8) | (r << 16);
}

/**
 * Converts a number to it's rgb counterparts.
 *
 * @param color -
 *        The color to convert.
 *
 * @returns
 *        A triplet where v[0] is red, v[1] is green, and
 *        v[2] is blue.
 */
export function toRgb(color: number): [number, number, number] {
  const r = (color & 0xff0000) >> 16;
  const g = (color & 0x00ff00) >> 8;
  const b = color & 0x0000ff;

  return [r, g, b];
}

/**
 * Adds or removes brightness from a color.
 *
 * @param color -
 *        The color to brighten or darken.
 * @param amount -
 *        The amount to shift the color.  Positive
 *        to brighten the color, negative to darken it.
 *
 * @returns
 *        The shifted color.
 */
export function brighten(color: number, amount: number) {
  let r = (color >> 16) + amount;
  r = Math.min(r, 255);
  r = Math.max(r, 0);

  let g = ((color >> 8) & 0x00ff) + amount;
  g = Math.min(g, 255);
  g = Math.max(g, 0);

  let b = (color & 0x0000ff) + amount;
  b = Math.min(b, 255);
  b = Math.max(b, 0);

  return fromRgb(r, g, b);
}

/**
 * Calculates the luminance of a given rgb spectrum.
 *
 * @param c -
 *        The color to calculate the luminance for.
 *
 * @returns
 *        The brightness of the color.
 */
export function luminance(c: number) {
  const RED = 0.2126;
  const GREEN = 0.7152;
  const BLUE = 0.0722;

  const GAMMA = 2.4;

  const [r, g, b] = toRgb(c);

  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, GAMMA);
  });

  return a[0] * RED + a[1] * GREEN + a[2] * BLUE;
}

/**
 * Calculates the contrast ratio between two colors.
 *
 * @param c1 -
 *        First color to compare.
 * @param c2 -
 *        Second color to compare.
 *
 * @returns
 *        The contrast ratio between c1 and c2.
 */
export function contrast(c1: number, c2: number) {
  const l1 = luminance(c1);
  const l2 = luminance(c2);
  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);
  return (brightest + 0.05) / (darkest + 0.05);
}
