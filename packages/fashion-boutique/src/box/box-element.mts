import {
  ZFashionDevice,
  ZSize,
  ZSizeFixed,
  ZSizeVaried,
  createSizeChartFixedCss,
  createSizeChartFixedGeometric,
  createSizeChartVariedCss,
  createSizeChartVoidCss
} from '@zthun/fashion-tailor';
import { ZFashionIntrinsic } from '@zthun/fashion-theme';
import { registerCustomElement } from '@zthun/helpful-dom';
import { ZCssSerialize } from '../css/css-serialize.mjs';
import { IZComponentAttributeChanged, IZComponentConnected } from '../element/component-lifecycle.mjs';
import { WithBorder, WithBorderAttributes } from '../element/with-border.mjs';
import { WithFashion, WithFashionAttributes } from '../element/with-fashion.mjs';
import { WithMargin, WithMarginAttributes } from '../element/with-margin.mjs';
import { WithPadding, WithPaddingAttributes } from '../element/with-padding.mjs';
import { WithTailor } from '../element/with-tailor.mjs';
import { WithWidth, WithWidthAttributes } from '../element/with-width.mjs';

export class ZBoxElement
  extends WithBorder(WithMargin(WithPadding(WithTailor(WithFashion(WithWidth<ZSize>(HTMLElement))))))
  implements IZComponentConnected, IZComponentAttributeChanged
{
  public static readonly register = registerCustomElement.bind(null, 'z-box', ZBoxElement);
  public static readonly device = new ZFashionDevice();
  public static readonly observedAttributes = [
    'tabIndex',
    ...WithMarginAttributes,
    ...WithPaddingAttributes,
    ...WithBorderAttributes,
    ...WithWidthAttributes,
    ...WithFashionAttributes
  ];

  public static readonly BoxSizeChart = Object.freeze({
    ...createSizeChartFixedCss(createSizeChartFixedGeometric(1.4, 18), 'rem'),
    ...createSizeChartVariedCss(),
    ...createSizeChartVoidCss()
  });

  private _root: HTMLDivElement;

  public constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    const css = new ZCssSerialize().serialize({
      'display': 'block',
      'backgroundColor': 'var(--box-background)',
      'color': 'var(--box-color)',
      'cursor': 'var(--box-cursor)',

      'border': 'var(--box-border-color)',
      'borderBottomStyle': 'var(--box-border-style-bottom)',
      'borderLeftStyle': 'var(--box-border-style-left)',
      'borderRightStyle': 'var(--box-border-style-right)',
      'borderTopStyle': 'var(--box-border-style-top)',
      'borderBottomWidth': 'var(--box-border-width-bottom)',
      'borderLeftWidth': 'var(--box-border-width-left)',
      'borderRightWidth': 'var(--box-border-width-left)',
      'borderTopWidth': 'var(--box-border-width-top)',

      'paddingBottom': 'var(--box-padding-bottom)',
      'paddingLeft': 'var(--box-padding-left)',
      'paddingRight': 'var(--box-padding-right)',
      'paddingTop': 'var(--box-padding-top)',

      'marginBottom': 'var(--box-margin-bottom)',
      'marginLeft': 'var(--box-margin-left)',
      'marginRight': 'var(--box-margin-right)',
      'marginTop': 'var(--box-margin-top)',

      'maxWidth': 'var(--box-width-xl)',

      [ZBoxElement.device.break(ZSizeFixed.Large)]: {
        maxWidth: 'var(--box-width-lg)'
      },

      [ZBoxElement.device.break(ZSizeFixed.Medium)]: {
        maxWidth: 'var(--box-width-md)'
      },

      [ZBoxElement.device.break(ZSizeFixed.Small)]: {
        maxWidth: 'var(--box-width-sm)'
      },

      [ZBoxElement.device.break(ZSizeFixed.ExtraSmall)]: {
        maxWidth: 'var(--box-width-xs)'
      },

      '&:focus': {
        backgroundColor: 'var(--box-focus-background)',
        borderColor: 'var(--box-focus-border-color)',
        color: 'var(--box-focus-color)'
      },

      '&:hover': {
        backgroundColor: 'var(--box-hover-background)',
        borderColor: 'var(--box-hover-border-color)',
        color: 'var(--box-hover-color)'
      }
    });

    const style = document.createElement('style');
    style.textContent = `.ZBox-container { ${css} }`;
    this.shadowRoot?.appendChild(style);

    this._root = document.createElement('div');
    this._root.appendChild(document.createElement('slot'));
    this._root.classList.add('ZBox-container');
    this.shadowRoot?.appendChild(this._root);
  }

  public connectedCallback() {
    this.classList.add('ZBox-root');
    this.attributeChangedCallback();
  }

  public attributeChangedCallback(): void {
    const fallback = ZFashionIntrinsic.Inherit;
    const { style } = this._root;

    style.setProperty('--box-cursor', 'default');

    const main = this.color('main', fallback);
    style.setProperty('--box-background', main);
    style.setProperty('--box-focus-background', main);
    style.setProperty('--box-hover-background', main);

    const contrast = this.color('contrast', fallback);
    style.setProperty('--box-color', contrast);
    style.setProperty('--box-focus-color', contrast);
    style.setProperty('--box-hover-color', contrast);

    const border = this.color(['border', 'main'], fallback);
    style.setProperty('--box-border-color', border);
    style.setProperty('--box-focus-border-color', border);
    style.setProperty('--box-hover-border-color', border);

    style.setProperty('--box-border-style-bottom', this.trimBottom());
    style.setProperty('--box-border-style-left', this.trimLeft());
    style.setProperty('--box-border-style-right', this.trimRight());
    style.setProperty('--box-border-style-top', this.trimTop());

    style.setProperty('--box-border-width-bottom', this.thickness(this.borderBottom()));
    style.setProperty('--box-border-width-left', this.thickness(this.borderLeft()));
    style.setProperty('--box-border-width-right', this.thickness(this.borderRight()));
    style.setProperty('--box-border-width-top', this.thickness(this.borderTop()));

    style.setProperty('--box-margin-bottom', this.gap(this.marginBottom()));
    style.setProperty('--box-margin-left', this.gap(this.marginLeft()));
    style.setProperty('--box-margin-right', this.gap(this.marginRight()));
    style.setProperty('--box-margin-top', this.gap(this.marginTop()));

    style.setProperty('--box-padding-bottom', this.gap(this.paddingBottom()));
    style.setProperty('--box-padding-left', this.gap(this.paddingLeft()));
    style.setProperty('--box-padding-right', this.gap(this.paddingRight()));
    style.setProperty('--box-padding-top', this.gap(this.paddingTop()));

    style.setProperty('--box-width-xl', ZBoxElement.BoxSizeChart[this.widthXl(ZSizeVaried.Fit)]);
    style.setProperty('--box-width-lg', ZBoxElement.BoxSizeChart[this.widthLg(ZSizeVaried.Fit)]);
    style.setProperty('--box-width-md', ZBoxElement.BoxSizeChart[this.widthMd(ZSizeVaried.Fit)]);
    style.setProperty('--box-width-sm', ZBoxElement.BoxSizeChart[this.widthSm(ZSizeVaried.Fit)]);
    style.setProperty('--box-width-xs', ZBoxElement.BoxSizeChart[this.widthXs(ZSizeVaried.Fit)]);

    if (this.tabIndex >= 0) {
      style.setProperty('--box-cursor', 'pointer');

      style.setProperty('--box-focus-background', this.color(['focus.main', 'main'], fallback));
      style.setProperty('--box-focus-border-color', this.color(['focus.border', 'border', 'main'], fallback));
      style.setProperty('--box-focus-color', this.color(['focus.contrast', 'contrast'], fallback));

      style.setProperty('--box-hover-background', this.color(['hover.main', 'main'], fallback));
      style.setProperty('--box-hover-border-color', this.color(['hover.border', 'border', 'main'], fallback));
      style.setProperty('--box-hover-color', this.color(['hover.contrast', 'contrast'], fallback));
    }
  }
}
