import { IZComponentDisabled, IZComponentFashion, IZComponentName, IZComponentRequired } from '@zthun/fashion-boutique';
import { IZComponentLabel } from '../component/component-label.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';
import { IZComponentValue } from '../component/component-value.mjs';

export interface IZBoolean<T>
  extends IZComponentDisabled,
    IZComponentValue<T>,
    IZComponentStyle,
    IZComponentLabel,
    IZComponentName,
    IZComponentRequired,
    IZComponentFashion {}
