import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZChartComponentModel } from '@zthun/fashion-boutique';

export class ZChartPageProgressComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZChartPage-progress';

  private chart(name: string): Promise<ZChartComponentModel> {
    return ZCircusBy.first(this.driver, ZChartComponentModel, name);
  }

  public hp = this.chart.bind(this, 'hp');
  public attack = this.chart.bind(this, 'attack');
  public defense = this.chart.bind(this, 'defense');
  public intelligence = this.chart.bind(this, 'intelligence');
  public speed = this.chart.bind(this, 'speed');
}
