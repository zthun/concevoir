import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import React, { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { ZGridView } from './grid-view';
import { ZGridViewComponentModel } from './grid-view.cm';

describe('ZGridView', () => {
  async function createTestTarget() {
    const renderItem = (item: number): ReactNode => item;
    const element = <ZGridView renderItem={renderItem} />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZGridViewComponentModel);
  }

  it('should render the component', async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});
