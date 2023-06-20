import { ZSize, ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { IZComponentFashion } from '../component/component-fashion';
import { IZComponentHeight } from '../component/component-height';
import { IZComponentLoading } from '../component/component-loading';
import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentWidth } from '../component/component-width';

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
