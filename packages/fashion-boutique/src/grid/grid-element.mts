import {
  ZFashionDevice,
  ZGapSize,
  ZSizeFixed,
  ZSizeVaried,
  ZSizeVoid,
  createSizeChartVariedCss
} from '@zthun/fashion-tailor';
import { registerCustomElement } from '@zthun/helpful-dom';
import { firstDefined } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import { css } from '../theme/css.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';

export class ZGridElement extends HTMLElement {
  public static readonly register = registerCustomElement.bind(null, 'z-grid', ZGridElement);
  public static readonly Device = Object.freeze(new ZFashionDevice());
  public static readonly GridDimensionChart = Object.freeze(createSizeChartVariedCss());

  private _dimension<T extends string>(size: ZSizeFixed, scope: 'columns' | 'width' | 'height', fallback: T): T {
    const suffix = size === ZSizeFixed.ExtraLarge ? '' : `-${size}`;
    return firstDefined(fallback, this.getAttribute(`${scope}${suffix}`) as T);
  }

  public columns = this._dimension.bind(this, ZSizeFixed.ExtraLarge, 'columns', 'auto');
  public columnsLg = this._dimension.bind(this, ZSizeFixed.Large, 'columns', this.columns());
  public columnsMd = this._dimension.bind(this, ZSizeFixed.Medium, 'columns', this.columnsLg());
  public columnsSm = this._dimension.bind(this, ZSizeFixed.Small, 'columns', this.columnsMd());
  public columnsXs = this._dimension.bind(this, ZSizeFixed.ExtraSmall, 'columns', this.columnsSm());

  public height = this._dimension.bind(this, ZSizeFixed.ExtraLarge, 'height', ZSizeVaried.Fit);
  public heightLg = this._dimension.bind(this, ZSizeFixed.Large, 'height', this.height());
  public heightMd = this._dimension.bind(this, ZSizeFixed.Medium, 'height', this.heightLg());
  public heightSm = this._dimension.bind(this, ZSizeFixed.Small, 'height', this.heightMd());
  public heightXs = this._dimension.bind(this, ZSizeFixed.ExtraSmall, 'height', this.heightSm());

  public width = this._dimension.bind(this, ZSizeFixed.ExtraLarge, 'width', ZSizeVaried.Fit);
  public widthLg = this._dimension.bind(this, ZSizeFixed.Large, 'width', this.width());
  public widthMd = this._dimension.bind(this, ZSizeFixed.Medium, 'width', this.widthLg());
  public widthSm = this._dimension.bind(this, ZSizeFixed.Small, 'width', this.widthMd());
  public widthXs = this._dimension.bind(this, ZSizeFixed.ExtraSmall, 'width', this.widthSm());

  public rows(): Property.GridTemplateRows {
    return firstDefined('auto', this.getAttribute('rows'));
  }

  public gap(): ZGapSize {
    return firstDefined(ZSizeVoid.None, this.getAttribute('gap') as ZGapSize);
  }

  public alignItems(): Property.AlignItems {
    return firstDefined('stretch', this.getAttribute('align-items'));
  }

  public justifyItems(): Property.JustifyItems {
    return firstDefined('stretch', this.getAttribute('justify-items'));
  }

  public alignContent(): Property.AlignContent {
    return firstDefined('normal', this.getAttribute('align-content'));
  }

  public justifyContent(): Property.JustifyContent {
    return firstDefined('normal', this.getAttribute('justify-content'));
  }

  public connectedCallback() {
    this._applyVariables();
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
  }

  private _applyVariables() {
    const gap = ZFashionTailorElement.gapProperty(this.gap());
    this.style.setProperty('--grid-gap', `var(${gap})`);
    this.style.setProperty('--grid-rows', `${this.rows()}`);

    this.style.setProperty('--grid-align-content', this.alignContent());
    this.style.setProperty('--grid-align-items', this.alignItems());
    this.style.setProperty('--grid-justify-content', this.justifyContent());
    this.style.setProperty('--grid-justify-items', this.justifyItems());

    this.style.setProperty('--grid-columns', this.columns());
    this.style.setProperty('--grid-columns-lg', this.columnsLg());
    this.style.setProperty('--grid-columns-md', this.columnsMd());
    this.style.setProperty('--grid-columns-sm', this.columnsSm());
    this.style.setProperty('--grid-columns-xs', this.columnsXs());

    const width = ZGridElement.GridDimensionChart[this.width()];
    const widthLg = ZGridElement.GridDimensionChart[this.widthLg()];
    const widthMd = ZGridElement.GridDimensionChart[this.widthMd()];
    const widthSm = ZGridElement.GridDimensionChart[this.widthSm()];
    const widthXs = ZGridElement.GridDimensionChart[this.widthXs()];

    this.style.setProperty('--grid-width', width);
    this.style.setProperty('--grid-width-lg', widthLg);
    this.style.setProperty('--grid-width-md', widthMd);
    this.style.setProperty('--grid-width-sm', widthSm);
    this.style.setProperty('--grid-width-xs', widthXs);

    const height = ZGridElement.GridDimensionChart[this.height()];
    const heightLg = ZGridElement.GridDimensionChart[this.heightLg()];
    const heightMd = ZGridElement.GridDimensionChart[this.heightMd()];
    const heightSm = ZGridElement.GridDimensionChart[this.heightSm()];
    const heightXs = ZGridElement.GridDimensionChart[this.heightXs()];

    this.style.setProperty('--grid-height', height);
    this.style.setProperty('--grid-height-lg', heightLg);
    this.style.setProperty('--grid-height-md', heightMd);
    this.style.setProperty('--grid-height-sm', heightSm);
    this.style.setProperty('--grid-height-xs', heightXs);
  }
}
