import { IZCircusDriver, IZCircusSetup, ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZYouTubeVideoComponentModel } from "@zthun/fashion-circus";
import React from "react";
import { afterEach, describe, expect, it } from "vitest";
import { ZYouTubeVideo } from "./you-tube-video";

describe("YouTubeVideo", () => {
  const Video = "Vr2OkMB2Wr0";
  let _renderer: IZCircusSetup<IZCircusDriver>;
  let _driver: IZCircusDriver;

  const createTestTarget = async () => {
    const element = <ZYouTubeVideo identity={Video} />;
    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return ZCircusBy.first(_driver, ZYouTubeVideoComponentModel);
  };

  afterEach(async () => {
    await _driver?.destroy?.call(_driver);
    await _renderer?.destroy?.call(_renderer);
  });

  it("should render the video with the correct id", async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const actual = await target.identity();
    // Assert.
    expect(actual).toEqual(Video);
  });
});
