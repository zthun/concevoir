import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZOrientation, cssJoinDefined } from '@zthun/helpful-fn';
import { useAmbassadorState } from '@zthun/helpful-react';
import React, { ReactNode } from 'react';
import { createStyleHook } from 'src/theme/styled';
import { IZButton, ZButton } from '../button/button';
import { IZComponentName } from '../component/component-name';
import { IZComponentOrientation } from '../component/component-orientation';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentValue } from '../component/component-value';
import { ZIconFontAwesome } from '../icon/icon-font-awesome';
import { ZStack } from '../stack/stack';
import { useFashionTheme } from '../theme/fashion';

export interface IZCarousel
  extends IZComponentStyle,
    IZComponentName,
    IZComponentValue<number>,
    IZComponentOrientation {
  count: number;

  renderAtIndex: (index: number) => ReactNode;

  ForwardProps?: Omit<IZButton, 'name' | 'onClick'>;
  ReverseProps?: Omit<IZButton, 'name' | 'onClick'>;
}

const useCarouselStyles = createStyleHook(() => ({
  content: {
    flexGrow: 1,
    justifySelf: 'center',
    alignSelf: 'center',
    textAlign: 'center'
  }
}));

export function ZCarousel(props: IZCarousel) {
  const {
    className,
    count,
    name,
    orientation = ZOrientation.Horizontal,
    value,
    ForwardProps,
    ReverseProps,
    onValueChange,
    renderAtIndex
  } = props;
  const [index, setIndex] = useAmbassadorState(value, onValueChange, 0);
  const { opposite } = useFashionTheme();
  const { classes } = useCarouselStyles();
  const forward = orientation === ZOrientation.Horizontal ? 'chevron-right' : 'chevron-down';
  const reverse = orientation === ZOrientation.Horizontal ? 'chevron-left' : 'chevron-up';

  const handleReverse = () => {
    setIndex((i) => {
      const next = i - 1;
      return next < 0 ? count - 1 : next;
    });
  };

  const handleForward = () => {
    setIndex((i) => {
      const next = i + 1;
      return next >= count ? 0 : next;
    });
  };

  return (
    <div className={cssJoinDefined('ZCarousel-root', className)} data-name={name} data-index={index} data-count={count}>
      <ZStack orientation={orientation} gap={ZSizeFixed.Small} justifyContent='center' alignItems='center'>
        <ZButton
          borderless
          outline
          compact
          fashion={opposite}
          label={<ZIconFontAwesome name={reverse} width={ZSizeFixed.Small} />}
          {...ReverseProps}
          className={cssJoinDefined('ZCarousel-reverse', ReverseProps?.className)}
          name='carousel-reverse'
          onClick={handleReverse}
        />
        <div className={cssJoinDefined('ZCarousel-content', classes.content)}>{renderAtIndex(index)}</div>
        <ZButton
          borderless
          outline
          compact
          fashion={opposite}
          label={<ZIconFontAwesome name={forward} width={ZSizeFixed.Small} />}
          {...ForwardProps}
          className={cssJoinDefined('ZCarousel-forward', ForwardProps?.className)}
          name='carousel-forward'
          onClick={handleForward}
        />
      </ZStack>
    </div>
  );
}
