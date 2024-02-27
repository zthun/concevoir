import { IZComponentFashion, IZComponentHeight, IZComponentLoading, IZComponentWidth } from '@zthun/fashion-boutique';
import { ZSize, ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { IZComponentName } from '../component/component-name.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';

/**
 * Represents properties for a suspense component.
 */
export interface IZSuspense<TWidth extends ZSize = ZSizeFixed, THeight extends ZSize = ZSizeVaried.Fit>
  extends IZComponentStyle,
    IZComponentWidth<TWidth>,
    IZComponentHeight<THeight>,
    IZComponentLoading,
    IZComponentFashion,
    IZComponentName {}
