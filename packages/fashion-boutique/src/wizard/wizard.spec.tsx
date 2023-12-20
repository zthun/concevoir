import { IZCircusDriver, IZCircusSetup, ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { ZWizard } from './wizard';
import { ZWizardComponentModel } from './wizard.cm';

describe('ZWizard', () => {
  let _renderer: IZCircusSetup<IZCircusDriver>;
  let _driver: IZCircusDriver;

  const createTestTarget = async () => {
    const element = <ZWizard />;

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return ZCircusBy.first(_driver, ZWizardComponentModel);
  };

  afterEach(async () => {
    await _renderer?.destroy?.call(_renderer);
    await _driver?.destroy?.call(_driver);
  });

  it('should render the wizard.', async () => {
    // Arrange
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});
