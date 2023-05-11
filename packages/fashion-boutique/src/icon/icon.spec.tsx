import { IZCircusDriver, ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import React from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ZIconFontAwesome, ZIconFontAwesomeProvider, ZIconFontAwesomeVendor } from './icon-font-awesome';
import { ZIconMaterial, ZIconMaterialProvider, ZIconMaterialVendor } from './icon-material';
import { ZIconComponentModel } from './icon.cm';

describe('ZIcon', () => {
  let _drivers: IZCircusDriver[];

  beforeEach(() => {
    _drivers = [];
  });

  afterEach(async () => {
    await Promise.all(_drivers.map((d) => d.destroy()));
  });

  async function shouldRegisterTheProvider(
    expected: string,
    createTestTarget: (name: string) => Promise<ZIconComponentModel>
  ) {
    // Arrange.
    await createTestTarget('save');
    await createTestTarget('home');
    // Act.
    const actual = document.head.querySelectorAll(`link[href="${expected}"]`).length;
    // Assert.
    expect(actual).toEqual(1);
  }

  async function shouldRenderTheIconByName(
    expected: string,
    createTestTarget: (name: string) => Promise<ZIconComponentModel>
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
    createTestTarget: (name: string) => Promise<ZIconComponentModel>
  ) {
    // Arrange.
    const target = await createTestTarget(expected);
    // Act.
    const actual = await target.vendor();
    // Assert.
    expect(actual).toEqual(expected);
  }

  describe('Material', () => {
    async function createTestTarget(name: string) {
      const element = <ZIconMaterial name={name} />;
      const driver = await new ZCircusSetupRenderer(element).setup();
      _drivers.push(driver);
      return ZCircusBy.first(driver, ZIconComponentModel, name);
    }

    it('should register the provider.', async () => {
      await shouldRegisterTheProvider(ZIconMaterialProvider, createTestTarget);
    });

    it('should render the icon by name.', async () => {
      await shouldRenderTheIconByName('save', createTestTarget);
    });

    it('should provide the correct vendor.', async () => {
      await shouldProvideTheCorrectVendor(ZIconMaterialVendor, createTestTarget);
    });
  });

  describe('Font Awesome', () => {
    async function createTestTarget(name: string) {
      const element = <ZIconFontAwesome name={name} />;
      const driver = await new ZCircusSetupRenderer(element).setup();
      _drivers.push(driver);
      return ZCircusBy.first(driver, ZIconComponentModel, name);
    }

    it('should register the provider.', async () => {
      await shouldRegisterTheProvider(ZIconFontAwesomeProvider, createTestTarget);
    });

    it('should render the icon by name.', async () => {
      await shouldRenderTheIconByName('save', createTestTarget);
    });

    it('should provide the correct vendor.', async () => {
      await shouldProvideTheCorrectVendor(ZIconFontAwesomeVendor, createTestTarget);
    });
  });
});
