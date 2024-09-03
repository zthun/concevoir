import { IZComponentName } from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { cssJoinDefined } from "@zthun/helpful-fn";
import React from "react";
import { ZBox } from "../box/box";
import {
  IZBreadcrumbsLocation,
  ZBreadcrumbsLocation,
} from "../breadcrumbs/breadcrumbs-location";
import { IZComponentStyle } from "../component/component-style.mjs";
import { ZOutlet } from "../router/router-dom.mjs";

/**
 * The properties for the breadcrumb outlet.
 */
export interface IZBreadcrumbsOutlet extends IZComponentStyle, IZComponentName {
  /**
   * The properties for the underlying breadcrumb location component.
   */
  BreadcrumbsProps?: Omit<IZBreadcrumbsLocation, "name">;
}

/**
 * Represents a layout where breadcrumbs are displayed on top of the current router outlet.
 */
export function ZBreadcrumbsOutlet(props: IZBreadcrumbsOutlet) {
  const { className, name, BreadcrumbsProps } = props;

  return (
    <div
      className={cssJoinDefined("ZBreadcrumbOutlet-root", className)}
      data-name={name}
    >
      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZBreadcrumbsLocation {...BreadcrumbsProps} name="outlet-breadcrumbs" />
      </ZBox>
      <ZOutlet />
    </div>
  );
}
