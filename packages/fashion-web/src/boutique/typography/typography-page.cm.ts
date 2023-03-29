import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZChoiceComponentModel, ZTextColorComponentModel } from '@zthun/fashion-boutique';

/**
 * Represents the component model for the typography page.
 */
export class ZTypographyPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZTypographyPage-root';

  /**
   * Gets information about the current text color.
   *
   * @returns
   *        The current text color.
   */
  public color(): Promise<ZTextColorComponentModel> {
    return ZCircusBy.first(this.driver, ZTextColorComponentModel, 'color');
  }

  /**
   * Gets the fashion drop down.
   *
   * @returns
   *        The fashion drop down.
   */
  public fashion(): Promise<ZChoiceComponentModel> {
    return ZCircusBy.first(this.driver, ZChoiceComponentModel, 'fashion');
  }
}
