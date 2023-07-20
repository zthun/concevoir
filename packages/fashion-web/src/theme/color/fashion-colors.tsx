import {
  IZComponentFashion,
  ZBox,
  ZCaption,
  ZGrid,
  ZH4,
  ZStack,
  ZTextColor,
  createStyleHook
} from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZFashionBuilder } from '@zthun/fashion-theme';
import { ZOrientation, cssJoinDefined, firstDefined } from '@zthun/helpful-fn';
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
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '5rem',
      borderStyle: 'solid',
      borderWidth: tailor.thickness()
    },

    light: {
      color: contrast,
      backgroundColor: light,
      borderColor: light
    },

    main: {
      color: contrast,
      backgroundColor: main,
      borderColor: main
    },

    dark: {
      color: contrast,
      backgroundColor: dark,
      borderColor: dark
    }
  };
});

export function ZFashionColors(props: IZFashionColors) {
  const { fashion } = props;
  const { classes } = useFashionColorsStyles(props);
  const boxFashion = useMemo(() => new ZFashionBuilder().copy(fashion).swap().build(), [fashion]);

  const renderColor = (name: string, c: string) => (
    <div className={cssJoinDefined('ZFashionColors-block', classes.block, c)}>
      <ZCaption compact>{name}</ZCaption>
    </div>
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
      <ZStack orientation={ZOrientation.Vertical} gap={ZSizeFixed.Small}>
        <ZTextColor fashion={fashion}>
          <ZH4 compact>{fashion.name}</ZH4>
        </ZTextColor>
        <ZGrid columns='1fr 1fr 1fr'>
          {renderColor('Light', classes.light)}
          {renderColor('Main', classes.main)}
          {renderColor('Dark', classes.dark)}
        </ZGrid>
      </ZStack>
    </ZBox>
  );
}
