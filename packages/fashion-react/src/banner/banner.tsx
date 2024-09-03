import {
  IZComponentFashion,
  IZComponentHeight,
  IZComponentHierarchy,
  ZBannerElement,
  ZDeviceElement,
} from "@zthun/fashion-boutique";
import { ZDeviceBounds, ZSizeFixed, ZSizeVaried } from "@zthun/fashion-tailor";
import { cssJoinDefined } from "@zthun/helpful-fn";
import React, { ReactNode, useMemo } from "react";
import { IZComponentStyle } from "../component/component-style.mjs";

import { useWebComponent } from "../component/use-web-component.mjs";

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ["z-banner"]: ZBannerElement & any;
    }
  }
}

export interface IZBanner
  extends IZComponentHierarchy<ReactNode>,
    IZComponentFashion,
    Pick<IZComponentHeight<ZSizeFixed | ZSizeVaried.Fit>, "height">,
    IZComponentStyle {}

export function ZBanner(props: IZBanner) {
  const { children, className, fashion, height } = props;
  const $height = useMemo(
    () => new ZDeviceBounds(height, ZSizeVaried.Fit).toDeviceMap(),
    [height],
  );
  useWebComponent(ZBannerElement);
  useWebComponent(ZDeviceElement);

  return (
    <z-banner class={cssJoinDefined(className)} fashion={fashion}>
      <z-device
        xl={$height.xl}
        lg={$height.lg}
        md={$height.md}
        sm={$height.sm}
        xs={$height.xs}
        name="height"
      />
      {children}
    </z-banner>
  );
}
