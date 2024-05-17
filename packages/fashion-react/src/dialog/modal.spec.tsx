// @vitest-environment happy-dom

import { IZCircusDriver, IZCircusSetup, ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZButtonComponentModel, ZDialogComponentModel } from '@zthun/fashion-circus';
import { ZFashionSeverity } from '@zthun/fashion-theme';
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { ZDialogButton } from './dialog-button';
import { IZModal, ZModal } from './modal';

describe('ZModal', () => {
  let _renderer: IZCircusSetup;
  let _driver: IZCircusDriver;

  const createTestTarget = async (overrides?: Partial<IZModal>) => {
    const element = (
      <ZDialogButton
        renderDialog={(props: IZModal) => (
          <ZModal
            renderHeader={() => <div>Header</div>}
            renderFooter={() => <div>Footer</div>}
            {...props}
            {...overrides}
          >
            Modal Content
          </ZModal>
        )}
      />
    );

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();

    return Promise.all([
      ZCircusBy.first(_driver, ZButtonComponentModel),
      ZCircusBy.first(_driver, ZDialogComponentModel)
    ]);
  };

  afterEach(async () => {
    await _driver?.destroy?.call(_driver);
    await _renderer?.destroy?.call(_renderer);
  });

  describe('Header', () => {
    it('should render the header', async () => {
      // Arrange.
      const [button, modal] = await createTestTarget();
      await button.click();
      await modal.waitForOpen();
      // Act.
      const header = await modal.header();
      const actual = await header.text();
      // Assert.
      expect(actual).toEqual('Header');
    });
  });

  describe('Footer', () => {
    it('should render the footer', async () => {
      // Arrange.
      const [button, modal] = await createTestTarget();
      await button.click();
      await modal.waitForOpen();
      // Act.
      const footer = await modal.footer();
      const actual = await footer.text();
      // Assert.
      expect(actual).toEqual('Footer');
    });
  });

  describe('Open/Close', () => {
    it('should be opened when the button is clicked', async () => {
      // Arrange.
      const [button, modal] = await createTestTarget();
      await button.click();
      await modal.waitForOpen();
      // Act.
      const actual = await modal.opened();
      // Assert.
      expect(actual).toBeTruthy();
    });

    it('should be closed when the escape key is pressed', async () => {
      // Arrange.
      const [button, modal] = await createTestTarget();
      await button.click();
      await modal.waitForOpen();
      // Act
      await modal.close();
      await modal.waitForClose();
      const actual = await modal.opened();
      // Assert.
      expect(actual).toBeFalsy();
    });
  });

  describe('Fashion', () => {
    it('should set the fashion value', async () => {
      // Arrange.
      const fashion = ZFashionSeverity.Success;
      const [button, modal] = await createTestTarget({ fashion });
      await button.click();
      await modal.waitForOpen();
      // Act.
      const actual = await modal.fashion();
      // Assert.
      expect(actual).toEqual(fashion);
    });
  });
});
