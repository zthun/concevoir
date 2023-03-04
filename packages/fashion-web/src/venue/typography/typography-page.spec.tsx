import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ZTypographyPage } from './typography-page';
import { ZTypographyPageComponentModel } from './typography-page.cm';

describe('ZTypographyPage', () => {
  async function createTestTarget() {
    const element = <ZTypographyPage />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZTypographyPageComponentModel);
  }

  it('should render the page.', async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});
