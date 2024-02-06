import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZOrientation } from '@zthun/helpful-fn';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ZCarouselPage } from './carousel-page';
import { ZCarouselPageComponentModel } from './carousel-page.cm.mjs';

describe('ZCarouselPage', () => {
  const createTestTarget = async () => {
    const element = <ZCarouselPage />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZCarouselPageComponentModel);
  };

  it('should update the orientation of the carousel', async () => {
    // Arrange.
    const target = await createTestTarget();
    const orientation = await target.orientation();
    // Act.
    await orientation.select(ZOrientation.Vertical);
    const carousel = await target.carousel();
    const actual = await carousel.orientation();
    // Assert.
    expect(actual).toEqual(ZOrientation.Vertical);
  });

  it('should display the index of the carousel', async () => {
    // Arrange.
    const target = await createTestTarget();
    const carousel = await target.carousel();
    // Act.
    await (await carousel.forward()).click();
    const expected = await carousel.index();
    const actual = await target.index();
    // Assert.
    expect(actual).toEqual(expected);
  });

  it('should update the count of carousel items to 1', async () => {
    // Arrange
    const target = await createTestTarget();
    const count = await target.count();
    // Act.
    await count.select(1);
    const carousel = await target.carousel();
    const actual = await carousel.count();
    // Assert.
    expect(actual).toEqual(1);
  });

  it('should update the count of carousel items to 0', async () => {
    // Arrange
    const target = await createTestTarget();
    const count = await target.count();
    // Act.
    await count.select(0);
    const carousel = await target.carousel();
    const actual = await carousel.count();
    // Assert.
    expect(actual).toEqual(0);
  });
});
