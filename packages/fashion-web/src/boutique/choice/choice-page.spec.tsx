import { ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZChoiceComponentModel } from "@zthun/fashion-boutique";
import { afterEach, describe, expect, it } from "vitest";
import { ZChoicePage } from "./choice-page";
import { ZChoicePageComponentModel } from "./choice-page.cm.mjs";

describe("ZChoicePage", () => {
  let _target: ZChoicePageComponentModel;

  async function createTestTarget() {
    const element = <ZChoicePage />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    _target = await ZCircusBy.first(driver, ZChoicePageComponentModel);
    return _target;
  }

  afterEach(async () => {
    await _target.driver.destroy?.call(_target.driver);
  });

  type ChoicePageFactory = (
    t: ZChoicePageComponentModel,
  ) => Promise<ZChoiceComponentModel>;

  async function shouldSelectTheValue(factory: ChoicePageFactory) {
    // Arrange.
    const target = await createTestTarget();
    const choice = await factory(target);
    await choice.clear();
    const [initial, value] = await choice.open();
    const expected = await value.value();
    // Act.
    await choice.select(initial);
    await choice.select(value);
    const actual = await target.value();
    const [first] = actual;
    // Assert.
    expect(actual.length).toEqual(1);
    expect(first).toEqual(expected);
  }

  async function shouldBeDisabled(factory: ChoicePageFactory) {
    // Arrange
    const target = await createTestTarget();
    const disabled = await target.disabled();
    const choice = await factory(target);
    await disabled.toggle(false);
    // Act.
    await disabled.toggle(true);
    const actual = await choice.disabled();
    // Assert.
    expect(actual).toBeTruthy();
  }

  async function shouldAllowMultipleItems(factory: ChoicePageFactory) {
    // Arrange
    const target = await createTestTarget();
    const multiple = await target.multiple();
    const choice = await factory(target);
    const [first, second] = await choice.open();
    const expected = await Promise.all([first.value(), second.value()]);
    await multiple.toggle(false);
    // Act
    await multiple.toggle(true);
    await choice.clear();
    await choice.select(first);
    await choice.select(second);
    await choice.close();
    const actual = await target.value();
    // assert.
    expect(actual).toEqual(expected);
  }

  async function shouldBeIndelible(factory: ChoicePageFactory) {
    // Arrange
    const target = await createTestTarget();
    const indelible = await target.indelible();
    const choice = await factory(target);
    const [, value] = await choice.open();
    await choice.select(value);
    await indelible.toggle(false);
    // Act
    await indelible.toggle(true);
    await choice.clear();
    const options = await choice.open();
    // Assert.
    expect(options.length).toBeGreaterThan(0);
  }

  async function shouldRenderARequiredLabel(factory: ChoicePageFactory) {
    // Arrange
    const target = await createTestTarget();
    const required = await target.required();
    await required.toggle(true);
    const choice = await factory(target);
    // Act
    const label = await choice.label();
    const actual = await label?.required();
    // Assert
    expect(actual).toBeTruthy();
  }

  describe("Select", () => {
    const factory = (t: ZChoicePageComponentModel) => t.dropdown();

    it("should select the value", async () => {
      await shouldSelectTheValue(factory);
    });

    it("should disable the choice", async () => {
      await shouldBeDisabled(factory);
    });

    it("should allow multiple selections in the choice", async () => {
      await shouldAllowMultipleItems(factory);
    });

    it("should be indelible", async () => {
      await shouldBeIndelible(factory);
    });

    it("should be required", async () => {
      await shouldRenderARequiredLabel(factory);
    });
  });

  describe("Toggle", () => {
    const factory = (t: ZChoicePageComponentModel) => t.toggle();

    it("should select the value", async () => {
      await shouldSelectTheValue(factory);
    });

    it("should disable the choice", async () => {
      await shouldBeDisabled(factory);
    });

    it("should allow multiple selections in the choice", async () => {
      await shouldAllowMultipleItems(factory);
    });

    it("should be indelible", async () => {
      await shouldBeIndelible(factory);
    });

    it("should be required", async () => {
      await shouldRenderARequiredLabel(factory);
    });
  });
});
