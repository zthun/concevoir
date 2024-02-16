import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZBannerMainComponentModel } from '@zthun/fashion-circus';
import React, { ReactNode } from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { ZBannerMain } from './banner-main';

describe('ZBannerMain', () => {
  let avatar: ReactNode | undefined;
  let prefix: ReactNode | undefined;
  let suffix: ReactNode | undefined;
  let body: ReactNode;

  async function createTestTarget() {
    const element = (
      <ZBannerMain prefix={prefix} suffix={suffix} avatar={avatar}>
        {body}
      </ZBannerMain>
    );

    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZBannerMainComponentModel);
  }

  beforeEach(() => {
    avatar = undefined;
    prefix = undefined;
    suffix = undefined;
    body = 'Content';
  });

  it('should render the prefix', async () => {
    // Arrange.
    prefix = 'Prefix';
    const target = await createTestTarget();
    // Act.
    const section = await target.prefix();
    const actual = await section.text();
    // Assert.
    expect(actual).toEqual(prefix);
  });

  it('should render the suffix', async () => {
    // Arrange.
    suffix = 'Suffix';
    const target = await createTestTarget();
    // Act.
    const section = await target.suffix();
    const actual = await section.text();
    // Assert.
    expect(actual).toEqual(suffix);
  });

  it('should render the avatar', async () => {
    // Arrange.
    avatar = '<(^^)>';
    const target = await createTestTarget();
    // Act.
    const section = await target.avatar();
    const actual = await section.text();
    // Assert.
    expect(actual).toEqual(avatar);
  });

  it('should render the content', async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const section = await target.main();
    const actual = await section.text();
    // Assert.
    expect(actual).toEqual(body);
  });
});
