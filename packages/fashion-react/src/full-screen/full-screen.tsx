import {
  IZComponentHierarchy,
  ZFullScreenElement,
} from "@zthun/fashion-boutique";
import React, { ReactNode } from "react";
import { useWebComponent } from "../component/use-web-component.mjs";

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ["z-full-screen"]: ZFullScreenElement & any;
    }
  }
}
export function ZFullScreen(props: IZComponentHierarchy<ReactNode>) {
  const { children } = props;
  useWebComponent(ZFullScreenElement);
  return <z-full-screen>{children}</z-full-screen>;
}
