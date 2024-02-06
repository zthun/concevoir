import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZFashionThemeBuilder } from '@zthun/fashion-theme';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ZTypographyPage } from './typography-page';
import { ZTypographyPageComponentModel } from './typography-page.cm.mjs';

describe('ZTypographyPage', () => {
  const theme = new ZFashionThemeBuilder().build();

  async function createTestTarget() {
    const element = <ZTypographyPage />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZTypographyPageComponentModel);
  }

  async function shouldSetFashion(expected: string) {
    // Arrange.
    const target = await createTestTarget();
    const fashion = await target.fashion();
    // Act.
    await fashion.select(expected);
    const actual = await (await target.color()).fashion();
    // Assert.
    expect(actual).toEqual(expected);
  }

  describe('Fashion', () => {
    it('should set the fashion to Primary', async () => {
      await shouldSetFashion(theme.primary.name!);
    });

    it('should set the fashion to Secondary', async () => {
      await shouldSetFashion(theme.secondary.name!);
    });

    it('should set the fashion to Success', async () => {
      await shouldSetFashion(theme.success.name!);
    });

    it('should set the fashion to Warning', async () => {
      await shouldSetFashion(theme.warning.name!);
    });

    it('should set the fashion to Error', async () => {
      await shouldSetFashion(theme.error.name!);
    });

    it('should set the fashion to Info', async () => {
      await shouldSetFashion(theme.info.name!);
    });

    it('should set the fashion to Surface', async () => {
      await shouldSetFashion(theme.surface.name!);
    });

    it('should set the fashion to Body', async () => {
      await shouldSetFashion(theme.body.name!);
    });
  });
});
