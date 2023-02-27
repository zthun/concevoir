import { ZCircusActBuilder, ZCircusComponentModel } from '@zthun/cirque';

/**
 * The component model for the ZNotFound component.
 */
export class ZNotFoundComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZNotFound-root';

  /**
   * Clicks the return button.
   */
  public async returnHome() {
    const button = await this.driver.select('.ZNotFound-back');
    const action = new ZCircusActBuilder().click().build();
    await button.perform(action);
  }
}
