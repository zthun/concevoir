import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZAnchor } from '@zthun/fashion-chroma';
import React, { ReactNode } from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { ZDrawerButton } from './drawer-button';
import { ZDrawerButtonComponentModel } from './drawer-button.cm';

describe('ZDrawer', () => {
  let children: ReactNode;
  let anchor: ZAnchor | undefined;

  async function createTestTarget() {
    const element = <ZDrawerButton DrawerProps={{ anchor }}>{children}</ZDrawerButton>;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZDrawerButtonComponentModel);
  }

  beforeEach(() => {
    anchor = undefined;
    children = 'Drawer Content';
  });

  it('should render the drawer content', async () => {
    // Arrange.
    const target = await createTestTarget();
    const drawer = await target.open();
    // Act.
    const root = await drawer.root();
    const actual = await root.text();
    await target.close(drawer);
    // Assert.
    expect(actual).toEqual(children);
  });

  describe('Open/Close', () => {
    it('should open the drawer', async () => {
      // Arrange.
      const target = await createTestTarget();
      const drawer = await target.open();
      // Act.
      const actual = await target.opened();
      await target.close(drawer);
      // Assert.
      expect(actual).toBeTruthy();
    });

    it('should close the drawer when the user clicks on the backdrop.', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const drawer = await target.open();
      await target.close(drawer);
      const actual = await target.opened();
      // Assert.
      expect(actual).toBeFalsy();
    });

    it('should close the drawer when the user presses the escape key', async () => {
      // Arrange.
      const target = await createTestTarget();
      await target.open();
      // Act.
      const drawer = await target.open();
      await target.escape(drawer);
      const actual = await target.opened();
      // Assert.
      expect(actual).toBeFalsy();
    });
  });

  describe('Anchor', () => {
    async function shouldAnchor(expected: ZAnchor) {
      // Arrange.
      anchor = expected;
      const target = await createTestTarget();
      const drawer = await target.open();
      // Act.
      const actual = await drawer.anchor();
      await target.close(drawer);
      // Assert.
      expect(actual).toEqual(expected);
    }

    it('should anchor to the left', async () => {
      await shouldAnchor(ZAnchor.Left);
    });

    it('should anchor to the right', async () => {
      await shouldAnchor(ZAnchor.Right);
    });

    it('should anchor to the top', async () => {
      await shouldAnchor(ZAnchor.Top);
    });

    it('should anchor to the bottom', async () => {
      await shouldAnchor(ZAnchor.Bottom);
    });
  });
});
