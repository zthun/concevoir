import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import React from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { ZNewspaper, ZNewspaperRange } from "./newspaper";

describe("ZNewspaper", () => {
  let xl: ZNewspaperRange | undefined;
  let lg: ZNewspaperRange | undefined;
  let md: ZNewspaperRange | undefined;
  let sm: ZNewspaperRange | undefined;
  let xs: ZNewspaperRange | undefined;

  beforeEach(() => {
    xs = undefined;
    sm = undefined;
    md = undefined;
    lg = undefined;
    xl = undefined;
  });

  async function createTestTarget() {
    const element = (
      <ZNewspaper
        className="ZTestNewspaper-root"
        range={{ xl, lg, md, sm, xs }}
      >
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

  it("should render with responsive ranges", async () => {
    // Arrange.
    xl = [5, 8];
    lg = [4, 9];
    md = [3, 10];
    sm = [2, 11];
    xs = [1, 12];
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});
