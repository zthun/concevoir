/* eslint-disable require-jsdoc */
import { IZCircusDriver, IZCircusSetup, ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZFashionName, ZFashionPriority, ZFashionSeverity } from '@zthun/fashion-theme';
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { ZPaginationPage } from './pagination-page';
import { ZPaginationPageComponentModel } from './pagination-page.cm.mjs';

describe('ZPaginationPage', () => {
  let _renderer: IZCircusSetup;
  let _driver: IZCircusDriver;

  async function createTestTarget() {
    const element = <ZPaginationPage />;
    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return ZCircusBy.first(_driver, ZPaginationPageComponentModel);
  }

  afterEach(async () => {
    await _driver?.destroy?.call(_driver);
    await _renderer?.destroy?.call(_renderer);
  });

  describe('Pages', () => {
    it('should set the total pages on the pagination component', async () => {
      // Arrange.
      const target = await createTestTarget();
      const pages = await target.pages();
      const expected = 22;
      // Act.
      await pages.clear();
      await pages.keyboard(`${expected}`);
      const pagination = await target.pagination();
      const actual = await pagination.pages();
      // Assert.
      expect(actual).toEqual(expected);
    });
  });

  describe('Fashion', () => {
    const shouldSetFashion = async (expected: ZFashionName) => {
      // Arrange.
      const target = await createTestTarget();
      const fashion = await target.fashion();
      // Act.
      await fashion.select(expected);
      const pagination = await target.pagination();
      const actual = await pagination.fashion();
      // Assert.
      expect(actual).toEqual(expected);
    };

    it('should set the fashion to success', async () => {
      await shouldSetFashion(ZFashionSeverity.Success);
    });

    it('should set the fashion to secondary', async () => {
      await shouldSetFashion(ZFashionPriority.Secondary);
    });
  });

  describe('Navigation', () => {
    it('should update the current page selected', async () => {
      // Arrange.
      const target = await createTestTarget();
      const pagination = await target.pagination();
      const pages = await target.pages();
      await pages.increment(10);
      // Act.
      await pagination.next();
      await pagination.next();
      const actual = await target.current();
      // Assert.
      expect(actual).toEqual(3);
    });
  });
});
