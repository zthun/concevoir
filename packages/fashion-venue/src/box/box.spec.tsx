import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZSizeFixed, ZSizeVaried } from '@zthun/fashion-designer';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ZBox } from './box';

describe('ZBox', () => {
  async function createTestTarget() {
    const element = <ZBox padding={ZSizeFixed.Large} margin={ZSizeVaried.Fit} />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return driver;
  }

  it('should render the component', async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});
