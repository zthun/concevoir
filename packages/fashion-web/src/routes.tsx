import { ZRouteBuilder } from './route/route';

export const ZFashionRouteHome = new ZRouteBuilder()
  .name('Fashion')
  .path('')
  .description('Make it look good')
  .avatar('/images/svg/fashion-alt.svg')
  .build();

export const ZFashionRouteBoutique = new ZRouteBuilder()
  .name('Boutique')
  .path('boutique')
  .description('Components for React')
  .avatar('/images/svg/boutique.svg')
  .build();

export const ZFashionRouteBoolean = new ZRouteBuilder()
  .name('Boolean')
  .path('boolean')
  .description('Basic Togglers')
  .avatar('/images/svg/boolean.svg')
  .build();

export const ZFashionRouteButton = new ZRouteBuilder()
  .name('Button')
  .path('button')
  .description('Click To Activate')
  .avatar('/images/svg/button.svg')
  .build();

export const ZFashionRouteCard = new ZRouteBuilder()
  .name('Card')
  .path('card')
  .description('Sectioned Content')
  .avatar('/images/svg/card.svg')
  .build();

export const ZFashionRouteChoice = new ZRouteBuilder()
  .name('Choice')
  .path('choice')
  .description('Choose From an Option List')
  .avatar('/images/svg/choice.svg')
  .build();

export const ZFashionRouteDrawer = new ZRouteBuilder()
  .name('Drawer')
  .path('drawer')
  .description('Pop Out Navigation')
  .avatar('/images/svg/drawer.svg')
  .build();

export const ZFashionRouteList = new ZRouteBuilder()
  .name('List')
  .path('list')
  .description('Line Items')
  .avatar('/images/svg/list.svg')
  .build();

export const ZFashionRouteNumber = new ZRouteBuilder()
  .name('Number')
  .path('number')
  .description('Numeric Spinners')
  .avatar('/images/svg/number.svg')
  .build();

export const ZFashionRouteSuspense = new ZRouteBuilder()
  .name('Suspense')
  .path('suspense')
  .description('Loading and Waiting')
  .avatar('/images/svg/suspense.svg')
  .build();

export const ZFashionRouteText = new ZRouteBuilder()
  .name('Text')
  .path('text')
  .description('Characters, Sentences, and Paragraphs')
  .avatar('/images/svg/text.svg')
  .build();

export const ZFashionRouteTypography = new ZRouteBuilder()
  .name('Typography')
  .path('typography')
  .description('Standard Page Structures')
  .avatar('/images/svg/typography.svg')
  .build();

export const ZFashionRouteAllComponents = [
  ZFashionRouteBoolean,
  ZFashionRouteButton,
  ZFashionRouteCard,
  ZFashionRouteChoice,
  ZFashionRouteDrawer,
  ZFashionRouteList,
  ZFashionRouteNumber,
  ZFashionRouteSuspense,
  ZFashionRouteText,
  ZFashionRouteTypography
];
