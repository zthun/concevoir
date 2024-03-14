import { ZCircusComponentModel } from '@zthun/cirque';
import { ZFashionIntrinsic } from '@zthun/fashion-theme';

export class ZHeadingComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZHeading-root';

  public fashion() {
    return this.driver.attribute('data-fashion', ZFashionIntrinsic.Inherit);
  }

  public async compact() {
    const compact = await this.driver.attribute<string>('data-compact', 'false');
    return compact !== 'false';
  }
}
