import { IZCircusDriver, ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZOrientation } from '@zthun/helpful-fn';
import React from 'react';
import { Mock, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ZPagination } from './pagination';
import { ZPaginationComponentModel } from './pagination.cm';

describe('ZPagination', () => {
  let pages: number | undefined;
  let value: number | undefined;
  let onValueChange: Mock | undefined;
  let orientation: ZOrientation | undefined;
  let _driver: IZCircusDriver;

  async function createTestTarget() {
    const element = <ZPagination pages={pages} value={value} onValueChange={onValueChange} orientation={orientation} />;
    _driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(_driver, ZPaginationComponentModel);
  }

  beforeEach(() => {
    pages = undefined;
    value = undefined;
    orientation = undefined;
    onValueChange = undefined;
  });

  afterEach(async () => {
    await _driver?.destroy?.call(_driver);
  });

  describe('Defaults', () => {
    it('should always have 1 page.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act.
      const actual = await target.count();
      // Assert.
      expect(actual).toEqual(1);
    });
  });

  describe('Jump', () => {
    beforeEach(() => {
      pages = 5;
    });

    async function shouldJumpToPage(
      expected: number,
      start: number,
      jumpFn: (t: ZPaginationComponentModel) => Promise<number | null>
    ) {
      // Arrange.
      value = start;
      onValueChange = vi.fn();
      const target = await createTestTarget();
      // Act.
      await jumpFn(target);
      // Assert.
      expect(onValueChange).toHaveBeenCalledWith(expected);
    }

    describe('Jump', () => {
      it('should navigate.', async () => {
        await shouldJumpToPage(3, 1, (t) => t.jump(3));
      });

      it('should remain on the page if the jump cannot be made.', async () => {
        // Arrange.
        pages = 100;
        const target = await createTestTarget();
        // Act.
        await target.jump(72);
        const actual = await target.value();
        // Assert.
        expect(actual).toEqual(1);
      });
    });

    describe('Next', () => {
      beforeEach(() => {
        orientation = ZOrientation.Vertical;
      });

      it('should navigate.', async () => {
        await shouldJumpToPage(2, 1, (t) => t.next());
      });

      it('should remain on the page if it is already on the last page.', async () => {
        // Arrange.
        const target = await createTestTarget();
        // Act.
        await target.jump(pages!);
        await target.next();
        const actual = await target.value();
        // Assert.
        expect(actual).toEqual(pages);
      });
    });

    describe('Previous', () => {
      beforeEach(() => {
        orientation = ZOrientation.Horizontal;
      });

      it('should navigate.', async () => {
        await shouldJumpToPage(1, 2, (t) => t.prev());
      });

      it('should remain on the first page if already on the first page.', async () => {
        // Arrange.
        const target = await createTestTarget();
        // Act.
        await target.jump(1);
        await target.prev();
        const actual = await target.value();
        // Assert.
        expect(actual).toEqual(1);
      });
    });
  });
});
