import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { IZFashion, ZFashionBuilder } from '@zthun/fashion-theme';
import React, { ReactElement } from 'react';
import { Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import { ZBooleanCheckbox } from './boolean-checkbox';
import { ZBooleanSwitch } from './boolean-switch';
import { ZBooleanComponentModel } from './boolean.cm';

describe('ZBoolean', () => {
  let disabled: boolean | undefined;
  let required: boolean | undefined;
  let fashion: IZFashion | undefined;
  let onCheckChanged: Mock | undefined;

  async function createComponentModel(element: ReactElement) {
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZBooleanComponentModel);
  }

  beforeEach(() => {
    disabled = undefined;
    required = undefined;
    fashion = undefined;
    onCheckChanged = undefined;
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

  async function assertSetsFashion(createTestTarget: () => Promise<ZBooleanComponentModel>) {
    // Arrange.
    fashion = new ZFashionBuilder().name('TestFashion').build();
    const target = await createTestTarget();
    // Act.
    const actual = await target.fashion();
    // Assert.
    expect(actual).toEqual(fashion.name);
  }

  describe('Checkbox', () => {
    async function createTestTarget(value?: boolean | null) {
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
      assertDisabled(createTestTarget, false);
    });

    it('can be disabled.', async () => {
      await assertDisabled(createTestTarget, true);
    });

    it('can be optional.', async () => {
      assertRequired(createTestTarget, false);
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

    it('should render an indeterminate state for null.', async () => {
      await assertValue(createTestTarget.bind(null, null), null);
    });

    it('should raise onValueChange from true to false when clicked.', async () => {
      await assertRaisesOnValueChange(createTestTarget.bind(null, true), false);
    });

    it('should raise onValueChange from false to true when clicked.', async () => {
      await assertRaisesOnValueChange(createTestTarget.bind(null, false), true);
    });

    it('should raise onValueChange from indeterminate to true when clicked.', async () => {
      await assertRaisesOnValueChange(createTestTarget.bind(null, null), true);
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
      assertDisabled(createTestTarget, false);
    });

    it('can be disabled.', async () => {
      await assertDisabled(createTestTarget, true);
    });

    it('can be optional.', async () => {
      assertRequired(createTestTarget, false);
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
