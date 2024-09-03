import { css } from "@zthun/helpful-fn";
import {
  IZComponentRender,
  ZComponentClass,
  ZComponentCss,
  ZComponentRegister,
} from "@zthun/spellcraft";

export interface ZFullScreenElement extends IZComponentRender {}

@ZComponentRegister("z-full-screen")
@ZComponentClass("ZFullScreen-root")
@ZComponentCss(
  css`
    .ZFullScreen-root {
      height: 100vh;
      left: 0;
      position: fixed;
      top: 0;
      width: 100vw;
    }
  `,
  { id: "ZFullScreen-styles" },
)
export class ZFullScreenElement extends HTMLElement {}
