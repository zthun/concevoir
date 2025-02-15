import { ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZNumberComponentModel } from "@zthun/fashion-boutique";
import { describe, expect, it } from "vitest";
import { ZNumberPage } from "./number-page";
import { ZNumberPageComponentModel } from "./number-page.cm.mjs";

type NumberInputFactory = (
  t: ZNumberPageComponentModel,
) => Promise<ZNumberComponentModel>;

describe("ZNumberPage", () => {
  async function createTestTarget() {
    const element = <ZNumberPage />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZNumberPageComponentModel);
  }

  async function shouldUpdateTheValue(factory: NumberInputFactory) {
    // Arrange
    const target = await createTestTarget();
    const increment = 25;
    const num = await factory(target);
    const value = await target.value();
    const expected = (value || 0) + increment;
    // Act.
    await num.increment(increment);
    const actual = await target.value();
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function shouldClearTheValue(factory: NumberInputFactory) {
    // Arrange
    const target = await createTestTarget();
    const num = await factory(target);
    // Act.
    await num.clear();
    const actual = await target.value();
    // Assert.
    expect(actual).toBeNull();
  }

  describe("Spinner", () => {
    const factory: NumberInputFactory = (t) => t.spinner();

    it("should update the value", async () => {
      await shouldUpdateTheValue(factory);
    });

    it("should clear the value", async () => {
      await shouldClearTheValue(factory);
    });
  });
});
