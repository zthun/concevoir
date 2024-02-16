import { IZCircusDriver, ZCircusBy } from '@zthun/cirque';
import { ZSuspenseComponentModel } from '@zthun/fashion-circus';
import { ZSuspenseRotate } from './suspense-rotate';

import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ZSuspenseProgress } from './suspense-progress';

describe('ZSuspense', () => {
  async function shouldDisplayWhenThereIsSuspense(createTestTarget: () => Promise<IZCircusDriver>) {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const actual = await ZSuspenseComponentModel.loading(target);
    // Assert.
    expect(actual).toBeTruthy();
  }

  async function shouldHideWhenThereIsNoSuspense(createTestTarget: (loading: boolean) => Promise<IZCircusDriver>) {
    // Arrange.
    const target = await createTestTarget(false);
    // Act.
    const actual = await ZSuspenseComponentModel.loading(target);
    // Assert.
    expect(actual).toBeFalsy();
  }

  async function shouldWaitToLoad(createTestTarget: (loading: boolean, name: string) => Promise<IZCircusDriver>) {
    // Arrange.
    const name = 'test-suspense';
    const target = await createTestTarget(false, name);
    // Act.
    await ZSuspenseComponentModel.load(target, name);
    const actual = await ZSuspenseComponentModel.loading(target, name);
    // Assert.
    expect(actual).toBeFalsy();
  }

  async function shouldScaleWidth(
    expected: ZSizeFixed,
    createTestTarget: (size?: ZSizeFixed) => Promise<ZSuspenseComponentModel>
  ) {
    // Arrange.
    const target = await createTestTarget(expected);
    // Act
    const actual = await target.width();
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function shouldScaleHeight(
    expected: ZSizeFixed,
    createTestTarget: (size?: ZSizeFixed) => Promise<ZSuspenseComponentModel>
  ) {
    // Arrange.
    const target = await createTestTarget(expected);
    // Act
    const actual = await target.height();
    // Assert.
    expect(actual).toEqual(expected);
  }

  describe('Rotate', () => {
    function createTestTarget(loading?: boolean) {
      const element = <ZSuspenseRotate loading={loading} />;
      return new ZCircusSetupRenderer(element).setup();
    }

    function createNamedTargets(loading?: boolean, name?: string) {
      const element = (
        <>
          <ZSuspenseRotate />
          <ZSuspenseRotate loading={loading} name={name} />
          <ZSuspenseRotate />
        </>
      );

      return new ZCircusSetupRenderer(element).setup();
    }

    it('should display when the suspense is loading', async () => {
      await shouldDisplayWhenThereIsSuspense(createTestTarget);
    });

    it('should hide when the suspense is not loading', async () => {
      await shouldHideWhenThereIsNoSuspense(createTestTarget);
    });

    it('should wait for load', async () => {
      await shouldWaitToLoad(createNamedTargets);
    });

    describe('Width', () => {
      async function createTestTarget(size?: ZSizeFixed) {
        const element = <ZSuspenseRotate loading width={size} />;
        const driver = await new ZCircusSetupRenderer(element).setup();
        return ZCircusBy.first(driver, ZSuspenseComponentModel);
      }

      it('should scale xs', async () => {
        await shouldScaleWidth(ZSizeFixed.ExtraSmall, createTestTarget);
      });

      it('should scale sm', async () => {
        await shouldScaleWidth(ZSizeFixed.Small, createTestTarget);
      });

      it('should scale md', async () => {
        await shouldScaleWidth(ZSizeFixed.Medium, createTestTarget);
      });

      it('should scale lg', async () => {
        await shouldScaleWidth(ZSizeFixed.Large, createTestTarget);
      });

      it('should scale xl', async () => {
        await shouldScaleWidth(ZSizeFixed.ExtraLarge, createTestTarget);
      });
    });
  });

  describe('Progress', () => {
    function createTestTarget(loading?: boolean) {
      const element = <ZSuspenseProgress loading={loading} />;
      return new ZCircusSetupRenderer(element).setup();
    }

    function createNamedTargets(loading?: boolean, name?: string) {
      const element = (
        <>
          <ZSuspenseProgress />
          <ZSuspenseProgress loading={loading} name={name} />
          <ZSuspenseProgress />
        </>
      );

      return new ZCircusSetupRenderer(element).setup();
    }

    it('should display when the suspense is loading', async () => {
      await shouldDisplayWhenThereIsSuspense(createTestTarget);
    });

    it('should hide when the suspense is not loading', async () => {
      await shouldHideWhenThereIsNoSuspense(createTestTarget);
    });

    it('should wait for load', async () => {
      await shouldWaitToLoad(createNamedTargets);
    });

    describe('Height', () => {
      async function createTestTarget(size?: ZSizeFixed) {
        const element = <ZSuspenseProgress loading height={size} />;
        const driver = await new ZCircusSetupRenderer(element).setup();
        return ZCircusBy.first(driver, ZSuspenseComponentModel);
      }

      it('should scale xs', async () => {
        await shouldScaleHeight(ZSizeFixed.ExtraSmall, createTestTarget);
      });

      it('should scale sm', async () => {
        await shouldScaleHeight(ZSizeFixed.Small, createTestTarget);
      });

      it('should scale md', async () => {
        await shouldScaleHeight(ZSizeFixed.Medium, createTestTarget);
      });

      it('should scale lg', async () => {
        await shouldScaleHeight(ZSizeFixed.Large, createTestTarget);
      });

      it('should scale xl', async () => {
        await shouldScaleHeight(ZSizeFixed.ExtraLarge, createTestTarget);
      });
    });
  });
});
