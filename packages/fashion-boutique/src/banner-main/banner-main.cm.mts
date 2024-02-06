import { ZCircusComponentModel } from '@zthun/cirque';

/**
 * The component model for the banner main component.
 */
export class ZBannerMainComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZBannerMain-root';

  public avatar() {
    return this.driver.select('.ZBannerMain-avatar');
  }

  public prefix() {
    return this.driver.select('.ZBannerMain-prefix');
  }

  public suffix() {
    return this.driver.select('.ZBannerMain-suffix');
  }

  public main() {
    return this.driver.select('.ZBannerMain-content');
  }
}
