import {
  ZDeviceBounds,
  ZDeviceValue,
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
import {
  IZComponentAttributeChanged,
  IZComponentConnected,
  IZComponentPropertyChanged,
  ZProperty,
  registerCustomElement
} from '@zthun/helpful-dom';
import { IZComponentWidth } from 'src/component/component-width.mjs';
import { ZCssSerialize } from '../css/css-serialize.mjs';
import { WithBorder, WithBorderAttributes } from '../element/with-border.mjs';
import { WithFashion, WithFashionAttributes } from '../element/with-fashion.mjs';
import { WithMargin, WithMarginAttributes } from '../element/with-margin.mjs';
import { WithPadding, WithPaddingAttributes } from '../element/with-padding.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';

export class ZBoxElement
  extends WithBorder(WithMargin(WithPadding(WithFashion(HTMLElement))))
  implements IZComponentConnected, IZComponentAttributeChanged, IZComponentPropertyChanged, IZComponentWidth<ZSize>
{
  public static readonly register = registerCustomElement.bind(null, 'z-box', ZBoxElement);
  public static readonly observedAttributes = [
    'tabIndex',
    ...WithBorderAttributes,
    ...WithMarginAttributes,
    ...WithPaddingAttributes,
    ...WithFashionAttributes
  ];

  public static readonly BoxSizeChart = Object.freeze({
    ...createSizeChartFixedCss(createSizeChartFixedGeometric(1.4, 18), 'rem'),
    ...createSizeChartVariedCss(),
    ...createSizeChartVoidCss()
  });

  private _style: HTMLStyleElement;

  @ZProperty<ZDeviceValue<ZSize>>({ initial: ZSizeVaried.Fit })
  public width?: ZDeviceValue<ZSize>;

  public constructor() {
    super();

    const device = new ZFashionDevice();

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

      [device.break(ZSizeFixed.Large)]: {
        maxWidth: 'var(--box-width-lg)'
      },

      [device.break(ZSizeFixed.Medium)]: {
        maxWidth: 'var(--box-width-md)'
      },

      [device.break(ZSizeFixed.Small)]: {
        maxWidth: 'var(--box-width-sm)'
      },

      [device.break(ZSizeFixed.ExtraSmall)]: {
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

    this._style = document.createElement('style');
    this._style.textContent = `:host { ${css} }`;

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(this._style);
    shadow.appendChild(document.createElement('slot'));
  }

  public connectedCallback() {
    this.classList.add('ZBox-root');
    this.propertyChangedCallback();
  }

  public attributeChangedCallback(): void {
    this.propertyChangedCallback();
  }

  public propertyChangedCallback(): void {
    const fallback = ZFashionIntrinsic.Inherit;
    const { style } = this;

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

    style.setProperty('--box-border-width-bottom', ZFashionTailorElement.thicknessVar(this.borderBottom()));
    style.setProperty('--box-border-width-left', ZFashionTailorElement.thicknessVar(this.borderLeft()));
    style.setProperty('--box-border-width-right', ZFashionTailorElement.thicknessVar(this.borderRight()));
    style.setProperty('--box-border-width-top', ZFashionTailorElement.thicknessVar(this.borderTop()));

    style.setProperty('--box-margin-bottom', ZFashionTailorElement.gapVar(this.marginBottom()));
    style.setProperty('--box-margin-left', ZFashionTailorElement.gapVar(this.marginLeft()));
    style.setProperty('--box-margin-right', ZFashionTailorElement.gapVar(this.marginRight()));
    style.setProperty('--box-margin-top', ZFashionTailorElement.gapVar(this.marginTop()));

    style.setProperty('--box-padding-bottom', ZFashionTailorElement.gapVar(this.paddingBottom()));
    style.setProperty('--box-padding-left', ZFashionTailorElement.gapVar(this.paddingLeft()));
    style.setProperty('--box-padding-right', ZFashionTailorElement.gapVar(this.paddingRight()));
    style.setProperty('--box-padding-top', ZFashionTailorElement.gapVar(this.paddingTop()));

    const widthBounds = new ZDeviceBounds(this.width, ZSizeVaried.Fit);
    style.setProperty('--box-width-xl', ZBoxElement.BoxSizeChart[widthBounds.xl()]);
    style.setProperty('--box-width-lg', ZBoxElement.BoxSizeChart[widthBounds.lg()]);
    style.setProperty('--box-width-md', ZBoxElement.BoxSizeChart[widthBounds.md()]);
    style.setProperty('--box-width-sm', ZBoxElement.BoxSizeChart[widthBounds.sm()]);
    style.setProperty('--box-width-xs', ZBoxElement.BoxSizeChart[widthBounds.xs()]);

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
