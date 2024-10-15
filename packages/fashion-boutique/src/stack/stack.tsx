import { ZSizeFixed, ZSizeVoid } from "@zthun/fashion-tailor";
import { cssJoinDefined, firstDefined, ZOrientation } from "@zthun/helpful-fn";
import { Property } from "csstype";
import { IZComponentDomEvents } from "../component/component-dom-events.mjs";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentName } from "../component/component-name.mjs";
import { IZComponentOrientation } from "../component/component-orientation.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { useFashionTailor } from "../theme/fashion.mjs";

export interface IZStack
  extends IZComponentHierarchy,
    IZComponentStyle,
    IZComponentName,
    IZComponentDomEvents<HTMLDivElement>,
    IZComponentOrientation {
  align?: { items?: Property.AlignItems; content?: Property.AlignContent };
  gap?: ZSizeFixed | ZSizeVoid;
  justify?: {
    items?: Property.JustifyItems;
    content?: Property.JustifyContent;
  };
  inline?: boolean;
  wrap?: Property.FlexWrap;
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
    wrap,
    ...dom
  } = props;
  const tailor = useFashionTailor();

  return (
    <div
      className={cssJoinDefined("ZStack-root", className)}
      style={{
        alignContent: align?.content,
        alignItems: align?.items,
        display: inline ? "inline-flex" : "flex",
        flexDirection:
          orientation === ZOrientation.Horizontal ? "row" : "column",
        gap: tailor.gap(firstDefined(ZSizeVoid.None, gap)),
        justifyContent: justify?.content,
        justifyItems: justify?.items,
        flexWrap: wrap,
      }}
      {...dom}
      data-orientation={orientation}
      data-name={name}
      data-inline={inline}
    >
      {children}
    </div>
  );
}
