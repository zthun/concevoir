import { ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
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
    const item = await list.item(name);
    const current = await target.count();
    // Act.
    await item?.click();
    const actual = await target.count();
    // Assert.
    expect(actual).toEqual(current + 1);
  }

  it("should increment the count when alpha is clicked", async () => {
    await shouldIncrementCount("alpha");
  });
});
