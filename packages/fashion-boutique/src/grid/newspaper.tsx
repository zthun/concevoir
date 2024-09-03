import { ZSizeVaried } from "@zthun/fashion-tailor";
import { cssJoinDefined } from "@zthun/helpful-fn";
import React from "react";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { IZGrid, ZGrid } from "./grid";
import { ZGridSpan } from "./grid-span";

export type ZNewspaperColumn = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type ZNewspaperRange = [ZNewspaperColumn, ZNewspaperColumn];

export interface IZNewspaper extends IZComponentStyle, IZComponentHierarchy {
  GridProps?: Omit<
    IZGrid,
    | "columns"
    | "columnsLg"
    | "columnsMd"
    | "columnsSm"
    | "columnsXs"
    | "children"
    | "className"
    | "name"
    | "width"
    | "widthLg"
    | "widthMd"
    | "widthSm"
    | "widthXs"
  >;
  range?: ZNewspaperRange;
  rangeLg?: ZNewspaperRange;
  rangeMd?: ZNewspaperRange;
  rangeSm?: ZNewspaperRange;
  rangeXs?: ZNewspaperRange;
}

export function ZNewspaper(props: IZNewspaper) {
  const {
    GridProps,
    className,
    range = [1, 12],
    rangeLg = range,
    rangeMd = rangeLg,
    rangeSm = rangeMd,
    rangeXs = rangeSm,
    children,
  } = props;
  const [start, end] = range;
  const [startLg, endLg] = rangeLg;
  const [startMd, endMd] = rangeMd;
  const [startSm, endSm] = rangeSm;
  const [startXs, endXs] = rangeXs;

  return (
    <ZGrid
      {...GridProps}
      className={cssJoinDefined("ZNewspaper-root", className)}
      columns="1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
      width={ZSizeVaried.Full}
    >
      <ZGridSpan
        columnStart={start}
        columnStartLg={startLg}
        columnStartMd={startMd}
        columnStartSm={startSm}
        columnStartXs={startXs}
        columnEnd={end + 1}
        columnEndLg={endLg + 1}
        columnEndMd={endMd + 1}
        columnEndSm={endSm + 1}
        columnEndXs={endXs + 1}
      >
        {children}
      </ZGridSpan>
    </ZGrid>
  );
}
