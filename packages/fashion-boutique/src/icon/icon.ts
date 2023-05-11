import { ZSizeFixed, createSizeChartFixedCss, createSizeChartFixedGeometric } from '@zthun/fashion-tailor';
import { useEffect } from 'react';
import { IZComponentFashion } from 'src/component/component-fashion';
import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentWidth } from '../component/component-width';
import { createStyleHook } from '../theme/styled';

export interface IZIcon extends IZComponentName, IZComponentStyle, IZComponentWidth<ZSizeFixed>, IZComponentFashion {}

const IconSizeChart = createSizeChartFixedCss(createSizeChartFixedGeometric(2, 1), 'rem');

export const useIconStyles = createStyleHook((_, props: IZIcon) => {
  const { width = ZSizeFixed.Small } = props;

  const fontSize = IconSizeChart[width];
  return {
    root: {
      fontSize
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
