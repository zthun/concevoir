import { List } from '@mui/material';
import { IZComponentHierarchy } from '@zthun/fashion-boutique';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React, { ReactNode } from 'react';
import { IZComponentStyle } from '../component/component-style.mjs';

/**
 * Represents properties for the ZList component.
 */
export interface IZList extends IZComponentHierarchy<ReactNode>, IZComponentStyle {}

/**
 * Represents a vertical list component.
 *
 * @param props -
 *        The properties for this list.
 *
 * @returns
 *        The JSX to render this component.
 */
export function ZList(props: IZList) {
  const { className, children } = props;

  return <List className={cssJoinDefined('ZList-root', className)}>{children}</List>;
}
