import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZFashionThemeBuilder } from '@zthun/fashion-theme';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ZSuspensePage } from './suspense-page';
import { ZSuspensePageComponentModel } from './suspense-page.cm.mjs';

describe('ZSuspensePage', () => {
  const theme = new ZFashionThemeBuilder().build();

  async function createTestTarget() {
    const element = <ZSuspensePage />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZSuspensePageComponentModel);
  }

  async function assertDisplaysTheSuspenseWhenTheLoadingOptionIs(expected: boolean) {
    // Arrange.
    const target = await createTestTarget();
    const loading = await target.loading();
    await loading.toggle(!expected);
    // Act.
    await loading.toggle(expected);
    const rotate = await target.rotate();
    const progress = await target.progress();
    // Assert.
    expect(!!progress).toEqual(expected);
    expect(!!rotate).toEqual(expected);
  }

  async function assertSetsFashion(expected: string) {
    // Arrange
    const target = await createTestTarget();
    const fashion = await target.fashion();
    // Act
    await fashion.select(expected);
    const rotate = await (await target.rotate())?.fashion();
    const progress = await (await target.progress())?.fashion();
    // Assert
    expect(rotate).toEqual(expected);
    expect(progress).toEqual(expected);
  }

  async function assertSetsSize(expected: ZSizeFixed) {
    // Arrange
    const target = await createTestTarget();
    const size = await target.size();
    // Act.
    await size.select(expected);
    const rotate = await target.rotate();
    const progress = await target.progress();
    const width = await rotate?.width();
    const height = await progress?.height();
    // Assert.
    expect(width).toEqual(expected);
    expect(height).toEqual(expected);
  }

  describe('Display', () => {
    it('should show the rotate loader when the loading option is checked.', async () => {
      await assertDisplaysTheSuspenseWhenTheLoadingOptionIs(true);
    });

    it('should hide the loader when the loading option is unchecked.', async () => {
      await assertDisplaysTheSuspenseWhenTheLoadingOptionIs(false);
    });
  });

  describe('Size', () => {
    it('should adjust the suspense size to xs.', async () => {
      await assertSetsSize(ZSizeFixed.ExtraSmall);
    });

    it('should adjust the suspense size to sm.', async () => {
      await assertSetsSize(ZSizeFixed.Small);
    });

    it('should adjust the suspense size to md.', async () => {
      await assertSetsSize(ZSizeFixed.Medium);
    });

    it('should adjust the suspense size to lg.', async () => {
      await assertSetsSize(ZSizeFixed.Large);
    });

    it('should adjust the suspense size to xl.', async () => {
      await assertSetsSize(ZSizeFixed.ExtraLarge);
    });
  });

  describe('Fashion', () => {
    it('should default the fashion to inherit the color.', async () => {
      // Arrange
      const target = await createTestTarget();
      const expected = 'Inherit';
      // Act
      const rotate = await (await target.rotate())?.fashion();
      const progress = await (await target.progress())?.fashion();
      // Assert
      expect(rotate).toEqual(expected);
      expect(progress).toEqual(expected);
    });

    it('should set the fashion to primary.', async () => {
      await assertSetsFashion(theme.primary.name!);
    });

    it('should set the fashion to secondary.', async () => {
      await assertSetsFashion(theme.secondary.name!);
    });
  });
});
