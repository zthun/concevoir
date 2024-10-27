import { IZCircusDriver, IZCircusSetup, ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ZDivider } from "../divider/divider";
import { IZList, ZList } from "./list";
import { IZListItem, ZListItem } from "./list-item";
import { ZListComponentModel } from "./list.cm.mjs";

describe("ZList", () => {
  let _renderer: IZCircusSetup;
  let _driver: IZCircusDriver;

  async function createTestTarget(
    props?: Partial<IZList>,
    item?: Partial<IZListItem>,
  ) {
    const element = (
      <ZList {...props}>
        <ZListItem compact name="group">
          Less padding for compact items
        </ZListItem>
        <ZListItem cursor="pointer" name="clickable" interactive {...item}>
          You can click on this list item and it can get the browser focus.
        </ZListItem>
        <ZListItem compact>
          <ZDivider data-name="divider" />
        </ZListItem>
        <ZListItem>
          Default is inline and does not show focus or hover state.
        </ZListItem>
      </ZList>
    );

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return ZCircusBy.first(_driver, ZListComponentModel);
  }

  afterEach(async () => {
    await _driver?.destroy?.call(_driver);
    await _renderer?.destroy?.call(_renderer);
  });

  describe("List", () => {
    it("should render all items", async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.items();
      // Assert.
      expect(actual.length).toEqual(4);
    });

    it("should not render an item that does not exist", async () => {
      // Arrange.
      const target = await createTestTarget({ compact: true });
      // Act.
      const actual = await target.item("missing");
      // Assert.
      expect(actual).toBeFalsy();
    });

    it("should retrieve the correctly named item", async () => {
      // Arrange.
      const expected = "clickable";
      const target = await createTestTarget();

      // Act.
      const item = await target.item(expected);
      const actual = await item?.name();

      // Assert.
      expect(actual).toEqual(expected);
    });
  });

  describe("Item", () => {
    it("should raise the onClick event of a line item if onClick is set.", async () => {
      // Arrange.
      const onClick = vi.fn();
      const target = await createTestTarget(undefined, { onClick });
      const item = await target.item("clickable");
      // Act.
      await item?.click();
      // Assert.
      expect(onClick).toHaveBeenCalled();
    });
  });
});
