import {
  ZCircusActBuilder,
  ZCircusComponentModel,
  ZCircusKeyboardQwerty,
  ZCircusWaitOptionsBuilder
} from '@zthun/cirque';
import { ZHorizontalAnchor, ZSideAnchor } from '@zthun/helpful-fn';

/**
 * Represents the component model for a drawer.
 */
export class ZDrawerComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZDrawer-root';

  /**
   * Gets a value that determines if the drawer is opened.
   */
  public async opened() {
    const opened = await this.driver.attribute('open', 'false');
    return opened !== 'false';
  }

  /**
   * Waits for a drawer to open.
   */
  public async waitForOpen() {
    const options = new ZCircusWaitOptionsBuilder().description('Waiting for a drawer to open').timeout(2000).build();
    return this.driver.wait(() => this.opened(), options);
  }

  /**
   * Waits for the drawer to close.
   */
  public async waitForClose() {
    const options = new ZCircusWaitOptionsBuilder().description('Waiting for a drawer to close').timeout(2000).build();
    return this.driver.wait(() => this.opened().then((open) => !open), options);
  }

  /**
   * Closes the drawer component.
   *
   * @returns
   *        A promise that resolves once the escape key is clicked and the drawer is
   *        closed.
   */
  public async close() {
    const act = new ZCircusActBuilder().press(ZCircusKeyboardQwerty.escape).build();
    return this.driver.perform(act);
  }

  /**
   * Gets the current anchor position.
   *
   * @returns
   *    The state anchor for the drawer.
   */
  public async anchor(): Promise<ZSideAnchor> {
    return await this.driver.attribute<ZSideAnchor>('data-anchor', ZHorizontalAnchor.Left);
  }
}
