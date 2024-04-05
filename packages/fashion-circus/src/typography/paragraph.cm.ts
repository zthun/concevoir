import { ZCircusComponentModel } from '@zthun/cirque';
import { ZFashionIntrinsic } from '@zthun/fashion-theme';

export class ZParagraphComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZTypography-paragraph';

  public fashion() {
    return this.driver.attribute('data-fashion', ZFashionIntrinsic.Inherit);
  }

  public async compact() {
    const compact = await this.driver.attribute<string>('data-compact', 'false');
    return compact !== 'false';
  }
}
