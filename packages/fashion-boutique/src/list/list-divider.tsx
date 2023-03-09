import { Divider } from '@mui/material';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React from 'react';
import { IZListItem } from './list-item';

/**
 * Represents a simple list divider
 *
 * @param props -
 *        The properties for this component.
 *
 * @returns
 *        The JSX to render the divider.
 */
export function ZListDivider(props: IZListItem) {
  const { className, name } = props;

  return <Divider className={cssJoinDefined('ZListItem-root', 'ZListItem-divider', className)} data-name={name} />;
}
