import {
  ZSizeFixed,
  ZSizeVaried,
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
  createSizeChartVariedCss
} from '@zthun/fashion-tailor';
import { ZFashionPriority } from '@zthun/fashion-theme';
import { registerCustomElement } from '@zthun/helpful-dom';
import { IZComponentAttributeChanged, IZComponentConnected } from '../element/component-lifecycle.mjs';
import { WithFashion } from '../element/with-fashion.mjs';
import { WithHeight } from '../element/with-height.mjs';

export class ZBannerElement
  extends WithFashion(WithHeight<ZSizeFixed | ZSizeVaried.Fit>(HTMLElement))
  implements IZComponentConnected, IZComponentAttributeChanged
{
  public static readonly register = registerCustomElement.bind(null, 'z-banner', ZBannerElement);

  public static readonly HeightChart = Object.freeze({
    ...createSizeChartFixedCss(createSizeChartFixedArithmetic(1, 1), 'rem'),
    ...createSizeChartVariedCss()
  });

  private _styled: HTMLDivElement;

  public constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this._styled = document.createElement('div');
    this._styled.style.boxSizing = 'border-box';
    this._styled.style.display = 'block';
    this._styled.style.left = 'auto';
    this._styled.style.position = 'sticky';
    this._styled.style.right = '0';
    this._styled.style.top = '0';
    this._styled.style.width = '100%';
    this._styled.style.zIndex = '1100';
    this._styled.appendChild(document.createElement('slot'));

    this.shadowRoot?.appendChild(this._styled);
  }

  public connectedCallback() {
    this.classList.add('ZBanner-root');
    this.attributeChangedCallback();
  }

  public attributeChangedCallback(): void {
    this._styled.style.background = this.color('main', ZFashionPriority.Primary);
    this._styled.style.color = this.color('contrast', ZFashionPriority.Primary);
    this._styled.style.height = ZBannerElement.HeightChart[this.heightXl(ZSizeVaried.Fit)];
  }
}
