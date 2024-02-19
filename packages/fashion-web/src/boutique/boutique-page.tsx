import {
  useFashionTheme,
  useNavigate,
  ZBox,
  ZCaption,
  ZCard,
  ZGrid,
  ZH3,
  ZIconFontAwesome,
  ZLineItem
} from '@zthun/fashion-react';
import { ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { cssJoinDefined, square } from '@zthun/helpful-fn';
import React from 'react';
import { IZRoute } from '../route/route.mjs';
import { ZFashionRouteAllComponents, ZFashionRouteBoutique } from '../routes.mjs';

export function ZBoutiquePage() {
  const { body } = useFashionTheme();
  const navigate = useNavigate();

  const renderComponent = (route: IZRoute) => (
    <ZBox
      className={cssJoinDefined('ZBoutiquePage-component')}
      key={route.path}
      padding={square(ZSizeFixed.Medium)}
      fashion={body}
      border={square(ZSizeFixed.ExtraSmall)}
      trim={square('solid')}
      width={ZSizeVaried.Full}
      onClick={() => navigate(route.path)}
    >
      <ZLineItem
        prefix={<ZIconFontAwesome name={route.avatar} family={route.family} width={ZSizeFixed.Small} />}
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
      avatar={<ZIconFontAwesome name={ZFashionRouteBoutique.avatar} width={ZSizeFixed.Medium} />}
    >
      <ZGrid
        columns='1fr 1fr 1fr 1fr'
        columnsLg='1fr 1fr 1fr'
        columnsMd='1fr 1fr'
        columnsSm='1fr'
        gap={ZSizeFixed.Medium}
      >
        {ZFashionRouteAllComponents.map(renderComponent)}
      </ZGrid>
    </ZCard>
  );
}
