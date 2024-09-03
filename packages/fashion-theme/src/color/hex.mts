import { ZColor, toRgb } from "./color.mjs";
import { rgb } from "./rgb.mjs";

/**
 * Constructs a css color from a number.
 *
 * You can use regular numbers or hex values using 0x
 *
 * @param v -
 *        The numeric color value.
 *
 * @returns
 *        The css color from the number.  This will
 *        use the rgb format.
 */
export function hex(v: number): ZColor {
  const [r, g, b] = toRgb(v);
  return rgb(r, g, b);
}
