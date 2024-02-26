import {
  ZDeviceBounds,
  ZFashionDevice,
  ZGapSize,
  ZSizeFixed,
  ZSizeVaried,
  ZSizeVoid,
  createSizeChartVariedCss
} from '@zthun/fashion-tailor';
import {
  IZComponentAttributeChanged,
  IZComponentConnected,
  ZAttribute,
  registerCustomElement
} from '@zthun/helpful-dom';
import { firstDefined } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import { ZAlignmentElement } from '../background/alignment-element.mjs';
import { ZDeviceElement } from '../background/device-element.mjs';
import { IZComponentHeight } from '../component/component-height.mjs';
import { IZComponentWidth } from '../component/component-width.mjs';
import { ZCssSerialize } from '../css/css-serialize.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';

export interface IZGridElement
  extends IZComponentConnected,
    IZComponentAttributeChanged,
    IZComponentWidth<ZSizeVaried>,
    IZComponentHeight<ZSizeVaried> {}

export class ZGridElement extends HTMLElement implements IZGridElement {
  public static readonly register = registerCustomElement.bind(null, 'z-grid', ZGridElement);
  public static readonly Device = Object.freeze(new ZFashionDevice());
  public static readonly GridDimensionChart = Object.freeze(createSizeChartVariedCss());
  public static readonly observedAttributes = ['rows', 'gap'];

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

        gridTemplateColumns: 'var(--grid-columns-xl)',
        height: 'var(--grid-height-xl)',
        width: 'var(--grid-width-xl)',

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

  @ZAttribute()
  public rows?: Property.GridTemplateRows;

  @ZAttribute()
  public gap?: ZGapSize;

  private _refreshColumns = () => {
    const { style } = this;

    const $columns = this.querySelector<ZDeviceElement>('z-device[name="columns"]');
    const columns = new ZDeviceBounds<Property.GridTemplateColumns>($columns?.device(), 'none');
    style.setProperty('--grid-columns-xl', `${columns.xl()}`);
    style.setProperty('--grid-columns-lg', `${columns.lg()}`);
    style.setProperty('--grid-columns-md', `${columns.md()}`);
    style.setProperty('--grid-columns-sm', `${columns.sm()}`);
    style.setProperty('--grid-columns-xs', `${columns.xs()}`);
  };

  private _refreshAlignment = (a: 'align' | 'justify') => {
    const { style } = this;
    const $alignment = this.querySelector<ZAlignmentElement>(`z-alignment[name="${a}"]`);
    style.setProperty(`--grid-${a}-content`, firstDefined('normal', $alignment?.content));
    style.setProperty(`--grid-${a}-items`, firstDefined('stretch', $alignment?.items));
  };

  private _refreshAlign = this._refreshAlignment.bind(this, 'align');
  private _refreshJustify = this._refreshAlignment.bind(this, 'justify');

  private _refreshDimension = (d: 'width' | 'height') => {
    const { style } = this;

    const $dimension = this.querySelector<ZDeviceElement>(`z-device[name="${d}"]`);
    const dimension = new ZDeviceBounds($dimension?.device(), ZSizeVaried.Fit);
    const xl = ZGridElement.GridDimensionChart[dimension.xl()];
    const lg = ZGridElement.GridDimensionChart[dimension.lg()];
    const md = ZGridElement.GridDimensionChart[dimension.md()];
    const sm = ZGridElement.GridDimensionChart[dimension.sm()];
    const xs = ZGridElement.GridDimensionChart[dimension.xs()];
    style.setProperty(`--grid-${d}-xl`, xl);
    style.setProperty(`--grid-${d}-lg`, lg);
    style.setProperty(`--grid-${d}-md`, md);
    style.setProperty(`--grid-${d}-sm`, sm);
    style.setProperty(`--grid-${d}-xs`, xs);
  };

  private _refreshWidth = this._refreshDimension.bind(this, 'width');
  private _refreshHeight = this._refreshDimension.bind(this, 'height');

  public connectedCallback() {
    this.classList.add('ZGrid-root');

    const $align = this.querySelector<ZAlignmentElement>('z-alignment[name="align"]');
    $align?.addEventListener('change', this._refreshAlign);

    const $justify = this.querySelector<ZAlignmentElement>('z-alignment[name="justify"]');
    $justify?.addEventListener('change', this._refreshJustify);

    const $columns = this.querySelector<ZDeviceElement>('z-device[name="columns"]');
    $columns?.addEventListener('change', this._refreshColumns);

    const $width = this.querySelector<ZDeviceElement>('z-device[name="width"]');
    $width?.addEventListener('change', this._refreshWidth);

    const $height = this.querySelector<ZDeviceElement>('z-device[name="height"]');
    $height?.addEventListener('change', this._refreshHeight);

    this._refreshAlign();
    this._refreshJustify();
    this._refreshColumns();
    this._refreshWidth();
    this._refreshHeight();
  }

  public attributeChangedCallback() {
    const { style } = this;
    const gap = ZFashionTailorElement.gapVar(firstDefined(ZSizeVoid.None, this.gap));
    style.setProperty('--grid-gap', gap);
    style.setProperty('--grid-rows', `${this.rows}`);
  }
}
