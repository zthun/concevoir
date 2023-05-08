import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ZTestRouter } from '../router/router-dom';
import { ZBreadcrumbsOutlet } from './breadcrumbs-outlet';
import { ZBreadcrumbsOutletComponentModel } from './breadcrumbs-outlet.cm';

describe('ZBreadcrumbsOutlet', () => {
  async function createTestTarget() {
    const history = createMemoryHistory();
    const element = (
      <ZTestRouter navigator={history} location={history.location}>
        <ZBreadcrumbsOutlet />
      </ZTestRouter>
    );

    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZBreadcrumbsOutletComponentModel);
  }

  it('should render the breadcrumbs', async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    // Assert.
    await expect(target.breadcrumbs()).resolves.toBeTruthy();
  });
});
