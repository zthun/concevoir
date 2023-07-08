import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style';
import { IZDataPoint } from './data-point';

export interface IZChart<TPoint = IZDataPoint[]> extends IZComponentName, IZComponentStyle {
  points: TPoint;
}
