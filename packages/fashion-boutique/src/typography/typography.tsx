import { css } from "@emotion/css";
import { ZSizeChartFixed, ZSizeFixed } from "@zthun/fashion-tailor";
import { IZFashion, ZColorPicker } from "@zthun/fashion-theme";
import { cssJoinDefined, firstDefined } from "@zthun/helpful-fn";
import { ElementType } from "react";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import {
  useFashionDevice,
  useFashionTailor,
  useFashionTheme,
} from "../theme/fashion.mjs";

export interface IZTypographyNamed
  extends IZComponentHierarchy,
    IZComponentStyle {
  compact?: boolean;
  Element?: ElementType;
  fashion?: IZFashion;
  name?: string;
}

export type FontWeight =
  | "thin"
  | "light"
  | "regular"
  | "medium"
  | "bold"
  | "black";

export interface IZTypography extends IZTypographyNamed {
  size?: ZSizeFixed;
  weight?: FontWeight;
}

const PointChart: ZSizeChartFixed<string> = {
  xs: "0.9rem",
  sm: "1rem",
  md: "1.3rem",
  lg: "2rem",
  xl: "2.3rem",
};

const WeightChart: Record<FontWeight, number> = {
  thin: 100,
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
  black: 900,
};

export function Typography(props: IZTypography) {
  const tailor = useFashionTailor();
  const device = useFashionDevice();
  const { inherit } = useFashionTheme();

  const {
    Element = "div",
    children,
    className,
    compact,
    fashion,
    name,
    size,
    weight,
  } = props;

  const picker = new ZColorPicker(firstDefined(inherit, fashion));
  const _weight = firstDefined("regular", weight);
  const _size = firstDefined(ZSizeFixed.Medium, size);

  const _className = css`
    & {
      color: ${picker.idle.main};
      font-family: Roboto, Arial, sans-serif;
      font-weight: ${WeightChart[_weight]};
      font-size: ${PointChart[_size]};
      margin: 0;
      margin-bottom: ${compact ? 0 : tailor.gap(ZSizeFixed.Medium)};
    }

    ${device.break(ZSizeFixed.Large)} {
      & {
        font-size: calc(${PointChart[_size]} * 0.95);
      }
    }

    ${device.break(ZSizeFixed.Medium)} {
      & {
        font-size: calc(${PointChart[_size]} * 0.9);
      }
    }

    ${device.break(ZSizeFixed.Small)} {
      & {
        font-size: calc(${PointChart[_size]} * 0.85);
      }
    }

    ${device.break(ZSizeFixed.ExtraSmall)} {
      & {
        font-size: calc(${PointChart[_size]} * 0.8);
      }
    }
  `;

  return (
    <Element
      className={cssJoinDefined("ZTypography-root", className, _className)}
      data-compact={compact}
      data-fashion={fashion?.name}
      data-name={name}
      data-size={size}
      data-weight={weight}
    >
      {children}
    </Element>
  );
}

export const ZH1 = ({ className, ...props }: IZTypographyNamed) => (
  <Typography
    Element="h1"
    {...props}
    className={cssJoinDefined("ZH1-root", className)}
    size={ZSizeFixed.ExtraLarge}
    weight="black"
  />
);

export const ZH2 = ({ className, ...props }: IZTypographyNamed) => (
  <Typography
    Element="h2"
    {...props}
    className={cssJoinDefined("ZH2-root", className)}
    size={ZSizeFixed.ExtraLarge}
    weight="medium"
  />
);

export const ZH3 = ({ className, ...props }: IZTypographyNamed) => (
  <Typography
    Element="h3"
    {...props}
    className={cssJoinDefined("ZH3-root", className)}
    size={ZSizeFixed.Large}
    weight="black"
  />
);

export const ZH4 = ({ className, ...props }: IZTypographyNamed) => (
  <Typography
    Element="h4"
    {...props}
    className={cssJoinDefined("ZH4-root", className)}
    size={ZSizeFixed.Large}
    weight="medium"
  />
);

export const ZH5 = ({ className, ...props }: IZTypographyNamed) => (
  <Typography
    Element="h5"
    {...props}
    className={cssJoinDefined("ZH5-root", className)}
    size={ZSizeFixed.Medium}
    weight="black"
  />
);

export const ZH6 = ({ className, ...props }: IZTypographyNamed) => (
  <Typography
    Element="h6"
    {...props}
    className={cssJoinDefined("ZH6-root", className)}
    size={ZSizeFixed.Medium}
    weight="medium"
  />
);

export const ZParagraph = ({ className, ...props }: IZTypographyNamed) => (
  <Typography
    Element="p"
    {...props}
    className={cssJoinDefined("ZParagraph-root", className)}
    size={ZSizeFixed.Small}
    weight="regular"
  />
);

export const ZSubtitle = ({ className, ...props }: IZTypographyNamed) => (
  <Typography
    Element="sub"
    {...props}
    className={cssJoinDefined("ZSubtitle-root", className)}
    size={ZSizeFixed.Small}
    weight="bold"
  />
);

export const ZCaption = ({ className, ...props }: IZTypographyNamed) => (
  <Typography
    Element="sub"
    {...props}
    className={cssJoinDefined("ZCaption-root", className)}
    size={ZSizeFixed.ExtraSmall}
    weight="medium"
  />
);

export const ZOverline = ({ className, ...props }: IZTypographyNamed) => (
  <Typography
    Element="div"
    {...props}
    className={cssJoinDefined("ZOverline-root", className)}
    size={ZSizeFixed.ExtraSmall}
    weight="light"
  />
);
