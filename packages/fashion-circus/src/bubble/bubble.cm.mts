import { ZCircusActBuilder, ZCircusComponentModel } from '@zthun/cirque';
import { ZSizeFixed, ZSizeVoid } from '@zthun/fashion-tailor';

export class ZBubbleComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZBubble-root';

  public async click() {
    const act = new ZCircusActBuilder().click().build();
    await this.driver.perform(act);
  }

  public borderSize(): Promise<ZSizeFixed | ZSizeVoid> {
    return this.driver.attribute('data-border-size', ZSizeVoid.None);
  }

  public fashion(): Promise<string> {
    return this.driver.attribute('data-fashion', '');
  }
}
