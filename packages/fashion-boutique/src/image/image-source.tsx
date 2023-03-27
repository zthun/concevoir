import {
  createSizeChartFixedCss,
  createSizeChartFixedGeometric,
  createSizeChartVariedCss,
  createSizeChartVoidCss,
  ZSizeVaried
} from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { ZDataUrlBuilder } from '@zthun/webigail-url';
import React from 'react';
import { IZComponentHeight } from '../component/component-height';
import { IZComponentName } from '../component/component-name';
import { IZComponentSource } from '../component/component-source';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentWidth } from '../component/component-width';
import { createStyleHook } from '../theme/styled';

export interface IZImageSource
  extends IZComponentSource,
    IZComponentStyle,
    IZComponentWidth,
    IZComponentHeight,
    IZComponentName {}

const ImageSizeChart = {
  ...createSizeChartFixedCss(createSizeChartFixedGeometric(2, 1), 'rem'),
  ...createSizeChartVariedCss(),
  ...createSizeChartVoidCss()
};

const useImageSourceStyles = createStyleHook((_, props: IZImageSource) => {
  const { height = ZSizeVaried.Fit, width = ZSizeVaried.Fit } = props;

  const _height = ImageSizeChart[height];
  const _width = ImageSizeChart[width];

  return {
    root: {
      height: _height,
      width: _width,

      svg: {
        height: _height,
        width: _width
      },

      img: {
        height: _height,
        width: _width
      }
    }
  };
});

/**
 * Represents an image.
 *
 * This is a shortcut to placing an image tag, but it also supports svg data urls.
 *
 * @param props -
 *        The properties for this component.
 *
 * @returns The jsx for this component.
 */
export function ZImageSource(props: IZImageSource) {
  const { className, src, name } = props;
  const { classes } = useImageSourceStyles(props);
  const imageClass = cssJoinDefined('ZImageSource-root', className, classes.root);

  if (!src) {
    return <div className={imageClass} data-name={name} />;
  }

  if (src.startsWith('data:image/svg+xml')) {
    // SVG images can go into html directly.
    const info = new ZDataUrlBuilder().parse(src).info();
    const __html = info.buffer.toString();
    return <div className={imageClass} dangerouslySetInnerHTML={{ __html }} data-name={name} />;
  }

  return (
    <div className={imageClass} data-name={name}>
      <img src={src} alt={name} />
    </div>
  );
}
