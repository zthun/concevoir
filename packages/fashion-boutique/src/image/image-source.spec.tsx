import { ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import {
  ZDataUrlBuilder,
  ZMimeTypeImage,
  ZUrlBuilder,
} from "@zthun/webigail-url";
import { describe, expect, it } from "vitest";
import { IZImageSource, ZImageSource } from "./image-source";
import { ZImageSourceComponentModel } from "./image-source.cm.mjs";

describe("ZImageSource", () => {
  const svg =
    '<svg focusable="false" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>';

  async function createTestTarget(props?: Partial<IZImageSource>) {
    const element = <ZImageSource {...props} />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZImageSourceComponentModel);
  }

  async function shouldRenderNameAttribute() {
    // Arrange
    const name = "test-image";
    const target = await createTestTarget({ name });
    // Act.
    const actual = await target.name();
    // Assert.
    expect(actual).toEqual(name);
  }

  describe("Empty", () => {
    it("renders an empty div.", async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const actual = await target.empty();
      // Assert
      expect(actual).toBeTruthy();
    });

    it("renders the name property", async () => {
      await shouldRenderNameAttribute();
    });
  });

  describe("SVG", () => {
    it("should render the app icon as a raw svg if it exists.", async () => {
      // Arrange
      const src = new ZDataUrlBuilder()
        .encode("base64")
        .buffer(svg)
        .mimeType(ZMimeTypeImage.SVG)
        .build();
      const target = await createTestTarget({ src });
      // Act
      const actual = await target.svg();
      // Assert
      expect(actual).toBeTruthy();
    });

    it("renders the name property", async () => {
      await shouldRenderNameAttribute();
    });
  });

  describe("IMG", () => {
    it("should render the app icon as a raster image if the url is not a svg data url.", async () => {
      // Arrange
      const src = new ZUrlBuilder().gravatar().build();
      const target = await createTestTarget({ src });
      // Act
      const actual = await target.img();
      // Assert
      expect(actual).toBeTruthy();
    });

    it("renders the name property", async () => {
      await shouldRenderNameAttribute();
    });
  });
});
