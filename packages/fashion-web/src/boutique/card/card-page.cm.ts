import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZCardComponentModel, ZChoiceComponentModel } from '@zthun/fashion-boutique';

export class ZCardPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZCardPage-root';

  public card(): Promise<ZCardComponentModel> {
    return ZCircusBy.first(this.driver, ZCardComponentModel, 'card');
  }

  public fashion(): Promise<ZChoiceComponentModel> {
    return ZCircusBy.first(this.driver, ZChoiceComponentModel, 'fashion');
  }
}
