import {
  IZComponentDisabled,
  IZComponentFashion,
  IZComponentLabel,
  IZComponentName,
  IZComponentRequired,
  IZComponentValue
} from '@zthun/fashion-boutique';
import { ReactNode } from 'react';
import { IZComponentStyle } from '../component/component-style.mjs';

export interface IZBoolean<T>
  extends IZComponentDisabled,
    IZComponentValue<T>,
    IZComponentStyle,
    IZComponentLabel<ReactNode>,
    IZComponentName,
    IZComponentRequired,
    IZComponentFashion {}
