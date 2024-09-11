import { ZCircusBy, ZCircusComponentModel } from "@zthun/cirque";
import {
  ZBooleanComponentModel,
  ZButtonComponentModel,
  ZChoiceComponentModel,
  ZDialogComponentModel,
} from "@zthun/fashion-boutique";

export class ZModalPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZModalPage-root";

  public openButton(): Promise<ZButtonComponentModel> {
    return ZCircusBy.first(this.driver, ZButtonComponentModel, "open-modal");
  }

  public async modal(): Promise<ZDialogComponentModel> {
    return ZCircusBy.first(this.driver, ZDialogComponentModel, "modal");
  }

  public async openModal(): Promise<ZDialogComponentModel> {
    const button = await this.openButton();
    await button.click();
    const modal = await this.modal();
    await modal.waitForOpen();
    return modal;
  }

  public fashion(): Promise<ZChoiceComponentModel> {
    return ZCircusBy.first(this.driver, ZChoiceComponentModel, "fashion");
  }

  public header(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, "header");
  }

  public footer(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, "footer");
  }
}
