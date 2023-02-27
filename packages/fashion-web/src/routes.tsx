import { ZRouteBuilder } from '@zthun/fashion-designer';

export const ZFashionRouteHome = new ZRouteBuilder()
  .name('Fashion')
  .path('')
  .description('Make it look good')
  .avatar('/images/svg/fashion.svg')
  .build();

export const ZFashionRouteVenue = new ZRouteBuilder()
  .name('Venue')
  .path('venue')
  .description('What are the building blocks?')
  .avatar('/images/svg/venue.svg')
  .build();

export const ZFashionRouteVenueBoolean = new ZRouteBuilder()
  .name('Boolean')
  .path('boolean')
  .description('Basic Togglers')
  .build();

export const ZFashionRouteVenueButton = new ZRouteBuilder()
  .name('Button')
  .path('button')
  .description('Click To Activate')
  .build();

export const ZFashionRouteVenueTypography = new ZRouteBuilder()
  .name('Typography')
  .path('typography')
  .description('Standard Page Structures')
  .build();

export const ZFashionRouteVenueAllComponents = [
  ZFashionRouteVenueBoolean,
  ZFashionRouteVenueButton,
  ZFashionRouteVenueTypography
];
