import { List } from "@mui/material";
import { cssJoinDefined } from "@zthun/helpful-fn";
import React from "react";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";

/**
 * Represents properties for the ZList component.
 */
export interface IZList extends IZComponentHierarchy, IZComponentStyle {}

/**
 * Represents a vertical list component.
 *
 * @param props -
 *        The properties for this list.
 *
 * @returns
 *        The JSX to render this component.
 */
export function ZList(props: IZList) {
  const { className, children } = props;

  return (
    <List className={cssJoinDefined("ZList-root", className)}>{children}</List>
  );
}
