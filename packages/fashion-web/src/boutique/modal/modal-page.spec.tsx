// vitest-environment happy-dom

import { IZCircusDriver, IZCircusSetup, ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZButtonComponentModel } from '@zthun/fashion-circus';
import { ZFashionName, ZFashionPriority } from '@zthun/fashion-theme';
import { lowerCase } from 'lodash-es';
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { ZModalPage } from './modal-page';
import { ZModalPageComponentModel } from './modal-page.cm.mjs';

describe('ZModalPage', () => {
  let _renderer: IZCircusSetup;
  let _driver: IZCircusDriver;

  const createTestTarget = async () => {
    const element = <ZModalPage />;

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return ZCircusBy.first(_driver, ZModalPageComponentModel);
  };

  afterEach(async () => {
    await _driver?.destroy?.call(_driver);
    await _renderer?.destroy?.call(_renderer);
  });

  describe('Open', () => {
    it('should open the modal when the button is clicked', async () => {
      // Arrange.
      const target = await createTestTarget();
      const fw = await target.fullWidth();
      const fh = await target.fullHeight();
      await fw.toggle(true);
      await fh.toggle(true);
      const modal = await target.openModal();
      await modal.waitForOpen();
      // Act.
      const actual = await modal.opened();
      // Assert.
      expect(actual).toBeTruthy();
    });
  });

  describe('Close', () => {
    const shouldCloseModal = async (name: 'cancel' | 'save') => {
      // Arrange.
      const target = await createTestTarget();
      const modal = await target.openModal();
      const footer = await modal.footer();
      const button = await ZCircusBy.first(footer, ZButtonComponentModel, name);
      // Act.
      await button.click();
      await modal.waitForClose();
      const actual = await modal.opened();
      // Assert.
      expect(actual).toBeFalsy();
    };

    it('should be invoked with the cancel button', async () => {
      await shouldCloseModal('cancel');
    });

    it('should be invoked with the save button', async () => {
      await shouldCloseModal('save');
    });
  });

  describe('Persistent', () => {
    it('should not close the dialog on escape', async () => {
      // Arrange.
      const target = await createTestTarget();
      const persistent = await target.persistent();
      await persistent.toggle(true);
      const modal = await target.openModal();
      // Act.
      await modal.close();
      const actual = await modal.opened();
      // Assert.
      expect(actual).toBeTruthy();
    });
  });

  describe('Fashion', () => {
    const shouldSetFashion = async (expected: ZFashionName) => {
      // Arrange.
      const target = await createTestTarget();
      const fashion = await target.fashion();
      // Act.
      await fashion.select(expected);
      const modal = await target.openModal();
      const actual = await modal.fashion();
      await modal.close();
      // Assert.
      expect(lowerCase(actual!)).toEqual(expected);
    };

    it('should set the fashion to primary', async () => {
      await shouldSetFashion(ZFashionPriority.Primary);
    });

    it('should set the fashion to secondary', async () => {
      await shouldSetFashion(ZFashionPriority.Secondary);
    });
  });
});
