import { IZCircusDriver, ZCircusComponentModel } from '@zthun/cirque';

/**
 * A component model for the ZLineItem.
 *
 * This mostly is just here to help you get the containers for the prefix, body, and suffix.
 */
export class ZLineItemComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZLineItem-root';

  /**
   * Returns the prefix element.
   *
   * @returns
   *        The prefix element.
   */
  public prefix(): Promise<IZCircusDriver> {
    return this.driver.select('.ZLineItem-prefix');
  }

  /**
   * Returns the body element.
   *
   * @returns
   *        The body element.
   */
  public body(): Promise<IZCircusDriver> {
    return this.driver.select('.ZLineItem-body');
  }

  /**
   * Returns the suffix element.
   *
   * @returns
   *        The suffix element.
   */
  public suffix(): Promise<IZCircusDriver> {
    return this.driver.select('.ZLineItem-suffix');
  }
}
