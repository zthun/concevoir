import { ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import {
  ZHeadingComponentModel,
  ZParagraphComponentModel,
} from "@zthun/fashion-circus";
import { ZFashionSeverity } from "@zthun/fashion-theme";
import React from "react";
import { describe, expect, it } from "vitest";
import { ZTypographyPage } from "./typography-page";
import { ZTypographyPageComponentModel } from "./typography-page.cm.mjs";

describe("ZTypographyPage", () => {
  async function createTestTarget() {
    const element = <ZTypographyPage />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZTypographyPageComponentModel);
  }

  describe("Fashion", () => {
    describe("Heading", () => {
      const shouldSetFashion = async (
        factory: (
          t: ZTypographyPageComponentModel,
        ) => Promise<ZHeadingComponentModel>,
      ) => {
        // Arrange.
        const target = await createTestTarget();
        const fashion = await target.fashion();
        const expected = ZFashionSeverity.Success;
        // Act.
        await fashion.select(expected);
        const heading = await factory(target);
        const actual = await heading.fashion();
        // Assert.
        expect(actual).toEqual(expected);
      };

      it("should set the fashion for h1", async () => {
        await shouldSetFashion((t) => t.h1());
      });

      it("should set the fashion for h2", async () => {
        await shouldSetFashion((t) => t.h2());
      });

      it("should set the fashion for h3", async () => {
        await shouldSetFashion((t) => t.h3());
      });

      it("should set the fashion for h4", async () => {
        await shouldSetFashion((t) => t.h4());
      });

      it("should set the fashion for h5", async () => {
        await shouldSetFashion((t) => t.h5());
      });

      it("should set the fashion for h6", async () => {
        await shouldSetFashion((t) => t.h6());
      });
    });

    describe("Paragraph", () => {
      const shouldSetFashion = async (
        factory: (
          t: ZTypographyPageComponentModel,
        ) => Promise<ZParagraphComponentModel>,
      ) => {
        // Arrange.
        const target = await createTestTarget();
        const fashion = await target.fashion();
        const expected = ZFashionSeverity.Success;
        // Act.
        await fashion.select(expected);
        const paragraph = await factory(target);
        const actual = await paragraph.fashion();
        // Assert.
        expect(actual).toEqual(expected);
      };

      it("should set the fashion for body", async () => {
        await shouldSetFashion((t) => t.body());
      });

      it("should set the fashion for caption", async () => {
        await shouldSetFashion((t) => t.caption());
      });

      it("should set the fashion for subtitle", async () => {
        await shouldSetFashion((t) => t.subtitle());
      });

      it("should set the fashion for overline", async () => {
        await shouldSetFashion((t) => t.overline());
      });
    });
  });

  describe("Compact", () => {
    describe("Heading", () => {
      const shouldSetCompact = async (
        factory: (
          t: ZTypographyPageComponentModel,
        ) => Promise<ZHeadingComponentModel>,
      ) => {
        // Arrange.
        const target = await createTestTarget();
        const compact = await target.compact();
        // Act.
        await compact.toggle(true);
        const heading = await factory(target);
        const actual = await heading.compact();
        // Assert.
        expect(actual).toBeTruthy();
      };

      it("should set compact for h1", async () => {
        await shouldSetCompact((t) => t.h1());
      });

      it("should set compact for h2", async () => {
        await shouldSetCompact((t) => t.h2());
      });

      it("should set compact for h3", async () => {
        await shouldSetCompact((t) => t.h3());
      });

      it("should set compact for h4", async () => {
        await shouldSetCompact((t) => t.h4());
      });

      it("should set compact for h5", async () => {
        await shouldSetCompact((t) => t.h5());
      });

      it("should set compact for h6", async () => {
        await shouldSetCompact((t) => t.h6());
      });
    });

    describe("Paragraph", () => {
      const shouldSetCompact = async (
        factory: (
          t: ZTypographyPageComponentModel,
        ) => Promise<ZParagraphComponentModel>,
      ) => {
        // Arrange.
        const target = await createTestTarget();
        const compact = await target.compact();
        // Act.
        await compact.toggle(true);
        const paragraph = await factory(target);
        const actual = await paragraph.compact();
        // Assert.
        expect(actual).toBeTruthy();
      };

      it("should set the fashion for body", async () => {
        await shouldSetCompact((t) => t.body());
      });

      it("should set the fashion for caption", async () => {
        await shouldSetCompact((t) => t.caption());
      });

      it("should set the fashion for subtitle", async () => {
        await shouldSetCompact((t) => t.subtitle());
      });

      it("should set the fashion for overline", async () => {
        await shouldSetCompact((t) => t.overline());
      });
    });
  });
});
