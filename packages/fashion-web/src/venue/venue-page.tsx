import { ZSizeFixed } from '@zthun/fashion-tailor';
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
} from '@zthun/fashion-venue';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React from 'react';
import { IZRoute } from '../route/route';
import { ZFashionRouteVenue, ZFashionRouteVenueAllComponents } from '../routes';

/**
 * Represents the venue page.
 *
 * @returns
 *        The JSX to render the page.
 */
export function ZVenuePage() {
  const theme = useFashionTheme();
  const { light, primary } = theme.design();
  const navigate = useNavigate();

  const renderComponent = (route: IZRoute) => (
    <ZBox
      className={cssJoinDefined('ZVenuePage-component')}
      key={route.path}
      padding={ZSizeFixed.Large}
      border={{ fashion: light.dark, hover: primary.dark, width: ZSizeFixed.ExtraSmall }}
      background={{ fashion: light, hover: primary }}
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
      className='ZVenuePage-root'
      heading={ZFashionRouteVenue.name}
      subHeading={ZFashionRouteVenue.description}
      avatar={<ZImageSource src={ZFashionRouteVenue.avatar} height={ZSizeFixed.Medium} />}
    >
      <ZGrid
        columns='auto auto auto auto'
        columnsLg='auto auto auto'
        columnsMd='auto auto'
        columnsSm='auto'
        gap={ZSizeFixed.Medium}
      >
        {ZFashionRouteVenueAllComponents.map(renderComponent)}
      </ZGrid>
    </ZCard>
  );
}
