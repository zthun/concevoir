import { ZCircusActBuilder, ZCircusComponentModel } from '@zthun/cirque';
import { ZSizeVoid, ZThicknessSize } from '@zthun/fashion-tailor';
import { Property } from 'csstype';

export class ZBubbleComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZBubble-root';

  public async click() {
    const act = new ZCircusActBuilder().click().build();
    await this.driver.perform(act);
  }

  public edge(): Promise<ZThicknessSize> {
    return this.driver.attribute('edge', ZSizeVoid.None);
  }

  public trim(): Promise<Property.BorderStyle> {
    return this.driver.attribute('trim', 'solid');
  }

  public fashion(): Promise<string> {
    return this.driver.attribute('fashion', '');
  }
}
