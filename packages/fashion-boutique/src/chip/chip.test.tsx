import { IZCircusDriver, IZCircusSetup, ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZFashionBuilder } from "@zthun/fashion-theme";
import { describe, expect, it } from "vitest";
import { IZChip, ZChip } from "./chip";
import { ZChipComponentModel } from "./chip.cm.mjs";

describe("ZChip", () => {
  let _renderer: IZCircusSetup;
  let _driver: IZCircusDriver;

  const createTestTarget = async (props?: Partial<IZChip>) => {
    const element = <ZChip {...props} />;

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();

    return ZCircusBy.first(_driver, ZChipComponentModel);
  };

  describe("Prefix", () => {
    it("should render if set", async () => {
      // Arrange.
      const expected = "Prefix";
      const target = await createTestTarget({ prefix: expected });

      // Act.
      const prefix = await target.prefix();
      const actual = await prefix?.text();

      // Assert.
      expect(actual).toEqual(expected);
    });
    it("should not render if not set", async () => {
      // Arrange.
      const target = await createTestTarget();

      // Act.
      const actual = await target.prefix();

      // Assert.
      expect(actual).toBeNull();
    });
  });

  describe("Body", () => {
    it("should render", async () => {
      // Arrange.
      const expected = "Body";
      const target = await createTestTarget({ children: expected });

      // Act.
      const body = await target.body();
      const actual = await body?.text();

      // Assert.
      expect(actual).toEqual(expected);
    });
  });

  describe("Suffix", () => {
    it("should render if set", async () => {
      // Arrange.
      const expected = "Suffix";
      const target = await createTestTarget({ suffix: expected });

      // Act.
      const prefix = await target.suffix();
      const actual = await prefix?.text();

      // Assert.
      expect(actual).toEqual(expected);
    });
    it("should not render if not set", async () => {
      // Arrange.
      const target = await createTestTarget();

      // Act.
      const actual = await target.suffix();

      // Assert.
      expect(actual).toBeNull();
    });
  });

  describe("Fashion", () => {
    it("should set the fashion", async () => {
      // Arrange.
      const expected = new ZFashionBuilder().name("custom").build();
      const target = await createTestTarget({ fashion: expected });

      // Act
      const actual = await target.fashion();

      // Assert.
      expect(actual).toEqual(expected.name);
    });
  });
});
