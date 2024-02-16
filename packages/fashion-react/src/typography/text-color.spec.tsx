import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { IZFashion, ZFashionBuilder } from '@zthun/fashion-theme';
import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { ZTextColor } from './text-color';
import { ZTextColorComponentModel } from './text-color.cm.mjs';

describe('ZTextColor', () => {
  let fashion: IZFashion | undefined;

  async function createTestTarget() {
    const element = <ZTextColor fashion={fashion}>Colorful text!</ZTextColor>;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZTextColorComponentModel);
  }

  beforeEach(() => {
    fashion = undefined;
  });

  it('should set the fashion to Inherit when no fashion is provided', async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const actual = await target.fashion();
    // Assert.
    expect(actual).toEqual('Inherit');
  });

  it('should set the fashion', async () => {
    // Arrange.
    fashion = new ZFashionBuilder().name('Test Fashion').build();
    const target = await createTestTarget();
    // Act.
    const actual = await target.fashion();
    // Assert.
    expect(actual).toEqual(fashion.name);
  });
});
