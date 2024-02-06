import {
  createSizeChartFixedCss,
  createSizeChartFixedGeometric,
  createSizeChartVariedCss,
  createSizeChartVoidCss,
  ZSizeFixed,
  ZSizeVaried
} from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { ZDataUrlBuilder } from '@zthun/webigail-url';
import React from 'react';
import { IZComponentHeight } from '../component/component-height.mjs';
import { IZComponentName } from '../component/component-name.mjs';
import { IZComponentSource } from '../component/component-source.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';
import { IZComponentWidth } from '../component/component-width.mjs';
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

const useImageSourceStyles = createStyleHook(({ device }, props: IZImageSource) => {
  const {
    height = ZSizeVaried.Fit,
    heightLg = height,
    heightMd = heightLg,
    heightSm = heightMd,
    heightXs = heightSm,
    width = ZSizeVaried.Fit,
    widthLg = width,
    widthMd = widthLg,
    widthSm = widthMd,
    widthXs = widthSm
  } = props;

  const dimensions = {
    width: ImageSizeChart[width],
    height: ImageSizeChart[height],

    [device.break(ZSizeFixed.Large)]: {
      width: ImageSizeChart[widthLg],
      height: ImageSizeChart[heightLg]
    },

    [device.break(ZSizeFixed.Medium)]: {
      width: ImageSizeChart[widthMd],
      height: ImageSizeChart[heightMd]
    },

    [device.break(ZSizeFixed.Small)]: {
      width: ImageSizeChart[widthSm],
      height: ImageSizeChart[heightSm]
    },

    [device.break(ZSizeFixed.ExtraSmall)]: {
      width: ImageSizeChart[widthXs],
      height: ImageSizeChart[heightXs]
    }
  };

  return {
    root: {
      ...dimensions,

      svg: {
        ...dimensions
      },

      img: {
        ...dimensions
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
