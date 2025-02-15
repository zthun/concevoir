import { ZCircusBy, ZCircusComponentModel } from "@zthun/cirque";
import {
  ZBooleanComponentModel,
  ZChoiceComponentModel,
} from "@zthun/fashion-boutique";

/**
 * Represents the component model for the choice page demo.
 */
export class ZChoicePageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZChoicePage-root";

  /**
   * Gets the current value list.
   *
   * @returns
   *        The current value list.
   */
  public async value(): Promise<string[]> {
    const list = await this.driver.query(".ZChoicePage-value");
    const values = await Promise.all(list.map((l) => l.text()));
    return values;
  }

  /**
   * Gets the drop down (select) choice component.
   *
   * @returns
   *        The drop down choice component.
   */
  public dropdown(): Promise<ZChoiceComponentModel> {
    return ZCircusBy.first(this.driver, ZChoiceComponentModel, "select");
  }

  /**
   * Gets the toggle choice component.
   *
   * @returns
   *        The toggle choice component.
   */
  public toggle(): Promise<ZChoiceComponentModel> {
    return ZCircusBy.first(this.driver, ZChoiceComponentModel, "toggle");
  }

  /**
   * Gets the option to disable the drop downs.
   *
   * @returns
   *      The boolean option to disable the drop downs.
   */
  public disabled(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, "disabled");
  }

  /**
   * Gets the option to select multiple options from the drop downs.
   *
   * @returns
   *      The boolean option to select multiple options the drop downs.
   */
  public multiple(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, "multiple");
  }

  /**
   * Gets the option to remove clear support from the drop downs.
   *
   * @returns
   *      The boolean option to remove clear support the drop downs.
   */
  public indelible(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, "indelible");
  }

  /**
   * Gets the option to make the labels required on the drop downs.
   *
   * @returns
   *        The boolean option to make the labels required.
   */
  public required(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, "required");
  }
}
