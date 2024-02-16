import { ListSubheader } from '@mui/material';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React from 'react';
import { IZComponentHeading } from '../component/component-heading.mjs';
import { IZListItem } from './list-item.mjs';

/**
 * Represents the properties for a list group component.
 */
export interface IZListGroup extends IZListItem, Pick<IZComponentHeading, 'heading'> {}

/**
 * Represents a list item that sections off other list items.
 *
 * @param props -
 *        The properties for this component.
 *
 * @returns
 *        The JSX to render this component.
 */
export function ZListGroup(props: IZListGroup) {
  const { className, name, heading } = props;

  return (
    <ListSubheader
      sx={{ background: 'transparent', color: 'inherit', opacity: 0.6 }}
      className={cssJoinDefined('ZListItem-root', 'ZListItem-group', className)}
      data-name={name}
    >
      {heading}
    </ListSubheader>
  );
}
