// @vitest-environment happy-dom
import { IZCircusDriver, IZCircusSetup, ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZFashionPriority } from '@zthun/fashion-theme';
import { ZHorizontalAnchor, ZSideAnchor, ZVerticalAnchor } from '@zthun/helpful-fn';
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { ZDialogPage } from './dialog-page';
import { ZDialogPageComponentModel } from './dialog-page.cm.mjs';

describe('ZDialogPage', () => {
  let _renderer: IZCircusSetup;
  let _driver: IZCircusDriver;

  async function createTestTarget() {
    const element = <ZDialogPage />;
    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return ZCircusBy.first(_driver, ZDialogPageComponentModel);
  }

  afterEach(async () => {
    await _driver?.destroy?.call(_driver);
    await _renderer?.destroy?.call(_renderer);
  });

  describe('Drawer', () => {
    const shouldPositionDrawer = async (expected: ZSideAnchor) => {
      // Arrange.
      const target = await createTestTarget();
      const anchor = await target.anchor();
      await anchor.select(expected);
      // Act.
      const drawer = await target.drawer();
      const actual = await drawer.anchor();
      // Assert.
      expect(actual).toEqual(expected);
    };

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

    it('should close the drawer', async () => {
      // Arrange.
      const target = await createTestTarget();
      const button = await target.drawerButton();
      await button.click();
      const drawer = await target.drawer();
      const closeDrawer = await target.closeDrawer();
      // Act.
      await closeDrawer.click();
      await drawer.waitForClose();
      const actual = await drawer.opened();
      // Assert.
      expect(actual).toBeFalsy();
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

    it('should keep the drawer open if the persistence switch is on', async () => {
      // Arrange.
      const target = await createTestTarget();
      const persistent = await target.persistent();
      await persistent.toggle(true);
      const drawerButton = await target.drawerButton();
      await drawerButton.click();
      const drawer = await target.drawer();
      // Act.
      await drawer.close();
      const actual = await drawer.opened();
      // Assert.
      expect(actual).toBeTruthy();
    });

    it('should set the fashion', async () => {
      // Arrange.
      const expected = ZFashionPriority.Primary;
      const target = await createTestTarget();
      const fashion = await target.fashion();
      await fashion.select(expected);
      const drawerButton = await target.drawerButton();
      await drawerButton.click();
      const drawer = await target.drawer();
      // Act.
      const actual = await drawer.fashion();
      // Assert.
      expect(actual).toEqual(expected);
    });
  });

  describe('Modal', () => {
    it('should open the modal', async () => {
      // Arrange.
      const target = await createTestTarget();
      const button = await target.modalButton();
      // Act.
      await button.click();
      const modal = await target.modal();
      await modal.waitForOpen();
      const actual = await modal.opened();
      // Assert.
      expect(actual).toBeTruthy();
    });

    it('should close the modal when the cancel button is clicked', async () => {
      // Arrange.
      const target = await createTestTarget();
      const button = await target.modalButton();
      await button.click();
      const modal = await target.modal();
      await modal.waitForOpen();
      const cancelModal = await target.cancelModal();
      // Act.
      await cancelModal.click();
      await modal.waitForClose();
      const actual = await modal.opened();
      // Assert.
      expect(actual).toBeFalsy();
    });

    it('should close the modal when the save button is clicked', async () => {
      // Arrange.
      const target = await createTestTarget();
      const fw = await target.fullWidth();
      const fh = await target.fullHeight();
      await fw.toggle(true);
      await fh.toggle(true);
      const button = await target.modalButton();
      await button.click();
      const modal = await target.modal();
      await modal.waitForOpen();
      const saveModal = await target.saveModal();
      // Act.
      await saveModal.click();
      await modal.waitForClose();
      const actual = await modal.opened();
      // Assert.
      expect(actual).toBeFalsy();
    });

    it('should keep the modal open if the persistence switch is on', async () => {
      // Arrange.
      const target = await createTestTarget();
      const persistent = await target.persistent();
      await persistent.toggle(true);
      const modalButton = await target.modalButton();
      await modalButton.click();
      const modal = await target.modal();
      // Act.
      await modal.close();
      const actual = await modal.opened();
      // Assert.
      expect(actual).toBeTruthy();
    });

    it('should set the fashion', async () => {
      // Arrange.
      const expected = ZFashionPriority.Primary;
      const target = await createTestTarget();
      const fashion = await target.fashion();
      await fashion.select(expected);
      const modalButton = await target.modalButton();
      await modalButton.click();
      const modal = await target.modal();
      // Act.
      const actual = await modal.fashion();
      // Assert.
      expect(actual).toEqual(expected);
    });
  });
});
