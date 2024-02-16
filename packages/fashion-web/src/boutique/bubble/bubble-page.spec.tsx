import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZFashionName, ZFashionPriority } from '@zthun/fashion-theme';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ZBubblePage } from './bubble-page';
import { ZBubblePageComponentModel } from './bubble-page.cm.mjs';

describe('ZBubblePage', () => {
  const createTestTarget = async () => {
    const element = <ZBubblePage />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZBubblePageComponentModel);
  };

  describe('Click', () => {
    it('should turn off the click state', async () => {
      // Arrange.
      const target = await createTestTarget();
      const clickable = await target.clickable();
      await clickable.toggle(false);
      const expected = await target.clicks();
      const bubble = await target.bubble();
      // Act.
      await bubble.click();
      const actual = await target.clicks();
      // Assert.
      expect(actual).toEqual(expected);
    });

    it('should increment the click count', async () => {
      // Arrange.
      const target = await createTestTarget();
      const clickable = await target.clickable();
      await clickable.toggle(true);
      const current = await target.clicks();
      const bubble = await target.bubble();
      // Act.
      await bubble.click();
      const actual = await target.clicks();
      // Assert.
      expect(actual).toEqual(current + 1);
    });
  });

  describe('Size', () => {
    const shouldSetBorderSize = async (expected: ZSizeFixed) => {
      // Arrange.
      const target = await createTestTarget();
      const border = await target.borderWidth();
      await border.select(expected);
      const bubble = await target.bubble();
      // Act.
      const actual = await bubble.borderSize();
      // Assert.
      expect(actual).toEqual(expected);
    };

    it('should set the border width to small', async () => {
      await shouldSetBorderSize(ZSizeFixed.Small);
    });

    it('should set the border with to large', async () => {
      await shouldSetBorderSize(ZSizeFixed.Large);
    });
  });

  describe('Fashion', () => {
    const shouldSetFashion = async (expected: ZFashionName) => {
      // Arrange.
      const target = await createTestTarget();
      const fashion = await target.fashion();
      await fashion.select(expected);
      const bubble = await target.bubble();
      // Act.
      const actual = await bubble.fashion();
      // Assert.
      expect(actual).toEqual(expected);
    };
    it('should set the fashion to primary', async () => {
      await shouldSetFashion(ZFashionPriority.Primary);
    });

    it('should set the fashion to secondary', async () => {
      await shouldSetFashion(ZFashionPriority.Secondary);
    });
  });
});
