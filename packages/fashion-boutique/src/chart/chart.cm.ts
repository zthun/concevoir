import { ZCircusComponentModel } from '@zthun/cirque';
import { ZFashionBuilder } from '@zthun/fashion-theme';
import { IZDataPoint, ZDataPointBuilder } from './data-point';

/**
 * Represents the component model for a chart.
 */
export class ZChartComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZChart-root';

  /**
   * Gets all points.
   *
   * @returns
   *        All plotted points.
   */
  public async points(): Promise<IZDataPoint[]> {
    const targets = await this.driver.query('.ZChart-point');

    return Promise.all(
      targets.map(async (t) => {
        const x = await t.attribute('data-x', '0');
        const y = await t.attribute('data-y', '0');
        const name = await t.attribute('data-name', '');
        const fashion = await t.attribute('data-fashion', '');
        return new ZDataPointBuilder(+x, +y).name(name).fashion(new ZFashionBuilder().name(fashion).build()).build();
      })
    );
  }
}
