import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZListComponentModel } from '@zthun/fashion-venue';

/**
 * The component model for the list page.
 */
export class ZListPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZListPage-root';

  /**
   * Gets the total number of times line items have been clicked.
   *
   * @returns
   *      The total number of times line items have been clicked.
   */
  public async count(): Promise<number> {
    const element = await this.driver.select('.ZListPage-click-count');
    const text = await element.text();
    return +text;
  }

  /**
   * Gets the page list.
   *
   * @returns
   *      The page list.
   */
  public async list(): Promise<ZListComponentModel> {
    return ZCircusBy.first(this.driver, ZListComponentModel);
  }
}
