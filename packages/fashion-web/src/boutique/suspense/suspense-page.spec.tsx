import { ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZFashionThemeBuilder } from "@zthun/fashion-theme";
import { describe, expect, it } from "vitest";
import { ZSuspensePage } from "./suspense-page";
import { ZSuspensePageComponentModel } from "./suspense-page.cm.mjs";

describe("ZSuspensePage", () => {
  const theme = new ZFashionThemeBuilder().build();

  async function createTestTarget() {
    const element = <ZSuspensePage />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZSuspensePageComponentModel);
  }

  async function assertDisplaysTheSuspenseWhenTheDisabledOptionIs(
    expected: boolean,
  ) {
    // Arrange.
    const target = await createTestTarget();
    const loading = await target.disabled();
    await loading.toggle(!expected);

    // Act.
    await loading.toggle(expected);
    const rotate = await (await target.rotate()).loading();
    const progress = await (await target.progress()).loading();

    // Assert.
    expect(progress).toEqual(!expected);
    expect(rotate).toEqual(!expected);
  }

  async function assertSetsFashion(expected: string) {
    // Arrange
    const target = await createTestTarget();
    const fashion = await target.fashion();

    // Act
    await fashion.select(expected);
    const rotate = await (await target.rotate())?.fashion();
    const progress = await (await target.progress())?.fashion();

    // Assert
    expect(rotate).toEqual(expected);
    expect(progress).toEqual(expected);
  }

  describe("Display", () => {
    it("should show the suspense when the disabled option is unchecked.", async () => {
      await assertDisplaysTheSuspenseWhenTheDisabledOptionIs(false);
    });

    it("should hide the suspense when the disabled option is checked.", async () => {
      await assertDisplaysTheSuspenseWhenTheDisabledOptionIs(true);
    });
  });

  describe("Fashion", () => {
    it("should set the fashion to primary.", async () => {
      await assertSetsFashion(theme.primary.name!);
    });

    it("should set the fashion to secondary.", async () => {
      await assertSetsFashion(theme.secondary.name!);
    });
  });
});
