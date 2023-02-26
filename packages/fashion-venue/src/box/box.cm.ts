import { ZCircusActBuilder, ZCircusComponentModel } from '@zthun/cirque';

/**
 * The component model for a box component.
 */
export class ZBoxComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZBox-root';

  /**
   * Clicks the box.
   *
   * @returns
   *        A promise that resolves once the layout has been clicked.
   */
  public click() {
    return this.driver.perform(new ZCircusActBuilder().click().build());
  }
}
