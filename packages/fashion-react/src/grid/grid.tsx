import { IZGridTarget, ZGridColumns, ZGridElement } from '@zthun/fashion-boutique';
import { IZDeviceValueMap, ZGapSize, ZSizeVaried } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import React, { MutableRefObject, useEffect, useRef } from 'react';
import { IZComponentHeight } from '../component/component-height.mjs';
import { IZComponentHierarchy } from '../component/component-hierarchy.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';
import { IZComponentWidth } from '../component/component-width.mjs';
import { useHeightWebComponent, useWidthWebComponent } from '../web-components/use-web-component.mjs';

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
  align?: IZGridTarget<Property.AlignItems, Property.AlignContent>;
  justify?: IZGridTarget<Property.JustifyItems, Property.JustifyContent>;
  gap?: ZGapSize;
  columns?: Property.GridTemplateColumns | IZDeviceValueMap<Property.GridTemplateColumns>;
  rows?: Property.GridTemplateRows;
}

function useColumnsGridWebComponent(
  component: MutableRefObject<ZGridElement | null | undefined>,
  columns: ZGridColumns | undefined
) {
  useEffect(() => {
    component.current!.columns = columns;
  }, [component.current, columns]);
}

function useAlignGridWebComponent(
  component: MutableRefObject<ZGridElement | null | undefined>,
  align: IZGridTarget<Property.AlignItems, Property.AlignContent> | undefined
) {
  useEffect(() => {
    component.current!.align = align;
  }, [component.current, align]);
}

function useJustifyGridWebComponent(
  component: MutableRefObject<ZGridElement | null | undefined>,
  justify: IZGridTarget<Property.AlignItems, Property.AlignContent> | undefined
) {
  useEffect(() => {
    component.current!.justify = justify;
  }, [component.current, justify]);
}

function useGapGridWebComponent(
  component: MutableRefObject<ZGridElement | null | undefined>,
  gap: ZGapSize | undefined
) {
  useEffect(() => {
    component.current!.gap = gap;
  }, [component.current, gap]);
}

function useRowsGridWebComponent(
  component: MutableRefObject<ZGridElement | null | undefined>,
  rows: Property.GridTemplateRows | undefined
) {
  useEffect(() => {
    component.current!.rows = rows;
  }, [component.current, rows]);
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
  const { align, justify, rows, gap } = props;
  const { columns } = props;
  const { width } = props;
  const { height } = props;

  useEffect(() => ZGridElement.register(), []);

  const grid = useRef<ZGridElement>();
  useColumnsGridWebComponent(grid, columns);
  useAlignGridWebComponent(grid, align);
  useJustifyGridWebComponent(grid, justify);
  useHeightWebComponent(grid, height);
  useWidthWebComponent(grid, width);
  useGapGridWebComponent(grid, gap);
  useRowsGridWebComponent(grid, rows);

  return (
    <z-grid class={cssJoinDefined(className)} ref={grid}>
      {children}
    </z-grid>
  );
}
