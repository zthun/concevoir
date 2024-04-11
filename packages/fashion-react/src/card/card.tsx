import {
  IZComponentFashion,
  IZComponentHeight,
  IZComponentLoading,
  IZComponentName,
  IZComponentWidth,
  ZCardElement,
  ZDeviceElement
} from '@zthun/fashion-boutique';
import { ZDeviceBounds, ZSizeVaried } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { pickBy, startsWith } from 'lodash-es';
import React, { ReactNode } from 'react';
import { IZComponentAvatar } from '../component/component-avatar.mjs';
import { IZComponentHeading } from '../component/component-heading.mjs';
import { IZComponentHierarchy } from '../component/component-hierarchy.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';
import { useWebComponent } from '../component/use-web-component.mjs';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-card']: ZCardElement & any;
    }
  }
}

export interface IZCard
  extends IZComponentHeading,
    IZComponentAvatar,
    IZComponentHierarchy,
    IZComponentLoading,
    IZComponentFashion,
    IZComponentStyle,
    IZComponentName,
    IZComponentWidth,
    IZComponentHeight {
  footer?: ReactNode;
}

/*
const useCardStyles = createStyleHook(({ theme, device }, props: IZCard) => {
  const { surface } = theme;
  const { width = ZSizeVaried.Fit, height = ZSizeVaried.Fit, fashion = surface } = props;

  const $width = castDeviceMap(width, ZSizeVaried.Fit);
  const $height = castDeviceMap(height, ZSizeVaried.Fit);

  const maxWidth = {
    maxWidth: CardWidthChart[$width.xl],
    minHeight: CardHeightChart[$height.xl],

    [device.break(ZSizeFixed.Large)]: {
      maxWidth: CardWidthChart[$width.lg],
      minHeight: CardHeightChart[$height.lg]
    },

    [device.break(ZSizeFixed.Medium)]: {
      maxWidth: CardWidthChart[$width.md],
      minHeight: CardHeightChart[$height.md]
    },

    [device.break(ZSizeFixed.Small)]: {
      maxWidth: CardWidthChart[$width.sm],
      minHeight: CardHeightChart[$height.sm]
    },

    [device.break(ZSizeFixed.ExtraSmall)]: {
      maxWidth: CardWidthChart[$width.xs],
      minHeight: CardHeightChart[$height.xs]
    }
  };

  return {
    root: {
      ...maxWidth,
      'position': 'relative',
      'backgroundColor': fashion.main,
      'color': fashion.contrast,
      'display': 'flex',
      'flexDirection': 'column',

      '.MuiCardHeader-content': {
        flex: '1 1 0px',
        overflow: 'hidden'
      },

      '.MuiCardHeader-subheader': {
        color: fashion.contrast,
        opacity: 0.9
      }
    },

    content: {
      flexGrow: 1
    },

    title: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    }
  };
});
*/

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
  const { avatar, className, children, footer, heading, subHeading, loading, fashion, name, width, height } = props;
  useWebComponent(ZCardElement);
  useWebComponent(ZDeviceElement);
  const $width = new ZDeviceBounds(width, ZSizeVaried.Fit);
  const $height = new ZDeviceBounds(height, ZSizeVaried.Fit);

  /*
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

    return (
      <CardContent className={cssJoinDefined('ZCard-content', classes.content)}>
        {loading ? renderLoading() : children}
      </CardContent>
    );
  };

  const renderFooter = () => (footer ? <CardActions className='ZCard-footer'>{footer}</CardActions> : null);
  */

  return (
    <z-card
      class={cssJoinDefined(className)}
      fashion={fashion}
      loading={loading}
      name={name}
      {...pickBy(props, (_, k) => startsWith(k, 'data-'))}
    >
      <z-device name='width' xl={$width.xl()} lg={$width.lg()} md={$width.md} sm={$width.sm()} xs={$width.xs()} />
      <z-device name='height' xl={$height.xl()} lg={$height.lg()} md={$height.md} sm={$height.sm()} xs={$height.xs()} />
      <div slot='avatar'>{avatar}</div>
      <div slot='heading'>{heading}</div>
      <div slot='subheading'>{subHeading}</div>
      <div slot='body'>{children}</div>
      {footer && <div slot='footer'>{footer}</div>}
    </z-card>
  );
  /*
  return (
    <Card
      className={cssJoinDefined('ZCard-root', className, classes.root)}
      elevation={5}
      {...pickBy(props, (_, k) => startsWith(k, 'data-'))}
      data-name={name}
      data-fashion={fashion.name}
    >
      {renderHeader()}
      {renderContent()}
      {renderFooter()}
    </Card>
  );
  */
}
