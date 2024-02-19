import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZSizeFixed, ZSizeVaried, ZSizeVoid } from '@zthun/fashion-tailor';
import { Property } from 'csstype';
import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { ZGrid } from './grid';
import { ZGridSpan } from './grid-span';

describe('ZGrid', () => {
  let gap: ZSizeFixed | ZSizeVoid | undefined;
  let height: ZSizeVaried | undefined;
  let xl: Property.GridTemplateColumns | undefined;

  beforeEach(() => {
    gap = undefined;
    height = undefined;
    xl = undefined;
  });

  async function createTestTarget() {
    const element = (
      <ZGrid className='ZTestGrid-root' height={height} gap={gap} columns={xl}>
        <ZGridSpan />
      </ZGrid>
    );
    const driver = await new ZCircusSetupRenderer(element).setup();
    return driver;
  }

  it('should render with a gap', async () => {
    // Arrange.
    gap = ZSizeFixed.Medium;
    height = ZSizeVaried.Full;
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });

  it('should render without a gap', async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });

  it('should render with responsive columns', async () => {
    // Arrange.
    xl = 'auto auto auto auto auto';
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});
