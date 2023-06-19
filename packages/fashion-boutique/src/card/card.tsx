import { Card, CardActions, CardContent, CardHeader } from '@mui/material';
import {
  ZSizeFixed,
  ZSizeVaried,
  createSizeChartFixedCss,
  createSizeChartFixedGeometric,
  createSizeChartVariedCss,
  createSizeChartVoidCss
} from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React, { ReactNode } from 'react';
import { IZComponentAvatar } from '../component/component-avatar';
import { IZComponentFashion } from '../component/component-fashion';
import { IZComponentHeading } from '../component/component-heading';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentLoading } from '../component/component-loading';
import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentWidth } from '../component/component-width';
import { ZSuspenseProgress } from '../suspense/suspense-progress';
import { useFashionTheme } from '../theme/fashion';
import { createStyleHook } from '../theme/styled';
import { ZCaption, ZH2 } from '../typography/typography';

export interface IZCard
  extends IZComponentHeading,
    IZComponentAvatar,
    IZComponentHierarchy,
    IZComponentLoading,
    IZComponentFashion,
    IZComponentStyle,
    IZComponentName,
    IZComponentWidth {
  footer?: ReactNode;
}

const ChartWidth = createSizeChartFixedGeometric(1.5, 10);
const ChartFixed = createSizeChartFixedCss(ChartWidth, 'rem');
const ChartVaried = createSizeChartVariedCss();
const ChartVoid = createSizeChartVoidCss();
const CardSizeChart = { ...ChartFixed, ...ChartVaried, ...ChartVoid };

const useCardStyles = createStyleHook(({ theme }, props: IZCard) => {
  const { width = ZSizeVaried.Fit, fashion = theme.surface } = props;

  return {
    root: {
      'position': 'relative',
      'maxWidth': CardSizeChart[width],
      'backgroundColor': fashion.main,
      'color': fashion.contrast,

      '.MuiCardHeader-content': {
        flex: '1 1 0px',
        overflow: 'hidden'
      },

      '.MuiCardHeader-subheader': {
        color: fashion.contrast,
        opacity: 0.9
      }
    },

    title: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    }
  };
});

/**
 * Represents a basic card component.
 *
 * @param props -
 *        The properties to the card.
 *
 * @returns
 *        The JSX to render the card.
 */
export function ZCard(props: IZCard) {
  const { surface } = useFashionTheme();
  const { avatar, className, children, footer, heading, subHeading, loading, fashion = surface, name } = props;
  const { classes } = useCardStyles(props);

  const renderHeader = () => (
    <CardHeader
      className='ZCard-header'
      avatar={avatar}
      title={
        <ZH2 className={cssJoinDefined('ZCard-header-heading', classes.title)} compact>
          {heading}
        </ZH2>
      }
      subheader={
        <ZCaption className='ZCard-header-subheading' compact>
          {subHeading}
        </ZCaption>
      }
    />
  );

  const renderContent = () => {
    const renderLoading = () => (
      <ZSuspenseProgress className='ZCard-loading' name='card-loading' height={ZSizeFixed.Medium} />
    );
    return <CardContent className='ZCard-content'>{loading ? renderLoading() : children}</CardContent>;
  };

  const renderFooter = () => (footer ? <CardActions className='ZCard-footer'>{footer}</CardActions> : null);

  return (
    <Card
      className={cssJoinDefined('ZCard-root', className, classes.root)}
      elevation={5}
      data-name={name}
      data-fashion={fashion.name}
    >
      {renderHeader()}
      {renderContent()}
      {renderFooter()}
    </Card>
  );
}
