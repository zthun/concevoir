import {
  ZDeviceBounds,
  ZDeviceValue,
  ZFashionDevice,
  ZGapSize,
  ZSize,
  ZSizeFixed,
  ZSizeVaried,
  ZSizeVoid,
  ZThicknessSize,
  createSizeChartFixedCss,
  createSizeChartFixedGeometric,
  createSizeChartVariedCss,
  createSizeChartVoidCss
} from '@zthun/fashion-tailor';
import { IZFashion, ZFashionIntrinsic } from '@zthun/fashion-theme';
import {
  IZComponentAttributeChanged,
  IZComponentConnected,
  IZComponentPropertyChanged,
  ZProperty,
  registerCustomElement
} from '@zthun/helpful-dom';
import { IZQuadrilateral, firstDefined } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import { ZFashionDetail } from '../component/component-fashion.mjs';
import { IZComponentWidth } from '../component/component-width.mjs';
import { ZCssSerialize } from '../css/css-serialize.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';

export class ZBoxElement
  extends HTMLElement
  implements IZComponentConnected, IZComponentAttributeChanged, IZComponentPropertyChanged, IZComponentWidth<ZSize>
{
  public static readonly register = registerCustomElement.bind(null, 'z-box', ZBoxElement);
  public static readonly observedAttributes = ['tabIndex'];

  public static readonly BoxSizeChart = Object.freeze({
    ...createSizeChartFixedCss(createSizeChartFixedGeometric(1.4, 18), 'rem'),
    ...createSizeChartVariedCss(),
    ...createSizeChartVoidCss()
  });

  @ZProperty<ZDeviceValue<ZSize>>({ initial: ZSizeVaried.Fit })
  public width?: ZDeviceValue<ZSize>;

  @ZProperty()
  public edge?: Partial<IZQuadrilateral<ZThicknessSize>>;

  @ZProperty()
  public trim?: Partial<IZQuadrilateral<Property.BorderStyle>>;

  @ZProperty()
  public margin?: Partial<IZQuadrilateral<ZGapSize | ZSizeVaried.Fit>>;

  @ZProperty()
  public padding?: Partial<IZQuadrilateral<ZGapSize>>;

  @ZProperty<IZFashion | string>({ attribute: ZFashionDetail.nameOf })
  public fashion?: IZFashion | string;

  public constructor() {
    super();

    const device = new ZFashionDevice();

    const css = new ZCssSerialize().serialize({
      ':host': {
        display: 'block',
        backgroundColor: 'var(--box-background)',
        color: 'var(--box-color)',
        cursor: 'var(--box-cursor)',

        border: 'var(--box-border-color)',
        borderBottomStyle: 'var(--box-border-style-bottom)',
        borderLeftStyle: 'var(--box-border-style-left)',
        borderRightStyle: 'var(--box-border-style-right)',
        borderTopStyle: 'var(--box-border-style-top)',
        borderBottomWidth: 'var(--box-border-width-bottom)',
        borderLeftWidth: 'var(--box-border-width-left)',
        borderRightWidth: 'var(--box-border-width-left)',
        borderTopWidth: 'var(--box-border-width-top)',

        paddingBottom: 'var(--box-padding-bottom)',
        paddingLeft: 'var(--box-padding-left)',
        paddingRight: 'var(--box-padding-right)',
        paddingTop: 'var(--box-padding-top)',

        marginBottom: 'var(--box-margin-bottom)',
        marginLeft: 'var(--box-margin-left)',
        marginRight: 'var(--box-margin-right)',
        marginTop: 'var(--box-margin-top)',

        maxWidth: 'var(--box-width-xl)',

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
        }
      },

      ':host(:focus)': {
        backgroundColor: 'var(--box-focus-background)',
        borderColor: 'var(--box-focus-border-color)',
        color: 'var(--box-focus-color)'
      },

      ':host(:hover)': {
        backgroundColor: 'var(--box-hover-background)',
        borderColor: 'var(--box-hover-border-color)',
        color: 'var(--box-hover-color)'
      }
    });

    const style = document.createElement('style');
    style.textContent = css;

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(style);
    shadow.appendChild(document.createElement('slot'));
  }

  public connectedCallback() {
    this.classList.add('ZBox-root');
    this.attributeChangedCallback();
  }

  public attributeChangedCallback(): void {
    this.propertyChangedCallback();
  }

  public propertyChangedCallback(): void {
    const fallback = ZFashionIntrinsic.Inherit;
    const detail = new ZFashionDetail(this.fashion);
    const { style } = this;

    style.setProperty('--box-cursor', 'default');

    const main = detail.color('main', fallback);
    style.setProperty('--box-background', main);
    style.setProperty('--box-focus-background', main);
    style.setProperty('--box-hover-background', main);

    const contrast = detail.color('contrast', fallback);
    style.setProperty('--box-color', contrast);
    style.setProperty('--box-focus-color', contrast);
    style.setProperty('--box-hover-color', contrast);

    const border = detail.color(['border', 'main'], fallback);
    style.setProperty('--box-border-color', border);
    style.setProperty('--box-focus-border-color', border);
    style.setProperty('--box-hover-border-color', border);

    const { trim } = this;
    style.setProperty('--box-border-style-bottom', firstDefined('none', trim?.bottom));
    style.setProperty('--box-border-style-left', firstDefined('none', trim?.left));
    style.setProperty('--box-border-style-right', firstDefined('none', trim?.right));
    style.setProperty('--box-border-style-top', firstDefined('none', trim?.top));

    const { edge } = this;
    const eb = ZFashionTailorElement.thicknessVar(firstDefined(ZSizeVoid.None, edge?.bottom));
    const el = ZFashionTailorElement.thicknessVar(firstDefined(ZSizeVoid.None, edge?.left));
    const er = ZFashionTailorElement.thicknessVar(firstDefined(ZSizeVoid.None, edge?.right));
    const et = ZFashionTailorElement.thicknessVar(firstDefined(ZSizeVoid.None, edge?.top));
    style.setProperty('--box-border-width-bottom', eb);
    style.setProperty('--box-border-width-left', el);
    style.setProperty('--box-border-width-right', er);
    style.setProperty('--box-border-width-top', et);

    const { margin } = this;
    const mb = ZFashionTailorElement.gapVar(firstDefined(ZSizeVoid.None, margin?.bottom));
    const ml = ZFashionTailorElement.gapVar(firstDefined(ZSizeVoid.None, margin?.left));
    const mr = ZFashionTailorElement.gapVar(firstDefined(ZSizeVoid.None, margin?.right));
    const mt = ZFashionTailorElement.gapVar(firstDefined(ZSizeVoid.None, margin?.top));
    style.setProperty('--box-margin-bottom', mb);
    style.setProperty('--box-margin-left', ml);
    style.setProperty('--box-margin-right', mr);
    style.setProperty('--box-margin-top', mt);

    const { padding } = this;
    const pb = ZFashionTailorElement.gapVar(firstDefined(ZSizeVoid.None, padding?.bottom));
    const pl = ZFashionTailorElement.gapVar(firstDefined(ZSizeVoid.None, padding?.left));
    const pr = ZFashionTailorElement.gapVar(firstDefined(ZSizeVoid.None, padding?.right));
    const pt = ZFashionTailorElement.gapVar(firstDefined(ZSizeVoid.None, padding?.top));

    style.setProperty('--box-padding-bottom', pb);
    style.setProperty('--box-padding-left', pl);
    style.setProperty('--box-padding-right', pr);
    style.setProperty('--box-padding-top', pt);

    const widthBounds = new ZDeviceBounds(this.width, ZSizeVaried.Fit);
    style.setProperty('--box-width-xl', ZBoxElement.BoxSizeChart[widthBounds.xl()]);
    style.setProperty('--box-width-lg', ZBoxElement.BoxSizeChart[widthBounds.lg()]);
    style.setProperty('--box-width-md', ZBoxElement.BoxSizeChart[widthBounds.md()]);
    style.setProperty('--box-width-sm', ZBoxElement.BoxSizeChart[widthBounds.sm()]);
    style.setProperty('--box-width-xs', ZBoxElement.BoxSizeChart[widthBounds.xs()]);

    if (this.tabIndex >= 0) {
      style.setProperty('--box-cursor', 'pointer');

      style.setProperty('--box-focus-background', detail.color(['focus.main', 'main'], fallback));
      style.setProperty('--box-focus-border-color', detail.color(['focus.border', 'border', 'main'], fallback));
      style.setProperty('--box-focus-color', detail.color(['focus.contrast', 'contrast'], fallback));

      style.setProperty('--box-hover-background', detail.color(['hover.main', 'main'], fallback));
      style.setProperty('--box-hover-border-color', detail.color(['hover.border', 'border', 'main'], fallback));
      style.setProperty('--box-hover-color', detail.color(['hover.contrast', 'contrast'], fallback));
    }
  }
}
