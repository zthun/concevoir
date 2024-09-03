import { ZCircusActBuilder, ZCircusComponentModel } from "@zthun/cirque";

/**
 * The component model for font based icons.
 */
export class ZIconComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZIcon-root";

  /**
   * The icon name.
   *
   * @returns
   *        The name of the icon.
   */
  public name(): Promise<string> {
    return this.driver.attribute<string>("name", "");
  }

  /**
   * The icon vendor.
   *
   * @returns
   *        The icon vendor.
   */
  public vendor(): Promise<string> {
    return this.driver.attribute<string>("data-vendor", "unknown");
  }

  /**
   * Clicks the icon.
   */
  public async click(): Promise<void> {
    await this.driver.perform(new ZCircusActBuilder().click().build());
  }
}
