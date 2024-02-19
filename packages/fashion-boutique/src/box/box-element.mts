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
import { CSSInterpolation } from 'src/theme/css.mjs';
import { ZFashionElement } from '../element/fashion-element.mjs';
import { WithBorder } from '../element/with-border.mjs';
import { WithFashion } from '../element/with-fashion.mjs';
import { WithMargin } from '../element/with-margin.mjs';
import { WithPadding } from '../element/with-padding.mjs';
import { WithTailor } from '../element/with-tailor.mjs';
import { WithWidth } from '../element/with-width.mjs';

export class ZBoxElement extends WithBorder(
  WithMargin(WithPadding(WithTailor(WithFashion(WithWidth<ZSize>(ZFashionElement)))))
) {
  public static readonly register = registerCustomElement.bind(null, 'z-box', ZBoxElement);
  public static readonly device = new ZFashionDevice();

  public static readonly BoxSizeChart = Object.freeze({
    ...createSizeChartFixedCss(createSizeChartFixedGeometric(1.4, 18), 'rem'),
    ...createSizeChartVariedCss(),
    ...createSizeChartVoidCss()
  });

  public readonly name = 'ZBox-root';

  public generateStaticCss = () => {
    return {
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
    } as unknown as CSSInterpolation;
  };

  refreshCssVariables = () => {
    const fallback = ZFashionIntrinsic.Inherit;
    this.style.setProperty('--box-cursor', 'default');

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

    this.style.setProperty('--box-border-style-bottom', this.trimBottom());
    this.style.setProperty('--box-border-style-left', this.trimLeft());
    this.style.setProperty('--box-border-style-right', this.trimRight());
    this.style.setProperty('--box-border-style-top', this.trimTop());

    this.style.setProperty('--box-border-width-bottom', this.thickness(this.borderBottom()));
    this.style.setProperty('--box-border-width-left', this.thickness(this.borderLeft()));
    this.style.setProperty('--box-border-width-right', this.thickness(this.borderRight()));
    this.style.setProperty('--box-border-width-top', this.thickness(this.borderTop()));

    this.style.setProperty('--box-margin-bottom', this.gap(this.marginBottom()));
    this.style.setProperty('--box-margin-left', this.gap(this.marginLeft()));
    this.style.setProperty('--box-margin-right', this.gap(this.marginRight()));
    this.style.setProperty('--box-margin-top', this.gap(this.marginTop()));

    this.style.setProperty('--box-padding-bottom', this.gap(this.paddingBottom()));
    this.style.setProperty('--box-padding-left', this.gap(this.paddingLeft()));
    this.style.setProperty('--box-padding-right', this.gap(this.paddingRight()));
    this.style.setProperty('--box-padding-top', this.gap(this.paddingTop()));

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
