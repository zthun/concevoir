import { IZCircusDriver, ZCircusComponentModel } from "@zthun/cirque";
import { firstDefined } from "@zthun/helpful-fn";

export class ZChipComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZChip-root";

  public async prefix(): Promise<IZCircusDriver | null> {
    const [prefix] = await this.driver.query(".ZChip-prefix");
    return firstDefined(null, prefix);
  }

  public async suffix(): Promise<IZCircusDriver | null> {
    const [suffix] = await this.driver.query(".ZChip-suffix");
    return firstDefined(null, suffix);
  }

  public async body(): Promise<IZCircusDriver> {
    return this.driver.select(".ZChip-body");
  }

  public async fashion(): Promise<string | null> {
    return this.driver.attribute<string>("data-fashion");
  }
}
