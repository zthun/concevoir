import { ZFontFamily } from '../font/font-family.mjs';
import { IZFontDetect } from './font-detect.mjs';

/**
 * A font detect implementation that caches the font list as soon as it is accessed.
 */
export abstract class ZFontDetectCached implements IZFontDetect {
  private _fonts: Promise<ZFontFamily[]> | null;

  /**
   * Initializes a new instance of this object.
   *
   * @param _detect -
   *        The inner detect mechanism to cache the fonts from.
   */
  public constructor(private _detect: IZFontDetect) {}

  public detect(): Promise<ZFontFamily[]> {
    this._fonts = this._fonts || this._detect.detect();
    return this._fonts;
  }
}
