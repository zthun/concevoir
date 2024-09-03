import { IZCircusDriver, IZCircusSetup, ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import {
  ZIconFontAwesomeElement,
  ZIconMaterialElement,
} from "@zthun/fashion-boutique";
import { ZIconComponentModel } from "@zthun/fashion-circus";
import React from "react";
import { Mock, afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ZIconFontAwesome } from "./icon-font-awesome";
import { ZIconMaterial } from "./icon-material";

describe("ZIcon", () => {
  let _renderer: IZCircusSetup;
  let _driver: IZCircusDriver;
  let onClick: Mock | undefined;

  beforeEach(() => {
    onClick = undefined;
  });

  afterEach(async () => {
    await _driver?.destroy?.call(_driver);
    await _renderer?.destroy?.call(_renderer);
  });

  async function shouldRegisterTheProvider(
    expected: string,
    createTestTarget: (name: string) => Promise<ZIconComponentModel>,
  ) {
    // Arrange.
    await createTestTarget("home");
    // Act.
    const actual = document.head.querySelectorAll(
      `link[href="${expected}"]`,
    ).length;
    // Assert.
    expect(actual).toEqual(1);
  }

  async function shouldRenderTheIconByName(
    expected: string,
    createTestTarget: (name: string) => Promise<ZIconComponentModel>,
  ) {
    // Arrange.
    const target = await createTestTarget(expected);
    // Act.
    const actual = await target.name();
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function shouldProvideTheCorrectVendor(
    expected: string,
    createTestTarget: (name: string) => Promise<ZIconComponentModel>,
  ) {
    // Arrange.
    const target = await createTestTarget("save");
    // Act.
    const actual = await target.vendor();
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function shouldRaiseTheOnClickEventWhenClicked(
    createTestTarget: (name: string) => Promise<ZIconComponentModel>,
  ) {
    // Arrange.
    onClick = vi.fn();
    const target = await createTestTarget("home");
    // Act.
    await target.click();
    // Assert.
    expect(onClick).toHaveBeenCalled();
  }

  describe("Material", () => {
    async function createTestTarget(name: string) {
      const element = <ZIconMaterial name={name} onClick={onClick} />;
      _renderer = new ZCircusSetupRenderer(element);
      _driver = await _renderer.setup();
      return ZCircusBy.first(_driver, ZIconComponentModel, name);
    }

    it("should register the provider.", async () => {
      await shouldRegisterTheProvider(
        ZIconMaterialElement.Provider,
        createTestTarget,
      );
    });

    it("should render the icon by name.", async () => {
      await shouldRenderTheIconByName("save", createTestTarget);
    });

    it("should provide the correct vendor.", async () => {
      await shouldProvideTheCorrectVendor(
        ZIconMaterialElement.Vendor,
        createTestTarget,
      );
    });

    it("should raise the onClick event when clicked.", async () => {
      await shouldRaiseTheOnClickEventWhenClicked(createTestTarget);
    });
  });

  describe("Font Awesome", () => {
    async function createTestTarget(name: string) {
      const element = <ZIconFontAwesome name={name} onClick={onClick} />;
      _renderer = new ZCircusSetupRenderer(element);
      _driver = await _renderer.setup();
      return ZCircusBy.first(_driver, ZIconComponentModel, name);
    }

    it("should register the provider.", async () => {
      await shouldRegisterTheProvider(
        ZIconFontAwesomeElement.Provider,
        createTestTarget,
      );
    });

    it("should render the icon by name.", async () => {
      await shouldRenderTheIconByName("save", createTestTarget);
    });

    it("should provide the correct vendor.", async () => {
      await shouldProvideTheCorrectVendor(
        ZIconFontAwesomeElement.Vendor,
        createTestTarget,
      );
    });

    it("should raise the onClick event when clicked.", async () => {
      await shouldRaiseTheOnClickEventWhenClicked(createTestTarget);
    });
  });
});
