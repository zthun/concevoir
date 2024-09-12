import { ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { createMemoryHistory, MemoryHistory } from "history";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ZTestRouter } from "../router/router-dom.mjs";
import {
  IZBreadcrumbsLocation,
  ZBreadcrumbsLocation,
} from "./breadcrumbs-location";
import { ZBreadcrumbsComponentModel } from "./breadcrumbs.cm.mjs";

describe("ZBreadcrumbs", () => {
  describe("Location", () => {
    const path = "/path/to/resource";
    let history: MemoryHistory;

    async function createTestTarget(props?: Partial<IZBreadcrumbsLocation>) {
      const element = (
        <ZTestRouter navigator={history} location={history.location}>
          <ZBreadcrumbsLocation {...props} />
        </ZTestRouter>
      );

      const driver = await new ZCircusSetupRenderer(element).setup();
      return ZCircusBy.first(driver, ZBreadcrumbsComponentModel);
    }

    beforeEach(() => {
      history = createMemoryHistory({ initialEntries: [path] });
    });

    it("should render each path separated by slash", async () => {
      // Arrange.
      const target = await createTestTarget();

      // Act.
      const items = await target.items();
      const labels = await Promise.all(items.map((item) => item.label()));
      const actual = `/${labels.join("/")}`;

      // Assert.
      expect(actual).toEqual(path);
    });

    it("should retrieve a breadcrumb by name", async () => {
      // Arrange.
      const expected = "/path/to";
      const target = await createTestTarget();

      // Act.
      const actual = await (await target.item(expected))?.name();

      // Assert
      expect(actual).toEqual(expected);
    });

    it("should return null if the breadcrumb cannot be found", async () => {
      // Arrange.
      const target = await createTestTarget();

      // Act.
      const actual = await target.item("/path/not/found");

      // Assert.
      expect(actual).toBeNull();
    });

    it("should raise the onClick event with the breadcrumb clicked href", async () => {
      // Arrange.
      const onPathSelected = vi.fn();
      const target = await createTestTarget({ onPathSelected });

      // Act.
      const link = await target.item("/path/to");
      const expected = await link?.reference();
      await link?.click();

      // Assert.
      expect(onPathSelected).toHaveBeenCalledWith(expected);
    });

    describe("Home", () => {
      it("should render the named home path if provided", async () => {
        // Arrange.
        const home = { name: "Home" };
        const target = await createTestTarget({ home });

        // Act.
        const link = await target.item("/");
        const actual = await link?.label();

        // Assert.
        expect(actual).toEqual(home!.name);
      });

      it("should raise the onPathSelected event to the home path when clicked", async () => {
        // Arrange.
        const onPathSelected = vi.fn();
        const home = { name: "Home", path: "/home" };
        const target = await createTestTarget({ home, onPathSelected });
        const link = await target.item("/home");

        // Act.
        const expected = await link?.reference();
        await link?.click();

        // Assert.
        expect(onPathSelected).toHaveBeenCalledWith(expected);
      });
    });
  });
});
