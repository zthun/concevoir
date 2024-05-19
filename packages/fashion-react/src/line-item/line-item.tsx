import { IZComponentPrefix, IZComponentSuffix } from '@zthun/fashion-boutique';
import { ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React, { ReactNode } from 'react';
import { IZComponentStyle } from '../component/component-style.mjs';
import { ZGrid } from '../grid/grid';

export interface IZLineItem extends IZComponentStyle, IZComponentPrefix<ReactNode>, IZComponentSuffix<ReactNode> {
  body?: ReactNode;
}

/**
 * Represents a simple flex 0-1-0 component.
 *
 * @param props -
 *        The properties to the line item.
 *
 * @returns
 *        The JSX element to render the line item.
 *
 */
export function ZLineItem(props: IZLineItem) {
  const { className, prefix, body, suffix } = props;

  return (
    <ZGrid
      className={cssJoinDefined('ZLineItem-root', className)}
      columns='auto 1fr auto'
      align={{ items: 'center' }}
      gap={ZSizeFixed.Small}
      width={ZSizeVaried.Full}
    >
      <div className={cssJoinDefined('ZLineItem-prefix')}>{prefix}</div>
      <div className={cssJoinDefined('ZLineItem-body')}>{body}</div>
      <div className={cssJoinDefined('ZLineItem-suffix')}>{suffix}</div>
    </ZGrid>
  );
}
