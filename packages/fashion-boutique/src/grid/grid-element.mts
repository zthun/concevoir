import {
  IZDeviceValueMap,
  ZFashionDevice,
  ZGapSize,
  ZSizeFixed,
  ZSizeVaried,
  ZSizeVoid,
  createSizeChartVariedCss,
  isDeviceValueMap
} from '@zthun/fashion-tailor';
import { mutateAttribute, registerCustomElement } from '@zthun/helpful-dom';
import { firstDefined } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import { IZComponentAttributeChanged, IZComponentConnected } from 'src/element/component-lifecycle.mjs';
import { WithHeightAttributes } from '../element/with-height.mjs';
import { WithPlane2d } from '../element/with-plane-2d.mjs';
import { WithWidthAttributes } from '../element/with-width.mjs';
import { css } from '../theme/css.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';

export const ZGridAttributes = ['data-columns', 'data-gap', 'data-rows'];

export interface IZGridTarget<TItems, TContent> {
  items?: TItems;
  content?: TContent;
}

export type ZGridColumns = Property.GridTemplateColumns | Partial<IZDeviceValueMap<Property.GridTemplateColumns>>;

export class ZGridElement
  extends WithPlane2d<ZSizeVaried, ZSizeVaried>(HTMLElement)
  implements IZComponentConnected, IZComponentAttributeChanged
{
  public static readonly register = registerCustomElement.bind(null, 'z-grid', ZGridElement);
  public static readonly observedAttributes = [...WithWidthAttributes, ...WithHeightAttributes, ...ZGridAttributes];
  public static readonly Device = Object.freeze(new ZFashionDevice());
  public static readonly GridDimensionChart = Object.freeze(createSizeChartVariedCss());

  private _columns: ZGridColumns | undefined;

  public get columns() {
    return this._columns;
  }

  public set columns(val: ZGridColumns | undefined) {
    this._columns = val;
    mutateAttribute(this, 'data-columns', JSON.stringify(val));
  }

  public calculateColumns(device: ZSizeFixed): Property.GridTemplateColumns | null | undefined {
    return isDeviceValueMap(this.columns) ? this.columns[device] : this.columns;
  }

  public columnsXl() {
    return this.calculateColumns(ZSizeFixed.ExtraLarge) || 'none';
  }

  public columnsLg() {
    return this.calculateColumns(ZSizeFixed.Large) || this.columnsXl();
  }

  public columnsMd() {
    return this.calculateColumns(ZSizeFixed.Medium) || this.columnsLg();
  }

  public columnsSm() {
    return this.calculateColumns(ZSizeFixed.Small) || this.columnsMd();
  }

  public columnsXs() {
    return this.calculateColumns(ZSizeFixed.ExtraSmall) || this.columnsSm();
  }

  private _rows?: Property.GridTemplateRows;

  public get rows() {
    return this._rows;
  }

  public set rows(val: Property.GridTemplateRows | undefined) {
    this._rows = val;
    mutateAttribute(this, 'data-rows', `${val}`);
  }

  private _gap?: ZGapSize;

  public get gap() {
    return this._gap;
  }

  public set gap(val: ZGapSize | undefined) {
    this._gap = val;
    mutateAttribute(this, 'data-gap', val);
  }

  private _align?: IZGridTarget<Property.AlignItems, Property.AlignContent>;

  public get align() {
    return this._align;
  }

  public set align(val: IZGridTarget<Property.AlignItems, Property.AlignContent> | undefined) {
    this._align = val;
    mutateAttribute(this, 'data-align', JSON.stringify(val));
  }

  private _justify?: IZGridTarget<Property.JustifyItems, Property.JustifyContent>;

  public get justify() {
    return this._justify;
  }

  public set justify(val: IZGridTarget<Property.JustifyItems, Property.JustifyContent> | undefined) {
    this._justify = val;
    mutateAttribute(this, 'data-justify', JSON.stringify(val));
  }

  public connectedCallback() {
    this.classList.add('ZGrid-root');
    this.classList.add(
      css({
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
      })
    );

    this.attributeChangedCallback();
  }

  public attributeChangedCallback() {
    const gap = ZFashionTailorElement.gapVar(firstDefined(ZSizeVoid.None, this.gap));
    this.style.setProperty('--grid-gap', gap);
    this.style.setProperty('--grid-rows', `${this.rows}`);

    this.style.setProperty('--grid-align-content', firstDefined('normal', this.align?.content));
    this.style.setProperty('--grid-align-items', firstDefined('stretch', this.align?.items));
    this.style.setProperty('--grid-justify-content', firstDefined('normal', this.justify?.content));
    this.style.setProperty('--grid-justify-items', firstDefined('stretch', this.justify?.items));

    this.style.setProperty('--grid-columns', this.columnsXl());
    this.style.setProperty('--grid-columns-lg', this.columnsLg());
    this.style.setProperty('--grid-columns-md', this.columnsMd());
    this.style.setProperty('--grid-columns-sm', this.columnsSm());
    this.style.setProperty('--grid-columns-xs', this.columnsXs());

    const width = ZGridElement.GridDimensionChart[this.widthXl(ZSizeVaried.Fit)];
    const widthLg = ZGridElement.GridDimensionChart[this.widthLg(ZSizeVaried.Fit)];
    const widthMd = ZGridElement.GridDimensionChart[this.widthMd(ZSizeVaried.Fit)];
    const widthSm = ZGridElement.GridDimensionChart[this.widthSm(ZSizeVaried.Fit)];
    const widthXs = ZGridElement.GridDimensionChart[this.widthXs(ZSizeVaried.Fit)];

    this.style.setProperty('--grid-width', width);
    this.style.setProperty('--grid-width-lg', widthLg);
    this.style.setProperty('--grid-width-md', widthMd);
    this.style.setProperty('--grid-width-sm', widthSm);
    this.style.setProperty('--grid-width-xs', widthXs);

    const height = ZGridElement.GridDimensionChart[this.heightXl(ZSizeVaried.Fit)];
    const heightLg = ZGridElement.GridDimensionChart[this.heightLg(ZSizeVaried.Fit)];
    const heightMd = ZGridElement.GridDimensionChart[this.heightMd(ZSizeVaried.Fit)];
    const heightSm = ZGridElement.GridDimensionChart[this.heightSm(ZSizeVaried.Fit)];
    const heightXs = ZGridElement.GridDimensionChart[this.heightXs(ZSizeVaried.Fit)];

    this.style.setProperty('--grid-height', height);
    this.style.setProperty('--grid-height-lg', heightLg);
    this.style.setProperty('--grid-height-md', heightMd);
    this.style.setProperty('--grid-height-sm', heightSm);
    this.style.setProperty('--grid-height-xs', heightXs);
  }
}
