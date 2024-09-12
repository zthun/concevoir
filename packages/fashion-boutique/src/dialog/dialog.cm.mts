import {
  IZCircusDriver,
  ZCircusActBuilder,
  ZCircusComponentModel,
  ZCircusKeyboardQwerty,
} from "@zthun/cirque";
import { firstDefined, ZSideAnchor } from "@zthun/helpful-fn";

export class ZDialogComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZDialog-root";

  public async anchor(): Promise<ZSideAnchor | null> {
    return await this.driver.attribute<ZSideAnchor>("data-anchor");
  }

  public async opened(): Promise<boolean> {
    const open = await this.driver.attribute("open");
    return open != null;
  }

  public async header(): Promise<IZCircusDriver | null> {
    const [header] = await this.driver.query(".ZDialog-header");
    return firstDefined(null, header);
  }

  public async footer(): Promise<IZCircusDriver | null> {
    const [footer] = await this.driver.query(".ZDialog-footer");
    return firstDefined(null, footer);
  }

  public async fashion(): Promise<string | null> {
    return this.driver.attribute("data-fashion");
  }

  public async close(): Promise<void> {
    const act = new ZCircusActBuilder()
      .press(ZCircusKeyboardQwerty.escape)
      .build();
    await this.driver.perform(act);
  }

  public async waitForOpen(): Promise<void> {
    return this.driver.wait(() => this.opened());
  }

  public async waitForClose(): Promise<void> {
    return this.driver.wait(() => this.opened().then((o) => !o));
  }
}
