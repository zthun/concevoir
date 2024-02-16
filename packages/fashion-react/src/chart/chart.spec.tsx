import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZFashionBuilder } from '@zthun/fashion-theme';
import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { ZChartProgress } from './chart-progress';
import { ZChartComponentModel } from './chart.cm.mjs';
import { IZDataPoint, ZDataPointBuilder } from './data-point.mjs';

describe('ZChart', () => {
  let points: IZDataPoint[];

  beforeEach(() => {
    points = [
      new ZDataPointBuilder(10, 100).fashion(new ZFashionBuilder().build()).name('P1').build(),
      new ZDataPointBuilder(11, 100).name('P2').build(),
      new ZDataPointBuilder(12, 100).build()
    ];
  });

  const shouldRenderCorrectPointDimensions = async (
    expected: number[],
    createTestTarget: () => Promise<ZChartComponentModel>,
    actualFn: (point: IZDataPoint) => number
  ) => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const points = await target.points();
    const actual = points.map((p) => actualFn(p));
    // Assert.
    expect(actual).toEqual(expected);
  };

  describe('Progress', () => {
    let point: IZDataPoint;

    beforeEach(() => {
      [point] = points;
    });

    const createTestTarget = async () => {
      const element = <ZChartProgress points={point} />;
      const driver = await new ZCircusSetupRenderer(element).setup();
      return ZCircusBy.first(driver, ZChartComponentModel);
    };

    it('should render the correct x point value', async () => {
      await shouldRenderCorrectPointDimensions([point.x], createTestTarget, (p) => p.x);
    });

    it('should render the correct y point value', async () => {
      await shouldRenderCorrectPointDimensions([point.y], createTestTarget, (p) => p.y);
    });
  });
});
