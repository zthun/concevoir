import { ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZButtonComponentModel } from "@zthun/fashion-boutique";
import { IZFashion, ZFashionThemeBuilder } from "@zthun/fashion-theme";
import { describe, expect, it } from "vitest";
import { ZButtonPage } from "./button-page";
import { ZButtonPageComponentModel } from "./button-page.cm.mjs";

describe("ZButtonPage", () => {
  async function createTestTarget() {
    const element = <ZButtonPage />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZButtonPageComponentModel);
  }

  const theme = new ZFashionThemeBuilder().build();
  type ButtonPageFactory = (
    t: ZButtonPageComponentModel,
  ) => Promise<ZButtonComponentModel>;

  async function shouldIncrementTheClickCount(factory: ButtonPageFactory) {
    // Arrange.
    const target = await createTestTarget();
    const button = await factory(target);
    const count = await target.count();
    // Act.
    await button.click();
    const actual = await target.count();
    // Assert.
    expect(actual).toEqual(count + 1);
  }

  async function shouldDisableWhenOptionIs(
    expected: boolean,
    factory: ButtonPageFactory,
  ) {
    // Arrange.
    const target = await createTestTarget();
    const disabled = await target.disabled();
    await disabled.toggle(!expected);
    // Act.
    await disabled.toggle(expected);
    const button = await factory(target);
    const actual = await button.disabled();
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function shouldBeOutlined(
    expected: boolean,
    factory: ButtonPageFactory,
  ) {
    // Arrange
    const target = await createTestTarget();
    const outline = await target.outline();
    await outline.toggle(!expected);
    // Act.
    await outline.toggle(expected);
    const button = await factory(target);
    const actual = await button.outlined();
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function shouldBeBorderless(
    expected: boolean,
    factory: ButtonPageFactory,
  ) {
    // Arrange
    const target = await createTestTarget();
    const borderless = await target.borderless();
    await borderless.toggle(!expected);
    // Act.
    await borderless.toggle(expected);
    const button = await factory(target);
    const actual = await button.borderless();
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function shouldBeLoading(
    expected: boolean,
    factory: ButtonPageFactory,
  ) {
    // Arrange
    const target = await createTestTarget();
    const loading = await target.loading();
    await loading.toggle(!expected);
    // Act.
    await loading.toggle(expected);
    const button = await factory(target);
    const actual = await button.loading();
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function assertSetsFashion(
    coordination: IZFashion,
    factory: ButtonPageFactory,
  ) {
    // Arrange
    const target = await createTestTarget();
    const fashion = await target.fashion();
    const name = coordination.name!;
    await fashion.select(name);
    // Act.
    const button = await factory(target);
    const actual = await button.fashion();
    // Assert.
    expect(actual).toEqual(name);
  }

  describe("Basic Button", () => {
    it("should raise an alert when clicked", async () => {
      await shouldIncrementTheClickCount((t) => t.button());
    });

    it("should enable when the disabled option is unchecked.", async () => {
      await shouldDisableWhenOptionIs(false, (t) => t.button());
    });

    it("should disable when the disabled option is checked.", async () => {
      await shouldDisableWhenOptionIs(true, (t) => t.button());
    });

    it("should be solid when the outline option is unchecked.", async () => {
      await shouldBeOutlined(false, (t) => t.button());
    });

    it("should outline when the outline option is checked.", async () => {
      await shouldBeOutlined(true, (t) => t.button());
    });

    it("should not be borderless when the borderless option is unchecked.", async () => {
      await shouldBeBorderless(false, (t) => t.button());
    });

    it("should be borderless when the borderless option is checked.", async () => {
      await shouldBeBorderless(true, (t) => t.button());
    });

    it("should not be loading when the loading option is unchecked.", async () => {
      await shouldBeLoading(false, (t) => t.button());
    });

    it("should be loading when the loading option is checked.", async () => {
      await shouldBeLoading(true, (t) => t.button());
    });

    describe("Fashion", () => {
      it("should update to Primary.", async () => {
        await assertSetsFashion(theme.primary, (t) => t.button());
      });

      it("should update to Secondary.", async () => {
        await assertSetsFashion(theme.secondary, (t) => t.button());
      });

      it("should update to Success.", async () => {
        await assertSetsFashion(theme.success, (t) => t.button());
      });

      it("should update to Warning.", async () => {
        await assertSetsFashion(theme.warning, (t) => t.button());
      });

      it("should update to Error.", async () => {
        await assertSetsFashion(theme.error, (t) => t.button());
      });

      it("should update to Info.", async () => {
        await assertSetsFashion(theme.info, (t) => t.button());
      });
    });
  });

  describe("Icon Button", () => {
    it("should raise an alert when clicked", async () => {
      await shouldIncrementTheClickCount((t) => t.iconButton());
    });

    it("should enable when the disabled option is unchecked.", async () => {
      await shouldDisableWhenOptionIs(false, (t) => t.iconButton());
    });

    it("should disable when the disabled option is checked.", async () => {
      await shouldDisableWhenOptionIs(true, (t) => t.iconButton());
    });

    it("should be solid when the outline option is unchecked.", async () => {
      await shouldBeOutlined(false, (t) => t.iconButton());
    });

    it("should outline when the outline option is checked.", async () => {
      await shouldBeOutlined(true, (t) => t.iconButton());
    });

    it("should not be borderless when the borderless option is unchecked.", async () => {
      await shouldBeBorderless(false, (t) => t.iconButton());
    });

    it("should be borderless when the borderless option is checked.", async () => {
      await shouldBeBorderless(true, (t) => t.iconButton());
    });

    it("should not be loading when the loading option is unchecked.", async () => {
      await shouldBeLoading(false, (t) => t.iconButton());
    });

    it("should be loading when the loading option is checked.", async () => {
      await shouldBeLoading(true, (t) => t.iconButton());
    });

    describe("Fashion", () => {
      it("should update to Primary.", async () => {
        await assertSetsFashion(theme.primary, (t) => t.iconButton());
      });

      it("should update to Secondary.", async () => {
        await assertSetsFashion(theme.secondary, (t) => t.iconButton());
      });

      it("should update to Success.", async () => {
        await assertSetsFashion(theme.success, (t) => t.iconButton());
      });

      it("should update to Warning.", async () => {
        await assertSetsFashion(theme.warning, (t) => t.iconButton());
      });

      it("should update to Error.", async () => {
        await assertSetsFashion(theme.error, (t) => t.iconButton());
      });

      it("should update to Info.", async () => {
        await assertSetsFashion(theme.info, (t) => t.iconButton());
      });
    });
  });
});
