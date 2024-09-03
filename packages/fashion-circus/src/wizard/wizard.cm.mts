import {
  IZCircusDriver,
  ZCircusBy,
  ZCircusComponentModel,
} from "@zthun/cirque";
import { required } from "@zthun/helpful-fn";
import { ZButtonComponentModel } from "../button/button.cm.mjs";
import { ZCardComponentModel } from "../card/card.cm.mjs";

export class ZWizardComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZWizard-root";

  public card(): Promise<ZCardComponentModel> {
    return Promise.resolve(new ZCardComponentModel(this.driver));
  }

  private async _footer(): Promise<IZCircusDriver> {
    const card = await this.card();
    return await required(card.footer());
  }

  public async page(): Promise<number> {
    const page = await this.driver.attribute("data-page", "0");
    return +page;
  }

  public async next(): Promise<ZButtonComponentModel | null> {
    return ZCircusBy.optional(
      await this._footer(),
      ZButtonComponentModel,
      "next",
    );
  }

  public async previous(): Promise<ZButtonComponentModel> {
    return ZCircusBy.first(
      await this._footer(),
      ZButtonComponentModel,
      "previous",
    );
  }

  public async finish(): Promise<ZButtonComponentModel | null> {
    return ZCircusBy.optional(
      await this._footer(),
      ZButtonComponentModel,
      "finish",
    );
  }
}
