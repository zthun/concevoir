import { css } from "@emotion/css";
import { ZSizeFixed, ZSizeVoid } from "@zthun/fashion-tailor";
import { cssJoinDefined, firstDefined, ZOrientation } from "@zthun/helpful-fn";
import { Property } from "csstype";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentName } from "../component/component-name.mjs";
import { IZComponentOrientation } from "../component/component-orientation.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { useFashionTailor } from "../theme/fashion.mjs";

interface IZStack
  extends IZComponentHierarchy,
    IZComponentStyle,
    IZComponentName,
    IZComponentOrientation {
  align?: { items?: Property.AlignItems; content?: Property.AlignContent };
  gap?: ZSizeFixed | ZSizeVoid;
  justify?: {
    items?: Property.JustifyItems;
    content?: Property.JustifyContent;
  };
  inline?: boolean;
}

export function ZStack(props: IZStack) {
  const {
    className,
    align,
    justify,
    gap,
    name,
    orientation,
    children,
    inline,
  } = props;
  const tailor = useFashionTailor();

  const _className = css`
    & {
      align-content: ${align?.content};
      align-items: ${align?.items};
      display: ${inline ? "inline-flex" : "flex"};
      flex-direction: ${orientation === ZOrientation.Horizontal
        ? "row"
        : "column"};
      gap: ${tailor.gap(firstDefined(ZSizeVoid.None, gap))};
      justify-content: ${justify?.content};
      justify-items: ${justify?.items};
    }
  `;

  return (
    <div
      className={cssJoinDefined("ZStack-root", className, _className)}
      data-orientation={orientation}
      data-name={name}
      data-inline={inline}
    >
      {children}
    </div>
  );
}
