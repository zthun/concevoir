import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import {
  ZBooleanComponentModel,
  ZButtonComponentModel,
  ZChoiceComponentModel,
  ZDialogComponentModel
} from '@zthun/fashion-circus';

export class ZModalPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZModalPage-root';

  public openButton(): Promise<ZButtonComponentModel> {
    return ZCircusBy.first(this.driver, ZButtonComponentModel, 'open-modal');
  }

  public async openModal(): Promise<ZDialogComponentModel> {
    const button = await this.openButton();
    await button.click();
    return ZCircusBy.first(this.driver, ZDialogComponentModel, 'modal');
  }

  public fashion(): Promise<ZChoiceComponentModel> {
    return ZCircusBy.first(this.driver, ZChoiceComponentModel, 'fashion');
  }

  public fullWidth(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, 'full-width');
  }

  public fullHeight(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, 'full-height');
  }

  public persistent(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, 'persistent');
  }
}
