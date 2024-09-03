import {
  IZCircusDriver,
  ZCircusActBuilder,
  ZCircusComponentModel,
  ZCircusKeyboardQwerty,
  ZCircusWaitOptionsBuilder,
} from "@zthun/cirque";
import { ZHorizontalAnchor, ZSideAnchor } from "@zthun/helpful-fn";

/**
 * Represents a component model that manipulates an HTMLDialogElement.
 */
export class ZDialogComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZDialog-root";

  public async opened(): Promise<boolean> {
    const opened = await this.driver.attribute<string>("data-open", "false");
    return opened === "true";
  }

  public async anchor(): Promise<ZSideAnchor> {
    return this.driver.attribute<ZSideAnchor>("anchor", ZHorizontalAnchor.Left);
  }

  public async header(): Promise<IZCircusDriver> {
    return this.driver.select('[slot="header"]');
  }

  public async footer(): Promise<IZCircusDriver> {
    return this.driver.select('[slot="footer"]');
  }

  public async fashion(): Promise<string | null> {
    return this.driver.attribute("fashion");
  }

  public async close(): Promise<void> {
    const act = new ZCircusActBuilder()
      .press(ZCircusKeyboardQwerty.escape)
      .build();
    await this.driver.perform(act);
  }

  public async waitForOpen() {
    const options = new ZCircusWaitOptionsBuilder()
      .description("Waiting for a dialog to open")
      .timeout(500)
      .build();
    return this.driver.wait(() => this.opened(), options);
  }

  public async waitForClose() {
    const options = new ZCircusWaitOptionsBuilder()
      .description("Waiting for a dialog to close")
      .timeout(500)
      .build();
    return this.driver.wait(() => this.opened().then((open) => !open), options);
  }
}
