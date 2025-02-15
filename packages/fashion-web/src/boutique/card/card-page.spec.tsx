import { ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZFashionThemeBuilder } from "@zthun/fashion-theme";
import { describe, expect, it } from "vitest";
import { ZCardPage } from "./card-page";
import { ZCardPageComponentModel } from "./card-page.cm.mjs";

describe("CardPage", () => {
  const theme = new ZFashionThemeBuilder().build();

  async function createTestTarget() {
    const element = <ZCardPage />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZCardPageComponentModel);
  }

  describe("Card", () => {
    it("should render the basic card", async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.card();
      // Assert.
      expect(actual).toBeTruthy();
    });
  });

  describe("Fashion", () => {
    async function shouldSetFashion(expected: string) {
      // Arrange.
      const target = await createTestTarget();
      const fashion = await target.fashion();

      // Act.
      await fashion.select(expected);
      const card = await target.card();
      const actual = await card.fashion();

      // Assert.
      expect(actual).toEqual(expected);
    }

    it("should set the color to Primary", async () => {
      await shouldSetFashion(theme.primary.name!);
    });

    it("should set the color to Secondary", async () => {
      await shouldSetFashion(theme.secondary.name!);
    });

    it("should set the color to Success", async () => {
      await shouldSetFashion(theme.success.name!);
    });

    it("should set the color to Warning", async () => {
      await shouldSetFashion(theme.warning.name!);
    });

    it("should set the color to Error", async () => {
      await shouldSetFashion(theme.error.name!);
    });

    it("should set the color to Info", async () => {
      await shouldSetFashion(theme.info.name!);
    });

    it("should set the color to Light", async () => {
      await shouldSetFashion(theme.light.name!);
    });

    it("should set the color to Dark", async () => {
      await shouldSetFashion(theme.dark.name!);
    });

    it("should set the color to Body", async () => {
      await shouldSetFashion(theme.body.name!);
    });

    it("should set the color to surface", async () => {
      await shouldSetFashion(theme.surface.name!);
    });
  });
});
