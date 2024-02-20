import {
  ZSizeFixed,
  ZSizeVaried,
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
  createSizeChartVariedCss
} from '@zthun/fashion-tailor';
import { ZFashionPriority } from '@zthun/fashion-theme';
import { IZComponentAttributeChanged, IZComponentConnected, registerCustomElement } from '@zthun/helpful-dom';
import { WithFashion, WithFashionAttributes } from '../element/with-fashion.mjs';
import { WithHeight, WithHeightAttributes } from '../element/with-height.mjs';

export class ZBannerElement
  extends WithFashion(WithHeight<ZSizeFixed | ZSizeVaried.Fit>(HTMLElement))
  implements IZComponentConnected, IZComponentAttributeChanged
{
  public static readonly register = registerCustomElement.bind(null, 'z-banner', ZBannerElement);
  public static readonly observedAttributes = [...WithFashionAttributes, ...WithHeightAttributes];

  public static readonly HeightChart = Object.freeze({
    ...createSizeChartFixedCss(createSizeChartFixedArithmetic(1, 1), 'rem'),
    ...createSizeChartVariedCss()
  });

  private _root: HTMLDivElement;

  public constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this._root = document.createElement('div');
    this._root.style.boxSizing = 'border-box';
    this._root.style.display = 'block';
    this._root.style.left = 'auto';
    this._root.style.position = 'sticky';
    this._root.style.right = '0';
    this._root.style.top = '0';
    this._root.style.width = '100%';
    this._root.style.zIndex = '1100';
    this._root.appendChild(document.createElement('slot'));

    this.shadowRoot?.appendChild(this._root);
  }

  public connectedCallback() {
    this.classList.add('ZBanner-root');
    this.attributeChangedCallback();
  }

  public attributeChangedCallback(): void {
    this._root.style.background = this.color('main', ZFashionPriority.Primary);
    this._root.style.color = this.color('contrast', ZFashionPriority.Primary);
    this._root.style.height = ZBannerElement.HeightChart[this.heightXl(ZSizeVaried.Fit)];
  }
}
