import { IZComponentDisabled, IZComponentName, IZComponentRequired } from '@zthun/fashion-boutique';
import { IZComponentLabel } from '../component/component-label.mjs';
import { IZComponentRange } from '../component/component-range.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';
import { IZComponentValue } from '../component/component-value.mjs';

/**
 * Represents a component that lets the user enter or select a number.
 */
export interface IZNumber<T = number>
  extends IZComponentValue<T>,
    IZComponentDisabled,
    IZComponentRange<number>,
    IZComponentName,
    IZComponentLabel,
    IZComponentRequired,
    IZComponentStyle {
  step?: number;
}
