import { ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import React from "react";
import { describe, expect, it } from "vitest";
import { ZChartPage } from "./chart-page";
import { ZChartPageComponentModel } from "./chart-page.cm.mjs";

describe("ZChartPage", () => {
  async function createTestTarget() {
    const element = <ZChartPage />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZChartPageComponentModel);
  }

  describe("Progress", () => {
    const shouldRenderChart = async (
      name: "hp" | "attack" | "defense" | "intelligence" | "speed",
    ) => {
      // Arrange
      const target = await createTestTarget();
      const progress = await target.progress();
      // Act.
      const chart = await progress[name]();
      // Assert.
      expect(chart).toBeTruthy();
    };

    it("should render the hp progress chart", async () => {
      await shouldRenderChart("hp");
    });

    it("should render the attack progress chart", async () => {
      await shouldRenderChart("attack");
    });

    it("should render the defense progress chart", async () => {
      await shouldRenderChart("defense");
    });

    it("should render the intelligence progress chart", async () => {
      await shouldRenderChart("intelligence");
    });

    it("should render the speed progress chart", async () => {
      await shouldRenderChart("speed");
    });
  });
});
