import { ZCircusActBuilder, ZCircusComponentModel } from "@zthun/cirque";

/**
 * Represents the component model for the label.
 */
export class ZLabelComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZLabel-root";

  /**
   * Gets the text value of the label.
   *
   * @returns
   *        The text value of the label.
   */
  public text(): Promise<string> {
    return this.driver.text();
  }

  /**
   * Gets whether the label is required or optional.
   *
   * @returns
   *        True if the label will display the required star.
   */
  public async required(): Promise<boolean> {
    const _required = await this.driver.attribute("data-required");
    return _required === "true";
  }

  /**
   * Clicks on the label.
   */
  public async click(): Promise<void> {
    const act = new ZCircusActBuilder().click().build();
    await this.driver.perform(act);
  }
}
