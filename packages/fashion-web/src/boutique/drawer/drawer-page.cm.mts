import { ZCircusBy, ZCircusComponentModel } from "@zthun/cirque";
import {
  ZButtonComponentModel,
  ZChoiceComponentModel,
  ZDialogComponentModel,
} from "@zthun/fashion-boutique";
import { ZSideAnchor } from "@zthun/helpful-fn";

/**
 * Represents the component model for the drawer page.
 */
export class ZDrawerPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZDrawerPage-root";

  /**
   * Gets the drawer open button.
   *
   * @returns
   *      The open button.
   */
  public open(): Promise<ZButtonComponentModel> {
    return ZCircusBy.first(this.driver, ZButtonComponentModel, "open-drawer");
  }

  /**
   * Gets the drawer close button.
   *
   * @returns
   *      The close button.
   */
  public close(): Promise<ZButtonComponentModel> {
    return ZCircusBy.first(this.driver, ZButtonComponentModel, "close-drawer");
  }

  /**
   * Gets the state of the drawer on the page.
   *
   * @returns
   *        The drawer component.
   */
  public drawer(): Promise<ZDialogComponentModel> {
    return ZCircusBy.first(this.driver, ZDialogComponentModel);
  }

  /**
   * Sets the drawer position.
   *
   * @param position -
   *        The position to set.
   */
  public async anchor(position: ZSideAnchor): Promise<void> {
    const anchor = await ZCircusBy.first(
      this.driver,
      ZChoiceComponentModel,
      "anchor",
    );
    await anchor.select(position);
  }
}
