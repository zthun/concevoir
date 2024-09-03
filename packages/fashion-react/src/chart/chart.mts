import { IZComponentName } from "@zthun/fashion-boutique";
import { IZComponentStyle } from "../component/component-style.mjs";
import { IZDataPoint } from "./data-point.mjs";

export interface IZChart<TPoint = IZDataPoint[]>
  extends IZComponentName,
    IZComponentStyle {
  points: TPoint;
}
