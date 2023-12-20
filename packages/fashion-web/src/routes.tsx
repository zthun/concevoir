import { ZRouteBuilder } from './route/route';

export const ZFashionRouteHome = new ZRouteBuilder()
  .name('Fashion')
  .path('')
  .description('Build something pretty')
  .avatar('/images/svg/fashion.svg')
  .build();

export const ZFashionRouteTheme = new ZRouteBuilder()
  .name('Theme')
  .path('theme')
  .description('Make it look good')
  .avatar('palette')
  .build();

export const ZFashionRouteBoutique = new ZRouteBuilder()
  .name('Boutique')
  .path('boutique')
  .description('Components for React')
  .avatar('store')
  .build();

export const ZFashionRouteAlert = new ZRouteBuilder()
  .name('Alert')
  .path('alert')
  .description('Colorful User Feedback')
  .avatar('warning')
  .build();

export const ZFashionRouteBoolean = new ZRouteBuilder()
  .name('Boolean')
  .path('boolean')
  .description('Basic Togglers')
  .avatar('toggle-off')
  .build();

export const ZFashionRouteBubble = new ZRouteBuilder()
  .name('Bubble')
  .path('bubble')
  .description('Content in a Circle')
  .avatar('circle')
  .build();

export const ZFashionRouteButton = new ZRouteBuilder()
  .name('Button')
  .path('button')
  .description('Click To Activate')
  .avatar('circle-dot')
  .build();

export const ZFashionRouteCard = new ZRouteBuilder()
  .name('Card')
  .path('card')
  .description('Sectioned Content')
  .avatar('credit-card')
  .build();

export const ZFashionRouteCarousel = new ZRouteBuilder()
  .name('Carousel')
  .path('carousel')
  .description('Merry-Go-Round Content')
  .avatar('horse')
  .build();

export const ZFashionRouteChart = new ZRouteBuilder()
  .name('Chart')
  .path('chart')
  .description('Visualizations')
  .avatar('chart-pie')
  .build();

export const ZFashionRouteChoice = new ZRouteBuilder()
  .name('Choice')
  .path('choice')
  .description('Choose From an Option List')
  .avatar('hand-pointer')
  .build();

export const ZFashionRouteDrawer = new ZRouteBuilder()
  .name('Drawer')
  .path('drawer')
  .description('Pop Out Navigation')
  .avatar('inbox')
  .build();

export const ZFashionRouteGridView = new ZRouteBuilder()
  .name('Grid View')
  .path('grid-view')
  .description('Paginated Grid With Built In Navigation')
  .avatar('grip')
  .build();

export const ZFashionRouteImage = new ZRouteBuilder()
  .name('Image')
  .path('image')
  .description('Show raster or vector graphics')
  .avatar('image')
  .build();

export const ZFashionRouteList = new ZRouteBuilder()
  .name('List')
  .path('list')
  .description('Line Items')
  .avatar('list')
  .build();

export const ZFashionRouteModal = new ZRouteBuilder()
  .name('Modal')
  .path('modal')
  .description('Window Container')
  .avatar('window-maximize')
  .build();

export const ZFashionRouteNumber = new ZRouteBuilder()
  .name('Number')
  .path('number')
  .description('Numeric Spinners')
  .avatar('5')
  .build();

export const ZFashionRoutePopup = new ZRouteBuilder()
  .name('Popup')
  .path('popup')
  .description('Pop content')
  .avatar('comment')
  .build();

export const ZFashionRouteSuspense = new ZRouteBuilder()
  .name('Suspense')
  .path('suspense')
  .description('Loading and Waiting')
  .avatar('spinner')
  .build();

export const ZFashionRouteText = new ZRouteBuilder()
  .name('Text')
  .path('text')
  .description('Characters, Sentences, and Paragraphs')
  .avatar('font')
  .build();

export const ZFashionRouteTypography = new ZRouteBuilder()
  .name('Typography')
  .path('typography')
  .description('Standard Page Structures')
  .avatar('mountain-sun')
  .build();

export const ZFashionRouteWizard = new ZRouteBuilder()
  .name('Wizard')
  .path('wizard')
  .description('Step by Step Navigation')
  .avatar('hat-wizard')
  .build();

export const ZFashionRouteYouTube = new ZRouteBuilder()
  .name('YouTube')
  .path('you-tube')
  .description('Embed YouTube videos')
  .avatar('youtube')
  .family('brands')
  .build();

export const ZFashionRouteAllComponents = [
  ZFashionRouteAlert,
  ZFashionRouteBoolean,
  ZFashionRouteBubble,
  ZFashionRouteButton,
  ZFashionRouteCard,
  ZFashionRouteCarousel,
  ZFashionRouteChart,
  ZFashionRouteChoice,
  ZFashionRouteDrawer,
  ZFashionRouteGridView,
  ZFashionRouteImage,
  ZFashionRouteList,
  ZFashionRouteModal,
  ZFashionRouteNumber,
  ZFashionRoutePopup,
  ZFashionRouteSuspense,
  ZFashionRouteText,
  ZFashionRouteTypography,
  ZFashionRouteWizard,
  ZFashionRouteYouTube
];
