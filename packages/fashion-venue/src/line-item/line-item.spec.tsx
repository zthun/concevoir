import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import React, { ReactNode } from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { ZLineItem } from './line-item';
import { ZLineItemLayoutComponentModel } from './line-item.cm';

describe('ZLineItem', () => {
  let prefix: ReactNode | undefined;
  let body: ReactNode | undefined;
  let suffix: ReactNode | undefined;

  beforeEach(() => {
    prefix = undefined;
    body = undefined;
    suffix = undefined;
  });

  async function createTestTarget() {
    const element = <ZLineItem prefix={prefix} body={body} suffix={suffix} />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZLineItemLayoutComponentModel);
  }

  describe('Prefix', () => {
    it('should render as a static node', async () => {
      // Arrange.
      prefix = 'Prefix';
      const target = await createTestTarget();
      // Act.
      const actual = await (await target.prefix()).text();
      // Assert.
      expect(actual).toEqual(prefix);
    });

    it('should render an empty block', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await (await target.prefix()).text();
      // Assert.
      expect(actual).toBeFalsy();
    });
  });

  describe('Body', () => {
    it('should render as a static node', async () => {
      // Arrange.
      body = 'Body';
      const target = await createTestTarget();
      // Act.
      const actual = await (await target.body()).text();
      // Assert.
      expect(actual).toEqual(body);
    });

    it('should render an empty block', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await (await target.body()).text();
      // Assert.
      expect(actual).toBeFalsy();
    });
  });

  describe('Suffix', () => {
    it('should render as a static node', async () => {
      // Arrange.
      suffix = 'Suffix';
      const target = await createTestTarget();
      // Act.
      const actual = await (await target.suffix()).text();
      // Assert.
      expect(actual).toEqual(suffix);
    });

    it('should render an empty block', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await (await target.suffix()).text();
      // Assert.
      expect(actual).toBeFalsy();
    });
  });
});
