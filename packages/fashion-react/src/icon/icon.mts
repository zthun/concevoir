import {
  IZComponentFashion,
  IZComponentName,
  IZComponentWidth,
} from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { KeyboardEvent, MouseEvent } from "react";
import { IZComponentStyle } from "../component/component-style.mjs";

export interface IZIcon
  extends IZComponentName,
    IZComponentStyle,
    IZComponentWidth<ZSizeFixed>,
    IZComponentFashion {
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
  tooltip?: string;
}
