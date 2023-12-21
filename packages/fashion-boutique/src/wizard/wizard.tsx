import { ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { ZOrientation, cssJoinDefined, firstDefined } from '@zthun/helpful-fn';
import { useAmbassadorState } from '@zthun/helpful-react';
import { castArray } from 'lodash-es';
import React, { ReactNode } from 'react';
import { IZButton, ZButton } from '../button/button';
import { IZCard, ZCard } from '../card/card';
import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentValue } from '../component/component-value';
import { ZGrid } from '../grid/grid';
import { ZIconFontAwesome } from '../icon/icon-font-awesome';
import { ZStack } from '../stack/stack';
import { useFashionTheme } from '../theme/fashion';
import { ZH4 } from '../typography/typography';

export interface IZWizard extends IZComponentStyle, IZComponentName, IZComponentValue<number> {
  children: JSX.Element | JSX.Element[];

  CardProps?: Omit<IZCard, 'name' | 'children' | 'footer'>;
  NextButtonProps?: Omit<IZButton, 'name'>;
  PrevButtonProps?: Omit<IZButton, 'name'>;
  FinishButtonProps?: Omit<IZButton, 'name'>;
}

export function ZWizard(props: IZWizard) {
  const {
    className,
    name,
    children,
    value,
    onValueChange,
    CardProps,
    NextButtonProps,
    PrevButtonProps,
    FinishButtonProps
  } = props;

  const _children = castArray(children);
  const [page, setPage] = useAmbassadorState(value, onValueChange, 0);
  const _page = Math.min(_children.length - 1, Math.max(0, page));
  const _current = _children[_page];
  const { primary, secondary, success } = useFashionTheme();

  const renderFooter = () => {
    const renderPrevious = () => {
      const _previous = _children[_page - 1];
      const defaultName = _previous ? `Page ${_page}` : <span>&nbsp;</span>;
      const name = firstDefined(defaultName, _previous?.props['name'], _previous?.props['data-name']);
      const caption = <ZH4>{name}</ZH4>;
      const disabledPrevious = _page === 0 || PrevButtonProps?.disabled;

      const defaultPreviousLabel = (
        <ZStack gap={ZSizeFixed.ExtraSmall}>
          <ZStack orientation={ZOrientation.Horizontal} gap={ZSizeFixed.Small} alignItems='center'>
            <ZIconFontAwesome name='left-long' />
            {caption}
          </ZStack>
        </ZStack>
      );

      const handlePrevious = () => {
        setPage(() => _page - 1);
      };

      return (
        <ZButton
          {...PrevButtonProps}
          label={firstDefined<ReactNode>(defaultPreviousLabel, PrevButtonProps?.label)}
          disabled={disabledPrevious}
          onClick={PrevButtonProps?.onClick || handlePrevious}
          name='previous'
          fashion={secondary}
        />
      );
    };

    const renderNext = () => {
      const _next = _current[_page + 1];
      const defaultLabel = (
        <ZStack orientation={ZOrientation.Horizontal} gap={ZSizeFixed.Small} alignItems='center'>
          <ZH4 compact>{firstDefined(`Page ${_page + 2}`, _next?.props['name'], _next?.props['data-name'])}</ZH4>
          <ZIconFontAwesome name='right-long' />
        </ZStack>
      );

      const handleNext = () => {
        setPage(() => _page + 1);
      };

      return (
        <ZButton
          {...NextButtonProps}
          label={firstDefined<ReactNode>(defaultLabel, NextButtonProps?.label)}
          onClick={NextButtonProps?.onClick || handleNext}
          name='next'
          width={ZSizeVaried.Full}
          fashion={primary}
        />
      );
    };

    const renderFinish = () => {
      return (
        <ZButton
          {...FinishButtonProps}
          label={firstDefined<ReactNode>(<ZIconFontAwesome name='circle-check' />, FinishButtonProps?.label)}
          name='finish'
          width={ZSizeVaried.Full}
          fashion={success}
        />
      );
    };

    const renderNextOrFinish = () => {
      const lastPage = _page === _children.length - 1;
      return lastPage ? renderFinish() : renderNext();
    };

    return (
      <ZGrid columns='1fr 1fr' gap={ZSizeFixed.Small} width={ZSizeVaried.Full}>
        {renderPrevious()}
        {renderNextOrFinish()}
      </ZGrid>
    );
  };

  return (
    <ZCard
      {...CardProps}
      className={cssJoinDefined('ZWizard-root', CardProps?.className, className)}
      name={name}
      footer={renderFooter()}
      data-page={_page}
    >
      {_current}
    </ZCard>
  );
}
