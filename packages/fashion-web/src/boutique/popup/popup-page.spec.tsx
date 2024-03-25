import { IZCircusDriver, IZCircusSetup, ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { ZPopupPage } from './popup-page';
import { ZPopupPageComponentModel } from './popup-page.cm.mjs';

describe('ZPopupPage', () => {
  let _renderer: IZCircusSetup<IZCircusDriver>;
  let _driver: IZCircusDriver;

  async function createTestTarget() {
    const element = <ZPopupPage />;
    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return ZCircusBy.first(_driver, ZPopupPageComponentModel);
  }

  afterEach(async () => {
    await _driver.destroy?.call(_driver);
    await _renderer.destroy?.call(_renderer);
  });

  it('should open the popup', async () => {
    // Arrange.
    const target = await createTestTarget();
    const toggler = await target.toggler();
    // Act.
    await toggler.open();
    const actual = await toggler.opened();
    // Assert.
    expect(actual).toBeTruthy();
  });
});
