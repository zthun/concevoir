import { ZGapSize, ZSizeVoid } from '@zthun/fashion-tailor';
import { registerCustomElement } from '@zthun/helpful-dom';
import { IZQuadrilateral, firstDefined } from '@zthun/helpful-fn';
import { ZFashionElement } from '../element/fashion-element.mjs';
import { WithTailor } from '../element/with-tailor.mjs';

export class ZBoxPaddingElement extends WithTailor(ZFashionElement) {
  public static readonly register = registerCustomElement.bind(null, 'z-box-padding', ZBoxPaddingElement);

  public readonly name = 'ZBox-padding';

  private _padding: Partial<IZQuadrilateral<ZGapSize>> = {};

  public get padding() {
    return this._padding;
  }

  public set padding(val: Partial<IZQuadrilateral<ZGapSize>> | undefined) {
    this._padding = firstDefined({}, val);
    this.refreshCssVariables();
  }

  public generateStaticCss = () => ({
    display: 'block',
    paddingBottom: 'var(--box-padding-bottom)',
    paddingLeft: 'var(--box-padding-left)',
    paddingRight: 'var(--box-padding-right)',
    paddingTop: 'var(--box-padding-top)'
  });

  public refreshCssVariables = () => {
    const bottom = firstDefined(ZSizeVoid.None, this._padding.bottom);
    const left = firstDefined(ZSizeVoid.None, this._padding.left);
    const right = firstDefined(ZSizeVoid.None, this._padding.right);
    const top = firstDefined(ZSizeVoid.None, this._padding.top);

    this.style.setProperty('--box-padding-bottom', this.gap(bottom));
    this.style.setProperty('--box-padding-left', this.gap(left));
    this.style.setProperty('--box-padding-right', this.gap(right));
    this.style.setProperty('--box-padding-top', this.gap(top));
  };
}
