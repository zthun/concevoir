/* eslint-disable require-jsdoc */
import { ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZListLineItemComponentModel } from "@zthun/fashion-boutique";
import { describe, expect, it } from "vitest";
import { ZListPage } from "./list-page";
import { ZListPageComponentModel } from "./list-page.cm.mjs";

describe("ZListPage", () => {
  async function createTestTarget() {
    const element = <ZListPage />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZListPageComponentModel);
  }

  async function shouldIncrementCount(name: string) {
    // Arrange.
    const target = await createTestTarget();
    const list = await target.list();
    const everything = await list.item(name);
    const current = await target.count();
    const lineItem = new ZListLineItemComponentModel(everything!);
    // Act.
    await lineItem.click();
    const actual = await target.count();
    // Assert.
    expect(actual).toEqual(current + 1);
  }

  it("should show a success alert when the everything item is clicked", async () => {
    await shouldIncrementCount("everything");
  });

  it("should show a warning alert when the text-only item is clicked", async () => {
    await shouldIncrementCount("text-only");
  });
});
