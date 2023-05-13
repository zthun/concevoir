import { IZCircusDriver, ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZOrientation } from '@zthun/helpful-fn';
import React from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ZLabelComponentModel } from './label.cm';
import { ZLabeled } from './labeled';

describe('ZLabeled', () => {
  describe('With', () => {
    let _driver: IZCircusDriver;
    let label: string;
    let required: boolean | undefined;
    let orientation: ZOrientation | undefined;

    const createTestTarget = async () => {
      const element = (
        <ZLabeled LabelProps={{ label, required }} orientation={orientation}>
          {(id) => id}
        </ZLabeled>
      );
      _driver = await new ZCircusSetupRenderer(element).setup();
      return ZCircusBy.first(_driver, ZLabelComponentModel);
    };

    beforeEach(() => {
      label = 'My Label';
      required = undefined;
      orientation = undefined;
    });

    afterEach(async () => {
      await _driver.destroy();
    });

    it('should set the text of the label.', async () => {
      // Arrange.
      label = 'My Label';
      const target = await createTestTarget();
      // Act.
      const actual = await target.text();
      // Assert.
      expect(actual).toEqual(label);
    });

    describe('Required', () => {
      const shouldBeRequired = async (expected: boolean | undefined) => {
        // Arrange.
        orientation = ZOrientation.Horizontal;
        required = expected;
        const target = await createTestTarget();
        // Act.
        const actual = await target.required();
        // Assert.
        expect(actual).toEqual(!!expected);
      };

      it('should turn on the flag.', async () => await shouldBeRequired(true));
      it('should turn off the flag.', async () => await shouldBeRequired(false));
      it('should be false by default.', async () => await shouldBeRequired(undefined));
    });
  });

  describe('Without', () => {
    it('should not render a label', async () => {
      // Arrange.
      const element = <ZLabeled>{(id) => id}</ZLabeled>;
      const driver = await new ZCircusSetupRenderer(element).setup();
      // Act.
      const actual = await ZCircusBy.optional(driver, ZLabelComponentModel);
      // Assert.
      expect(actual).toBeFalsy();
    });
  });
});
