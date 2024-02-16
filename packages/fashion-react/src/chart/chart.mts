import { IZDataPoint } from '@zthun/fashion-boutique';
import { IZComponentName } from '../component/component-name.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';

export interface IZChart<TPoint = IZDataPoint[]> extends IZComponentName, IZComponentStyle {
  points: TPoint;
}
