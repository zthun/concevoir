import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZOrientation, cssJoinDefined } from '@zthun/helpful-fn';
import { useAmbassadorState } from '@zthun/helpful-react';
import React, { ReactNode } from 'react';
import { IZButton, ZButton } from '../button/button';
import { IZComponentName } from '../component/component-name';
import { IZComponentOrientation } from '../component/component-orientation';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentValue } from '../component/component-value';
import { ZGrid } from '../grid/grid';
import { ZIconFontAwesome } from '../icon/icon-font-awesome';
import { useFashionTheme } from '../theme/fashion';
import { createStyleHook } from '../theme/styled';

export interface IZCarousel
  extends IZComponentStyle,
    IZComponentName,
    IZComponentValue<number>,
    IZComponentOrientation {
  count: number;

  renderAtIndex: (index: number) => ReactNode;
  renderEmpty?: () => ReactNode;

  ForwardProps?: Omit<IZButton, 'name' | 'disabled' | 'onClick'>;
  ReverseProps?: Omit<IZButton, 'name' | 'disabled' | 'onClick'>;
}

const useCarouselStyles = createStyleHook((_, props: IZCarousel) => {
  const { count } = props;
  return {
    root: {
      '.ZCarousel-navigation-forward,.ZCarousel-navigation-reverse': {
        opacity: 0,
        transition: 'opacity .5s'
      },

      '&:hover': {
        '.ZCarousel-navigation-forward,.ZCarousel-navigation-reverse': {
          opacity: count <= 1 ? 0 : 1
        }
      }
    },
    content: {
      flexGrow: 1,
      justifySelf: 'center',
      alignSelf: 'center',
      textAlign: 'center'
    }
  };
});

export function ZCarousel(props: IZCarousel) {
  const _renderEmpty = () => null;

  const {
    className,
    count,
    name,
    orientation = ZOrientation.Horizontal,
    value,
    ForwardProps,
    ReverseProps,
    onValueChange,
    renderAtIndex,
    renderEmpty = _renderEmpty
  } = props;
  const [index, setIndex] = useAmbassadorState(value, onValueChange, 0);
  const { opposite } = useFashionTheme();
  const { classes } = useCarouselStyles(props);
  const forward = orientation === ZOrientation.Horizontal ? 'chevron-right' : 'chevron-down';
  const reverse = orientation === ZOrientation.Horizontal ? 'chevron-left' : 'chevron-up';
  const columns = orientation === ZOrientation.Horizontal ? 'auto auto auto 1fr' : 'auto';

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
    <div
      className={cssJoinDefined('ZCarousel-root', className, classes.root)}
      data-name={name}
      data-index={index}
      data-count={count}
      data-orientation={orientation}
    >
      <ZGrid columns={columns} gap={ZSizeFixed.ExtraSmall} alignItems='center'>
        <ZButton
          borderless
          outline
          compact
          fashion={opposite}
          label={<ZIconFontAwesome name={reverse} width={ZSizeFixed.Small} />}
          {...ReverseProps}
          className={cssJoinDefined('ZCarousel-navigation ZCarousel-navigation-reverse', ReverseProps?.className)}
          name='carousel-reverse'
          disabled={count <= 1}
          onClick={handleReverse}
        />
        <div className={cssJoinDefined('ZCarousel-content', classes.content)}>
          {count <= 0 ? renderEmpty() : renderAtIndex(index)}
        </div>
        <ZButton
          borderless
          outline
          compact
          fashion={opposite}
          label={<ZIconFontAwesome name={forward} width={ZSizeFixed.Small} />}
          {...ForwardProps}
          className={cssJoinDefined('ZCarousel-navigation ZCarousel-navigation-forward', ForwardProps?.className)}
          name='carousel-forward'
          disabled={count <= 1}
          onClick={handleForward}
        />
      </ZGrid>
    </div>
  );
}
