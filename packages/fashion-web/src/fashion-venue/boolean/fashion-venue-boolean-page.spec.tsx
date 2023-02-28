import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZBooleanComponentModel, ZButtonComponentModel } from '@zthun/fashion-venue';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ZFashionVenueBooleanPage } from './fashion-venue-boolean-page';
import { ZFashionVenueBooleanPageComponentModel } from './fashion-venue-boolean-page.cm';

describe('ZFashionVenueBooleanPage', () => {
  async function createTestTarget() {
    const element = <ZFashionVenueBooleanPage />;

    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZFashionVenueBooleanPageComponentModel);
  }

  async function shouldToggleToValue(
    expected: boolean,
    togglerButton: (t: ZFashionVenueBooleanPageComponentModel) => Promise<ZButtonComponentModel>,
    factoryDemo: (t: ZFashionVenueBooleanPageComponentModel) => Promise<ZBooleanComponentModel>
  ) {
    // Arrange.
    const target = await createTestTarget();
    const button = await togglerButton(target);
    await button.click();
    const bool = await factoryDemo(target);
    // Act.
    await bool.toggle();
    const checked = await bool.value();
    const value = await target.value();
    const actual = checked || value;
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function shouldDisable(
    expected: boolean,
    factoryDemo: (t: ZFashionVenueBooleanPageComponentModel) => Promise<ZBooleanComponentModel>
  ) {
    // Arrange.
    const target = await createTestTarget();
    const disabled = await target.disabled();
    await disabled.toggle(!expected);
    // Act.
    await disabled.toggle(expected);
    const bool = await factoryDemo(target);
    const actual = await bool.disabled();
    // Assert.
    expect(actual).toEqual(expected);
  }

  describe('Checkbox', () => {
    it('should set the value to checked when clicked in an off state', async () => {
      await shouldToggleToValue(
        true,
        (t) => t.off(),
        (t) => t.checkbox()
      );
    });

    it('should set the value to unchecked when clicked in an on state', async () => {
      await shouldToggleToValue(
        false,
        (t) => t.on(),
        (t) => t.checkbox()
      );
    });

    it('should set the value to checked when clicked in an indeterminate state', async () => {
      await shouldToggleToValue(
        true,
        (t) => t.indeterminate(),
        (t) => t.checkbox()
      );
    });

    it('should disable the boolean when the disabled switch is on', async () => {
      await shouldDisable(true, (t) => t.checkbox());
    });

    it('should enable the boolean when the disabled switch is off', async () => {
      await shouldDisable(false, (t) => t.checkbox());
    });
  });

  describe('Switch', () => {
    it('should set the value to checked when clicked in an off state', async () => {
      await shouldToggleToValue(
        true,
        (t) => t.off(),
        (t) => t.switch()
      );
    });

    it('should set the value to unchecked when clicked in an on state', async () => {
      await shouldToggleToValue(
        false,
        (t) => t.on(),
        (t) => t.switch()
      );
    });

    it('should disable the boolean when the disabled switch is on', async () => {
      await shouldDisable(true, (t) => t.switch());
    });

    it('should enable the boolean when the disabled switch is off', async () => {
      await shouldDisable(false, (t) => t.switch());
    });
  });
});
