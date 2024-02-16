import { ZSizeFixed } from './fixed/size-fixed.mjs';
import { ZSizeVaried } from './varied/size-varied.mjs';
import { ZSizeVoid } from './void/size-void.mjs';

/**
 * A sizing object that can be one any of the valid enum sizes.
 */
export type ZSize = ZSizeFixed | ZSizeVaried | ZSizeVoid;

/**
 * A sizing object that represents thickness.
 */
export type ZThicknessSize = ZSizeFixed | ZSizeVoid;

/**
 * A sizing object that represents gaps.
 */
export type ZGapSize = ZSizeFixed | ZSizeVoid;

/**
 * A sizing object that represents space.
 */
export type ZSpaceSize = ZSizeFixed | ZSizeVaried;

/**
 * Represents a chart that maps a size to more useable values.
 */
export type ZSizeChart<T> = Record<ZSize, T>;
