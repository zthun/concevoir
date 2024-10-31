import { ZCircusActBuilder, ZCircusComponentModel } from "@zthun/cirque";

/**
 * Represents a choice option or value in the Choice component model.
 */
export class ZChoiceOptionComponentModel extends ZCircusComponentModel {
  /**
   * Gets the value for the option.
   *
   * @returns
   *      The value for the option.
   */
  public value(): Promise<string | null> {
    return this.driver.attribute("data-value");
  }

  /**
   * Gets the raw text string of the value.
   *
   * @returns
   *        The text of the option.
   */
  public async text(): Promise<string> {
    return this.driver.text();
  }

  /**
   * Attempts to remove the option via a remove handler.
   */
  public async remove(): Promise<void> {
    let target = this.driver;
    const classes = await this.driver.classes(["ZChoice-remove"]);

    if (!classes.length) {
      [target] = await this.driver.query(".ZChoice-remove");
    }

    if (target == null) {
      return;
    }

    const act = new ZCircusActBuilder().click().build();
    await target.perform(act);
  }
}
