import { ZFontFamily } from '../font/font-family.mjs';
import { IZFontDetect } from './font-detect.mjs';

/**
 * A static font check which just compares against a static list of font families.
 */
export class ZFontDetectStatic implements IZFontDetect {
  /**
   * Initializes a new instance of this object.
   *
   * @param fonts -
   *        The white list of font families to allow on a check.
   */
  public constructor(private _fonts: Iterable<ZFontFamily>) {}

  public detect(): Promise<ZFontFamily[]> {
    const fonts = [...this._fonts];
    fonts.sort();
    return Promise.resolve(fonts);
  }
}
