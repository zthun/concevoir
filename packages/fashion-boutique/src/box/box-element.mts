import {
  ZDeviceBounds,
  ZFashionDevice,
  ZGapSize,
  ZSizeFixed,
  ZSizeVaried,
  ZSizeVoid,
  ZThicknessSize,
  createSizeChartFixedCss,
  createSizeChartFixedGeometric,
  createSizeChartVariedCss,
  createSizeChartVoidCss
} from '@zthun/fashion-tailor';
import { ZFashionIntrinsic } from '@zthun/fashion-theme';
import {
  IZComponentAttributeChanged,
  IZComponentConnected,
  IZComponentDisconnected,
  ZAttribute,
  registerCustomElement
} from '@zthun/helpful-dom';
import { firstDefined } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import { ZDeviceElement } from '../background/device-element.mjs';
import { ZQuadrilateralElement } from '../background/quadrilateral-element.mjs';
import { IZComponentFashion, ZFashionDetail } from '../component/component-fashion.mjs';
import { ZCssSerialize } from '../css/css-serialize.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';

export class ZBoxElement
  extends HTMLElement
  implements IZComponentConnected, IZComponentAttributeChanged, IZComponentDisconnected, IZComponentFashion
{
  public static readonly register = registerCustomElement.bind(null, 'z-box', ZBoxElement);
  public static readonly observedAttributes = ['tabIndex', 'fashion'];

  public static readonly BoxSizeChart = Object.freeze({
    ...createSizeChartFixedCss(createSizeChartFixedGeometric(1.4, 18), 'rem'),
    ...createSizeChartVariedCss(),
    ...createSizeChartVoidCss()
  });

  @ZAttribute({ fallback: ZFashionIntrinsic.Inherit })
  public fashion: string;

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

  private _refreshEdge = () => {
    const { style } = this;

    const query = 'z-quadrilateral[name="edge"]';
    const edge = this.querySelector<ZQuadrilateralElement<ZThicknessSize>>(query);

    const bottom = ZFashionTailorElement.thicknessVar(firstDefined(ZSizeVoid.None, edge?.bottom));
    const left = ZFashionTailorElement.thicknessVar(firstDefined(ZSizeVoid.None, edge?.left));
    const right = ZFashionTailorElement.thicknessVar(firstDefined(ZSizeVoid.None, edge?.right));
    const top = ZFashionTailorElement.thicknessVar(firstDefined(ZSizeVoid.None, edge?.top));

    style.setProperty('--box-border-width-bottom', bottom);
    style.setProperty('--box-border-width-left', left);
    style.setProperty('--box-border-width-right', right);
    style.setProperty('--box-border-width-top', top);
  };

  private _refreshFashion = () => {
    const detail = new ZFashionDetail(this.fashion);
    const { style } = this;

    style.setProperty('--box-cursor', 'default');

    const main = detail.color('main');
    style.setProperty('--box-background', main);
    style.setProperty('--box-focus-background', main);
    style.setProperty('--box-hover-background', main);

    const contrast = detail.color('contrast');
    style.setProperty('--box-color', contrast);
    style.setProperty('--box-focus-color', contrast);
    style.setProperty('--box-hover-color', contrast);

    const border = detail.color('border');
    style.setProperty('--box-border-color', border);
    style.setProperty('--box-focus-border-color', border);
    style.setProperty('--box-hover-border-color', border);

    if (this.tabIndex >= 0) {
      style.setProperty('--box-cursor', 'pointer');

      style.setProperty('--box-focus-background', detail.color('focus.main'));
      style.setProperty('--box-focus-border-color', detail.color('focus.border'));
      style.setProperty('--box-focus-color', detail.color('focus.contrast'));

      style.setProperty('--box-hover-background', detail.color('hover.main'));
      style.setProperty('--box-hover-border-color', detail.color('hover.border'));
      style.setProperty('--box-hover-color', detail.color('hover.contrast'));
    }
  };

  private _refreshMargin = () => {
    const { style } = this;

    const m = 'z-quadrilateral[name="margin"]';
    const margin = this.querySelector<ZQuadrilateralElement<ZGapSize | ZSizeVaried.Fit>>(m);

    const bottom = ZFashionTailorElement.gapVar(firstDefined(ZSizeVoid.None, margin?.bottom));
    const left = ZFashionTailorElement.gapVar(firstDefined(ZSizeVoid.None, margin?.left));
    const right = ZFashionTailorElement.gapVar(firstDefined(ZSizeVoid.None, margin?.right));
    const top = ZFashionTailorElement.gapVar(firstDefined(ZSizeVoid.None, margin?.top));

    style.setProperty(`--box-margin-bottom`, bottom);
    style.setProperty(`--box-margin-left`, left);
    style.setProperty(`--box-margin-right`, right);
    style.setProperty(`--box-margin-top`, top);
  };

  private _refreshPadding = () => {
    const { style } = this;

    const query = 'z-quadrilateral[name="padding"]';
    const padding = this.querySelector<ZQuadrilateralElement<ZGapSize>>(query);

    const bottom = ZFashionTailorElement.gapVar(firstDefined(ZSizeVoid.None, padding?.bottom));
    const left = ZFashionTailorElement.gapVar(firstDefined(ZSizeVoid.None, padding?.left));
    const right = ZFashionTailorElement.gapVar(firstDefined(ZSizeVoid.None, padding?.right));
    const top = ZFashionTailorElement.gapVar(firstDefined(ZSizeVoid.None, padding?.top));

    style.setProperty('--box-padding-bottom', bottom);
    style.setProperty('--box-padding-left', left);
    style.setProperty('--box-padding-right', right);
    style.setProperty('--box-padding-top', top);
  };

  private _refreshTrim = () => {
    const { style } = this;

    const query = 'z-quadrilateral[name="trim"]';
    const trim = this.querySelector<ZQuadrilateralElement<Property.BorderStyle>>(query);

    const bottom = firstDefined('none', trim?.bottom);
    const left = firstDefined('none', trim?.left);
    const right = firstDefined('none', trim?.right);
    const top = firstDefined('none', trim?.top);

    style.setProperty('--box-border-style-bottom', bottom);
    style.setProperty('--box-border-style-left', left);
    style.setProperty('--box-border-style-right', right);
    style.setProperty('--box-border-style-top', top);
  };

  private _refreshWidth = () => {
    const { style } = this;

    const $width = this.querySelector<ZDeviceElement>(`z-device[name="width"]`);
    const width = new ZDeviceBounds($width?.device?.call($width), ZSizeVaried.Fit);

    style.setProperty('--box-width-xl', ZBoxElement.BoxSizeChart[width.xl()]);
    style.setProperty('--box-width-lg', ZBoxElement.BoxSizeChart[width.lg()]);
    style.setProperty('--box-width-md', ZBoxElement.BoxSizeChart[width.md()]);
    style.setProperty('--box-width-sm', ZBoxElement.BoxSizeChart[width.sm()]);
    style.setProperty('--box-width-xs', ZBoxElement.BoxSizeChart[width.xs()]);
  };

  public connectedCallback() {
    this.classList.add('ZBox-root');

    const $edge = this.querySelector<ZDeviceElement>('z-quadrilateral[name="edge"]');
    $edge?.addEventListener('change', this._refreshEdge);

    const $margin = this.querySelector<ZDeviceElement>('z-quadrilateral[name="margin"]');
    $margin?.addEventListener('change', this._refreshMargin);

    const $padding = this.querySelector<ZDeviceElement>('z-quadrilateral[name="padding"]');
    $padding?.addEventListener('change', this._refreshPadding);

    const $trim = this.querySelector<ZDeviceElement>('z-quadrilateral[name="trim"]');
    $trim?.addEventListener('change', this._refreshTrim);

    const $width = this.querySelector<ZDeviceElement>('z-device[name="width"]');
    $width?.addEventListener('change', this._refreshWidth);

    this._refreshMargin();
    this._refreshPadding();
    this._refreshWidth();
    this._refreshEdge();
    this._refreshTrim();
    this._refreshFashion();
  }

  public disconnectedCallback() {
    const $width = this.querySelector<ZDeviceElement>('z-device[name="width"]');
    $width?.removeEventListener('change', this._refreshWidth);

    const $trim = this.querySelector<ZDeviceElement>('z-quadrilateral[name="trim"]');
    $trim?.removeEventListener('change', this._refreshTrim);

    const $padding = this.querySelector<ZDeviceElement>('z-quadrilateral[name="padding"]');
    $padding?.removeEventListener('change', this._refreshPadding);

    const $margin = this.querySelector<ZDeviceElement>('z-quadrilateral[name="margin"]');
    $margin?.removeEventListener('change', this._refreshMargin);

    const $edge = this.querySelector<ZDeviceElement>('z-quadrilateral[name="edge"]');
    $edge?.removeEventListener('change', this._refreshEdge);
  }

  public attributeChangedCallback(): void {
    this._refreshFashion();
  }
}
