import { ZCircusBy, ZCircusComponentModel } from "@zthun/cirque";
import {
  ZButtonComponentModel,
  ZDialogComponentModel,
} from "@zthun/fashion-boutique";

export class ZPopupPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZPopupPage-root";

  public open(): Promise<ZButtonComponentModel> {
    return ZCircusBy.first(this.driver, ZButtonComponentModel, "open-popup");
  }

  public close(): Promise<ZButtonComponentModel> {
    return ZCircusBy.first(this.driver, ZButtonComponentModel, "close-popup");
  }

  public popup(): Promise<ZDialogComponentModel> {
    return ZCircusBy.first(this.driver, ZDialogComponentModel);
  }
}
