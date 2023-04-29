import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { ZLabelComponentModel } from './label.cm';
import { ZLabeled } from './labeled';

describe('ZLabeled', () => {
  let label: string | undefined;
  let required: boolean | undefined;

  const createTestTarget = async () => {
    const element = <ZLabeled LabelProps={{ label, required }}>{(id) => id}</ZLabeled>;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZLabelComponentModel);
  };

  beforeEach(() => {
    label = undefined;
    required = undefined;
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
