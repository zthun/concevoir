import { ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import {
  ZBooleanComponentModel,
  ZButtonComponentModel,
} from "@zthun/fashion-boutique";
import { IZFashion, ZFashionThemeBuilder } from "@zthun/fashion-theme";
import React from "react";
import { describe, expect, it } from "vitest";
import { ZBooleanPage } from "./boolean-page";
import { ZBooleanPageComponentModel } from "./boolean-page.cm.mjs";

describe("ZBooleanPage", () => {
  const theme = new ZFashionThemeBuilder().build();

  async function createTestTarget() {
    const element = <ZBooleanPage />;

    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZBooleanPageComponentModel);
  }

  async function shouldToggleToValue(
    expected: boolean,
    togglerButton: (
      t: ZBooleanPageComponentModel,
    ) => Promise<ZButtonComponentModel>,
    factoryDemo: (
      t: ZBooleanPageComponentModel,
    ) => Promise<ZBooleanComponentModel>,
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
    factoryDemo: (
      t: ZBooleanPageComponentModel,
    ) => Promise<ZBooleanComponentModel>,
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

  async function shouldRequire(
    expected: boolean,
    factoryDemo: (
      t: ZBooleanPageComponentModel,
    ) => Promise<ZBooleanComponentModel>,
  ) {
    // Arrange.
    const target = await createTestTarget();
    const required = await target.required();
    await required.toggle(!expected);
    // Act.
    await required.toggle(expected);
    const bool = await factoryDemo(target);
    const actual = await bool.required();
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function assertSetsFashion(
    expected: IZFashion,
    factoryDemo: (
      t: ZBooleanPageComponentModel,
    ) => Promise<ZBooleanComponentModel>,
  ) {
    // Arrange
    const target = await createTestTarget();
    const fashion = await target.fashion();
    const name = expected.name!;
    await fashion.select(name);
    // Act.
    const bool = await factoryDemo(target);
    const actual = await bool.fashion();
    // Assert.
    expect(actual).toEqual(name);
  }

  describe("Checkbox", () => {
    it("should set the value to checked when clicked in an off state", async () => {
      await shouldToggleToValue(
        true,
        (t) => t.off(),
        (t) => t.checkbox(),
      );
    });

    it("should set the value to unchecked when clicked in an on state", async () => {
      await shouldToggleToValue(
        false,
        (t) => t.on(),
        (t) => t.checkbox(),
      );
    });

    it("should set the value to checked when clicked in an indeterminate state", async () => {
      await shouldToggleToValue(
        true,
        (t) => t.indeterminate(),
        (t) => t.checkbox(),
      );
    });

    it("should mark the boolean required when the required switch is on", async () => {
      await shouldRequire(true, (t) => t.checkbox());
    });

    it("should mark the boolean optional when the required switch is off", async () => {
      await shouldRequire(false, (t) => t.checkbox());
    });

    it("should disable the boolean when the disabled switch is on", async () => {
      await shouldDisable(true, (t) => t.checkbox());
    });

    it("should enable the boolean when the disabled switch is off", async () => {
      await shouldDisable(false, (t) => t.checkbox());
    });

    describe("Fashion", () => {
      it("should update to Primary.", async () => {
        await assertSetsFashion(theme.primary, (t) => t.checkbox());
      });

      it("should update to Secondary.", async () => {
        await assertSetsFashion(theme.secondary, (t) => t.checkbox());
      });

      it("should update to Success.", async () => {
        await assertSetsFashion(theme.success, (t) => t.checkbox());
      });

      it("should update to Warning.", async () => {
        await assertSetsFashion(theme.warning, (t) => t.checkbox());
      });

      it("should update to Error.", async () => {
        await assertSetsFashion(theme.error, (t) => t.checkbox());
      });

      it("should update to Info.", async () => {
        await assertSetsFashion(theme.info, (t) => t.checkbox());
      });
    });
  });

  describe("Switch", () => {
    it("should set the value to checked when clicked in an off state", async () => {
      await shouldToggleToValue(
        true,
        (t) => t.off(),
        (t) => t.switch(),
      );
    });

    it("should set the value to unchecked when clicked in an on state", async () => {
      await shouldToggleToValue(
        false,
        (t) => t.on(),
        (t) => t.switch(),
      );
    });

    it("should mark the boolean required when the required switch is on", async () => {
      await shouldRequire(true, (t) => t.checkbox());
    });

    it("should mark the boolean optional when the required switch is off", async () => {
      await shouldRequire(false, (t) => t.checkbox());
    });

    it("should disable the boolean when the disabled switch is on", async () => {
      await shouldDisable(true, (t) => t.switch());
    });

    it("should enable the boolean when the disabled switch is off", async () => {
      await shouldDisable(false, (t) => t.switch());
    });

    describe("Fashion", () => {
      it("should update to Primary.", async () => {
        await assertSetsFashion(theme.primary, (t) => t.switch());
      });

      it("should update to Secondary.", async () => {
        await assertSetsFashion(theme.secondary, (t) => t.switch());
      });

      it("should update to Success.", async () => {
        await assertSetsFashion(theme.success, (t) => t.switch());
      });

      it("should update to Warning.", async () => {
        await assertSetsFashion(theme.warning, (t) => t.switch());
      });

      it("should update to Error.", async () => {
        await assertSetsFashion(theme.error, (t) => t.switch());
      });

      it("should update to Info.", async () => {
        await assertSetsFashion(theme.info, (t) => t.switch());
      });
    });
  });
});
