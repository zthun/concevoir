// @vitest-environment happy-dom
import { IZCircusDriver, IZCircusSetup, ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZHorizontalAnchor, ZSideAnchor, ZVerticalAnchor } from '@zthun/helpful-fn';
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { ZDrawerPage } from './drawer-page';
import { ZDrawerPageComponentModel } from './drawer-page.cm.mjs';

describe('ZDrawerPage', () => {
  let _renderer: IZCircusSetup;
  let _driver: IZCircusDriver;

  async function createTestTarget() {
    const element = <ZDrawerPage />;
    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return ZCircusBy.first(_driver, ZDrawerPageComponentModel);
  }

  afterEach(async () => {
    await _driver?.destroy?.call(_driver);
    await _renderer?.destroy?.call(_renderer);
  });

  async function shouldPositionDrawer(expected: ZSideAnchor) {
    // Arrange.
    const target = await createTestTarget();
    await target.anchor(expected);
    // Act.
    const drawer = await target.drawer();
    const actual = await drawer.anchor();
    // Assert.
    expect(actual).toEqual(expected);
  }

  it('should open the drawer', async () => {
    // Arrange.
    const target = await createTestTarget();
    const button = await target.drawerButton();
    // Act.
    await button.click();
    const drawer = await target.drawer();
    await drawer.waitForOpen();
    const actual = await drawer.opened();
    // Assert.
    expect(actual).toBeTruthy();
  });

  it('should position the drawer on the left', async () => {
    await shouldPositionDrawer(ZHorizontalAnchor.Left);
  });

  it('should position the drawer on the right', async () => {
    await shouldPositionDrawer(ZHorizontalAnchor.Right);
  });

  it('should position the drawer on the top', async () => {
    await shouldPositionDrawer(ZVerticalAnchor.Top);
  });

  it('should position the drawer on the bottom', async () => {
    await shouldPositionDrawer(ZVerticalAnchor.Bottom);
  });

  it('should close the drawer', async () => {
    // Arrange.
    const target = await createTestTarget();
    const button = await target.drawerButton();
    await button.click();
    // Act.
    await target.close();
    const drawer = await target.drawer();
    const actual = await drawer.opened();
    // Assert.
    expect(actual).toBeFalsy();
  });
});
