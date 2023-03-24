import { ZColor } from './color';
import { rgb } from './rgb';

/**
 * Constructs a css color from a hex number.
 */
export function hex(v: number): ZColor {
  const r = (v & 0xff0000) >> 16;
  const g = (v & 0x00ff00) >> 8;
  const b = v & 0x0000ff;

  return rgb(r, g, b);
}
