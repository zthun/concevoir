import { cssJoinDefined } from "@zthun/helpful-fn";
import { Property } from "csstype";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";

export interface IZFlex extends IZComponentHierarchy, IZComponentStyle {
  basis?: Property.FlexBasis;
  grow?: Property.FlexGrow;
  shrink?: Property.FlexShrink;
}

export function ZFlex(props: IZFlex) {
  const { basis, children, className, grow, shrink } = props;

  return (
    <div
      className={cssJoinDefined("ZFlex-root", className)}
      style={{ flexBasis: basis, flexGrow: grow, flexShrink: shrink }}
    >
      {children}
    </div>
  );
}
