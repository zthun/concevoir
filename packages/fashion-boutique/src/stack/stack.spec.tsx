import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZOrientation } from '@zthun/helpful-fn';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ZStack } from './stack';
import { ZStackComponentModel } from './stack.cm';

describe('ZStack', () => {
  let orientation: ZOrientation | undefined;

  async function createTestTarget() {
    const element = <ZStack orientation={orientation} />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZStackComponentModel);
  }

  describe('Orientation', () => {
    it('should orient vertically by default', async () => {
      // Arrange.
      orientation = undefined;
      const target = await createTestTarget();
      // Act.
      const actual = await target.orientation();
      // Assert.
      expect(actual).toEqual('vertical');
    });

    it('should orient horizontally', async () => {
      // Arrange.
      orientation = ZOrientation.Horizontal;
      const target = await createTestTarget();
      // Act.
      const actual = await target.orientation();
      // Assert.
      expect(actual).toEqual(orientation);
    });
  });
});
