import { IZCircusDriver, IZCircusSetup, ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ZWizard } from "./wizard";
import { ZWizardComponentModel } from "./wizard.cm.mjs";

describe("ZWizard", () => {
  let page1Disabled: boolean | undefined;
  let lastPageDisabled: boolean | undefined;
  let _renderer: IZCircusSetup<IZCircusDriver>;
  let _driver: IZCircusDriver;

  const createTestTarget = async () => {
    const element = (
      <ZWizard>
        <div data-name="Page 1" data-next-disabled={page1Disabled}>
          Page 1
        </div>
        <div data-name="Page 2">Page 2</div>
        <div data-name="Page 3" data-next-disabled={lastPageDisabled}>
          Page 3
        </div>
      </ZWizard>
    );

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return ZCircusBy.first(_driver, ZWizardComponentModel);
  };

  beforeEach(() => {
    page1Disabled = undefined;
    lastPageDisabled = undefined;
  });

  afterEach(async () => {
    await _renderer?.destroy?.call(_renderer);
    await _driver?.destroy?.call(_driver);
  });

  describe("Navigation", () => {
    describe("Next", () => {
      it("should move to the next page", async () => {
        // Arrange.
        const target = await createTestTarget();
        const current = await target.page();
        const next = await target.next();
        // Act.
        await next?.click();
        const actual = await target.page();
        // Assert.
        expect(actual).toEqual(current + 1);
      });

      it("should be hidden on the last page", async () => {
        // Arrange.
        const target = await createTestTarget();
        const next = await target.next();
        // Act.
        await next?.click();
        await next?.click();
        const actual = await target.next();
        // Assert.
        expect(actual).toBeNull();
      });

      it("should disable the next button if the data disabled flag is truthy", async () => {
        // Arrange.
        page1Disabled = true;
        const target = await createTestTarget();
        const next = await target.next();
        // Act.
        const actual = await next?.disabled();
        // Assert.
        expect(actual).toBeTruthy();
      });
    });

    describe("Previous", () => {
      it("should move to the previous page", async () => {
        // Arrange.
        const target = await createTestTarget();
        const next = await target.next();
        await next?.click();
        await next?.click();
        const current = await target.page();
        const previous = await target.previous();
        // Act.
        await previous.click();
        const actual = await target.page();
        // Assert.
        expect(actual).toEqual(current - 1);
      });

      it("should be disabled if the current page is the first page", async () => {
        // Arrange.
        const target = await createTestTarget();
        const previous = await target.previous();
        // Act.
        const actual = await previous.disabled();
        // Assert.
        expect(actual).toBeTruthy();
      });
    });

    describe("Finish", () => {
      it("should be shown on the last page.", async () => {
        // Arrange.
        const target = await createTestTarget();
        const next = await target.next();
        // Act
        await next?.click();
        await next?.click();
        const actual = await target.finish();
        // Assert.
        expect(actual).toBeTruthy();
      });

      it("should be hidden before the last page.", async () => {
        // Arrange.
        const target = await createTestTarget();
        // Act.
        const actual = await target.finish();
        // Assert.
        expect(actual).toBeNull();
      });

      it("should be disabled if the data next disabled flag is true", async () => {
        // Arrange.
        lastPageDisabled = true;
        const target = await createTestTarget();
        const next = await target.next();
        await next?.click();
        await next?.click();
        // Act.
        const finish = await target.finish();
        const actual = await finish?.disabled();
        // Assert.
        expect(actual).toBeTruthy();
      });
    });
  });
});
