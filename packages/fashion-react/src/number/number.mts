import {
  IZComponentDisabled,
  IZComponentLabel,
  IZComponentName,
  IZComponentRange,
  IZComponentRequired,
  IZComponentValue
} from '@zthun/fashion-boutique';
import { ReactNode } from 'react';
import { IZComponentStyle } from '../component/component-style.mjs';

/**
 * Represents a component that lets the user enter or select a number.
 */
export interface IZNumber<T = number>
  extends IZComponentValue<T>,
    IZComponentDisabled,
    IZComponentRange<number>,
    IZComponentName,
    IZComponentLabel<ReactNode>,
    IZComponentRequired,
    IZComponentStyle {
  step?: number;
}
