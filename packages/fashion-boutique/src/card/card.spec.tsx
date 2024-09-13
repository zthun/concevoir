import { IZCircusDriver, IZCircusSetup, ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { afterEach, describe, expect, it } from "vitest";
import { IZCard, ZCard } from "./card";
import { ZCardComponentModel } from "./card.cm.mjs";

describe("ZCard", () => {
  let _renderer: IZCircusSetup;
  let _driver: IZCircusDriver;

  async function createTestTarget(props?: Partial<IZCard>) {
    _renderer = new ZCircusSetupRenderer(<ZCard {...props} />);
    _driver = await _renderer.setup();
    return ZCircusBy.first(_driver, ZCardComponentModel);
  }

  afterEach(async () => {
    await _driver?.destroy?.call(_driver);
    await _renderer?.destroy?.call(_renderer);
  });

  describe("Header", () => {
    it("should render the heading", async () => {
      // Arrange.
      const heading = "Test Heading";
      const target = await createTestTarget({ heading });

      // Act.
      const actual = await target.heading();

      // Assert
      expect(actual).toEqual(heading);
    });

    it("should return null if no heading is supplied", async () => {
      // Arrange.
      const target = await createTestTarget();

      // Act.
      const actual = await target.heading();

      // Assert
      expect(actual).toEqual("");
    });

    it("should render the subheading", async () => {
      // Arrange.
      const subHeading = "Test Sub Heading";
      const target = await createTestTarget({ subHeading });

      // Act.
      const actual = await target.subHeading();

      // Assert
      expect(actual).toEqual(subHeading);
    });

    it("should return null if no subHeading is supplied", async () => {
      // Arrange.
      const target = await createTestTarget();

      // Act.
      const actual = await target.subHeading();

      // Assert
      expect(actual).toEqual("");
    });
  });

  describe("Content", () => {
    it("should render the content", async () => {
      // Arrange.
      const children = "Test Content";
      const target = await createTestTarget({ children });

      // Act.
      const _content = await target.content();
      const actual = await _content.text();

      // Assert.
      expect(actual).toEqual(children);
    });
  });

  describe("Footer", () => {
    it("should render the footer if supplied", async () => {
      // Arrange.
      const footer = "Test Footer";
      const target = await createTestTarget({ footer });

      // Act.
      const _footer = await target.footer();
      const actual = await _footer?.text();

      // Assert.
      expect(actual).toEqual(footer);
    });

    it("should not render the footer if it is undefined", async () => {
      // Arrange.
      const target = await createTestTarget();

      // Act.
      const actual = await target.footer();

      // Assert
      expect(actual).toBeNull();
    });
  });
});
