import { DOMAttributes } from "react";

export interface IZComponentDomEvents<T>
  extends Omit<DOMAttributes<T>, "children" | "dangerouslySetInnerHTML"> {}
