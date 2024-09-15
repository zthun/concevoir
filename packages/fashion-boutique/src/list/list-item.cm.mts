import { ZCircusActBuilder, ZCircusComponentModel } from "@zthun/cirque";

/**
 * Represents a component model for a single item underneath a ZList.
 */
export class ZListItemComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZListItem-root";

  /**
   * Gets the name of the list item.
   *
   * @returns
   *      The name of the list item.
   */
  public name(): Promise<string | null> {
    return this.driver.attribute("data-name");
  }

  /**
   * Clicks on the list item.
   */
  public async click(): Promise<void> {
    const act = new ZCircusActBuilder().click().build();
    await this.driver.perform(act);
  }
}
