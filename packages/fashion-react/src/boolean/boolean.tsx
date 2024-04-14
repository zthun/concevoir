import {
  IZComponentDisabled,
  IZComponentFashion,
  IZComponentName,
  IZComponentRequired,
  IZComponentValue
} from '@zthun/fashion-boutique';
import { IZComponentLabel } from '../component/component-label.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';

export interface IZBoolean<T>
  extends IZComponentDisabled,
    IZComponentValue<T>,
    IZComponentStyle,
    IZComponentLabel,
    IZComponentName,
    IZComponentRequired,
    IZComponentFashion {}
