import {
  IZCircusDriver,
  ZCircusBy,
  ZCircusComponentModel,
} from "@zthun/cirque";
import { ZContentTitleComponentModel } from "../content-title/content-title.cm";

/**
 * The component model for the banner main component.
 */
export class ZBannerMainComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZBannerMain-root";

  public title(): Promise<ZContentTitleComponentModel> {
    return ZCircusBy.first(this.driver, ZContentTitleComponentModel);
  }

  public main(): Promise<IZCircusDriver> {
    return this.driver.select(".ZBannerMain-content");
  }
}
