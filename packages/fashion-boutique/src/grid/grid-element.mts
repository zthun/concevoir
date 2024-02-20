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
import {
  IZComponentAttributeChanged,
  IZComponentConnected,
  IZComponentPropertyChanged,
  ZProperty,
  registerCustomElement
} from '@zthun/helpful-dom';
import { firstDefined } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import { ZCssSerialize } from '../css/css-serialize.mjs';
import { WithHeightAttributes } from '../element/with-height.mjs';
import { WithPlane2d } from '../element/with-plane-2d.mjs';
import { WithWidthAttributes } from '../element/with-width.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';

export interface IZGridTarget<TItems, TContent> {
  items?: TItems;
  content?: TContent;
}

export type ZGridColumns = Property.GridTemplateColumns | Partial<IZDeviceValueMap<Property.GridTemplateColumns>>;

export class ZGridElement
  extends WithPlane2d<ZSizeVaried, ZSizeVaried>(HTMLElement)
  implements IZComponentConnected, IZComponentAttributeChanged, IZComponentPropertyChanged
{
  public static readonly register = registerCustomElement.bind(null, 'z-grid', ZGridElement);
  public static readonly observedAttributes = [...WithWidthAttributes, ...WithHeightAttributes];
  public static readonly Device = Object.freeze(new ZFashionDevice());
  public static readonly GridDimensionChart = Object.freeze(createSizeChartVariedCss());

  private _root: HTMLDivElement;

  public constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    const css = new ZCssSerialize().serialize({
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
    });

    const style = document.createElement('style');
    style.textContent = `.ZGrid-container { ${css} }`;
    this.shadowRoot?.appendChild(style);

    this._root = document.createElement('div');
    this._root.classList.add('ZGrid-container');
    this._root.appendChild(document.createElement('slot'));
    this.shadowRoot?.appendChild(this._root);
  }

  @ZProperty<ZGridColumns>({ initial: 'none' })
  public columns?: ZGridColumns;

  @ZProperty<Property.GridTemplateRows>({ initial: 'none' })
  public rows?: Property.GridTemplateRows;

  @ZProperty<ZGapSize>({ initial: ZSizeVoid.None })
  private gap?: ZGapSize;

  @ZProperty<IZGridTarget<Property.AlignItems, Property.AlignContent>>()
  private align?: IZGridTarget<Property.AlignItems, Property.AlignContent>;

  @ZProperty<IZGridTarget<Property.JustifyItems, Property.JustifyContent>>()
  private justify?: IZGridTarget<Property.JustifyItems, Property.JustifyContent>;

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

  public connectedCallback() {
    this.classList.add('ZGrid-root');
    this.attributeChangedCallback();
  }

  public attributeChangedCallback() {
    this.propertyChangedCallback();
  }

  public propertyChangedCallback() {
    const { style } = this._root;
    const gap = ZFashionTailorElement.gapVar(firstDefined(ZSizeVoid.None, this.gap));
    style.setProperty('--grid-gap', gap);
    style.setProperty('--grid-rows', `${this.rows}`);

    style.setProperty('--grid-align-content', firstDefined('normal', this.align?.content));
    style.setProperty('--grid-align-items', firstDefined('stretch', this.align?.items));
    style.setProperty('--grid-justify-content', firstDefined('normal', this.justify?.content));
    style.setProperty('--grid-justify-items', firstDefined('stretch', this.justify?.items));

    style.setProperty('--grid-columns', this.columnsXl());
    style.setProperty('--grid-columns-lg', this.columnsLg());
    style.setProperty('--grid-columns-md', this.columnsMd());
    style.setProperty('--grid-columns-sm', this.columnsSm());
    style.setProperty('--grid-columns-xs', this.columnsXs());

    const width = ZGridElement.GridDimensionChart[this.widthXl(ZSizeVaried.Fit)];
    const widthLg = ZGridElement.GridDimensionChart[this.widthLg(ZSizeVaried.Fit)];
    const widthMd = ZGridElement.GridDimensionChart[this.widthMd(ZSizeVaried.Fit)];
    const widthSm = ZGridElement.GridDimensionChart[this.widthSm(ZSizeVaried.Fit)];
    const widthXs = ZGridElement.GridDimensionChart[this.widthXs(ZSizeVaried.Fit)];

    style.setProperty('--grid-width', width);
    style.setProperty('--grid-width-lg', widthLg);
    style.setProperty('--grid-width-md', widthMd);
    style.setProperty('--grid-width-sm', widthSm);
    style.setProperty('--grid-width-xs', widthXs);

    const height = ZGridElement.GridDimensionChart[this.heightXl(ZSizeVaried.Fit)];
    const heightLg = ZGridElement.GridDimensionChart[this.heightLg(ZSizeVaried.Fit)];
    const heightMd = ZGridElement.GridDimensionChart[this.heightMd(ZSizeVaried.Fit)];
    const heightSm = ZGridElement.GridDimensionChart[this.heightSm(ZSizeVaried.Fit)];
    const heightXs = ZGridElement.GridDimensionChart[this.heightXs(ZSizeVaried.Fit)];

    style.setProperty('--grid-height', height);
    style.setProperty('--grid-height-lg', heightLg);
    style.setProperty('--grid-height-md', heightMd);
    style.setProperty('--grid-height-sm', heightSm);
    style.setProperty('--grid-height-xs', heightXs);
  }
}
