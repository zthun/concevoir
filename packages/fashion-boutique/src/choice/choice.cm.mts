import {
  ZCircusActBuilder,
  ZCircusBy,
  ZCircusComponentModel,
  ZCircusKeyboardQwerty,
} from "@zthun/cirque";
import { firstDefined } from "@zthun/helpful-fn";
import { findIndex } from "lodash-es";
import { ZDialogComponentModel } from "../dialog/dialog.cm.mjs";
import { ZLabelComponentModel } from "../label/label.cm.mjs";
import { ZChoiceOptionComponentModel } from "./choice-option.cm.mjs";

/**
 * Represents a generic common implementation of a ZChoiceComponent model.
 */
export class ZChoiceComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZChoice-root";

  /**
   * Gets the label for the choice.
   */
  public async label(): Promise<ZLabelComponentModel | null> {
    const [label] = await ZCircusBy.all(
      this.driver,
      ZLabelComponentModel,
      ".ZChoice-label",
    );
    return firstDefined(null, label);
  }

  /**
   * Gets the list of selected items.
   *
   * @returns
   *        The list of selected items.
   */
  public async selected(): Promise<ZChoiceOptionComponentModel[]> {
    const values = await this.driver.query(".ZChoice-value");
    return Array.from(values).map((e) => new ZChoiceOptionComponentModel(e));
  }

  /**
   * Gets a value that determines if the choice component is disabled.
   *
   * @returns
   *        True if the choice component is disabled.  False otherwise.
   */
  public async disabled(): Promise<boolean> {
    // Choices can currently render inputs or buttons.
    const [input] = await this.driver.query("input,button");
    const attribute = await this.driver.attribute("data-disabled", "false");
    const disabled = await input?.disabled();
    return disabled || attribute !== "false";
  }

  /**
   * Gets whether the options list can be closed or is always visible.
   *
   * @returns
   *        True if the options list uses a pop mechanic, false if all
   *        options are always displayed.
   */
  public async closable() {
    const alwaysOpen = await this.driver.classes(["ZChoice-always-open"]);
    return alwaysOpen.length === 0;
  }

  private _popup() {
    return ZCircusBy.first(this.driver, ZDialogComponentModel, "choice-popup");
  }

  /**
   * Gets whether the options list is visible.
   *
   * @returns
   *        True if the options list is visible.  False otherwise.
   */
  public async opened() {
    const closable = await this.closable();

    if (!closable) {
      return true;
    }

    const popup = await this._popup();
    return popup.opened();
  }

  /**
   * Force shows the options in the case that they are hidden.
   *
   * @returns
   *        The list of available options.
   */
  public async open(): Promise<ZChoiceOptionComponentModel[]> {
    const opened = await this.opened();

    if (!opened) {
      const toggler = await this.driver.select(
        ".ZChoice-root .ZChoice-toggler",
      );
      const act = new ZCircusActBuilder().click().build();
      await toggler.perform(act);
    }

    const closable = await this.closable();

    if (closable) {
      const popup = await this._popup();
      await popup.waitForOpen();

      const options = await popup.driver.query(".ZChoice-option");
      return options.map((e) => new ZChoiceOptionComponentModel(e));
    }

    // The options are contained in the component itself and we can just get them
    // directly.
    const options = await this.driver.query(".ZChoice-option");
    return options.map((e) => new ZChoiceOptionComponentModel(e));
  }

  /**
   * Closes the option list if it is open.
   *
   * This does nothing if the list is persistent.
   *
   * @returns
   *        A promise that resolves once the list is
   *        hidden.
   */
  public async close(): Promise<void> {
    const closable = await this.closable();

    if (!closable) {
      return;
    }

    const act = new ZCircusActBuilder()
      .press(ZCircusKeyboardQwerty.escape)
      .build();
    await this.driver.perform(act);
    await this.driver.wait(() => this.opened().then((b) => !b));
  }

  /**
   * Performs a selection on a specific option.
   *
   * @param option -
   *        The option to select.
   */
  public async select(
    option: ZChoiceOptionComponentModel | string | number,
  ): Promise<void> {
    const options = await this.open();
    const value = await (option instanceof ZChoiceOptionComponentModel
      ? option.value()
      : Promise.resolve(String(option)));

    let values = await Promise.all(options.map((op) => op.value()));
    let optionToSelect = findIndex(values, (v) => v === value);

    if (optionToSelect < 0) {
      values = await Promise.all(options.map((op) => op.text()));
      optionToSelect = findIndex(values, (v) => v === value);
    }

    if (optionToSelect >= 0) {
      const context = options[optionToSelect];
      const act = new ZCircusActBuilder().click().build();
      await context.driver.perform(act);
    }

    await this.close();
  }

  /**
   * Clears the selection if the selection is not indelible.
   *
   * A choice that does not support single click clears will do nothing.
   */
  public async clear(): Promise<void> {
    const [cross] = await this.driver.query(".ZChoice-clear");

    if (!cross) {
      return;
    }

    const act = new ZCircusActBuilder().click().build();
    await cross.perform(act);
  }
}
