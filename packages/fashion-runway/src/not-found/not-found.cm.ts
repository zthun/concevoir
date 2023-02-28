import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZButtonComponentModel } from '@zthun/fashion-venue';

/**
 * The component model for the ZNotFound component.
 */
export class ZNotFoundComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZNotFound-root';

  /**
   * Clicks the return button.
   */
  public async returnHome() {
    const button = await ZCircusBy.first(this.driver, ZButtonComponentModel, 'return-home');
    await button.click();
  }
}
