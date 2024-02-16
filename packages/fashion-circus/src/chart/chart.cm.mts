import { ZCircusComponentModel } from '@zthun/cirque';

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
  public async points(): Promise<{ x: number; y: number }[]> {
    const targets = await this.driver.query('.ZChart-point');

    return Promise.all(
      targets.map(async (t) => {
        const x = await t.attribute('data-x', '0');
        const y = await t.attribute('data-y', '0');
        return { x: +x, y: +y };
      })
    );
  }
}
