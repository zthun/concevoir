import { IZCircusKey, ZCircusActBuilder, ZCircusComponentModel } from '@zthun/cirque';
import { ZTrilean, sleep, trilean } from '@zthun/helpful-fn';

/**
 * Represents a react component model for the ZBoolean component.
 */
export class ZBooleanComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZBoolean-root';

  /**
   * Gets whether this boolean is disabled.
   *
   * @returns
   *        True if the component is disabled,
   *        false otherwise.
   */
  public async disabled(): Promise<boolean> {
    const attr = await this.driver.attribute<string>('disabled', 'false');
    return attr !== 'false';
  }

  /**
   * Gets whether this boolean is required.
   *
   * @returns
   *        True if the component is required.
   */
  public async required(): Promise<boolean> {
    const attr = await this.driver.attribute('required', 'false');
    return attr !== 'false';
  }

  /**
   * Gets the fashion name.
   *
   * @returns
   *        The fashion name.
   */
  public fashion(): Promise<string | null> {
    return this.driver.attribute('fashion');
  }

  /**
   * Gets the value of the input check state for the checkbox.
   *
   * @returns
   *        The check state value or null if indeterminate.
   */
  public async value(): Promise<trilean> {
    const attr = await this.driver.attribute<string>('value');
    return ZTrilean.convert(attr);
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

    const act = new ZCircusActBuilder().click().build();
    await this.driver.perform(act);
    // Allow time for any animations to play.
    await sleep(200);
  }

  /**
   * Toggles the checkbox twice and then presses the key while
   * it is in focus.
   *
   * @param key -
   *        The key to press.
   *
   * @returns
   *        A promise that resolves once the toggle has
   *        reached the given state.
   */
  public async keyboard(key: IZCircusKey): Promise<void> {
    await this.toggle();
    await this.toggle();

    const act = new ZCircusActBuilder().press(key).build();
    await this.driver.perform(act);
  }
}
