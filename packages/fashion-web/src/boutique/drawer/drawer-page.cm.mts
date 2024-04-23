import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZButtonComponentModel, ZChoiceComponentModel, ZDrawerComponentModel } from '@zthun/fashion-circus';
import { ZSideAnchor } from '@zthun/helpful-fn';

/**
 * Represents the component model for the drawer page.
 */
export class ZDrawerPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZDrawerPage-root';

  /**
   * Gets the drawer open button.
   *
   * @returns
   *      The button that opens the drawer.
   */
  public drawerButton(): Promise<ZButtonComponentModel> {
    return ZCircusBy.first(this.driver, ZButtonComponentModel, 'open-drawer');
  }

  /**
   * Gets the current state of the drawer.
   *
   * @returns
   *      The current drawer.
   */
  public drawer(): Promise<ZDrawerComponentModel> {
    return ZCircusBy.first(this.driver, ZDrawerComponentModel);
  }

  /**
   * Clicks the button inside the drawer.
   *
   * @param drawer -
   *        The drawer that was opened from the drawerButton.
   */
  public async close(): Promise<void> {
    const drawer = await this.drawer();
    const btn = await ZCircusBy.first(drawer.driver, ZButtonComponentModel, 'close');
    await btn.click();
    await drawer.waitForClose();
  }

  /**
   * Sets the drawer position.
   *
   * @param position -
   *        The position to set.
   */
  public async anchor(position: ZSideAnchor): Promise<void> {
    const anchor = await ZCircusBy.first(this.driver, ZChoiceComponentModel, 'anchor');
    await anchor.select(position);
  }
}
