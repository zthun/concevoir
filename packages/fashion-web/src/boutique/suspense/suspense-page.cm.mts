import { ZCircusBy, ZCircusComponentModel } from "@zthun/cirque";
import {
  ZBooleanComponentModel,
  ZChoiceComponentModel,
  ZSuspenseComponentModel,
} from "@zthun/fashion-boutique";

/**
 * Represents the component model for the suspense page.
 */
export class ZSuspensePageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZSuspensePage-root";

  /**
   * Gets the rotate loader on the page, or null if there is no suspense.
   *
   * @returns
   *        The current suspense loader.
   */
  public rotate(): Promise<ZSuspenseComponentModel> {
    return ZCircusBy.first(this.driver, ZSuspenseComponentModel, "rotate");
  }

  /**
   * Gets the progress loader on the page, or null if there is no suspense.
   *
   * @returns
   *        The progress loader.
   */
  public progress(): Promise<ZSuspenseComponentModel> {
    return ZCircusBy.first(this.driver, ZSuspenseComponentModel, "progress");
  }

  /**
   * Gets the disabled option.
   *
   * @returns
   *        The disabled option.
   */
  public disabled(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, "disabled");
  }

  /**
   * Gets the choice for fashion options.
   *
   * @returns
   *        The fashion options.
   */
  public fashion(): Promise<ZChoiceComponentModel> {
    return ZCircusBy.first(this.driver, ZChoiceComponentModel, "fashion");
  }

  /**
   * Gets the size drop down.
   *
   * @returns
   *        The size drop down.
   */
  public size(): Promise<ZChoiceComponentModel> {
    return ZCircusBy.first(this.driver, ZChoiceComponentModel, "size");
  }
}
