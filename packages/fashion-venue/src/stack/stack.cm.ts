import { ZCircusComponentModel } from '@zthun/cirque';

export class ZStackComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZStack-root';

  public orientation(): Promise<'vertical' | 'horizontal'> {
    return this.driver.attribute<'vertical' | 'horizontal'>('data-orientation', 'vertical');
  }
}
