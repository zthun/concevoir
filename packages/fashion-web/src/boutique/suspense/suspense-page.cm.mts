import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZBooleanComponentModel, ZChoiceComponentModel, ZSuspenseComponentModel } from '@zthun/fashion-boutique';

/**
 * Represents the component model for the suspense page.
 */
export class ZSuspensePageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZSuspensePage-root';

  /**
   * Gets the rotate loader on the page, or null if there is no suspense.
   *
   * @returns
   *        The current suspense loader.
   */
  public rotate(): Promise<ZSuspenseComponentModel | null> {
    return ZCircusBy.optional(this.driver, ZSuspenseComponentModel, 'rotate');
  }

  /**
   * Gets the progress loader on the page, or null if there is no suspense.
   *
   * @returns
   *        The progress loader.
   */
  public progress(): Promise<ZSuspenseComponentModel | null> {
    return ZCircusBy.optional(this.driver, ZSuspenseComponentModel, 'progress');
  }

  /**
   * Gets the loading option.
   *
   * @returns
   *        The loading option.
   */
  public loading(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, 'loading');
  }

  /**
   * Gets the choice for fashion options.
   *
   * @returns
   *        The fashion options.
   */
  public fashion(): Promise<ZChoiceComponentModel> {
    return ZCircusBy.first(this.driver, ZChoiceComponentModel, 'fashion');
  }

  /**
   * Gets the size drop down.
   *
   * @returns
   *        The size drop down.
   */
  public size(): Promise<ZChoiceComponentModel> {
    return ZCircusBy.first(this.driver, ZChoiceComponentModel, 'size');
  }
}
