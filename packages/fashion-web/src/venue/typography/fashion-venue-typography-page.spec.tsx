import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ZFashionVenueTypographyPage } from './fashion-venue-typography-page';
import { ZFashionVenueTypographyPageComponentModel } from './fashion-venue-typography-page.cm';

describe('ZTypographyPage', () => {
  async function createTestTarget() {
    const element = <ZFashionVenueTypographyPage />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZFashionVenueTypographyPageComponentModel);
  }

  it('should render the page.', async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});
