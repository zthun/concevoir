import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZCarouselComponentModel, ZChoiceComponentModel } from '@zthun/fashion-boutique';

export class ZCarouselPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZCarouselPage-root';

  public carousel(): Promise<ZCarouselComponentModel> {
    return ZCircusBy.first(this.driver, ZCarouselComponentModel);
  }

  public orientation(): Promise<ZChoiceComponentModel> {
    return ZCircusBy.first(this.driver, ZChoiceComponentModel, 'orientation');
  }

  public count(): Promise<ZChoiceComponentModel> {
    return ZCircusBy.first(this.driver, ZChoiceComponentModel, 'count');
  }

  public async index(): Promise<number> {
    const index = await this.driver.select('.ZCarouselPage-index');
    const text = await index.text();
    return +text;
  }
}
