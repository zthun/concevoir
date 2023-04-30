import { IZComponentDisabled } from '../component/component-disabled';
import { IZComponentFashion } from '../component/component-fashion';
import { IZComponentLabel } from '../component/component-label';
import { IZComponentName } from '../component/component-name';
import { IZComponentRequired } from '../component/component-required';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentValue } from '../component/component-value';

export interface IZBoolean<T>
  extends IZComponentDisabled,
    IZComponentValue<T>,
    IZComponentStyle,
    IZComponentLabel,
    IZComponentName,
    IZComponentRequired,
    IZComponentFashion {}
