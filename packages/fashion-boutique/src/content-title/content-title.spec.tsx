import { IZCircusDriver, IZCircusSetup, ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { describe, expect, it } from "vitest";
import { ZH3 } from "../typography/typography";
import { IZContentTitle, ZContentTitle } from "./content-title";
import { ZContentTitleComponentModel } from "./content-title.cm";

describe("ZContentTitle", () => {
  const node = "Rendered";

  let _renderer: IZCircusSetup;
  let _driver: IZCircusDriver;

  const createTestTarget = async (props?: Partial<IZContentTitle>) => {
    _renderer = new ZCircusSetupRenderer(<ZContentTitle {...props} />);
    _driver = await _renderer.setup();

    return ZCircusBy.first(_driver, ZContentTitleComponentModel);
  };

  describe("Avatar", () => {
    it("should render if set", async () => {
      // Arrange.
      const target = await createTestTarget({ avatar: node });

      // Act.
      const actual = await (await target.avatar())?.text();

      // Assert.
      expect(actual).toEqual(node);
    });

    it("should not render if not set", async () => {
      // Arrange.
      const target = await createTestTarget();

      // Act.
      const actual = await target.avatar();

      // Assert.
      expect(actual).toBeNull();
    });
  });

  describe("Heading", () => {
    it("should render if set", async () => {
      // Arrange.
      const target = await createTestTarget({ heading: node });

      // Act.
      const actual = await (await target.heading())?.text();

      // Assert.
      expect(actual).toEqual(node);
    });

    it("should render custom typography", async () => {
      // Arrange.
      const target = await createTestTarget({
        heading: <ZH3 compact>{node}</ZH3>,
      });

      // Act.
      const actual = await (await target.heading())?.text();

      // Assert.
      expect(actual).toEqual(node);
    });

    it("should not render if not set", async () => {
      // Arrange.
      const target = await createTestTarget();

      // Act.
      const actual = await target.heading();

      // Assert.
      expect(actual).toBeNull();
    });
  });

  describe("SubHeading", () => {
    it("should render if set", async () => {
      // Arrange.
      const target = await createTestTarget({ subHeading: node });

      // Act.
      const actual = await (await target.subHeading())?.text();

      // Assert.
      expect(actual).toEqual(node);
    });

    it("should render custom typography", async () => {
      // Arrange.
      const target = await createTestTarget({
        subHeading: <ZH3 compact>{node}</ZH3>,
      });

      // Act.
      const actual = await (await target.subHeading())?.text();

      // Assert.
      expect(actual).toEqual(node);
    });

    it("should not render if not set", async () => {
      // Arrange.
      const target = await createTestTarget();

      // Act.
      const actual = await target.subHeading();

      // Assert.
      expect(actual).toBeNull();
    });
  });

  describe("Prefix", () => {
    it("should render if set", async () => {
      // Arrange.
      const target = await createTestTarget({ prefix: node });

      // Act.
      const actual = await (await target.prefix())?.text();

      // Assert.
      expect(actual).toEqual(node);
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

  describe("Suffix", () => {
    it("should render if set", async () => {
      // Arrange.
      const target = await createTestTarget({ suffix: node });

      // Act.
      const actual = await (await target.suffix())?.text();

      // Assert.
      expect(actual).toEqual(node);
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
});
