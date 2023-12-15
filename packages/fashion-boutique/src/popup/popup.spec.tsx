import { IZCircusDriver, ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZHorizontalAnchor, ZVerticalAnchor } from '@zthun/helpful-fn';
import React from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ZPopupButton } from './popup-button';
import { ZPopupButtonComponentModel } from './popup-button.cm';

describe('ZPopup', () => {
  let attachOrigin: [ZVerticalAnchor, ZHorizontalAnchor] | undefined;
  let popupOrigin: [ZVerticalAnchor, ZHorizontalAnchor] | undefined;
  let _driver: IZCircusDriver;

  async function createTestTarget() {
    const element = <ZPopupButton PopupProps={{ attachOrigin, popupOrigin }}>Content</ZPopupButton>;
    _driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(_driver, ZPopupButtonComponentModel);
  }

  beforeEach(() => {
    attachOrigin = undefined;
    popupOrigin = undefined;
  });

  afterEach(async () => {
    await _driver?.destroy?.call(_driver);
  });

  describe('Open', () => {
    it('should open the popup when clicked', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.open();
      // Assert.
      expect(actual).toBeTruthy();
    });

    it('should open over the element', async () => {
      // Arrange
      attachOrigin = [ZVerticalAnchor.Top, ZHorizontalAnchor.Left];
      popupOrigin = [ZVerticalAnchor.Bottom, ZHorizontalAnchor.Left];
      const target = await createTestTarget();
      // Act.
      const actual = await target.open();
      // Assert.
      expect(actual).toBeTruthy();
    });
  });

  describe('Close', () => {
    it('should close the popup when clicking on the backdrop', async () => {
      // Arrange.
      attachOrigin = [ZVerticalAnchor.Middle, ZHorizontalAnchor.Left];
      popupOrigin = [ZVerticalAnchor.Middle, ZHorizontalAnchor.Left];
      const target = await createTestTarget();
      const popup = await target.open();
      // Act.
      await popup.close();
      const actual = await target.opened();
      // Assert.
      expect(actual).toBeFalsy();
    });

    it('should close the popup when pressing the escape key', async () => {
      // Arrange.
      const target = await createTestTarget();
      const popup = await target.open();
      // Act.
      await popup.escape();
      const actual = await target.opened();
      // Assert.
      expect(actual).toBeFalsy();
    });
  });

  describe('Content', () => {
    it('should render the content', async () => {
      // Arrange.
      const target = await createTestTarget();
      const popup = await target.open();
      // Act.
      const actual = await (await popup.content()).text();
      // Assert.
      expect(actual).toEqual('Content');
    });
  });
});
