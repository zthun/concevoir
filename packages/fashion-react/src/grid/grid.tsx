import {
  IZComponentHeight,
  IZComponentHierarchy,
  IZComponentWidth,
  ZAlignmentElement,
  ZDeviceElement,
  ZGridElement,
} from "@zthun/fashion-boutique";
import {
  IZDeviceValueMap,
  ZDeviceBounds,
  ZGapSize,
  ZSizeVaried,
} from "@zthun/fashion-tailor";
import { cssJoinDefined } from "@zthun/helpful-fn";
import { Property } from "csstype";
import React, { ReactNode, useMemo } from "react";
import { IZComponentStyle } from "../component/component-style.mjs";
import { useWebComponent } from "../component/use-web-component.mjs";

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ["z-grid"]: ZGridElement & any;
    }
  }
}

export interface IZGrid
  extends IZComponentStyle,
    IZComponentHierarchy<ReactNode>,
    IZComponentHeight<ZSizeVaried>,
    IZComponentWidth<ZSizeVaried> {
  align?: {
    items?: Property.AlignItems;
    content?: Property.AlignContent;
  };
  justify?: {
    items?: Property.JustifyItems;
    content?: Property.JustifyContent;
  };
  gap?: ZGapSize;
  columns?:
    | Property.GridTemplateColumns
    | IZDeviceValueMap<Property.GridTemplateColumns>;
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
  const { align, justify, rows, gap } = props;
  const { columns } = props;
  const { width } = props;
  const { height } = props;

  const $columns = useMemo(
    () => new ZDeviceBounds(columns, "none").toDeviceMap(),
    [columns],
  );
  const $height = useMemo(
    () => new ZDeviceBounds(height, ZSizeVaried.Fit).toDeviceMap(),
    [height],
  );
  const $width = useMemo(
    () => new ZDeviceBounds(width, ZSizeVaried.Fit).toDeviceMap(),
    [width],
  );
  useWebComponent(ZGridElement);
  useWebComponent(ZDeviceElement);
  useWebComponent(ZAlignmentElement);

  return (
    <z-grid class={cssJoinDefined(className)} gap={gap} rows={rows}>
      <z-device
        xl={$columns.xl}
        lg={$columns.lg}
        md={$columns.md}
        sm={$columns.sm}
        xs={$columns.xs}
        name="columns"
      />
      <z-device
        xl={$width.xl}
        lg={$width.lg}
        md={$width.md}
        sm={$width.sm}
        xs={$width.xs}
        name="width"
      />
      <z-device
        xl={$height.xl}
        lg={$height.lg}
        md={$height.md}
        sm={$height.sm}
        xs={$height.xs}
        name="height"
      />
      <z-alignment items={align?.items} content={align?.content} name="align" />
      <z-alignment
        items={justify?.items}
        content={justify?.content}
        name="justify"
      />

      {children}
    </z-grid>
  );
}
