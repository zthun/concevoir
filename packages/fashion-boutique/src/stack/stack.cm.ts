import { ZCircusComponentModel } from '@zthun/cirque';
import { ZOrientation } from '@zthun/helpful-fn';

export class ZStackComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZStack-root';

  public orientation(): Promise<ZOrientation> {
    return this.driver.attribute<ZOrientation>('data-orientation', ZOrientation.Vertical);
  }
}
