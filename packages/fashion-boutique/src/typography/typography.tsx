import { css } from "@emotion/css";
import { ZSizeChartFixed, ZSizeFixed } from "@zthun/fashion-tailor";
import { IZFashion, ZColorPicker } from "@zthun/fashion-theme";
import { cssJoinDefined, firstDefined } from "@zthun/helpful-fn";
import { Property } from "csstype";
import { ElementType } from "react";
import { IZComponentCompact } from "../component/component-compact.mjs";
import { IZComponentDomEvents } from "../component/component-dom-events.mjs";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import {
  useFashionDevice,
  useFashionTailor,
  useFashionTheme,
} from "../theme/fashion.mjs";

export interface IZTypographyNamed
  extends IZComponentHierarchy,
    IZComponentCompact,
    IZComponentDomEvents<HTMLElement>,
    IZComponentStyle {
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
  transform?: Property.TextTransform;
}

const PointChart: ZSizeChartFixed<string> = {
  xs: "0.9rem",
  sm: "1rem",
  md: "1.3rem",
  lg: "2rem",
  xl: "2.5rem",
};

const WeightChart: Record<FontWeight, number> = {
  thin: 100,
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
  black: 900,
};

export function useTypographyCss(props: IZTypography) {
  const { inherit } = useFashionTheme();

  const tailor = useFashionTailor();
  const device = useFashionDevice();

  const { compact, fashion, size, transform, weight } = props;

  const picker = new ZColorPicker(firstDefined(inherit, fashion));
  const _weight = firstDefined("regular", weight);
  const _size = firstDefined(ZSizeFixed.Medium, size);

  return css`
    & {
      color: ${picker.idle.main};
      font-family: Roboto, Arial, sans-serif;
      font-weight: ${WeightChart[_weight]};
      font-size: calc(${PointChart[_size]} * 1.2);
      margin: 0;
      margin-bottom: ${compact ? 0 : tailor.gap(ZSizeFixed.Medium)};
      text-transform: ${transform};
    }

    ${device.break(ZSizeFixed.Large)} {
      & {
        font-size: calc(${PointChart[_size]} * 1.15);
      }
    }

    ${device.break(ZSizeFixed.Medium)} {
      & {
        font-size: calc(${PointChart[_size]} * 1.1);
      }
    }

    ${device.break(ZSizeFixed.Small)} {
      & {
        font-size: calc(${PointChart[_size]} * 1.05);
      }
    }

    ${device.break(ZSizeFixed.ExtraSmall)} {
      & {
        font-size: ${PointChart[_size]};
      }
    }
  `;
}

export function Typography(props: IZTypography) {
  const {
    Element = "div",
    children,
    className,
    compact,
    fashion,
    name,
    size,
    transform,
    weight,
    ...dom
  } = props;

  const _className = useTypographyCss(props);

  return (
    <Element
      {...dom}
      className={cssJoinDefined("ZTypography-root", className, _className)}
      data-compact={compact}
      data-fashion={fashion?.name}
      data-name={name}
      data-size={size}
      data-weight={weight}
      data-transform={transform}
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
    size={ZSizeFixed.Large}
    weight="black"
  />
);

export const ZH3 = ({ className, ...props }: IZTypographyNamed) => (
  <Typography
    Element="h3"
    {...props}
    className={cssJoinDefined("ZH3-root", className)}
    size={ZSizeFixed.Medium}
    weight="black"
  />
);

export const ZH4 = ({ className, ...props }: IZTypographyNamed) => (
  <Typography
    Element="h4"
    {...props}
    className={cssJoinDefined("ZH4-root", className)}
    size={ZSizeFixed.Medium}
    weight="medium"
  />
);

export const ZH5 = ({ className, ...props }: IZTypographyNamed) => (
  <Typography
    Element="h5"
    {...props}
    className={cssJoinDefined("ZH5-root", className)}
    size={ZSizeFixed.Small}
    transform="uppercase"
    weight="bold"
  />
);

export const ZH6 = ({ className, ...props }: IZTypographyNamed) => (
  <Typography
    Element="h6"
    {...props}
    className={cssJoinDefined("ZH6-root", className)}
    size={ZSizeFixed.Small}
    transform="uppercase"
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

export const ZCaption = ({ className, ...props }: IZTypographyNamed) => (
  <Typography
    Element="sub"
    {...props}
    className={cssJoinDefined("ZCaption-root", className)}
    size={ZSizeFixed.ExtraSmall}
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

export const ZButtonText = ({ className, ...props }: IZTypographyNamed) => (
  <Typography
    Element="div"
    {...props}
    className={cssJoinDefined("ZButtonText-root", className)}
    size={ZSizeFixed.Small}
    weight="bold"
    transform="uppercase"
  />
);
