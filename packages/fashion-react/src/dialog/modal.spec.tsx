// @vitest-environment happy-dom

import { IZCircusDriver, IZCircusSetup, ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZDialogComponentModel } from '@zthun/fashion-circus';
import { ZFashionSeverity } from '@zthun/fashion-theme';
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { IZModal, ZModal } from './modal';

describe('ZModal', () => {
  let _renderer: IZCircusSetup;
  let _driver: IZCircusDriver;

  const createTestTarget = async (props?: Partial<IZModal>) => {
    const element = (
      <ZModal open renderHeader={() => <div>Header</div>} renderFooter={() => <div>Footer</div>} {...props}>
        Modal Content
      </ZModal>
    );

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return ZCircusBy.first(await _driver.body(), ZDialogComponentModel);
  };

  afterEach(async () => {
    await _driver?.destroy?.call(_driver);
    await _renderer?.destroy?.call(_renderer);
  });

  describe('Header', () => {
    it('should render the header', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const header = await target.header();
      const actual = await header.text();
      // Assert.
      expect(actual).toEqual('Header');
    });
  });

  describe('Footer', () => {
    it('should render the footer', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const footer = await target.footer();
      const actual = await footer.text();
      // Assert.
      expect(actual).toEqual('Footer');
    });
  });

  describe('Close', () => {
    it('should be open when the modal open flag is true', async () => {
      // Arrange.
      const target = await createTestTarget({ open: true });
      // Act.
      await target.waitForOpen();
      const actual = await target.opened();
      // Assert.
      expect(actual).toBeTruthy();
    });

    it('should be closed when the modal open flag is false', async () => {
      // Arrange.
      const target = await createTestTarget({ open: false });
      // Act.
      await target.waitForClose();
      const actual = await target.opened();
      // Assert.
      expect(actual).toBeFalsy();
    });

    it('should invoke the onClose when the close event happens', async () => {
      // Arrange.
      const onClose = vi.fn();
      const target = await createTestTarget({ onClose, open: true });
      await target.waitForOpen();
      // Act.
      await target.close();
      // Assert.
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('Fashion', () => {
    it('should set the fashion value', async () => {
      // Arrange.
      const fashion = ZFashionSeverity.Success;
      const target = await createTestTarget({ fashion });
      // Act.
      const actual = await target.fashion();
      // Assert.
      expect(actual).toEqual(fashion);
    });
  });
});
