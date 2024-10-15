import { IZCircusDriver, ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZOrientation } from "@zthun/helpful-fn";
import { afterEach, describe, expect, it } from "vitest";
import { ZLabelComponentModel } from "./label.cm.mjs";
import { IZLabeled, ZLabeled } from "./labeled";

describe("ZLabeled", () => {
  describe("With", () => {
    let _driver: IZCircusDriver;

    const createTestTarget = async (props?: IZLabeled) => {
      const element = <ZLabeled label="My Label" {...props} />;
      _driver = await new ZCircusSetupRenderer(element).setup();
      return ZCircusBy.first(_driver, ZLabelComponentModel);
    };

    afterEach(async () => {
      await _driver.destroy?.call(_driver);
    });

    it("should set the text of the label.", async () => {
      // Arrange.
      const label = "My Label";
      const target = await createTestTarget({ label });
      // Act.
      const actual = await target.text();
      // Assert.
      expect(actual).toEqual(label);
    });

    describe("Required", () => {
      const shouldBeRequired = async (expected: boolean | undefined) => {
        // Arrange.
        const orientation = ZOrientation.Horizontal;
        const required = expected;
        const target = await createTestTarget({
          orientation,
          LabelProps: { required },
        });
        // Act.
        const actual = await target.required();
        // Assert.
        expect(actual).toEqual(!!expected);
      };

      it("should turn on the flag.", async () => await shouldBeRequired(true));
      it("should turn off the flag.", async () =>
        await shouldBeRequired(false));
      it("should be false by default.", async () =>
        await shouldBeRequired(undefined));
    });
  });

  describe("Without", () => {
    it("should not render a label", async () => {
      // Arrange.
      const element = <ZLabeled />;
      const driver = await new ZCircusSetupRenderer(element).setup();
      // Act.
      const actual = await ZCircusBy.optional(driver, ZLabelComponentModel);
      // Assert.
      expect(actual).toBeFalsy();
    });
  });
});
