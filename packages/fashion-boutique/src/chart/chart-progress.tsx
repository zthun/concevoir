import { LinearProgress } from "@mui/material";
import {
  ZDeviceValues,
  ZSizeFixed,
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
} from "@zthun/fashion-tailor";
import { cssJoinDefined, firstDefined } from "@zthun/helpful-fn";
import { useMemo } from "react";
import { IZComponentHeight } from "../component/component-height.mjs";
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
    const { height, points } = props;
    const { primary, transparent } = theme;
    const { fashion = primary } = points;
    const _height = new ZDeviceValues(height, ZSizeFixed.Medium);

    const border = firstDefined(fashion.idle.main, fashion.idle.border);

    return {
      bar: {
        height: progressHeightChart[_height.xl],
        backgroundColor: transparent.idle.main,
        border: `${tailor.thickness()} solid ${border}`,

        ".MuiLinearProgress-bar": {
          backgroundColor: fashion.idle.main,
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
        <ZGrid columns="1fr auto" gap={ZSizeFixed.Small} alignItems="center">
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
