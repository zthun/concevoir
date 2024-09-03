import { ZCircusBy, ZCircusComponentModel } from "@zthun/cirque";
import { ZBreadcrumbsComponentModel } from "../breadcrumbs/breadcrumbs.cm.mjs";

/**
 * The component model for the breadcrumb outlet.
 */
export class ZBreadcrumbsOutletComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZBreadcrumbOutlet-root";

  /**
   * Gets the breadcrumbs.
   *
   * @returns
   *        The breadcrumbs component model under this outlet driver.
   */
  public breadcrumbs(): Promise<ZBreadcrumbsComponentModel> {
    return ZCircusBy.first(
      this.driver,
      ZBreadcrumbsComponentModel,
      "outlet-breadcrumbs",
    );
  }
}
