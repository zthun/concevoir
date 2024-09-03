import {
  IZCircusDriver,
  ZCircusActBuilder,
  ZCircusComponentModel,
  ZCircusKeyboardQwerty,
} from "@zthun/cirque";
import { ZSizeVaried } from "@zthun/fashion-tailor";
import { firstDefined } from "@zthun/helpful-fn";

/**
 * Represents a component model for a modal dialog.
 *
 * Modals are a bit different in that the are located in the body of the driver.
 */
export class ZModalComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZModal-root";

  public async header(): Promise<IZCircusDriver | null> {
    const [header] = await this.driver.query(".ZModal-header");
    return firstDefined(null, header);
  }

  public async footer(): Promise<IZCircusDriver | null> {
    const [footer] = await this.driver.query(".ZModal-footer");
    return firstDefined(null, footer);
  }

  public async width(): Promise<ZSizeVaried> {
    return this.driver.attribute("data-width", ZSizeVaried.Fit);
  }

  public async fashion(): Promise<string | null> {
    return this.driver.attribute("data-fashion");
  }

  public async close(): Promise<void> {
    const backdrop = await (
      await this.driver.body()
    ).select(".MuiModal-backdrop");
    const act = new ZCircusActBuilder().click().build();
    await backdrop.perform(act);
  }

  public async escape(): Promise<void> {
    const act = new ZCircusActBuilder()
      .press(ZCircusKeyboardQwerty.escape)
      .build();
    await this.driver.perform(act);
  }
}
