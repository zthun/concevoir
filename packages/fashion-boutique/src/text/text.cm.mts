import {
  IZCircusDriver,
  ZCircusActBuilder,
  ZCircusBy,
  ZCircusComponentModel,
  ZCircusKeyboardQwerty,
} from "@zthun/cirque";
import { firstDefined } from "@zthun/helpful-fn";
import { ZLabelComponentModel } from "../label/label.cm.mjs";

/**
 * Represents the component model for a ZText component.
 */
export class ZTextComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZText-root";

  /**
   * Gets the underlying input.
   *
   * @returns
   *      The underlying input driver context.
   */
  private async _input(): Promise<IZCircusDriver> {
    try {
      return await this.driver.select("input");
    } catch {
      return await this.driver.select("textarea");
    }
  }

  /**
   * Gets the value of the component model.
   *
   * @returns
   *        The string value of the component.
   */
  public async value(): Promise<string | null> {
    return (await this._input()).value();
  }

  /**
   * Gets whether the component is disabled.
   *
   * @returns
   *        True if the component is disabled.
   *        False otherwise.
   */
  public async disabled(): Promise<boolean> {
    return (await this._input()).disabled();
  }

  /**
   * Gets the label for the text component.
   *
   * @returns
   *        The label for the text component or null if no such label exists.
   */
  public async label(): Promise<ZLabelComponentModel | null> {
    const [label] = await ZCircusBy.all(
      this.driver,
      ZLabelComponentModel,
      ".ZText-label",
    );
    return firstDefined(null, label);
  }

  /**
   * Gets whether the text is masked or revealed.
   *
   * @returns
   *        True if the text is revealed.  False if
   *        masked.
   */
  public async masked(): Promise<boolean> {
    const input = await this._input();
    return (await input.attribute("type")) === "password";
  }

  /**
   * Gets whether the text input is read only.
   *
   * @returns
   *        True if the text input is read only.
   *        False otherwise.
   */
  public async readOnly(): Promise<boolean> {
    const input = await this._input();
    return (await input.attribute("readOnly")) != null;
  }

  /**
   * Types a text string into the input.
   *
   * @param text -
   *        The text to type.
   * @param commit -
   *        The key to use push last to commit the changes.  Should
   *        be tab or enter, but you can set this to alt if you don't want
   *        to commit the text.
   *
   * @returns
   *        The updated value.
   */
  public async keyboard(
    text: string,
    commit = ZCircusKeyboardQwerty.tab,
  ): Promise<string | null> {
    const act = new ZCircusActBuilder()
      .click()
      .type(text)
      .press(commit)
      .build();
    const input = await this._input();
    await input.perform(act);
    return this.value();
  }

  /**
   * Clears the text of all keys.
   *
   * @param commit -
   *        The key to use push last to commit the changes.  Should
   *        be tab or enter, but you can set this to alt if you don't want
   *        to commit the text.
   *
   * @returns
   *        The updated value.
   */
  public async clear(
    commit = ZCircusKeyboardQwerty.tab,
  ): Promise<string | null> {
    const value = await this.value();
    const act = new ZCircusActBuilder()
      .click()
      .press(ZCircusKeyboardQwerty.delete, value?.length)
      .press(ZCircusKeyboardQwerty.backspace, value?.length)
      .press(commit)
      .build();
    const input = await this._input();
    await input.perform(act);
    return this.value();
  }

  /**
   * Types an essay worth of input paragraphs into the text area.
   *
   * Each line is separated by two enter keys.  If the text
   * component does not support multi-line (I.E. it is not a Text Area)
   * then this will run all of the text together and commit on every
   * line break.
   *
   * This is somewhat of an easier way to line break multiple text
   * blocks without having to separate them with the \\n character.
   *
   * @param paragraphs -
   *        The list of paragraphs to type.
   *
   * @returns
   *        The value of the text component.
   */
  public async essay(paragraphs: string[]): Promise<string | null> {
    let builder = new ZCircusActBuilder().click();

    paragraphs.forEach((paragraph) => {
      builder = builder
        .type(paragraph)
        .press(ZCircusKeyboardQwerty.enter)
        .press(ZCircusKeyboardQwerty.enter);
    });

    builder = builder.press(ZCircusKeyboardQwerty.tab);

    const input = await this._input();
    await input.perform(builder.build());
    return this.value();
  }

  /**
   * Gets an adornment container.
   *
   * @param which -
   *        Which container to query (prefix or suffix).
   *
   * @returns
   *        The adornment container or null if no such container exists.
   */
  private async _adornment(
    which: "prefix" | "suffix",
  ): Promise<IZCircusDriver | null> {
    const query = `.ZText-${which}`;
    const [adornment] = await this.driver.query(query);
    return adornment || null;
  }

  /**
   * Gets the prefix adornment container.
   *
   * @returns
   *        The prefix adornment container or undefined if there is no
   *        such adornment.
   */
  public prefix = this._adornment.bind(this, "prefix");

  /**
   * Gets the suffix adornment container.
   *
   * @returns
   *        The suffix adornment container or undefined if there is no
   *        such adornment.
   */
  public suffix = this._adornment.bind(this, "suffix");
}
