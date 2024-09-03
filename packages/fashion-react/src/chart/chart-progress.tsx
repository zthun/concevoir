import { LinearProgress } from "@mui/material";
import { IZComponentHeight } from "@zthun/fashion-boutique";
import {
  ZSizeFixed,
  castDeviceMap,
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
} from "@zthun/fashion-tailor";
import { cssJoinDefined, firstDefined } from "@zthun/helpful-fn";
import React, { useMemo } from "react";
import { ZGrid } from "../grid/grid";
import { ZLabeled } from "../label/labeled";
import { createStyleHook } from "../theme/styled";
import { IZChart } from "./chart.mjs";
import { IZDataPoint } from "./data-point.mjs";

const progressHeightChart = {
  ...createSizeChartFixedCss(createSizeChartFixedArithmetic(1, 1), "rem"),
};

export interface IZChartProgress
  extends IZChart<IZDataPoint>,
    IZComponentHeight<ZSizeFixed> {}

const useChartProgressStyles = createStyleHook(
  ({ theme, tailor }, props: IZChartProgress) => {
    const { height = ZSizeFixed.Medium, points } = props;
    const { primary, transparent } = theme;
    const { fashion = primary } = points;

    const border = firstDefined(fashion.main, fashion.dark);

    return {
      bar: {
        height:
          progressHeightChart[castDeviceMap(height, ZSizeFixed.Medium).xl],
        backgroundColor: transparent.main,
        border: `${tailor.thickness()} solid ${border}`,

        ".MuiLinearProgress-bar": {
          backgroundColor: fashion.main,
        },
      },
    };
  },
);

export function ZChartProgress(props: IZChartProgress) {
  const { points, name } = props;
  const { x, y, name: label, fashion } = points;
  const { classes } = useChartProgressStyles(props);

  const _y = useMemo(() => Math.max(y, 0), [y]);
  const _x = useMemo(() => Math.max(x, 0), [x]);
  const _per = useMemo(() => (_x / _y) * 100, [_y, _x]);

  const _label = useMemo(() => `${label} (${_x} / ${_y})`, [label, _x, _y]);

  return (
    <div
      className={cssJoinDefined("ZChart-root", "ZChart-progress")}
      data-name={name}
    >
      <ZLabeled label={_label}>
        <ZGrid
          columns="1fr auto"
          gap={ZSizeFixed.Small}
          align={{ items: "center" }}
        >
          <LinearProgress
            className={cssJoinDefined("ZChart-point", classes.bar)}
            variant="determinate"
            value={_per}
            data-x={_x}
            data-y={_y}
            data-name={label}
            data-fashion={fashion?.name}
          />
        </ZGrid>
      </ZLabeled>
    </div>
  );
}
