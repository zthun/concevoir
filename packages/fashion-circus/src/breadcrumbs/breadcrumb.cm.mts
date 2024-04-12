import { ZCircusActBuilder, ZCircusComponentModel } from '@zthun/cirque';

/**
 * Represents a component model a ZBreadcrumb component.
 */
export class ZBreadcrumbComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZBreadcrumb-root';

  /**
   * Gets the hypertext reference (href).
   *
   * @returns
   *        The hypertext reference.
   */
  public reference() {
    return this.driver.attribute('href');
  }

  /**
   * Gets the name of the breadcrumb.
   *
   * @returns
   *        The name of the breadcrumb.
   */
  public name() {
    return this.driver.attribute('data-name');
  }

  /**
   * Gets the underlying link text.
   *
   * @returns
   *        The link text.
   */
  public label() {
    return this.driver.text();
  }

  /**
   * Clicks the link.
   */
  public async click() {
    return this.driver.perform(new ZCircusActBuilder().click().build());
  }
}
