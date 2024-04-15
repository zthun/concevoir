import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZChoiceComponentModel, ZNumberComponentModel, ZPaginationComponentModel } from '@zthun/fashion-circus';

export class ZPaginationPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZPaginationPage-root';

  public pagination(): Promise<ZPaginationComponentModel> {
    return ZCircusBy.first(this.driver, ZPaginationComponentModel);
  }

  public async current(): Promise<number> {
    const current = await this.driver.select('.ZPaginationPage-current-page');
    const text = await current.text();
    return +text;
  }

  public async pages(): Promise<ZNumberComponentModel> {
    return ZCircusBy.first(this.driver, ZNumberComponentModel, 'pages');
  }

  public async fashion(): Promise<ZChoiceComponentModel> {
    return ZCircusBy.first(this.driver, ZChoiceComponentModel, 'fashion');
  }
}
