import { IZComponentHeight, IZComponentWidth } from '@zthun/fashion-boutique';
import { ZSize, ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { IZComponentFashion } from '../component/component-fashion.mjs';
import { IZComponentLoading } from '../component/component-loading.mjs';
import { IZComponentName } from '../component/component-name.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';

/**
 * Represents properties for a suspense component.
 */
export interface IZSuspense<TWidth extends ZSize = ZSizeFixed, THeight extends ZSize = ZSizeVaried.Fit>
  extends IZComponentStyle,
    Pick<IZComponentWidth<TWidth>, 'width'>,
    Pick<IZComponentHeight<THeight>, 'height'>,
    IZComponentLoading,
    IZComponentFashion,
    IZComponentName {}
