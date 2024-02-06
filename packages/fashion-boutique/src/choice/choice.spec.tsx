import { IZCircusDriver, IZCircusSetup, ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { identity, noop, range } from 'lodash-es';
import React, { ReactNode } from 'react';
import { Mock, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ZChoiceAutocomplete } from './choice-autocomplete';
import { ZChoiceDropDown } from './choice-drop-down';
import { ZChoiceToggle } from './choice-toggle';
import { ZChoiceComponentModel } from './choice.cm.mjs';

describe('ZChoice', () => {
  let options: any[];
  let identifier: (op: any) => any;

  let selected: any[] | undefined;
  let multiple: boolean | undefined;
  let indelible: boolean | undefined;
  let disabled: boolean | undefined;
  let required: boolean | undefined;
  let label: ReactNode | undefined;
  let onValueChange: Mock | undefined;
  let display: undefined | ((op: any) => string);
  let renderOption: undefined | ((op: any) => ReactNode);

  let _renderer: IZCircusSetup<IZCircusDriver>;
  let _driver: IZCircusDriver;

  beforeEach(() => {
    selected = undefined;
    display = undefined;
    indelible = undefined;
    disabled = undefined;
    multiple = undefined;
    required = undefined;
    label = undefined;
    onValueChange = undefined;
    renderOption = undefined;

    identifier = identity;
    options = ['One', 'Two', 'Three', 'Four', 'Five'];
  });

  afterEach(async () => {
    await _renderer?.destroy?.call(_renderer);
    await _driver?.destroy?.call(_driver);
  });

  async function shouldRenderAllOptionsWhenOpened(createTestTarget: () => Promise<ZChoiceComponentModel>) {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const _options = await target.open();
    const actual = await Promise.all(_options.map((op) => op.text()));
    // Assert.
    expect(actual).toEqual(options);
  }

  async function shouldRenderCustomOptionDisplay(createTestTarget: () => Promise<ZChoiceComponentModel>) {
    // Arrange.
    const expected = 'EXPECTED: ';
    renderOption = (op) => `${expected}${op}`;
    const target = await createTestTarget();
    // Act.
    const _options = await target.open();
    const text = await Promise.all(_options.map((op) => op.text()));
    const actual = text.every((v) => v.startsWith(expected));
    // Assert.
    expect(actual).toBeTruthy();
  }

  async function shouldRenderDisabled(createTestTarget: () => Promise<ZChoiceComponentModel>) {
    // Arrange.
    disabled = true;
    const target = await createTestTarget();
    // Act.
    const actual = await target.disabled();
    // Assert.
    expect(actual).toBeTruthy();
  }

  async function shouldSelectByIdentifier(createTestTarget: () => Promise<ZChoiceComponentModel>) {
    // Arrange.
    options = range(1, 5).map((id) => ({ id, name: `${id}` }));
    identifier = (op) => op.id;
    display = (op) => op.name;
    const [, expected] = options;
    selected = [expected.id];
    const target = await createTestTarget();
    // Act.
    const [_selected] = await target.selected();
    const actual = await _selected.text();
    // Assert.
    expect(actual).toEqual(expected.name);
  }

  async function shouldSelectByTheEntireObject(createTestTarget: () => Promise<ZChoiceComponentModel>) {
    // Arrange.
    const [, , expected] = options;
    selected = [expected];
    const target = await createTestTarget();
    // Act.
    const [_selected] = await target.selected();
    const actual = await _selected.text();
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function shouldNotBeAbleToClearIfTheChoiceIsIndelible(createTestTarget: () => Promise<ZChoiceComponentModel>) {
    // Arrange.
    indelible = true;
    multiple = true;
    selected = options;
    onValueChange = vi.fn();
    const target = await createTestTarget();
    // Act.
    await target.clear();
    // Assert.
    expect(onValueChange).not.toHaveBeenCalled();
  }

  async function shouldClearTheSelection(createTestTarget: () => Promise<ZChoiceComponentModel>) {
    // Arrange.
    selected = options;
    onValueChange = vi.fn();
    const target = await createTestTarget();
    // Act.
    await target.clear();
    // Assert.
    expect(onValueChange).toHaveBeenCalledWith([]);
  }

  async function shouldChangeSelectionToSingleIfMultipleOff(createTestTarget: () => Promise<ZChoiceComponentModel>) {
    // Arrange.
    selected = undefined;
    onValueChange = undefined;
    multiple = false;
    identifier = identity;
    const target = await createTestTarget();
    const expected = [options[1]];
    // Act.
    await target.select(options[0]);
    await target.select(options[1]);
    const selection = await target.selected();
    const actual = await Promise.all(selection.map((ch) => ch.text()));
    // Assert
    expect(actual).toEqual(expected);
  }

  async function shouldAppendSelectionIfMultipleOn(createTestTarget: () => Promise<ZChoiceComponentModel>) {
    // Arrange.
    selected = undefined;
    onValueChange = undefined;
    multiple = true;
    const target = await createTestTarget();
    const expected = options.slice(0, 2);
    // Act.
    const menu = await target.open();
    await target.select(menu[0]);
    await target.select(menu[1]);
    const selection = await target.selected();
    const actual = await Promise.all(selection.map((ch) => ch.text()));
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function shouldSelectNothingIfOptionIsUnavailable(createTestTarget: () => Promise<ZChoiceComponentModel>) {
    // Arrange.
    selected = undefined;
    onValueChange = undefined;
    const target = await createTestTarget();
    // Act.
    await target.select('not-an-option');
    const actual = await target.selected();
    // Assert.
    expect(actual).toEqual([]);
  }

  async function shouldRenderARequiredLabel(createTestTarget: () => Promise<ZChoiceComponentModel>) {
    // Arrange.
    label = 'Choice Test';
    required = true;
    const target = await createTestTarget();
    // Act.
    const actual = await (await target.label())?.required();
    // Assert.
    expect(actual).toBeTruthy();
  }

  async function shouldNotRenderALabelIfNoneProvided(createTestTarget: () => Promise<ZChoiceComponentModel>) {
    // Arrange.
    label = undefined;
    const target = await createTestTarget();
    // Act.
    const actual = await target.label();
    // Assert.
    expect(actual).toBeNull();
  }

  describe('DropDown', () => {
    async function createTestTarget() {
      const element = (
        <ZChoiceDropDown
          options={options}
          label={label}
          indelible={indelible}
          multiple={multiple}
          disabled={disabled}
          required={required}
          value={selected}
          onValueChange={onValueChange}
          identifier={identifier}
          display={display}
          renderOption={renderOption}
        />
      );

      _renderer = new ZCircusSetupRenderer(element);
      _driver = await _renderer.setup();
      return await ZCircusBy.first(_driver, ZChoiceComponentModel);
    }

    it('should render all options when opened', async () => {
      await shouldRenderAllOptionsWhenOpened(createTestTarget);
    });

    it('should render a custom display for an option', async () => {
      await shouldRenderCustomOptionDisplay(createTestTarget);
    });

    it('should select by an identifier', async () => {
      await shouldSelectByIdentifier(createTestTarget);
    });

    it('should select by the entire object', async () => {
      await shouldSelectByTheEntireObject(createTestTarget);
    });

    it('should not be able to clear if the choice is indelible', async () => {
      await shouldNotBeAbleToClearIfTheChoiceIsIndelible(createTestTarget);
    });

    it('should clear the selection', async () => {
      await shouldClearTheSelection(createTestTarget);
    });

    it('should change the selection to a single item if multiple is off', async () => {
      await shouldChangeSelectionToSingleIfMultipleOff(createTestTarget);
    });

    it('should append selections if multiple is turned on', async () => {
      await shouldAppendSelectionIfMultipleOn(createTestTarget);
    });

    it('should not render a label if none is provided', async () => {
      await shouldNotRenderALabelIfNoneProvided(createTestTarget);
    });

    it('should render a required label', async () => {
      await shouldRenderARequiredLabel(createTestTarget);
    });

    it('should disable if disabled is true', async () => {
      await shouldRenderDisabled(createTestTarget);
    });

    it('should not select anything if the selected option is not available', async () => {
      await shouldSelectNothingIfOptionIsUnavailable(createTestTarget);
    });

    it('should select the raw value if there is no option for the value', async () => {
      // Arrange.
      const expected = 'not-a-value';
      const warn = vi.spyOn(console, 'warn');
      warn.mockImplementation(noop);
      selected = [expected];
      const target = await createTestTarget();
      // Act.
      const [_selected] = await target.selected();
      const actual = await _selected.text();
      warn.mockRestore();
      // Assert.
      expect(actual).toEqual(expected);
    });
  });

  describe('Autocomplete', () => {
    async function createTestTarget() {
      const element = (
        <ZChoiceAutocomplete
          options={options}
          label={label}
          indelible={indelible}
          multiple={multiple}
          disabled={disabled}
          required={required}
          value={selected}
          onValueChange={onValueChange}
          identifier={identifier}
          display={display}
          renderOption={renderOption}
        />
      );

      _renderer = new ZCircusSetupRenderer(element);
      _driver = await _renderer.setup();
      return await ZCircusBy.first(_driver, ZChoiceComponentModel);
    }

    it('should render all options when opened', async () => {
      await shouldRenderAllOptionsWhenOpened(createTestTarget);
    });

    it('should select by an identifier', async () => {
      await shouldSelectByIdentifier(createTestTarget);
    });

    it('should select by the entire object', async () => {
      await shouldSelectByTheEntireObject(createTestTarget);
    });

    it('should not be able to clear if the choice is indelible', async () => {
      await shouldNotBeAbleToClearIfTheChoiceIsIndelible(createTestTarget);
    });

    it('should disable if disabled is true', async () => {
      await shouldRenderDisabled(createTestTarget);
    });

    it('should clear the selection', async () => {
      await shouldClearTheSelection(createTestTarget);
    });

    it('should change the selection to a single item if multiple is off', async () => {
      await shouldChangeSelectionToSingleIfMultipleOff(createTestTarget);
    });

    it('should append selections if multiple is turned on', async () => {
      await shouldAppendSelectionIfMultipleOn(createTestTarget);
    });

    it('should not render a label if none is provided', async () => {
      await shouldNotRenderALabelIfNoneProvided(createTestTarget);
    });

    it('should render a required label', async () => {
      await shouldRenderARequiredLabel(createTestTarget);
    });

    it('should not select anything if the selected option is not available', async () => {
      await shouldSelectNothingIfOptionIsUnavailable(createTestTarget);
    });
  });

  describe('Toggle', () => {
    async function createTestTarget() {
      const element = (
        <ZChoiceToggle
          options={options}
          label={label}
          indelible={indelible}
          multiple={multiple}
          disabled={disabled}
          required={required}
          value={selected}
          onValueChange={onValueChange}
          identifier={identifier}
          display={display}
          renderOption={renderOption}
        />
      );

      _renderer = new ZCircusSetupRenderer(element);
      _driver = await _renderer.setup();
      return await ZCircusBy.first(_driver, ZChoiceComponentModel);
    }

    it('should render all options when opened', async () => {
      await shouldRenderAllOptionsWhenOpened(createTestTarget);
    });

    it('should render a custom display for an option', async () => {
      await shouldRenderCustomOptionDisplay(createTestTarget);
    });

    it('should select by an identifier', async () => {
      await shouldSelectByIdentifier(createTestTarget);
    });

    it('should select by the entire object', async () => {
      await shouldSelectByTheEntireObject(createTestTarget);
    });

    it('should change the selection to a single item if multiple is off', async () => {
      await shouldChangeSelectionToSingleIfMultipleOff(createTestTarget);
    });

    it('should append selections if multiple is turned on', async () => {
      await shouldAppendSelectionIfMultipleOn(createTestTarget);
    });

    it('should disable if disabled is true', async () => {
      await shouldRenderDisabled(createTestTarget);
    });

    it('should not render a label if none is provided', async () => {
      await shouldNotRenderALabelIfNoneProvided(createTestTarget);
    });

    it('should render a required label', async () => {
      await shouldRenderARequiredLabel(createTestTarget);
    });

    it('should not select anything if the selected option is not available', async () => {
      await shouldSelectNothingIfOptionIsUnavailable(createTestTarget);
    });

    it('should clear the selection', async () => {
      await shouldClearTheSelection(createTestTarget);
    });

    it('should remove the selection when clicked again', async () => {
      // Arrange.
      const [, value] = options;
      const target = await createTestTarget();
      await target.select(value);
      // Act.
      await target.select(value);
      const actual = await target.selected();
      // Assert.
      expect(actual.length).toEqual(0);
    });

    it('should not remove the selection when the indelible flag is on and the mode is singular', async () => {
      // Arrange.
      multiple = false;
      indelible = true;
      const [, value] = options;
      const target = await createTestTarget();
      await target.select(value);
      // Act.
      await target.select(value);
      const selection = await target.selected();
      const [actual] = await Promise.all(selection.map((s) => s.value()));
      // Assert.
      expect(actual).toEqual(value);
    });
  });
});
