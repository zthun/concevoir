/* eslint-disable require-jsdoc */
import { ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { describe, expect, it } from "vitest";
import { ZImagePage } from "./image-page";
import { ZImagePageComponentModel } from "./image-page.cm.mjs";

describe("ZListPage", () => {
  async function createTestTarget() {
    const element = <ZImagePage />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZImagePageComponentModel);
  }

  it("should render the page", async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});
