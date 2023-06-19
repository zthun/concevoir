import { ZCircusComponentModel } from '@zthun/cirque';
import { firstDefined } from '@zthun/helpful-fn';

/**
 * Represents the component model for the alert component.
 */
export class ZAlertComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZAlert-root';

  /**
   * Gets the alert message.
   *
   *
   * @returns
   *        The message text, if any.
   */
  public async message(): Promise<string> {
    const msg = await this.driver.select('.ZAlert-message');
    return msg.text();
  }

  /**
   * Gets the heading message.
   *
   * @returns
   *        The heading text, if any.
   */
  public async heading(): Promise<string> {
    const [heading] = await this.driver.query('.ZAlert-heading');
    return firstDefined('', await heading?.text());
  }

  /**
   * Gets the fashion for the alert.
   *
   * @returns
   *        The fashion for the alert.
   */
  public async fashion(): Promise<string> {
    return this.driver.attribute('data-fashion', '');
  }
}
