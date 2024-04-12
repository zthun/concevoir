import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZBreadcrumbsComponentModel } from '@zthun/fashion-circus';
import { createMemoryHistory } from 'history';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ZTestRouter } from '../router/router-dom.mjs';
import { ZBreadcrumbsOutlet } from './breadcrumbs-outlet';

describe('ZBreadcrumbsOutlet', () => {
  async function createTestTarget() {
    const history = createMemoryHistory();
    const element = (
      <ZTestRouter navigator={history} location={history.location}>
        <ZBreadcrumbsOutlet />
      </ZTestRouter>
    );

    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZBreadcrumbsComponentModel);
  }

  it('should render the breadcrumbs', async () => {
    // Arrange.
    const target = createTestTarget();
    // Act.
    // Assert.
    await expect(target).resolves.toBeTruthy();
  });
});
