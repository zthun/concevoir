import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ZChartPage } from './chart-page';
import { ZChartPageComponentModel } from './chart-page.cm';

describe('ZChartPage', () => {
  async function createTestTarget() {
    const element = <ZChartPage />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZChartPageComponentModel);
  }

  it('should render the component', async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});
