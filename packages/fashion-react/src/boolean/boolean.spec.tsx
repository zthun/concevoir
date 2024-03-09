import { IZCircusDriver, IZCircusKey, IZCircusSetup, ZCircusBy, ZCircusKeyboardQwerty } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZBooleanComponentModel } from '@zthun/fashion-circus';
import { ZFashionPriority } from '@zthun/fashion-theme';
import { ZTrilean, trilean } from '@zthun/helpful-fn';
import React, { ReactElement } from 'react';
import { Mock, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ZBooleanCheckbox } from './boolean-checkbox';
import { ZBooleanSwitch } from './boolean-switch';

describe('ZBoolean', () => {
  let disabled: boolean | undefined;
  let required: boolean | undefined;
  let fashion: string | undefined;
  let onCheckChanged: Mock | undefined;
  let _renderer: IZCircusSetup<IZCircusDriver>;
  let _driver: IZCircusDriver;

  async function createComponentModel(element: ReactElement) {
    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return ZCircusBy.first(_driver, ZBooleanComponentModel);
  }

  beforeEach(() => {
    disabled = undefined;
    required = undefined;
    fashion = undefined;
    onCheckChanged = undefined;
  });

  afterEach(async () => {
    await _driver?.destroy?.call(_driver);
    await _renderer?.destroy?.call(_renderer);
  });

  async function assertValue<T>(createTestTarget: () => Promise<ZBooleanComponentModel>, expected: T) {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const actual = await target.value();
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function assertDisabled(createTestTarget: () => Promise<ZBooleanComponentModel>, expected: boolean) {
    // Arrange.
    disabled = expected;
    const target = await createTestTarget();
    // Act.
    const actual = await target.disabled();
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function assertFrozen(createTestTarget: () => Promise<ZBooleanComponentModel>) {
    // Arrange.
    disabled = true;
    const target = await createTestTarget();
    const expected = await target.value();
    // Act.
    await target.toggle();
    const actual = await target.value();
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function assertRequired(createTestTarget: () => Promise<ZBooleanComponentModel>, expected: boolean) {
    // Arrange.
    required = expected;
    const target = await createTestTarget();
    // Act.
    const actual = await target.required();
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function assertRaisesOnValueChange(createTestTarget: () => Promise<ZBooleanComponentModel>, expected: boolean) {
    // Arrange.
    onCheckChanged = vi.fn();
    const target = await createTestTarget();
    // Act.
    await target.toggle();
    // Assert.
    expect(onCheckChanged).toHaveBeenCalledWith(expected);
  }

  async function assertChangesState(
    createTestTarget: () => Promise<ZBooleanComponentModel>,
    expected: boolean,
    start: boolean
  ) {
    // Arrange.
    const target = await createTestTarget();
    await target.toggle(start);
    // Act.
    await target.toggle();
    const actual = await target.value();
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function assertChangesStateWithKeyboard(
    createTestTarget: () => Promise<ZBooleanComponentModel>,
    key: IZCircusKey
  ) {
    // Arrange.
    const target = await createTestTarget();
    await target.toggle(false);
    // Act.
    await target.keyboard(key);
    await target.keyboard(ZCircusKeyboardQwerty.keyW);
    const actual = await target.value();
    // Assert.
    expect(actual).toEqual(true);
  }

  async function assertSetsFashion(createTestTarget: () => Promise<ZBooleanComponentModel>) {
    // Arrange.
    fashion = ZFashionPriority.Secondary;
    const target = await createTestTarget();
    // Act.
    const actual = await target.fashion();
    // Assert.
    expect(actual).toEqual(fashion);
  }

  describe('Checkbox', () => {
    async function createTestTarget(value?: trilean) {
      const element = (
        <ZBooleanCheckbox
          value={value}
          onValueChange={onCheckChanged}
          disabled={disabled}
          required={required}
          label='Checkbox'
          fashion={fashion}
        />
      );

      return createComponentModel(element);
    }

    it('can be enabled.', async () => {
      await assertDisabled(createTestTarget, false);
    });

    it('can be disabled.', async () => {
      await assertDisabled(createTestTarget, true);
    });

    it('should not change value if clicked while disabled', async () => {
      await assertFrozen(createTestTarget);
    });

    it('can be optional.', async () => {
      await assertRequired(createTestTarget, false);
    });

    it('can be required.', async () => {
      await assertRequired(createTestTarget, true);
    });

    it('should render a checked checkbox for true.', async () => {
      await assertValue(createTestTarget.bind(null, true), true);
    });

    it('should render an unchecked checkbox for false.', async () => {
      await assertValue(createTestTarget.bind(null, false), false);
    });

    it('should render an indeterminate state for indeterminate.', async () => {
      await assertValue(createTestTarget.bind(null, ZTrilean.Indeterminate), ZTrilean.Indeterminate);
    });

    it('should raise onValueChange from true to false when clicked.', async () => {
      await assertRaisesOnValueChange(createTestTarget.bind(null, true), false);
    });

    it('should raise onValueChange from false to true when clicked.', async () => {
      await assertRaisesOnValueChange(createTestTarget.bind(null, false), true);
    });

    it('should raise onValueChange from indeterminate to true when clicked.', async () => {
      await assertRaisesOnValueChange(createTestTarget.bind(null, ZTrilean.Indeterminate), true);
    });

    it('should flip the state when using the space key on the keyboard', async () => {
      await assertChangesStateWithKeyboard(createTestTarget, ZCircusKeyboardQwerty.space);
    });

    it('should flip the state when using the enter key on the keyboard', async () => {
      await assertChangesStateWithKeyboard(createTestTarget, ZCircusKeyboardQwerty.enter);
    });

    it('should flip the state from true to false internally if no value is provided from the outside.', async () => {
      await assertChangesState(createTestTarget, true, false);
    });

    it('should flip the state from false to true internally if no value is provided from the outside.', async () => {
      await assertChangesState(createTestTarget, false, true);
    });

    it('should set the named fashion.', async () => {
      await assertSetsFashion(createTestTarget);
    });
  });

  describe('Switch', () => {
    async function createTestTarget(value?: boolean) {
      const element = (
        <ZBooleanSwitch
          value={value}
          onValueChange={onCheckChanged}
          disabled={disabled}
          required={required}
          label='Switch'
          fashion={fashion}
        />
      );

      return createComponentModel(element);
    }

    it('can be enabled.', async () => {
      await assertDisabled(createTestTarget, false);
    });

    it('can be disabled.', async () => {
      await assertDisabled(createTestTarget, true);
    });

    it('should not change value if clicked while disabled', async () => {
      await assertFrozen(createTestTarget);
    });

    it('can be optional.', async () => {
      await assertRequired(createTestTarget, false);
    });

    it('can be required.', async () => {
      await assertRequired(createTestTarget, true);
    });

    it('should toggle the switch on for true.', async () => {
      await assertValue(createTestTarget.bind(null, true), true);
    });

    it('should toggle the switch off for false.', async () => {
      await assertValue(createTestTarget.bind(null, false), false);
    });

    it('should raise onValueChange from true to false when the truthy radio is clicked.', async () => {
      await assertRaisesOnValueChange(createTestTarget.bind(null, true), false);
    });

    it('should raise onValueChange from false to true when the falsy radio is clicked.', async () => {
      await assertRaisesOnValueChange(createTestTarget.bind(null, false), true);
    });

    it('should flip the state when using the space key on the keyboard', async () => {
      await assertChangesStateWithKeyboard(createTestTarget, ZCircusKeyboardQwerty.space);
    });

    it('should flip the state when using the enter key on the keyboard', async () => {
      await assertChangesStateWithKeyboard(createTestTarget, ZCircusKeyboardQwerty.enter);
    });

    it('should flip the state from true to false internally if no value is provided from the outside.', async () => {
      await assertChangesState(createTestTarget, true, false);
    });

    it('should flip the state from false to true internally if no value is provided from the outside.', async () => {
      await assertChangesState(createTestTarget, false, true);
    });

    it('should set the named fashion.', async () => {
      await assertSetsFashion(createTestTarget);
    });
  });
});
