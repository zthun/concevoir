// @vitest-environment happy-dom

import { IZCircusDriver, IZCircusSetup, ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZButtonComponentModel, ZDrawerComponentModel } from '@zthun/fashion-circus';
import { ZHorizontalAnchor, ZSideAnchor, ZVerticalAnchor } from '@zthun/helpful-fn';
import React, { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ZDrawerButton } from './drawer-button';

describe('ZDrawer', () => {
  let children: ReactNode;
  let anchor: ZSideAnchor | undefined;
  let _renderer: IZCircusSetup;
  let _driver: IZCircusDriver;

  async function createTestTarget(): Promise<[ZButtonComponentModel, ZDrawerComponentModel]> {
    const element = <ZDrawerButton DrawerProps={{ anchor }}>{children}</ZDrawerButton>;
    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return Promise.all([
      ZCircusBy.first(_driver, ZButtonComponentModel),
      ZCircusBy.first(_driver, ZDrawerComponentModel)
    ]);
  }

  beforeEach(() => {
    anchor = undefined;
    children = 'Drawer Content';
  });

  afterEach(async () => {
    await _driver?.destroy?.call(_driver);
    await _renderer?.destroy?.call(_renderer);
  });

  it('should render the drawer content', async () => {
    // Arrange.
    const [button, drawer] = await createTestTarget();
    await button.click();
    // Act.
    const actual = await drawer.driver.text();
    // Assert.
    expect(actual).toEqual(children);
  });

  describe('Open/Close', () => {
    it('should open the drawer', async () => {
      // Arrange.
      const [button, drawer] = await createTestTarget();
      await button.click();
      await drawer.waitForOpen();
      // Act.
      const actual = await drawer.opened();
      // Assert.
      expect(actual).toBeTruthy();
    });

    /*
    it('should close the drawer.', async () => {
      // Arrange.
      const [button, drawer] = await createTestTarget();
      await button.click();
      await drawer.waitForOpen();
      // Act.
      await drawer.close();
      await drawer.waitForClose();
      const actual = await drawer.opened();
      // Assert.
      expect(actual).toBeFalsy();
    });
    */
  });

  describe('Anchor', () => {
    async function shouldAnchor(expected: ZSideAnchor) {
      // Arrange.
      anchor = expected;
      const [, drawer] = await createTestTarget();
      // Act.
      const actual = await drawer.anchor();
      // Assert.
      expect(actual).toEqual(expected);
    }

    it('should anchor to the left', async () => {
      await shouldAnchor(ZHorizontalAnchor.Left);
    });

    it('should anchor to the right', async () => {
      await shouldAnchor(ZHorizontalAnchor.Right);
    });

    it('should anchor to the top', async () => {
      await shouldAnchor(ZVerticalAnchor.Top);
    });

    it('should anchor to the bottom', async () => {
      await shouldAnchor(ZVerticalAnchor.Bottom);
    });
  });
});
