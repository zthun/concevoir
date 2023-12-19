import { cssJoinDefined } from '@zthun/helpful-fn';
import { ZUrlBuilder, ZYouTubeApi } from '@zthun/webigail-url';
import React from 'react';
import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style';
import { createStyleHook } from '../theme/styled';

export interface IZYouTubeVideo extends IZComponentName, IZComponentStyle {
  videoId: string;
}

const useYouTubeVideoStyles = createStyleHook(() => {
  return {
    root: {
      overflow: 'hidden',
      paddingBottom: '50%',
      position: 'relative',
      height: 0,

      iframe: {
        left: 0,
        top: 0,
        height: '100%',
        width: '100%',
        position: 'absolute'
      }
    }
  };
});

export function ZYouTubeVideo(props: IZYouTubeVideo) {
  const { videoId, className, name } = props;
  const { classes } = useYouTubeVideoStyles();
  const src = new ZUrlBuilder().youTube(ZYouTubeApi.Embed, videoId).build();

  return (
    <div
      className={cssJoinDefined('ZYouTubeVideo-root', className, classes.root)}
      data-video-id={videoId}
      data-name={name}
    >
      <iframe
        width='1280'
        height='720'
        src={src}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title={name}
      />
    </div>
  );
}
