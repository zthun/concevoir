import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZFashionName, ZFashionPriority } from '@zthun/fashion-theme';
import { Property } from 'csstype';
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

  describe('Edge', () => {
    const shouldSetEdge = async (expected: ZSizeFixed) => {
      // Arrange.
      const target = await createTestTarget();
      const edge = await target.edge();
      await edge.select(expected);
      const bubble = await target.bubble();
      // Act.
      const actual = await bubble.edge();
      // Assert.
      expect(actual).toEqual(expected);
    };

    it('should set the edge to small', async () => {
      await shouldSetEdge(ZSizeFixed.Small);
    });

    it('should set the edge to large', async () => {
      await shouldSetEdge(ZSizeFixed.Large);
    });
  });

  describe('Trim', () => {
    const shouldSetTrim = async (expected: Property.BorderStyle) => {
      // Arrange.
      const target = await createTestTarget();
      const trim = await target.trim();
      await trim.select(expected);
      const bubble = await target.bubble();
      // Act.
      const actual = await bubble.trim();
      // Assert.
      expect(actual).toEqual(expected);
    };

    it('should set the trim to dashed', async () => {
      await shouldSetTrim('dashed');
    });

    it('should set the trim to double', async () => {
      await shouldSetTrim('double');
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
