import { ZCircusBy, ZCircusComponentModel } from "@zthun/cirque";
import {
  ZBooleanComponentModel,
  ZButtonComponentModel,
  ZChoiceComponentModel,
  ZDialogComponentModel,
} from "@zthun/fashion-circus";

export class ZDialogPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZDialogPage-root";

  public drawerButton(): Promise<ZButtonComponentModel> {
    return ZCircusBy.first(this.driver, ZButtonComponentModel, "open-drawer");
  }

  public modalButton(): Promise<ZButtonComponentModel> {
    return ZCircusBy.first(this.driver, ZButtonComponentModel, "open-modal");
  }

  public popupButton(): Promise<ZButtonComponentModel> {
    return ZCircusBy.first(this.driver, ZButtonComponentModel, "open-popup");
  }

  public drawer(): Promise<ZDialogComponentModel> {
    return ZCircusBy.first(this.driver, ZDialogComponentModel);
  }

  public modal(): Promise<ZDialogComponentModel> {
    return ZCircusBy.first(this.driver, ZDialogComponentModel, "modal");
  }

  public popup(): Promise<ZDialogComponentModel> {
    return ZCircusBy.first(this.driver, ZDialogComponentModel, "popup");
  }

  public async closeDrawer(): Promise<ZButtonComponentModel> {
    const drawer = await this.drawer();
    const footer = await drawer.footer();
    return ZCircusBy.first(footer, ZButtonComponentModel, "close-drawer");
  }

  public async cancelModal(): Promise<ZButtonComponentModel> {
    const modal = await this.modal();
    const footer = await modal.footer();
    return ZCircusBy.first(footer, ZButtonComponentModel, "cancel-modal");
  }

  public async saveModal(): Promise<ZButtonComponentModel> {
    const modal = await this.modal();
    const footer = await modal.footer();
    return ZCircusBy.first(footer, ZButtonComponentModel, "save-modal");
  }

  public async closePopup(): Promise<ZButtonComponentModel> {
    const popup = await this.popup();
    const footer = await popup.footer();
    return ZCircusBy.first(footer, ZButtonComponentModel, "close-popup");
  }

  public fashion(): Promise<ZChoiceComponentModel> {
    return ZCircusBy.first(this.driver, ZChoiceComponentModel, "fashion");
  }

  public persistent(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, "persistent");
  }

  public async anchor(): Promise<ZChoiceComponentModel> {
    return ZCircusBy.first(this.driver, ZChoiceComponentModel, "anchor");
  }

  public fullWidth(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, "full-width");
  }

  public fullHeight(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, "full-height");
  }
}
