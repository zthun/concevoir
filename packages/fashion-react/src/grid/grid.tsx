import { ZGridElement } from '@zthun/fashion-boutique';
import { ZSizeFixed, ZSizeVaried, ZSizeVoid } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import React, { useEffect } from 'react';
import { IZComponentHeight } from '../component/component-height.mjs';
import { IZComponentHierarchy } from '../component/component-hierarchy.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';
import { IZComponentWidth } from '../component/component-width.mjs';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-grid']: ZGridElement & any;
    }
  }
}

export interface IZGrid
  extends IZComponentStyle,
    IZComponentHierarchy,
    IZComponentHeight<ZSizeVaried>,
    IZComponentWidth<ZSizeVaried> {
  alignItems?: Property.AlignItems;
  justifyItems?: Property.JustifyItems;
  alignContent?: Property.AlignContent;
  justifyContent?: Property.JustifyContent;
  gap?: ZSizeFixed | ZSizeVoid;
  columns?: Property.GridTemplateColumns;
  columnsLg?: Property.GridTemplateColumns;
  columnsMd?: Property.GridTemplateColumns;
  columnsSm?: Property.GridTemplateColumns;
  columnsXs?: Property.GridTemplateColumns;
  rows?: Property.GridTemplateRows;
}

/**
 * Represents a layout that lines up items using CSS Grid.
 *
 * @param props -
 *        The properties for this component.
 *
 * @returns
 *        The JSX used to render this layout.
 */
export function ZGrid(props: IZGrid) {
  const { className, children } = props;
  const { alignItems, justifyItems, alignContent, justifyContent, rows, gap } = props;
  const { columns, columnsLg, columnsMd, columnsSm, columnsXs } = props;
  const { width, widthLg, widthMd, widthSm, widthXs } = props;
  const { height, heightLg, heightMd, heightSm, heightXs } = props;

  useEffect(() => ZGridElement.register(), []);

  return (
    <z-grid
      class={cssJoinDefined(className)}
      align-content={alignContent}
      align-items={alignItems}
      justify-items={justifyItems}
      justify-content={justifyContent}
      columns={columns}
      columns-lg={columnsLg}
      columns-md={columnsMd}
      columns-sm={columnsSm}
      columns-xs={columnsXs}
      width={width}
      widthLg={widthLg}
      widthMd={widthMd}
      widthSm={widthSm}
      widthXs={widthXs}
      height={height}
      heightLg={heightLg}
      heightMd={heightMd}
      heightSm={heightSm}
      heightXs={heightXs}
      rows={rows}
      gap={gap}
    >
      {children}
    </z-grid>
  );
}
