import { ZSizeChartFixed, ZSizeFixed } from '../fixed/size-fixed';

export interface IZFashionDevice {
  break(size: ZSizeFixed): string;
}

export class ZFashionDevice implements IZFashionDevice {
  public _breakpoints: ZSizeChartFixed<string> = {
    [ZSizeFixed.ExtraSmall]: '600px',
    [ZSizeFixed.Small]: '900px',
    [ZSizeFixed.Medium]: '1200px',
    [ZSizeFixed.Large]: '1536px',
    [ZSizeFixed.ExtraLarge]: 'Infinity'
  };

  public break(size: ZSizeFixed): string {
    const width = this._breakpoints[size];
    return `@media only screen and (max-width: ${width})`;
  }
}
