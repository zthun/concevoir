import { ZCircusBy, ZCircusComponentModel } from "@zthun/cirque";
import {
  ZBooleanComponentModel,
  ZBubbleComponentModel,
  ZChoiceComponentModel,
} from "@zthun/fashion-boutique";

export class ZBubblePageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZBubblePage-root";

  public bubble(): Promise<ZBubbleComponentModel> {
    return ZCircusBy.first(this.driver, ZBubbleComponentModel);
  }

  public clickable(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, "clickable");
  }

  public fashion(): Promise<ZChoiceComponentModel> {
    return ZCircusBy.first(this.driver, ZChoiceComponentModel, "fashion");
  }

  public borderWidth(): Promise<ZChoiceComponentModel> {
    return ZCircusBy.first(this.driver, ZChoiceComponentModel, "border-width");
  }

  public async clicks(): Promise<number> {
    const clicks = await this.driver.select(".ZBubblePage-click-count");
    const text = await clicks.text();
    return +text;
  }
}
