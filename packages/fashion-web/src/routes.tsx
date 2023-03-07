import { ZRouteBuilder } from './route/route';

export const ZFashionRouteHome = new ZRouteBuilder()
  .name('Fashion')
  .path('')
  .description('Make it look good')
  .avatar('/images/svg/fashion-alt.svg')
  .build();

export const ZFashionRouteVenue = new ZRouteBuilder()
  .name('Venue')
  .path('venue')
  .description('Components for React')
  .avatar('/images/svg/venue.svg')
  .build();

export const ZFashionRouteVenueBoolean = new ZRouteBuilder()
  .name('Boolean')
  .path('boolean')
  .description('Basic Togglers')
  .avatar('/images/svg/boolean.svg')
  .build();

export const ZFashionRouteVenueButton = new ZRouteBuilder()
  .name('Button')
  .path('button')
  .description('Click To Activate')
  .avatar('/images/svg/button.svg')
  .build();

export const ZFashionRouteVenueChoice = new ZRouteBuilder()
  .name('Choice')
  .path('choice')
  .description('Choose From an Option List')
  .avatar('/images/svg/choice.svg')
  .build();

export const ZFashionRouteVenueDrawer = new ZRouteBuilder()
  .name('Drawer')
  .path('drawer')
  .description('Pop Out Navigation')
  .avatar('/images/svg/drawer.svg')
  .build();

export const ZFashionRouteVenueList = new ZRouteBuilder()
  .name('List')
  .path('list')
  .description('Line Items')
  .avatar('/images/svg/list.svg')
  .build();

export const ZFashionRouteVenueNumber = new ZRouteBuilder()
  .name('Number')
  .path('number')
  .description('Numeric Spinners')
  .avatar('/images/svg/number.svg')
  .build();

export const ZFashionRouteVenueSuspense = new ZRouteBuilder()
  .name('Suspense')
  .path('suspense')
  .description('Loading and Waiting')
  .avatar('/images/svg/suspense.svg')
  .build();

export const ZFashionRouteVenueText = new ZRouteBuilder()
  .name('Text')
  .path('text')
  .description('Characters, Sentences, and Paragraphs')
  .avatar('/images/svg/text.svg')
  .build();

export const ZFashionRouteVenueTypography = new ZRouteBuilder()
  .name('Typography')
  .path('typography')
  .description('Standard Page Structures')
  .avatar('/images/svg/typography.svg')
  .build();

export const ZFashionRouteVenueAllComponents = [
  ZFashionRouteVenueBoolean,
  ZFashionRouteVenueButton,
  ZFashionRouteVenueChoice,
  ZFashionRouteVenueDrawer,
  ZFashionRouteVenueList,
  ZFashionRouteVenueNumber,
  ZFashionRouteVenueSuspense,
  ZFashionRouteVenueText,
  ZFashionRouteVenueTypography
];
