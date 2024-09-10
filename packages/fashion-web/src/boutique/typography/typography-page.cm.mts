import { ZCircusBy, ZCircusComponentModel } from "@zthun/cirque";
import {
  ZChoiceComponentModel,
  ZTypographyComponentModel,
} from "@zthun/fashion-boutique";

/**
 * Represents the component model for the typography page.
 */
export class ZTypographyPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZTypographyPage-root";

  public paragraph(): Promise<ZTypographyComponentModel> {
    return ZCircusBy.first(this.driver, ZTypographyComponentModel, "paragraph");
  }

  /**
   * Gets the fashion drop down.
   *
   * @returns
   *        The fashion drop down.
   */
  public fashion(): Promise<ZChoiceComponentModel> {
    return ZCircusBy.first(this.driver, ZChoiceComponentModel, "fashion");
  }
}
