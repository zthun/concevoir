import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ZCarouselPage } from './carousel-page';
import { ZCarouselPageComponentModel } from './carousel-page.cm';

describe('ZCarouselPage', () => {
  const createTestTarget = async () => {
    const element = <ZCarouselPage />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZCarouselPageComponentModel);
  };

  it('should render the component', async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});
