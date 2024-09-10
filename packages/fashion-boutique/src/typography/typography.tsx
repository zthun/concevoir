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
      margin-bottom: ${compact ? 0 : tailor.gap(ZSizeFixed.Large)};
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

export const ZH1 = (props: IZTypographyNamed) => (
  <Typography
    Element="h1"
    {...props}
    size={ZSizeFixed.ExtraLarge}
    weight="black"
  />
);

export const ZH2 = (props: IZTypographyNamed) => (
  <Typography
    Element="h2"
    {...props}
    size={ZSizeFixed.ExtraLarge}
    weight="medium"
  />
);

export const ZH3 = (props: IZTypographyNamed) => (
  <Typography Element="h3" {...props} size={ZSizeFixed.Large} weight="black" />
);

export const ZH4 = (props: IZTypographyNamed) => (
  <Typography Element="h4" {...props} size={ZSizeFixed.Large} weight="medium" />
);

export const ZH5 = (props: IZTypographyNamed) => (
  <Typography Element="h5" {...props} size={ZSizeFixed.Medium} weight="black" />
);

export const ZH6 = (props: IZTypographyNamed) => (
  <Typography
    Element="h6"
    {...props}
    size={ZSizeFixed.Medium}
    weight="medium"
  />
);

export const ZParagraph = (props: IZTypographyNamed) => (
  <Typography Element="p" {...props} size={ZSizeFixed.Small} weight="regular" />
);

export const ZSubtitle = (props: IZTypographyNamed) => (
  <Typography Element="sub" {...props} size={ZSizeFixed.Small} weight="bold" />
);

export const ZCaption = (props: IZTypographyNamed) => (
  <Typography
    Element="sub"
    {...props}
    size={ZSizeFixed.ExtraSmall}
    weight="medium"
  />
);

export const ZOverline = (props: IZTypographyNamed) => (
  <Typography {...props} size={ZSizeFixed.ExtraSmall} weight="light" />
);
