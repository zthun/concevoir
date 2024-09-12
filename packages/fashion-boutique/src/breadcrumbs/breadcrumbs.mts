import { IZComponentName } from "../component/component-name.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";

export interface IZBreadcrumbs extends IZComponentStyle, IZComponentName {
  onPathSelected?(path: string): void;
}
