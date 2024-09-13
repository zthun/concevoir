import { ZCircusComponentModel } from "@zthun/cirque";

/**
 * Represents a component model for suspense.
 */
export class ZSuspenseComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZSuspense-root";

  /**
   * Gets whether or not the suspense is disabled.
   *
   * @returns
   *        True if the suspense is not displayed, false otherwise.
   */
  public async disabled(): Promise<boolean> {
    const disabled = await this.driver.attribute("data-disabled", "false");
    return disabled !== "false";
  }

  /**
   * Alias for opposite of disabled.
   *
   * @returns
   *        False if the suspense is disabled, true otherwise.
   */
  public async loading(): Promise<boolean> {
    const disabled = await this.disabled();
    return !disabled;
  }

  /**
   * Gets the current fashion theme.
   *
   * @returns
   *      The name of the fashion theme.
   */
  public fashion(): Promise<string> {
    return this.driver.attribute("data-fashion", "Inherit");
  }
}
