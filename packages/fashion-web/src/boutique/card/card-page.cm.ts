import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZBooleanComponentModel, ZCardComponentModel, ZChoiceComponentModel } from '@zthun/fashion-boutique';

export class ZCardPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZCardPage-root';

  public card(): Promise<ZCardComponentModel> {
    return ZCircusBy.first(this.driver, ZCardComponentModel, 'card');
  }

  public loading(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, 'loading');
  }

  public fashion(): Promise<ZChoiceComponentModel> {
    return ZCircusBy.first(this.driver, ZChoiceComponentModel, 'fashion');
  }
}
