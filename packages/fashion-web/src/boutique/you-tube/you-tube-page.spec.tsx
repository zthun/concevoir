import { IZCircusDriver, IZCircusSetup, ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { afterEach, describe, expect, it } from "vitest";
import { ZYouTubePage } from "./you-tube-page";
import { ZYouTubePageComponentModel } from "./you-tube-page.cm.mjs";

describe("ZYouTubePage", () => {
  let _renderer: IZCircusSetup<IZCircusDriver>;
  let _driver: IZCircusDriver;

  async function createTestTarget() {
    const element = <ZYouTubePage />;
    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return ZCircusBy.first(_driver, ZYouTubePageComponentModel);
  }

  afterEach(async () => {
    await _renderer?.destroy?.call(_renderer);
    await _driver?.destroy?.call(_driver);
  });

  it("should render the page", async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});
