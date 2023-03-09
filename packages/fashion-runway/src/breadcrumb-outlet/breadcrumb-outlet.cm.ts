import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZBreadcrumbsComponentModel } from '@zthun/fashion-boutique';

/**
 * The component model for the breadcrumb outlet.
 */
export class ZBreadcrumbOutletComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZBreadcrumbOutlet-root';

  /**
   * Gets the breadcrumbs.
   *
   * @returns
   *        The breadcrumbs component model under this outlet driver.
   */
  public breadcrumbs(): Promise<ZBreadcrumbsComponentModel> {
    return ZCircusBy.first(this.driver, ZBreadcrumbsComponentModel, 'outlet-breadcrumbs');
  }
}
