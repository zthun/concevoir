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
import { firstDefined } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import { ZFashionElement } from '../element/fashion-element.mjs';
import { WithFashion, WithFashionObservedAttributes } from '../element/with-fashion.mjs';
import { WithWidth } from '../element/with-width.mjs';
import { CSSInterpolation } from '../theme/css.mjs';

export class ZBoxElement extends WithFashion(WithWidth<ZSize>(ZFashionElement)) {
  public static readonly register = registerCustomElement.bind(null, 'z-box', ZBoxElement);
  public static readonly observeAttributes = Object.freeze(['justification', ...WithFashionObservedAttributes]);
  public static readonly device = new ZFashionDevice();

  public static readonly BoxSizeChart = Object.freeze({
    ...createSizeChartFixedCss(createSizeChartFixedGeometric(1.4, 18), 'rem'),
    ...createSizeChartVariedCss(),
    ...createSizeChartVoidCss()
  });

  public readonly name = 'ZBox-root';

  public justification(): Property.TextAlign {
    return firstDefined('left', this.getAttribute('justification') as Property.TextAlign);
  }

  public generateStaticCss = () => {
    return {
      'display': 'block',
      'backgroundColor': 'var(--box-background)',
      'color': 'var(--box-color)',
      'cursor': 'var(--box-cursor)',
      'textAlign': `var(--box-justification)`,

      'borderColor': 'var(--box-border-color)',

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
    } as unknown as CSSInterpolation;
  };

  refreshCssVariables = () => {
    const fallback = ZFashionIntrinsic.Inherit;
    this.style.setProperty('--box-cursor', 'default');
    this.style.setProperty('--box-justification', this.justification());

    const main = this.color('main', fallback);
    this.style.setProperty('--box-background', main);
    this.style.setProperty('--box-focus-background', main);
    this.style.setProperty('--box-hover-background', main);

    const contrast = this.color('contrast', fallback);
    this.style.setProperty('--box-color', contrast);
    this.style.setProperty('--box-focus-color', contrast);
    this.style.setProperty('--box-hover-color', contrast);

    const border = this.color(['border', 'main'], fallback);
    this.style.setProperty('--box-border-color', border);
    this.style.setProperty('--box-focus-border-color', border);
    this.style.setProperty('--box-hover-border-color', border);

    this.style.setProperty('--box-width-xl', ZBoxElement.BoxSizeChart[this.widthXl(ZSizeVaried.Fit)]);
    this.style.setProperty('--box-width-lg', ZBoxElement.BoxSizeChart[this.widthLg(ZSizeVaried.Fit)]);
    this.style.setProperty('--box-width-md', ZBoxElement.BoxSizeChart[this.widthMd(ZSizeVaried.Fit)]);
    this.style.setProperty('--box-width-sm', ZBoxElement.BoxSizeChart[this.widthSm(ZSizeVaried.Fit)]);
    this.style.setProperty('--box-width-xs', ZBoxElement.BoxSizeChart[this.widthXs(ZSizeVaried.Fit)]);

    if (this.tabIndex >= 0) {
      this.style.setProperty('--box-cursor', 'pointer');

      this.style.setProperty('--box-focus-background', this.color(['focus.main', 'main'], fallback));
      this.style.setProperty('--box-focus-border-color', this.color(['focus.border', 'border', 'main'], fallback));
      this.style.setProperty('--box-focus-color', this.color(['focus.contrast', 'contrast'], fallback));

      this.style.setProperty('--box-hover-background', this.color(['hover.main', 'main'], fallback));
      this.style.setProperty('--box-hover-border-color', this.color(['hover.border', 'border', 'main'], fallback));
      this.style.setProperty('--box-hover-color', this.color(['hover.contrast', 'contrast'], fallback));
    }
  };
}
