import { IZCircusDriver, IZCircusSetup, ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { ZWizard } from './wizard';
import { ZWizardComponentModel } from './wizard.cm';

describe('ZWizard', () => {
  let _renderer: IZCircusSetup<IZCircusDriver>;
  let _driver: IZCircusDriver;

  const createTestTarget = async () => {
    const element = (
      <ZWizard>
        <div data-name='Page 1'>Page 1</div>
        <div data-name='Page 2'>Page 2</div>
        <div data-name='Page 3'>Page 3</div>
      </ZWizard>
    );

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return ZCircusBy.first(_driver, ZWizardComponentModel);
  };

  afterEach(async () => {
    await _renderer?.destroy?.call(_renderer);
    await _driver?.destroy?.call(_driver);
  });

  describe('Navigation', () => {
    describe('Next', () => {
      it('should move to the next page', async () => {
        // Arrange.
        const target = await createTestTarget();
        const current = await target.page();
        // Act.
        await (await target.next())?.click();
        const actual = await target.page();
        // Assert.
        expect(actual).toEqual(current + 1);
      });

      it('should be hidden on the last page', async () => {
        // Arrange.
        const target = await createTestTarget();
        const next = await target.next();
        // Act.
        await next?.click();
        await next?.click();
        const actual = await target.next();
        // Assert.
        expect(actual).toBeNull();
      });
    });

    describe('Previous', () => {
      it('should move to the previous page', async () => {
        // Arrange.
        const target = await createTestTarget();
        const next = await target.next();
        await next?.click();
        await next?.click();
        const current = await target.page();
        const previous = await target.previous();
        // Act.
        await previous.click();
        const actual = await target.page();
        // Assert.
        expect(actual).toEqual(current - 1);
      });

      it('should be disabled if the current page is the first page', async () => {
        // Arrange.
        const target = await createTestTarget();
        const previous = await target.previous();
        // Act.
        const actual = await previous.disabled();
        // Assert.
        expect(actual).toBeTruthy();
      });
    });

    describe('Finish', () => {
      it('should be shown on the last page.', async () => {
        // Arrange.
        const target = await createTestTarget();
        const next = await target.next();
        // Act
        await next?.click();
        await next?.click();
        const actual = await target.finish();
        // Assert.
        expect(actual).toBeTruthy();
      });

      it('should be hidden before the last page.', async () => {
        // Arrange.
        const target = await createTestTarget();
        // Act.
        const actual = await target.finish();
        // Assert.
        expect(actual).toBeNull();
      });
    });
  });
});
