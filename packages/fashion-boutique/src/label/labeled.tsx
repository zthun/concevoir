import { ZSizeFixed, ZSizeVoid } from "@zthun/fashion-tailor";
import { ZOrientation, cssJoinDefined } from "@zthun/helpful-fn";
import { IZComponentDomEvents } from "../component/component-dom-events.mjs";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentLabel } from "../component/component-label.mjs";
import { IZComponentName } from "../component/component-name.mjs";
import { IZComponentOrientation } from "../component/component-orientation.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { ZStack } from "../stack/stack";
import { IZLabel, ZLabel } from "./label";

export interface IZLabeled
  extends IZComponentName,
    IZComponentLabel,
    IZComponentStyle,
    IZComponentDomEvents<HTMLDivElement>,
    IZComponentOrientation,
    IZComponentHierarchy {
  LabelProps?: IZLabel;
  gap?: ZSizeVoid | ZSizeFixed;
  position?: "prefix" | "suffix";
}

export function ZLabeled(props: IZLabeled) {
  const {
    children,
    className,
    label,
    name,
    gap = ZSizeFixed.ExtraSmall,
    orientation = ZOrientation.Vertical,
    LabelProps,
    position = "prefix",
    ...dom
  } = props;
  const renderLabel = (_position: "prefix" | "suffix") =>
    position === _position && label && <ZLabel {...LabelProps}>{label}</ZLabel>;

  return (
    <ZStack
      {...dom}
      className={cssJoinDefined("ZLabeled-root", className)}
      orientation={orientation}
      gap={gap}
      name={name}
    >
      {renderLabel("prefix")}
      <ZStack inline>{children}</ZStack>
      {renderLabel("suffix")}
    </ZStack>
  );
}
