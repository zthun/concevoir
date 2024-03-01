import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZFashionContrast, ZFashionThemeBuilder } from '@zthun/fashion-theme';
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
    expect(await progress.loading()).toEqual(expected);
    expect(await rotate.loading()).toEqual(expected);
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

  describe('Display', () => {
    it('should show the suspense when the loading option is checked.', async () => {
      await assertDisplaysTheSuspenseWhenTheLoadingOptionIs(true);
    });

    it('should hide the suspense when the loading option is unchecked.', async () => {
      await assertDisplaysTheSuspenseWhenTheLoadingOptionIs(false);
    });
  });

  describe('Fashion', () => {
    it('should default the fashion to opposite.', async () => {
      // Arrange
      const target = await createTestTarget();
      const expected = ZFashionContrast.Opposite;
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
