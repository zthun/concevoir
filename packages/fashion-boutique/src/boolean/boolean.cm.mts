import {
  IZCircusDriver,
  ZCircusActBuilder,
  ZCircusBy,
  ZCircusComponentModel,
} from "@zthun/cirque";
import { ZLabelComponentModel } from "../label/label.cm.mjs";

/**
 * Represents a react component model for the ZBoolean component.
 */
export class ZBooleanComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZBoolean-root";

  private async _input(): Promise<IZCircusDriver> {
    return this.driver.select('input[type="checkbox"]');
  }

  private async _value(): Promise<IZCircusDriver> {
    const [value] = await this.driver.query(".ZBoolean-value");
    return value;
  }

  /**
   * Gets whether this boolean is disabled.
   *
   * @returns
   *        True if the component is disabled,
   *        false otherwise.
   */
  public async disabled(): Promise<boolean> {
    return (await this._input()).disabled();
  }

  /**
   * Gets the underlying label.
   *
   * @returns
   *      The label for the boolean.  Null if there is no label.
   */
  public async label(): Promise<ZLabelComponentModel | null> {
    return ZCircusBy.optional(this.driver, ZLabelComponentModel);
  }

  /**
   * Gets the fashion name.
   *
   * @returns
   *        The fashion name.
   */
  public fashion(): Promise<string | null> {
    return this.driver.attribute("data-fashion");
  }

  /**
   * Gets the value of the input check state for the checkbox.
   *
   * @returns
   *        The check state value or null if indeterminate.
   */
  public async value(): Promise<boolean | null> {
    const input = await this._input();
    const indeterminate = await input.attribute("data-indeterminate");
    return indeterminate === "true" ? null : input.selected();
  }

  /**
   * Toggles the checkbox.
   *
   * @param value -
   *        The value to toggle to.  If this is
   *        undefined, then the input is simply
   *        clicked and that ends the operation.
   *
   * @returns
   *        A promise that resolves once the toggle
   *        has reached the given state.
   */
  public async toggle(value?: boolean): Promise<void> {
    const current = await this.value();

    if (current === value) {
      // Already in the state we need to be in.
      return;
    }

    const target = await this._value();
    const act = new ZCircusActBuilder().click().build();
    await target.perform(act);
  }
}
