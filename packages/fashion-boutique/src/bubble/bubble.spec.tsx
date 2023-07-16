import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ZIconFontAwesome } from '../icon/icon-font-awesome';
import { ZIconComponentModel } from '../icon/icon.cm';
import { ZBubble } from './bubble';
import { ZBubbleComponentModel } from './bubble.cm';

describe('ZBubble', () => {
  const createTestTarget = async () => {
    const element = (
      <ZBubble>
        <ZIconFontAwesome name='save' />
      </ZBubble>
    );

    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZBubbleComponentModel);
  };

  it('should render the content', async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const actual = ZCircusBy.first(target.driver, ZIconComponentModel);
    // Assert.
    expect(actual).toBeTruthy();
  });
});
