import {
  useFashionTheme,
  useNavigate,
  ZBox,
  ZCaption,
  ZCard,
  ZGrid,
  ZH3,
  ZImageSource,
  ZLineItem
} from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React from 'react';
import { IZRoute } from '../route/route';
import { ZFashionRouteAllComponents, ZFashionRouteBoutique } from '../routes';

/**
 * Represents the components page.
 *
 * @returns
 *        The JSX to render the page.
 */
export function ZBoutiquePage() {
  const { secondary, primary, transparent } = useFashionTheme();
  const navigate = useNavigate();

  const renderComponent = (route: IZRoute) => (
    <ZBox
      className={cssJoinDefined('ZBoutiquePage-component')}
      key={route.path}
      padding={ZSizeFixed.Medium}
      border={{ fashion: primary.dark, hover: secondary.dark, width: ZSizeFixed.ExtraSmall }}
      background={{ fashion: transparent, hover: secondary }}
      onClick={() => navigate(route.path)}
    >
      <ZLineItem
        prefix={<ZImageSource src={route.avatar} width={ZSizeFixed.Small} height={ZSizeFixed.Small} />}
        body={
          <>
            <ZH3 compact>{route.name}</ZH3>
            <ZCaption compact>{route.description}</ZCaption>
          </>
        }
      />
    </ZBox>
  );

  return (
    <ZCard
      className='ZBoutiquePage-root'
      heading={ZFashionRouteBoutique.name}
      subHeading={ZFashionRouteBoutique.description}
      avatar={<ZImageSource src={ZFashionRouteBoutique.avatar} height={ZSizeFixed.Medium} />}
    >
      <ZGrid
        columns='auto auto auto auto'
        columnsLg='auto auto auto'
        columnsMd='auto auto'
        columnsSm='auto'
        gap={ZSizeFixed.Medium}
      >
        {ZFashionRouteAllComponents.map(renderComponent)}
      </ZGrid>
    </ZCard>
  );
}
