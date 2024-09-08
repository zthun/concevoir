import { ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { required } from "@zthun/helpful-fn";
import { ReactNode } from "react";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { ZList } from "./list";
import { ZListDivider } from "./list-divider";
import { ZListGroup } from "./list-group";
import { ZListLineItem } from "./list-line-item";
import { ZListLineItemComponentModel } from "./list-line-item.cm.mjs";
import { ZListComponentModel } from "./list.cm.mjs";

describe("ZList", () => {
  let heading: ReactNode | undefined;
  let subHeading: ReactNode | undefined;
  let onClick: Mock | undefined;

  async function createTestTarget() {
    const element = (
      <ZList>
        <ZListGroup heading="Group" name="group"></ZListGroup>
        <ZListLineItem
          name="clickable"
          onClick={onClick}
          heading="Clickable"
          subHeading="Clicking raises an event"
        />
        <ZListDivider name="divider" />
        <ZListLineItem
          name="no-click"
          heading={heading}
          subHeading={subHeading}
        />
      </ZList>
    );

    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZListComponentModel);
  }

  beforeEach(() => {
    heading = undefined;
    subHeading = undefined;
    onClick = undefined;
  });

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
    const target = await createTestTarget();
    // Act.
    const actual = await target.item("missing");
    // Assert.
    expect(actual).toBeFalsy();
  });

  describe("Line Items", () => {
    it("should retrieve the correct item.", async () => {
      // Arrange.
      const expected = "clickable";
      const target = await createTestTarget();
      const item = await required(target.item(expected));
      // Act.
      const actual = await item.name();
      // Assert.
      expect(actual).toEqual(expected);
    });

    it("should render the line item without being able to click on it.", async () => {
      // Arrange.
      const target = await createTestTarget();
      const item = await required(target.item("no-click"));
      const lineItem = new ZListLineItemComponentModel(item);
      // Act.
      const actual = await lineItem.clickable();
      // Should do nothing.
      await lineItem.click();
      // Assert.
      expect(actual).toBeFalsy();
    });

    it("should raise the onClick event of a line item if onClick is set.", async () => {
      // Arrange.
      onClick = vi.fn();
      const target = await createTestTarget();
      const item = await required(target.item("clickable"));
      const lineItem = new ZListLineItemComponentModel(item);
      // Act.
      const actual = await lineItem.clickable();
      await lineItem.click();
      // Assert.
      expect(actual).toBeTruthy();
      expect(onClick).toHaveBeenCalled();
    });

    it("should render the heading.", async () => {
      // Arrange.
      heading = "Test Heading";
      const target = await createTestTarget();
      const item = await required(target.item("no-click"));
      const lineItem = new ZListLineItemComponentModel(item);
      // Act.
      const actual = await lineItem.heading();
      // Assert.
      expect(actual).toEqual(heading);
    });

    it("should render an empty heading if not set.", async () => {
      // Arrange.
      const target = await createTestTarget();
      const item = await required(target.item("no-click"));
      const lineItem = new ZListLineItemComponentModel(item);
      // Act.
      const actual = await lineItem.heading();
      // Assert.
      expect(actual).toEqual("");
    });

    it("should render the sub heading.", async () => {
      // Arrange.
      subHeading = "Test Sub Heading";
      const target = await createTestTarget();
      const item = await required(target.item("no-click"));
      const lineItem = new ZListLineItemComponentModel(item);
      // Act.
      const actual = await lineItem.subHeading();
      // Assert.
      expect(actual).toEqual(subHeading);
    });

    it("should render an empty sub heading if not set.", async () => {
      // Arrange.
      const target = await createTestTarget();
      const item = await required(target.item("no-click"));
      const lineItem = new ZListLineItemComponentModel(item);
      // Act.
      const actual = await lineItem.subHeading();
      // Assert.
      expect(actual).toEqual("");
    });
  });
});
