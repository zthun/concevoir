import { IZCircusDriver, IZCircusSetup, ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { ZYouTubeVideo } from './you-tube-video';
import { ZYouTubeVideoComponentModel } from './you-tube-video.cm';

describe('YouTubeVideo', () => {
  const Video = 'Vr2OkMB2Wr0';
  let _renderer: IZCircusSetup<IZCircusDriver>;
  let _driver: IZCircusDriver;

  const createTestTarget = async () => {
    const element = <ZYouTubeVideo videoId={Video} />;
    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return ZCircusBy.first(_driver, ZYouTubeVideoComponentModel);
  };

  afterEach(async () => {
    await _driver?.destroy?.call(_driver);
    await _renderer?.destroy?.call(_renderer);
  });

  it('should render the video with the correct id', async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const actual = await target.videoId();
    // Assert.
    expect(actual).toEqual(Video);
  });
});
