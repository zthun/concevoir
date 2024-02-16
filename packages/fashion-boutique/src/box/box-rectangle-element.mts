import { ZGapSize, ZSizeVoid } from '@zthun/fashion-tailor';
import { firstDefined } from '@zthun/helpful-fn';

export abstract class ZBoxRectangleElement extends HTMLElement {
  private _spacing(attr: 'bottom' | 'left' | 'right' | 'top') {
    return firstDefined<ZGapSize>(ZSizeVoid.None, this.getAttribute(attr) as ZGapSize);
  }

  public left = this._spacing.bind(this, 'left');
  public right = this._spacing.bind(this, 'right');
  public top = this._spacing.bind(this, 'top');
  public bottom = this._spacing.bind(this, 'bottom');
}
