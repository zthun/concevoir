import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ZAlertPage } from './alert-page';
import { ZAlertPageComponentModel } from './alert-page.cm';

describe('ZBooleanPage', () => {
  async function createTestTarget() {
    const element = <ZAlertPage />;

    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZAlertPageComponentModel);
  }

  it('should render the component.', async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});
