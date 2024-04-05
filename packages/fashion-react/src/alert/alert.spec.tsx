import { IZCircusDriver, IZCircusSetup, ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZAlertComponentModel } from '@zthun/fashion-circus';
import { ZFashionPriority } from '@zthun/fashion-theme';
import React, { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ZAlert } from './alert';

describe('ZAlert', () => {
  let _renderer: IZCircusSetup<IZCircusDriver>;
  let _driver: IZCircusDriver;
  let message: ReactNode;
  let avatar: ReactNode | undefined;
  let heading: ReactNode | undefined;
  let fashion: string | undefined;

  const createTestTarget = async () => {
    const element = <ZAlert message={message} heading={heading} fashion={fashion} avatar={avatar} />;
    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return ZCircusBy.first(_driver, ZAlertComponentModel);
  };

  beforeEach(() => {
    message = 'message';
    avatar = undefined;
    fashion = undefined;
    heading = undefined;
  });

  afterEach(async () => {
    await _renderer?.destroy?.call(_renderer);
    await _driver?.destroy?.call(_driver);
  });

  describe('Message', () => {
    it('should render the message', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await (await target.message()).text();
      // Assert.
      expect(actual).toEqual(message);
    });
  });

  describe('Heading', () => {
    it('should render if set', async () => {
      // Arrange.
      heading = 'Header';
      const target = await createTestTarget();
      // Act.
      const actual = await (await target.heading())!.text();
      // Assert.
      expect(actual).toEqual(heading);
    });

    it('should not render if not set', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.heading();
      // Assert.
      expect(actual).toBeFalsy();
    });
  });

  describe('Avatar', () => {
    it('should render if set', async () => {
      // Arrange.
      avatar = <div>Avatar</div>;
      const target = await createTestTarget();
      // Act.
      const actual = await target.avatar();
      // Assert.
      expect(actual).toBeTruthy();
    });

    it('should not render if not set', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.avatar();
      // Assert.
      expect(actual).toBeFalsy();
    });
  });

  describe('Fashion', () => {
    it('should be primary by default', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.fashion();
      // Assert.
      expect(actual).toEqual(ZFashionPriority.Primary);
    });

    it('should be set', async () => {
      // Arrange.
      fashion = 'my-fashion';
      const target = await createTestTarget();
      // Act.
      const actual = await target.fashion();
      // Assert.
      expect(actual).toEqual('my-fashion');
    });
  });
});
