import { ZSizeFixed, createSizeChartFixedCss, createSizeChartFixedGeometric } from '@zthun/fashion-tailor';
import { firstDefined } from '@zthun/helpful-fn';
import { KeyboardEvent, MouseEvent, useEffect } from 'react';
import { IZComponentFashion } from '../component/component-fashion';
import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentWidth } from '../component/component-width';
import { createStyleHook } from '../theme/styled';

export interface IZIcon extends IZComponentName, IZComponentStyle, IZComponentWidth<ZSizeFixed>, IZComponentFashion {
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
}

const IconSizeChart = createSizeChartFixedCss(createSizeChartFixedGeometric(2, 1), 'rem');

export const useIconStyles = createStyleHook(({ theme }, props: IZIcon) => {
  const { primary } = theme;
  const { width = ZSizeFixed.Small, fashion, onClick } = props;
  const fontSize = IconSizeChart[width];

  return {
    root: {
      'fontSize': `${fontSize} !important`,
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
