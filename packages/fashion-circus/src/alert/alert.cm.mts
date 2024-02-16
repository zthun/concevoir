import { IZCircusDriver, ZCircusComponentModel } from '@zthun/cirque';
import { ZFashionPriority } from '@zthun/fashion-theme';
import { firstDefined } from '@zthun/helpful-fn';

/**
 * Represents the component model for the alert component.
 */
export class ZAlertComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZAlert-root';

  /**
   * Gets the alert message.
   *
   * @returns
   *        The message container.
   */
  public async message(): Promise<IZCircusDriver> {
    return await this.driver.select('.ZAlert-message');
  }

  /**
   * Gets the heading message.
   *
   * @returns
   *        The heading container if one exists.
   */
  public async heading(): Promise<IZCircusDriver | null> {
    const [heading] = await this.driver.query('.ZAlert-heading');
    return firstDefined(null, heading);
  }

  /**
   * Gets the avatar.
   *
   * @returns
   *        The avatar container, if one exists.
   */
  public async avatar(): Promise<IZCircusDriver | null> {
    const [avatar] = await this.driver.query('.ZAlert-avatar');
    return firstDefined(null, avatar);
  }

  /**
   * Gets the fashion for the alert.
   *
   * @returns
   *        The fashion for the alert.
   */
  public async fashion(): Promise<string> {
    return this.driver.attribute('fashion', ZFashionPriority.Primary);
  }
}
