import { ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { describe, expect, it } from "vitest";
import { IZLink, ZLink } from "./link";
import { ZLinkComponentModel } from "./link.cm.mjs";

describe("ZLink", () => {
  async function createTestTarget(props?: Partial<IZLink>) {
    const element = <ZLink {...props} />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZLinkComponentModel);
  }

  it("should set the name.", async () => {
    // Arrange.
    const name = "test-link-name";
    const target = await createTestTarget({ name });

    // Act.
    const actual = await target.name();

    // Assert.
    expect(actual).toEqual(name);
  });

  it("should set the hypertext reference.", async () => {
    // Arrange.
    const href = "#/path/to/resource";
    const target = await createTestTarget({ href });

    // Act.
    const actual = await target.reference();

    // Assert.
    expect(actual).toEqual(href);
  });

  it("should retrieve the underlying label", async () => {
    // Arrange.
    const label = "Label";
    const target = await createTestTarget({ label });

    // Act.
    const actual = await target.label();

    // Assert.
    expect(actual).toEqual(label);
  });
});
