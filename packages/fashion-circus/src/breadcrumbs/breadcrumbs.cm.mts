import { ZCircusComponentModel } from '@zthun/cirque';
import { ZBreadcrumbComponentModel } from './breadcrumb.cm.mjs';

/**
 * Represents a component model a ZBreadcrumbs component.
 */
export class ZBreadcrumbsComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZBreadcrumbs-root';

  /**
   * Gets the breadcrumbs underneath the path structure.
   *
   * @returns
   *        The list of breadcrumb items.
   */
  public async items(): Promise<ZBreadcrumbComponentModel[]> {
    return (await this.driver.query('.ZBreadcrumbs-item')).map((item) => new ZBreadcrumbComponentModel(item));
  }

  /**
   * Gets an item by its name or href.
   *
   * @param name -
   *        The name (path) of the link
   *
   * @returns
   *        The link with the given name or href, or null if
   *        no such breadcrumb is found.
   */
  public async item(name: string): Promise<ZBreadcrumbComponentModel | null> {
    const [item] = await this.driver.query(`.ZBreadcrumbs-item[data-name="${name}"]`);
    return item ? new ZBreadcrumbComponentModel(item) : null;
  }
}
