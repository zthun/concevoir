import {
  IZCircusDriver,
  ZCircusActBuilder,
  ZCircusComponentModel,
  ZCircusKeyboardQwerty,
  ZCircusWaitOptionsBuilder
} from '@zthun/cirque';

/**
 * Represents a component model for a modal dialog.
 *
 * Modals are a bit different in that the are located in the body of the driver.
 */
export class ZModalComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZModal-root';

  public async opened(): Promise<boolean> {
    const opened = await this.driver.attribute<string>('data-open', 'false');
    return opened === 'true';
  }

  public async header(): Promise<IZCircusDriver> {
    return await this.driver.select('[slot="header"]');
  }

  public async footer(): Promise<IZCircusDriver> {
    return await this.driver.select('[slot="footer"]');
  }

  public async fashion(): Promise<string | null> {
    return this.driver.attribute('fashion');
  }

  public async close(): Promise<void> {
    const act = new ZCircusActBuilder().press(ZCircusKeyboardQwerty.escape).build();
    await this.driver.perform(act);
  }

  public async waitForOpen() {
    const options = new ZCircusWaitOptionsBuilder()
      .description('Waiting for a modal dialog to open')
      .timeout(500)
      .build();
    return this.driver.wait(() => this.opened(), options);
  }

  public async waitForClose() {
    const options = new ZCircusWaitOptionsBuilder()
      .description('Waiting for a modal dialog to close')
      .timeout(500)
      .build();
    return this.driver.wait(() => this.opened().then((open) => !open), options);
  }
}
