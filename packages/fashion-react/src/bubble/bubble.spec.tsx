import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZBubbleComponentModel, ZIconComponentModel } from '@zthun/fashion-circus';
import React from 'react';
import { Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import { ZIconFontAwesome } from '../icon/icon-font-awesome';
import { ZBubble } from './bubble';

describe('ZBubble', () => {
  let onClick: Mock | undefined;

  const createTestTarget = async () => {
    const element = (
      <ZBubble onClick={onClick}>
        <ZIconFontAwesome name='save' />
      </ZBubble>
    );

    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZBubbleComponentModel);
  };

  beforeEach(() => {
    onClick = undefined;
  });

  it('should render the content', async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const actual = ZCircusBy.first(target.driver, ZIconComponentModel);
    // Assert.
    expect(actual).toBeTruthy();
  });

  describe('Click', () => {
    it('should raise the onClick event', async () => {
      // Arrange.
      onClick = vi.fn();
      const target = await createTestTarget();
      // Act.
      await target.click();
      // Assert.
      expect(onClick).toHaveBeenCalled();
    });
  });
});
