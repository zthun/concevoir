import { ZSizeFixed } from "@zthun/fashion-tailor";
import { cssJoinDefined } from "@zthun/helpful-fn";
import { ZBox } from "../box/box";
import {
  IZBreadcrumbsLocation,
  ZBreadcrumbsLocation,
} from "../breadcrumbs/breadcrumbs-location";
import { IZComponentName } from "../component/component-name.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { ZOutlet } from "../router/router-dom.mjs";

/**
 * The properties for the breadcrumb outlet.
 */
export interface IZBreadcrumbsOutlet extends IZComponentStyle, IZComponentName {
  /**
   * The properties for the underlying breadcrumb location component.
   */
  breadcrumbsProps?: Omit<IZBreadcrumbsLocation, "name">;
}

/**
 * Represents a layout where breadcrumbs are displayed on top of the current router outlet.
 */
export function ZBreadcrumbsOutlet(props: IZBreadcrumbsOutlet) {
  const { className, name, breadcrumbsProps } = props;

  return (
    <div
      className={cssJoinDefined("ZBreadcrumbOutlet-root", className)}
      data-name={name}
    >
      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZBreadcrumbsLocation {...breadcrumbsProps} name="outlet-breadcrumbs" />
      </ZBox>
      <ZOutlet />
    </div>
  );
}
