import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import {
  ZBooleanComponentModel,
  ZButtonComponentModel,
  ZChoiceComponentModel,
  ZModalComponentModel
} from '@zthun/fashion-circus';

export class ZModalPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZModalPage-root';

  public async opened(): Promise<boolean> {
    const body = await this.driver.body();
    const modal = await ZCircusBy.optional(body, ZModalComponentModel, 'modal');
    return modal != null;
  }

  public openButton(): Promise<ZButtonComponentModel> {
    return ZCircusBy.first(this.driver, ZButtonComponentModel, 'open-modal');
  }

  public async openModal(): Promise<ZModalComponentModel> {
    const button = await this.openButton();
    await button.click();
    return ZCircusBy.first(await this.driver.body(), ZModalComponentModel, 'modal');
  }

  public fashion(): Promise<ZChoiceComponentModel> {
    return ZCircusBy.first(this.driver, ZChoiceComponentModel, 'fashion');
  }

  public header(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, 'header');
  }

  public footer(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, 'footer');
  }

  public fullScreen(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, 'full-screen');
  }
}
