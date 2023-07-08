import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZChartPageProgressComponentModel } from './chart-page-progress.cm';

/**
 * Represents the component model for the drawer page.
 */
export class ZChartPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZChartPage-root';

  /**
   * Gets the progress chart box.
   *
   * @returns
   *        The progress chart box.
   */
  public progress(): Promise<ZChartPageProgressComponentModel> {
    return ZCircusBy.first(this.driver, ZChartPageProgressComponentModel);
  }
}
