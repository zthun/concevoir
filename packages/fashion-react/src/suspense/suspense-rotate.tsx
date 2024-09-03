import {
  ZDeviceElement,
  ZSuspenseRotateElement,
} from "@zthun/fashion-boutique";
import { ZDeviceBounds, ZSizeFixed } from "@zthun/fashion-tailor";
import { cssJoinDefined, firstTruthy } from "@zthun/helpful-fn";
import React, { useMemo } from "react";
import { useWebComponent } from "../component/use-web-component.mjs";
import { IZSuspense } from "./suspense.mjs";

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ["z-suspense-rotate"]: ZSuspenseRotateElement & any;
    }
  }
}

export function ZSuspenseRotate(props: IZSuspense) {
  const { className, loading = true, name, width, fashion } = props;

  const $width = useMemo(
    () => new ZDeviceBounds(width, ZSizeFixed.ExtraSmall).toDeviceMap(),
    [width],
  );
  useWebComponent(ZSuspenseRotateElement);
  useWebComponent(ZDeviceElement);

  return (
    <z-suspense-rotate
      class={cssJoinDefined(className)}
      fashion={fashion}
      disabled={firstTruthy(undefined, !loading)}
      name={name}
    >
      <z-device
        xl={$width.xl}
        lg={$width.lg}
        md={$width.md}
        sm={$width.sm}
        xs={$width.xs}
        name="width"
      />
    </z-suspense-rotate>
  );
}
