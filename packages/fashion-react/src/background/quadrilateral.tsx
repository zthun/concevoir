import { ZQuadrilateralElement } from '@zthun/fashion-boutique';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-quadrilateral']: ZQuadrilateralElement<any> & any;
    }
  }
}
