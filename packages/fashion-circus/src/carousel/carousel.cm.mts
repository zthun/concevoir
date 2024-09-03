import {
  IZCircusDriver,
  ZCircusBy,
  ZCircusComponentModel,
} from "@zthun/cirque";
import { ZOrientation } from "@zthun/helpful-fn";
import { ZButtonComponentModel } from "../button/button.cm.mjs";

export class ZCarouselComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZCarousel-root";

  public async orientation(): Promise<ZOrientation> {
    return this.driver.attribute("data-orientation", ZOrientation.Horizontal);
  }

  public async index(): Promise<number> {
    const index = await this.driver.attribute("data-index", "0");
    return +index;
  }

  public async count(): Promise<number> {
    const count = await this.driver.attribute("data-count", "0");
    return +count;
  }

  public content(): Promise<IZCircusDriver> {
    return this.driver.select(".ZCarousel-content");
  }

  public forward(): Promise<ZButtonComponentModel> {
    return ZCircusBy.first(
      this.driver,
      ZButtonComponentModel,
      "carousel-forward",
    );
  }

  public reverse(): Promise<ZButtonComponentModel> {
    return ZCircusBy.first(
      this.driver,
      ZButtonComponentModel,
      "carousel-reverse",
    );
  }
}
