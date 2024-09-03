import { IZComponentName, ZYouTubeVideoElement } from "@zthun/fashion-boutique";
import { cssJoinDefined } from "@zthun/helpful-fn";
import React from "react";
import { IZComponentStyle } from "../component/component-style.mjs";
import { useWebComponent } from "../component/use-web-component.mjs";

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ["z-you-tube-video"]: ZYouTubeVideoElement & any;
    }
  }
}

export interface IZYouTubeVideo extends IZComponentName, IZComponentStyle {
  identity: string;
}

export function ZYouTubeVideo(props: IZYouTubeVideo) {
  const { identity, className, name } = props;
  useWebComponent(ZYouTubeVideoElement);

  return (
    <z-you-tube-video
      class={cssJoinDefined(className)}
      identity={identity}
      name={name}
    />
  );
}
