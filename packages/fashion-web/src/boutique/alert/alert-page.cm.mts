import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZAlertComponentModel } from '@zthun/fashion-boutique';
import { ZBooleanComponentModel, ZChoiceComponentModel } from '@zthun/fashion-react';

export class ZAlertPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZAlertPage-root';

  public alert(): Promise<ZAlertComponentModel> {
    return ZCircusBy.first(this.driver, ZAlertComponentModel);
  }

  public header(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, 'header');
  }

  public avatar(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, 'avatar');
  }

  public fashion(): Promise<ZChoiceComponentModel> {
    return ZCircusBy.first(this.driver, ZChoiceComponentModel, 'fashion');
  }
}
