import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { beforeEach, describe, expect, it } from "vitest";
import { ZNewspaper, ZNewspaperRange } from "./newspaper";

describe("ZNewspaper", () => {
  let xl: ZNewspaperRange;

  beforeEach(() => {
    xl = [1, 12];
  });

  async function createTestTarget() {
    const element = (
      <ZNewspaper className="ZTestNewspaper-root" range={xl}>
        12 Column Content
      </ZNewspaper>
    );
    const driver = await new ZCircusSetupRenderer(element).setup();
    return driver;
  }

  it("should render will full ranges", async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});
