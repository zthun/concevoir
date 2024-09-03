import { ZCircusComponentModel } from "@zthun/cirque";

/**
 * Gets the component model for the text color component.
 */
export class ZTextColorComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZTextColor-root";

  /**
   * Gets the current fashion for the component.
   *
   * @returns
   *        The fashion for the child text.
   */
  public fashion(): Promise<string> {
    return this.driver.attribute("data-fashion", "Inherit");
  }
}
