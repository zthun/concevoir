import { ZFontFamily } from '../font/font-family.mjs';

/**
 * Represents an object that can be used to detect if a font is available.
 */
export interface IZFontDetect {
  /**
   * Detects which fonts are available.
   *
   * @returns
   *        A list of fonts currently available to the
   *        current browser.
   */
  detect(): Promise<ZFontFamily[]>;
}
