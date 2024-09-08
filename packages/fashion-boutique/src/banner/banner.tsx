import { AppBar } from "@mui/material";
import {
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
  createSizeChartVariedCss,
  ZSizeFixed,
  ZSizeVaried,
} from "@zthun/fashion-tailor";
import { cssJoinDefined, firstDefined } from "@zthun/helpful-fn";
import { IZComponentFashion } from "../component/component-fashion.mjs";
import { IZComponentHeight } from "../component/component-height.mjs";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { createStyleHook } from "../theme/styled";

/**
 * Properties for the banner bar.
 */
export interface IZBanner
  extends IZComponentHierarchy,
    IZComponentFashion,
    Pick<IZComponentHeight<ZSizeFixed | ZSizeVaried.Fit>, "height">,
    IZComponentStyle {
  position?: "fixed" | "absolute" | "sticky" | "static" | "relative";
}

const heightChart = {
  ...createSizeChartFixedCss(createSizeChartFixedArithmetic(1, 1), "rem"),
  ...createSizeChartVariedCss(),
};

const useBannerStyles = createStyleHook(({ theme }, props: IZBanner) => {
  const { primary } = theme;
  const { fashion, height } = props;

  const _height = firstDefined(ZSizeVaried.Fit, height);
  const __height = heightChart[_height];
  const _fashion = firstDefined(primary, fashion);

  return {
    banner: {
      backgroundColor: _fashion.idle.main,
      color: _fashion.idle.contrast,
      height: __height,
    },
  };
});

export function ZBanner(props: IZBanner) {
  const { children, className, position } = props;
  const { classes } = useBannerStyles(props);

  return (
    <AppBar
      className={cssJoinDefined("ZBanner-root", className, classes.banner)}
      position={position}
    >
      {children}
    </AppBar>
  );
}
