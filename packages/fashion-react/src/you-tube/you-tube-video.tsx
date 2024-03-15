import { IZComponentName } from '@zthun/fashion-boutique';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { ZUrlBuilder, ZYouTubeApi } from '@zthun/webigail-url';
import React from 'react';
import { IZComponentStyle } from '../component/component-style.mjs';
import { createStyleHook } from '../theme/styled';

export interface IZYouTubeVideo extends IZComponentName, IZComponentStyle {
  identity: string;
}

const useYouTubeVideoStyles = createStyleHook(() => {
  return {
    root: {
      overflow: 'hidden',
      // This isn't obvious why, but if you're seeing this, it's to force
      // a 16x9 aspect ratio.  See https://css-tricks.com/fluid-width-video/
      // for more information.
      paddingBottom: '56.25%',
      position: 'relative',
      height: 0,

      iframe: {
        left: 0,
        top: 0,
        height: '100%',
        width: '100%',
        position: 'absolute',
        border: 0
      }
    }
  };
});

export function ZYouTubeVideo(props: IZYouTubeVideo) {
  const { identity, className, name } = props;
  const { classes } = useYouTubeVideoStyles();
  const src = new ZUrlBuilder().youTube(ZYouTubeApi.Embed, identity).build();
  const allow = [
    'accelerometer',
    'autoplay',
    'clipboard-write',
    'encrypted-media',
    'gyroscope',
    'picture-in-picture'
  ].join(';');

  return (
    <div
      className={cssJoinDefined('ZYouTubeVideo-root', className, classes.root)}
      data-identity={identity}
      data-name={name}
    >
      <iframe src={src} allow={allow} allowFullScreen title={name} />
    </div>
  );
}
