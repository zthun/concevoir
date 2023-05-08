import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ZTestRouter } from '../router/router-dom';
import { ZBreadcrumbOutlet } from './breadcrumb-outlet';
import { ZBreadcrumbOutletComponentModel } from './breadcrumb-outlet.cm';

describe('ZBreadcrumbOutlet', () => {
  async function createTestTarget() {
    const history = createMemoryHistory();
    const element = (
      <ZTestRouter navigator={history} location={history.location}>
        <ZBreadcrumbOutlet />
      </ZTestRouter>
    );

    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZBreadcrumbOutletComponentModel);
  }

  it('should render the breadcrumbs', async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    // Assert.
    await expect(target.breadcrumbs()).resolves.toBeTruthy();
  });
});
