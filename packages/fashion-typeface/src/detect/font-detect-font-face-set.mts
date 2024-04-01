import { trim, uniq } from 'lodash-es';
import { ZFontFamily } from '../font/font-family.mjs';
import { IZFontDetect } from './font-detect.mjs';

/**
 * A font detector that pulls from a font face set.
 *
 * This is only supported in a browser and is not supported in node.  If you are
 * trying to load fonts in node, you can use a static font detect object.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/fonts
 */
export class ZFontDetectFontFaceSet implements IZFontDetect {
  /**
   * Initializes a new instance of this object.
   *
   * @param _fontFaceSet -
   *        The list of document fonts to check against.
   */
  public constructor(private _fontFaceSet: FontFaceSet) {}

  public async detect(): Promise<ZFontFamily[]> {
    const whiteList = Object.values(ZFontFamily);
    const fonts = await this._fontFaceSet.ready;

    const loadedFonts = [...fonts].map((f) => trim(f.family, '"') as ZFontFamily).filter((f) => whiteList.includes(f));
    const loadableFonts = whiteList.filter((family) => fonts.check(`1rem "${family}"`));
    const allFonts = uniq([...loadedFonts, ...loadableFonts]);
    allFonts.sort();

    return allFonts;
  }
}
