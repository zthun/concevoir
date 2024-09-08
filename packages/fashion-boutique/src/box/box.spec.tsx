import { ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZSizeFixed, ZSizeVaried } from "@zthun/fashion-tailor";
import { Mock, describe, expect, it, vi } from "vitest";
import { ZBox } from "./box";
import { ZBoxComponentModel } from "./box.cm.mjs";

describe("ZBox", () => {
  let onClick: Mock | undefined;

  async function createTestTarget() {
    const element = (
      <ZBox
        padding={{ left: ZSizeFixed.Large, right: ZSizeFixed.ExtraLarge }}
        margin={{ bottom: ZSizeVaried.Fit, top: ZSizeFixed.Medium }}
        onClick={onClick}
      />
    );
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZBoxComponentModel);
  }

  it("should render the component", async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });

  it("should raise the onClick event when the layout is clicked", async () => {
    // Arrange.
    onClick = vi.fn();
    const target = await createTestTarget();
    // Act.
    await target.click();
    // Assert.
    expect(onClick).toHaveBeenCalled();
  });
});
