import {
  ZDeviceBounds,
  ZDeviceValue,
  ZFashionDevice,
  ZGapSize,
  ZSizeFixed,
  ZSizeVaried,
  ZSizeVoid,
  createSizeChartVariedCss
} from '@zthun/fashion-tailor';
import { IZComponentConnected, IZComponentPropertyChanged, ZProperty, registerCustomElement } from '@zthun/helpful-dom';
import { firstDefined } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import { IZComponentHeight } from '../component/component-height.mjs';
import { IZComponentWidth } from '../component/component-width.mjs';
import { ZCssSerialize } from '../css/css-serialize.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';

export interface IZGridTarget<TItems, TContent> {
  items?: TItems;
  content?: TContent;
}

export interface IZGridElement
  extends IZComponentConnected,
    IZComponentPropertyChanged,
    IZComponentWidth<ZSizeVaried>,
    IZComponentHeight<ZSizeVaried> {}

export class ZGridElement extends HTMLElement implements IZGridElement {
  public static readonly register = registerCustomElement.bind(null, 'z-grid', ZGridElement);
  public static readonly Device = Object.freeze(new ZFashionDevice());
  public static readonly GridDimensionChart = Object.freeze(createSizeChartVariedCss());

  public constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    const css = new ZCssSerialize().serialize({
      ':host': {
        display: 'grid',

        gap: 'var(--grid-gap)',
        gridTemplateRows: 'var(--grid-rows)',

        alignContent: 'var(--grid-align-content)',
        alignItems: 'var(--grid-align-items)',

        justifyItems: 'var(--grid-justify-items)',
        justifyContent: 'var(--grid-justify-content)',

        gridTemplateColumns: 'var(--grid-columns)',
        height: 'var(--grid-height)',
        width: 'var(--grid-width)',

        [ZGridElement.Device.break(ZSizeFixed.Large)]: {
          gridTemplateColumns: 'var(--grid-columns-lg)',
          height: 'var(--grid-height-lg)',
          width: 'var(--grid-width-lg)'
        },

        [ZGridElement.Device.break(ZSizeFixed.Medium)]: {
          gridTemplateColumns: 'var(--grid-columns-md)',
          height: 'var(--grid-height-md)',
          width: 'var(--grid-width-md)'
        },

        [ZGridElement.Device.break(ZSizeFixed.Small)]: {
          gridTemplateColumns: 'var(--grid-columns-sm)',
          height: 'var(--grid-height-sm)',
          width: 'var(--grid-width-sm)'
        },

        [ZGridElement.Device.break(ZSizeFixed.Small)]: {
          gridTemplateColumns: 'var(--grid-columns-xs)',
          height: 'var(--grid-height-xs)',
          width: 'var(--grid-width-xs)'
        }
      }
    });

    const style = document.createElement('style');
    style.textContent = css;
    shadow.appendChild(style);
    shadow.appendChild(document.createElement('slot'));
  }

  @ZProperty<ZDeviceValue<Property.GridTemplateColumns>>({ initial: 'none' })
  public columns?: ZDeviceValue<Property.GridTemplateColumns>;

  @ZProperty<Property.GridTemplateRows>({ initial: 'none' })
  public rows?: Property.GridTemplateRows;

  @ZProperty<ZGapSize>({ initial: ZSizeVoid.None })
  public gap?: ZGapSize;

  @ZProperty<IZGridTarget<Property.AlignItems, Property.AlignContent>>()
  public align?: IZGridTarget<Property.AlignItems, Property.AlignContent>;

  @ZProperty<IZGridTarget<Property.JustifyItems, Property.JustifyContent>>()
  public justify?: IZGridTarget<Property.JustifyItems, Property.JustifyContent>;

  @ZProperty<ZDeviceValue<ZSizeVaried>>({ initial: ZSizeVaried.Fit })
  public width?: ZDeviceValue<ZSizeVaried>;

  @ZProperty<ZDeviceValue<ZSizeVaried>>({ initial: ZSizeVaried.Fit })
  public height?: ZDeviceValue<ZSizeVaried>;

  public connectedCallback() {
    this.classList.add('ZGrid-root');
    this.propertyChangedCallback();
  }

  public propertyChangedCallback() {
    const { style } = this;
    const gap = ZFashionTailorElement.gapVar(firstDefined(ZSizeVoid.None, this.gap));
    style.setProperty('--grid-gap', gap);
    style.setProperty('--grid-rows', `${this.rows}`);

    style.setProperty('--grid-align-content', firstDefined('normal', this.align?.content));
    style.setProperty('--grid-align-items', firstDefined('stretch', this.align?.items));
    style.setProperty('--grid-justify-content', firstDefined('normal', this.justify?.content));
    style.setProperty('--grid-justify-items', firstDefined('stretch', this.justify?.items));

    const columnBounds = new ZDeviceBounds(this.columns, 'none');
    style.setProperty('--grid-columns', `${columnBounds.xl()}`);
    style.setProperty('--grid-columns-lg', `${columnBounds.lg()}`);
    style.setProperty('--grid-columns-md', `${columnBounds.md()}`);
    style.setProperty('--grid-columns-sm', `${columnBounds.sm()}`);
    style.setProperty('--grid-columns-xs', `${columnBounds.xs()}`);

    const widthBounds = new ZDeviceBounds(this.width, ZSizeVaried.Fit);
    const width = ZGridElement.GridDimensionChart[widthBounds.xl()];
    const widthLg = ZGridElement.GridDimensionChart[widthBounds.lg()];
    const widthMd = ZGridElement.GridDimensionChart[widthBounds.md()];
    const widthSm = ZGridElement.GridDimensionChart[widthBounds.sm()];
    const widthXs = ZGridElement.GridDimensionChart[widthBounds.xs()];

    style.setProperty('--grid-width', width);
    style.setProperty('--grid-width-lg', widthLg);
    style.setProperty('--grid-width-md', widthMd);
    style.setProperty('--grid-width-sm', widthSm);
    style.setProperty('--grid-width-xs', widthXs);

    const heightBounds = new ZDeviceBounds(this.height, ZSizeVaried.Fit);
    const height = ZGridElement.GridDimensionChart[heightBounds.xl()];
    const heightLg = ZGridElement.GridDimensionChart[heightBounds.lg()];
    const heightMd = ZGridElement.GridDimensionChart[heightBounds.md()];
    const heightSm = ZGridElement.GridDimensionChart[heightBounds.sm()];
    const heightXs = ZGridElement.GridDimensionChart[heightBounds.xs()];

    style.setProperty('--grid-height', height);
    style.setProperty('--grid-height-lg', heightLg);
    style.setProperty('--grid-height-md', heightMd);
    style.setProperty('--grid-height-sm', heightSm);
    style.setProperty('--grid-height-xs', heightXs);
  }
}
