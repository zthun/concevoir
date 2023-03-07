import { ZCircusComponentModel } from '@zthun/cirque';
import { ZOrientation } from '@zthun/fashion-chroma';

export class ZStackComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZStack-root';

  public orientation(): Promise<ZOrientation> {
    return this.driver.attribute('data-orientation', ZOrientation.Vertical);
  }
}
