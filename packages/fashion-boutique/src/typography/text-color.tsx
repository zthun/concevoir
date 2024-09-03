import { IZFashion } from "@zthun/fashion-theme";
import { cssJoinDefined, firstDefined } from "@zthun/helpful-fn";
import React from "react";
import { IZComponentFashion } from "../component/component-fashion.mjs";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentName } from "../component/component-name.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { createStyleHook } from "../theme/styled";

export interface IZTextColor
  extends IZComponentHierarchy,
    IZComponentFashion<IZFashion>,
    IZComponentStyle,
    IZComponentName {}

const useTextColorStyles = createStyleHook((_, props: IZTextColor) => {
  const { fashion } = props;
  const color = firstDefined("inherit", fashion?.main);
  return { text: { color } };
});

/**
 * A component that simply wraps a div and sets the inner text color.
 *
 * @param props -
 *        The properties for this component.
 *
 * @returns
 *        The jsx to render the component.
 */
export function ZTextColor(props: IZTextColor) {
  const { children, className, fashion, name } = props;
  const { classes } = useTextColorStyles(props);
  const _fashion = firstDefined("Inherit", fashion?.name);

  return (
    <div
      className={cssJoinDefined("ZTextColor-root", className, classes.text)}
      data-name={name}
      data-fashion={_fashion}
    >
      {children}
    </div>
  );
}
