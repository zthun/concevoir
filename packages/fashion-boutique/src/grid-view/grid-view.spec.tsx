import {
  IZCircusDriver,
  IZCircusSetup,
  ZCircusBy,
  ZCircusKeyboardQwerty,
} from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import {
  ZDataRequestBuilder,
  ZDataSourceStatic,
  ZDataSourceStaticOptionsBuilder,
} from "@zthun/helpful-query";
import { range } from "lodash-es";
import { afterEach, describe, expect, it, vi } from "vitest";
import { IZGridView, ZGridView } from "./grid-view";
import { ZGridViewComponentModel } from "./grid-view.cm.mjs";

describe("ZGridView", () => {
  let _renderer: IZCircusSetup;
  let _driver: IZCircusDriver;
  let _target: ZGridViewComponentModel;

  const renderItem = (item: any) => (
    <div key={item} className="item">
      {item.toString()}
    </div>
  );

  async function createTestTarget(props?: Partial<IZGridView>) {
    _renderer = new ZCircusSetupRenderer(
      <ZGridView renderItem={renderItem} {...props} />,
    );
    _driver = await _renderer.setup();
    _target = await ZCircusBy.first(_driver, ZGridViewComponentModel);
    return _target;
  }

  afterEach(async () => {
    await _target?.load();
    await _driver?.destroy?.call(_driver);
    await _renderer?.destroy?.call(_renderer);
  });

  describe("Page Size", () => {
    const data = range(0, 100);
    const dataSource = new ZDataSourceStatic(data);

    it("should render available items", async () => {
      // Arrange.
      const renderItem = vi.fn();
      const value = new ZDataRequestBuilder().build();
      const target = await createTestTarget({ value, dataSource, renderItem });

      // Act.
      await target.load();

      // Assert.
      expect(renderItem).toHaveBeenCalledTimes(data.length);
    });

    it("should not render any errors", async () => {
      // Arrange.
      const target = await createTestTarget({ dataSource });

      // Act.
      await target.load();
      const actual = await target.error();

      // Assert.
      expect(actual).toBeFalsy();
    });

    it("should render items up to the page size of the value", async () => {
      // Arrange.
      const value = new ZDataRequestBuilder().page(1).size(12).build();
      const target = await createTestTarget({ value, dataSource });

      // Act.
      await target.load();
      const actual = await target.driver.query(".item");

      // Assert.
      expect(actual.length).toEqual(value.size);
    });
  });

  describe("Pagination", () => {
    it("should move to the next page", async () => {
      // Arrange.
      const expected = expect.objectContaining({ page: 2 });
      const dataSource = new ZDataSourceStatic(range(0, 100));
      vi.spyOn(dataSource, "retrieve");
      const target = await createTestTarget({ dataSource });

      // Act.
      const more = await target.more();
      await more?.click();

      // Assert.
      expect(dataSource.retrieve).toHaveBeenCalledWith(expected);
    });

    it("should hide the more button if there are no more items to load", async () => {
      // Arrange
      const value = new ZDataRequestBuilder().build();
      const target = await createTestTarget({ value });
      await target.load();

      // Act.
      const actual = await target.more();

      // Assert.
      expect(actual).toBeFalsy();
    });
  });

  describe("Search", () => {
    it("should search for a specific item", async () => {
      // Arrange.
      const onValueChange = vi.fn();
      const search = "100";
      const expected = expect.objectContaining({ search });
      const target = await createTestTarget({ onValueChange });
      await target.load();
      const text = await target.search();

      // Act.
      await text.keyboard(search, ZCircusKeyboardQwerty.enter);

      // Assert.
      expect(onValueChange).toHaveBeenCalledWith(expected);
    });
  });

  describe("Refresh", () => {
    it("should render a loader while data is being loaded", async () => {
      // Arrange.
      const options = new ZDataSourceStaticOptionsBuilder<number>()
        .delay(500)
        .build();
      const dataSource = new ZDataSourceStatic(range(0, 10), options);
      const target = await createTestTarget({ dataSource });

      // Act.
      const actual = await target.suspense();

      // Assert.
      expect(actual).toBeTruthy();
    });
  });

  describe("Error", () => {
    const dataSource = new ZDataSourceStatic(new Error("Something went wrong"));

    it("should render the error message", async () => {
      // Arrange.
      const target = await createTestTarget({ dataSource });

      // Act.
      const actual = await target.error();

      // Assert.
      expect(actual).toBeTruthy();
    });

    it("should disable the more button", async () => {
      // Arrange.
      const target = await createTestTarget({ dataSource });

      // Act.
      const more = await target.more();
      const actual = await more?.disabled();

      // Assert.
      expect(actual).toBeTruthy();
    });
  });
});
