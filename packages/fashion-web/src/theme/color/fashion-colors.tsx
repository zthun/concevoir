import { IZComponentFashion, ZBox, ZCaption, ZH4, ZStack, ZTextColor, createStyleHook } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZFashionBuilder } from '@zthun/fashion-theme';
import { cssJoinDefined, firstDefined } from '@zthun/helpful-fn';
import React, { useMemo } from 'react';

export interface IZFashionColors extends Required<IZComponentFashion> {}

const useFashionColorsStyles = createStyleHook(({ tailor }, props: IZFashionColors) => {
  const { fashion } = props;

  const light = firstDefined(fashion.main, fashion.light);
  const main = fashion.main;
  const dark = firstDefined(fashion.main, fashion.dark);
  const contrast = fashion.contrast;

  return {
    block: {
      height: '4rem',
      width: '4rem',
      borderStyle: 'solid',
      borderWidth: tailor.thickness()
    },

    light: {
      backgroundColor: light,
      borderColor: light
    },

    main: {
      backgroundColor: main,
      borderColor: main
    },

    dark: {
      backgroundColor: dark,
      borderColor: dark
    },

    contrast: {
      backgroundColor: contrast,
      borderColor: main
    }
  };
});

export function ZFashionColors(props: IZFashionColors) {
  const { fashion } = props;
  const { classes } = useFashionColorsStyles(props);
  const boxFashion = useMemo(() => new ZFashionBuilder().copy(fashion).swap().build(), [fashion]);

  const renderColor = (name: string, c: string) => (
    <ZStack orientation='vertical' alignItems='center'>
      <ZCaption compact>{name}</ZCaption>
      <div className={cssJoinDefined('ZFashionColors-block', classes.block, c)} />
    </ZStack>
  );

  return (
    <ZBox
      className={cssJoinDefined('ZFashionColors-root')}
      fashion={boxFashion}
      border={{ width: ZSizeFixed.Small }}
      padding={ZSizeFixed.Small}
      data-name={fashion.name}
      data-fashion={fashion.name}
    >
      <ZStack orientation='vertical' gap={ZSizeFixed.Small}>
        <ZTextColor fashion={fashion}>
          <ZH4>{fashion.name}</ZH4>
        </ZTextColor>
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
