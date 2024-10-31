import { IZCircusDriver, IZCircusSetup, ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { identity, noop, range } from "lodash-es";
import { ReactElement } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { IZChoice, IZChoiceOption } from "./choice";
import { ZChoiceSelect } from "./choice-select";
import { ZChoiceToggle } from "./choice-toggle";
import { ZChoiceComponentModel } from "./choice.cm.mjs";

describe("ZChoice", () => {
  let _renderer: IZCircusSetup<IZCircusDriver>;
  let _driver: IZCircusDriver;

  afterEach(async () => {
    await _renderer?.destroy?.call(_renderer);
    await _driver?.destroy?.call(_driver);
  });

  async function createTestTarget(element: ReactElement) {
    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return await ZCircusBy.first(_driver, ZChoiceComponentModel);
  }

  async function shouldRenderAllOptionsWhenOpened(
    createElement: (props: Partial<IZChoice<any, any>>) => ReactElement,
  ) {
    // Arrange.
    const options = ["One", "Two", "Three", "Four", "Five"];
    const target = await createTestTarget(createElement({ options }));

    // Act.
    const _options = await target.open();
    const actual = await Promise.all(_options.map((op) => op.text()));

    // Assert.
    expect(actual).toEqual(options);
  }

  async function shouldRenderCustomOptionDisplay(
    createElement: (props: Partial<IZChoice<any, any>>) => ReactElement,
  ) {
    // Arrange.
    const options = ["One", "Two", "Three", "Four", "Five"];
    const expected = "EXPECTED: ";
    const renderOption = (op: IZChoiceOption) => `${expected}${op}`;
    const element = createElement({ renderOption, options });
    const target = await createTestTarget(element);

    // Act.
    const _options = await target.open();
    const text = await Promise.all(_options.map((op) => op.text()));
    const actual = text.every((v) => v.startsWith(expected));

    // Assert.
    expect(actual).toBeTruthy();
  }

  async function shouldRenderDisabled(
    createElement: (props: Partial<IZChoice<any, any>>) => ReactElement,
  ) {
    // Arrange.
    const options = [1, 2, 3];
    const element = createElement({ disabled: true, options });
    const target = await createTestTarget(element);

    // Act.
    const actual = await target.disabled();

    // Assert.
    expect(actual).toBeTruthy();
  }

  async function shouldSelectByIdentifier(
    createElement: (props: Partial<IZChoice<any, any>>) => ReactElement,
  ) {
    // Arrange.
    const options = range(1, 5).map((id) => ({ id, name: `${id}` }));
    const identifier = (op) => op.id;
    const display = (op) => op.name;
    const [, expected] = options;
    const value = [expected.id];
    const element = createElement({ options, identifier, display, value });
    const target = await createTestTarget(element);

    // Act.
    const [_selected] = await target.selected();
    const actual = await _selected.text();

    // Assert.
    expect(actual).toEqual(expected.name);
  }

  async function shouldSelectByTheEntireObject(
    createElement: (props: Partial<IZChoice<any, any>>) => ReactElement,
  ) {
    // Arrange.
    const options = ["One", "Two", "Three", "Four", "Five"];
    const [, , expected] = options;
    const value = [expected];
    const target = await createTestTarget(createElement({ value, options }));

    // Act.
    const [_selected] = await target.selected();
    const actual = await _selected.text();

    // Assert.
    expect(actual).toEqual(expected);
  }

  async function shouldNotBeAbleToClearIfTheChoiceIsIndelible(
    createElement: (props: Partial<IZChoice<any, any>>) => ReactElement,
  ) {
    // Arrange.
    const options = ["One", "Two", "Three", "Four", "Five"];
    const value = options;
    const onValueChange = vi.fn();
    const element = createElement({
      indelible: true,
      multiple: true,
      value,
      onValueChange,
      options,
    });
    const target = await createTestTarget(element);

    // Act.
    await target.clear();

    // Assert.
    expect(onValueChange).not.toHaveBeenCalled();
  }

  async function shouldClearTheSelection(
    createElement: (props: Partial<IZChoice<any, any>>) => ReactElement,
  ) {
    // Arrange.
    const options = ["One", "Two", "Three", "Four", "Five"];
    const value = options;
    const onValueChange = vi.fn();
    const element = createElement({
      value,
      onValueChange,
      options,
      multiple: true,
    });
    const target = await createTestTarget(element);

    // Act.
    await target.clear();

    // Assert.
    expect(onValueChange).toHaveBeenCalledWith(null);
  }

  async function shouldChangeSelectionToSingleIfMultipleOff(
    createElement: (props: Partial<IZChoice<any, any>>) => ReactElement,
  ) {
    // Arrange.
    const options = ["One", "Two", "Three", "Four", "Five"];
    const multiple = false;
    const identifier = identity;
    const target = await createTestTarget(
      createElement({ multiple, identifier, options }),
    );
    const expected = [options[1]];

    // Act.
    await target.select(options[0]);
    await target.select(options[1]);
    const selection = await target.selected();
    const actual = await Promise.all(selection.map((ch) => ch.text()));

    // Assert
    expect(actual).toEqual(expected);
  }

  async function shouldAppendSelectionIfMultipleOn(
    createElement: (props: Partial<IZChoice<any, any>>) => ReactElement,
  ) {
    // Arrange.
    const options = ["One", "Two", "Three", "Four", "Five"];
    const multiple = true;
    const element = createElement({ multiple, options });
    const target = await createTestTarget(element);
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

  async function shouldSelectNothingIfOptionIsUnavailable(
    createElement: (props: Partial<IZChoice<any, any>>) => ReactElement,
  ) {
    // Arrange.
    const target = await createTestTarget(createElement({}));

    // Act.
    await target.select("not-an-option");
    const actual = await target.selected();

    // Assert.
    expect(actual).toEqual([]);
  }

  async function shouldRenderARequiredLabel(
    createElement: (props: Partial<IZChoice<any, any>>) => ReactElement,
  ) {
    // Arrange.
    const element = createElement({ label: "Choice Test", required: true });
    const target = await createTestTarget(element);
    const label = await target.label();

    // Act.
    const actual = await label?.required();

    // Assert.
    expect(actual).toBeTruthy();
  }

  async function shouldNotRenderALabelIfNoneProvided(
    createElement: (props: Partial<IZChoice<any, any>>) => ReactElement,
  ) {
    // Arrange.
    const target = await createTestTarget(createElement({}));

    // Act.
    const actual = await target.label();

    // Assert.
    expect(actual).toBeNull();
  }

  async function shouldRemoveSelection(
    createElement: (props: Partial<IZChoice<any, any>>) => ReactElement,
  ) {
    // Arrange.
    const one = "One";
    const two = "Two";
    const options = [one, two, "Three"];
    const onValueChange = vi.fn();
    const element = createElement({ multiple: true, options, onValueChange });
    const target = await createTestTarget(element);
    await target.select(one);
    await target.select(two);
    await target.close();
    onValueChange.mockClear();

    // Act.
    const selected = await target.selected();
    await Promise.all(selected.map((select) => select.remove()));
    const actual = await target.selected();

    // Assert.
    expect(actual).toEqual([]);
    expect(onValueChange).toHaveBeenCalledWith([two]);
    expect(onValueChange).toHaveBeenCalledWith(null);
  }

  describe("Select", () => {
    const createElement = (props?: Partial<IZChoice<any, any>>) => (
      <ZChoiceSelect {...props} />
    );

    describe("Render", () => {
      it("should render all options when opened", async () => {
        await shouldRenderAllOptionsWhenOpened(createElement);
      });

      it("should render a custom display for an option", async () => {
        await shouldRenderCustomOptionDisplay(createElement);
      });

      it("should not render a label if none is provided", async () => {
        await shouldNotRenderALabelIfNoneProvided(createElement);
      });

      it("should render a required label", async () => {
        await shouldRenderARequiredLabel(createElement);
      });
    });

    describe("Select", () => {
      it("should select by an identifier", async () => {
        await shouldSelectByIdentifier(createElement);
      });

      it("should select by the entire object", async () => {
        await shouldSelectByTheEntireObject(createElement);
      });

      it("should append selection is multiple is on", async () => {
        await shouldAppendSelectionIfMultipleOn(createElement);
      });

      it("should change the selection to a single item if multiple is off", async () => {
        await shouldChangeSelectionToSingleIfMultipleOff(createElement);
      });

      it("should not select anything if the selected option is not available", async () => {
        await shouldSelectNothingIfOptionIsUnavailable(createElement);
      });

      it("should select the raw value if there is no option for the value", async () => {
        // Arrange.
        const expected = "not-a-value";
        const warn = vi.spyOn(console, "warn");
        warn.mockImplementation(noop);
        const value = [expected];
        const target = await createTestTarget(createElement({ value }));
        // Act.
        const [_selected] = await target.selected();
        const actual = await _selected.text();
        warn.mockRestore();
        // Assert.
        expect(actual).toEqual(expected);
      });
    });

    describe("Clear", () => {
      it("should not be able to clear if the choice is indelible", async () => {
        await shouldNotBeAbleToClearIfTheChoiceIsIndelible(createElement);
      });

      it("should clear the selection", async () => {
        await shouldClearTheSelection(createElement);
      });
    });

    describe("Remove", () => {
      it("should remove a value", async () => {
        await shouldRemoveSelection(createElement);
      });
    });

    describe("Disabled", () => {
      it("should disable if disabled is true", async () => {
        await shouldRenderDisabled(createElement);
      });
    });
  });

  describe("Toggle", () => {
    const createElement = (props?: Partial<IZChoice<any, any>>) => (
      <ZChoiceToggle {...props} />
    );
    describe("Render", () => {
      it("should render all options when opened", async () => {
        await shouldRenderAllOptionsWhenOpened(createElement);
      });

      it("should render a custom display for an option", async () => {
        await shouldRenderCustomOptionDisplay(createElement);
      });

      it("should not render a label if none is provided", async () => {
        await shouldNotRenderALabelIfNoneProvided(createElement);
      });

      it("should render a required label", async () => {
        await shouldRenderARequiredLabel(createElement);
      });
    });

    describe("Select", () => {
      it("should select by an identifier", async () => {
        await shouldSelectByIdentifier(createElement);
      });

      it("should select by the entire object", async () => {
        await shouldSelectByTheEntireObject(createElement);
      });

      it("should append selection is multiple is on", async () => {
        await shouldAppendSelectionIfMultipleOn(createElement);
      });

      it("should change the selection to a single item if multiple is off", async () => {
        await shouldChangeSelectionToSingleIfMultipleOff(createElement);
      });

      it("should not select anything if the selected option is not available", async () => {
        await shouldSelectNothingIfOptionIsUnavailable(createElement);
      });
    });

    describe("Clear", () => {
      it("should not be able to clear if the choice is indelible", async () => {
        await shouldNotBeAbleToClearIfTheChoiceIsIndelible(createElement);
      });

      it("should clear the selection", async () => {
        await shouldClearTheSelection(createElement);
      });
    });

    describe("Remove", () => {
      it("should remove a value", async () => {
        await shouldRemoveSelection(createElement);
      });
    });

    describe("Disabled", () => {
      it("should disable if disabled is true", async () => {
        await shouldRenderDisabled(createElement);
      });
    });
  });
});
