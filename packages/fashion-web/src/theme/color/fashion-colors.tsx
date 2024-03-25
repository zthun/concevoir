import { IZComponentFashion, ZBox, ZCaption, ZGrid, ZH4, ZStack, createStyleHook } from '@zthun/fashion-react';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZOrientation, ZQuadrilateralBuilder, cssJoinDefined, firstDefined } from '@zthun/helpful-fn';
import { startCase } from 'lodash-es';
import React from 'react';

export interface IZFashionColors extends Required<IZComponentFashion> {}

const useFashionColorsStyles = createStyleHook(({ tailor }, props: IZFashionColors) => {
  const { fashion } = props;

  const light = firstDefined(fashion.main, fashion.light);
  const main = fashion.main;
  const dark = firstDefined(fashion.main, fashion.dark);
  const border = firstDefined(fashion.main, fashion.border);
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
      borderColor: border
    },

    main: {
      color: contrast,
      backgroundColor: main,
      borderColor: border
    },

    dark: {
      color: contrast,
      backgroundColor: dark,
      borderColor: border
    }
  };
});

export function ZFashionColors(props: IZFashionColors) {
  const { fashion } = props;
  const { classes } = useFashionColorsStyles(props);

  const renderColor = (name: string, c: string) => (
    <div className={cssJoinDefined('ZFashionColors-block', classes.block, c)}>
      <ZCaption compact>{name}</ZCaption>
    </div>
  );

  return (
    <ZBox
      className={cssJoinDefined('ZFashionColors-root')}
      padding={new ZQuadrilateralBuilder(ZSizeFixed.Small).build()}
    >
      <ZStack orientation={ZOrientation.Vertical} gap={ZSizeFixed.Small}>
        <ZH4 compact>{startCase(fashion.name)}</ZH4>
        <ZGrid columns='1fr 1fr 1fr' gap={ZSizeFixed.Small}>
          {renderColor('Light', classes.light)}
          {renderColor('Main', classes.main)}
          {renderColor('Dark', classes.dark)}
        </ZGrid>
      </ZStack>
    </ZBox>
  );
}
