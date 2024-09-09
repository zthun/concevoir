import { ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { describe, expect, it, vi } from "vitest";
import { IZBox, ZBox } from "./box";
import { ZBoxComponentModel } from "./box.cm.mjs";

describe("ZBox", () => {
  async function createTestTarget(props?: Partial<IZBox>) {
    const element = <ZBox {...props} />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZBoxComponentModel);
  }

  it("should render the component", async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget({
      padding: ZSizeFixed.Small,
      margin: ZSizeFixed.Medium,
    });
    // Assert.
    expect(target).toBeTruthy();
  });

  it("should raise the onClick event when the layout is clicked", async () => {
    // Arrange.
    const onClick = vi.fn();
    const target = await createTestTarget({
      onClick,
      interactive: true,
      cursor: "pointer",
    });
    // Act.
    await target.click();
    // Assert.
    expect(onClick).toHaveBeenCalled();
  });
});
