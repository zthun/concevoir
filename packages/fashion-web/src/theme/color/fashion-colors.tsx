import {
  IZComponentFashion,
  ZBox,
  ZCaption,
  ZH4,
  ZStack,
  createStyleHook,
  useFashionTheme
} from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined, firstDefined } from '@zthun/helpful-fn';
import React from 'react';

export interface IZFashionColors extends Required<IZComponentFashion> {}

const useFashionColorsStyles = createStyleHook(({ theme, tailor }, props: IZFashionColors) => {
  const { fashion } = props;
  return {
    block: {
      height: '4rem',
      width: '4rem',
      border: `${tailor.thickness()} solid ${theme.dark.dark}`
    },

    light: {
      backgroundColor: firstDefined(fashion.main, fashion.light)
    },

    main: {
      backgroundColor: fashion.main
    },

    dark: {
      backgroundColor: firstDefined(fashion.main, fashion.dark)
    },

    contrast: {
      backgroundColor: fashion.contrast
    }
  };
});

export function ZFashionColors(props: IZFashionColors) {
  const { fashion } = props;
  const theme = useFashionTheme();
  const { classes } = useFashionColorsStyles(props);

  const renderColor = (name: string, c: string) => (
    <ZStack orientation='vertical' alignItems='center'>
      <ZCaption compact>{name}</ZCaption>
      <div className={cssJoinDefined('ZFashionColors-block', classes.block, c)} />
    </ZStack>
  );

  return (
    <ZBox
      className={cssJoinDefined('ZFashionColors-root')}
      fashion={theme.body}
      border={{ width: ZSizeFixed.Small }}
      padding={ZSizeFixed.Small}
      data-name={fashion.name}
      data-fashion={fashion.name}
    >
      <ZStack orientation='vertical' gap={ZSizeFixed.Small}>
        <ZH4>{fashion.name}</ZH4>
        <ZStack orientation='horizontal' gap={ZSizeFixed.Medium}>
          {renderColor('Light', classes.light)}
          {renderColor('Main', classes.main)}
          {renderColor('Dark', classes.dark)}
          {renderColor('Contrast', classes.contrast)}
        </ZStack>
      </ZStack>
    </ZBox>
  );
}
