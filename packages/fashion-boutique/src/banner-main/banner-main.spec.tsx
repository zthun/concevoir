import { IZCircusDriver, IZCircusSetup, ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { afterEach, describe, expect, it } from "vitest";
import { IZBannerMain, ZBannerMain } from "./banner-main";
import { ZBannerMainComponentModel } from "./banner-main.cm.mjs";

describe("ZBannerMain", () => {
  let _renderer: IZCircusSetup;
  let _driver: IZCircusDriver;

  async function createTestTarget(props: Partial<IZBannerMain>) {
    _renderer = new ZCircusSetupRenderer(<ZBannerMain {...props} />);
    _driver = await _renderer.setup();
    return ZCircusBy.first(_driver, ZBannerMainComponentModel);
  }

  afterEach(async () => {
    await _driver?.destroy?.call(_driver);
    await _renderer?.destroy?.call(_renderer);
  });

  it("should render the title", async () => {
    // Arrange.
    const heading = "Title";
    const target = await createTestTarget({ TitleProps: { heading } });
    // Act.
    const title = await target.title();
    const actual = await (await title.heading())?.text();
    // Assert.
    expect(actual).toEqual(heading);
  });

  it("should render the content", async () => {
    // Arrange.
    const children = "Content";
    const target = await createTestTarget({ children });

    // Act.
    const section = await target.main();
    const actual = await section.text();

    // Assert.
    expect(actual).toEqual(children);
  });
});
