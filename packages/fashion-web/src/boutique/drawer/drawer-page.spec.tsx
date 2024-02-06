import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ZDrawerPage } from './drawer-page';
import { ZDrawerPageComponentModel } from './drawer-page.cm.mjs';

describe('ZDrawerPage', () => {
  async function createTestTarget() {
    const element = <ZDrawerPage />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZDrawerPageComponentModel);
  }

  async function shouldPositionDrawer(expected: 'left' | 'right' | 'top' | 'bottom') {
    // Arrange.
    const target = await createTestTarget();
    await target.anchor(expected);
    // Act.
    const drawer = await (await target.drawerButton()).open();
    const actual = await drawer.anchor();
    await target.close(drawer);
    // Assert.
    expect(actual).toEqual(expected);
  }

  it('should open the drawer', async () => {
    // Arrange.
    const target = await createTestTarget();
    const button = await target.drawerButton();
    // Act.
    await button.open();
    const actual = await button.opened();
    // Assert.
    expect(actual).toBeTruthy();
  });

  it('should position the drawer on the left', async () => {
    await shouldPositionDrawer('left');
  });

  it('should position the drawer on the right', async () => {
    await shouldPositionDrawer('right');
  });

  it('should position the drawer on the top', async () => {
    await shouldPositionDrawer('top');
  });

  it('should position the drawer on the bottom', async () => {
    await shouldPositionDrawer('bottom');
  });

  it('should close the drawer', async () => {
    // Arrange.
    const target = await createTestTarget();
    const button = await target.drawerButton();
    const drawer = await button.open();
    // Act.
    await target.close(drawer);
    const actual = await button.opened();
    // Assert.
    expect(actual).toBeFalsy();
  });
});
