import { LinearProgress } from "@mui/material";
import {
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
  ZDeviceValues,
  ZSizeFixed,
  ZSizeVaried,
} from "@zthun/fashion-tailor";
import { cssJoinDefined, firstDefined } from "@zthun/helpful-fn";
import { createStyleHook } from "../theme/styled";
import { IZSuspense } from "./suspense.mjs";

const SuspenseProgressSizeChart = createSizeChartFixedCss(
  createSizeChartFixedArithmetic(0.25, 0.25),
  "rem",
);

const useSuspenseProgressStyles = createStyleHook(
  (_, props: IZSuspense<ZSizeVaried.Full, ZSizeFixed>) => {
    const { height = ZSizeFixed.ExtraSmall, fashion } = props;
    const _height = new ZDeviceValues(height);
    const color = firstDefined("inherit", fashion?.idle.main);

    return {
      root: {
        height: SuspenseProgressSizeChart[_height.xl],
        color,
      },
    };
  },
);

/**
 * Renders a line bar suspense.
 *
 * @param props -
 *        The properties for the component.
 *
 * @returns The jsx for the component.
 */
export function ZSuspenseProgress(
  props: IZSuspense<ZSizeVaried.Full, ZSizeFixed>,
) {
  const {
    className,
    loading = true,
    height = ZSizeFixed.ExtraSmall,
    name,
    fashion,
  } = props;
  const { classes } = useSuspenseProgressStyles(props);
  const _fashion = firstDefined("Inherit", fashion?.name);

  if (!loading) {
    return null;
  }

  return (
    <LinearProgress
      className={cssJoinDefined(
        "ZSuspense-root",
        "ZSuspense-progress",
        className,
        classes.root,
      )}
      color="inherit"
      data-name={name}
      data-width={ZSizeVaried.Full}
      data-height={height}
      data-fashion={_fashion}
    />
  );
}
