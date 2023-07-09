import { ZSizeFixed, createSizeChartFixedCss, createSizeChartFixedGeometric } from '@zthun/fashion-tailor';
import { firstDefined } from '@zthun/helpful-fn';
import { KeyboardEvent, MouseEvent, ReactNode, useEffect } from 'react';
import { IZComponentFashion } from '../component/component-fashion';
import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentWidth } from '../component/component-width';
import { createStyleHook } from '../theme/styled';

export interface IZIcon extends IZComponentName, IZComponentStyle, IZComponentWidth<ZSizeFixed>, IZComponentFashion {
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
  tooltip?: ReactNode;
}

const IconSizeChart = createSizeChartFixedCss(createSizeChartFixedGeometric(2, 1), 'rem');

export const useIconStyles = createStyleHook(({ theme, device }, props: IZIcon) => {
  const { primary } = theme;
  const {
    width = ZSizeFixed.Small,
    widthLg = width,
    widthMd = widthLg,
    widthSm = widthMd,
    widthXs = widthSm,
    fashion,
    onClick
  } = props;

  const fontSize = {
    fontSize: `${IconSizeChart[width]} !important`,

    [device.break(ZSizeFixed.Large)]: {
      fontSize: `${IconSizeChart[widthLg]} !important`
    },

    [device.break(ZSizeFixed.Medium)]: {
      fontSize: `${IconSizeChart[widthMd]} !important`
    },

    [device.break(ZSizeFixed.Small)]: {
      fontSize: `${IconSizeChart[widthSm]} !important`
    },

    [device.break(ZSizeFixed.ExtraSmall)]: {
      fontSize: `${IconSizeChart[widthXs]} !important`
    }
  };

  return {
    root: {
      ...fontSize,
      'color': fashion?.main,
      'cursor': onClick ? 'pointer' : 'inherit',

      '&:hover': {
        color: onClick ? firstDefined(primary.main, fashion?.dark) : undefined
      }
    }
  };
});

export function useIconProvider(provider: string) {
  const dom = document;

  useEffect(() => {
    const exists = dom.querySelector(`link[href="${provider}"]`);

    if (!exists) {
      const link = dom.createElement('link');
      link.rel = 'stylesheet';
      link.href = provider;
      dom.head.appendChild(link);
    }
  }, []);
}
