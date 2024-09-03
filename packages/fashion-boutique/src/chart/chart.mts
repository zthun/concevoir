import { IZComponentName } from "../component/component-name.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { IZDataPoint } from "./data-point.mjs";

export interface IZChart<TPoint = IZDataPoint[]>
  extends IZComponentName,
    IZComponentStyle {
  points: TPoint;
}
